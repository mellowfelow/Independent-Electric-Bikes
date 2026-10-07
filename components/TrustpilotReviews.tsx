'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Star,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  MessageSquare,
  ThumbsUp,
  Award,
  Truck,
  ShieldCheck,
  Zap,
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number; // 1 - 5
  date: string;
  title: string;
  content: string;
  productName: string;
  productSlug: string;
  category: 'delivery' | 'service' | 'quality' | 'post-purchase' | 'all';
  verified: boolean;
  merchantResponse?: string;
  helpfulCount: number;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'David Miller',
    location: 'Sydney, NSW',
    rating: 5,
    date: '3 days ago',
    title: 'Outstanding delivery promptness and build quality',
    content:
      'Ordered the Lekker Jordaan Urban 8sp on Tuesday and it arrived in Sydney on Thursday morning! Fully assembled in sturdy crating. The Bafang mid-drive motor climbs the North Shore hills effortlessly.',
    productName: 'Lekker Jordaan Urban 8sp',
    productSlug: 'lekker-jordaan-urban-8sp',
    category: 'delivery',
    verified: true,
    helpfulCount: 24,
  },
  {
    id: 'rev-2',
    author: 'Sarah Jenkins',
    location: 'Brunswick, VIC',
    rating: 5,
    date: '1 week ago',
    title: 'Best cargo e-bike for school drop-offs!',
    content:
      'Visited the Brunswick showroom on Sydney Rd. The staff spent 45 minutes walking me through battery safety and riding dynamics. The Tern GSD is a game changer for two toddlers. Exceptional customer service.',
    productName: 'Tern GSD S10 LX Cargo',
    productSlug: 'tern-gsd-s10-lx-cargo',
    category: 'service',
    verified: true,
    helpfulCount: 18,
  },
  {
    id: 'rev-3',
    author: 'Marcus Thorne',
    location: 'Brisbane, QLD',
    rating: 5,
    date: '2 weeks ago',
    title: 'Incredible post-purchase follow up!',
    content:
      'They called me a week after delivery to ensure pedal assist sensitivity was tuned to my liking and offered battery care advice for Brisbane summer heat. You do not get this level of care from big department stores.',
    productName: 'Aventon Level 3 Step-Through',
    productSlug: 'aventon-level-3-step-through',
    category: 'post-purchase',
    verified: true,
    helpfulCount: 31,
  },
  {
    id: 'rev-4',
    author: 'Liam Patterson',
    location: 'Perth, WA',
    rating: 4,
    date: '3 weeks ago',
    title: 'High torque for steep hills — minor freight delay',
    content:
      'The DiroDi Rover Gen 6 has immense power for Perth coastal tracks. Express freight took 4 business days instead of 2 due to cross-country rail logistics, but the team kept me updated every step of the way via SMS.',
    productName: 'DiroDi Rover Plus Gen 6',
    productSlug: 'dirodi-rover-plus-gen-6',
    category: 'delivery',
    verified: true,
    merchantResponse:
      'Hi Liam, thanks for the review! Cross-country Perth rail freight can occasionally experience 24-48hr depot delays, but we are thrilled you love the high torque power!',
    helpfulCount: 12,
  },
  {
    id: 'rev-5',
    author: 'Elena Rossi',
    location: 'Adelaide, SA',
    rating: 5,
    date: '1 month ago',
    title: 'Quick response on WhatsApp for technical setup',
    content:
      'Had a quick query regarding the digital display settings. Messaged their WhatsApp support line and received a video walk-through within 5 minutes. 5-star customer support!',
    productName: 'Specialized Turbo Como 3.0',
    productSlug: 'specialized-turbo-como-30',
    category: 'service',
    verified: true,
    helpfulCount: 15,
  },
  {
    id: 'rev-6',
    author: 'Craig Bell',
    location: 'Geelong, VIC',
    rating: 3,
    date: '1 month ago',
    title: 'Great e-bike, but courier depot delay during peak rush',
    content:
      'E-bike performance is superb and frame build is top tier. However, the external courier held the parcel at the regional depot for 3 days over the holiday period. Independent Electric Bikes support stayed on the case until delivered.',
    productName: 'NCM Milano Plus',
    productSlug: 'ncm-milano-plus',
    category: 'delivery',
    verified: true,
    merchantResponse:
      'Hi Craig, thank you for your patience. Holiday logistics peak periods can cause regional depot holds, and we appreciate your understanding while our team tracked it for you!',
    helpfulCount: 9,
  },
  {
    id: 'rev-7',
    author: 'Jason Lin',
    location: 'Melbourne, VIC',
    rating: 5,
    date: '2 months ago',
    title: 'Saved 10% paying with Crypto (USDT)!',
    content:
      'Seamless checkout. Selected Crypto option, transferred USDT, and received instant confirmation and dispatch email. The Trek Allant+ 5 handles Melbourne tram tracks with total stability.',
    productName: 'Trek Allant+ 5',
    productSlug: 'trek-allant-5',
    category: 'quality',
    verified: true,
    helpfulCount: 29,
  },
  {
    id: 'rev-8',
    author: 'Michael O’Connor',
    location: 'Newcastle, NSW',
    rating: 2,
    date: '2 months ago',
    title: 'Courier mislaid package at depot before resolving',
    content:
      'Freight company misplaced my shipment tag resulting in a 5 day delivery delay. Vyron support intervened directly with courier management to locate the crate and expedite delivery. Bike is good, but courier was frustrating.',
    productName: 'Pedal Comet 3 Disc',
    productSlug: 'pedal-comet-3-disc',
    category: 'delivery',
    verified: true,
    merchantResponse:
      'Hi Michael, we sincerely apologize for the freight provider depot mix-up in Newcastle. We have since onboarded dedicated express tail-lift carriers to eliminate depot transit issues.',
    helpfulCount: 19,
  },
  {
    id: 'rev-9',
    author: 'Hannah Wright',
    location: 'Hobart, TAS',
    rating: 5,
    date: '3 months ago',
    title: 'Flawless engineering for Tasmanian gradients',
    content:
      'Riese & Müller front-loader cargo bike conquered Mount Wellington inclines effortlessly with dual Bosch battery pack. Shipping to Hobart was surprisingly fast and secure.',
    productName: 'Riese & Müller Load 4 75',
    productSlug: 'riese-muller-load-4-75',
    category: 'quality',
    verified: true,
    helpfulCount: 14,
  },
  {
    id: 'rev-10',
    author: 'Andrew Stewart',
    location: 'Canberra, ACT',
    rating: 5,
    date: '3 months ago',
    title: 'Useful post-purchase maintenance guide included',
    content:
      'Solid commuter bike for Canberra bike paths. The follow-up email included a free maintenance checklist and chain lube guidelines. Outstanding buyer experience from start to finish.',
    productName: 'Kalkhoff Entice L Season',
    productSlug: 'kalkhoff-entice-l-season',
    category: 'post-purchase',
    verified: true,
    helpfulCount: 11,
  },
  {
    id: 'rev-11',
    author: 'Chloe Nguyen',
    location: 'Gold Coast, QLD',
    rating: 5,
    date: '4 months ago',
    title: 'Lightweight, sleek & ultra responsive',
    content:
      'Extremely light step-through e-bike. Easy to carry up apartment stairs. Cadence sensor assistance is smooth and natural. Delivered to Gold Coast in 3 days.',
    productName: 'Aventon Soltera.2 Step-Through',
    productSlug: 'aventon-soltera2-step-through',
    category: 'quality',
    verified: true,
    helpfulCount: 22,
  },
  {
    id: 'rev-12',
    author: 'Brett Lawson',
    location: 'B Bendigo, VIC',
    rating: 1,
    date: '5 months ago',
    title: 'Transit carton tear caused minor reflector scratch',
    content:
      'Outer box arrived with a puncture from freight handling misunderstanding, scratching a rear reflector. Customer service immediately sent a replacement reflector kit express and checked in twice.',
    productName: 'Fiido C11 Step-Through',
    productSlug: 'fiido-c11-step-through',
    category: 'delivery',
    verified: true,
    merchantResponse:
      'Hi Brett, thanks for working with our Brunswick service team. We inspect all cartons before dispatch and replaced the transit damaged reflector immediately. Glad you are enjoying the ride!',
    helpfulCount: 8,
  },
];

