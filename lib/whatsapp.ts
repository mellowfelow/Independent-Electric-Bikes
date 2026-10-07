import { SITE, CONTACT } from '@/config/site';

export const WA_HEADER = `*${SITE.name}*`;

export function toWhatsAppNumber(phone: string): string {
  if (!phone) return CONTACT.whatsapp;
  return phone.replace(/[^0-9]/g, '');
}

/** Customer-originated greeting */
function waGreeting(): string {
  return `Hi ${SITE.name},`;
}

/** Link for customer sending message to business */
export function waLink(body: string): string {
  const number = CONTACT.whatsapp;
  const fullText = `${waGreeting()}\n\n${body}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(fullText)}`;
}

/** Link for admin sending message directly to a specific customer number */
export function waLinkTo(phone: string, body: string): string {
  const target = toWhatsAppNumber(phone);
  const fullText = `${WA_HEADER}\n\n${body}`;
  return `https://wa.me/${target}?text=${encodeURIComponent(fullText)}`;
}

export function waMessageText(body: string): string {
  return `${WA_HEADER}\n\n${body}`;
}

export function waOrderLink(orderRef: string, customerName: string, itemsText: string, totalAmount: string): string {
  const body = `I would like to place an order!

Order Ref: ${orderRef}
Name: ${customerName}
Items:
${itemsText}

Total Amount: ${totalAmount}

Please advise payment and delivery details.`;

  return waLink(body);
}

export function waPaymentConfirmationLink(ref: string, customerName: string): string {
  const body = `I have completed payment for Order #${ref}!

Customer: ${customerName}
Please confirm receipt and dispatch tracking details.`;

  return waLink(body);
}

export function waPaymentDetailsMessage(opts: {
  ref: string;
  customerName: string;
  amountFormatted: string;
  methodLabel: string;
  openingText: string;
  pastedDetails: string;
  closingText: string;
}): string {
  const body = `Payment Instructions for Order #${opts.ref}

Customer: ${opts.customerName}
Amount Due: ${opts.amountFormatted}
Payment Method: ${opts.methodLabel}

${opts.openingText}

--- PAYMENT DETAILS ---
${opts.pastedDetails}
----------------------

${opts.closingText}

Please use your Order Number (#${opts.ref}) as your payment reference. Once sent, reply to this WhatsApp message or email ${CONTACT.email} with your payment receipt for instant verification and dispatch.`;

  return body;
}
