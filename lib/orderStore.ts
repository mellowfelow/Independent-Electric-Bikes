import { redis } from './redis';
import { REPLY } from '@/config/site';

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderRecord {
  id: string; // e.g., IEB-9A82X1
  createdAt: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  channel: 'email' | 'whatsapp' | 'both';
  items: OrderItem[];
  totalAmount: number;
  status: 'new' | 'payment_details_sent' | 'payment_confirmed' | 'dispatched' | 'cancelled';
  parsedPaymentDetails?: { label: string; value: string }[];
  paymentConfirmedAt?: string;
  paymentProofUrl?: string;
  notes?: string;
}

const REDIS_KEY = `${REPLY.orderPrefix.toLowerCase()}:orders`;

// In-memory fallback
const memoryOrdersMap = new Map<string, OrderRecord>();

export async function saveOrder(order: OrderRecord): Promise<OrderRecord & { persisted: boolean }> {
  const cleanId = (order.id || '').trim().replace(/\/$/, '');
  order.id = cleanId;

  let persisted = false;
  if (redis) {
    try {
      await redis.hset(REDIS_KEY, { [cleanId]: JSON.stringify(order) });
      persisted = true;
    } catch (err) {
      console.error('[OrderStore] Redis save failed:', err);
    }
  }
  memoryOrdersMap.set(cleanId, order);
  return Object.assign(order, { persisted });
}

export async function listOrders(): Promise<OrderRecord[]> {
  let redisOrders: OrderRecord[] = [];

  if (redis) {
    try {
      const data = await redis.hgetall<Record<string, any>>(REDIS_KEY);
      if (data && typeof data === 'object') {
        redisOrders = Object.values(data)
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
          .map((o) => ({ ...o, id: (o.id || '').trim().replace(/\/$/, '') }));
      }
    } catch (err) {
      console.error('[OrderStore] Redis list failed:', err);
    }
  }

  // Merge memory orders and Redis orders into unified list
  const combinedMap = new Map<string, OrderRecord>();
  memoryOrdersMap.forEach((o, id) => combinedMap.set(id.trim().replace(/\/$/, ''), o));
  redisOrders.forEach((o) => combinedMap.set(o.id.trim().replace(/\/$/, ''), o));

  const allOrders = Array.from(combinedMap.values());
  return allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  if (!id) return null;
  const cleanId = id.trim().replace(/\/$/, '');

  if (redis) {
    try {
      const data = await redis.hget<string | OrderRecord>(REDIS_KEY, cleanId);
      if (data) {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;
        return { ...parsed, id: (parsed.id || cleanId).trim().replace(/\/$/, '') };
      }
    } catch (err) {
      console.error('[OrderStore] Redis get failed:', err);
    }
  }

  // Check in-memory store if Redis missed
  const inMem = memoryOrdersMap.get(cleanId);
  if (inMem) return inMem;

  // Case-insensitive fallback check
  const all = await listOrders();
  return all.find((o) => o.id.toLowerCase() === cleanId.toLowerCase()) || null;
}

export async function markOrderSent(
  id: string,
  parsedPaymentDetails: { label: string; value: string }[]
): Promise<OrderRecord | null> {
  const order = await getOrder(id);
  if (!order) return null;

  order.status = 'payment_details_sent';
  order.parsedPaymentDetails = parsedPaymentDetails;

  return await saveOrder(order);
}

export async function markPaymentConfirmed(id: string, proofUrl?: string): Promise<OrderRecord | null> {
  const order = await getOrder(id);
  if (!order) return null;

  order.status = 'payment_confirmed';
  order.paymentConfirmedAt = new Date().toISOString();
  if (proofUrl) order.paymentProofUrl = proofUrl;

  return await saveOrder(order);
}

export async function deleteOrder(id: string): Promise<boolean> {
  if (redis) {
    try {
      await redis.hdel(REDIS_KEY, id);
    } catch (err) {
      console.error('[OrderStore] Redis delete failed:', err);
    }
  }
  memoryOrdersMap.delete(id);
  return true;
}
