import { EBIKE_PRODUCTS } from './products';
import { VERIFIED, type VerifiedInfo } from './data/verified';
import { PRODUCT_IMAGES, PRODUCT_PLACEHOLDER } from './data/productImages';

export const SITE = {
  name: 'INDEPENDENT ELECTRIC BIKES',
  tagline: "Australia's Premier Independent Electric Commuter & Cargo Bike Specialist",
  domain: 'independentelectricbikes.com.au',
  locale: 'en-AU',
  currency: 'AUD',
  currencySymbol: '$',
  target: 'vercel',
  primaryColor: '#16a34a',
  headerDark: '#0f172a',
  bingVerification: process.env.BING_VERIFICATION || '', // Bing Webmaster Tools msvalidate.01 token; omitted while empty
  gscVerification: process.env.GSC_VERIFICATION || '', // Google Search Console token; set GSC_VERIFICATION in Vercel (meta tag is omitted while empty)
  indexNowKey: 'ieb2026indexnowkey998877',
  cartKey: 'ieb-cart-v1',
  entityName: 'VYRON INDUSTRIES PTY LTD',
  abn: '23 618 699 479',
};

export const CONTACT = {
  email: 'sales@independentelectricbikes.com.au',
  phone: '+61 480 811 308',
  phoneDisplay: '0480 811 308',
  whatsapp: '61480811308',
  address: '380 Sydney Road, Brunswick VIC 3056, Australia',
  hq: 'Victoria, Australia',
  country: 'Australia',
};

export const SHOP = {
  minOrder: 350,
  freeShippingThreshold: 1500,
  shippingFee: 99,
  cryptoDiscount: 10,
  /** % off parts and accessories when the same order includes an e-vehicle. */
  accessoryDiscount: 5,
  paymentMethods: ['bank-transfer', 'payid', 'crypto'],
};

export const FORMS = {
  provider: 'smtp' as const,
  smtpFrom: 'noreply@independentelectricbikes.com.au',
  resendFrom: '',
  turnstileSiteKey: '',
  destinations: {
    contact: 'sales@independentelectricbikes.com.au',
    order: 'orders@independentelectricbikes.com.au',
    wholesale: 'wholesale@independentelectricbikes.com.au',
  },
};

export const REPLY = {
  brand: {
    primary: '#16a34a',
    headerDark: '#0f172a',
  },
  currency: {
    code: 'AUD',
    symbol: '$',
    locale: 'en-AU',
  },
  orderPrefix: 'IEB',
  headerTagline: 'VYRON Industries Pty Ltd · Brunswick, Victoria',
  dispatchLine: 'Orders dispatch directly from our Brunswick, VIC facility with tracked courier freight.',
  channels: {
    email: 'orders@independentelectricbikes.com.au',
    whatsapp: '61480811308',
  },
  paymentMethods: [
    {
      id: 'bank-transfer',
      label: 'Direct Bank Transfer (EFT)',
      opening: 'Please transfer exactly {amount} for Order #{ref} to our Australian business bank account below.',
      closing: 'Include Order #{ref} as your payment reference. Bank transfers clear within 1-2 business hours.',
    },
    {
      id: 'payid',
      label: 'PayID / Osko (Instant Fast Payments)',
      opening: 'Transfer {amount} instantly via PayID for Order #{ref}.',
      closing: 'Instant clearing via Australian Osko bank network.',
    },
    {
      id: 'crypto',
      label: 'Cryptocurrency (10% Discount Applied)',
      opening: 'Send equivalent crypto funds for Order #{ref} (10% discount included: {amount} AUD).',
      closing: 'Send transaction hash or screenshot once broadcasted on-chain.',
    },
  ],
};

export const CHAT = {
  channels: [
    { type: 'whatsapp' as const, value: '61480811308', label: 'WhatsApp Direct Chat' },
    { type: 'phone' as const, value: '+61480811308', label: 'Call 0480 811 308' },
    { type: 'email' as const, value: 'sales@independentelectricbikes.com.au', label: 'Email Sales Support' },
  ],
};

export const BRAND = {
  foundingYear: '2017',
  foundingLocation: 'Brunswick, Victoria, Australia',
  description: 'Independent Electric Bikes (operated by VYRON Industries Pty Ltd, ABN 23 618 699 479) has been designing, engineering, and distributing high-performance electric bikes, scooters, skateboards, and personal EVs in Victoria since 2017.',
  milestones: [
    { year: '2017', event: 'VYRON Industries Pty Ltd established in Victoria with ABN registration.' },
    { year: '2019', event: 'Launched the original Vyron Hazmats commuter e-bike range for Melbourne urban riders.' },
    { year: '2021', event: 'Expanded into heavy-duty dual-battery cargo e-bikes and performance e-scooters.' },
    { year: '2024', event: 'Surpassed 10,000 electric vehicles delivered across Victoria and interstate Australia.' },
    { year: '2026', event: 'Unveiled 2026 Master EV Taxonomy range including eMTB, self-balancing EV & mobility scooters.' },
  ],
  differentiation: [
    'Direct-from-manufacturer pricing without middleman dealer markups',
    'Engineered specifically for Australian road standards & hill-climbing torque requirements',
    'Full spare parts, replacement battery, and local Victorian service support',
    'Fast express freight across Victoria and metro Australia with 100% transit insurance',
  ],
  sameAs: [
    'https://www.facebook.com/independentelectricbikes',
    'https://www.instagram.com/independentelectricbikes',
  ],
  awards: [
    '2024 Best Value Commuter E-Bike Australia (Victorian Cycling Review)',
    '2025 Cargo E-Bike Innovation Award - Urban Mobility Tech',
  ],
};

export interface SubCategory {
  slug: string;
  name: string;
  path: string; // e.g. /shop/electric-bikes/urban-commuter-ebikes
  description?: string;
  items?: { slug: string; name: string; path: string; description?: string }[];
}

export interface MainCategory {
  slug: string;
  name: string;
  path: string; // e.g. /shop/electric-bikes
  description: string;
  image: string;
  seoTitle?: string;
  subcategories: SubCategory[];
}

