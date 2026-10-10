import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listOrders, saveOrder, getOrder, type OrderRecord } from '@/lib/orderStore';
import { priceOrder } from '@/lib/pricing';
import { clean, cleanLine, isEmail, isValidOrderRef, randomRef } from '@/lib/security';
import { REPLY, SHOP } from '@/config/site';

const STATUSES: OrderRecord['status'][] = ['new', 'payment_details_sent', 'payment_confirmed', 'dispatched', 'cancelled'];
const CHANNELS: OrderRecord['channel'][] = ['email', 'whatsapp', 'both'];

export async function GET(req: NextRequest) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  const orders = await listOrders();
  return NextResponse.json({ success: true, count: orders.length, orders });
}

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
    if (!isValidOrderRef(id, REPLY.orderPrefix)) return NextResponse.json({ error: `Order numbers look like ${REPLY.orderPrefix}-ABCD2345.` }, { status: 400 });
    if (await getOrder(id)) return NextResponse.json({ error: `Order ${id} already exists.` }, { status: 409 });
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
