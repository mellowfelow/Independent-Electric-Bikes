'use client';

import { AlertTriangle, DatabaseZap } from 'lucide-react';
import { useAdminFetch } from './useAdminFetch';

interface Status {
  storage: 'redis' | 'memory';
  smtp: boolean;
}

/** Shows whether orders and enquiries are being stored permanently and whether emails can be sent. */
export function StorageNotice() {
  const { data } = useAdminFetch<Status>('/api/admin/status/');
  if (!data) return null;
  const problems: string[] = [];
  if (data.storage !== 'redis') problems.push('Permanent storage (Redis) is not connected: orders and enquiries are only kept in temporary memory and will disappear. Check the Redis integration in Vercel.');
  if (!data.smtp) problems.push('Email (SMTP) is not configured: no confirmation, invoice or reply emails can be sent.');
  if (problems.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-[11px] font-bold text-emerald-300">
        <DatabaseZap className="h-3.5 w-3.5" aria-hidden="true" /> Storage connected (Redis) and email ready. Every order and enquiry is saved here.
      </div>
    );
  }
  return (
    <div role="alert" className="space-y-1 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-200">
      {problems.map((p) => (
        <div key={p} className="flex items-start gap-2"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{p}</div>
      ))}
    </div>
  );
}
