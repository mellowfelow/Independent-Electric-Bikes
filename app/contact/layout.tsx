import type { Metadata } from 'next';
import { SITE, CONTACT } from '@/config/site';
import { fitTitle, fitDesc } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: fitTitle('Electric Bike Repairs & Service — Contact Us'),
  description: fitDesc(`Electric bike repairs, service and sales in Brunswick, VIC. Contact us at ${CONTACT.address}. Call ${CONTACT.phoneDisplay}, WhatsApp or send an enquiry.`),
  alternates: { canonical: `https://${SITE.domain}/contact/` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${SITE.name}`,
    url: `https://${SITE.domain}/contact/`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      legalName: SITE.entityName,
      telephone: CONTACT.phone,
      address: { '@type': 'PostalAddress', streetAddress: '380 Sydney Road', addressLocality: 'Brunswick', addressRegion: 'VIC', postalCode: '3056', addressCountry: 'AU' },
    },
  };
  return (
    <>
      <JsonLd data={schema} />
      {children}
    </>
  );
}
