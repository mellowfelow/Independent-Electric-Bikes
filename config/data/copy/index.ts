import ebikes from './ebikes.json';
import vehicles from './vehicles.json';
import kidsMobilityParts from './kids-mobility-parts.json';
import safety from './safety.json';

/** Type-level guidance sentences per `category/subcategory`, mixed into product copy by lib/productCopy.ts. */
export interface CopyPool {
  type: string;
  typePlural: string;
  intro: string[];
  suits: string[];
  check: string[];
  care: string[];
}

export const COPY_POOLS: Record<string, CopyPool> = { ...ebikes, ...vehicles, ...kidsMobilityParts, ...safety };
