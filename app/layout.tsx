import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { ChatHub } from '@/components/ChatHub';
import { RecentPurchasePopup } from '@/components/RecentPurchasePopup';
import { AccessoryOfferPopup } from '@/components/AccessoryOfferPopup';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title:`${SITE.name} | Electric Bike Australia`,
  description: `Australia's independent electric bike specialist in Brunswick, VIC. Shop e-bikes, electric scooters, skateboards and EVs with express freight Australia-wide.`,
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
    title: `${SITE.name} | Electric Bike Australia`,
    description: `Australia's independent electric bike specialist in Brunswick, Victoria. Shop e-bikes, scooters and EVs.`,
    url: `https://${SITE.domain}/`,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
    title: `${SITE.name} | Electric Bike Australia`,
    description: `Australia's independent electric bike specialist in Brunswick, Victoria. Shop e-bikes, scooters and EVs.`,
  },
  alternates: {
    canonical: `https://${SITE.domain}/`,
  },
  other: {
    ...(SITE.gscVerification ? { 'google-site-verification': SITE.gscVerification } : {}),
    ...(SITE.bingVerification ? { 'msvalidate.01': SITE.bingVerification } : {}),
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
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <ChatHub />
        <RecentPurchasePopup />
        <AccessoryOfferPopup />
      </body>
    </html>
  );
}
