import { NextRequest, NextResponse } from 'next/server';
import { FORMS, CONTACT, SITE, REPLY } from '@/config/site';
import { sendMail } from '@/lib/mailer';
import { saveOrder } from '@/lib/orderStore';
import { saveEnquiry } from '@/lib/enquiryStore';
import { orderConfirmationEmail, adminNewOrderEmail } from '@/utils/emailTemplates';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formName = 'contact', name, email, phone, address, paymentMethod, channel, items, totalAmount, subject, message, companyName } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, message: 'Name and email are required.' }, { status: 400 });
    }

    // 1. ORDER SUBMISSION (from Checkout Drawer / Form)
    if (formName === 'order') {
      const orderRef = `${REPLY.orderPrefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      const newOrder = {
        id: orderRef,
        createdAt: new Date().toISOString(),
        customerName: name,
        email,
        phone: phone || '',
        address: address || 'Pickup or To Be Confirmed',
        paymentMethod: paymentMethod || 'bank-transfer',
        channel: channel || 'both',
        items: Array.isArray(items) ? items : [],
        totalAmount: Number(totalAmount) || 0,
        status: 'new' as const,
      };

      // Save order record to Redis/memory store
      await saveOrder(newOrder);

      // Email Notification to Shop Admin
      const adminEmail = process.env.ORDER_EMAIL || FORMS.destinations.order || CONTACT.email;
      const adminOrderHtml = adminNewOrderEmail({
        id: orderRef,
        customerName: name,
        email,
        phone: phone || '',
        address: address || '',
        paymentMethod: paymentMethod || 'bank-transfer',
        channel: channel || 'both',
        items: newOrder.items,
        totalAmount: newOrder.totalAmount,
      });

      const itemsListText = newOrder.items.map((i) => `- ${i.name} x ${i.quantity} ($${i.price * i.quantity})`).join('\n');

      await sendMail({
        to: adminEmail,
        subject: `New Order Received #${orderRef} from ${name}`,
        text: `New order received on ${SITE.name}!\n\nOrder Ref: ${orderRef}\nCustomer: ${name} (${email}, ${phone})\nAddress: ${address}\nPayment Method: ${paymentMethod}\n\nItems:\n${itemsListText}\n\nTotal: $${totalAmount} AUD`,
        html: adminOrderHtml,
      });

      // UNCONDITIONAL Confirmation Email to Customer (Fires on all channel choices, including WhatsApp)
      const customerConfirmationHtml = orderConfirmationEmail({
        id: orderRef,
        customerName: name,
        items: newOrder.items,
        totalAmount: newOrder.totalAmount,
      });

      await sendMail({
        to: email,
        subject: `Order Confirmation #${orderRef} - ${SITE.name}`,
        text: `Hi ${name}, thank you for your order #${orderRef} on ${SITE.name}! Total: $${totalAmount} AUD. We will email you payment details shortly.`,
        html: customerConfirmationHtml,
      });

      return NextResponse.json({
        success: true,
        orderRef,
        message: 'Order received successfully! Confirmation email sent.',
      });
    }

    // 2. CONTACT / WHOLESALE / GENERAL ENQUIRY SUBMISSION
    const enqRef = `ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEnquiry = {
      id: enqRef,
      createdAt: new Date().toISOString(),
      name,
      email,
      phone: phone || '',
      formName: formName as 'contact' | 'wholesale' | 'general',
      subject: subject || `${formName.toUpperCase()} Inquiry from ${name}`,
      message: message || '',
      companyName: companyName || '',
      status: 'new' as const,
    };

    await saveEnquiry(newEnquiry);

    const destEmail =
      formName === 'wholesale'
        ? process.env.WHOLESALE_EMAIL || FORMS.destinations.wholesale || CONTACT.email
        : process.env.CONTACT_EMAIL || FORMS.destinations.contact || CONTACT.email;

    await sendMail({
      to: destEmail,
      subject: `${SITE.name} ${formName.toUpperCase()} Inquiry #${enqRef} - ${name}`,
      text: `Inquiry #${enqRef}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${companyName || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Inquiry #${enqRef}</strong></p><p><strong>Name:</strong> ${name} (${email}, ${phone})</p>${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}<p><strong>Message:</strong></p><blockquote style="background:#f8fafc; padding:12px; border-left:4px solid #16a34a;">${message}</blockquote>`,
    });

    return NextResponse.json({
      success: true,
      enquiryRef: enqRef,
      message: 'Thank you for your message! Our Brunswick team will get back to you shortly.',
    });
  } catch (err: any) {
    console.error('[Contact API] Error processing request:', err);
    return NextResponse.json({ success: false, message: 'Server error processing request' }, { status: 500 });
  }
}
