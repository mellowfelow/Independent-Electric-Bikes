'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyFieldProps {
  label: string;
  value: string;
}

export function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3.5 transition-all hover:border-emerald-500/50">
      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </div>
      <div className="flex items-center justify-between gap-3">
        <code className="font-mono text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 select-all break-all">
          {value}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
            copied
              ? 'bg-emerald-700 text-white'
              : 'bg-slate-200 hover:bg-emerald-700 hover:text-white dark:bg-slate-800 dark:hover:bg-emerald-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          ) }
        </button>
      </div>
    </div>
  );
}
