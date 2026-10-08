import type { Metadata } from 'next';
import { SITE } from '@/config/site';
import { fitTitle } from '@/lib/catalog';

export const metadata: Metadata = {
  title: fitTitle('Search Products & Guides'),
  robots: { index: false, follow: true },
  alternates: { canonical: `https://${SITE.domain}/search/` },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
