'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bike, ShoppingBag, Search, Menu, X, ChevronDown, ChevronRight, Zap } from 'lucide-react';
import { SITE, MASTER_TAXONOMY } from '@/config/site';
import { CartDrawer } from './CartDrawer';
import { SearchBox } from './SearchBox';

export function Nav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState('electric-bikes');

  const updateCartCount = () => {
    try {
      const stored = localStorage.getItem(SITE.cartKey);
      if (stored) {
        const items = JSON.parse(stored);
        const count = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateCartCount, 0);
    const handleOpenCart = () => setIsCartOpen(true);

    window.addEventListener('ieb-cart-update', updateCartCount);
    window.addEventListener('ieb-open-cart', handleOpenCart);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('ieb-cart-update', updateCartCount);
      window.removeEventListener('ieb-open-cart', handleOpenCart);
    };
  }, []);

  const activeCategory = MASTER_TAXONOMY.find((m) => m.slug === activeCategorySlug) || MASTER_TAXONOMY[0];

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Brand Logo & Name */}
            <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                <Bike className="w-6 h-6" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="font-extrabold text-[13px] sm:text-xl tracking-tight text-white leading-tight sm:leading-none">
                  <span className="block sm:inline">INDEPENDENT</span> <span className="block sm:inline text-emerald-400 font-black">ELECTRIC BIKES</span>
                </span>
                <span className="hidden sm:block text-[10px] text-slate-400 tracking-wider uppercase font-semibold mt-1">
                  VYRON Industries · Brunswick VIC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-300">
              {/* Mega Dropdown for Master Store Taxonomy */}
              <div
                className="relative"
                onMouseEnter={() => setIsMegaOpen(true)}
                onMouseLeave={() => setIsMegaOpen(false)}
              >
                <Link
                  href="/shop/"
                  className="flex items-center gap-1.5 py-2 hover:text-emerald-400 transition-colors"
                >
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Shop EV Range</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isMegaOpen ? 'rotate-180' : ''}`} />
                </Link>

                {/* Rich Multi-Category Taxonomy Mega Menu */}
                {isMegaOpen && (
                  <div className="absolute top-full left-[-100px] w-[880px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-top-2 z-50">
                    {/* Left Column: Top Level Collections (7 Main Categories) */}
                    <div className="col-span-4 border-r border-slate-800/80 pr-4 space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-3 py-1">
                        Master Store Collections
                      </div>
                      {MASTER_TAXONOMY.map((cat) => {
                        const isActive = cat.slug === activeCategorySlug;
                        return (
                          <Link
                            key={cat.slug}
                            href={`/shop/${cat.slug}/`}
                            onMouseEnter={() => setActiveCategorySlug(cat.slug)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                              isActive
                                ? 'bg-emerald-700 text-white shadow-md'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          </Link>
                        );
                      })}

                      <div className="pt-3 border-t border-slate-800/80">
                        <Link
                          href="/shop/"
                          className="text-xs font-black text-emerald-400 hover:text-emerald-300 px-3 block"
                        >
                          View Entire Store Catalog &rarr;
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Subcategories & Items for Active Category */}
                    <div className="col-span-8 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div>
                          <h3 className="text-sm font-extrabold text-white">{activeCategory.name}</h3>
                          <p className="text-[11px] text-slate-400 font-normal">{activeCategory.description}</p>
                        </div>
                        <Link
                          href={`/shop/${activeCategory.slug}/`}
                          className="text-xs font-bold text-emerald-400 hover:underline flex-shrink-0"
                        >
                          View All in {activeCategory.name} &rarr;
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-2">
                        {activeCategory.subcategories.map((sub) => (
                          <div key={sub.slug} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
                            <Link
                              href={sub.path}
                              className="font-extrabold text-xs text-white hover:text-emerald-400 block transition-colors"
                            >
                              {sub.name}
                            </Link>
                            {sub.description && (
                              <p className="text-[10px] text-slate-400 line-clamp-2">{sub.description}</p>
                            )}

                            {sub.items && sub.items.length > 0 && (
                              <div className="space-y-1 pt-1 border-t border-slate-900">
                                {sub.items.map((item) => (
                                  <Link
                                    key={item.slug}
                                    href={item.path}
                                    className="block text-[11px] text-slate-300 hover:text-emerald-400 font-medium transition-colors"
                                  >
                                    • {item.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/brands/" className="hover:text-emerald-400 transition-colors">
                Brands & Tech
              </Link>
              <Link href="/compare/" className="hover:text-emerald-400 transition-colors">
                Compare Matrix
              </Link>
              <Link href="/about/" className="hover:text-emerald-400 transition-colors">
                About Us
              </Link>
              <Link href="/contact/" className="hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Actions: Search Form + Cart Toggle */}
            <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
              {/* Search Bar */}
              <SearchBox className="hidden sm:block w-48 lg:w-60" />

              {/* Phones: a visible search button that opens the menu with the search field focused */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileOpen(true);
                  setTimeout(() => mobileSearchRef.current?.focus(), 50);
                }}
                aria-label="Search the store"
                className="sm:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Drawer Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Open shopping cart with ${cartCount} items`}
                className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-emerald-500/50 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-slate-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                aria-label="Toggle Navigation Menu"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-3 max-h-[85vh] overflow-y-auto">
            <SearchBox className="w-full" inputClassName="rounded-xl py-3 text-sm" placeholder="Search products, brands..." inputRef={mobileSearchRef} onNavigate={() => setIsMobileOpen(false)} />

            <nav className="flex flex-col space-y-3 font-bold text-slate-200 text-sm">
              <Link
                href="/shop/"
                onClick={() => setIsMobileOpen(false)}
                className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-emerald-400"
              >
                Shop All EV Products &rarr;
              </Link>

              {MASTER_TAXONOMY.map((cat) => (
                <div key={cat.slug} className="space-y-1">
                  <Link
                    href={`/shop/${cat.slug}/`}
                    onClick={() => setIsMobileOpen(false)}
                    className="block text-xs font-black uppercase text-emerald-400 tracking-wider pt-2"
                  >
                    {cat.name}
                  </Link>
                  <div className="pl-3 space-y-1 border-l border-slate-800">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.path}
                        onClick={() => setIsMobileOpen(false)}
                        className="block text-xs font-semibold text-slate-300 hover:text-white py-1"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <Link href="/brands/" onClick={() => setIsMobileOpen(false)} className="block p-2 rounded-xl hover:bg-slate-900">
                  Brands & Engineering
                </Link>
                <Link href="/compare/" onClick={() => setIsMobileOpen(false)} className="block p-2 rounded-xl hover:bg-slate-900">
                  Compare Spec Matrix
                </Link>
                <Link href="/about/" onClick={() => setIsMobileOpen(false)} className="block p-2 rounded-xl hover:bg-slate-900">
                  About Us (VYRON)
                </Link>
                <Link href="/contact/" onClick={() => setIsMobileOpen(false)} className="block p-2 rounded-xl hover:bg-slate-900">
                  Contact Showroom
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
