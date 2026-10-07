import { NextRequest, NextResponse } from 'next/server';
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { FORMS, CONTACT, SITE } from '@/config/site';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, proofUrl, notes } = body;

    if (!orderId) {
      return NextResponse.json({ success: false, message: 'Order ID required' }, { status: 400 });
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    await markPaymentConfirmed(orderId, proofUrl);

    // Send email alert to shop admin
    const adminEmail = process.env.ORDER_EMAIL || FORMS.destinations.order || CONTACT.email;
    await sendMail({
      to: adminEmail,
      subject: `Payment Confirmed/Receipt Uploaded for Order #${orderId}`,
      text: `Customer ${order.customerName} submitted payment proof for Order #${orderId}.\n\nTotal: $${order.totalAmount} AUD\nProof URL: ${proofUrl || 'Not provided'}\nNotes: ${notes || 'None'}`,
      html: `<p>Payment proof submitted for Order <strong>#${orderId}</strong>!</p><p><strong>Customer:</strong> ${order.customerName} (${order.email})</p><p><strong>Total:</strong> $${order.totalAmount} AUD</p><p><strong>Proof Link:</strong> ${proofUrl || 'Attached'}</p><p><strong>Notes:</strong> ${notes || 'None'}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment confirmation received! Our finance team will verify and prepare your e-bike for express dispatch.',
    });
  } catch (err) {
    console.error('[Confirm Payment] Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
