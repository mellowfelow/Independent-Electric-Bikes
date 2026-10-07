'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <h3 className="text-base font-extrabold text-white">{item.question}</h3>
              <div
                className={`p-2 rounded-lg bg-slate-900 text-emerald-400 transform transition-transform duration-200 flex-shrink-0 ${
                  isOpen ? 'rotate-180 bg-emerald-500/10' : ''
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-900 font-normal">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
