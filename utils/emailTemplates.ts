import { SITE, REPLY, CONTACT } from '@/config/site';
import { money, paymentTermsHtml } from '@/lib/order';

export function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface ShellProps {
  eyebrow: string;
  title: string;
  meta?: string;
  bodyHtml: string;
}

export function shell({ eyebrow, title, meta, bodyHtml }: ShellProps): string {
  const accent = REPLY.brand.primary || '#16a34a';
  const headerDark = REPLY.brand.headerDark || '#0f172a';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#0f172a; line-height:1.5;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9; padding:24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
          <!-- Dark Header Band -->
          <tr>
            <td style="background-color:${headerDark}; padding:28px 24px; text-align:left;">
              <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.5px; color:${accent}; font-weight:700; margin-bottom:6px;">${escapeHtml(eyebrow)}</div>
              <h1 style="margin:0; font-size:22px; font-weight:800; color:#ffffff; line-height:1.2;">${escapeHtml(title)}</h1>
              ${meta ? `<div style="font-size:13px; color:#94a3b8; margin-top:6px;">${escapeHtml(meta)}</div>` : ''}
            </td>
          </tr>
          <!-- Accent Rule -->
          <tr>
            <td style="background-color:${accent}; height:4px; font-size:0; line-height:0;">&nbsp;</td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding:28px 24px; background-color:#ffffff; color:#1e293b; font-size:14px;">
              ${bodyHtml}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 24px; background-color:#f8fafc; border-top:1px solid #e2e8f0; text-align:center; font-size:12px; color:#64748b;">
              <strong style="color:#0f172a;">${escapeHtml(SITE.name)}</strong><br>
              ${escapeHtml(SITE.entityName)} (ABN ${escapeHtml(SITE.abn)})<br>
              ${escapeHtml(CONTACT.address)} · Phone: ${escapeHtml(CONTACT.phone)}<br>
              <a href="https://${SITE.domain}" style="color:${accent}; text-decoration:none; font-weight:600;">${SITE.domain}</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function field(label: string, valueHtml: string, marginBottom = 12): string {
  return `<div style="margin-bottom:${marginBottom}px;">
    <div style="font-size:11px; text-transform:uppercase; letter-spacing:0.8px; font-weight:700; color:#64748b; margin-bottom:3px;">${escapeHtml(label)}</div>
    <div style="font-size:14px; font-weight:600; color:#0f172a;">${valueHtml}</div>
  </div>`;
}

export function callout(innerHtml: string): string {
  const accent = REPLY.brand.primary || '#16a34a';
  return `<div style="background-color:#f0fdf4; border-left:4px solid ${accent}; padding:14px 16px; border-radius:4px; margin:18px 0;">
    ${innerHtml}
  </div>`;
}

export function button(href: string, text: string): string {
  const accent = REPLY.brand.primary || '#16a34a';
  return `<a href="${href}" style="display:inline-block; background-color:${accent}; color:#ffffff; font-size:14px; font-weight:700; padding:12px 22px; border-radius:6px; text-decoration:none; text-align:center; margin:10px 0;">${escapeHtml(text)} &rarr;</a>`;
}

/** 1. Order Confirmation Email (To Customer) */
export function orderConfirmationEmail(order: {
  id: string;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}): string {
  const itemsHtml = order.items
    .map(
      (item) => `<tr>
      <td style="padding:8px 0; border-bottom:1px solid #f1f5f9; font-weight:600;">${escapeHtml(item.name)} &times; ${item.quantity}</td>
      <td style="padding:8px 0; border-bottom:1px solid #f1f5f9; text-align:right; font-weight:700;">${money(item.price * item.quantity)}</td>
    </tr>`
    )
    .join('');

  const bodyHtml = `
    <p style="font-size:15px; margin-top:0;">Hi <strong>${escapeHtml(order.customerName)}</strong>,</p>
    <p>Thank you for choosing <strong>${escapeHtml(SITE.name)}</strong>! We have received your electric bike order draft <strong>#${escapeHtml(order.id)}</strong>.</p>
    
    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin:16px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:10px;">Order Summary (#${escapeHtml(order.id)})</div>
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        ${itemsHtml}
        <tr>
          <td style="padding-top:12px; font-size:16px; font-weight:800;">Total Amount:</td>
          <td style="padding-top:12px; font-size:18px; font-weight:800; color:${REPLY.brand.primary}; text-align:right;">${money(order.totalAmount)}</td>
        </tr>
      </table>
    </div>

    ${callout(`
      <strong style="color:#15803d; font-size:14px;">Next Steps:</strong><br>
      Our Brunswick sales team is reviewing your order details. You will receive an official payment invoice email shortly containing exact Bank Transfer / PayID or Crypto deposit instructions.
    `)}

    <p style="margin-bottom:0;">Need immediate assistance? You can also message us directly on WhatsApp at <a href="https://wa.me/${CONTACT.whatsapp}" style="color:${REPLY.brand.primary}; font-weight:700;">${CONTACT.phoneDisplay}</a>.</p>
  `;

  return shell({
    eyebrow: 'Order Received',
    title: `Order Confirmation #${order.id}`,
    meta: `Total: ${money(order.totalAmount)} · ${SITE.name}`,
    bodyHtml,
  });
}

/** 2. Payment Details Email (Sent from Admin to Customer) */
export function paymentDetailsEmail(opts: {
  orderId: string;
  customerName: string;
  totalAmount: number;
  methodLabel: string;
  openingText: string;
  parsedFields: { label: string; value: string }[];
  closingText: string;
}): string {
  const fieldsHtml = opts.parsedFields
    .map(
      (f) => `<div style="background-color:#f8fafc; border:1px dashed #cbd5e1; border-radius:6px; padding:10px 14px; margin-bottom:8px;">
      <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#64748b; letter-spacing:0.5px;">${escapeHtml(f.label)}</div>
      <div style="font-family:Consolas, Monaco, monospace; font-size:15px; font-weight:700; color:#0f172a; margin-top:2px;">${escapeHtml(f.value)}</div>
    </div>`
    )
    .join('');

  const bodyHtml = `
    <p style="font-size:15px; margin-top:0;">Dear <strong>${escapeHtml(opts.customerName)}</strong>,</p>
    <p>${escapeHtml(opts.openingText)}</p>

    <div style="background-color:#ffffff; border:2px solid ${REPLY.brand.primary}; border-radius:10px; padding:18px; margin:20px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; color:${REPLY.brand.primary}; letter-spacing:1px; margin-bottom:8px;">Payment Details · Order #${escapeHtml(opts.orderId)}</div>
      <div style="font-size:22px; font-weight:800; color:#0f172a; margin-bottom:14px;">Total Due: ${money(opts.totalAmount)}</div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:12px;">Payment Method: ${escapeHtml(opts.methodLabel)}</div>
      
      ${fieldsHtml}
    </div>

    <p>${escapeHtml(opts.closingText)}</p>

    ${callout(`
      <strong style="color:#15803d; font-size:14px;">Payment Terms & Reference Instructions:</strong>
      <ul style="margin:8px 0 0 0; padding-left:18px; font-size:13px; color:#1e293b;">
        ${paymentTermsHtml(opts.orderId)}
      </ul>
    `)}

    <div style="margin-top:20px; font-size:13px; color:#64748b; text-align:center;">
      Once payment is sent, please reply to this email or send your receipt to us on WhatsApp (<a href="https://wa.me/${CONTACT.whatsapp}" style="color:${REPLY.brand.primary}; font-weight:700;">${CONTACT.phoneDisplay}</a>).
    </div>
  `;

  return shell({
    eyebrow: 'Payment Invoice',
    title: `Payment Details for Order #${opts.orderId}`,
    meta: `Total Due: ${money(opts.totalAmount)} · ${opts.methodLabel}`,
    bodyHtml,
  });
}

/** 3. Enquiry Reply Email (Sent from Admin to Customer) */
export function enquiryReplyEmail(opts: {
  customerName: string;
  originalMessage: string;
  replyText: string;
}): string {
  const bodyHtml = `
    <p style="font-size:15px; margin-top:0;">Hi <strong>${escapeHtml(opts.customerName)}</strong>,</p>
    <p>Thank you for reaching out to <strong>${escapeHtml(SITE.name)}</strong>. Here is our response to your inquiry:</p>

    <div style="background-color:#ffffff; border-left:4px solid ${REPLY.brand.primary}; padding:16px 20px; border-radius:6px; margin:18px 0; font-size:15px; color:#0f172a; white-space:pre-wrap;">${escapeHtml(opts.replyText)}</div>

    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-top:24px;">
      <div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#64748b; letter-spacing:0.8px; margin-bottom:6px;">Your Original Inquiry:</div>
      <div style="font-size:13px; color:#475569; font-style:italic; white-space:pre-wrap;">"${escapeHtml(opts.originalMessage)}"</div>
    </div>
  `;

  return shell({
    eyebrow: 'Inquiry Response',
    title: `Response from ${SITE.name}`,
    bodyHtml,
  });
}

/** 4. Admin New Order Notification Email */
export function adminNewOrderEmail(order: {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  channel: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}): string {
  const itemsHtml = order.items
    .map(
      (item) => `<tr>
      <td style="padding:8px 0; border-bottom:1px solid #f1f5f9; font-weight:600;">${escapeHtml(item.name)} &times; ${item.quantity}</td>
      <td style="padding:8px 0; border-bottom:1px solid #f1f5f9; text-align:right; font-weight:700;">${money(item.price * item.quantity)}</td>
    </tr>`
    )
    .join('');

  const dashboardUrl = `https://${SITE.domain}/admin/orders/${encodeURIComponent(order.id)}/`;

  const bodyHtml = `
    <p style="font-size:15px; margin-top:0;">A new order <strong>#${escapeHtml(order.id)}</strong> was received on <strong>${escapeHtml(SITE.name)}</strong>.</p>

    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin:16px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:10px;">Customer Details</div>
      ${field('Customer Name', escapeHtml(order.customerName))}
      ${field('Email Address', escapeHtml(order.email))}
      ${field('Phone Number', escapeHtml(order.phone || 'N/A'))}
      ${field('Delivery Address', escapeHtml(order.address || 'N/A'))}
      ${field('Preferred Payment Method', escapeHtml(order.paymentMethod))}
      ${field('Order Channel', escapeHtml(order.channel))}
    </div>

    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin:16px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:10px;">Items Ordered</div>
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
        ${itemsHtml}
        <tr>
          <td style="padding-top:12px; font-size:16px; font-weight:800;">Total Amount:</td>
          <td style="padding-top:12px; font-size:18px; font-weight:800; color:${REPLY.brand.primary}; text-align:right;">${money(order.totalAmount)}</td>
        </tr>
      </table>
    </div>

    <div style="text-align:center; margin:24px 0;">
      ${button(dashboardUrl, 'Reply Order in Dashboard')}
    </div>
  `;

  return shell({
    eyebrow: 'New Order Received',
    title: `New Order #${order.id} from ${escapeHtml(order.customerName)}`,
    meta: `Total: ${money(order.totalAmount)} · ${SITE.name}`,
    bodyHtml,
  });
}