export function TrustpilotReviews() {
  const [activeTab, setActiveTab] = useState<'all' | '5' | '4' | '3' | '1-2'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [helpfulClicks, setHelpfulClicks] = useState<Record<string, number>>({});
  const sliderRef = useRef<HTMLDivElement>(null);

  // Filter reviews based on activeTab
  const filteredReviews = REVIEWS_DATA.filter((r) => {
    if (activeTab === '5') return r.rating === 5;
    if (activeTab === '4') return r.rating === 4;
    if (activeTab === '3') return r.rating === 3;
    if (activeTab === '1-2') return r.rating <= 2;
    return true;
  });

  const visibleCardsCount = 3; // Desktop visible cards
  const maxIndex = Math.max(0, filteredReviews.length - 1);

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying || filteredReviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= filteredReviews.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredReviews.length]);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= filteredReviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? filteredReviews.length - 1 : prev - 1));
  };

  const handleHelpful = (id: string) => {
    setHelpfulClicks((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="py-20 bg-slate-950 text-white border-b border-slate-900 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00b67a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TRUSTPILOT HEADER BAR */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Overall Rating & Trustpilot Badge */}
            <div className="lg:col-span-5 space-y-3 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                {/* Official Trustpilot Star Box */}
                <div className="w-8 h-8 bg-[#00b67a] rounded-lg flex items-center justify-center text-white shadow-md">
                  <Star className="w-5 h-5 fill-white text-white" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">Trustpilot</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-extrabold uppercase border border-emerald-500/20">
                  Verified Reviews
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <span className="text-4xl font-black text-white">4.8</span>
                <div className="space-y-1">
                  <div className="text-sm font-extrabold text-[#00b67a]">Excellent</div>
                  {/* 5 Green Star Rating Blocks */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} className="w-5 h-5 bg-[#00b67a] flex items-center justify-center rounded-sm">
                        <Star className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Based on <strong className="text-white">2,748 verified customer reviews</strong> from 2017 – Present.
              </p>
            </div>

            {/* Middle Column: Star Breakdown Bar Chart */}
            <div className="lg:col-span-4 space-y-2 text-xs font-semibold text-slate-300 border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400">5 Stars</span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00b67a] rounded-full w-[89%]" />
                </div>
                <span className="w-9 text-right font-bold text-white">89%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400">4 Stars</span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00b67a] rounded-full w-[7%]" />
                </div>
                <span className="w-9 text-right font-bold text-white">7%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400">3 Stars</span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[2%]" />
                </div>
                <span className="w-9 text-right font-bold text-white">2%</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 text-slate-400">1–2 Star</span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[2%]" />
                </div>
                <span className="w-9 text-right font-bold text-white">2%</span>
              </div>
            </div>

            {/* Right Column: Key Guarantees */}
            <div className="lg:col-span-3 space-y-2.5 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#00b67a] flex-shrink-0" />
                <span>100% Genuine Australian Buyers</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Delivery & Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Brunswick VIC Service Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Post-Purchase Follow Up</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER TABS */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-400" /> Filter:
            </span>
            <button
              onClick={() => {
                setActiveTab('all');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Reviews (2,748)
            </button>
            <button
              onClick={() => {
                setActiveTab('5');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === '5'
                  ? 'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>5 Stars</span>
              <span className="text-[10px] opacity-80">(2,445)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('4');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === '4'
                  ? 'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>4 Stars</span>
              <span className="text-[10px] opacity-80">(192)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('3');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === '3'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>3 Stars</span>
              <span className="text-[10px] opacity-80">(55)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('1-2');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === '1-2'
                  ? 'bg-rose-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>1–2 Stars (Honest Feedback)</span>
            </button>
          </div>

          {/* SLIDER NAVIGATION BUTTONS */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 px-2">
              {filteredReviews.length > 0 ? currentIndex + 1 : 0} / {filteredReviews.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TRUSTPILOT REVIEWS SLIDER CAROUSEL */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {filteredReviews.length === 0 ? (
            <div className="p-12 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              No reviews found matching this filter.
            </div>
          ) : (
            <div
              ref={sliderRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500 ease-out"
            >
              {/* Render 3 items starting from currentIndex */}
              {[0, 1, 2].map((offset) => {
                const itemIndex = (currentIndex + offset) % filteredReviews.length;
                const review = filteredReviews[itemIndex];
                if (!review) return null;

                const initialLetter = review.author.charAt(0);
                const isPositive = review.rating >= 4;

                return (
                  <div
                    key={`${review.id}-${offset}`}
                    className="bg-slate-900/90 border border-slate-800 hover:border-[#00b67a]/50 rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#00b67a]/10 group"
                  >
                    <div className="space-y-4">
                      {/* Top Row: Rating Stars & Verified Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <div
                              key={s}
                              className={`w-4 h-4 flex items-center justify-center rounded-sm ${
                                s <= review.rating ? 'bg-[#00b67a]' : 'bg-slate-800'
                              }`}
                            >
                              <Star
                                className={`w-3 h-3 ${
                                  s <= review.rating ? 'fill-white text-white' : 'text-slate-600'
                                }`}
                              />
                            </div>
                          ))}
                        </div>

                        {review.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00b67a] bg-[#00b67a]/10 px-2.5 py-0.5 rounded-full border border-[#00b67a]/20">
                            <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                          </span>
                        )}
                      </div>

                      {/* Review Title & Body */}
                      <div>
                        <h4 className="text-sm font-extrabold text-white group-hover:text-[#00b67a] transition-colors leading-snug line-clamp-2">
                          &quot;{review.title}&quot;
                        </h4>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal line-clamp-4">
                          {review.content}
                        </p>
                      </div>

                      {/* Verified Product Tag */}
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                          Product Purchased:
                        </span>
                        <Link
                          href={`/shop/electric-bikes/${review.productSlug}/`}
                          className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 mt-0.5 transition-colors line-clamp-1"
                        >
                          <span>{review.productName}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </Link>
                      </div>

                      {/* Official Merchant Response (if any) */}
                      {review.merchantResponse && (
                        <div className="bg-slate-950 border-l-2 border-[#00b67a] p-3 rounded-r-xl text-[11px] text-slate-300 space-y-1">
                          <div className="font-extrabold text-[#00b67a] flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" /> Response from Independent Electric Bikes
                          </div>
                          <p className="italic text-slate-400 leading-normal">{review.merchantResponse}</p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Row: Author Details & Helpful Counter */}
                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-emerald-400 shadow">
                          {initialLetter}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{review.author}</div>
                          <div className="text-[10px] text-slate-400">{review.location} · {review.date}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 hover:text-emerald-400 bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{(review.helpfulCount || 0) + (helpfulClicks[review.id] || 0)}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* INDICATOR DOTS */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {filteredReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-[#00b67a]' : 'w-2 bg-slate-800 hover:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
