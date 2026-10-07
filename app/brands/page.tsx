'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_BRANDS, getProductsByBrand, BrandDef } from '@/config/brands';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { Search, ShieldCheck, Zap, Cpu, ArrowRight, Layers, Award, Bike, Sparkles } from 'lucide-react';

const CATEGORY_FILTERS = [
  'All',
  'Electric Bikes',
  'Electric Scooters',
  'Electric Skateboards',
  'Electric Unicycles',
  'Kids & E-Dirt Bikes',
  'Mobility Scooters',
  'Accessories & Components',
];

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Calculate product counts for every brand
  const brandsWithCounts = useMemo(() => {
    return ALL_BRANDS.map((brand) => ({
      ...brand,
      productCount: getProductsByBrand(brand.slug).length,
    })).filter((brand) => brand.productCount > 0);
  }, []);

  // Filtered brands based on search & category
  const filteredBrands = useMemo(() => {
    return brandsWithCounts.filter((brand) => {
      const matchesCategory =
        selectedCategory === 'All' || brand.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [brandsWithCounts, selectedCategory, searchQuery]);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `https://${SITE.domain}/brands/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-white min-h-screen pb-24">
        {/* Hero Banner */}
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-slate-900 to-slate-900 pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Official Australian Brand Directory</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Premier E-Mobility Brands & Manufacturers
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore Australia’s largest independent catalog of official e-bike, e-scooter, e-skateboard, e-dirt bike, and mobility scooter manufacturers. Guaranteed local Australian warranty and express freight nationwide.
            </p>

            {/* Quick Stats Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">{brandsWithCounts.length}+</div>
                <div className="text-[11px] text-slate-400 font-medium">World-Class Brands</div>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">730+</div>
                <div className="text-[11px] text-slate-400 font-medium">In-Stock Models</div>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">10% Off</div>
                <div className="text-[11px] text-slate-400 font-medium">Crypto & PayID Discount</div>
              </div>
              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">2-Year</div>
                <div className="text-[11px] text-slate-400 font-medium">AU Warranty & Parts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands (e.g. Specialized, Trek, Segway Ninebot, Evolve, Riese & Müller)..."
                className="w-full pl-12 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORY_FILTERS.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Counter */}
          <div className="flex items-center justify-between mt-6 text-xs text-slate-400 px-1">
            <div>
              Showing <span className="font-extrabold text-white">{filteredBrands.length}</span> brands
              {selectedCategory !== 'All' && <span> in <strong className="text-emerald-400">{selectedCategory}</strong></span>}
            </div>
            {searchQuery && (
              <div>
                Search result for &quot;<span className="text-white">{searchQuery}</span>&quot;
              </div>
            )}
          </div>

          {/* Brand Cards Grid */}
          {filteredBrands.length === 0 ? (
            <div className="text-center py-16 bg-slate-900 border border-slate-800 rounded-2xl mt-6 space-y-3">
              <Bike className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">No brands found</h3>
              <p className="text-xs text-slate-400">
                Try adjusting your search query or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}/`}
                  className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/40 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Top Row: Category Badge & Model Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                        {brand.category}
                      </span>
                      <span className="text-[11px] font-bold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
                        {brand.productCount} {brand.productCount === 1 ? 'Model' : 'Models'}
                      </span>
                    </div>

                    {/* Brand Name */}
                    <h2 className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                      <span>{brand.name}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400 transform group-hover:translate-x-1 transition-transform" />
                    </h2>

                    {/* Tagline */}
                    <p className="text-xs font-bold text-slate-300 line-clamp-1">
                      {brand.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-normal">
                      {brand.description}
                    </p>
                  </div>

                  {/* Bottom Footer CTA */}
                  <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                    <span>View {brand.name} Range</span>
                    <span className="text-[10px] text-slate-500 font-medium">10% Crypto Discount</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Component Engineering Partners Section */}
          <div className="mt-20 space-y-8 border-t border-slate-800 pt-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Core Powertrain Tech</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Component Partner Directory</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                In addition to complete e-bike and e-scooter manufacturers, we engineer with world-leading component drive systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bafang */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>Drive Motors</span>
                </div>
                <h3 className="text-lg font-bold text-white">Bafang Motors</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Bafang high-torque 80Nm-95Nm rear hub and M500 mid-drive motors power our daily commuter and heavy cargo ranges.
                </p>
              </div>

              {/* Samsung */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Lithium Battery Cells</span>
                </div>
                <h3 className="text-lg font-bold text-white">Samsung 21700 Cells</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Genuine Samsung 21700 lithium battery packs deliver 80km-140km ranges with thermal protection BMS safety.
                </p>
              </div>

              {/* Tektro & Shimano */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Hydraulic Braking</span>
                </div>
                <h3 className="text-lg font-bold text-white">Tektro & Shimano</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dual-piston hydraulic disc brakes with mineral oil lines provide fade-free stopping power in dry or wet Australian conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
