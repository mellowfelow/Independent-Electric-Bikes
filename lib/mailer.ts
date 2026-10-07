import nodemailer from 'nodemailer';
import { FORMS, SITE } from '@/config/site';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  from?: string;
}

export async function sendMail(opts: SendMailOptions): Promise<{ sent: boolean; reason?: string }> {
  try {
    const host = process.env.SMTP_HOST || process.env.SMTP_SERVER;
    const user = process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.SMTP_EMAIL;
    const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const rawFrom = opts.from || process.env.SMTP_FROM || process.env.MAIL_FROM || FORMS.smtpFrom || user || '';

    if (!host || !user || !pass) {
      console.warn('[Mailer] SMTP credentials not set. Returning sent:false gracefully.');
      return { sent: false, reason: 'not-configured' };
    }

    // Ensure sender display name uses SITE.name (e.g., "INDEPENDENT ELECTRIC BIKES" <sales@...>)
    const formattedFrom = rawFrom.includes('<') ? rawFrom : `"${SITE.name}" <${rawFrom}>`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: formattedFrom,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo || user || FORMS.smtpFrom,
    });

    return { sent: true };
  } catch (err: any) {
    console.error('[Mailer] Send failed:', err?.message || err);
    return { sent: false, reason: err?.message || 'send-error' };
  }
}
