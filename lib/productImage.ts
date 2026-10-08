/**
 * Product photos are generated in three widths by scripts/images.mjs:
 *   /images/products/<slug>.<hash>.webp       1200w (product page)
 *   /images/products/<slug>.<hash>-800.webp    800w (large / retina cards)
 *   /images/products/<slug>.<hash>-400.webp    400w (cards, thumbnails)
 * Other images (placeholder SVG, remote URLs) have a single rendition.
 */
const PRODUCT_PHOTO = /^(\/images\/products\/.+)\.webp$/;

/** srcset for a product photo, or undefined when only one rendition exists. */
export function productSrcSet(src: string): string | undefined {
  const m = src.match(PRODUCT_PHOTO);
  return m ? `${m[1]}-400.webp 400w, ${m[1]}-800.webp 800w, ${src} 1200w` : undefined;
}

/** Smallest rendition, for thumbnails (search suggestions, cart, popups). */
export function thumbSrc(src: string): string {
  const m = src.match(PRODUCT_PHOTO);
  return m ? `${m[1]}-400.webp` : src;
}

/** `sizes` for the shop grids: 4 per row on wide screens, 3 on tablets, 2 on large phones, 1 on small phones. */
export const CARD_SIZES = '(min-width: 1280px) 18vw, (min-width: 768px) 30vw, (min-width: 520px) 46vw, 92vw';
