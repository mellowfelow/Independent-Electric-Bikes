import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, deleteOrder, saveOrder } from '@/lib/orderStore';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  const order = await getOrder(cleanId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  return NextResponse.json({ success: true, order });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  await deleteOrder(cleanId);
  return NextResponse.json({ success: true, message: 'Order deleted' });
}

export async function PATCH(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const cleanId = (params.id || '').trim().replace(/\/$/, '');
  const order = await getOrder(cleanId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

  const body = await req.json();
  if (body.status) order.status = body.status;
  if (body.notes) order.notes = body.notes;

  await saveOrder(order);
  return NextResponse.json({ success: true, order });
}
