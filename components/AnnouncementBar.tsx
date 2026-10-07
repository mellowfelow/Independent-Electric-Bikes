'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck, Truck, Percent } from 'lucide-react';
import { SITE, SHOP } from '@/config/site';

const ANNOUNCEMENTS = [
  {
    icon: Truck,
    text: `Free Express Courier Freight across Victoria & Metro Australia on orders over $${SHOP.freeShippingThreshold.toLocaleString()} AUD`,
  },
  {
    icon: Percent,
    text: `Save 10% on your entire e-bike purchase when paying via Cryptocurrency (BTC / USDT) or PayID`,
  },
  {
    icon: ShieldCheck,
    text: `Every E-Bike includes 2-Year Frame & 12-Month Electrical Warranty backed by ${SITE.entityName}`,
  },
  {
    icon: Zap,
    text: `Visit our Brunswick Showroom (380 Sydney Rd) for test rides or order online for fast dispatch`,
  },
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const Icon = current.icon;

  return (
    <div className="bg-slate-900 text-white text-xs font-semibold py-2 px-4 relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous announcement"
          onClick={() => setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)}
          className="p-1 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-2 text-center px-2 min-h-[20px]">
          <Icon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 animate-pulse" />
          <span className="tracking-wide text-slate-200">{current.text}</span>
        </div>

        <button
          type="button"
          aria-label="Next announcement"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
          className="p-1 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
