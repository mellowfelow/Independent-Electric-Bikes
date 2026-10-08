import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, MASTER_TAXONOMY, SITE, SHOP } from '@/config/site';
import { money } from '@/lib/order';
import { brandNameOf, categoryMetaDescription, categoryTitle, productDescription, productMetaDescription, productTitle, resolveCategory } from '@/lib/catalog';
import { JsonLd } from '@/components/JsonLd';
import { ShopClientView } from '@/components/ShopClientView';
import { ProductClientActions } from '@/components/ProductClientActions';
import { ProductCard } from '@/components/ProductCard';
import { ShieldCheck, Truck, Bike, Check, Sparkles } from 'lucide-react';

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [];

  // 1. Master Taxonomy paths
  for (const main of MASTER_TAXONOMY) {
    paths.push({ slug: [main.slug] });
    for (const sub of main.subcategories) {
      paths.push({ slug: [main.slug, sub.slug] });
      if (sub.items) {
        for (const item of sub.items) {
          paths.push({ slug: [main.slug, item.slug] });
        }
      }
    }
  }

  // 2. Product paths (accessible via /shop/category/product-slug or /shop/product-slug)
  for (const p of PRODUCTS) {
    paths.push({ slug: [p.category, p.slug] });
    if (p.subcategory) {
      paths.push({ slug: [p.category, p.subcategory, p.slug] });
    }
  }

  return paths;
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const params = await props.params;
  const slugSegments = params.slug || [];
  const lastSegment = slugSegments[slugSegments.length - 1];

  // Check if product
  const product = PRODUCTS.find((p) => p.slug === lastSegment);
  if (product) {
    return {
      title: productTitle(product),
      description: productMetaDescription(product),
      alternates: { canonical: `https://${SITE.domain}/shop/${product.category}/${product.slug}/` },
      openGraph: {
        title: `${product.name} — ${SITE.name}`,
        description: productMetaDescription(product),
        images: [{ url: product.images[0] }],
      },
    };
  }

  // Category / subcategory / leaf
  const node = resolveCategory(slugSegments);
  if (node) {
    return {
      title: categoryTitle(node),
      description: categoryMetaDescription(node),
      alternates: { canonical: `https://${SITE.domain}/shop/${slugSegments.join('/')}/` },
    };
  }

  return {};
}

export default async function ShopCatchAllPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slugSegments = params.slug || [];
  const lastSegment = slugSegments[slugSegments.length - 1];

  // 1. IS PRODUCT?
  const product = PRODUCTS.find((p) => p.slug === lastSegment);
  if (product) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.images,
      description: productDescription(product),
      sku: product.slug,
      url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
      brand: { '@type': 'Brand', name: brandNameOf(product) },
      offers: {
        '@type': 'Offer',
        url: `https://${SITE.domain}/shop/${product.category}/${product.slug}/`,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: product.price >= SHOP.freeShippingThreshold ? 0 : SHOP.shippingFee, currency: 'AUD' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'AU' },
        },
        priceCurrency: 'AUD',
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: SITE.name },
      },
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `https://${SITE.domain}/shop/` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `https://${SITE.domain}/shop/${product.category}/${product.slug}/` },
      ],
    };

    return (
      <>
        <JsonLd data={productSchema} />
        <JsonLd data={breadcrumbSchema} />

        <div className="bg-slate-950 text-slate-100 min-h-screen py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">
              <Link href="/" className="hover:text-emerald-400">Home</Link> /
              <Link href="/shop/" className="hover:text-emerald-400">Shop</Link> /
              <span className="text-slate-200 font-bold truncate">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl border border-slate-800 p-6 flex items-center justify-center aspect-[4/3] overflow-hidden">
                  <img src={product.images[0]} alt={product.name} className="object-contain max-h-full max-w-full" />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-3">
                    {product.images.map((img, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-800 p-2 aspect-[4/3] overflow-hidden flex items-center justify-center">
                        <img src={img} alt={`${product.name} ${idx + 1}`} className="object-contain max-h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider rounded-md mb-2">
                    {product.badge}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{product.name}</h1>
                  <div className="text-2xl font-black text-emerald-400 mt-2">{money(product.price)}</div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed border-y border-slate-800 py-4">
                  {productDescription(product)}
                </p>

                {/* Filter Pills */}
                {product.filters && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {product.filters.motorType && (
                      <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-emerald-400 rounded-lg font-bold">
                        ⚡ Motor: {product.filters.motorType}
                      </span>
                    )}
                    {product.filters.sensorType && (
                      <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg font-medium">
                        ⚙️ Sensor: {product.filters.sensorType}
                      </span>
                    )}
                    {product.filters.compliance && (
                      <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-200 rounded-lg font-medium">
                        ✓ {product.filters.compliance}
                      </span>
                    )}
                  </div>
                )}

                <ProductClientActions product={product} />

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Free Express Courier Freight across VIC & Metro AU over $1,500</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>2-Year Frame Warranty & 12-Month Electrical Warranty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Save 10% when paying via Cryptocurrency (BTC/USDT)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-xl font-extrabold text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-2">
                <Bike className="w-5 h-5 text-emerald-400" />
                <span>Full Technical Specifications — {product.name}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Motor Drive:</span>
                  <span className="text-white font-bold">{product.specs.motor}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Battery Chemistry:</span>
                  <span className="text-white font-bold">{product.specs.battery}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Maximum Range:</span>
                  <span className="text-white font-bold">{product.specs.range}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Top Speed:</span>
                  <span className="text-white font-bold">{product.specs.topSpeed}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Braking System:</span>
                  <span className="text-white font-bold">{product.specs.brakes}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Net Weight:</span>
                  <span className="text-white font-bold">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Payload Load:</span>
                  <span className="text-white font-bold">{product.specs.payload}</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-950 rounded-lg border border-slate-800/80">
                  <span className="text-slate-400">Frame Alloy:</span>
                  <span className="text-white font-bold">{product.specs.frame}</span>
                </div>
              </div>
            </div>

            {/* Related Products Grid */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Cross-Catalog Recommendations</span>
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white mt-1">Related E-Bikes & Models</h2>
                </div>
                <Link href="/shop/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  Explore Full Catalog ({PRODUCTS.length}) &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug)
                  .slice(0, 4)
                  .map((relProduct) => (
                    <ProductCard key={relProduct.slug} product={relProduct} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 2. IS TAXONOMY CATEGORY / SUBCATEGORY?
  const targetCategorySlug = slugSegments[0];
  const targetSubcategorySlug = slugSegments[1];

  const mainCategory = MASTER_TAXONOMY.find((m) => m.slug === targetCategorySlug);
  const categoryNode = resolveCategory(slugSegments);
  if (!mainCategory || !categoryNode) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `https://${SITE.domain}/shop/` },
      { '@type': 'ListItem', position: 3, name: mainCategory.name, item: `https://${SITE.domain}/shop/${mainCategory.slug}/` },
      ...(categoryNode.sub ? [{ '@type': 'ListItem', position: 4, name: categoryNode.name, item: `https://${SITE.domain}/shop/${slugSegments.join('/')}/` }] : []),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-white min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              Master EV Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">{categoryNode.name}</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">{categoryNode.description}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ShopClientView initialCategory={targetSubcategorySlug || targetCategorySlug} />
        </div>
      </div>
    </>
  );
}