export const MASTER_TAXONOMY: MainCategory[] = [
  {
    slug: 'electric-bikes',
    name: 'Electric Bikes',
    path: '/shop/electric-bikes',
    description: 'Electric bikes for every ride — urban commuters, heavy-duty cargo, full-suspension eMTBs, foldable e-bikes and fat tyre cruisers.',
    image: '/images/categories/electric-bikes.webp',
    subcategories: [
      {
        slug: 'urban-commuter-ebikes',
        name: 'Urban & Commuter E-Bikes',
        path: '/shop/electric-bikes/urban-commuter-ebikes',
        description: 'Commuter e-bikes built for Australian city traffic — sleek, efficient and road-legal.',
        items: [
          { slug: 'step-through-commuters', name: 'Step-Through Commuters', path: '/shop/electric-bikes/step-through-commuters', description: 'Step-through e-bikes — low-frame commuters ideal for easy mounting and city riding.' },
          { slug: 'step-over-commuters', name: 'Step-Over / Diamond Frame', path: '/shop/electric-bikes/step-over-commuters', description: 'E-bike mens and step-over diamond-frame commuters for road and city riding.' },
          { slug: 'belt-drive-commuters', name: 'Belt-Drive Commuters', path: '/shop/electric-bikes/belt-drive-commuters', description: 'Belt-drive e-bikes — low-maintenance carbon belt commuters, no chain grease.' },
          { slug: 'lightweight-urban-ebikes', name: 'Lightweight Urban E-Bikes', path: '/shop/electric-bikes/lightweight-urban-ebikes', description: 'Lightweight electric bikes under 20 kg — the lightest e-bikes for urban Australian commuting.' },
        ],
      },
      {
        slug: 'cargo-family-ebikes',
        name: 'Cargo & Family E-Bikes',
        path: '/shop/electric-bikes/cargo-family-ebikes',
        description: 'Cargo e-bikes built to haul kids, groceries and gear — heavy-duty electric utility bikes.',
        items: [
          { slug: 'long-tail-cargo', name: 'Long-Tail Cargo', path: '/shop/electric-bikes/long-tail-cargo', description: 'Long-tail cargo bike frames — extended rear racks for heavy loads and child seats.' },
          { slug: 'compact-cargo', name: 'Compact Cargo', path: '/shop/electric-bikes/compact-cargo', description: 'Compact electric cargo bikes — shorter-wheelbase utility e-bikes for urban hauling.' },
          { slug: 'front-loader-cargo', name: 'Front-Loader (Box) Bikes', path: '/shop/electric-bikes/front-loader-cargo', description: 'Box bikes and front-loader cargo e-bikes — Dutch-style family haulers with enclosed cargo boxes.' },
        ],
      },
      {
        slug: 'electric-mountain-bikes',
        name: 'Electric Mountain Bikes - eMTB',
        path: '/shop/electric-bikes/electric-mountain-bikes',
        description: 'Electric mountain bikes — trail-conquering full-suspension and hardtail eMTBs.',
        items: [
          { slug: 'full-suspension-emtb', name: 'Full-Suspension eMTB', path: '/shop/electric-bikes/full-suspension-emtb', description: 'Full-suspension e-bikes — dual-shock eMTBs for aggressive trail and enduro riding.' },
          { slug: 'hardtail-emtb', name: 'Hardtail Trail eMTB', path: '/shop/electric-bikes/hardtail-emtb', description: 'Hardtail mountain bikes — efficient trail eMTBs with front suspension and rigid rear.' },
        ],
      },
      {
        slug: 'foldable-electric-bikes',
        name: 'Foldable E-Bikes',
        path: '/shop/electric-bikes/foldable-electric-bikes',
        description: 'Folding electric bikes for train commuters, apartments and caravans — compact and portable.',
        items: [
          { slug: 'compact-folding-bikes', name: 'Compact Folding Commuters', path: '/shop/electric-bikes/compact-folding-bikes', description: 'Folding commuter bicycles — compact e-bikes that fold for trains, apartments and car boots.' },
          { slug: 'fat-tyre-folding-bikes', name: 'Fat Tyre Folders', path: '/shop/electric-bikes/fat-tyre-folding-bikes', description: 'Fat tyre folding electric bikes — all-terrain foldable e-bikes with wide 4.0" tyres.' },
        ],
      },
      {
        slug: 'fat-tyre-lifestyle-ebikes',
        name: 'Fat Tyre & Lifestyle E-Bikes',
        path: '/shop/electric-bikes/fat-tyre-lifestyle-ebikes',
        description: 'Fat tyre e-bikes — all-terrain 4.0" cruisers and retro moped-style electric bikes.',
        items: [
          { slug: 'fat-tyre-all-terrain-ebikes', name: 'All-Terrain Fat Tyre', path: '/shop/electric-bikes/fat-tyre-all-terrain-ebikes', description: 'Off-road e-bikes with fat tyres — all-terrain electric bicycles for sand, snow and trails.' },
          { slug: 'classic-cruiser-ebikes', name: 'Classic Cruisers', path: '/shop/electric-bikes/classic-cruiser-ebikes', description: 'Cruiser e-bikes — retro beach-cruiser electric bikes for relaxed riding.' },
          { slug: 'moped-style-ebikes', name: 'Retro / Moped-Style E-Bikes', path: '/shop/electric-bikes/moped-style-ebikes', description: 'Electric moped-style e-bikes — retro Super73-style electric bikes for street and trail.' },
        ],
      },
      {
        slug: 'electric-dirt-motorbikes',
        name: 'Electric Dirt & Motorbikes',
        path: '/shop/electric-bikes/electric-dirt-motorbikes',
        description: 'Electric motorbikes and adult electric dirt bikes — high-performance off-road and dual-sport EVs.',
      },
      {
        slug: 'electric-mopeds',
        name: 'Electric Mopeds',
        path: '/shop/electric-bikes/electric-mopeds',
        description: 'Electric mopeds — seated, registrable electric scooters for urban commuting and delivery.',
      },
      {
        slug: 'electric-tricycles',
        name: 'Electric Tricycles & Trikes',
        path: '/shop/electric-bikes/electric-tricycles',
        description: 'Electric tricycles and trikes — three-wheel e-bikes for stability, comfort and cargo capacity.',
      },
    ],
  },
  {
    slug: 'electric-scooters',
    name: 'Electric Scooters',
    path: '/shop/electric-scooters',
    description: 'Electric scooter range — lightweight commuters and high-performance dual-motor long-range models.',
    image: '/images/categories/electric-scooters.webp',
    subcategories: [
      {
        slug: 'commuter-electric-scooters',
        name: 'Commuter E-Scooters',
        path: '/shop/electric-scooters/commuter-electric-scooters',
        description: 'Commuter electric scooters — lightweight, single-motor units built for folding onto public transport.',
      },
      {
        slug: 'long-range-electric-scooters',
        name: 'Long-Range & Performance E-Scooters',
        path: '/shop/electric-scooters/long-range-electric-scooters',
        description: 'Long-range electric scooters — dual-motor setups with heavy-duty suspension and extended battery packs.',
      },
    ],
  },
  {
    slug: 'electric-skateboards',
    name: 'Electric Skateboards',
    path: '/shop/electric-skateboards',
    description: 'Electric skateboard range — street longboards, all-terrain pneumatic boards and portable shortboards.',
    image: '/images/categories/electric-skateboards.webp',
    subcategories: [
      {
        slug: 'street-electric-skateboards',
        name: 'Street Electric Longboards',
        path: '/shop/electric-skateboards/street-electric-skateboards',
        description: 'Electric longboards with flexible decks and smooth urethane wheels for paved bike paths.',
      },
      {
        slug: 'all-terrain-electric-skateboards',
        name: 'All-Terrain / Pneumatic Boards',
        path: '/shop/electric-skateboards/all-terrain-electric-skateboards',
        description: 'All-terrain electric skateboards with air-filled tyres and high-power dual motors for gravel and grass.',
      },
      {
        slug: 'mini-electric-skateboards',
        name: 'Mini & Portable Shortboards',
        path: '/shop/electric-skateboards/mini-electric-skateboards',
        description: 'Mini electric skateboards — compact, lightweight decks for last-mile convenience.',
      },
      {
        slug: 'onewheel-style-boards',
        name: 'Onewheel-Style Boards',
        path: '/shop/electric-skateboards/onewheel-style-boards',
        description: 'Onewheel-style single-wheel self-balancing all-terrain boards.',
      },
    ],
  },
  {
    slug: 'self-balancing-ev',
    name: 'Self-Balancing EV',
    path: '/shop/self-balancing-ev',
    description: 'Hoverboards and electric unicycles (EUCs) — gyroscopic self-balancing personal EVs.',
    seoTitle: 'Hoverboards & Self-Balancing EV',
    image: '/images/categories/self-balancing-ev.webp',
    subcategories: [
      {
        slug: 'electric-unicycles',
        name: 'Electric Unicycles (EUWs)',
        path: '/shop/self-balancing-ev/electric-unicycles',
        description: 'Electric unicycles — high-speed, single-wheel gyroscopic commuter devices.',
      },
      {
        slug: 'hoverboards',
        name: 'Hoverboards & Self-Balancing Boards',
        path: '/shop/self-balancing-ev/hoverboards',
        description: 'Hoverboards for kids and adults — recreational two-wheel self-balancing boards.',
      },
      {
        slug: 'hoverboard-kart-attachments',
        name: 'Hoverboard Go-Kart Attachments',
        path: '/shop/self-balancing-ev/hoverboard-kart-attachments',
        description: 'Hoverboard kart attachments — seat and handlebar frames that turn a hoverboard into a go-kart.',
      },
    ],
  },
  {
    slug: 'kids-off-road-ev',
    name: 'Kids & Off-Road EV',
    path: '/shop/kids-off-road-ev',
    description: 'Kids electric bike range — balance bikes for toddlers, youth electric dirt bikes and electric go-karts.',
    seoTitle: 'Kids Electric Bikes & Off-Road EV',
    image: '/images/categories/kids-off-road-ev.webp',
    subcategories: [
      {
        slug: 'electric-balance-bikes',
        name: 'Electric Balance Bikes',
        path: '/shop/kids-off-road-ev/electric-balance-bikes',
        description: 'Balance bikes for toddlers — lightweight, throttle-controlled training bikes without pedals.',
      },
      {
        slug: 'youth-electric-dirt-bikes',
        name: 'Youth Electric Dirt & Pit Bikes',
        path: '/shop/kids-off-road-ev/youth-electric-dirt-bikes',
        description: 'Electric dirt bikes for kids — mid-size electric motorcycle alternatives with rugged suspension.',
      },
      {
        slug: 'electric-go-karts',
        name: 'Electric Go-Karts & Drift Trikes',
        path: '/shop/kids-off-road-ev/electric-go-karts',
        description: 'Electric go-karts and drift trikes — adjustable frame karts for driveways and closed tracks.',
      },
    ],
  },
  {
    slug: 'mobility-scooters',
    name: 'Mobility & Assisted Living',
    path: '/shop/mobility-scooters',
    description: 'Mobility scooters — travel folding models and heavy-duty 4-wheel all-terrain mobility scooters.',
    seoTitle: 'Mobility Scooters Australia',
    image: '/images/categories/mobility-scooters.webp',
    subcategories: [
      {
        slug: 'travel-mobility-scooters',
        name: 'Travel & Folding Mobility Scooters',
        path: '/shop/mobility-scooters/travel-mobility-scooters',
        description: 'Folding mobility scooters — lightweight, auto-folding units built for car boots and travel.',
      },
      {
        slug: 'heavy-duty-mobility-scooters',
        name: 'Heavy-Duty All-Terrain Mobility Scooters',
        path: '/shop/mobility-scooters/heavy-duty-mobility-scooters',
        description: 'Heavy-duty mobility scooters — 4-wheel robust models for outdoor paths and long community ranges.',
      },
    ],
  },
  {
    slug: 'batteries-parts-kits',
    name: 'Batteries, Parts & Kits',
    path: '/shop/batteries-parts-kits',
    description: 'Electric bike parts, batteries, chargers, tyres, brake components and mid-drive conversion kits.',
    seoTitle: 'Electric Bike Parts, Batteries & Kits',
    image: '/images/categories/batteries-parts-kits.webp',
    subcategories: [
      {
        slug: 'ebike-batteries',
        name: 'E-Bike Batteries',
        path: '/shop/batteries-parts-kits/ebike-batteries',
        description: 'E-bike battery packs — frame and downtube batteries for popular mid-drive systems.',
      },
      {
        slug: 'ebike-chargers',
        name: 'E-Bike Chargers',
        path: '/shop/batteries-parts-kits/ebike-chargers',
        description: 'E-bike chargers — fast and standard chargers for Bosch and Shimano systems.',
      },
      {
        slug: 'scooter-batteries',
        name: 'Scooter, Board & Mobility Batteries',
        path: '/shop/batteries-parts-kits/scooter-batteries',
        description: 'E-scooter battery and charger replacements for e-scooters, electric skateboards, hoverboards and mobility scooters.',
      },
      {
        slug: 'scooter-skate-chargers',
        name: 'Scooter, Skate & Kids Chargers',
        path: '/shop/batteries-parts-kits/scooter-skate-chargers',
        description: 'E-scooter chargers matched to scooters, electric skateboards, Onewheel and kids e-balance bikes.',
      },
      {
        slug: 'scooter-skate-parts',
        name: 'Scooter, Skate & Kids Parts',
        path: '/shop/batteries-parts-kits/scooter-skate-parts',
        description: 'Electric scooter parts and accessories — trucks, belts, throttles and inner tubes for scooters and skateboards.',
      },
      {
        slug: 'kids-dirt-bike-batteries',
        name: 'Kids & Dirt Bike Batteries',
        path: '/shop/batteries-parts-kits/kids-dirt-bike-batteries',
        description: 'Dirt bike battery replacements for kids electric balance bikes and youth electric pit bikes.',
      },
      {
        slug: 'tyres-tubes',
        name: 'Tyres & Tubes',
        path: '/shop/batteries-parts-kits/tyres-tubes',
        description: 'E-bike tyres and inner tubes — commuter and touring rated for electric bikes.',
      },
      {
        slug: 'brakes-rotors-pads',
        name: 'Brake Pads & Rotors',
        path: '/shop/batteries-parts-kits/brakes-rotors-pads',
        description: 'Mountain bike brake pads and disc rotors that fit Shimano and Tektro brakes.',
      },
      {
        slug: 'mid-drive-conversion-kits',
        name: 'Mid-Drive Conversion Kits',
        path: '/shop/batteries-parts-kits/mid-drive-conversion-kits',
        description: 'Mid-drive conversion kits by Bafang. Higher-power kits are for private land only.',
      },
      {
        slug: 'hub-motor-conversion-kits',
        name: 'Hub Motor Conversion Kits',
        path: '/shop/batteries-parts-kits/hub-motor-conversion-kits',
        description: 'Hub motor ebike kits — front and rear wheel e-bike conversion kits to electrify any bicycle.',
      },
    ],
  },
  {
    slug: 'safety-security-carry',
    name: 'Safety, Locks & Carry',
    path: '/shop/safety-security-carry',
    description: 'Bike locks, helmets, lights, racks, panniers, child seats and phone mounts for e-bike riders.',
    seoTitle: 'Bike Locks & E-Bike Safety Gear',
    image: '/images/categories/safety-security-carry.webp',
    subcategories: [
      {
        slug: 'helmets',
        name: 'Helmets',
        path: '/shop/safety-security-carry/helmets',
        description: 'Mountain bike helmets — road, urban and full-face options for e-bike riders.',
      },
      {
        slug: 'lights-visibility',
        name: 'Lights & Visibility',
        path: '/shop/safety-security-carry/lights-visibility',
        description: 'Bike lights — USB rechargeable front and rear light sets for e-bike commuters.',
      },
      {
        slug: 'jackets-hi-vis',
        name: 'Jackets & Hi-Vis',
        path: '/shop/safety-security-carry/jackets-hi-vis',
        description: 'Reflective and weatherproof riding jackets for e-bike commuters.',
      },
      {
        slug: 'u-d-locks',
        name: 'U-Locks & D-Locks',
        path: '/shop/safety-security-carry/u-d-locks',
        description: 'Bike U-locks — rigid hardened-steel shackle locks from Kryptonite and ABUS.',
      },
      {
        slug: 'folding-locks',
        name: 'Folding Locks',
        path: '/shop/safety-security-carry/folding-locks',
        description: 'Folding bike locks — compact articulated locks that fold flat for commuters.',
      },
      {
        slug: 'chain-locks',
        name: 'Chain Locks',
        path: '/shop/safety-security-carry/chain-locks',
        description: 'Bike chain locks — flexible chain and padlock sets for frames and wheels.',
      },
      {
        slug: 'racks-baskets',
        name: 'Racks & Baskets',
        path: '/shop/safety-security-carry/racks-baskets',
        description: 'Bicycle racks, panniers and baskets — rear racks, front racks and cargo baskets.',
      },
      {
        slug: 'panniers-bags',
        name: 'Panniers & Bags',
        path: '/shop/safety-security-carry/panniers-bags',
        description: 'Bike panniers — waterproof panniers, dry bags and rack bags for commuting, touring and shopping.',
      },
      {
        slug: 'child-seats',
        name: 'Child Seats',
        path: '/shop/safety-security-carry/child-seats',
        description: 'Child bike seats — frame and rack mounted child seats for e-bikes and cargo bikes.',
      },
      {
        slug: 'phone-mounts',
        name: 'Phone Mounts',
        path: '/shop/safety-security-carry/phone-mounts',
        description: 'Phone mounts for bikes — Quad Lock and handlebar mounts for navigation and ride tracking.',
      },
    ],
  },
  {
    slug: 'electric-quad-bikes',
    name: 'Electric Quad Bikes & ATVs',
    path: '/shop/electric-quad-bikes',
    description: 'Electric quad bikes for kids and adults — battery-powered ATVs and farm utility quads.',
    seoTitle: 'Electric Quad Bikes & ATVs Australia',
    image: '/images/categories/electric-quad-bikes.webp',
    subcategories: [
      {
        slug: 'kids-electric-quads',
        name: 'Kids Electric Quad Bikes',
        path: '/shop/electric-quad-bikes/kids-electric-quads',
        description: 'Kids electric quad bikes — battery-powered youth ATVs with speed limiters and parental controls.',
      },
      {
        slug: 'adult-electric-quads',
        name: 'Adult Electric Quad Bikes & ATVs',
        path: '/shop/electric-quad-bikes/adult-electric-quads',
        description: 'Adult electric ATVs — high-performance battery-powered quad bikes for recreation and utility.',
      },
      {
        slug: 'farm-utility-quads',
        name: 'Farm & Utility Electric Quads',
        path: '/shop/electric-quad-bikes/farm-utility-quads',
        description: 'Farming quad bikes for sale — electric utility ATVs with towing capacity for agriculture and property work.',
      },
    ],
  },
  {
    slug: 'electric-water-sports',
    name: 'Electric Water Sports',
    path: '/shop/electric-water-sports',
    description: 'Electric surfboards, hydrofoils, jetboards and electric jet skis — battery-powered watercraft.',
    seoTitle: 'Electric Surfboards & Water Sports Australia',
    image: '/images/categories/electric-water-sports.webp',
    subcategories: [
      {
        slug: 'electric-surfboards',
        name: 'Electric Surfboards & Hydrofoils',
        path: '/shop/electric-water-sports/electric-surfboards',
        description: 'Electric surfboards and eFoil hydrofoils — battery-powered boards for open water riding.',
      },
      {
        slug: 'electric-jetboards',
        name: 'Electric Jetboards',
        path: '/shop/electric-water-sports/electric-jetboards',
        description: 'Electric jetboards — motorised bodyboards and jet-powered surfboards for flat-water thrills.',
      },
      {
        slug: 'electric-jetskis',
        name: 'Electric Jet Skis & Personal Watercraft',
        path: '/shop/electric-water-sports/electric-jetskis',
        description: 'Electric jet skis — zero-emission personal watercraft for lakes, rivers and coastal waters.',
      },
    ],
  },
];

