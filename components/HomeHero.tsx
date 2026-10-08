'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { src: '/images/home/hero-1.webp', alt: 'Two commuters riding electric bikes past a brick wall in the city', label: 'Urban commuters', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
  { src: '/images/home/hero-2.webp', alt: 'Woman unfolding a black folding fat-tyre electric bike on a cobbled street', label: 'Folding & fat-tyre e-bikes', href: '/shop/electric-bikes/foldable-electric-bikes/' },
  { src: '/images/home/hero-3.webp', alt: 'Bicycle and charging plug artwork on a brick wall', label: 'Charge. Ride. Repeat.', href: '/shop/electric-bikes/' },
  { src: '/images/home/hero-4.webp', alt: 'Close-up of a red electric skateboard with large wheels', label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
  { src: '/images/home/hero-5.webp', alt: 'Self-balancing electric board on dirt with a blurred car behind', label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
];

const INTERVAL_MS = 6000;

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL_MS);
    return () => clearInterval(t);
  }, [paused, reduceMotion]);

  const go = (n: number) => setIndex((n + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured product ranges"
    >
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={1200}
          height={900}
          // The first slide is the largest paint on the page: load it eagerly at high priority, the rest lazily.
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          decoding="async"
          aria-hidden={i !== index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <Link href={SLIDES[index].href} className="group min-w-0 text-left">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Shop the range</span>
          <span className="flex items-center gap-1.5 text-base font-extrabold text-white sm:text-lg">
            <span className="truncate">{SLIDES[index].label}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 text-white hover:bg-slate-950/90">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center" role="tablist" aria-label="Choose slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.label}`}
                onClick={() => setIndex(i)}
                className="flex h-9 w-5 items-center justify-center"
              >
                <span className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/50'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950/60 text-white hover:bg-slate-950/90">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
