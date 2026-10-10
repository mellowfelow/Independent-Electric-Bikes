import { redis } from './redis';
import { REPLY } from '@/config/site';

export interface EnquiryRecord {
  id: string; // e.g., ENQ-77182
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  formName: 'contact' | 'wholesale' | 'general';
  subject?: string;
  message: string;
  companyName?: string;
  status: 'new' | 'replied';
  replyText?: string;
  repliedAt?: string;
}

const REDIS_KEY = `${REPLY.orderPrefix.toLowerCase()}:enquiries`;

// In-memory fallback
const memoryEnquiriesMap = new Map<string, EnquiryRecord>();

export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord & { persisted: boolean }> {
  const cleanId = (enquiry.id || '').trim().replace(/\/$/, '');
  enquiry.id = cleanId;

  let persisted = false;
  if (redis) {
    try {
      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(enquiry) });
      persisted = true;
    } catch (err) {
      console.error('[EnquiryStore] Redis save failed:', err);
    }
  }
  memoryEnquiriesMap.set(cleanId, enquiry);
  return Object.assign(enquiry, { persisted });
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  let redisEnquiries: EnquiryRecord[] = [];

  if (redis) {
    try {
      const data = await redis.hgetall<Record<string, any>>(REDIS_KEY);
      if (data && typeof data === 'object') {
        redisEnquiries = Object.values(data)
          .map((item) => {
            if (!item) return null;
            if (typeof item === 'string') {
              try {
                return JSON.parse(item);
              } catch {
                return null;
              }
            }
            return item;
          })
          .filter(Boolean)
          .map((e) => ({ ...e, id: (e.id || '').trim().replace(/\/$/, '') }));
      }
    } catch (err) {
      console.error('[EnquiryStore] Redis list failed:', err);
    }
  }

  const combinedMap = new Map<string, EnquiryRecord>();
  memoryEnquiriesMap.forEach((e, id) => combinedMap.set(id.trim().replace(/\/$/, ''), e));
  redisEnquiries.forEach((e) => combinedMap.set(e.id.trim().replace(/\/$/, ''), e));

  const allEnquiries = Array.from(combinedMap.values());
  return allEnquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiry(id: string): Promise<EnquiryRecord | null> {
  if (!id) return null;
  const cleanId = id.trim().replace(/\/$/, '');

  if (redis) {
    try {
      const data = await redis.hget<string | EnquiryRecord>(REDIS_KEY, cleanId);
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return { ...parsed, id: (parsed.id || cleanId).trim().replace(/\/$/, '') };
      }
    } catch (err) {
      console.error('[EnquiryStore] Redis get failed:', err);
    }
  }

  const inMem = memoryEnquiriesMap.get(cleanId);
  if (inMem) return inMem;

  const all = await listEnquiries();
  return all.find((e) => e.id.toLowerCase() === cleanId.toLowerCase()) || null;
}

export async function markEnquiryReplied(id: string, replyText: string): Promise<EnquiryRecord | null> {
  const enquiry = await getEnquiry(id);
  if (!enquiry) return null;

  enquiry.status = 'replied';
  enquiry.replyText = replyText;
  enquiry.repliedAt = new Date().toISOString();

  return await saveEnquiry(enquiry);
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (redis) {
    try {
      await redis.hdel(REDIS_KEY, id);
    } catch (err) {
      console.error('[EnquiryStore] Redis delete failed:', err);
    }
  }
  memoryEnquiriesMap.delete(id);
  return true;
}
