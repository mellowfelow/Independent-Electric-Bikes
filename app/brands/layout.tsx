import type { Metadata } from 'next';
import { withSocial } from '@/lib/seo';
import { SITE } from '@/config/site';
import { fitTitle, fitDesc } from '@/lib/catalog';

export const metadata: Metadata = withSocial({
  title: fitTitle('Electric Bike, Scooter & EV Brands'),
  description: fitDesc('Browse every e-bike, e-scooter, electric skateboard and personal EV brand stocked by Independent Electric Bikes, with local Australian warranty support.'),
}, '/brands/');

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
