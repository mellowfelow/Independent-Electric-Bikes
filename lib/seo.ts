import type { Metadata } from 'next';
import { SITE } from '@/config/site';

const origin = `https://${SITE.domain}`;

export const absoluteUrl = (pathOrUrl: string) => (pathOrUrl.startsWith('http') ? pathOrUrl : `${origin}${pathOrUrl}`);

/**
 * Adds the canonical URL plus Open Graph and Twitter tags that describe THIS page. A page-level `openGraph` replaces
 * the layout's whole object, so every page must supply its own or it would share the homepage title, URL and image.
 */
export function withSocial(meta: Metadata, path: string, opts: { image?: string; type?: 'website' | 'article' } = {}): Metadata {
  const url = absoluteUrl(path);
  const title = typeof meta.title === 'string' ? meta.title : SITE.name;
  const description = typeof meta.description === 'string' ? meta.description : '';
  const image = absoluteUrl(opts.image ?? '/og.png');
  const sized = image.endsWith('/og.png') ? { width: 1200, height: 630 } : {};
  return {
    ...meta,
    alternates: meta.alternates ?? { canonical: url },
    openGraph: { type: opts.type ?? 'website', siteName: SITE.name, title, description, url, images: [{ url: image, alt: title, ...sized }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
