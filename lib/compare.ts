import type { Product } from '@/config/site';

/** Only the fields the comparison UI renders - keeps the client payload small. */
export type ComparableProduct = Pick<Product, 'slug' | 'name' | 'price' | 'category'> & {
  images: string[];
  specs: Pick<Product['specs'], 'motor' | 'battery' | 'range' | 'weight' | 'payload' | 'brakes'>;
};

export function toComparable(p: Product): ComparableProduct {
  const { motor, battery, range, weight, payload, brakes } = p.specs;
  return { slug: p.slug, name: p.name, price: p.price, category: p.category, images: p.images.slice(0, 1), specs: { motor, battery, range, weight, payload, brakes } };
}
