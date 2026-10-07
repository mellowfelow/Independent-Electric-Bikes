'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product, SITE, SHOP } from '@/config/site';
import { BrandDef, ALL_BRANDS } from '@/config/brands';
import { ProductCard } from '@/components/ProductCard';
import { money } from '@/lib/order';
import {
  Zap,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Truck,
  ArrowRight,
  Bike,
  Award,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';

interface BrandDetailClientProps {
  brand: BrandDef;
  products: Product[];
}

export function BrandDetailClient({ brand, products }: BrandDetailClientProps) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<{ [slug: string]: number }>({});
  const [addedSlugs, setAddedSlugs] = useState<{ [slug: string]: boolean }>({});

  // Subcategories present in this brand's products
  const subcategories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.subcategory) set.add(p.subcategory);
    });
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter & Sort products
  const displayedProducts = useMemo(() => {
    let list = [...products];

    if (selectedSubcategory !== 'All') {
      list = list.filter((p) => p.subcategory === selectedSubcategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [products, selectedSubcategory, sortBy]);

  // Related brands in same category
  const relatedBrands = useMemo(() => {
    return ALL_BRANDS.filter(
      (b) => b.category === brand.category && b.slug !== brand.slug
    ).slice(0, 4);
  }, [brand]);

  // Quantity stepper handlers
  const handleQtyChange = (slug: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[slug] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [slug]: updated };
    });
  };

  // Add to Cart handler
  const handleAddToCart = (product: Product) => {
    try {
      const qty = quantities[product.slug] || 1;
      const stored = localStorage.getItem(SITE.cartKey);
      let items = stored ? JSON.parse(stored) : [];

      const index = items.findIndex((i: { slug: string }) => i.slug === product.slug);
      if (index > -1) {
        items[index].quantity += qty;
      } else {
        items.push({
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.images[0],
        });
      }

      localStorage.setItem(SITE.cartKey, JSON.stringify(items));
      window.dispatchEvent(new Event('ieb-cart-update'));
      window.dispatchEvent(new Event('ieb-open-cart'));

      setAddedSlugs((prev) => ({ ...prev, [product.slug]: true }));
      setTimeout(() => {
        setAddedSlugs((prev) => ({ ...prev, [product.slug]: false }));
      }, 2000);
    } catch (e) {
      console.error('Failed adding brand product to cart:', e);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen pb-24">
      {/* Brand Header Banner */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/30 via-slate-900 to-slate-900 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Breadcrumb Back Link */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/brands/" className="hover:text-emerald-400 transition-colors">Brands</Link>
            <span>/</span>
            <span className="text-white font-bold">{brand.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Brand Info */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold uppercase tracking-wider rounded-md">
                  {brand.category}
                </span>
                <span className="px-3 py-1 bg-slate-950 border border-slate-800 text-slate-300 text-xs font-bold rounded-md">
                  {products.length} {products.length === 1 ? 'Model' : 'Models'} in Stock
                </span>
                <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-md flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>10% Off with Crypto & PayID</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {brand.name}
              </h1>

              <p className="text-sm sm:text-base font-bold text-emerald-400">
                {brand.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
                {brand.description}
              </p>
            </div>

            {/* Right Column: Value Props Card */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
              <div className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Why Buy {brand.name} at VYRON</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Official 2-Year Australian Local Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free Courier Shipping over $1,500 AUD</span>
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Pay with Crypto & Save 10% Instantly</span>
                </li>
                <li className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Min Order $350 AUD — Direct Showroom Dispatch</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-8">
        {/* Toolbar: Subcategory Filters & Sorting */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          {/* Subcategory Pills */}
          {subcategories.length > 2 ? (
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 shrink-0 mr-1">Series:</span>
              {subcategories.map((sub) => {
                const isActive = selectedSubcategory === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                    }`}
                  >
                    {sub === 'All' ? 'All Models' : sub.replace(/-/g, ' ')}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">
              Showing all <strong className="text-white">{displayedProducts.length}</strong> official {brand.name} models
            </div>
          )}

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400 w-full sm:w-auto justify-end">
            <label htmlFor="brand-sort" className="shrink-0 font-bold">Sort By:</label>
            <select
              id="brand-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-white font-bold text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Model Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid (4/4/4/4 Alignment) */}
        {displayedProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <Bike className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No models available in this series</h3>
            <p className="text-xs text-slate-400">Try clearing your series filter above.</p>
            <button
              onClick={() => setSelectedSubcategory('All')}
              className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Show All {brand.name} Models
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        {/* Related Category Brands Section */}
        {relatedBrands.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Similar Manufacturers</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">Explore Other {brand.category} Brands</h2>
              </div>
              <Link href="/brands/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                View All Brands &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBrands.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/brands/${rel.slug}/`}
                  className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-2 transition-all hover:shadow-xl group"
                >
                  <div className="text-[10px] font-extrabold uppercase text-emerald-400">{rel.category}</div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                    <span>{rel.name}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{rel.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
