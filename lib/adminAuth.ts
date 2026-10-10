import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { isLockedOut, recordFailure } from './security';

const MAX_FAILURES = 10;
const WINDOW_SEC = 600;

function sameSecret(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Checks the X-Admin-Passcode header. Wrong guesses are counted per IP and lock the portal out for 10 minutes after ${MAX_FAILURES}. */
export async function checkAdminPasscode(request: NextRequest): Promise<NextResponse | null> {
  if (await isLockedOut(request, 'admin-fail', MAX_FAILURES)) {
    return NextResponse.json({ error: 'Too many wrong passcodes. Try again in 10 minutes.' }, { status: 429 });
  }

  const expectedPasscode = (process.env.ADMIN_PASSCODE || 'orderreply').trim();
  const providedPasscode = (request.headers.get('X-Admin-Passcode') || '').trim();

  if (!providedPasscode) {
    return NextResponse.json({ error: 'Passcode required' }, { status: 401 });
  }

  if (!sameSecret(providedPasscode, expectedPasscode)) {
    await recordFailure(request, 'admin-fail', WINDOW_SEC);
    return NextResponse.json({ error: 'Invalid admin passcode' }, { status: 401 });
  }

  return null;
}
