import { NextRequest, NextResponse } from 'next/server';
import { checkAdminPasscode } from '@/lib/adminAuth';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
  const authErr = await checkAdminPasscode(req);
  if (authErr) return authErr;

  let storage: 'redis' | 'memory' = 'memory';
  if (redis) {
    try {
      await redis.ping();
      storage = 'redis';
    } catch (err) {
      console.error('[Admin Status] Redis ping failed:', err);
    }
  }
  const smtp = !!((process.env.SMTP_HOST || process.env.SMTP_SERVER) && (process.env.SMTP_USER || process.env.SMTP_USERNAME || process.env.SMTP_EMAIL) && (process.env.SMTP_PASS || process.env.SMTP_PASSWORD));
  return NextResponse.json({ storage, smtp });
}
