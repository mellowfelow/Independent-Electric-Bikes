// One-off hardening pass from the 2026-10-10 technical audit (reply portal, auth, order and enquiry workflows, robots).
import fs from 'node:fs';

const edit = (file, fn) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = fn(t.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};
const must = (t, a) => {
  if (!t.includes(a)) throw new Error('missing: ' + a.slice(0, 70));
};
const swap = (t, a, b) => {
  must(t, a);
  return t.split(a).join(b);
};

// 1. Admin auth: header only, constant-time compare, lockout after repeated wrong passcodes.
fs.writeFileSync(
  'lib/adminAuth.ts',
  `import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { isLockedOut, recordFailure } from './security';

const MAX_FAILURES = 10;
const WINDOW_SEC = 600;

function sameSecret(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Checks the X-Admin-Passcode header. Wrong guesses are counted per IP and lock the portal out for 10 minutes after ${'$'}{MAX_FAILURES}. */
export async function checkAdminPasscode(request: NextRequest): Promise<NextResponse | null> {
  if (await isLockedOut(request, 'admin-fail', MAX_FAILURES)) {
    return NextResponse.json({ error: 'Too many wrong passcodes. Try again in 10 minutes.' }, { status: 429 });
  }

  const expectedPasscode = (process.env.ADMIN_PASSCODE || 'orderreply').trim();
  const providedPasscode = (request.headers.get('X-Admin-Passcode') || '').trim();

  if (!providedPasscode) {
    return NextResponse.json({ error: 'Passcode required' }, { status: 401 });
  }

  if (!sameSecret(providedPasscode, expectedPasscode)) {
    await recordFailure(request, 'admin-fail', WINDOW_SEC);
    return NextResponse.json({ error: 'Invalid admin passcode' }, { status: 401 });
  }

  return null;
}
`,
);

edit('lib/security.ts', (t) => {
  return (
    t +
    `
/** Read-only check: has this IP already used up its failures in the bucket? (No increment.) */
export async function isLockedOut(req: NextRequest, bucket: string, limit: number): Promise<boolean> {
  const key = \`rl:\${bucket}:\${clientIp(req)}\`;
  if (redis) {
    try {
      const n = Number((await redis.get<number>(key)) || 0);
      return n >= limit;
    } catch {
      /* fall through to memory */
    }
  }
  const hit = memoryHits.get(key);
  return !!hit && hit.reset >= Date.now() && hit.count >= limit;
}

/** Counts one failure against the bucket for \`windowSec\` seconds. */
export async function recordFailure(req: NextRequest, bucket: string, windowSec: number): Promise<void> {
  await rateLimited(req, bucket, Number.MAX_SAFE_INTEGER, windowSec);
}
`
  );
});

// 2. Every admin route awaits the (now async) check.
const routes = [
  'app/api/admin/enquiries/route.ts',
  'app/api/admin/orders/route.ts',
  'app/api/admin/reply-enquiry/route.ts',
  'app/api/admin/send-payment-email/route.ts',
  'app/api/admin/enquiries/[id]/route.ts',
  'app/api/admin/orders/[id]/route.ts',
];
for (const f of routes) edit(f, (t) => swap(t, 'const authErr = checkAdminPasscode(req);', 'const authErr = await checkAdminPasscode(req);'));

// 3. Order PATCH: only known statuses.
edit('app/api/admin/orders/[id]/route.ts', (t) => {
  t = swap(t, "  if (body.status) order.status = body.status;\n  if (body.notes) order.notes = body.notes;", "  if (body.status !== undefined) {\n    if (!ORDER_STATUSES.includes(body.status)) return NextResponse.json({ error: 'Unknown status' }, { status: 400 });\n    order.status = body.status;\n  }\n  if (typeof body.notes === 'string') order.notes = body.notes.slice(0, 2000);");
  return swap(t, "import { getOrder, deleteOrder, saveOrder } from '@/lib/orderStore';", "import { getOrder, deleteOrder, saveOrder, type OrderRecord } from '@/lib/orderStore';\n\nconst ORDER_STATUSES: OrderRecord['status'][] = ['new', 'payment_details_sent', 'payment_confirmed', 'dispatched', 'cancelled'];");
});

