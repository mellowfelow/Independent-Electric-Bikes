'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Tag, X } from 'lucide-react';
import { SHOP } from '@/config/site';

/** Shown the first time an e-vehicle is added to the cart in a visit: advertises the accessory discount. */
export function AccessoryOfferPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pct = SHOP.accessoryDiscount;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener('ieb-vehicle-added', show);
    return () => window.removeEventListener('ieb-vehicle-added', show);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  if (!open) return null;

  const viewCart = () => {
    close();
    window.dispatchEvent(new Event('ieb-open-cart'));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessory-offer-title"
        className="relative w-full max-w-md rounded-2xl border border-emerald-600/50 bg-slate-900 p-6 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="absolute right-3 top-3 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700/20 text-emerald-400">
          <Tag className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 id="accessory-offer-title" className="text-xl font-black text-white">
          Added! Now save {pct}% on accessories
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">
          Because you are buying an e-vehicle, you get <strong className="text-emerald-400">{pct}% off any parts and accessories</strong> in the same order: helmets, locks, lights, bags, batteries, chargers and more.
        </p>
        <p className="mt-2 text-xs text-slate-400">The discount is applied automatically in your cart and applies only while an e-vehicle is in it.</p>

        <div className="mt-5 grid gap-2">
          <Link href="/shop/safety-security-carry/" onClick={close} className="rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-bold text-white hover:bg-emerald-600">
            Shop helmets, locks &amp; bags
          </Link>
          <Link href="/shop/batteries-parts-kits/" onClick={close} className="rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-bold text-white hover:border-emerald-500">
            Shop batteries, parts &amp; kits
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={viewCart} className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:border-emerald-500">
              View cart
            </button>
            <button type="button" onClick={close} className="rounded-xl border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-200 hover:border-emerald-500">
              Keep shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
