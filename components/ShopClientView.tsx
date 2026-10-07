'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PRODUCTS, MASTER_TAXONOMY, Product, ProductFilters } from '@/config/site';
import { FacetedFilterSidebar } from '@/components/FacetedFilterSidebar';
import { ProductCard } from '@/components/ProductCard';
import { money } from '@/lib/order';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface ShopClientViewProps {
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 16;

export function ShopClientView({ initialCategory }: ShopClientViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategory);
  const [selectedFilters, setSelectedFilters] = useState<ProductFilters>({});
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // 1. Category match
      if (selectedCategory) {
        if (p.category !== selectedCategory && p.subcategory !== selectedCategory && p.subSubcategory !== selectedCategory) {
          return false;
        }
      }

      // 2. Faceted Filter Matches
      if (selectedFilters.motorType && p.filters?.motorType !== selectedFilters.motorType) {
        return false;
      }

      if (selectedFilters.sensorType && p.filters?.sensorType !== selectedFilters.sensorType) {
        return false;
      }

      if (selectedFilters.compliance && p.filters?.compliance !== selectedFilters.compliance) {
        return false;
      }

      if (selectedFilters.brakeType && p.filters?.brakeType !== selectedFilters.brakeType) {
        return false;
      }

      if (selectedFilters.batteryRange && p.filters?.batteryRange !== selectedFilters.batteryRange) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedFilters]);

  // Reset pagination when filter or category changes
  const handleCategoryChange = (cat?: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters: ProductFilters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Faceted Filter Sidebar */}
      <div className="lg:col-span-3">
        <FacetedFilterSidebar
          selectedCategory={selectedCategory}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClearFilters={() => handleFilterChange({})}
        />
      </div>

      {/* Right Column: Product Grid */}
      <div className="lg:col-span-9 space-y-6">
        {/* Top Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCategoryChange(undefined)}
            className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
              !selectedCategory ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            All Products ({PRODUCTS.length})
          </button>
          {MASTER_TAXONOMY.map((m) => {
            const isSelected = selectedCategory === m.slug;
            const count = PRODUCTS.filter((p) => p.category === m.slug).length;
            return (
              <button
                key={m.slug}
                type="button"
                onClick={() => handleCategoryChange(isSelected ? undefined : m.slug)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isSelected ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {m.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Results Header */}
        <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
          <span>
            Showing <strong>{startIndex + 1} - {Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> products (Page {currentPage} of {totalPages})
          </span>
          {Object.keys(selectedFilters).length > 0 && (
            <span className="text-emerald-400 font-bold">Faceted Filters Active</span>
          )}
        </div>

        {/* Grid (4/4/4/4 Grid Alignment) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
            No products match the selected faceted filter criteria. Try clearing filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}

        {/* Pagination Controls (16 Items Per Page) */}
        {totalPages > 1 && (
          <div className="pt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isCurrent = pageNum === currentPage;
              // Show pages around current
              if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)) {
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                return <span key={pageNum} className="text-slate-600 text-xs px-1">...</span>;
              }
              return null;
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 transition-all cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
