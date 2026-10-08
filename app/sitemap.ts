import type { MetadataRoute } from 'next';
import { SITE, MASTER_TAXONOMY, PRODUCTS, POSTS } from '@/config/site';
import { ALL_BRANDS } from '@/config/brands';

const base = `https://${SITE.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const add = (path: string, priority: number, changeFrequency: 'daily' | 'weekly' | 'monthly', lastModified?: Date, images?: string[]) =>
    entries.push({ url: `${base}${path}`, ...(lastModified ? { lastModified } : {}), changeFrequency, priority, ...(images?.length ? { images } : {}) });

  add('/', 1, 'daily');
  for (const p of ['/shop/', '/brands/', '/blog/', '/compare/', '/about/', '/faq/', '/contact/']) add(p, 0.8, 'weekly');

  const seen = new Set<string>();
  for (const main of MASTER_TAXONOMY) {
    add(`/shop/${main.slug}/`, 0.9, 'daily');
    for (const sub of main.subcategories) {
      add(`/shop/${main.slug}/${sub.slug}/`, 0.8, 'weekly');
      for (const item of sub.items ?? []) add(`/shop/${main.slug}/${item.slug}/`, 0.7, 'weekly');
    }
  }

  // One canonical URL per product (matches ProductCard links).
  for (const p of PRODUCTS) {
    const path = `/shop/${p.category}/${p.slug}/`;
    if (seen.has(path)) continue;
    seen.add(path);
    add(path, 0.6, 'weekly', undefined, p.images?.[0]?.startsWith('http') ? [p.images[0]] : undefined);
  }

  for (const b of ALL_BRANDS) add(`/brands/${b.slug}/`, 0.6, 'weekly');
  for (const post of POSTS) add(`/blog/${post.slug}/`, 0.6, 'monthly', new Date(post.date));

  return entries;
}
