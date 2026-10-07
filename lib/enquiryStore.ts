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

export async function saveEnquiry(enquiry: EnquiryRecord): Promise<EnquiryRecord> {
  if (redis) {
    try {
      await redis.hset(REDIS_KEY, { [enquiry.id]: JSON.stringify(enquiry) });
    } catch (err) {
      console.error('[EnquiryStore] Redis save failed:', err);
    }
  }
  memoryEnquiriesMap.set(enquiry.id, enquiry);
  return enquiry;
}

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  let enquiries: EnquiryRecord[] = [];

  if (redis) {
    try {
      const data = await redis.hgetall<Record<string, string | EnquiryRecord>>(REDIS_KEY);
      if (data) {
        enquiries = Object.values(data).map((item) =>
          typeof item === 'string' ? JSON.parse(item) : item
        );
      }
    } catch (err) {
      console.error('[EnquiryStore] Redis list failed:', err);
    }
  }

  if (enquiries.length === 0 && memoryEnquiriesMap.size > 0) {
    enquiries = Array.from(memoryEnquiriesMap.values());
  }

  return enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiry(id: string): Promise<EnquiryRecord | null> {
  if (redis) {
    try {
      const data = await redis.hget<string | EnquiryRecord>(REDIS_KEY, id);
      if (data) {
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
    } catch (err) {
      console.error('[EnquiryStore] Redis get failed:', err);
    }
  }

  return memoryEnquiriesMap.get(id) || null;
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
