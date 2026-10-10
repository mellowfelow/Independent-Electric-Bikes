'use client';

import Link from 'next/link';
import { Calendar, Mail, Phone, Building2, Trash2, Reply, Eye } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { FormBadge, stripeFor } from './Badges';
import type { EnquiryRecord } from '@/lib/enquiryStore';

const when = (iso: string) => {
  try {
    return new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
};

export function EnquiryCard({ enquiry: e, onDelete }: { enquiry: EnquiryRecord; onDelete?: (id: string) => void }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-colors hover:border-slate-600">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${stripeFor(e.status)}`} aria-hidden="true" />
      <div className="space-y-4 p-5 pl-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-black text-white">#{e.id}</span>
              <StatusBadge status={e.status} />
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {when(e.createdAt)}
            </div>
          </div>
          <FormBadge form={e.formName} />
        </div>

        <div className="space-y-1 text-xs">
          <div className="text-sm font-bold text-white">{e.name}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300">
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-slate-500" aria-hidden="true" />{e.email}</span>
            {e.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-slate-500" aria-hidden="true" />{e.phone}</span>}
            {e.companyName && <span className="flex items-center gap-1.5"><Building2 className="h-3 w-3 text-slate-500" aria-hidden="true" />{e.companyName}</span>}
          </div>
        </div>

        {e.subject && <div className="text-xs font-bold text-slate-200">{e.subject}</div>}
        <p className="line-clamp-3 whitespace-pre-wrap rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs italic text-slate-300">&ldquo;{e.message}&rdquo;</p>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/reply-enquiry/?enquiryId=${e.id}`} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-600">
            <Reply className="h-3.5 w-3.5" aria-hidden="true" /> {e.status === 'new' ? 'Reply to customer' : 'Reply again'}
          </Link>
          <Link href={`/admin/enquiries/${e.id}/`} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-100 hover:bg-slate-700">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Open
          </Link>
          {onDelete && (
            <button type="button" onClick={() => onDelete(e.id)} aria-label={`Delete enquiry ${e.id}`} className="ml-auto rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-500 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
