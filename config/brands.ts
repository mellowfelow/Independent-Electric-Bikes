import { PRODUCTS, Product, SITE } from './site';
import { EXTRA_BRANDS } from './brandsExtra';

export interface BrandDef {
  slug: string;
  name: string;
  category: 'Electric Bikes' | 'Electric Scooters' | 'Electric Skateboards' | 'Electric Unicycles' | 'Kids & E-Dirt Bikes' | 'Mobility Scooters' | 'Accessories & Components';
  tagline: string;
  description: string;
  logoText?: string;
  aliases?: string[];
  featured?: boolean;
}

const CORE_BRANDS: BrandDef[] = [
  // E-Bikes
  {
    slug: 'specialized',
    name: 'Specialized',
    category: 'Electric Bikes',
    tagline: 'Innovate or Die — World-Class Turbo E-Bikes',
    description: 'Specialized Turbo e-bikes feature custom RX tuned mid-drive motors, integrated MasterMind telemetry displays, and seamless natural pedal assistance engineered for Australian roads and trails.',
    featured: true,
  },
  {
    slug: 'trek',
    name: 'Trek',
    category: 'Electric Bikes',
    tagline: 'Build the Best Bikes in the World',
    description: 'Trek electric bikes combine Bosch performance drive units with sleek frame integration for long distance touring, urban commuting, and high-mileage gravel riding.',
    featured: true,
  },
  {
    slug: 'merida',
    name: 'Merida',
    category: 'Electric Bikes',
    tagline: 'German Design & Engineering Mastery',
    description: 'Merida eEspresso and eBig Nine series feature Shimano STEPS mid-drive motors and robust hydroformed aluminum frames built for daily Australian commuting.',
    featured: true,
  },
  {
    slug: 'cube',
    name: 'Cube',
    category: 'Electric Bikes',
    tagline: 'Bavarian Precision & Urban Innovation',
    description: 'Cube Touring and Kathmandu Hybrid series deliver top-tier Bosch PowerTube battery integration for high mileage Australian touring and commuting.',
    featured: true,
  },
  {
    slug: 'cannondale',
    name: 'Cannondale',
    category: 'Electric Bikes',
    tagline: 'Pioneering Carbon & Aluminum Electric Bikes',
    description: 'Cannondale Adventure Neo and Moterra ranges offer lightweight agility, SmartForm alloy construction, and responsive Bosch drive systems.',
    featured: true,
  },
  {
    slug: 'riese-muller',
    name: 'Riese & Müller',
    category: 'Electric Bikes',
    tagline: 'German Luxury & Long-Range Cargo E-Bikes',
    description: 'Riese & Müller sets the global standard for premium e-bikes, dual battery long-range cargo carriers, and full suspension urban commuters.',
    aliases: ['riese & müller', 'riese & muller', 'riese'],
    featured: true,
  },
  {
    slug: 'kalkhoff',
    name: 'Kalkhoff',
    category: 'Electric Bikes',
    tagline: 'German Quality & Urban Belt Drive Commuters',
    description: 'Kalkhoff Entice and Endeavour step-through commuters offer smooth belt drives, Bosch Performance motors, and high weight capacity frames.',
    featured: true,
  },
  {
    slug: 'focus',
    name: 'Focus',
    category: 'Electric Bikes',
    tagline: 'German Performance & Full-Suspension eMTBs',
    description: 'Focus Jam² and Thron² full-suspension electric mountain bikes deliver unmatched downhill control and high torque trail climbing power.',
  },
  {
    slug: 'gazelle',
    name: 'Gazelle',
    category: 'Electric Bikes',
    tagline: 'Royal Dutch Comfort & E-Bike Perfection',
    description: 'Royal Dutch Gazelle offers step-through city e-bikes with upright riding posture, internal hub gears, and low-maintenance belt drives.',
  },
  {
    slug: 'giant',
    name: 'Giant',
    category: 'Electric Bikes',
    tagline: 'Ride Unleashed — World Largest Bike Builder',
    description: 'Giant Explore E+ and Talon E+ feature SyncDrive motors powered by Yamaha with Smart Assist technology for effortless riding.',
  },
  {
    slug: 'orbea',
    name: 'Orbea',
    category: 'Electric Bikes',
    tagline: 'Basque Country Lightweight Urban & Road E-Bikes',
    description: 'Orbea Vibe and Gain series feature sleek hidden batteries, Mahle rear hub drives, and ultra-lightweight carbon and hydroformed frames.',
  },
  {
    slug: 'tern',
    name: 'Tern',
    category: 'Electric Bikes',
    tagline: 'Compact Long-Tail & Cargo Folding Champions',
    description: 'Tern GSD and HSD cargo bikes carry kids, groceries, and heavy loads while fitting into compact Australian urban homes and garages.',
    featured: true,
  },
  {
    slug: 'lekker',
    name: 'Lekker',
    category: 'Electric Bikes',
    tagline: 'Dutch Utility Meets Australian Beach Vibes',
    description: 'Lekker Jordaan and Amsterdam series blend classic vintage aesthetics with powerful front and rear hub electric assistance.',
  },
  {
    slug: 'dirodi',
    name: 'DiroDi',
    category: 'Electric Bikes',
    tagline: 'Australian Rough-Terrain Fat Tyre & Utility E-Bikes',
    description: 'DiroDi Rover fat tyre e-bikes feature heavy-duty step-through frames, Samsung batteries, and wide all-terrain tyres.',
  },
  {
    slug: 'aventon',
    name: 'Aventon',
    category: 'Electric Bikes',
    tagline: 'Pace & Level Long-Range Commuter E-Bikes',
    description: 'Aventon Level and Pace feature torque-sensor pedal assist, integrated turn signals, and color LCD telemetry screens.',
  },
  {
    slug: 'ncm',
    name: 'NCM',
    category: 'Electric Bikes',
    tagline: 'German Engineering for Everyday Commuters',
    description: 'NCM Moscow and Milano series feature high capacity Deftron batteries and reliable Das-Kit motor drives.',
  },
  {
    slug: 'eunorau',
    name: 'Eunorau',
    category: 'Electric Bikes',
    tagline: 'All-Terrain Fat Tyre & Cargo E-Bikes',
    description: 'Eunorau G30 and E-Fat-Step bikes offer dual battery capability and heavy-duty cargo carrying capacity.',
  },
  {
    slug: 'mokwheel',
    name: 'Mokwheel',
    category: 'Electric Bikes',
    tagline: 'Power Station Integrated All-Terrain E-Bikes',
    description: 'Mokwheel Obsidian and Basalt e-bikes feature inverter power station tech to charge camp gear directly from your bike.',
  },
  {
    slug: 'reid',
    name: 'Reid',
    category: 'Electric Bikes',
    tagline: 'Accessible Urban Electric Commuters',
    description: 'Reid Urban Step-Through e-bikes provide reliable city commuting with disc brakes and lightweight alloy frames.',
  },
  {
    slug: 'pedal',
    name: 'Pedal',
    category: 'Electric Bikes',
    tagline: 'Value-Packed Daily Commuter Bikes',
    description: 'Pedal Comet and Lynx electric bikes provide smooth hub power and comfortable ergonomics for budget-conscious riders.',
  },
  {
    slug: 'priority',
    name: 'Priority',
    category: 'Electric Bikes',
    tagline: 'Grease-Free Belt Drive Urban Commuters',
    description: 'Priority Current and Continuum Onyx feature Gates Carbon Belt Drives and Enviolo step-less internal gear hubs.',
  },
  {
    slug: 'tenways',
    name: 'Tenways',
    category: 'Electric Bikes',
    tagline: 'Sleek & Silent Belt-Drive City E-Bikes',
    description: 'Tenways CGO series features magnetic torque sensors, silent belt drive belts, and ultra-smooth power delivery.',
  },
  {
    slug: 'velectrix',
    name: 'Velectrix',
    category: 'Electric Bikes',
    tagline: 'Designed & Tested in Australia',
    description: 'Velectrix Urban and Adventurer series offer local Australian warranty support and step-through comfort.',
  },
  {
    slug: 'polygon',
    name: 'Polygon',
    category: 'Electric Bikes',
    tagline: 'Trail & Urban Performance E-Bikes',
    description: 'Polygon Path E+ and Siskiu eMTBs combine Shimano EP8 motor power with modern trail geometry.',
  },
  {
    slug: 'norco',
    name: 'Norco',
    category: 'Electric Bikes',
    tagline: 'Canadian Proven Off-Road & Urban Commuters',
    description: 'Norco Indie VLT and Sight VLT deliver steep climb power and plush trail performance.',
  },
  {
    slug: 'vallkree',
    name: 'Vallkree',
    category: 'Electric Bikes',
    tagline: 'Byron Bay Vintage Scrambler E-Bikes',
    description: 'Vallkree retro scramblers combine classic cafe racer styling with high torque 500W motor assistance.',
  },
  {
    slug: 'benno',
    name: 'Benno',
    category: 'Electric Bikes',
    tagline: 'Etility Bikes — Utility Meets Agile Riding',
    description: 'Benno Boost e-bikes feature rack systems capable of carrying dual child seats or heavy cargo crates.',
  },
  {
    slug: 'yuba',
    name: 'Yuba',
    category: 'Electric Bikes',
    tagline: 'Spicy Curry Long-Tail Family Cargo Bicycles',
    description: 'Yuba Spicy Curry features a low center of gravity rear deck for safe transport of children and cargo.',
  },
  {
    slug: 'xtracycle',
    name: 'Xtracycle',
    category: 'Electric Bikes',
    tagline: 'The Original Long-Tail Cargo Pioneer',
    description: 'Xtracycle Stoked long-tail electric cargo bikes provide heavy payload ratings and custom child safety rails.',
  },
  {
    slug: 'blix',
    name: 'Blix',
    category: 'Electric Bikes',
    tagline: 'Modular Cargo & Compact City Bikes',
    description: 'Blix Sol Eclipse features modular front and rear rack mounting for custom everyday transport setups.',
  },
  {
    slug: 'urban-arrow',
    name: 'Urban Arrow',
    category: 'Electric Bikes',
    tagline: 'Front-Loading E-Cargo Family Vehicles',
    description: 'Urban Arrow Family cargo bikes replace cars with insulated expanded-polypropylene foam safety boxes.',
  },
  {
    slug: 'brompton',
    name: 'Brompton',
    category: 'Electric Bikes',
    tagline: 'Iconic British Folding Electric Bikes',
    description: 'Brompton C Line Electric folds in under 20 seconds, featuring front hub power and lightweight detachable battery bag.',
  },
  {
    slug: 'fiido',
    name: 'Fiido',
    category: 'Electric Bikes',
    tagline: 'Innovative Smart Folding & Urban E-Bikes',
    description: 'Fiido X and C11 series offer torque sensor pedal assist and sleek frame-integrated seatpost batteries.',
  },
  {
    slug: 'e-mono',
    name: 'E-Mono',
    category: 'Electric Bikes',
    tagline: 'Heavy-Duty Cargo & All-Terrain Step-Throughs',
    description: 'E-Mono Atlas and Troy e-bikes deliver rugged performance with high weight capacity frames.',
  },
  {
    slug: 'lectric',
    name: 'Lectric',
    category: 'Electric Bikes',
    tagline: 'Foldable Long-Range & Cargo E-Bikes',
    description: 'Lectric XP and XPedition series offer folding convenience and dual battery extended range.',
  },
  {
    slug: 'super73',
    name: 'Super73',
    category: 'Electric Bikes',
    tagline: 'California Urban Motor-Madness & Scramblers',
    description: 'Super73 Z-Series and S-Series feature iconic moto-inspired benches and fat tyres.',
  },

  // E-Scooters & E-Skateboards
  {
    slug: 'segway-ninebot',
    name: 'Segway Ninebot',
    category: 'Electric Scooters',
    tagline: 'Global Leader in Personal E-Mobility',
    description: 'Segway Ninebot MAX G2, GT2, and E2 series offer IPX5 water resistance, self-healing pneumatic tyres, and dual suspension.',
    aliases: ['segway ninebot', 'segway-ninebot', 'ninebot', 'segway'],
    featured: true,
  },
  {
    slug: 'inokim',
    name: 'Inokim',
    category: 'Electric Scooters',
    tagline: 'Israeli Designer E-Scooters & Commuters',
    description: 'Inokim Quick 4 and OXO series blend architectural industrial design with smooth thumb throttle modulation.',
  },
  {
    slug: 'kaabo',
    name: 'Kaabo',
    category: 'Electric Scooters',
    tagline: 'Wolf Warrior Extreme Off-Road E-Scooters',
    description: 'Kaabo Wolf King and Mantis series feature dual hydraulic disc brakes and extreme acceleration.',
    featured: true,
  },
  {
    slug: 'dualtron',
    name: 'Dualtron',
    category: 'Electric Scooters',
    tagline: 'Minimotors Extreme Performance Scooters',
    description: 'Dualtron Thunder and Achilleus push e-scooter engineering with 72V dual motors and EY3 telemetry displays.',
    featured: true,
  },
  {
    slug: 'apollo',
    name: 'Apollo',
    category: 'Electric Scooters',
    tagline: 'Canadian Smart E-Scooter Engineering',
    description: 'Apollo City and Phantom e-scooters feature regenerative braking, app connectivity, and dual suspension.',
  },
  {
    slug: 'nami',
    name: 'NAMI',
    category: 'Electric Scooters',
    tagline: 'New Age Mobility Innovation',
    description: 'NAMI Burn-E and Klima feature hand-welded tubular space frames, sine-wave controllers, and adjustable hydraulic suspension.',
  },
  {
    slug: 'vsett',
    name: 'Vsett',
    category: 'Electric Scooters',
    tagline: 'NFC Key Lock & High Torque Commuters',
    description: 'Vsett 10+ and 9+ feature dual motor toggle switches, card key immobilisers, and turn signals.',
  },
  {
    slug: 'bolzzen',
    name: 'Bolzzen',
    category: 'Electric Scooters',
    tagline: 'Australian Commuter & All-Terrain Scooters',
    description: 'Bolzzen Atom and Trooper e-scooters provide local Australian warranty support and responsive acceleration.',
  },
  {
    slug: 'dragon',
    name: 'Dragon',
    category: 'Electric Scooters',
    tagline: 'Heavy Duty Dual Motor Off-Road E-Scooters',
    description: 'Dragon Predator and Raptor scooters feature wide tubeless tyres and dual high power brushless hubs.',
  },
  {
    slug: 'evolve',
    name: 'Evolve Skateboards',
    category: 'Electric Skateboards',
    tagline: 'Australian Gold Coast All-Terrain E-Board Pioneer',
    description: 'Evolve Bamboo GTR and Hadean Carbon feature Supercarve double-joint trucks and Bluetooth handheld triggers.',
    aliases: ['evolve', 'evolve skateboards'],
    featured: true,
  },
  {
    slug: 'exway',
    name: 'Exway',
    category: 'Electric Skateboards',
    tagline: 'Flex & Atlas Smart Electric Skateboards',
    description: 'Exway Flex and Wave feature swappable drivetrain modules (Hub vs Belt) and smart OLED remotes.',
  },
  {
    slug: 'backfire',
    name: 'Backfire',
    category: 'Electric Skateboards',
    tagline: 'G2 & Zealot Belt-Drive Longboards',
    description: 'Backfire Zealot S and Ranger X3 offer flexible bamboo flex decks and high torque motor drives.',
  },
  {
    slug: 'meepo',
    name: 'Meepo',
    category: 'Electric Skateboards',
    tagline: 'Shuffle & Hurricane Carbon All-Terrain Boards',
    description: 'Meepo Hurricane and Mini series deliver top speed acceleration and durable composite decks.',
  },
  {
    slug: 'wowgo',
    name: 'WowGo',
    category: 'Electric Skateboards',
    tagline: 'Pioneer of Smooth ESC Electric Longboards',
    description: 'WowGo AT2 and Pioneer series feature smooth hobbywing ESC control curves.',
  },
  {
    slug: 'tynee',
    name: 'Tynee Board',
    category: 'Electric Skateboards',
    tagline: 'High Quality Flexible Bamboo E-Skateboards',
    description: 'Tynee Explorer and Ultra feature water-resistant enclosures and smooth power delivery.',
    aliases: ['tynee', 'tynee board'],
  },
  {
    slug: 'onewheel',
    name: 'Onewheel',
    category: 'Electric Skateboards',
    tagline: 'Future Motion Self-Balancing Single Wheel',
    description: 'Onewheel GT and Pint X feature custom brushless hub motors and dynamic self-balancing gyroscopes.',
  },
  {
    slug: 'begode',
    name: 'Begode',
    category: 'Electric Unicycles',
    tagline: 'Extreme Speed & High Voltage EUCs',
    description: 'Begode Master and Extreme electric unicycles feature 134V battery systems and adjustable suspension linkages.',
  },
  {
    slug: 'kingsong',
    name: 'KingSong',
    category: 'Electric Unicycles',
    tagline: 'S18 & S22 Suspension Electric Unicycles',
    description: 'KingSong S22 Eagle and S18 feature integrated air shocks, spiked pedals, and high torque climbing motors.',
  },
  {
    slug: 'inmotion',
    name: 'InMotion',
    category: 'Electric Unicycles',
    tagline: 'V12 & V14 Smart Electric Unicycles',
    description: 'InMotion V12 and V11 feature IPX7 battery waterproofing, touchscreen displays, and built-in trolley handles.',
  },

  // Kids & Dirt Bikes
  {
    slug: 'thumpstar',
    name: 'Thumpstar',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Australian Mini Dirt Bike Specialist',
    description: 'Thumpstar TSR electric pit bikes and balance bikes feature adjustable power limiters for young riders.',
    featured: true,
  },
  {
    slug: 'ycf',
    name: 'YCF',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'French Pit Bike & Electric Youth Dirt Bikes',
    description: 'YCF 50E and 88E electric dirt bikes provide quiet backyard riding with hydraulic disc brakes.',
  },
  {
    slug: 'sur-ron',
    name: 'Sur-Ron',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Light Bee & Ultra Bee Electric Dirt Bikes',
    description: 'Sur-Ron Light Bee X features forged aluminum alloy frames, mid-drive motors, and 60V Panasonic battery packs.',
    aliases: ['sur-ron', 'surron'],
    featured: true,
  },
  {
    slug: 'talaria',
    name: 'Talaria',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Sting R High Power Electric Off-Road Bikes',
    description: 'Talaria Sting R features gearbox primary drives, heavy-duty suspension, and high torque off-road capability.',
  },
  {
    slug: 'kuberg',
    name: 'Kuberg',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Czech Handcrafted Youth Electric Dirt Bikes',
    description: 'Kuberg Start and Freerider feature custom power apps and lightweight responsive chassis.',
  },
  {
    slug: 'stacyc',
    name: 'STACYC',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Electric Balance Bikes for Kids',
    description: 'STACYC 12eDrive and 16eDrive teach balance and throttle control to young riders.',
  },
  {
    slug: 'razor',
    name: 'Razor',
    category: 'Kids & E-Dirt Bikes',
    tagline: 'Youth Electric Rides & Pocket Rockets',
    description: 'Razor MX650 and Dirt Rocket series offer steel frame durability and kid-friendly operation.',
  },

  // Mobility Scooters
  {
    slug: 'pride-mobility',
    name: 'Pride Mobility',
    category: 'Mobility Scooters',
    tagline: 'World Leader in Mobility & Independence',
    description: 'Pride Go-Go Traveller and Pursuit series feature ergonomic Delta tillers and comfortable plush seating.',
    aliases: ['pride mobility', 'pride'],
    featured: true,
  },
  {
    slug: 'shoprider',
    name: 'Shoprider',
    category: 'Mobility Scooters',
    tagline: 'Reliable Australian Mobility Scooters',
    description: 'Shoprider Deluxe and Rocky 8 series provide suspension comfort and long range battery packs.',
  },
  {
    slug: 'afiscooter',
    name: 'Afiscooter',
    category: 'Mobility Scooters',
    tagline: 'Afikim Israeli Heavy-Duty All-Terrain Mobility',
    description: 'Afiscooter C4 and S4 series feature heavy duty chassis, shock absorption, and orthopedic seats.',
  },
  {
    slug: 'merits',
    name: 'Merits',
    category: 'Mobility Scooters',
    tagline: 'Ergonomic & Portable Mobility Scooters',
    description: 'Merits Regal and Roadster series offer easy disassembly and stable 4-wheel bases.',
  },
  {
    slug: 'drive-medical',
    name: 'Drive Medical',
    category: 'Mobility Scooters',
    tagline: 'Compact & Folding Travel Mobility',
    description: 'Drive Medical Scout and Spitfire scooters offer tight turning radiuses and lightweight battery packs.',
    aliases: ['drive medical', 'drive'],
  },
  {
    slug: 'invacare',
    name: 'Invacare',
    category: 'Mobility Scooters',
    tagline: 'Yes You Can — Premium Medical Mobility',
    description: 'Invacare Comet and Leo mobility scooters feature speed reduction safety on turns and dual headlights.',
  },

  // Accessories & Components
  {
    slug: 'abus',
    name: 'Abus',
    category: 'Accessories & Components',
    tagline: 'German High Security Locks & Helmets',
    description: 'Abus Bordo Granit folding locks and Pedelec helmets offer Sold Secure Gold anti-theft protection.',
    featured: true,
  },
  {
    slug: 'kryptonite',
    name: 'Kryptonite',
    category: 'Accessories & Components',
    tagline: 'New York Lock Security Standard',
    description: 'Kryptonite New York Fahgettaboudit D-locks offer hardened steel shackle protection against angle grinders.',
  },
  {
    slug: 'hiplok',
    name: 'Hiplok',
    category: 'Accessories & Components',
    tagline: 'Wearable Bicycle Locks & Anti-Grinder Tech',
    description: 'Hiplok D1000 and Gold wearable chain locks protect valuable e-bikes from portable power tools.',
  },
  {
    slug: 'thule',
    name: 'Thule',
    category: 'Accessories & Components',
    tagline: 'Swedish E-Bike Racks & Child Seats',
    description: 'Thule EasyFold XT and Yepp Next child seats are heavy-payload rated specifically for electric bikes.',
  },
  {
    slug: 'giro',
    name: 'Giro',
    category: 'Accessories & Components',
    tagline: 'Helmets & Performance Riding Gear',
    description: 'Giro Bexley MIPS and Camden e-bike helmets feature integrated rear LED lights and extended rear coverage.',
  },
  {
    slug: 'quad-lock',
    name: 'Quad Lock',
    category: 'Accessories & Components',
    tagline: 'Australian Designed Smartphone Mounts',
    description: 'Quad Lock handlebar mounts and vibration dampeners secure smartphones safely to e-bike and e-scooter bars.',
  },
  {
    slug: 'ortlieb',
    name: 'Ortlieb',
    category: 'Accessories & Components',
    tagline: '100% Waterproof Panniers & Bikepacking',
    description: 'Ortlieb Back-Roller Classic waterproof panniers clip securely to heavy duty e-bike rear racks.',
  },
];