// Flat CATEGORIES export for legacy callers
export const CATEGORIES = MASTER_TAXONOMY.map((m) => ({
  slug: m.slug,
  name: m.name,
  description: m.description,
  image: m.image,
  path: m.path,
}));

export interface ProductFilters {
  motorType?: 'Rear Hub' | 'Front Hub' | 'Mid-Drive' | 'Dual Motor' | 'Hub Drive';
  sensorType?: 'Torque Sensor' | 'Cadence Sensor' | 'Gyroscopic' | 'Throttle';
  compliance?: 'EN15194 Certified' | 'Off-Road Private Land' | 'CE Certified';
  brakeType?: 'Hydraulic Disc' | 'Mechanical Disc' | 'Regenerative' | 'V-Brake';
  batteryRange?: 'Under 50km' | '50km+ Long Range';
}

export interface Product {
  /** Present only when specs and filters were confirmed against the manufacturer's own pages (see config/data/verified.ts). */
  verified?: VerifiedInfo;
  slug: string;
  name: string;
  price: number;
  category: string; // e.g. electric-bikes
  subcategory?: string; // e.g. urban-commuter-ebikes
  subSubcategory?: string; // e.g. step-through-commuters
  description: string;
  shortDescription: string;
  badge: 'Best Seller' | 'Popular' | 'Best Value' | 'Premium' | 'Sale' | 'New' | 'none';
  images: string[];
  featured?: boolean;
  filters: ProductFilters;
  specs: {
    motor: string;
    battery: string;
    range: string;
    topSpeed: string;
    brakes: string;
    weight: string;
    payload: string;
    frame: string;
    gears: string;
  };
}

const EMPTY_SPECS: Product['specs'] = { motor: '', battery: '', range: '', topSpeed: '', brakes: '', weight: '', payload: '', frame: '', gears: '' };

function categoryLabel(p: Product): string {
  const main = MASTER_TAXONOMY.find((m) => m.slug === p.category);
  const sub = main?.subcategories.find((s) => s.slug === p.subcategory || s.items?.some((i) => i.slug === p.subcategory));
  return (sub?.name || main?.name || 'Electric vehicle').trim();
}

/**
 * Products without manufacturer-verified data carry no technical specs or filter values (the bundled figures were
 * generic placeholders) and neutral descriptions, so nothing unverified is presented to customers as fact.
 */
function applyVerification(p: Product): Product {
  const v = VERIFIED[p.slug];
  // Real photos only; products without one show a neutral placeholder instead of an unrelated stock image.
  const images = [PRODUCT_IMAGES[p.slug] ?? PRODUCT_PLACEHOLDER];
  if (v) {
    return {
      ...p,
      images,
      verified: v,
      specs: { ...EMPTY_SPECS, ...v.specs },
      filters: { ...v.filters },
      shortDescription: `${p.name} - ${categoryLabel(p)}`,
      description: `${p.name} is available from ${SITE.entityName}. Specifications below are as published by the manufacturer.`,
    };
  }
  return {
    ...p,
    images,
    specs: { ...EMPTY_SPECS },
    filters: {},
    shortDescription: `${p.name} - ${categoryLabel(p)}`,
    description: `${p.name} is available from ${SITE.entityName}. Ask us for the manufacturer specification sheet and Australian road-legal status before ordering.`,
  };
}

export const PRODUCTS: Product[] = EBIKE_PRODUCTS.map(applyVerification);

