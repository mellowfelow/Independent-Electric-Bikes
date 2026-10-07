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

export async function saveOrder(order: OrderRecord): Promise<OrderRecord> {
  if (redis) {
    try {
      await redis.hset(REDIS_KEY, { [order.id]: JSON.stringify(order) });
    } catch (err) {
      console.error('[OrderStore] Redis save failed:', err);
    }
  }
  memoryOrdersMap.set(order.id, order);
  return order;
}

export async function listOrders(): Promise<OrderRecord[]> {
  let orders: OrderRecord[] = [];

  if (redis) {
    try {
      const data = await redis.hgetall<Record<string, string | OrderRecord>>(REDIS_KEY);
      if (data) {
        orders = Object.values(data).map((item) =>
          typeof item === 'string' ? JSON.parse(item) : item
        );
      }
    } catch (err) {
      console.error('[OrderStore] Redis list failed:', err);
    }
  }

  if (orders.length === 0 && memoryOrdersMap.size > 0) {
    orders = Array.from(memoryOrdersMap.values());
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrder(id: string): Promise<OrderRecord | null> {
  if (redis) {
    try {
      const data = await redis.hget<string | OrderRecord>(REDIS_KEY, id);
      if (data) {
        return typeof data === 'string' ? JSON.parse(data) : data;
      }
    } catch (err) {
      console.error('[OrderStore] Redis get failed:', err);
    }
  }

  return memoryOrdersMap.get(id) || null;
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
