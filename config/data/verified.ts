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
  'giant-trance-x-advanced-e-2': {
    checked: '2026-10-08',
    sources: [{ label: 'Giant Bicycles - Trance X Advanced E+ 2 (2023)', url: 'https://www.giant-bicycles.com/gb/trance-x-advanced-eplus-2-2023' }],
    note: 'Specifications are for the 2023 model year as published by Giant; Giant does not publish a weight, range or load limit on this page, and earlier model years used a smaller battery. Confirm the current-year configuration with us before ordering.',
    specs: {
      motor: 'Giant SyncDrive Pro2 (powered by Yamaha), 85 Nm',
      battery: 'Giant EnergyPak 800 Wh',
      brakes: 'Shimano SLX BR-M7120 4-piston hydraulic disc, 203 mm rotors',
      frame: 'Advanced-grade composite, 140 mm Maestro rear suspension, Fox 36 Float 150 mm fork',
      gears: 'Shimano Deore SLX 12-speed, 10-51T cassette',
    },
    filters: { motorType: 'Mid-Drive', brakeType: 'Hydraulic Disc' },
  },
};
