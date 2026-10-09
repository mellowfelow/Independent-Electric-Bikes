'use client';

import { useState, useEffect } from 'react';
import { brandNameOf, productCategoryLabel } from '@/lib/catalog';
import { CARD_SIZES, productSrcSet } from '@/lib/productImage';
import Link from 'next/link';
import { Plus, Minus, ShoppingBag, Check, Zap } from 'lucide-react';
import { Product, SITE } from '@/config/site';
import { money } from '@/lib/order';
import { fitSummary } from '@/lib/compat';

interface ProductCardProps {
  /** Load this card's photo immediately (use for the first row of a grid). */
  priority?: boolean;
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = '', priority = false }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [cartQty, setCartQty] = useState(0);
  const [added, setAdded] = useState(false);
  const fit = fitSummary(product);

  // Sync with cart state in localStorage
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem(SITE.cartKey);
        if (stored) {
          const items = JSON.parse(stored);
          const existing = items.find((i: any) => i.slug === product.slug);
          setCartQty(existing ? existing.quantity : 0);
        } else {
          setCartQty(0);
        }
      } catch {
        setCartQty(0);
      }
    };

    handleSync();
    window.addEventListener('ieb-cart-update', handleSync);
    return () => window.removeEventListener('ieb-cart-update', handleSync);
  }, [product.slug]);

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(SITE.cartKey);
      let items = stored ? JSON.parse(stored) : [];

      const existingIndex = items.findIndex((i: any) => i.slug === product.slug);
      if (existingIndex > -1) {
        items[existingIndex].quantity += quantity;
      } else {
        items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: quantity,
          image: product.images[0],
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('ieb-cart-update'));
      window.dispatchEvent(new Event('ieb-open-cart'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      setQuantity(1); // Reset stepper back to 1 for next add
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const cryptoPrice = Math.round(product.price * 0.9);
  const productUrl = `/shop/${product.category}/${product.slug}/`;

  return (
    <div
      className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:border-emerald-500/50 hover:shadow-2xl group ${className}`}
    >
      {/* Product Image Frame */}
      <div className="relative bg-white aspect-[4/3] overflow-hidden">
        {product.badge && product.badge !== 'none' && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-md shadow">
            {product.badge}
          </span>
        )}

        {cartQty > 0 && (
          <span className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-slate-900/90 border border-emerald-500/50 text-emerald-400 font-extrabold text-[10px] rounded-md shadow flex items-center gap-1">
            <Check className="w-3 h-3" />
            <span>{cartQty} in Cart</span>
          </span>
        )}

        <Link href={productUrl} className="block h-full w-full">
          {/* Photos are pre-framed to 4:3 on white by scripts/images.mjs, so every card lines up. */}
          <img
            src={product.images[0]}
            alt={product.name}
            srcSet={productSrcSet(product.images[0])}
            sizes={CARD_SIZES}
            width={1200}
            height={900}
            // The first row is what the shopper sees first: fetch it right away; everything else loads as it scrolls in.
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>
      </div>

      {/* Product Details & Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
            {brandNameOf(product)}
          </div>
          <h3 className="text-xs font-extrabold text-white mt-0.5 group-hover:text-emerald-400 transition-colors line-clamp-1">
            <Link href={productUrl}>{product.name}</Link>
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 leading-relaxed">{productCategoryLabel(product)}</p>
          {fit && <p className="text-[11px] font-bold text-emerald-400 mt-1 line-clamp-1">{fit}</p>}
        </div>

        {/* Crypto Discount Badge */}
        <div className="bg-emerald-950/60 border border-emerald-500/30 p-2 rounded-xl text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 shadow-inner">
          <Zap className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>Pay {money(cryptoPrice)} with Crypto (10% Off)</span>
        </div>

        {/* Price & Specs Header */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[9px] text-slate-400 uppercase tracking-wider">Regular Price</div>
            <div className="text-sm font-black text-white">{money(product.price)}</div>
          </div>

          <Link
            href={productUrl}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-[10px] rounded-lg transition-all"
          >
            Details &rarr;
          </Link>
        </div>

        {/* Quantity Stepper & Add to Cart Controls */}
        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-12 gap-2 items-center">
          {/* Quantity Stepper */}
          <div className="col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-slate-900 flex items-center justify-center transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-black text-white px-1 select-none">{quantity}</span>
            <button
              type="button"
              onClick={handleIncrease}
              className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 flex items-center justify-center transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Add To Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`col-span-7 py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-95'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
