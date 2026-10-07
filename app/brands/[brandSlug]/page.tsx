import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_BRANDS, getBrandBySlug, getProductsByBrand } from '@/config/brands';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { BrandDetailClient } from '@/components/BrandDetailClient';

interface PageProps {
  params: Promise<{ brandSlug: string }>;
}

export async function generateStaticParams() {
  return ALL_BRANDS.map((brand) => ({
    brandSlug: brand.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);

  if (!brand) {
    return {
      title: `Brand Not Found | ${SITE.name}`,
      description: 'The requested brand page could not be found.',
    };
  }

  const products = getProductsByBrand(brandSlug);

  return {
    title: `${brand.name} Models Australia — Official ${brand.category} Range | ${SITE.name}`,
    description: `Shop official ${brand.name} ${brand.category} in Australia. ${products.length} models in stock with express freight, 2-year warranty, and 10% crypto discount.`,
    alternates: {
      canonical: `https://${SITE.domain}/brands/${brandSlug}/`,
    },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title: `${brand.name} ${brand.category} Australia`,
      description: brand.description,
      url: `https://${SITE.domain}/brands/${brandSlug}/`,
    },
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { brandSlug } = await params;
  const brand = getBrandBySlug(brandSlug);

  if (!brand) {
    notFound();
  }

  const products = getProductsByBrand(brandSlug);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Brands', item: `https://${SITE.domain}/brands/` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `https://${SITE.domain}/brands/${brandSlug}/` },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${brand.name} Models in Australia`,
    numberOfItems: products.length,
    itemListElement: products.slice(0, 10).map((prod, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: prod.name,
      url: `https://${SITE.domain}/shop/${prod.category}/${prod.slug}/`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <BrandDetailClient brand={brand} products={products} />
    </>
  );
}