export const POSTS = [
  // === ELECTRIC BIKES (35 posts) ===
  {
    slug: 'best-electric-commuter-bike-australia-guide-2026',
    title: 'How to Choose the Best Electric Commuter Bike in Australia (2026 Buying Guide)',
    excerpt: 'Everything you need to know about motor wattages, battery capacities, hydraulic brakes, and Australian EN15194 legal requirements before buying your first commuter e-bike.',
    category: 'Commuter Guides',
    date: '2026-09-15',
    readTime: '6 min read',
    image: '/images/blog/best-electric-commuter-bike-australia-guide-2026.d1044f50.webp',
  },
  {
    slug: 'melbourne-ebike-laws-and-safety-standards',
    title: 'Understanding Victorian & Australian E-Bike Laws: Speed Limits, Power & Safety',
    excerpt: 'Demystifying 250W/25kmh pedal assist rules vs throttle regulations in Victoria and across Australian states.',
    category: 'E-Bike Regulations',
    date: '2026-08-28',
    readTime: '5 min read',
    image: '/images/blog/melbourne-ebike-laws-and-safety-standards.531822c7.webp',
  },
  {
    slug: 'cargo-electric-bikes-replacing-second-family-car',
    title: 'Why Australian Families are Replacing Their Second Car with a Dual-Battery Cargo E-Bike',
    excerpt: 'Calculate your annual fuel, insurance, and parking savings when switching school drop-offs and grocery runs to a heavy-duty cargo e-bike.',
    category: 'Cargo Lifestyle',
    date: '2026-08-10',
    readTime: '7 min read',
    image: '/images/blog/cargo-electric-bikes-replacing-second-family-car.5d0b7db0.webp',
  },
  {
    slug: 'ebike-battery-care-and-range-maximization-guide',
    title: 'E-Bike Battery Care: How to Double Your Lithium Pack Lifespan & Maximize Range',
    excerpt: 'Essential charging, storage, and maintenance tips for Samsung and LG e-bike batteries in Australian summer heat.',
    category: 'Battery & Tech',
    date: '2026-07-22',
    readTime: '6 min read',
    image: '/images/blog/ebike-battery-care-and-range-maximization-guide.333fe689.webp',
  },
  {
    slug: 'belt-drive-vs-chain-ebikes-pros-cons-australia',
    title: 'Gates Carbon Belt Drive vs Traditional Chain E-Bikes: Which is Right for You?',
    excerpt: 'Comparing zero-maintenance belt drives with internal gear hubs against traditional cassette chains for daily urban commuting.',
    category: 'Tech Comparisons',
    date: '2026-07-05',
    readTime: '5 min read',
    image: '/images/blog/belt-drive-vs-chain-ebikes-pros-cons-australia.384ddfee.webp',
  },
  {
    slug: 'mid-drive-vs-hub-motors-australian-hills-comparison',
    title: 'Mid-Drive Motors vs Hub Motors: Hill Climbing Torque & Efficiency Compared',
    excerpt: 'How Bosch, Shimano STEPS, and Bafang mid-drive systems perform compared to high-torque rear hub motors on steep city hills.',
    category: 'Motor Systems',
    date: '2026-06-18',
    readTime: '8 min read',
    image: '/images/blog/mid-drive-vs-hub-motors-australian-hills-comparison.791e2380.webp',
  },
  {
    slug: 'hydraulic-vs-mechanical-disc-brakes-ebike-safety',
    title: 'Hydraulic Disc Brakes vs Mechanical Brakes: Stopping Distance on Heavy E-Bikes',
    excerpt: 'Why 4-piston hydraulic disc brakes are essential for heavy cargo e-bikes and wet Melbourne road conditions.',
    category: 'Safety & Tech',
    date: '2026-05-30',
    readTime: '5 min read',
    image: '/images/blog/hydraulic-vs-mechanical-disc-brakes-ebike-safety.3cb03a99.webp',
  },
  {
    slug: 'folding-ebikes-commuter-guide-train-apartment',
    title: 'Folding E-Bikes: The Ultimate Guide for Train Commuters & Apartment Dwellers',
    excerpt: 'How folding electric bikes solve the last-mile problem for Australian train commuters — fold times, weight limits, wheel sizes, and public transport rules.',
    category: 'Commuter Guides',
    date: '2026-03-28',
    readTime: '7 min read',
    image: '/images/blog/folding-ebikes-commuter-guide-train-apartment.c76df27c.webp',
  },
  {
    slug: 'fat-tyre-ebikes-beach-sand-trail-riding-australia',
    title: 'Fat Tyre E-Bikes: Beach, Sand & Trail Riding in Australia',
    excerpt: 'Why 4-inch fat tyres float on sand and gravel, how tyre pressure changes everything, and where to ride fat tyre e-bikes across Australia.',
    category: 'Lifestyle Riding',
    date: '2026-03-15',
    readTime: '6 min read',
    image: '/images/blog/fat-tyre-ebikes-beach-sand-trail-riding-australia.f5920174.webp',
  },
  {
    slug: 'electric-mountain-bikes-full-suspension-vs-hardtail',
    title: 'eMTB Buying Guide: Full-Suspension vs Hardtail Electric Mountain Bikes',
    excerpt: 'Comparing full-suspension and hardtail eMTBs — suspension travel, trail capability, weight, maintenance, and the best Australian riding spots.',
    category: 'Mountain Biking',
    date: '2026-03-01',
    readTime: '8 min read',
    image: '/images/blog/electric-mountain-bikes-full-suspension-vs-hardtail.18fc3e4c.webp',
  },
  {
    slug: 'ebike-conversion-kits-diy-guide-australia',
    title: 'DIY E-Bike Conversion Kits: Turn Any Bike Electric (Australian Guide)',
    excerpt: 'Bafang BBS02B, BBSHD, and hub motor kits compared — installation, battery selection, frame compatibility, and Australian legal compliance.',
    category: 'DIY & Tech',
    date: '2026-02-15',
    readTime: '9 min read',
    image: '/images/blog/ebike-conversion-kits-diy-guide-australia.4288279b.webp',
  },
  {
    slug: 'cryptocurrency-ebike-buying-discount-guide',
    title: 'How to Save 10% on Your E-Bike Purchase Using Crypto (BTC / USDT) & PayID',
    excerpt: 'Step-by-step tutorial on taking advantage of our 10% instant cryptocurrency discount at checkout with instant clearing.',
    category: 'Buying & Discounts',
    date: '2026-04-10',
    readTime: '4 min read',
    image: '/images/blog/cryptocurrency-ebike-buying-discount-guide.90a336de.webp',
  },
  {
    slug: 'moped-style-ebikes-retro-super73-cafe-racer',
    title: 'Moped-Style E-Bikes: Retro Looks, Modern Electric Power',
    excerpt: 'The rise of moped-style and cafe-racer e-bikes — fat tyres, bench seats, and vintage aesthetics with modern electric drivetrains. Legal status in Australia explained.',
    category: 'Buying Guides',
    date: '2025-05-18',
    readTime: '8 min read',
    image: '/images/blog/moped-style-ebikes-retro-super73-cafe-racer.75290bb7.webp',
  },
  {
    slug: 'step-through-vs-step-over-frame-guide',
    title: 'Step-Through vs Step-Over E-Bike Frames: Which Is Right for You?',
    excerpt: 'Comparing step-through and step-over e-bike frames — stiffness, weight, accessibility, mounting ease, and why the motor changes the equation.',
    category: 'Buying Guides',
    date: '2025-02-05',
    readTime: '7 min read',
    image: '/images/blog/step-through-vs-step-over-frame-guide.b3c7be6c.webp',
  },
  {
    slug: 'ebike-warranty-consumer-rights-australia',
    title: 'E-Bike Warranty & Consumer Rights in Australia',
    excerpt: 'Your rights under Australian Consumer Law when an e-bike breaks — major vs minor failures, warranty periods, and how to claim a repair, replacement, or refund.',
    category: 'Buying Guides',
    date: '2025-01-20',
    readTime: '8 min read',
    image: '/images/blog/ebike-warranty-consumer-rights-australia.c29df7e2.webp',
  },
  {
    slug: 'best-ebikes-under-2000-australia-budget',
    title: 'Best E-Bikes Under $2,000 in Australia: Budget Buying Guide',
    excerpt: 'What to expect from a budget e-bike, what to prioritise, where to buy, and the upgrades that make a $1,500 bike ride like a $2,500 one.',
    category: 'Buying Guides',
    date: '2024-01-08',
    readTime: '11 min read',
    image: '/images/blog/best-ebikes-under-2000-australia-budget.04e836ad.webp',
  },
  {
    slug: 'ebike-subsidies-incentives-rebates-australia',
    title: 'E-Bike Subsidies, Incentives & Rebates in Australia (2026)',
    excerpt: 'State-by-state guide to e-bike financial incentives — subsidies, salary sacrifice, tax deductions, employer programs, and how Australia compares globally.',
    category: 'Buying Guides',
    date: '2023-11-15',
    readTime: '10 min read',
    image: '/images/blog/ebike-subsidies-incentives-rebates-australia.7b053b7c.webp',
  },
  {
    slug: 'ebike-troubleshooting-common-problems-fixes',
    title: 'E-Bike Troubleshooting: Common Problems & Easy Fixes',
    excerpt: 'Motor not engaging, battery not charging, reduced range, unusual noises, display errors — diagnose and fix the most common e-bike issues at home.',
    category: 'Maintenance',
    date: '2023-10-18',
    readTime: '12 min read',
    image: '/images/blog/ebike-troubleshooting-common-problems-fixes.23dd42b0.webp',
  },
  {
    slug: 'ebike-maintenance-schedule-checklist',
    title: 'E-Bike Maintenance Schedule & Checklist',
    excerpt: 'Weekly, monthly, quarterly, and annual maintenance for your e-bike — what to check, how to do it, replacement intervals, and the tools you need at home.',
    category: 'Maintenance',
    date: '2023-09-08',
    readTime: '11 min read',
    image: '/images/blog/ebike-maintenance-schedule-checklist.a3af2849.webp',
  },
  {
    slug: 'ebike-motor-types-hub-mid-drive-friction',
    title: 'E-Bike Motor Types Explained: Hub, Mid-Drive & Friction',
    excerpt: 'How hub motors, mid-drive motors, and friction drives work — torque, efficiency, maintenance, and which type suits your riding style.',
    category: 'Tech & Components',
    date: '2024-03-20',
    readTime: '10 min read',
    image: '/images/blog/ebike-motor-types-hub-mid-drive-friction.d72a5299.webp',
  },
  {
    slug: 'ebike-range-how-far-can-you-go-explained',
    title: 'E-Bike Range: How Far Can You Actually Go? (Explained)',
    excerpt: 'Why rated range is optimistic, the 10 factors that determine real range, and how to maximise every watt-hour from your battery.',
    category: 'Tech & Components',
    date: '2024-04-20',
    readTime: '8 min read',
    image: '/images/blog/ebike-range-how-far-can-you-go-explained.ade16883.webp',
  },
  {
    slug: 'ebike-road-rules-every-australian-state',
    title: 'E-Bike Road Rules: A State-by-State Guide for Australia',
    excerpt: 'Footpath access, throttle limits, helmet fines, and where you can ride — comparing e-bike laws in VIC, NSW, QLD, SA, WA, TAS, ACT, and NT.',
    category: 'Laws & Regulations',
    date: '2024-05-20',
    readTime: '9 min read',
    image: '/images/blog/ebike-road-rules-every-australian-state.6e67274c.webp',
  },
  {
    slug: 'ebike-speed-limiters-derestriction-legal-risks',
    title: 'E-Bike Speed Limiters & Derestriction: Legal Risks in Australia',
    excerpt: 'How e-bike speed limiters work, what derestriction does, and the legal, insurance, and safety consequences of removing the 25 km/h limit.',
    category: 'Laws & Regulations',
    date: '2024-09-05',
    readTime: '8 min read',
    image: '/images/blog/ebike-speed-limiters-derestriction-legal-risks.4f479ca9.webp',
  },
  {
    slug: 'ebike-battery-replacement-choosing-right-one',
    title: 'E-Bike Battery Replacement: How to Choose the Right One',
    excerpt: 'OEM vs third-party batteries, voltage matching, cell quality, BMS safety, and what to check before buying a replacement e-bike battery.',
    category: 'Maintenance',
    date: '2024-07-20',
    readTime: '9 min read',
    image: '/images/blog/ebike-battery-replacement-choosing-right-one.1aa2c327.webp',
  },
  {
    slug: 'ebike-battery-fire-safety-lithium-ion',
    title: 'E-Bike Battery Fire Safety: Prevention, Charging, and What to Do',
    excerpt: 'What causes lithium-ion battery fires, how to charge and store safely, signs of thermal runaway, and emergency response if a fire starts.',
    category: 'Safety',
    date: '2022-11-18',
    readTime: '13 min read',
    image: '/images/blog/ebike-battery-fire-safety-lithium-ion.8607df75.webp',
  },

  // === ELECTRIC SCOOTERS (12 posts — 2 kept + 10 new) ===
  {
    slug: 'electric-scooter-laws-victoria-and-australia-2026',
    title: 'E-Scooter Trial Laws in Victoria: Speed Limits, Helmets & Legal Riding Areas',
    excerpt: 'A complete breakdown of Victorian e-scooter rules, footpath bans, speed limits, and legal private-land performance models.',
    category: 'E-Scooter Guide',
    date: '2026-05-12',
    readTime: '6 min read',
    image: '/images/blog/electric-scooter-laws-victoria-and-australia-2026.44814fca.webp',
  },
  {
    slug: 'electric-scooter-vs-ebike-commuting-comparison',
    title: 'Electric Scooter vs E-Bike: Which Is Better for Your Commute?',
    excerpt: 'Speed, range, exercise, portability, cost, and safety compared — a detailed breakdown for Australian commuters choosing between e-scooters and e-bikes.',
    category: 'Commuter Guides',
    date: '2026-01-05',
    readTime: '8 min read',
    image: '/images/blog/electric-scooter-vs-ebike-commuting-comparison.64b72a42.webp',
  },
  {
    slug: 'best-electric-scooter-commuter-australia',
    title: 'Best Electric Scooters for Commuting in Australia (2026)',
    excerpt: 'Top commuter e-scooters ranked by range, weight, fold time, and price — plus Australian legal status and where you can ride.',
    category: 'E-Scooter Guide',
    date: '2026-04-28',
    readTime: '8 min read',
    image: '/images/blog/best-electric-scooter-commuter-australia.81766b25.webp',
  },
  {
    slug: 'electric-scooter-maintenance-tyres-brakes-guide',
    title: 'E-Scooter Maintenance: Tyres, Brakes & Folding Mechanisms',
    excerpt: 'Keep your electric scooter in top condition — tyre pressure, brake adjustment, folding hinge care, firmware updates, and seasonal checks.',
    category: 'E-Scooter Guide',
    date: '2026-02-20',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-maintenance-tyres-brakes-guide.928ea041.webp',
  },
  {
    slug: 'dual-motor-electric-scooter-long-range-guide',
    title: 'Dual-Motor Long-Range E-Scooters: When Do You Need One?',
    excerpt: 'Performance, hill climbing, range, and price — understanding when a dual-motor e-scooter is worth the extra cost versus a lightweight single-motor.',
    category: 'E-Scooter Guide',
    date: '2025-12-15',
    readTime: '8 min read',
    image: '/images/blog/dual-motor-electric-scooter-long-range-guide.5d5214bc.webp',
  },
  {
    slug: 'electric-scooter-safety-gear-essentials-australia',
    title: 'Essential Safety Gear for Electric Scooter Riders in Australia',
    excerpt: 'Helmets, gloves, lights, reflective vests, and wrist guards — what every e-scooter rider needs and what Australian law requires.',
    category: 'E-Scooter Guide',
    date: '2025-10-08',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-safety-gear-essentials-australia.29681a4e.webp',
  },
  {
    slug: 'electric-scooter-battery-range-maximizing-tips',
    title: 'Maximising E-Scooter Battery Range: Charging, Riding & Temperature Tips',
    excerpt: 'How to get the most range from your e-scooter battery — charging habits, riding technique, cold weather impact, and when to replace.',
    category: 'E-Scooter Guide',
    date: '2025-08-22',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-battery-range-maximizing-tips.1cd19706.webp',
  },
  {
    slug: 'folding-electric-scooter-last-mile-commuting',
    title: 'Folding E-Scooters for Last-Mile Commuting: Train + Scooter',
    excerpt: 'How a folding e-scooter solves the last-mile problem — fold times, weight limits, public transport rules, and the best lightweight models.',
    category: 'E-Scooter Guide',
    date: '2025-06-10',
    readTime: '7 min read',
    image: '/images/blog/folding-electric-scooter-last-mile-commuting.9ad7014c.webp',
  },
  {
    slug: 'electric-scooter-tyre-types-solid-pneumatic',
    title: 'Solid vs Pneumatic Tyres on E-Scooters: Which Is Better?',
    excerpt: 'Puncture resistance vs ride comfort and grip — comparing solid, honeycomb, and air-filled tyres for electric scooters.',
    category: 'E-Scooter Guide',
    date: '2025-04-15',
    readTime: '6 min read',
    image: '/images/blog/electric-scooter-tyre-types-solid-pneumatic.b8539abd.webp',
  },
  {
    slug: 'electric-scooter-speed-power-performance-guide',
    title: 'E-Scooter Speed & Power Ratings Explained',
    excerpt: 'Watts, voltage, peak vs nominal power, and real-world performance — how to read e-scooter specs and what the numbers actually mean.',
    category: 'E-Scooter Guide',
    date: '2025-02-28',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-speed-power-performance-guide.84dad5de.webp',
  },
  {
    slug: 'electric-scooter-wet-weather-rain-riding-tips',
    title: 'Riding an E-Scooter in the Rain: IP Ratings, Braking & Safety',
    excerpt: 'IP ratings explained, wet-weather braking technique, visibility gear, and post-ride maintenance for e-scooter riders in Australian conditions.',
    category: 'E-Scooter Guide',
    date: '2024-12-18',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-wet-weather-rain-riding-tips.557951fb.webp',
  },
  {
    slug: 'electric-scooter-vs-car-cost-comparison-australia',
    title: 'E-Scooter vs Car for Short Commutes: Annual Cost Breakdown',
    excerpt: 'Fuel, registration, insurance, and parking versus electricity and tyres — the real cost comparison for Australian short-distance commuters.',
    category: 'E-Scooter Guide',
    date: '2024-10-28',
    readTime: '7 min read',
    image: '/images/blog/electric-scooter-vs-car-cost-comparison-australia.d9e4ecd9.webp',
  },

  // === ELECTRIC SKATEBOARDS (9 posts — 1 kept + 8 new) ===
  {
    slug: 'electric-skateboard-laws-safety-gear-australia',
    title: 'Electric Skateboard Laws & Essential Safety Gear in Australia (2026)',
    excerpt: 'State-by-state legal status of electric skateboards, plus the safety gear every rider needs — helmets, wrist guards, and high-visibility equipment.',
    category: 'E-Skateboard Guide',
    date: '2026-02-01',
    readTime: '7 min read',
    image: '/images/blog/electric-skateboard-laws-safety-gear-australia.7030cb6c.webp',
  },
  {
    slug: 'best-electric-skateboard-beginner-guide-australia',
    title: 'Best Electric Skateboards for Beginners in Australia',
    excerpt: 'What to look for in your first electric skateboard — deck type, motor power, remote control, safety features, and Australian price ranges.',
    category: 'E-Skateboard Guide',
    date: '2025-11-20',
    readTime: '8 min read',
    image: '/images/blog/best-electric-skateboard-beginner-guide-australia.28dbe26d.webp',
  },
  {
    slug: 'electric-longboard-vs-shortboard-choosing-guide',
    title: 'Electric Longboard vs Shortboard: Which Should You Choose?',
    excerpt: 'Comparing range, portability, stability, and ride feel — how to pick between an electric longboard and shortboard for your riding style.',
    category: 'E-Skateboard Guide',
    date: '2025-09-08',
    readTime: '7 min read',
    image: '/images/blog/electric-longboard-vs-shortboard-choosing-guide.f53eafdf.webp',
  },
  {
    slug: 'all-terrain-electric-skateboard-off-road-riding',
    title: 'All-Terrain Electric Skateboards: Off-Road Riding Guide',
    excerpt: 'Pneumatic wheels, dual motors, and flex decks — what makes an all-terrain e-skateboard and where to ride off-road in Australia.',
    category: 'E-Skateboard Guide',
    date: '2025-07-02',
    readTime: '8 min read',
    image: '/images/blog/all-terrain-electric-skateboard-off-road-riding.e692d97f.webp',
  },
  {
    slug: 'electric-skateboard-maintenance-belts-wheels-bearings',
    title: 'E-Skateboard Maintenance: Belts, Wheels, Bearings & Deck Care',
    excerpt: 'Keep your electric skateboard running smoothly — belt tension, wheel rotation, bearing cleaning, grip tape care, and battery storage.',
    category: 'E-Skateboard Guide',
    date: '2025-05-02',
    readTime: '7 min read',
    image: '/images/blog/electric-skateboard-maintenance-belts-wheels-bearings.6585b2ac.webp',
  },
  {
    slug: 'electric-skateboard-braking-techniques-safety',
    title: 'Braking on an Electric Skateboard: Techniques & Safety',
    excerpt: 'Regenerative braking, foot braking, slide stops, and speed wobbles — how to stop safely on an electric skateboard.',
    category: 'E-Skateboard Guide',
    date: '2025-03-12',
    readTime: '7 min read',
    image: '/images/blog/electric-skateboard-braking-techniques-safety.3c5f95c0.webp',
  },
  {
    slug: 'onewheel-style-boards-beginner-guide',
    title: 'Onewheel-Style Boards: How They Work & Beginner Guide',
    excerpt: 'Single-wheel self-balancing boards — how they work, the learning curve, terrain capability, and Australian legal status.',
    category: 'E-Skateboard Guide',
    date: '2025-01-05',
    readTime: '8 min read',
    image: '/images/blog/onewheel-style-boards-beginner-guide.5dd43559.webp',
  },
  {
    slug: 'electric-skateboard-range-speed-battery-guide',
    title: 'E-Skateboard Range & Speed: Battery Capacity and Real-World Numbers',
    excerpt: 'How battery capacity, motor power, rider weight, and terrain affect your electric skateboard range and top speed.',
    category: 'E-Skateboard Guide',
    date: '2024-11-08',
    readTime: '7 min read',
    image: '/images/blog/electric-skateboard-range-speed-battery-guide.26b8435f.webp',
  },
  {
    slug: 'electric-skateboard-commuting-pros-cons',
    title: 'Commuting on an Electric Skateboard: Pros, Cons & Practical Guide',
    excerpt: 'Is an electric skateboard a real commuter vehicle? Range, portability, weather, safety, and what to carry for a skateboard commute.',
    category: 'E-Skateboard Guide',
    date: '2024-09-12',
    readTime: '8 min read',
    image: '/images/blog/electric-skateboard-commuting-pros-cons.4427ee7f.webp',
  },

  // === SELF-BALANCING / EUC / HOVERBOARDS (8 posts — 1 kept + 7 new) ===
  {
    slug: 'electric-unicycles-euc-beginner-guide-australia',
    title: 'Electric Unicycles (EUC): Beginner Guide for Australian Riders',
    excerpt: 'How EUCs work, the 5–15 hour learning curve, legal status by state, wheel sizes, safety gear, and why they are the most portable PEV.',
    category: 'EUC Guide',
    date: '2025-08-15',
    readTime: '7 min read',
    image: '/images/blog/electric-unicycles-euc-beginner-guide-australia.777b7d60.webp',
  },
  {
    slug: 'hoverboard-buying-guide-kids-adults-australia',
    title: 'Hoverboard Buying Guide: Kids & Adults in Australia',
    excerpt: 'Wheel sizes, safety certifications, UL2272, Bluetooth speakers, price ranges, and how to choose the right hoverboard.',
    category: 'Hoverboard Guide',
    date: '2025-06-20',
    readTime: '7 min read',
    image: '/images/blog/hoverboard-buying-guide-kids-adults-australia.dbe3cfc6.webp',
  },
  {
    slug: 'electric-unicycle-commuting-guide-australia',
    title: 'Commuting on an Electric Unicycle: The Ultimate Portable PEV',
    excerpt: 'EUC commuting — range, speed, portability, the learning curve, and why experienced riders swear by unicycles for daily transport.',
    category: 'EUC Guide',
    date: '2025-04-08',
    readTime: '8 min read',
    image: '/images/blog/electric-unicycle-commuting-guide-australia.ad7bcc08.webp',
  },
  {
    slug: 'hoverboard-safety-guide-kids-parents',
    title: 'Hoverboard Safety for Kids: What Parents Need to Know',
    excerpt: 'UL certification, protective gear, age guidelines, supervision rules, and the safety features that matter on a kids hoverboard.',
    category: 'Hoverboard Guide',
    date: '2025-02-15',
    readTime: '7 min read',
    image: '/images/blog/hoverboard-safety-guide-kids-parents.d723123f.webp',
  },
  {
    slug: 'euc-long-range-touring-guide',
    title: 'EUC Long-Range Touring: Battery, Routes & Charging on the Go',
    excerpt: 'Planning a long-distance EUC ride — battery capacity, range planning, portable charging, and touring tips for Australian riders.',
    category: 'EUC Guide',
    date: '2024-12-02',
    readTime: '8 min read',
    image: '/images/blog/euc-long-range-touring-guide.aa5f79be.webp',
  },
  {
    slug: 'hoverboard-go-kart-attachments-guide',
    title: 'Hoverboard Go-Kart Attachments: Turn Your Board into a Kart',
    excerpt: 'How hoverboard kart attachments work, which hoverboards are compatible, safety tips, and the best attachments available.',
    category: 'Hoverboard Guide',
    date: '2024-08-15',
    readTime: '6 min read',
    image: '/images/blog/hoverboard-go-kart-attachments-guide.df087922.webp',
  },
  {
    slug: 'electric-unicycle-vs-scooter-comparison',
    title: 'Electric Unicycle vs E-Scooter: Which Suits Your Commute?',
    excerpt: 'Portability, range, learning curve, safety, and cost — comparing EUCs and e-scooters for Australian commuters.',
    category: 'EUC Guide',
    date: '2024-06-12',
    readTime: '8 min read',
    image: '/images/blog/electric-unicycle-vs-scooter-comparison.e1481659.webp',
  },
  {
    slug: 'hoverboard-laws-australia-where-to-ride',
    title: 'Hoverboard Laws in Australia: Where Can You Ride?',
    excerpt: 'State-by-state hoverboard rules — footpaths, parks, private property, and the legal grey areas for self-balancing boards.',
    category: 'Hoverboard Guide',
    date: '2024-04-08',
    readTime: '7 min read',
    image: '/images/blog/hoverboard-laws-australia-where-to-ride.66055623.webp',
  },

  // === KIDS & OFF-ROAD EV (9 posts — 1 kept + 8 new) ===
  {
    slug: 'electric-bikes-vs-scooters-for-kids-teens',
    title: 'Electric Bikes vs Scooters for Kids & Teens: Which Is Better?',
    excerpt: 'Comparing e-bikes and e-scooters for children and teenagers — legal status by state, age-appropriate choices, safety, cost, and the practical decision.',
    category: 'Kids EV Guide',
    date: '2023-11-01',
    readTime: '11 min read',
    image: '/images/blog/electric-bikes-vs-scooters-for-kids-teens.75a3be40.webp',
  },
  {
    slug: 'electric-balance-bike-toddler-guide-australia',
    title: 'Electric Balance Bikes for Toddlers: Australian Buying Guide',
    excerpt: 'Age ranges, speed limiters, battery life, brands (Stacyc, GASGAS, Thumpstar), and safety for toddlers on electric balance bikes.',
    category: 'Kids EV Guide',
    date: '2026-01-18',
    readTime: '8 min read',
    image: '/images/blog/electric-balance-bike-toddler-guide-australia.3f8a8804.webp',
  },
  {
    slug: 'youth-electric-dirt-bike-buying-guide',
    title: 'Youth Electric Dirt Bikes: Power, Safety & Buying Guide',
    excerpt: 'Choosing an electric dirt bike for kids — power levels, age suitability, safety gear, Australian rules, and the top models.',
    category: 'Kids EV Guide',
    date: '2025-11-05',
    readTime: '9 min read',
    image: '/images/blog/youth-electric-dirt-bike-buying-guide.08ace124.webp',
  },
  {
    slug: 'electric-go-kart-kids-guide-australia',
    title: 'Electric Go-Karts for Kids: Types, Speeds & Where to Ride',
    excerpt: 'Electric go-karts and drift trikes — types, age ranges, speed settings, driveway vs track use, and Australian options.',
    category: 'Kids EV Guide',
    date: '2025-09-15',
    readTime: '7 min read',
    image: '/images/blog/electric-go-kart-kids-guide-australia.b24a297a.webp',
  },
  {
    slug: 'kids-electric-quad-bike-safety-guide',
    title: 'Kids Electric Quad Bike Safety: Speed Governors, Helmets & Supervision',
    excerpt: 'Keeping children safe on electric quad bikes — speed limiters, protective gear, riding areas, and parental supervision guidelines.',
    category: 'Kids EV Guide',
    date: '2025-07-20',
    readTime: '7 min read',
    image: '/images/blog/kids-electric-quad-bike-safety-guide.ba813749.webp',
  },
  {
    slug: 'stacyc-vs-gasgas-kids-balance-bike-comparison',
    title: 'Stacyc vs GASGAS Kids Electric Balance Bikes Compared',
    excerpt: 'Features, build quality, price, age range, and ride experience — a side-by-side comparison of the two leading electric balance bike brands.',
    category: 'Kids EV Guide',
    date: '2025-05-28',
    readTime: '8 min read',
    image: '/images/blog/stacyc-vs-gasgas-kids-balance-bike-comparison.e906db22.webp',
  },
  {
    slug: 'electric-dirt-bike-vs-petrol-kids-comparison',
    title: 'Electric vs Petrol Dirt Bikes for Kids: The Full Comparison',
    excerpt: 'Noise, maintenance, safety, cost, and environmental impact — why families are switching from petrol to electric dirt bikes for children.',
    category: 'Kids EV Guide',
    date: '2025-03-25',
    readTime: '8 min read',
    image: '/images/blog/electric-dirt-bike-vs-petrol-kids-comparison.4deb937c.webp',
  },
  {
    slug: 'kids-electric-vehicle-age-guide-which-ev',
    title: 'Which Electric Vehicle for Which Age? A Parent\'s Guide',
    excerpt: 'Balance bikes, dirt bikes, go-karts, quads, and scooters — the right electric vehicle for every age group from 2 to 16.',
    category: 'Kids EV Guide',
    date: '2025-01-18',
    readTime: '9 min read',
    image: '/images/blog/kids-electric-vehicle-age-guide-which-ev.40dc7574.webp',
  },
  {
    slug: 'electric-drift-trike-go-kart-guide',
    title: 'Electric Drift Trikes & Go-Karts: What They Are & Where to Ride',
    excerpt: 'How electric drift trikes work, age suitability, speed settings, track vs driveway use, and choosing between a kart and a trike.',
    category: 'Kids EV Guide',
    date: '2024-11-22',
    readTime: '7 min read',
    image: '/images/blog/electric-drift-trike-go-kart-guide.8df3679e.webp',
  },

  // === MOBILITY SCOOTERS (7 posts — 1 kept + 6 new) ===
  {
    slug: 'electric-trikes-stability-mobility-guide',
    title: 'Electric Trikes: Three-Wheel Stability for Mobility & Cargo Riders',
    excerpt: 'Delta vs tadpole configurations, motor requirements, width considerations, and why e-trikes are the most accessible form of electric cycling.',
    category: 'Mobility & Access',
    date: '2025-11-01',
    readTime: '7 min read',
    image: '/images/blog/electric-trikes-stability-mobility-guide.087d59ff.webp',
  },
  {
    slug: 'mobility-scooter-buying-guide-australia',
    title: 'Mobility Scooter Buying Guide for Australians',
    excerpt: 'Types, features, NDIS funding, weight capacity, range, and what to look for when choosing a mobility scooter in Australia.',
    category: 'Mobility Guide',
    date: '2025-09-28',
    readTime: '9 min read',
    image: '/images/blog/mobility-scooter-buying-guide-australia.7eaf4902.webp',
  },
  {
    slug: 'travel-folding-mobility-scooter-guide',
    title: 'Travel & Folding Mobility Scooters: Airline Rules, Car Boot Fit & Range',
    excerpt: 'Lightweight folding mobility scooters for travel — airline battery rules, car boot dimensions, weight, and how far they go on a charge.',
    category: 'Mobility Guide',
    date: '2025-07-15',
    readTime: '8 min read',
    image: '/images/blog/travel-folding-mobility-scooter-guide.dfc50983.webp',
  },
  {
    slug: 'heavy-duty-mobility-scooter-all-terrain-guide',
    title: 'Heavy-Duty All-Terrain Mobility Scooters: Stability, Range & Outdoor Use',
    excerpt: 'Four-wheel all-terrain mobility scooters — weight capacity, suspension, range, outdoor paths, and choosing a heavy-duty model.',
    category: 'Mobility Guide',
    date: '2025-05-10',
    readTime: '8 min read',
    image: '/images/blog/heavy-duty-mobility-scooter-all-terrain-guide.8c517005.webp',
  },
  {
    slug: 'mobility-scooter-battery-range-charging-tips',
    title: 'Mobility Scooter Battery Care: Charging, Range & Replacement',
    excerpt: 'AGM vs lithium batteries, charging habits, range expectations, and when to replace your mobility scooter battery.',
    category: 'Mobility Guide',
    date: '2025-03-05',
    readTime: '7 min read',
    image: '/images/blog/mobility-scooter-battery-range-charging-tips.5100f460.webp',
  },
  {
    slug: 'mobility-scooter-laws-footpath-rules-australia',
    title: 'Mobility Scooter Laws in Australia: Footpath Access, Speed Limits & Registration',
    excerpt: 'State-by-state rules for mobility scooters — footpath access, maximum speed, registration requirements, and public transport.',
    category: 'Mobility Guide',
    date: '2025-01-02',
    readTime: '8 min read',
    image: '/images/blog/mobility-scooter-laws-footpath-rules-australia.c5ecd517.webp',
  },
  {
    slug: 'mobility-scooter-accessories-comfort-safety',
    title: 'Mobility Scooter Accessories: Comfort, Weather Protection & Safety',
    excerpt: 'Weather covers, baskets, mirrors, lights, cup holders, and comfort upgrades for mobility scooter riders.',
    category: 'Mobility Guide',
    date: '2024-11-05',
    readTime: '6 min read',
    image: '/images/blog/mobility-scooter-accessories-comfort-safety.d3e882f7.webp',
  },

  // === BATTERIES, PARTS & KITS (7 new) ===
  {
    slug: 'ebike-battery-types-lithium-ion-explained',
    title: 'E-Bike Battery Types: Lithium-Ion Cells, BMS & What the Numbers Mean',
    excerpt: 'Samsung vs LG cells, BMS protection, voltage, capacity, and how to compare e-bike batteries when buying or replacing.',
    category: 'Parts & Tech',
    date: '2026-06-02',
    readTime: '9 min read',
    image: '/images/blog/ebike-battery-types-lithium-ion-explained.b33a2f4f.webp',
  },
  {
    slug: 'bafang-mid-drive-conversion-kit-guide',
    title: 'Bafang Mid-Drive Conversion Kits (BBS02B & BBSHD): Complete Guide',
    excerpt: 'Power ratings, installation, frame compatibility, battery pairing, and Australian legal status for Bafang mid-drive conversion kits.',
    category: 'Parts & Tech',
    date: '2026-04-15',
    readTime: '10 min read',
    image: '/images/blog/bafang-mid-drive-conversion-kit-guide.cb4be2a1.webp',
  },
  {
    slug: 'hub-motor-conversion-kit-diy-ebike',
    title: 'Hub Motor Conversion Kits: Turn Any Bike Electric with a Wheel Swap',
    excerpt: 'Front vs rear hub motors, wattage options, battery compatibility, and a step-by-step DIY installation guide for Australian cyclists.',
    category: 'Parts & Tech',
    date: '2026-02-28',
    readTime: '9 min read',
    image: '/images/blog/hub-motor-conversion-kit-diy-ebike.4d94af8e.webp',
  },
  {
    slug: 'ebike-charger-guide-fast-standard-solar',
    title: 'E-Bike Charger Guide: Standard, Fast & Solar Charging',
    excerpt: 'Charger types, charging times, solar charging feasibility, travel chargers, and charger safety for e-bike owners.',
    category: 'Parts & Tech',
    date: '2025-12-22',
    readTime: '7 min read',
    image: '/images/blog/ebike-charger-guide-fast-standard-solar.eb6c7364.webp',
  },
  {
    slug: 'ebike-tyre-replacement-guide-sizes-types',
    title: 'E-Bike Tyre Replacement: Sizes, Puncture Protection & When to Change',
    excerpt: 'Understanding tyre sizes, choosing puncture-resistant tyres, tubeless vs tubed, and when to replace your e-bike tyres.',
    category: 'Parts & Tech',
    date: '2025-10-15',
    readTime: '8 min read',
    image: '/images/blog/ebike-tyre-replacement-guide-sizes-types.b0b01e13.webp',
  },
  {
    slug: 'ebike-brake-pad-rotor-replacement-guide',
    title: 'E-Bike Brake Pad & Rotor Replacement: When and How',
    excerpt: 'When to replace brake pads and rotors, organic vs metallic compounds, DIY replacement steps, and brake bedding for e-bikes.',
    category: 'Parts & Tech',
    date: '2025-08-08',
    readTime: '8 min read',
    image: '/images/blog/ebike-brake-pad-rotor-replacement-guide.e3cb226a.webp',
  },
  {
    slug: 'ebike-battery-capacity-voltage-amp-hours-explained',
    title: 'Voltage, Amp-Hours & Watt-Hours Explained: How to Compare E-Bike Batteries',
    excerpt: 'What voltage, amp-hours, and watt-hours mean for range and performance — and how to compare batteries across different e-bikes.',
    category: 'Parts & Tech',
    date: '2025-06-02',
    readTime: '7 min read',
    image: '/images/blog/ebike-battery-capacity-voltage-amp-hours-explained.569edf97.webp',
  },

  // === SAFETY, LOCKS & CARRY (8 posts — 2 kept + 7 new, minus 1 duplicate) ===
  {
    slug: 'how-to-secure-your-ebike-locks-gps-and-insurance',
    title: 'How to Prevent E-Bike Theft: Heavy-Duty U-Locks, GPS Tracking & Insurance',
    excerpt: 'Proven security strategies using Sold Secure Gold locks, hidden GPS trackers, and Australian bicycle insurance policies.',
    category: 'Security Guides',
    date: '2026-04-25',
    readTime: '7 min read',
    image: '/images/blog/how-to-secure-your-ebike-locks-gps-and-insurance.88b29a99.webp',
  },
  {
    slug: 'best-ebike-accessories-lights-helmets-locks',
    title: 'The Best E-Bike Accessories: Lights, Helmets, Locks & More (Priority Guide)',
    excerpt: 'Every accessory ranked by priority — from legally required safety gear to comfort upgrades and maintenance tools for Australian e-bike riders.',
    category: 'Accessories Guide',
    date: '2026-01-20',
    readTime: '7 min read',
    image: '/images/blog/best-ebike-accessories-lights-helmets-locks.37c6c9bb.webp',
  },
  {
    slug: 'ebike-helmet-guide-australia-laws-types',
    title: 'E-Bike Helmet Guide: Australian Laws, Types & What to Buy',
    excerpt: 'Helmet laws in every state, MIPS explained, road vs urban vs MTB helmets, and when to replace — a complete guide for e-bike riders.',
    category: 'Safety',
    date: '2024-07-05',
    readTime: '7 min read',
    image: '/images/blog/ebike-helmet-guide-australia-laws-types.1da98854.webp',
  },
  {
    slug: 'best-bike-lock-guide-u-lock-folding-chain',
    title: 'Best Bike Locks for E-Bikes: U-Locks, Folding Locks & Chain Locks',
    excerpt: 'Security ratings, weight, price, and usability compared — choosing the right lock for your e-bike, e-scooter, or electric skateboard.',
    category: 'Safety',
    date: '2026-03-05',
    readTime: '8 min read',
    image: '/images/blog/best-bike-lock-guide-u-lock-folding-chain.da446ab5.webp',
  },
  {
    slug: 'ebike-pannier-bag-waterproof-commuting-guide',
    title: 'Panniers & Waterproof Bags for E-Bike Commuters',
    excerpt: 'Capacity, mounting systems, waterproofing ratings, and the best pannier bags for daily e-bike commuting in Australian weather.',
    category: 'Accessories Guide',
    date: '2025-12-28',
    readTime: '7 min read',
    image: '/images/blog/ebike-pannier-bag-waterproof-commuting-guide.e2182768.webp',
  },
  {
    slug: 'bike-rack-basket-cargo-carrying-guide',
    title: 'Bike Racks, Baskets & Cargo Solutions for E-Bikes',
    excerpt: 'Rear racks, front baskets, weight limits, and installation — how to add cargo capacity to your electric bike.',
    category: 'Accessories Guide',
    date: '2025-10-22',
    readTime: '7 min read',
    image: '/images/blog/bike-rack-basket-cargo-carrying-guide.bc50ac16.webp',
  },
  {
    slug: 'child-seat-ebike-safety-installation-guide',
    title: 'Child Seats for E-Bikes: Front vs Rear, Safety & Installation',
    excerpt: 'Weight limits, harness types, rack-mounted vs frame-mounted, and Australian safety standards for carrying children on e-bikes.',
    category: 'Safety',
    date: '2025-08-15',
    readTime: '8 min read',
    image: '/images/blog/child-seat-ebike-safety-installation-guide.445b2526.webp',
  },
  {
    slug: 'bike-light-lumens-guide-front-rear-sets',
    title: 'Bike Lights Guide: Lumens, Beam Patterns & Australian Legal Requirements',
    excerpt: 'How many lumens you need, USB rechargeable vs removable battery, front and rear sets, and what Australian law requires.',
    category: 'Safety',
    date: '2025-06-12',
    readTime: '7 min read',
    image: '/images/blog/bike-light-lumens-guide-front-rear-sets.c5852968.webp',
  },
  {
    slug: 'high-vis-jacket-reflective-gear-cycling',
    title: 'High-Vis & Reflective Gear for Cyclists: When to Wear It',
    excerpt: 'Reflective jackets, vests, shoe covers, and accessories — when high-vis gear makes a difference and what Australian riders should own.',
    category: 'Safety',
    date: '2025-04-02',
    readTime: '6 min read',
    image: '/images/blog/high-vis-jacket-reflective-gear-cycling.cede8d2b.webp',
  },
  {
    slug: 'phone-mount-ebike-quad-lock-guide',
    title: 'Phone Mounts for E-Bikes: Quad Lock, Vibration Damage & Navigation',
    excerpt: 'Quad Lock and handlebar mounts compared — vibration damage to phone cameras, weatherproofing, and using your phone for navigation while riding.',
    category: 'Accessories Guide',
    date: '2025-02-08',
    readTime: '6 min read',
    image: '/images/blog/phone-mount-ebike-quad-lock-guide.87bb6fe3.webp',
  },

  // === ELECTRIC QUAD BIKES & ATVs (6 posts — 1 kept + 5 new) ===
  {
    slug: 'electric-quad-bikes-atv-farm-recreation-guide',
    title: 'Electric Quad Bikes: Farm, Property & Recreation Guide',
    excerpt: 'Electric ATVs for Australian farms and properties — livestock work, kids\' quads, battery range, safety, and how they compare to petrol quads.',
    category: 'Quad & ATV Guide',
    date: '2025-02-20',
    readTime: '9 min read',
    image: '/images/blog/electric-quad-bikes-atv-farm-recreation-guide.aee3c300.webp',
  },
  {
    slug: 'kids-electric-quad-bike-buying-guide-australia',
    title: 'Kids Electric Quad Bikes: Age Ranges, Brands & Buying Guide',
    excerpt: 'Choosing an electric quad for kids — age-appropriate models, speed limiters, safety gear, brands, and where to ride in Australia.',
    category: 'Quad & ATV Guide',
    date: '2026-05-22',
    readTime: '8 min read',
    image: '/images/blog/kids-electric-quad-bike-buying-guide-australia.6a58de80.webp',
  },
  {
    slug: 'adult-electric-atv-recreation-farm-guide',
    title: 'Adult Electric ATVs: Recreation & Farm Use Guide',
    excerpt: 'High-performance electric quads for adults — range, towing capacity, terrain capability, and how they compare to petrol ATVs.',
    category: 'Quad & ATV Guide',
    date: '2026-03-18',
    readTime: '9 min read',
    image: '/images/blog/adult-electric-atv-recreation-farm-guide.7f706ecf.webp',
  },
  {
    slug: 'electric-quad-bike-vs-petrol-atv-comparison',
    title: 'Electric vs Petrol Quad Bikes: Noise, Maintenance, Torque & Running Costs',
    excerpt: 'A full comparison of electric and petrol ATVs — noise levels, maintenance schedules, instant torque, range limitations, and cost of ownership.',
    category: 'Quad & ATV Guide',
    date: '2025-11-15',
    readTime: '8 min read',
    image: '/images/blog/electric-quad-bike-vs-petrol-atv-comparison.91c0931a.webp',
  },
  {
    slug: 'farm-utility-electric-quad-guide-australia',
    title: 'Electric Quads for Australian Farms: Livestock, Property & Utility Work',
    excerpt: 'Using electric ATVs for farm work — towing, mustering, property maintenance, battery range on rural terrain, and running costs.',
    category: 'Quad & ATV Guide',
    date: '2025-09-02',
    readTime: '9 min read',
    image: '/images/blog/farm-utility-electric-quad-guide-australia.a620121d.webp',
  },
  {
    slug: 'electric-quad-bike-safety-helmet-gear-guide',
    title: 'Quad Bike Safety: Helmets, Roll Bars & Protective Gear',
    excerpt: 'Essential safety equipment for electric quad bike riders — helmets, chest protectors, roll-over protection, and supervised riding for children.',
    category: 'Quad & ATV Guide',
    date: '2025-07-05',
    readTime: '7 min read',
    image: '/images/blog/electric-quad-bike-safety-helmet-gear-guide.959ddbfc.webp',
  },

  // === ELECTRIC WATER SPORTS (7 new) ===
  {
    slug: 'electric-jet-ski-buying-guide-australia',
    title: 'Electric Jet Ski Buying Guide: Sea-Doo Rise, Taiga Orca & More',
    excerpt: 'Electric personal watercraft — pricing, range, registration, Australian boating laws, and the models available or coming soon.',
    category: 'Water Sports Guide',
    date: '2026-08-05',
    readTime: '9 min read',
    image: '/images/blog/electric-jet-ski-buying-guide-australia.a0080460.webp',
  },
  {
    slug: 'electric-surfboard-efoil-beginner-guide',
    title: 'Electric Surfboards & eFoils for Beginners: How They Work',
    excerpt: 'eFoil hydrofoils and electric surfboards — how they work, learning curve, brands (Fliteboard, Lift, Awake), and getting started in Australia.',
    category: 'Water Sports Guide',
    date: '2026-06-15',
    readTime: '9 min read',
    image: '/images/blog/electric-surfboard-efoil-beginner-guide.ec83828b.webp',
  },
  {
    slug: 'electric-jetboard-bodyboard-guide',
    title: 'Electric Jetboards & Bodyboards: Flat-Water Thrills Guide',
    excerpt: 'Motorised bodyboards and jet-powered surfboards — how they work, battery range, speed, and Australian brands and options.',
    category: 'Water Sports Guide',
    date: '2026-04-22',
    readTime: '7 min read',
    image: '/images/blog/electric-jetboard-bodyboard-guide.a6d4d0cc.webp',
  },
  {
    slug: 'sea-doo-rise-electric-jet-ski-review',
    title: 'Sea-Doo Rise Electric Jet Ski: Everything We Know So Far',
    excerpt: 'BRP\'s first electric PWC — pricing, expected specs, Australian availability, and what zero-emission jet skiing means for waterways.',
    category: 'Water Sports Guide',
    date: '2026-07-08',
    readTime: '8 min read',
    image: '/images/blog/sea-doo-rise-electric-jet-ski-review.5b1aa06e.webp',
  },
  {
    slug: 'electric-watercraft-laws-australia-boating',
    title: 'Electric Watercraft Laws in Australia: Licences, Registration & Where to Ride',
    excerpt: 'Boating licences, vessel registration, marine park rules, and noise restrictions for electric jet skis, eFoils, and jetboards.',
    category: 'Water Sports Guide',
    date: '2026-02-10',
    readTime: '8 min read',
    image: '/images/blog/electric-watercraft-laws-australia-boating.efc25e4f.webp',
  },
  {
    slug: 'efoil-hydrofoil-learning-guide-beginners',
    title: 'Learning to eFoil: Your First Ride, Balance & Progression Tips',
    excerpt: 'The first-ride experience, balance technique, safety gear, and how to progress from kneeling to standing on an electric hydrofoil.',
    category: 'Water Sports Guide',
    date: '2025-12-08',
    readTime: '8 min read',
    image: '/images/blog/efoil-hydrofoil-learning-guide-beginners.4a81435a.webp',
  },
  {
    slug: 'electric-water-sports-battery-range-guide',
    title: 'Electric Water Sports Battery Guide: Range, Charging & Salt Water Care',
    excerpt: 'Battery range expectations, charging times, salt water corrosion prevention, and battery safety for electric watercraft.',
    category: 'Water Sports Guide',
    date: '2025-10-02',
    readTime: '7 min read',
    image: '/images/blog/electric-water-sports-battery-range-guide.189cd2b8.webp',
  },
];

