import { PRODUCTS, SHOP } from '@/config/site';
import type { OrderItem } from './orderStore';

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export interface PricedOrder {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

/** Re-prices an order from the catalogue so client-supplied prices/totals are never trusted. */
export function priceOrder(rawItems: unknown, paymentMethod: string): { order?: PricedOrder; error?: string } {
  if (!Array.isArray(rawItems) || rawItems.length === 0 || rawItems.length > 50) return { error: 'Your cart is empty.' };

  const merged = new Map<string, number>();
  for (const raw of rawItems) {
    const slug = typeof raw?.slug === 'string' ? raw.slug : '';
    const qty = Math.floor(Number(raw?.quantity));
    if (!BY_SLUG.has(slug) || !Number.isFinite(qty) || qty < 1 || qty > 20) return { error: 'One or more items in your cart are no longer available.' };
    merged.set(slug, Math.min(20, (merged.get(slug) || 0) + qty));
  }

  const items: OrderItem[] = [...merged].map(([slug, quantity]) => {
    const p = BY_SLUG.get(slug)!;
    return { slug, name: p.name, price: p.price, quantity };
  });
  const subtotal = items.reduce((a, i) => a + i.price * i.quantity, 0);
  if (subtotal < SHOP.minOrder) return { error: `Minimum order is $${SHOP.minOrder}.` };

  const discount = paymentMethod === 'crypto' ? subtotal * (SHOP.cryptoDiscount / 100) : 0;
  const shipping = subtotal >= SHOP.freeShippingThreshold ? 0 : SHOP.shippingFee;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;
  return { order: { items, subtotal, shipping, total } };
}
