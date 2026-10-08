import type { Metadata } from 'next';
import { SITE, CONTACT } from '@/config/site';
import { fitTitle, fitDesc } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: fitTitle('Contact Our Brunswick E-Bike Showroom'),
  description: fitDesc(`Contact Independent Electric Bikes at ${CONTACT.address}. Call ${CONTACT.phoneDisplay}, WhatsApp or send an enquiry about e-bikes, orders or wholesale.`),
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
