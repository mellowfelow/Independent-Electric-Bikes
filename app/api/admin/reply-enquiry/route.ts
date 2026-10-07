import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';
import { enquiryReplyEmail } from '@/utils/emailTemplates';
import { sendMail } from '@/lib/mailer';
import { SITE } from '@/config/site';

export async function POST(req: NextRequest) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  try {
    const body = await req.json();
    const { enquiryId, replyText } = body;

    if (!enquiryId || !replyText) {
      return NextResponse.json({ success: false, message: 'Enquiry ID and reply text are required.' }, { status: 400 });
    }

    const enquiry = await getEnquiry(enquiryId);
    if (!enquiry) {
      return NextResponse.json({ success: false, message: 'Enquiry not found.' }, { status: 404 });
    }

    await markEnquiryReplied(enquiryId, replyText);

    const emailHtml = enquiryReplyEmail({
      customerName: enquiry.name,
      originalMessage: enquiry.message,
      replyText,
    });

    const mailRes = await sendMail({
      to: enquiry.email,
      subject: `Response to your inquiry #${enquiry.id} - ${SITE.name}`,
      text: `Hi ${enquiry.name},\n\n${replyText}\n\n---\nOriginal message: ${enquiry.message}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: mailRes.sent
        ? `Reply email sent successfully to ${enquiry.email}!`
        : `Reply saved in portal. (SMTP credentials not configured)`,
      emailSent: mailRes.sent,
    });
  } catch (err) {
    console.error('[Reply Enquiry] Error:', err);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
