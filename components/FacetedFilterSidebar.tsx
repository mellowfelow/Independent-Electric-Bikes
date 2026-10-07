'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Filter, X, Check, RefreshCw } from 'lucide-react';
import { MASTER_TAXONOMY, ProductFilters } from '@/config/site';

interface FacetedFilterSidebarProps {
  selectedCategory?: string;
  selectedFilters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

export function FacetedFilterSidebar({
  selectedCategory,
  selectedFilters,
  onFilterChange,
  onClearFilters,
}: FacetedFilterSidebarProps) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  const filterOptions = {
    motorType: ['Rear Hub', 'Mid-Drive', 'Dual Motor', 'Hub Drive'] as const,
    sensorType: ['Torque Sensor', 'Cadence Sensor', 'Gyroscopic', 'Throttle'] as const,
    compliance: ['EN15194 Certified', 'Off-Road Private Land', 'CE Certified'] as const,
    brakeType: ['Hydraulic Disc', 'Mechanical Disc', 'Regenerative', 'V-Brake'] as const,
    batteryRange: ['Under 50km', '50km+ Long Range'] as const,
  };

  const handleToggleOption = (key: keyof ProductFilters, value: any) => {
    const updated = { ...selectedFilters };
    if (updated[key] === value) {
      delete updated[key];
    } else {
      updated[key] = value;
    }
    onFilterChange(updated);
  };

  const activeCount = Object.keys(selectedFilters).length;

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="w-full py-2.5 px-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Filter Products {activeCount > 0 && `(${activeCount} Active)`}</span>
          </div>
          <span className="text-emerald-400 font-mono font-bold">{isOpenMobile ? 'Hide' : 'Show'}</span>
        </button>
      </div>

      {/* Sidebar Panel */}
      <div
        className={`bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-6 text-xs ${
          isOpenMobile ? 'block mb-6' : 'hidden lg:block'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="font-extrabold text-sm text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <span>Faceted Filters</span>
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear ({activeCount})</span>
            </button>
          )}
        </div>

        {/* 1. Category Tree Links */}
        <div className="space-y-2">
          <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Taxonomy Categories</div>
          <div className="space-y-1.5 pl-1 max-h-48 overflow-y-auto pr-1">
            <Link
              href="/shop/"
              className={`block py-1 text-xs font-bold transition-colors ${
                !selectedCategory ? 'text-emerald-400' : 'text-slate-300 hover:text-white'
              }`}
            >
              All Master Collections
            </Link>
            {MASTER_TAXONOMY.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}/`}
                className={`block py-1 text-xs font-semibold transition-colors ${
                  selectedCategory === cat.slug ? 'text-emerald-400 font-extrabold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                • {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Motor Type Filter */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Motor Type</div>
          <div className="space-y-1.5">
            {filterOptions.motorType.map((type) => {
              const isSelected = selectedFilters.motorType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleToggleOption('motorType', type)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{type}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Sensor Type Filter */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Sensor Type</div>
          <div className="space-y-1.5">
            {filterOptions.sensorType.map((sensor) => {
              const isSelected = selectedFilters.sensorType === sensor;
              return (
                <button
                  key={sensor}
                  type="button"
                  onClick={() => handleToggleOption('sensorType', sensor)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{sensor}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Compliance Certification */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Compliance Standards</div>
          <div className="space-y-1.5">
            {filterOptions.compliance.map((comp) => {
              const isSelected = selectedFilters.compliance === comp;
              return (
                <button
                  key={comp}
                  type="button"
                  onClick={() => handleToggleOption('compliance', comp)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{comp}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Brake Type */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Brake System</div>
          <div className="space-y-1.5">
            {filterOptions.brakeType.map((brake) => {
              const isSelected = selectedFilters.brakeType === brake;
              return (
                <button
                  key={brake}
                  type="button"
                  onClick={() => handleToggleOption('brakeType', brake)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{brake}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. Battery Range */}
        <div className="space-y-2 border-t border-slate-800/80 pt-4">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Battery Range</div>
          <div className="space-y-1.5">
            {filterOptions.batteryRange.map((range) => {
              const isSelected = selectedFilters.batteryRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => handleToggleOption('batteryRange', range)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{range}</span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
