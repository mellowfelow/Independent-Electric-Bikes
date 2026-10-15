import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ACTIVE_BRANDS, getBrandBySlug, getProductsByBrand } from '@/config/brands';
import { SITE } from '@/config/site';
import { fitTitle, fitDesc } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { BrandDetailClient } from '@/components/BrandDetailClient';
import { RelatedGuides } from '@/components/RelatedGuides';
import { toCards } from '@/lib/cardProduct';
import { brandCopy, isTemplateBrand } from '@/lib/brandCopy';
import { withSocial } from '@/lib/seo';

interface PageProps {
  params: Promise<{ brandSlug: string }>;
}

export async function generateStaticParams() {
  return ACTIVE_BRANDS.map((brand) => ({
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

  return withSocial(
    {
      title: fitTitle(`${brand.name} ${brand.category} Australia`),
      description: fitDesc(`Shop ${brand.name} ${brand.category.toLowerCase()} in Australia: ${products.length} ${products.length === 1 ? 'model' : 'models'} with express freight, a 2-year frame warranty and a 10% cryptocurrency discount.`),
    },
    `/brands/${brandSlug}/`
  );
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

  const copy = brandCopy(brand, products);

  // The category holding most of this brand products decides which guides are suggested.
  const catCounts = new Map<string, number>();
  for (const p of products) catCounts.set(p.category, (catCounts.get(p.category) ?? 0) + 1);
  const mainCat = [...catCounts].sort((a, b) => b[1] - a[1])[0]?.[0];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      <BrandDetailClient
        brand={brand}
        products={toCards(products)}
        relatedBrands={ACTIVE_BRANDS.filter((b) => b.category === brand.category && b.slug !== brand.slug).slice(0, 4)}
        intro={isTemplateBrand(brand) ? copy.intro : undefined}
        about={copy.about}
      />
      {mainCat && <RelatedGuides category={mainCat} seed={brand.slug} heading={`Guides for ${brand.name} buyers`} />}
    </>
  );
}
