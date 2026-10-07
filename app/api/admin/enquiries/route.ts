import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { listEnquiries } from '@/lib/enquiryStore';

export async function GET(req: NextRequest) {
  const authErr = checkAdminPasscode(req);
  if (authErr) return authErr;

  const enquiries = await listEnquiries();
  return NextResponse.json({ success: true, count: enquiries.length, enquiries });
}
