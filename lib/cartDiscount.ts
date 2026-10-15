import { SHOP } from '@/config/site';

/** Top-level shop categories that are e-vehicles. */
export const VEHICLE_CATEGORIES: ReadonlySet<string> = new Set([
  'electric-bikes',
  'electric-scooters',
  'electric-skateboards',
  'self-balancing-ev',
  'kids-off-road-ev',
  'mobility-scooters',
  'electric-quad-bikes',
  'electric-water-sports',
]);

/** Top-level shop categories that count as parts and accessories. */
export const ACCESSORY_CATEGORIES: ReadonlySet<string> = new Set(['batteries-parts-kits', 'safety-security-carry']);

export const isVehicle = (category?: string) => !!category && VEHICLE_CATEGORIES.has(category);
export const isAccessory = (category?: string) => !!category && ACCESSORY_CATEGORIES.has(category);

export interface DiscountLine {
  category?: string;
  price: number;
  quantity: number;
}

export interface AccessoryDiscount {
  /** At least one e-vehicle is in the cart. */
  hasVehicle: boolean;
  /** Number of accessory/part units in the cart. */
  accessoryUnits: number;
  accessorySubtotal: number;
  /** Dollar amount taken off; 0 when no vehicle is in the cart. */
  amount: number;
  percent: number;
}

/**
 * The accessory discount exists only while the cart holds an e-vehicle. It is always recomputed from the
 * current cart (never stored), so removing the vehicle removes the discount.
 */
export function accessoryDiscount(lines: DiscountLine[]): AccessoryDiscount {
  const percent = SHOP.accessoryDiscount;
  const hasVehicle = lines.some((l) => isVehicle(l.category) && l.quantity > 0);
  let accessoryUnits = 0;
  let accessorySubtotal = 0;
  for (const l of lines) {
    if (!isAccessory(l.category)) continue;
    accessoryUnits += l.quantity;
    accessorySubtotal += l.price * l.quantity;
  }
  const amount = hasVehicle ? Math.round(accessorySubtotal * percent) / 100 : 0;
  return { hasVehicle, accessoryUnits, accessorySubtotal, amount, percent };
}
