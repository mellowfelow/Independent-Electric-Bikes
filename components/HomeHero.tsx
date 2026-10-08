'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  { n: 1, alt: 'Two commuters riding electric bikes past a brick wall in the city', label: 'Urban commuters', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
  { n: 2, alt: 'Woman unfolding a black folding fat-tyre electric bike on a cobbled street', label: 'Folding & fat-tyre e-bikes', href: '/shop/electric-bikes/foldable-electric-bikes/' },
  { n: 3, alt: 'Bicycle and charging plug artwork on a brick wall', label: 'Charge. Ride. Repeat.', href: '/shop/electric-bikes/' },
  { n: 4, alt: 'Close-up of a red electric skateboard with large wheels', label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
  { n: 5, alt: 'Self-balancing electric board on dirt with a blurred car behind', label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
];

const INTERVAL_MS = 6500;

/**
 * Full-bleed hero background slideshow. Render it as the first child of a `relative overflow-hidden` section:
 * it fills the section, darkens the left side for text legibility and puts the slide controls bottom-right.
 */
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
  const current = SLIDES[index];

  return (
    <div className="absolute inset-0" role="region" aria-roledescription="carousel" aria-label="Featured product ranges">
      {SLIDES.map((s, i) => (
        <picture key={s.n} aria-hidden={i !== index}>
          <source media="(max-width: 767px)" srcSet={`/images/home/hero-${s.n}-m.webp`} />
          <img
            src={`/images/home/hero-${s.n}.webp`}
            alt={s.alt}
            width={2000}
            height={1125}
            // Slide 1 is the largest paint on the page: load it eagerly at high priority, the others lazily.
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        </picture>
      ))}

      {/* Legibility: heavy on the left where the headline sits, lighter to the right so the photo still shows. */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/35 md:bg-gradient-to-r md:from-slate-950/65 md:via-slate-950/20 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/5 bg-gradient-to-t from-slate-950/70 to-transparent" />

      <div
        className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-7xl items-end justify-end gap-3 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <Link href={current.href} className="group mr-auto hidden min-w-0 text-left sm:block">
          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">Shop the range</span>
          <span className="flex items-center gap-1.5 text-base font-extrabold text-white">
            <span className="truncate">{current.label}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 rounded-full bg-slate-950/60 px-1.5 backdrop-blur">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center" role="tablist" aria-label="Choose slide">
            {SLIDES.map((s, i) => (
              <button
                key={s.n}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.label}`}
                onClick={() => setIndex(i)}
                className="flex h-10 w-5 items-center justify-center"
              >
                <span className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-emerald-400' : 'w-1.5 bg-white/50'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
