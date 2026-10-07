export function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'new':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          NEW ORDER
        </span>
      );
    case 'payment_details_sent':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          PAYMENT DETAILS SENT
        </span>
      );
    case 'payment_confirmed':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          PAYMENT CONFIRMED
        </span>
      );
    case 'dispatched':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          DISPATCHED COURIER
        </span>
      );
    case 'replied':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          REPLIED
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-800 text-slate-300">
          {status.toUpperCase()}
        </span>
      );
  }
}
