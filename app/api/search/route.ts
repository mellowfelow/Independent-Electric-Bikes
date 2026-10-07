import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, POSTS, SITE } from '@/config/site';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase() || '';

  const matchingProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  ).map((p) => ({
    type: 'product',
    slug: p.slug,
    title: p.name,
    category: p.category,
    price: p.price,
    description: p.shortDescription,
    product: p,
    url: `https://${SITE.domain}/shop/${p.category}/${p.slug}/`,
  }));

  const matchingPosts = POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
  ).map((post) => ({
    type: 'blog',
    slug: post.slug,
    title: post.title,
    category: post.category,
    description: post.excerpt,
    url: `https://${SITE.domain}/blog/${post.slug}/`,
  }));

  return NextResponse.json(
    {
      query: q,
      totalResults: matchingProducts.length + matchingPosts.length,
      products: matchingProducts,
      posts: matchingPosts,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300',
      },
    }
  );
}
