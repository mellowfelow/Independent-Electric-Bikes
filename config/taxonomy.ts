// Shop taxonomy only (no products), safe for client components such as the navigation.
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
