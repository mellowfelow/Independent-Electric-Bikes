import { NextRequest, NextResponse } from 'next/server';
import { FORMS, CONTACT, SITE, REPLY, SHOP } from '@/config/site';
import { sendMail } from '@/lib/mailer';
import { saveOrder, getOrder } from '@/lib/orderStore';
import { saveEnquiry } from '@/lib/enquiryStore';
import { priceOrder } from '@/lib/pricing';
import { clean, cleanLine, isEmail, isValidOrderRef, randomRef, rateLimited } from '@/lib/security';
import { orderConfirmationEmail, adminNewOrderEmail, escapeHtml } from '@/utils/emailTemplates';

const FORM_NAMES = ['order', 'contact', 'wholesale', 'general'] as const;
const CHANNELS = ['email', 'whatsapp', 'both'] as const;

const fail = (message: string, status = 400) => NextResponse.json({ success: false, message }, { status });

export async function POST(req: NextRequest) {
  try {
    if (await rateLimited(req, 'contact', 8, 600)) return fail('Too many requests. Please wait a few minutes and try again.', 429);

    const body = await req.json();

    // Honeypot: real users never fill the hidden "website" field. Pretend success so bots don't retry.
    if (clean(body.website, 200)) return NextResponse.json({ success: true, message: 'Thank you.' });

    const formName = FORM_NAMES.includes(body.formName) ? (body.formName as (typeof FORM_NAMES)[number]) : 'contact';
    const name = cleanLine(body.name, 120);
    const email = cleanLine(body.email, 254);
    const phone = cleanLine(body.phone, 40);

    if (!name || !isEmail(email)) return fail('A valid name and email are required.');

    // 1. ORDER SUBMISSION (checkout: email + WhatsApp channels both land here)
    if (formName === 'order') {
      const paymentMethod = (SHOP.paymentMethods as string[]).includes(body.paymentMethod) ? (body.paymentMethod as string) : 'bank-transfer';
      const channel = CHANNELS.includes(body.channel) ? (body.channel as (typeof CHANNELS)[number]) : 'email';
      const address = clean(body.address, 400) || 'Pickup or To Be Confirmed';

      // Prices and totals always come from the catalogue, never from the browser.
      const priced = priceOrder(body.items, paymentMethod);
      if (!priced.order) return fail(priced.error || 'Invalid order.');
      const { items, total } = priced.order;

      // The ref is minted in the browser so the WhatsApp message and the saved order share one reference.
      let orderRef = body.orderRef;
      if (!isValidOrderRef(orderRef, REPLY.orderPrefix) || (await getOrder(orderRef))) {
        orderRef = randomRef(REPLY.orderPrefix);
      }

      await saveOrder({
        id: orderRef,
        createdAt: new Date().toISOString(),
        customerName: name,
        email,
        phone,
        address,
        paymentMethod,
        channel,
        items,
        totalAmount: total,
        status: 'new',
      });

      const adminEmail = process.env.ORDER_EMAIL || FORMS.destinations.order || CONTACT.email;
      const itemsListText = items.map((i) => `- ${i.name} x ${i.quantity} ($${i.price * i.quantity})`).join('\n');

      await sendMail({
        to: adminEmail,
        subject: `New Order Received #${orderRef} from ${name}`,
        text: `New order received on ${SITE.name}!\n\nOrder Ref: ${orderRef}\nCustomer: ${name} (${email}, ${phone})\nAddress: ${address}\nPayment Method: ${paymentMethod}\nChannel: ${channel}\n\nItems:\n${itemsListText}\n\nTotal: $${total} AUD`,
        html: adminNewOrderEmail({ id: orderRef, customerName: name, email, phone, address, paymentMethod, channel, items, totalAmount: total }),
        replyTo: email,
      });

      // Unconditional confirmation to the customer - fires for every channel, including WhatsApp.
      await sendMail({
        to: email,
        subject: `Order Confirmation #${orderRef} - ${SITE.name}`,
        text: `Hi ${name}, thank you for your order #${orderRef} on ${SITE.name}! Total: $${total} AUD. We will email you payment details shortly.`,
        html: orderConfirmationEmail({ id: orderRef, customerName: name, items, totalAmount: total }),
      });

      return NextResponse.json({ success: true, orderRef, message: 'Order received successfully! Confirmation email sent.' });
    }

    // 2. CONTACT / WHOLESALE / GENERAL ENQUIRY
    const message = clean(body.message, 4000);
    const companyName = cleanLine(body.companyName, 160);
    const subject = cleanLine(body.subject, 160) || `${formName.toUpperCase()} Inquiry from ${name}`;
    if (!message) return fail('Please include a message.');

    const enqRef = randomRef('ENQ');
    await saveEnquiry({
      id: enqRef,
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      formName: formName as 'contact' | 'wholesale' | 'general',
      subject,
      message,
      companyName,
      status: 'new',
    });

    const destEmail =
      formName === 'wholesale'
        ? process.env.WHOLESALE_EMAIL || FORMS.destinations.wholesale || CONTACT.email
        : process.env.CONTACT_EMAIL || FORMS.destinations.contact || CONTACT.email;

    await sendMail({
      to: destEmail,
      subject: `${SITE.name} ${formName.toUpperCase()} Inquiry #${enqRef} - ${name}`,
      text: `Inquiry #${enqRef}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${companyName || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<p><strong>Inquiry #${escapeHtml(enqRef)}</strong></p><p><strong>Name:</strong> ${escapeHtml(name)} (${escapeHtml(email)}, ${escapeHtml(phone)})</p>${
        companyName ? `<p><strong>Company:</strong> ${escapeHtml(companyName)}</p>` : ''
      }<p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Message:</strong></p><blockquote style="background:#f8fafc; padding:12px; border-left:4px solid #16a34a; white-space:pre-wrap;">${escapeHtml(message)}</blockquote>`,
      replyTo: email,
    });

    return NextResponse.json({ success: true, enquiryRef: enqRef, message: 'Thank you for your message! Our Brunswick team will get back to you shortly.' });
  } catch (err) {
    console.error('[Contact API] Error processing request:', err);
    return fail('Server error processing request', 500);
  }
}
