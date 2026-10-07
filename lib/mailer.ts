import nodemailer from 'nodemailer';
import { FORMS } from '@/config/site';

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export async function sendMail(opts: SendMailOptions): Promise<{ sent: boolean; reason?: string }> {
  try {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const from = process.env.SMTP_FROM || FORMS.smtpFrom;

    if (!host || !user || !pass) {
      console.warn('[Mailer] SMTP credentials not set. Returning sent:false gracefully.');
      return { sent: false, reason: 'not-configured' };
    }

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
      from,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo || opts.to,
    });

    return { sent: true };
  } catch (err: any) {
    console.error('[Mailer] Send failed:', err?.message || err);
    return { sent: false, reason: err?.message || 'send-error' };
  }
}
