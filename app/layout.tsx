import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { ChatHub } from '@/components/ChatHub';
import { RecentPurchasePopup } from '@/components/RecentPurchasePopup';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: `Australia's premier independent electric commuter, cargo, and folding bike specialist based in Brunswick, Victoria. High torque 500W motors & Samsung batteries.`,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — Australia's Premier E-Bike Specialist`,
    description: `Australia's premier independent electric commuter, cargo, and folding bike specialist based in Brunswick, Victoria.`,
    url: `https://${SITE.domain}/`,
    images: [{ url: `https://${SITE.domain}/images/og-cover.jpg` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Australia's Premier E-Bike Specialist`,
    description: `Australia's premier independent electric commuter, cargo, and folding bike specialist based in Brunswick, Victoria.`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  other: {
    'og:updated_time': new Date().toISOString(),
    'google-site-verification': SITE.gscVerification,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.locale}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script src="/js/webmcp.js" defer />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen flex flex-col font-sans">
        <AnnouncementBar />
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatHub />
        <RecentPurchasePopup />
      </body>
    </html>
  );
}