export const FAQ = [
  {
    question: 'Are VYRON Electric Bikes legal to ride on public roads and bike paths in Australia?',
    answer: 'In Australia an electric bike is treated as a bicycle on public roads and paths only when its motor is limited to 250W continuous rated power and assistance cuts out at 25 km/h (the EN 15194 pedal-assist standard). More powerful, throttle-only or faster models may be restricted to private land, and rules differ slightly between states and territories, so check with your state road authority. Each product page states what the manufacturer publishes for that model, and we confirm the road-legal status of a bike with you before you order.',
  },
  {
    question: 'What distance range can I expect on a single battery charge?',
    answer: 'Range depends on battery capacity, rider weight, load, terrain and assist level. Manufacturers publish a claimed range for each model; on verified models we show that figure on the product page with a link to the manufacturer source. Real-world range is usually lower than the claim, especially with heavy loads or hilly routes.',
  },
  {
    question: 'How does shipping and freight work across Victoria and interstate Australia?',
    answer: 'We dispatch all e-bikes directly from our Brunswick, Victoria warehouse via tracked express freight. Orders over $1,500 AUD qualify for Free Express Shipping across Victoria and metro Australian cities. Orders are packaged in heavy-duty 7-ply cartons with 90% pre-assembly completed.',
  },
  {
    question: 'What warranty and spare parts support is provided by VYRON Industries?',
    answer: 'Every Independent Electric Bike includes a comprehensive 2-Year Frame Warranty and 12-Month Electrical & Motor Warranty backed directly by VYRON Industries Pty Ltd in Victoria. We stock full replacement batteries, Bafang motors, controllers, tires, and brake pads in Brunswick for fast local servicing.',
  },
  {
    question: 'How do I claim the 10% Crypto discount or process a Bank Transfer / PayID payment?',
    answer: 'During checkout, simply select "Cryptocurrency (10% Off)" or "Direct Bank Transfer / PayID". After submitting your order, you will receive our exact payment details and account reference. You can also upload your payment receipt or screenshot via our confirmation portal for fast same-day dispatch.',
  },
];

export const PAGES = {
  about: true,
  faq: true,
  blog: true,
  wholesale: true,
  tracking: false,
  compare: true,
  search: true,
};

export const COMPLIANCE = {
  bannedTerms: [],
  requiredFramings: [],
  prohibitedClaims: [],
  ageGate: false,
  ageMinimum: null,
  gdpr: false,
  disclaimer: 'Check each product page and ask us to confirm the Australian road-legal status of a model before you order.',
};
