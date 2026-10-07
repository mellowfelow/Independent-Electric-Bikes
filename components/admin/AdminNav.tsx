'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminPasscode } from './AdminPasscodeContext';
import { LayoutDashboard, ShoppingCart, MessageSquare, LogOut, Bike } from 'lucide-react';
import { SITE } from '@/config/site';

export function AdminNav() {
  const pathname = usePathname();
  const { logout } = useAdminPasscode();

  const links = [
    { href: '/admin/', label: 'Dashboard Hub', icon: LayoutDashboard },
    { href: '/admin/orders/', label: 'Orders List', icon: ShoppingCart },
    { href: '/admin/enquiries/', label: 'Enquiries List', icon: MessageSquare },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between min-h-16 py-2 gap-2">
          <Link href="/admin/" className="flex items-center gap-2 font-black text-xs sm:text-sm tracking-tight text-white py-1">
            <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
              <Bike className="w-4 h-4" />
            </div>
            <span>{SITE.name} <span className="text-emerald-400 font-normal text-[11px] font-mono ml-1">/ Admin</span></span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{link.label}</span>
                  <span className="sm:hidden">{link.label.split(' ')[0]}</span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-1 sm:ml-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