// 4. Payment email: the order is only marked "sent" when the email really went out; parsed fields are always saved.
edit('app/api/admin/send-payment-email/route.ts', (t) => {
  t = swap(t, "    // 3. Mark order sent in store\n    await markOrderSent(orderId, parsedFields);\n\n", '');
  t = swap(t, "    return NextResponse.json({\n      success: mailRes.sent,", "    // 5. Only a delivered email moves the order to \"payment details sent\"; otherwise keep the fields so the customer page works.\n    if (mailRes.sent) await markOrderSent(orderId, parsedFields);\n    else await saveOrder({ ...order, parsedPaymentDetails: parsedFields });\n\n    return NextResponse.json({\n      success: mailRes.sent,");
  return swap(t, "import { getOrder, markOrderSent } from '@/lib/orderStore';", "import { getOrder, markOrderSent, saveOrder } from '@/lib/orderStore';");
});

// 5. Checkout API: tell the truth about email, and never report success when the order was neither emailed nor safely stored.
edit('app/api/contact/route.ts', (t) => {
  t = swap(t, "      await sendMail({\n        to: adminEmail,\n        subject: `New Order Received", "      const adminMail = await sendMail({\n        to: adminEmail,\n        subject: `New Order Received");
  t = swap(t, "      await sendMail({\n        to: email,\n        subject: `Order Confirmation", "      const customerMail = await sendMail({\n        to: email,\n        subject: `Order Confirmation");
  t = swap(t, "      return NextResponse.json({ success: true, orderRef, message: 'Order received successfully! Confirmation email sent.' });", "      if (!adminMail.sent && !customerMail.sent && !stored.persisted) {\n        console.error('[Contact API] Order could not be stored or emailed:', orderRef);\n        return fail('We could not process your order right now. Please message us on WhatsApp or call so we can take it manually.', 502);\n      }\n\n      return NextResponse.json({\n        success: true,\n        orderRef,\n        emailSent: customerMail.sent,\n        message: customerMail.sent ? 'Order received successfully! Confirmation email sent.' : 'Order received. We could not send the confirmation email, so please keep your order reference and we will contact you shortly.',\n      });");
  t = swap(t, "      await saveOrder({\n        id: orderRef,", "      const stored = await saveOrder({\n        id: orderRef,");
  return t;
});

// saveOrder reports whether Redis actually stored the record (in-memory copies are lost between serverless invocations).
edit('lib/orderStore.ts', (t) => {
  t = swap(t, "export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {", "export async function saveOrder(order: OrderRecord): Promise<OrderRecord & { persisted: boolean }> {");
  t = swap(t, "  if (redis) {\n    try {\n      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(order) });\n    } catch (err) {\n      console.error('[OrderStore] Redis save failed:', err);\n    }\n  }\n  memoryOrdersMap.set(cleanId, order);\n  return order;", "  let persisted = false;\n  if (redis) {\n    try {\n      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(order) });\n      persisted = true;\n    } catch (err) {\n      console.error('[OrderStore] Redis save failed:', err);\n    }\n  }\n  memoryOrdersMap.set(cleanId, order);\n  return Object.assign(order, { persisted });");
  return t;
});

// 6. Payment wording: money() already adds "AUD".
edit('config/site.ts', (t) => {
  t = swap(t, 'transfer exactly {amount} AUD for Order', 'transfer exactly {amount} for Order');
  t = swap(t, 'Transfer {amount} AUD instantly via PayID', 'Transfer {amount} instantly via PayID');
  return t;
});

// 7. robots.txt: named crawler groups do not inherit the * group, so repeat the private paths in each.
edit('app/robots.txt/route.ts', (t) => swap(t, "...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', '']),", "...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', ...DISALLOW.map((p) => `Disallow: ${p}`), '']),"));

// 8. Admin passcode is no longer written to a cookie (the API reads the header only); clear any old cookie.
edit('components/admin/AdminPasscodeContext.tsx', (t) => {
  t = swap(t, "      if (typeof document !== 'undefined') {\n        document.cookie = `ieb_admin_passcode=${encodeURIComponent(code)}; path=/; max-age=86400; SameSite=Strict${window.location.protocol === 'https:' ? '; Secure' : ''}`;\n      }\n", "      if (typeof document !== 'undefined') document.cookie = 'ieb_admin_passcode=; path=/; max-age=0; SameSite=Strict';\n");
  return t;
});
console.log('hardened');
