import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent, saveOrder } from '@/lib/orderStore';
import { parsePaymentDetail, paymentMethodParts } from '@/lib/order';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
import { sendMail } from '@/lib/mailer';
import { SITE } from '@/config/site';

export async function POST(req: NextRequest) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();
    const { orderId, methodId, pastedDetails, openingOverride, closingOverride } = body;

    if (!orderId || !pastedDetails) {
      return NextResponse.json({ success: false, message: 'Order ID and payment details text are required.' }, { status: 400 });
    }

    const order = await getOrder(orderId);
    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found.' }, { status: 404 });
    }

    // 1. Parse payment detail text
    const parsedFields = parsePaymentDetail(pastedDetails);

    // 2. Resolve method text
    const methodParts = paymentMethodParts(methodId || order.paymentMethod, order.totalAmount, order.id);
    const openingText = openingOverride || methodParts.opening;
    const closingText = closingOverride || methodParts.closing;

    // 4. Build and send HTML email to customer
    const emailHtml = paymentDetailsEmail({
      orderId: order.id,
      customerName: order.customerName,
      totalAmount: order.totalAmount,
      methodLabel: methodParts.label,
      openingText,
      parsedFields,
      closingText,
    });

    const mailRes = await sendMail({
      to: order.email,
      subject: `Payment Invoice for Order #${order.id} - ${SITE.name}`,
      text: `Payment details for Order #${order.id}. Total Due: $${order.totalAmount} AUD. Payment method: ${methodParts.label}. Please reply to this email once payment is sent.`,
      html: emailHtml,
    });

    // 5. Only a delivered email moves the order to "payment details sent"; otherwise keep the fields so the customer page works.
    if (mailRes.sent) await markOrderSent(orderId, parsedFields);
    else await saveOrder({ ...order, parsedPaymentDetails: parsedFields });

    return NextResponse.json({
      success: mailRes.sent,
      message: mailRes.sent
        ? `Payment details email sent successfully to ${order.email}!`
        : `Email dispatch notice: ${mailRes.reason === 'not-configured' ? 'SMTP credentials not configured in Vercel env vars.' : `SMTP dispatch failed: ${mailRes.reason}`}`,
      parsedFields,
      emailSent: mailRes.sent,
    });
  } catch (err: any) {
    console.error('[Send Payment Email] Error:', err);
    return NextResponse.json({ success: false, message: 'Server error processing request' }, { status: 500 });
  }
}
