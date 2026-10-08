import { NextRequest } from 'next/server';
import { redis } from './redis';

// No 0/O/1/I/L - unambiguous when read aloud or typed from an email.
const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function randomRef(prefix: string, length = 8): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = '';
  for (const b of bytes) out += REF_ALPHABET[b % REF_ALPHABET.length];
  return `${prefix}-${out}`;
}

export function isValidOrderRef(ref: unknown, prefix: string): ref is string {
  return typeof ref === 'string' && new RegExp(`^${prefix}-[A-HJ-NP-Z2-9]{6,10}$`).test(ref);
}

export function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '';
}

/** Single-line field for use in email subjects/headers (no CR/LF). */
export function cleanLine(value: unknown, max: number): string {
  return clean(value, max).replace(/[\r\n]+/g, ' ');
}

export function isEmail(value: string): boolean {
  return /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/.test(value) && value.length <= 254;
}

export function clientIp(req: NextRequest): string {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}

const memoryHits = new Map<string, { count: number; reset: number }>();

/** Fixed-window limiter. Uses Redis when configured (shared across instances), otherwise per-instance memory. */
export async function rateLimited(req: NextRequest, bucket: string, limit: number, windowSec: number): Promise<boolean> {
  const key = `rl:${bucket}:${clientIp(req)}`;
  if (redis) {
    try {
      const n = await redis.incr(key);
      if (n === 1) await redis.expire(key, windowSec);
      return n > limit;
    } catch {
      /* fall through to memory */
    }
  }
  const now = Date.now();
  const hit = memoryHits.get(key);
  if (!hit || hit.reset < now) {
    memoryHits.set(key, { count: 1, reset: now + windowSec * 1000 });
    return false;
  }
  hit.count += 1;
  return hit.count > limit;
}
