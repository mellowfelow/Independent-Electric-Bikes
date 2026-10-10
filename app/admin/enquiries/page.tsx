'use client';

import { useMemo, useState } from 'react';
import { Search, RefreshCw } from 'lucide-react';
import { useAdminFetch } from '@/components/admin/useAdminFetch';
import { EnquiryCard } from '@/components/admin/EnquiryCard';
import { StorageNotice } from '@/components/admin/StorageNotice';
import type { EnquiryRecord } from '@/lib/enquiryStore';

type Filter = 'all' | 'new' | 'replied' | 'contact' | 'wholesale';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'Unreplied' },
  { id: 'replied', label: 'Replied' },
  { id: 'contact', label: 'Contact form' },
  { id: 'wholesale', label: 'Wholesale' },
];

export default function AdminEnquiriesListPage() {
  const { data, loading, reload, passcode } = useAdminFetch<{ enquiries: EnquiryRecord[] }>('/api/admin/enquiries/');
  const [filter, setFilter] = useState<Filter>('all');
  const [q, setQ] = useState('');
  const enquiries = useMemo(() => data?.enquiries ?? [], [data]);

  const match = (e: EnquiryRecord, f: Filter) => f === 'all' || e.status === f || e.formName === f;
  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f.id, enquiries.filter((e) => match(e, f.id)).length])), [enquiries]);
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return enquiries.filter((e) => match(e, filter) && (!needle || `${e.id} ${e.name} ${e.email} ${e.subject ?? ''} ${e.message}`.toLowerCase().includes(needle)));
  }, [enquiries, filter, q]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete enquiry #${id}? This cannot be undone.`)) return;
    await fetch(`/api/admin/enquiries/${id}/`, { method: 'DELETE', headers: { 'X-Admin-Passcode': passcode || '' } });
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Enquiries</h1>
          <p className="text-xs text-slate-400">Messages from the contact and wholesale forms. Replies go out as branded emails.</p>
        </div>
        <button type="button" onClick={reload} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh
        </button>
      </div>

      <StorageNotice />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter enquiries" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${filter === f.id ? 'border-emerald-500 bg-emerald-700 text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'}`}
            >
              {f.label} <span className="opacity-70">({counts[f.id] || 0})</span>
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search enquiries</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or message" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none" />
        </label>
      </div>

      {loading && enquiries.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading enquiries...</div>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-xs text-slate-400">{enquiries.length === 0 ? 'No enquiries stored yet.' : 'No enquiries match this filter.'}</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {shown.map((e) => (
            <EnquiryCard key={e.id} enquiry={e} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
