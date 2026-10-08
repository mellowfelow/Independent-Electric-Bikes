import { EBIKE_PRODUCTS } from './products';
import { VERIFIED, type VerifiedInfo } from './data/verified';

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
      opening: 'Please transfer exactly {amount} AUD for Order #{ref} to our Australian business bank account below.',
      closing: 'Include Order #{ref} as your payment reference. Bank transfers clear within 1-2 business hours.',
    },
    {
      id: 'payid',
      label: 'PayID / Osko (Instant Fast Payments)',
      opening: 'Transfer {amount} AUD instantly via PayID for Order #{ref}.',
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
  items?: { slug: string; name: string; path: string }[];
}

export interface MainCategory {
  slug: string;
  name: string;
  path: string; // e.g. /shop/electric-bikes
  description: string;
  image: string;
  subcategories: SubCategory[];
}

export const MASTER_TAXONOMY: MainCategory[] = [
  {
    slug: 'electric-bikes',
    name: 'E-Bikes',
    path: '/shop/electric-bikes',
    description: 'Urban commuters, heavy-duty cargo, full-suspension eMTBs, foldable e-bikes & fat tyre cruisers.',
    image: 'https://picsum.photos/seed/ieb-commuter-hero/1200/800',
    subcategories: [
      {
        slug: 'urban-commuter-ebikes',
        name: 'Urban & Commuter E-Bikes',
        path: '/shop/electric-bikes/urban-commuter-ebikes',
        description: 'Sleek, efficient commuters for Australian city traffic.',
        items: [
          { slug: 'step-through-commuters', name: 'Step-Through Commuters', path: '/shop/electric-bikes/step-through-commuters' },
          { slug: 'step-over-commuters', name: 'Step-Over / Diamond Frame', path: '/shop/electric-bikes/step-over-commuters' },
          { slug: 'belt-drive-commuters', name: 'Belt-Drive Commuters', path: '/shop/electric-bikes/belt-drive-commuters' },
          { slug: 'lightweight-urban-ebikes', name: 'Lightweight Urban E-Bikes', path: '/shop/electric-bikes/lightweight-urban-ebikes' },
        ],
      },
      {
        slug: 'cargo-family-ebikes',
        name: 'Cargo & Family E-Bikes',
        path: '/shop/electric-bikes/cargo-family-ebikes',
        description: 'Heavy-duty utility e-bikes built to haul kids, groceries and gear.',
        items: [
          { slug: 'long-tail-cargo', name: 'Long-Tail Cargo', path: '/shop/electric-bikes/long-tail-cargo' },
          { slug: 'compact-cargo', name: 'Compact Cargo', path: '/shop/electric-bikes/compact-cargo' },
          { slug: 'front-loader-cargo', name: 'Front-Loader (Box) Bikes', path: '/shop/electric-bikes/front-loader-cargo' },
        ],
      },
      {
        slug: 'electric-mountain-bikes',
        name: 'Electric Mountain Bikes - eMTB',
        path: '/shop/electric-bikes/electric-mountain-bikes',
        description: 'Trail-conquering full-suspension and hardtail electric mountain bikes.',
        items: [
          { slug: 'full-suspension-emtb', name: 'Full-Suspension eMTB', path: '/shop/electric-bikes/full-suspension-emtb' },
          { slug: 'hardtail-emtb', name: 'Hardtail Trail eMTB', path: '/shop/electric-bikes/hardtail-emtb' },
        ],
      },
      {
        slug: 'foldable-electric-bikes',
        name: 'Foldable E-Bikes',
        path: '/shop/electric-bikes/foldable-electric-bikes',
        description: 'Compact folding e-bikes for train commuters, apartments, and caravans.',
        items: [
          { slug: 'compact-folding-bikes', name: 'Compact Folding Commuters', path: '/shop/electric-bikes/compact-folding-bikes' },
          { slug: 'fat-tyre-folding-bikes', name: 'Fat Tyre Folders', path: '/shop/electric-bikes/fat-tyre-folding-bikes' },
        ],
      },
      {
        slug: 'fat-tyre-lifestyle-ebikes',
        name: 'Fat Tyre & Lifestyle E-Bikes',
        path: '/shop/electric-bikes/fat-tyre-lifestyle-ebikes',
        description: 'All-terrain 4.0" fat tyre cruisers and retro moped-style e-bikes.',
        items: [
          { slug: 'classic-cruiser-ebikes', name: 'Classic Cruisers', path: '/shop/electric-bikes/classic-cruiser-ebikes' },
          { slug: 'moped-style-ebikes', name: 'Retro / Moped-Style E-Bikes', path: '/shop/electric-bikes/moped-style-ebikes' },
        ],
      },
    ],
  },
  {
    slug: 'electric-scooters',
    name: 'E-Scooters',
    path: '/shop/electric-scooters',
    description: 'Lightweight commuter e-scooters and high-performance dual-motor long-range e-scooters.',
    image: 'https://picsum.photos/seed/ieb-scooter-hero/1200/800',
    subcategories: [
      {
        slug: 'commuter-electric-scooters',
        name: 'Commuter E-Scooters',
        path: '/shop/electric-scooters/commuter-electric-scooters',
        description: 'Lightweight, single-motor units built for folding onto public transport.',
      },
      {
        slug: 'long-range-electric-scooters',
        name: 'Long-Range & Performance E-Scooters',
        path: '/shop/electric-scooters/long-range-electric-scooters',
        description: 'Dual-motor setups with heavy-duty suspension and extended battery packs.',
      },
    ],
  },
  {
    slug: 'electric-skateboards',
    name: 'Electric Skateboards',
    path: '/shop/electric-skateboards',
    description: 'Street longboards, all-terrain pneumatic boards, and portable shortboards.',
    image: 'https://picsum.photos/seed/ieb-eskate-hero/1200/800',
    subcategories: [
      {
        slug: 'street-electric-skateboards',
        name: 'Street Electric Longboards',
        path: '/shop/electric-skateboards/street-electric-skateboards',
        description: 'Flexible decks and smooth urethane wheels for paved bike paths.',
      },
      {
        slug: 'all-terrain-electric-skateboards',
        name: 'All-Terrain / Pneumatic Boards',
        path: '/shop/electric-skateboards/all-terrain-electric-skateboards',
        description: 'Air-filled tyres and high-power dual motors for gravel and grass.',
      },
      {
        slug: 'mini-electric-skateboards',
        name: 'Mini & Portable Shortboards',
        path: '/shop/electric-skateboards/mini-electric-skateboards',
        description: 'Compact, lightweight decks for last-mile convenience.',
      },
    ],
  },
  {
    slug: 'self-balancing-ev',
    name: 'Self-Balancing EV',
    path: '/shop/self-balancing-ev',
    description: 'Gyroscopic electric unicycles (EUCs) and recreational hoverboards.',
    image: 'https://picsum.photos/seed/ieb-euc-hero/1200/800',
    subcategories: [
      {
        slug: 'electric-unicycles',
        name: 'Electric Unicycles (EUWs)',
        path: '/shop/self-balancing-ev/electric-unicycles',
        description: 'High-speed, single-wheel gyroscopic commuter devices.',
      },
      {
        slug: 'hoverboards',
        name: 'Hoverboards & Self-Balancing Boards',
        path: '/shop/self-balancing-ev/hoverboards',
        description: 'Recreational two-wheel self-balancing boards.',
      },
    ],
  },
  {
    slug: 'kids-off-road-ev',
    name: 'Kids & Off-Road EV',
    path: '/shop/kids-off-road-ev',
    description: 'Electric balance bikes for toddlers, youth pit dirt bikes, and electric go-karts.',
    image: 'https://picsum.photos/seed/ieb-kids-hero/1200/800',
    subcategories: [
      {
        slug: 'electric-balance-bikes',
        name: 'Electric Balance Bikes',
        path: '/shop/kids-off-road-ev/electric-balance-bikes',
        description: 'Lightweight, throttle-controlled training bikes without pedals for toddlers.',
      },
      {
        slug: 'youth-electric-dirt-bikes',
        name: 'Youth Electric Dirt & Pit Bikes',
        path: '/shop/kids-off-road-ev/youth-electric-dirt-bikes',
        description: 'Mid-size electric motorcycle alternatives with rugged suspension for farm and track use.',
      },
      {
        slug: 'electric-go-karts',
        name: 'Electric Go-Karts & Drift Trikes',
        path: '/shop/kids-off-road-ev/electric-go-karts',
        description: 'Adjustable frame karts for driveways and closed tracks.',
      },
    ],
  },
  {
    slug: 'mobility-scooters',
    name: 'Mobility & Assisted Living',
    path: '/shop/mobility-scooters',
    description: 'Travel folding mobility scooters and heavy-duty 4-wheel all-terrain mobility scooters.',
    image: 'https://picsum.photos/seed/ieb-mobility-hero/1200/800',
    subcategories: [
      {
        slug: 'travel-mobility-scooters',
        name: 'Travel & Folding Mobility Scooters',
        path: '/shop/mobility-scooters/travel-mobility-scooters',
        description: 'Lightweight, auto-folding units built for car boots and travel.',
      },
      {
        slug: 'heavy-duty-mobility-scooters',
        name: 'Heavy-Duty All-Terrain Mobility Scooters',
        path: '/shop/mobility-scooters/heavy-duty-mobility-scooters',
        description: '4-wheel robust models built for outdoor paths and long community ranges.',
      },
    ],
  },
  {
    slug: 'accessories',
    name: 'Accessories & Parts',
    path: '/shop/accessories',
    description: 'Replacement lithium batteries, heavy-duty security locks, helmets, and cargo add-ons.',
    image: 'https://picsum.photos/seed/ieb-access-hero/1200/800',
    subcategories: [
      {
        slug: 'replacement-batteries-chargers',
        name: 'Replacement Batteries & Chargers',
        path: '/shop/accessories/replacement-batteries-chargers',
        description: 'Genuine Samsung/LG lithium packs and fast chargers.',
      },
      {
        slug: 'security-locks',
        name: 'Security Locks',
        path: '/shop/accessories/security-locks',
        description: 'Heavy-duty U-locks, chain locks, and GPS alarms.',
      },
      {
        slug: 'safety-apparel-helmets',
        name: 'Safety Apparel & Helmets',
        path: '/shop/accessories/safety-apparel-helmets',
        description: 'MIPS-certified helmets, gloves, and reflective jackets.',
      },
      {
        slug: 'utility-cargo-add-ons',
        name: 'Utility & Cargo Add-Ons',
        path: '/shop/accessories/utility-cargo-add-ons',
        description: 'Child seats, panniers, front baskets, and phone mounts.',
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
  if (v) {
    return {
      ...p,
      verified: v,
      specs: { ...EMPTY_SPECS, ...v.specs },
      filters: { ...v.filters },
    };
  }
  return {
    ...p,
    specs: { ...EMPTY_SPECS },
    filters: {},
    shortDescription: `${p.name} - ${categoryLabel(p)}`,
    description: `${p.name} is available from ${SITE.entityName}. Ask us for the manufacturer specification sheet and Australian road-legal status before ordering.`,
  };
}

export const PRODUCTS: Product[] = EBIKE_PRODUCTS.map(applyVerification);

export const POSTS = [
  {
    slug: 'best-electric-commuter-bike-australia-guide-2026',
    title: 'How to Choose the Best Electric Commuter Bike in Australia (2026 Buying Guide)',
    excerpt: 'Everything you need to know about motor wattages, battery capacities, hydraulic brakes, and Australian EN15194 legal requirements before buying your first commuter e-bike.',
    category: 'Commuter Guides',
    date: '2026-09-15',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/ieb-post1/1200/800',
  },
  {
    slug: 'melbourne-ebike-laws-and-safety-standards',
    title: 'Understanding Victorian & Australian E-Bike Laws: Speed Limits, Power & Safety',
    excerpt: 'Demystifying 250W/25kmh pedal assist rules vs throttle regulations in Victoria and across Australian states.',
    category: 'E-Bike Regulations',
    date: '2026-08-28',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/ieb-post2/1200/800',
  },
  {
    slug: 'cargo-electric-bikes-replacing-second-family-car',
    title: 'Why Australian Families are Replacing Their Second Car with a Dual-Battery Cargo E-Bike',
    excerpt: 'Calculate your annual fuel, insurance, and parking savings when switching school drop-offs and grocery runs to a heavy-duty cargo e-bike.',
    category: 'Cargo Lifestyle',
    date: '2026-08-10',
    readTime: '7 min read',
    image: 'https://picsum.photos/seed/ieb-post3/1200/800',
  },
  {
    slug: 'ebike-battery-care-and-range-maximization-guide',
    title: 'E-Bike Battery Care: How to Double Your Lithium Pack Lifespan & Maximize Range',
    excerpt: 'Essential charging, storage, and maintenance tips for Samsung and LG e-bike batteries in Australian summer heat.',
    category: 'Battery & Tech',
    date: '2026-07-22',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/ieb-post4/1200/800',
  },
  {
    slug: 'belt-drive-vs-chain-ebikes-pros-cons-australia',
    title: 'Gates Carbon Belt Drive vs Traditional Chain E-Bikes: Which is Right for You?',
    excerpt: 'Comparing zero-maintenance belt drives with internal gear hubs against traditional cassette chains for daily urban commuting.',
    category: 'Tech Comparisons',
    date: '2026-07-05',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/ieb-post5/1200/800',
  },
  {
    slug: 'mid-drive-vs-hub-motors-australian-hills-comparison',
    title: 'Mid-Drive Motors vs Hub Motors: Hill Climbing Torque & Efficiency Compared',
    excerpt: 'How Bosch, Shimano STEPS, and Bafang mid-drive systems perform compared to high-torque rear hub motors on steep city hills.',
    category: 'Motor Systems',
    date: '2026-06-18',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/ieb-post6/1200/800',
  },
  {
    slug: 'hydraulic-vs-mechanical-disc-brakes-ebike-safety',
    title: 'Hydraulic Disc Brakes vs Mechanical Brakes: Stopping Distance on Heavy E-Bikes',
    excerpt: 'Why 4-piston hydraulic disc brakes are essential for heavy cargo e-bikes and wet Melbourne road conditions.',
    category: 'Safety & Tech',
    date: '2026-05-30',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/ieb-post7/1200/800',
  },
  {
    slug: 'electric-scooter-laws-victoria-and-australia-2026',
    title: 'E-Scooter Trial Laws in Victoria: Speed Limits, Helmets & Legal Riding Areas',
    excerpt: 'A complete breakdown of Victorian e-scooter rules, footpath bans, speed limits, and legal private-land performance models.',
    category: 'E-Scooter Guide',
    date: '2026-05-12',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/ieb-post8/1200/800',
  },
  {
    slug: 'how-to-secure-your-ebike-locks-gps-and-insurance',
    title: 'How to Prevent E-Bike Theft: Heavy-Duty U-Locks, GPS Tracking & Insurance',
    excerpt: 'Proven security strategies using Sold Secure Gold locks, hidden GPS trackers, and Australian bicycle insurance policies.',
    category: 'Security Guides',
    date: '2026-04-25',
    readTime: '7 min read',
    image: 'https://picsum.photos/seed/ieb-post9/1200/800',
  },
  {
    slug: 'cryptocurrency-ebike-buying-discount-guide',
    title: 'How to Save 10% on Your E-Bike Purchase Using Crypto (BTC / USDT) & PayID',
    excerpt: 'Step-by-step tutorial on taking advantage of our 10% instant cryptocurrency discount at checkout with instant clearing.',
    category: 'Buying & Discounts',
    date: '2026-04-10',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/ieb-post10/1200/800',
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
