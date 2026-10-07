import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listOrders } from '@/lib/orderStore';

export async function GET(req: NextRequest) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const orders = await listOrders();
  return NextResponse.json({ success: true, count: orders.length, orders });
}
