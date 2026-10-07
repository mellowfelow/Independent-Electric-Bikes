'use client';

import { useState } from 'react';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { Product, SITE } from '@/config/site';
import { money } from '@/lib/order';
import { waOrderLink } from '@/lib/whatsapp';

export function ProductClientActions({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      let items = stored ? JSON.parse(stored) : [];

      const existingIndex = items.findIndex((i: any) => i.slug === product.slug);
      if (existingIndex > -1) {
        items[existingIndex].quantity += 1;
      } else {
        items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.images[0],
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('ieb-cart-update'));
      window.dispatchEvent(new Event('ieb-open-cart'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2500);
    } catch (e) {
      console.error('Failed to add to cart:', e);
    }
  };

  const handleWhatsAppOrder = () => {
    const waUrl = waOrderLink(`IEB-SINGLE`, `Customer`, `${product.name} x 1`, money(product.price));
    window.open(waUrl, '_blank');
  };

  return (
    <div className="space-y-3 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-3.5 px-4 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart ({money(product.price)})</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2"
        >
          <span>Order via WhatsApp</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>
    </div>
  );
}