/** Every brand, including those added without a hand-written profile. */
export const ALL_BRANDS: BrandDef[] = [...CORE_BRANDS, ...EXTRA_BRANDS];

/** Brands that have at least one product: only these get a page, a sitemap entry and links. */
export const ACTIVE_BRANDS: BrandDef[] = ALL_BRANDS.filter((b) => getProductsByBrandDef(b).length > 0);

export function getBrandBySlug(slug: string): BrandDef | undefined {
  const brand = ALL_BRANDS.find((b) => b.slug.toLowerCase() === slug.toLowerCase());
  if (brand) return brand;

  // Fallback generation for auto-discovered brands
  const cleanName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug,
    name: cleanName,
    category: 'Electric Bikes',
    tagline: `${cleanName} E-Mobility Products in Australia`,
    description: `Explore the full range of ${cleanName} models available at ${SITE.name} with local Australian warranty, express shipping, and 10% crypto discount.`,
  };
}

function getProductsByBrandDef(brandDef: BrandDef): Product[] {
  const brandNameLower = brandDef.name.toLowerCase();
  const slugLower = brandDef.slug.toLowerCase();
  const aliasList = brandDef.aliases
    ? brandDef.aliases.map((a) => a.toLowerCase())
    : [brandNameLower, slugLower.replace(/-/g, ' ')];

  return PRODUCTS.filter((p) => {
    const pName = p.name.toLowerCase();
    for (const alias of aliasList) {
      if (
        pName.startsWith(alias + ' ') ||
        pName === alias ||
        pName.includes(' ' + alias + ' ') ||
        pName.endsWith(' ' + alias)
      ) {
        return true;
      }
    }
    return false;
  });
}

export function getProductsByBrand(brandSlug: string): Product[] {
  const brandDef = getBrandBySlug(brandSlug);
  return brandDef ? getProductsByBrandDef(brandDef) : [];
}

export function getBrandProductCount(brandSlug: string): number {
  return getProductsByBrand(brandSlug).length;
}
