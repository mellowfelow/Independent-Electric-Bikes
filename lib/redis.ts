import { Redis } from '@upstash/redis';

function getRedisClient(): Redis | null {
  const url = (
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.KV_REST_API_URL ||
    process.env.STORAGE_REST_API_URL ||
    process.env.STORAGE_KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_KV_REST_API_URL ||
    process.env.REDIS_REST_URL ||
    process.env.UPSTASH_URL ||
    process.env.UPSTASH_REDIS_URL ||
    ''
  ).trim();

  const token = (
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.KV_REST_API_TOKEN ||
    process.env.STORAGE_REST_API_TOKEN ||
    process.env.STORAGE_KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_KV_REST_API_TOKEN ||
    process.env.REDIS_REST_TOKEN ||
    process.env.UPSTASH_TOKEN ||
    process.env.UPSTASH_REDIS_TOKEN ||
    ''
  ).trim();

  if (!url || !token) {
    console.warn('[Redis] Upstash Redis credentials not detected in environment variables.');
    return null;
  }

  try {
    return new Redis({ url, token });
  } catch (err) {
    console.error('[Redis] Failed to initialize Upstash Redis:', err);
    return null;
  }
}

export const redis = getRedisClient();
