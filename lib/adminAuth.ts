import { NextRequest, NextResponse } from 'next/server';

export function checkAdminPasscode(request: NextRequest): NextResponse | null {
  const expectedPasscode = process.env.ADMIN_PASSCODE || 'orderreply';

  const providedPasscode =
    request.headers.get('X-Admin-Passcode') ||
    request.cookies.get('ieb_admin_passcode')?.value ||
    new URL(request.url).searchParams.get('passcode');

  if (!providedPasscode) {
    return NextResponse.json({ error: 'Passcode required' }, { status: 401 });
  }

  if (providedPasscode !== expectedPasscode) {
    return NextResponse.json({ error: 'Invalid admin passcode' }, { status: 401 });
  }

  return null;
}
