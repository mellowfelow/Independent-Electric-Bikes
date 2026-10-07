import { NextResponse } from 'next/server';
import { CATEGORIES, PRODUCTS, SITE } from '@/config/site';

export async function GET() {
  const categoriesWithCounts = CATEGORIES.map((c) => ({
    ...c,
    productCount: PRODUCTS.filter((p) => p.category === c.slug).length,
    url: `https://${SITE.domain}/shop/${c.slug}/`,
  }));

  return NextResponse.json(categoriesWithCounts, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
