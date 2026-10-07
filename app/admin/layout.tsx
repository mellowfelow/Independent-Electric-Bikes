import { Metadata } from 'next';
import { AdminPasscodeProvider } from '@/components/admin/AdminPasscodeContext';
import { PasscodeGate } from '@/components/admin/PasscodeGate';
import { AdminNav } from '@/components/admin/AdminNav';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: `Reply Portal Dashboard | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminPasscodeProvider>
      <PasscodeGate>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
          <AdminNav />
          <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </PasscodeGate>
    </AdminPasscodeProvider>
  );
}
