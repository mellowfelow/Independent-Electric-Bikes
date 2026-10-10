import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, deleteOrder, saveOrder, type OrderRecord } from '@/lib/orderStore';

const ORDER_STATUSES: OrderRecord['status'][] = ['new', 'payment_details_sent', 'payment_confirmed', 'dispatched', 'cancelled'];

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  const order = await getOrder(cleanId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  return NextResponse.json({ success: true, order });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  await deleteOrder(cleanId);
  return NextResponse.json({ success: true, message: 'Order deleted' });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  const order = await getOrder(cleanId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const body = await req.json();
  if (body.status !== undefined) {
    if (!ORDER_STATUSES.includes(body.status)) return NextResponse.json({ error: 'Unknown status' }, { status: 400 });
    order.status = body.status;
  }
  if (typeof body.notes === 'string') order.notes = body.notes.slice(0, 2000);

  await saveOrder(order);
  return NextResponse.json({ success: true, order });
}
