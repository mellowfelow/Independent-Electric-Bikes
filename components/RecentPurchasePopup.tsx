'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS, SITE } from '@/config/site';

interface PurchaseNotification {
  id: string;
  customerName: string;
  location: string;
  timeAgo: string;
  paymentMethodTag?: string;
  productSlug: string;
  categorySlug: string;
  productName: string;
  price: number;
  image: string;
}

// Generate realistic purchase entries based on actual store products
const SAMPLE_LOCATIONS = [
  'Brunswick, VIC',
  'Bondi Beach, NSW',
  'South Brisbane, QLD',
  'Perth, WA',
  'Norwood, SA',
  'Fitzroy, VIC',
  'Surry Hills, NSW',
  'Geelong, VIC',
  'Hobart, TAS',
  'Canberra, ACT',
  'Gold Coast, QLD',
  'St Kilda, VIC',
  'Manly, NSW',
  'Fremantle, WA',
  'Adelaide, SA',
];

const SAMPLE_NAMES = [
  'Liam M.',
  'Sarah K.',
  'Marcus B.',
  'Chloe P.',
  'David T.',
  'Evelyn R.',
  'James H.',
  'Jessica L.',
  'Daniel S.',
  'Andrew K.',
  'Hannah W.',
  'Oliver G.',
  'Charlotte V.',
  'Ethan F.',
  'Zoe D.',
];

const TIMESTAMPS = [
  'Just now',
  '2 mins ago',
  '4 mins ago',
  '7 mins ago',
  '12 mins ago',
  '18 mins ago',
  '25 mins ago',
  '32 mins ago',
  '45 mins ago',
];

const PAYMENT_TAGS = [
  'Paid via Crypto (10% Off)',
  'Free Express Shipping',
  'Verified Purchase',
  'Direct Bank Transfer',
  'PayID Verified',
  'Verified Purchase',
];

export function RecentPurchasePopup() {
  const [purchaseList, setPurchaseList] = useState<PurchaseNotification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Select 10 featured or high-value items from PRODUCTS
    const availableProducts = PRODUCTS.length > 0 ? PRODUCTS : [];
    if (availableProducts.length === 0) return;

    // Pick a varied selection of products
    const featuredList = availableProducts.filter((p) => p.featured || p.badge !== 'none');
    const pool = featuredList.length >= 8 ? featuredList : availableProducts;

    const list: PurchaseNotification[] = pool.slice(0, 15).map((prod, idx) => {
      const name = SAMPLE_NAMES[idx % SAMPLE_NAMES.length];
      const loc = SAMPLE_LOCATIONS[idx % SAMPLE_LOCATIONS.length];
      const timeAgo = TIMESTAMPS[idx % TIMESTAMPS.length];
      const tag = PAYMENT_TAGS[idx % PAYMENT_TAGS.length];
      
      const img = prod.images && prod.images.length > 0 ? prod.images[0] : 'https://picsum.photos/seed/ieb-fallback/300/300';
      const imageSrc = img.startsWith('/') ? img : (img.startsWith('http') ? img : `/images/${img}`);

      return {
        id: `purchase-${idx}-${prod.slug}`,
        customerName: name,
        location: loc,
        timeAgo,
        paymentMethodTag: tag,
        productSlug: prod.slug,
        categorySlug: prod.category,
        productName: prod.name,
        price: prod.price,
        image: imageSrc,
      };
    });

    const timer = setTimeout(() => {
      setPurchaseList(list);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (purchaseList.length === 0 || isDismissed) return;

    // Initial pop-up timing: show after 1.8 seconds on page load
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1800);

    return () => clearTimeout(initialTimer);
  }, [purchaseList, isDismissed]);

  useEffect(() => {
    if (purchaseList.length === 0 || isDismissed) return;

    let hideTimer: NodeJS.Timeout;
    let nextTimer: NodeJS.Timeout;

    if (isVisible) {
      // Keep popup visible for 5.5 seconds
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    } else {
      // Pause for 3.5 seconds, then show next purchase in loop
      nextTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % purchaseList.length);
        setIsVisible(true);
      }, 3500);
    }

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [isVisible, purchaseList, isDismissed]);

  if (purchaseList.length === 0 || isDismissed) return null;

  const current = purchaseList[currentIndex];
  if (!current) return null;

  const productUrl = `/shop/${current.categorySlug}/${current.productSlug}`;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-[340px] sm:max-w-[360px] w-full transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 backdrop-blur-md text-white border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl hover:border-emerald-500/50 transition-all group relative overflow-hidden">
        {/* Subtle glowing accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

        {/* Close Button */}
        <button
          type="button"
          aria-label="Dismiss purchase notification"
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <Link href={productUrl} className="flex items-center gap-3">
          {/* Product Thumbnail */}
          <div className="relative w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
            <Image
              src={current.image}
              alt={current.productName}
              fill
              sizes="64px"
              referrerPolicy="no-referrer"
              className="object-contain p-1"
            />
            <div className="absolute bottom-0 inset-x-0 bg-emerald-600/90 text-[9px] font-bold text-center text-white py-0.5">
              ORDERED
            </div>
          </div>

          {/* Details Content */}
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="truncate">{current.customerName} in {current.location}</span>
            </div>

            <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
              {current.productName}
            </h4>

            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-300">
              <span className="font-extrabold text-emerald-400">
                ${current.price.toLocaleString('en-AU')} AUD
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{current.timeAgo}</span>
            </div>

            {current.paymentMethodTag && (
              <div className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/50 text-[9px] text-emerald-300 font-medium">
                <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                <span>{current.paymentMethodTag}</span>
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
