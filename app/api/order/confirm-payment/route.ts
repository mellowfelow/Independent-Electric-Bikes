import { NextRequest, NextResponse } from 'next/server';
import { getOrder, markPaymentConfirmed } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { FORMS, CONTACT, REPLY } from '@/config/site';
import { clean, cleanLine, isValidOrderRef, rateLimited } from '@/lib/security';
import { escapeHtml } from '@/utils/emailTemplates';

const notFound = () => NextResponse.json({ success: false, message: 'We could not match that order and email address.' }, { status: 404 });

export async function POST(req: NextRequest) {
  try {
    if (await rateLimited(req, 'confirm-payment', 6, 600)) {
      return NextResponse.json({ success: false, message: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const orderId = cleanLine(body.orderId, 24).toUpperCase();
    const email = cleanLine(body.email, 254).toLowerCase();
    const notes = clean(body.notes, 1000);
    const proofUrl = cleanLine(body.proofUrl, 500);

    if (!isValidOrderRef(orderId, REPLY.orderPrefix) || !email) {
      return NextResponse.json({ success: false, message: 'Order reference and email are required.' }, { status: 400 });
    }
    if (proofUrl && !/^https:\/\/\S+$/i.test(proofUrl)) {
      return NextResponse.json({ success: false, message: 'Proof link must be a secure https:// URL.' }, { status: 400 });
    }

    // The order reference alone is not a credential: the email on the order must also match.
    const order = await getOrder(orderId);
    if (!order || order.email.trim().toLowerCase() !== email) return notFound();

    // Customers can only confirm once payment details have actually been sent to them.
    if (order.status !== 'payment_details_sent' && order.status !== 'payment_confirmed') {
      return NextResponse.json({ success: false, message: 'Payment details have not been sent for this order yet.' }, { status: 409 });
    }

    await markPaymentConfirmed(order.id, proofUrl || undefined);

    const adminEmail = process.env.ORDER_EMAIL || FORMS.destinations.order || CONTACT.email;
    await sendMail({
      to: adminEmail,
      subject: `Payment Confirmed/Receipt Uploaded for Order #${order.id}`,
      text: `Customer ${order.customerName} submitted payment proof for Order #${order.id}.\n\nTotal: $${order.totalAmount} AUD\nProof URL: ${proofUrl || 'Not provided'}\nNotes: ${notes || 'None'}`,
      html: `<p>Payment proof submitted for Order <strong>#${escapeHtml(order.id)}</strong>.</p><p><strong>Customer:</strong> ${escapeHtml(order.customerName)} (${escapeHtml(order.email)})</p><p><strong>Total:</strong> $${order.totalAmount} AUD</p><p><strong>Proof link:</strong> ${proofUrl ? escapeHtml(proofUrl) : 'Not provided'}</p><p><strong>Notes:</strong> ${escapeHtml(notes) || 'None'}</p>`,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment confirmation received! Our team will verify and prepare your order for dispatch.',
    });
  } catch (err) {
    console.error('[Confirm Payment] Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
