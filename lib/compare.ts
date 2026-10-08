import type { Product } from '@/config/site';

export const COMPARE_ROWS: { key: keyof Product['specs']; label: string }[] = [
  { key: 'motor', label: 'Motor' },
  { key: 'battery', label: 'Battery' },
  { key: 'range', label: 'Claimed range' },
  { key: 'topSpeed', label: 'Assisted top speed' },
  { key: 'weight', label: 'Weight' },
  { key: 'payload', label: 'Payload / load limit' },
  { key: 'brakes', label: 'Brakes' },
  { key: 'frame', label: 'Frame' },
  { key: 'gears', label: 'Gears' },
];

/** Only the fields the comparison UI renders; only manufacturer-verified products can be compared. */
export interface ComparableProduct {
  slug: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  specs: Product['specs'];
  note?: string;
  checked: string;
  sources: { label: string; url: string }[];
}

export function toComparable(p: Product): ComparableProduct | null {
  if (!p.verified) return null;
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    image: p.images[0],
    specs: p.specs,
    note: p.verified.note,
    checked: p.verified.checked,
    sources: p.verified.sources,
  };
}
