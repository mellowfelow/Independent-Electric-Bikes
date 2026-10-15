import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/config/site';
import { search } from '@/lib/search';
import { brandNameOf, productCategoryLabel } from '@/lib/catalog';
import { toCard } from '@/lib/cardProduct';

const PLACEHOLDER = '.svg';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').slice(0, 100);
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 24));
  const origin = `https://${SITE.domain}`;

  const result = search(q);

  // The /search/ page asks for every result as ready-to-render cards, so the browser never loads the catalogue.
  if (searchParams.get('view') === 'page') {
    return NextResponse.json(
      {
        query: result.query,
        relaxed: result.relaxed,
        price: result.price,
        products: result.products.map(({ product }) => toCard(product)),
        posts: result.posts.map(({ post }) => ({ slug: post.slug, title: post.title, category: post.category, excerpt: post.excerpt })),
        categories: result.categories,
        brands: result.brands,
      },
      { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
    );
  }

  return NextResponse.json(
    {
      query: result.query,
      totalResults: result.products.length + result.posts.length,
      totalProducts: result.products.length,
      relaxed: result.relaxed,
      products: result.products.slice(0, limit).map(({ product: p }) => ({
        type: 'product',
        slug: p.slug,
        title: p.name,
        brand: brandNameOf(p),
        category: p.category,
        categoryLabel: productCategoryLabel(p),
        price: p.price,
        currency: SITE.currency,
        description: p.shortDescription,
        image: p.images[0].endsWith(PLACEHOLDER) ? null : `${origin}${p.images[0]}`,
        url: `${origin}/shop/${p.category}/${p.slug}/`,
      })),
      posts: result.posts.map(({ post }) => ({
        type: 'blog',
        slug: post.slug,
        title: post.title,
        category: post.category,
        description: post.excerpt,
        url: `${origin}/blog/${post.slug}/`,
      })),
      categories: result.categories.map((c) => ({ name: c.name, url: `${origin}${c.href}` })),
      brands: result.brands.map((b) => ({ name: b.name, products: b.count, url: `${origin}/brands/${b.slug}/` })),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
