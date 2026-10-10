// One-off: manual order API, clearer order-detail errors, screenshot instruction in the payment reference, HTML enquiry emails.
import fs from 'node:fs';

const edit = (file, fn) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = fn(t.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};
const swap = (t, a, b) => {
  if (!t.includes(a)) throw new Error('missing: ' + a.slice(0, 70));
  return t.replace(a, b);
};

// 1. POST /api/admin/orders: add an order by hand.
edit('app/api/admin/orders/route.ts', (t) => {
  t = swap(t, "import { listOrders } from '@/lib/orderStore';", "import { listOrders, saveOrder, getOrder, type OrderRecord } from '@/lib/orderStore';\nimport { priceOrder } from '@/lib/pricing';\nimport { clean, cleanLine, isEmail, isValidOrderRef, randomRef } from '@/lib/security';\nimport { REPLY, SHOP } from '@/config/site';\n\nconst STATUSES: OrderRecord['status'][] = ['new', 'payment_details_sent', 'payment_confirmed', 'dispatched', 'cancelled'];\nconst CHANNELS: OrderRecord['channel'][] = ['email', 'whatsapp', 'both'];");
  return (
    t +
    `
/** Adds an order by hand (restoring one from an email, or a phone order). Prices always come from the catalogue. */
export async function POST(req: NextRequest) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  const body = await req.json().catch(() => ({}));
  const name = cleanLine(body.customerName, 120);
  const email = cleanLine(body.email, 254);
  if (!name || !isEmail(email)) return NextResponse.json({ error: 'A customer name and valid email are required.' }, { status: 400 });

  const paymentMethod = (SHOP.paymentMethods as string[]).includes(body.paymentMethod) ? body.paymentMethod : 'bank-transfer';
  const priced = priceOrder(body.items, paymentMethod);
  if (!priced.order) return NextResponse.json({ error: priced.error || 'Add at least one item.' }, { status: 400 });

  let id = cleanLine(body.id, 24).toUpperCase();
  if (id) {
    if (!isValidOrderRef(id, REPLY.orderPrefix)) return NextResponse.json({ error: \`Order numbers look like \${REPLY.orderPrefix}-ABCD2345.\` }, { status: 400 });
    if (await getOrder(id)) return NextResponse.json({ error: \`Order \${id} already exists.\` }, { status: 409 });
  } else {
    id = randomRef(REPLY.orderPrefix);
  }

  const saved = await saveOrder({
    id,
    createdAt: new Date().toISOString(),
    customerName: name,
    email,
    phone: cleanLine(body.phone, 40),
    address: clean(body.address, 400) || 'To be confirmed',
    paymentMethod,
    channel: CHANNELS.includes(body.channel) ? body.channel : 'email',
    items: priced.order.items,
    totalAmount: priced.order.total,
    status: STATUSES.includes(body.status) ? body.status : 'new',
  });
  if (!saved.persisted) return NextResponse.json({ error: 'Saved to temporary memory only: permanent storage (Redis) is not connected.', order: saved }, { status: 503 });
  return NextResponse.json({ success: true, order: saved });
}
`
  );
});

// 2. Order detail: tell "not signed in" from "not found".
edit('app/admin/orders/[id]/page.tsx', (t) => {
  t = swap(t, "      if (res.ok) {\n        const data = await res.json();\n        setOrder(data.order);\n      } else {\n        setError('Order not found');\n      }", "      if (res.ok) {\n        const data = await res.json();\n        setOrder(data.order);\n        setError('');\n      } else if (res.status === 401 || res.status === 429) {\n        setError('Your admin passcode was not accepted. Lock and sign in again.');\n      } else {\n        setError('Order not found. It may have been placed before permanent storage was connected: use Add order (with the order number from the email) to restore it.');\n      }");
  return t;
});

// 3. The payment reference section tells the customer to send a screenshot (single source for email, WhatsApp and composer preview).
edit('lib/order.ts', (t) => {
  t = swap(t, "    `${REPLY.dispatchLine}`,", "    `Once you have paid, please send a screenshot of your payment receipt to ${CONTACT.email} or on WhatsApp to ${CONTACT.phoneDisplay}, quoting ${ref}. We match it to your order and then arrange dispatch.`,\n    `${REPLY.dispatchLine}`,");
  return t;
});
console.log('ok');
