import { NextRequest, NextResponse } from 'next/server';
import { getOrder } from '@/lib/orderStore';
import { money, paymentMethodParts, paymentTermsLines } from '@/lib/order';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  const order = await getOrder(id);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const methodParts = paymentMethodParts(order.paymentMethod, order.totalAmount, order.id);

  return NextResponse.json({
    orderId: order.id,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    formattedAmount: money(order.totalAmount),
    paymentMethod: order.paymentMethod,
    methodLabel: methodParts.label,
    openingText: methodParts.opening,
    closingText: methodParts.closing,
    parsedPaymentDetails: order.parsedPaymentDetails || [],
    paymentTerms: paymentTermsLines(order.id),
    status: order.status,
  });
}
