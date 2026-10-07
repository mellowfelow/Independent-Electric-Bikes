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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/admin/" className="flex items-center gap-2.5 font-black text-sm tracking-tight text-white">
            <div className="p-1.5 bg-emerald-600 rounded-lg text-white">
              <Bike className="w-4 h-4" />
            </div>
            <span>{SITE.name} <span className="text-emerald-400 font-normal text-xs font-mono ml-1">/ Admin</span></span>
          </Link>

          <nav className="flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-3"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Portal</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
