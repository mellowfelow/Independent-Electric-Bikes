import { Redis } from '@upstash/redis';

// Each entry is a matched URL + token pair. The Vercel Marketplace integration (KV_*) is listed first because it is
// managed by Vercel and always valid; hand-typed UPSTASH_* variables come after it.
const CANDIDATES: [urlVar: string, tokenVar: string][] = [
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
  ['REDIS_REST_URL', 'REDIS_REST_TOKEN'],
];

// Unedited template values (e.g. "your-upstash-redis-url.upstash.io") must never win over a real connection.
const looksLikePlaceholder = (value: string) => /your[-_ ]|placeholder|example\.|<.+>|xxx/i.test(value);

function getRedisClient(): Redis | null {
  for (const [urlVar, tokenVar] of CANDIDATES) {
    const url = (process.env[urlVar] || '').trim();
    const token = (process.env[tokenVar] || '').trim();
    if (!url || !token) continue;
    if (looksLikePlaceholder(url) || looksLikePlaceholder(token)) {
      console.warn(`[Redis] Ignoring ${urlVar}/${tokenVar}: value looks like an unedited placeholder.`);
      continue;
    }
    try {
      return new Redis({ url, token });
    } catch (err) {
      console.error(`[Redis] Failed to initialise client from ${urlVar}:`, err);
    }
  }
  console.warn('[Redis] No usable Redis credentials found; falling back to in-memory storage (orders are lost on restart).');
  return null;
}

export const redis = getRedisClient();
