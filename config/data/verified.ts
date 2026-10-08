import type { Product, ProductFilters } from '../site';

/**
 * Manufacturer-verified product data.
 *
 * Only products listed here show technical specifications, appear on the compare page, and can be matched by the
 * motor / assist / brake / range / compliance filters. Every value must be stated on the manufacturer page(s) in `sources`;
 * leave a field out (never estimate it) when the manufacturer does not state it or when variants disagree.
 *
 * To verify another product: add an entry keyed by its slug in config/data/*.ts, with the source URL and today's date.
 */
export interface VerifiedInfo {
  /** ISO date the sources were read. */
  checked: string;
  sources: { label: string; url: string }[];
  /** Caveats the customer should see next to the specs (variants, conflicting figures, regional differences). */
  note?: string;
  specs: Partial<Product['specs']>;
  filters?: Partial<ProductFilters>;
}

export const VERIFIED: Record<string, VerifiedInfo> = {
  'tern-gsd-s10-lx': {
    checked: '2026-10-08',
    sources: [{ label: 'Tern Bicycles - GSD S10 LX', url: 'https://www.ternbicycles.com/en/bikes/472/gsd-s10-lx' }],
    note: 'Specifications are for the Gen 2 GSD S10 LX as published by Tern. Range is the manufacturer claim for each battery option and depends on load, terrain and assist level.',
    specs: {
      motor: 'Bosch Cargo Line, 85 Nm torque',
      battery: 'Bosch dual battery system, 500 Wh / 1000 Wh options',
      range: '52-105 km (500 Wh) / 102-206 km (1000 Wh), manufacturer claim',
      topSpeed: '25 km/h assisted (EU specification)',
      brakes: 'Magura MT5 4-piston hydraulic disc, 180 mm rotors',
      weight: '33.58 kg',
      payload: '200 kg max gross vehicle weight (120 kg max rider, 100 kg rear rack)',
      frame: '6061 aluminium alloy',
      gears: 'Shimano Deore 1x10-speed, 11-42T cassette',
    },
    filters: { motorType: 'Mid-Drive', brakeType: 'Hydraulic Disc', batteryRange: '50km+ Long Range' },
  },
  'tern-hsd-p9': {
    checked: '2026-10-08',
    sources: [{ label: 'Tern Bicycles Australia - HSD P9', url: 'https://www.ternbicycles.com/au/bikes/471/hsd-p9' }],
    note: 'Tern lists both a Bosch PowerPack 400 and a 500 Wh battery on this page, so the battery capacity is shown as a range. Tern lists a recommended retail price of A$5,995 for this model. Assisted top speed is 25 km/h in the EU specification; confirm the Australian configuration with us before ordering.',
    specs: {
      motor: 'Bosch Active Line Plus (Gen 3)',
      battery: 'Bosch PowerPack 400 (400-500 Wh, see note)',
      range: '42-110 km, manufacturer claim',
      weight: '25.7 kg',
      payload: '170 kg max gross vehicle weight (120 kg max rider, 60 kg rear rack)',
      brakes: 'Shimano hydraulic disc, 180 mm front / 160 mm rear',
      frame: '6061 aluminium alloy',
      gears: 'Shimano Alivio 1x9-speed, 11-32T cassette',
    },
    filters: { motorType: 'Mid-Drive', brakeType: 'Hydraulic Disc' },
  },
};
