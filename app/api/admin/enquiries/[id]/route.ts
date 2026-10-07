import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, deleteEnquiry } from '@/lib/enquiryStore';

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  const enquiry = await getEnquiry(params.id);
  if (!enquiry) return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });

  return NextResponse.json({ success: true, enquiry });
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const params = await props.params;
  await deleteEnquiry(params.id);
  return NextResponse.json({ success: true, message: 'Enquiry deleted' });
}
