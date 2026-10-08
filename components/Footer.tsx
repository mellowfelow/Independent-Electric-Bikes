import { EmailText } from '@/components/EmailText';
import Link from 'next/link';
import { Bike, Phone, Mail, MapPin, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { SITE, CONTACT, CATEGORIES } from '@/config/site';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">2-Year Frame Warranty</div>
              <div className="text-[11px] text-slate-400">Backed by VYRON Industries</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Brunswick Showroom</div>
              <div className="text-[11px] text-slate-400">Test rides & local service</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">EFT, PayID & 10% Crypto</div>
              <div className="text-[11px] text-slate-400">Secure Australian checkout</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Victoria & Metro Freight</div>
              <div className="text-[11px] text-slate-400">Free over $1,500 AUD</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-lg">
              <Bike className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base text-white tracking-tight">
              INDEPENDENT <span className="text-emerald-400">ELECTRIC BIKES</span>
            </span>
          </div>

          <p className="text-slate-300 leading-relaxed text-xs max-w-sm">
            Operated by <strong>{SITE.entityName}</strong> (
            <a
              href="https://abr.business.gov.au/ABN/View?id=23618699479"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline inline-flex items-center gap-0.5 font-semibold"
            >
              ABN {SITE.abn} <ExternalLink className="w-3 h-3 inline" />
            </a>
            ). Designing, engineering, and servicing high-performance electric commuter and cargo bikes in Victoria since 2017.
          </p>

          <div className="space-y-2 text-slate-300 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{CONTACT.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{CONTACT.phoneDisplay} (Call or WhatsApp)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><EmailText email={CONTACT.email} /></span>
            </div>
          </div>
        </div>

        {/* E-Bike Categories */}
        <div>
          <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            E-Bike Range
          </h3>
          <ul className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop/${c.slug}/`} className="hover:text-emerald-400 transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/compare/" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-400">
                Compare Spec Matrix &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Company & Info */}
        <div>
          <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Company & Support
          </h3>
          <ul className="space-y-2.5">
            <li>
              <Link href="/about/" className="hover:text-emerald-400 transition-colors">
                About VYRON Industries
              </Link>
            </li>
            <li>
              <Link href="/brands/" className="hover:text-emerald-400 transition-colors">
                Bafang & Samsung Tech
              </Link>
            </li>
            <li>
              <Link href="/faq/" className="hover:text-emerald-400 transition-colors">
                E-Bike FAQ & Warranty
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:text-emerald-400 transition-colors">
                Australian E-Bike Guides
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="hover:text-emerald-400 transition-colors">
                Contact & Showroom
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved. Registered Australian Business{' '}
            <a
              href="https://abr.business.gov.au/ABN/View?id=23618699479"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 hover:underline"
            >
              ABN {SITE.abn}
            </a>
            .
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 font-mono text-slate-400">Direct EFT</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 font-mono text-slate-400">PayID / Osko</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800 font-mono text-emerald-400 font-bold">10% Crypto (BTC/USDT)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
