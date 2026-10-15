import { SITE } from '@/config/core';
import { isVehicle } from '@/lib/cartDiscount';

const OFFER_SEEN_KEY = 'ieb-accessory-offer-seen';

/**
 * Adds a product to the browser cart. When it is the first e-vehicle added in this visit, the accessory offer
 * popup is shown instead of the cart drawer; otherwise the cart drawer opens as usual.
 */
export interface CartProduct {
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export function addToCart(product: CartProduct, quantity = 1): void {
  const stored = localStorage.getItem(SITE.cartKey);
  const items: { slug: string; name: string; price: number; quantity: number; image?: string; category?: string }[] = stored ? JSON.parse(stored) : [];

  const existing = items.find((i) => i.slug === product.slug);
  if (existing) {
    existing.quantity += quantity;
    existing.category = product.category;
  } else {
    items.push({ slug: product.slug, name: product.name, price: product.price, quantity, image: product.image, category: product.category });
  }

  localStorage.setItem(SITE.cartKey, JSON.stringify(items));
  window.dispatchEvent(new Event('ieb-cart-update'));

  let showOffer = false;
  if (isVehicle(product.category)) {
    try {
      showOffer = !sessionStorage.getItem(OFFER_SEEN_KEY);
      if (showOffer) sessionStorage.setItem(OFFER_SEEN_KEY, '1');
    } catch {
      showOffer = false;
    }
  }
  window.dispatchEvent(new Event(showOffer ? 'ieb-vehicle-added' : 'ieb-open-cart'));
}

/** Carts saved before categories were stored: look them up once so the accessory discount shows correctly. */
export async function migrateCartCategories(): Promise<void> {
  try {
    const stored = localStorage.getItem(SITE.cartKey);
    if (!stored) return;
    const items: { slug: string; category?: string }[] = JSON.parse(stored);
    const missing = items.filter((i) => !i.category);
    if (!missing.length) return;
    let changed = false;
    await Promise.all(
      missing.map(async (i) => {
        try {
          const res = await fetch(`/api/products/${encodeURIComponent(i.slug)}/`);
          if (!res.ok) return;
          const p = await res.json();
          if (typeof p?.category === 'string') {
            i.category = p.category;
            changed = true;
          }
        } catch {
          /* leave the item without a category; the server still prices it correctly */
        }
      })
    );
    if (changed) {
      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('ieb-cart-update'));
    }
  } catch {
    /* unreadable cart: nothing to migrate */
  }
}
