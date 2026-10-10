import { Mail, MessageCircle, Landmark, Zap, Bitcoin, Building2, HelpCircle } from 'lucide-react';

const base = 'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide';

export function ChannelBadge({ channel }: { channel: string }) {
  if (channel === 'whatsapp') return <span className={`${base} border-green-500/30 bg-green-500/10 text-green-400`}><MessageCircle className="h-3 w-3" aria-hidden="true" />WhatsApp</span>;
  if (channel === 'both') return <span className={`${base} border-cyan-500/30 bg-cyan-500/10 text-cyan-300`}><MessageCircle className="h-3 w-3" aria-hidden="true" />Email + WhatsApp</span>;
  return <span className={`${base} border-sky-500/30 bg-sky-500/10 text-sky-300`}><Mail className="h-3 w-3" aria-hidden="true" />Email order</span>;
}

export function PaymentBadge({ method }: { method: string }) {
  if (method === 'payid') return <span className={`${base} border-violet-500/30 bg-violet-500/10 text-violet-300`}><Zap className="h-3 w-3" aria-hidden="true" />PayID</span>;
  if (method === 'crypto') return <span className={`${base} border-amber-500/30 bg-amber-500/10 text-amber-300`}><Bitcoin className="h-3 w-3" aria-hidden="true" />Crypto -10%</span>;
  if (method === 'bank-transfer') return <span className={`${base} border-slate-500/40 bg-slate-500/10 text-slate-300`}><Landmark className="h-3 w-3" aria-hidden="true" />Bank transfer</span>;
  return <span className={`${base} border-slate-600 bg-slate-800 text-slate-300`}>{method}</span>;
}

export function FormBadge({ form }: { form: string }) {
  if (form === 'wholesale') return <span className={`${base} border-orange-500/30 bg-orange-500/10 text-orange-300`}><Building2 className="h-3 w-3" aria-hidden="true" />Wholesale</span>;
  if (form === 'contact') return <span className={`${base} border-sky-500/30 bg-sky-500/10 text-sky-300`}><Mail className="h-3 w-3" aria-hidden="true" />Contact form</span>;
  return <span className={`${base} border-slate-600 bg-slate-800 text-slate-300`}><HelpCircle className="h-3 w-3" aria-hidden="true" />{form}</span>;
}

export const stripeFor = (status: string) =>
  status === 'new'
    ? 'bg-amber-400'
    : status === 'payment_details_sent'
      ? 'bg-sky-400'
      : status === 'payment_confirmed' || status === 'replied'
        ? 'bg-emerald-400'
        : status === 'dispatched'
          ? 'bg-violet-400'
          : 'bg-slate-600';
