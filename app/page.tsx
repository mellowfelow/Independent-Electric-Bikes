import Link from 'next/link';
import { Bike, ShieldCheck, Zap, Truck, ArrowRight, CheckCircle2, ChevronRight, Award, Calendar, Clock, BookOpen } from 'lucide-react';
import { SITE, PRODUCTS, CATEGORIES, BRAND, FAQ, POSTS } from '@/config/site';
import { money } from '@/lib/order';
import { JsonLd } from '@/components/JsonLd';
import { FaqAccordion } from '@/components/FaqAccordion';
import { TrustpilotReviews } from '@/components/TrustpilotReviews';
import { ProductCard } from '@/components/ProductCard';
import { HomeHero } from '@/components/HomeHero';

export default function HomePage() {
  const hasPhoto = (p: (typeof PRODUCTS)[number]) => !p.images[0].endsWith('.svg');
  const featuredProducts = [...PRODUCTS.filter((p) => p.featured)].sort((a, b) => Number(hasPhoto(b)) - Number(hasPhoto(a))).slice(0, 8);
  const latestPosts = POSTS.slice(0, 3);

  // Homepage JSON-LD Schemas
  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'Organization'],
    name: SITE.name,
    description: BRAND.description,
    foundingDate: BRAND.foundingYear,
    foundingLocation: {
      '@type': 'Place',
      name: BRAND.foundingLocation,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '380 Sydney Road',
      addressLocality: 'Brunswick',
      addressRegion: 'VIC',
      postalCode: '3056',
      addressCountry: 'AU',
    },
    url: `https://${SITE.domain}/`,
    sameAs: BRAND.sameAs,
    areaServed: ['Victoria', 'Australia'],
    numberOfItems: PRODUCTS.length,
    knowsAbout: [
      'Electric Commuter Bikes',
      'Cargo Electric Bikes',
      'Folding E-Bikes',
      'Bafang Hub Motors',
      'Samsung E-Bike Batteries',
    ],
    priceRange: '$$',
    brand: {
      '@type': 'Brand',
      name: 'VYRON Electric Bikes',
    },
    makesOffer: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AUD',
      lowPrice: Math.min(...PRODUCTS.map((p) => p.price)),
      highPrice: Math.max(...PRODUCTS.map((p) => p.price)),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2748',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: `https://${SITE.domain}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://${SITE.domain}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={storeSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
                <Bike className="w-4 h-4" />
                <span>VYRON Industries · Brunswick Showroom VIC</span>
              </div>

              {/* SINGLE H1 FOR SEO */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Find the <span className="text-emerald-400 underline decoration-emerald-500/40 decoration-4">Best Electric Commuter Bike</span> in Australia
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Independent Electric Bikes delivers premium urban commuters, cargo e-bikes, and folding e-bikes across Australia. Operated by <strong>{SITE.entityName}</strong> (ABN {SITE.abn}) in Brunswick, Victoria.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/shop/"
                  className="px-7 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm transition-all shadow-xl shadow-emerald-950/50 hover:scale-105 flex items-center gap-2"
                >
                  <span>Explore E-Bike Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/compare/"
                  className="px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-sm transition-all border border-slate-800 hover:border-slate-700 flex items-center gap-2"
                >
                  <span>Compare Spec Matrix</span>
                </Link>
              </div>

              {/* Hero Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-xs font-bold text-slate-300">
                <div>
                  <div className="text-emerald-400 font-black text-lg sm:text-xl">{PRODUCTS.length}+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Models in Stock</div>
                </div>
                <div>
                  <div className="text-emerald-400 font-black text-lg sm:text-xl">80km Range</div>
                  <div className="text-[11px] text-slate-400 font-medium">Samsung Lithium Battery</div>
                </div>
                <div>
                  <div className="text-emerald-400 font-black text-lg sm:text-xl">10% Off</div>
                  <div className="text-[11px] text-slate-400 font-medium">Crypto & PayID Discount</div>
                </div>
              </div>
            </div>

            {/* Right Hero Slideshow */}
            <div className="lg:col-span-5 relative">
              <HomeHero />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-slate-900 py-8 border-b border-slate-800 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Express Freight VIC & AU</h4>
                <p className="text-[11px] text-slate-400">Free courier shipping over $1,500 AUD</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">2-Year VYRON Warranty</h4>
                <p className="text-[11px] text-slate-400">Full Australian local service & parts</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">Samsung & Bafang Drive</h4>
                <p className="text-[11px] text-slate-400">80Nm hill climbing torque tech</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs">ABN Registered 2017</h4>
                <p className="text-[11px] text-slate-400">VYRON Industries Pty Ltd VIC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES GRID */}
      <section className="py-16 bg-slate-950 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Purpose-Built Mobility</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">Shop by E-Bike Category</h2>
            </div>
            <Link href="/shop/" className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
              View All Electric Bikes &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[4/3] flex flex-col justify-end p-5 transition-all hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-950/40"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-lg font-extrabold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ChevronRight className="w-5 h-5 text-emerald-400 transform group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mt-1 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED E-BIKES SHOWCASE (4/4 GRID) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Flagship Models</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Featured Electric Bikes</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              High performance motors, Samsung battery cells, and hydraulic braking engineered for Australian roads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTPILOT REVIEWS SLIDER GRID */}
      <TrustpilotReviews />

      {/* 5. HOMEPAGE BLOG GRID SECTION (DECO SHARPNESS) */}
      <section className="py-20 bg-slate-950 border-b border-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Expert Knowledge & Guides</span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">Latest Australian E-Bike Articles</h2>
            </div>
            <Link
              href="/blog/"
              className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              View All 10 Guides &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/50 transition-all group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-md shadow">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 pt-2"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. ABOUT VYRON INDUSTRIES (AI VISIBILITY AUTHORITY SECTION) */}
      <section className="py-20 bg-slate-900 border-b border-slate-800 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Australian Engineering & History</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                About Independent Electric Bikes (VYRON Industries)
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Founded in <strong>2017</strong> in Brunswick, Victoria, <strong>{SITE.entityName}</strong> (
                <a
                  href="https://abr.business.gov.au/ABN/View?id=23618699479"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  ABN {SITE.abn}
                </a>
                ) was established to engineer reliable, powerful electric commuter bikes designed specifically for Australian road conditions, steep urban inclines, and long-range daily commuting.
              </p>

              <div className="space-y-3 pt-2">
                {BRAND.differentiation.map((diff, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{diff}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about/"
                  className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl border border-slate-800 transition-colors"
                >
                  Read Full Brand Story &rarr;
                </Link>
                <div className="text-xs text-slate-400">
                  📍 Brunswick Showroom: <strong>380 Sydney Rd VIC 3056</strong>
                </div>
              </div>
            </div>

            {/* Milestones Timeline Card */}
            <div className="lg:col-span-6 bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h3 className="text-base font-extrabold text-white mb-4 border-b border-slate-800 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>VYRON Industries Historical Milestones</span>
              </h3>

              <div className="space-y-4">
                {BRAND.milestones.map((m) => (
                  <div key={m.year} className="flex gap-4">
                    <div className="font-mono font-black text-emerald-400 text-sm w-12 flex-shrink-0">{m.year}</div>
                    <div className="text-xs text-slate-300 font-medium leading-normal">{m.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COLLAPSIBLE FAQ SECTION */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Help & Support</span>
            <h2 className="text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400 mt-2">Click any question below to expand the detailed answer.</p>
          </div>

          <FaqAccordion items={FAQ} />

          <div className="mt-10 text-center">
            <Link href="/faq/" className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300">
              View All E-Bike Warranty & Care FAQs &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
