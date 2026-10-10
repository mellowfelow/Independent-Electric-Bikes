// One-off: branded HTML emails for enquiries (admin notification + customer acknowledgement).
import fs from 'node:fs';

const edit = (file, fn) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = fn(t.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};
const swap = (t, a, b) => {
  if (!t.includes(a)) throw new Error('missing: ' + a.slice(0, 70));
  return t.replace(a, b);
};

edit('lib/order.ts', (t) => swap(t, "import { SITE, REPLY } from '@/config/site';", "import { SITE, REPLY, CONTACT } from '@/config/site';"));

edit('utils/emailTemplates.ts', (t) =>
  t +
  `
/** 5. Admin New Enquiry Notification Email (contact and wholesale forms) */
export function adminNewEnquiryEmail(enq: {
  id: string;
  formName: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  subject?: string;
  message: string;
}): string {
  const kind = enq.formName === 'wholesale' ? 'Wholesale enquiry' : 'Contact enquiry';
  const replyUrl = \`https://\${SITE.domain}/admin/reply-enquiry/?enquiryId=\${encodeURIComponent(enq.id)}\`;
  const bodyHtml = \`
    <p style="font-size:15px; margin-top:0;">A new <strong>\${escapeHtml(kind.toLowerCase())}</strong> <strong>#\${escapeHtml(enq.id)}</strong> was received on <strong>\${escapeHtml(SITE.name)}</strong>.</p>

    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:16px; margin:16px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:10px;">Customer Details</div>
      \${field('Name', escapeHtml(enq.name))}
      \${field('Email Address', escapeHtml(enq.email))}
      \${field('Phone Number', escapeHtml(enq.phone || 'N/A'))}
      \${enq.companyName ? field('Company', escapeHtml(enq.companyName)) : ''}
      \${field('Form', escapeHtml(kind), 0)}
    </div>

    <div style="background-color:#ffffff; border-left:4px solid \${REPLY.brand.primary}; padding:16px 20px; border-radius:6px; margin:16px 0;">
      <div style="font-size:12px; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:6px;">\${escapeHtml(enq.subject || 'Message')}</div>
      <div style="font-size:15px; color:#0f172a; white-space:pre-wrap;">\${escapeHtml(enq.message)}</div>
    </div>

    <div style="text-align:center; margin:24px 0;">
      \${button(replyUrl, 'Reply in Dashboard')}
      \${button(\`mailto:\${enq.email}?subject=\${encodeURIComponent('Re: ' + (enq.subject || 'Your enquiry'))}\`, 'Reply by Email')}
    </div>
  \`;
  return shell({
    eyebrow: kind,
    title: \`New enquiry #\${enq.id} from \${escapeHtml(enq.name)}\`,
    meta: \`\${kind} · \${SITE.name}\`,
    bodyHtml,
  });
}

/** 6. Customer Enquiry Acknowledgement Email */
export function enquiryAcknowledgementEmail(enq: { id: string; name: string; subject?: string; message: string }): string {
  const bodyHtml = \`
    <p style="font-size:15px; margin-top:0;">Hi <strong>\${escapeHtml(enq.name)}</strong>,</p>
    <p>Thank you for contacting <strong>\${escapeHtml(SITE.name)}</strong>. We have received your message and our team will reply as soon as we can.</p>

    \${callout(\`<strong style="color:#15803d; font-size:14px;">Your reference: #\${escapeHtml(enq.id)}</strong><br/><span style="font-size:13px; color:#1e293b;">Quote this if you contact us again. For anything urgent, call \${escapeHtml(CONTACT.phoneDisplay)} or message us on WhatsApp.</span>\`)}

    <div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:14px; margin-top:20px;">
      <div style="font-size:11px; font-weight:800; text-transform:uppercase; color:#64748b; letter-spacing:0.8px; margin-bottom:6px;">\${escapeHtml(enq.subject || 'Your message')}</div>
      <div style="font-size:13px; color:#475569; font-style:italic; white-space:pre-wrap;">&quot;\${escapeHtml(enq.message)}&quot;</div>
    </div>
  \`;
  return shell({
    eyebrow: 'Message Received',
    title: \`We received your message (#\${enq.id})\`,
    bodyHtml,
  });
}
`,
);

edit('app/api/contact/route.ts', (t) => {
  t = swap(t, "import { orderConfirmationEmail, adminNewOrderEmail, escapeHtml } from '@/utils/emailTemplates';", "import { orderConfirmationEmail, adminNewOrderEmail, adminNewEnquiryEmail, enquiryAcknowledgementEmail } from '@/utils/emailTemplates';");
  const s = t.indexOf('    await sendMail({\n      to: destEmail,');
  const e = t.indexOf("    return NextResponse.json({ success: true, enquiryRef: enqRef");
  if (s < 0 || e < 0) throw new Error('enquiry block');
  const replacement = `    const enquiryMail = await sendMail({
      to: destEmail,
      subject: \`\${SITE.name} \${formName.toUpperCase()} Inquiry #\${enqRef} - \${name}\`,
      text: \`Inquiry #\${enqRef}\\nName: \${name}\\nEmail: \${email}\\nPhone: \${phone}\\nCompany: \${companyName || 'N/A'}\\nSubject: \${subject}\\n\\nMessage:\\n\${message}\`,
      html: adminNewEnquiryEmail({ id: enqRef, formName, name, email, phone, companyName, subject, message }),
      replyTo: email,
    });

    // Customer acknowledgement (branded HTML), so they know the message arrived.
    await sendMail({
      to: email,
      subject: \`We received your message #\${enqRef} - \${SITE.name}\`,
      text: \`Hi \${name}, thank you for contacting \${SITE.name}. We have received your message (reference \${enqRef}) and will reply shortly.\`,
      html: enquiryAcknowledgementEmail({ id: enqRef, name, subject, message }),
    });

    if (!enquiryMail.sent && !stored.persisted) {
      console.error('[Contact API] Enquiry could not be stored or emailed:', enqRef);
      return fail('We could not send your message right now. Please call or message us on WhatsApp.', 502);
    }

`;
  t = t.slice(0, s) + replacement + t.slice(e);
  t = swap(t, "    await saveEnquiry({\n      id: enqRef,", "    const stored = await saveEnquiry({\n      id: enqRef,");
  return t;
});

edit('lib/enquiryStore.ts', (t) => {
  t = swap(t, 'export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord> {', 'export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord & { persisted: boolean }> {');
  t = swap(t, "      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(enquiry) });\n    } catch", "      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(enquiry) });\n      persisted = true;\n    } catch");
  t = swap(t, '  if (redis) {\n    try {\n      await redis.hset(REDIS_KEY', '  let persisted = false;\n  if (redis) {\n    try {\n      await redis.hset(REDIS_KEY');
  t = swap(t, '  memoryEnquiriesMap.set(cleanId, enquiry);\n  return enquiry;', '  memoryEnquiriesMap.set(cleanId, enquiry);\n  return Object.assign(enquiry, { persisted });');
  return t;
});
console.log('ok');
