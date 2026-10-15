import { PRODUCTS, MASTER_TAXONOMY, type Product, type ProductFilters } from '@/config/site';
import { brandNameOf, productCategoryLabel } from '@/lib/catalog';
import { fitSummary } from '@/lib/compat';

/**
 * The few fields a product card, the shop filters and the cart need, with the brand, type label and fit line already
 * worked out on the server. Client components import only this type, so the catalogue and its helper code never ship to the browser.
 */
export interface CardProduct {
  slug: string;
  name: string;
  price: number;
  category: string;
  subcategory?: string;
  subSubcategory?: string;
  badge: Product['badge'];
  featured?: boolean;
  /** First photo (or the placeholder SVG). */
  image: string;
  brand: string;
  label: string;
  fit: string | null;
  shortDescription: string;
  filters?: ProductFilters;
}

export function toCard(p: Product): CardProduct {
  const filters = p.filters && Object.keys(p.filters).length ? p.filters : undefined;
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    ...(p.subcategory ? { subcategory: p.subcategory } : {}),
    ...(p.subSubcategory ? { subSubcategory: p.subSubcategory } : {}),
    badge: p.badge,
    ...(p.featured ? { featured: true } : {}),
    image: p.images[0],
    brand: brandNameOf(p),
    label: productCategoryLabel(p),
    fit: fitSummary(p),
    shortDescription: p.shortDescription,
    ...(filters ? { filters } : {}),
  };
}

export const toCards = (list: Product[]) => list.map(toCard);

export interface ShopScope {
  products: CardProduct[];
  /** Every top-level category with its product count, for the quick links on the shop pages. */
  categoryCounts: { slug: string; name: string; count: number }[];
  total: number;
}

/** Products a shop page lists (a category, sub-category or type slug, or everything), built on the server. */
export function shopScope(initialCategory?: string): ShopScope {
  const products = PRODUCTS.filter((p) => !initialCategory || p.category === initialCategory || p.subcategory === initialCategory || p.subSubcategory === initialCategory);
  return {
    products: products.map(toCard),
    categoryCounts: MASTER_TAXONOMY.map((m) => ({ slug: m.slug, name: m.name, count: PRODUCTS.filter((p) => p.category === m.slug).length })),
    total: PRODUCTS.length,
  };
}
