// Where each guide sends the reader next. Paths are existing shop pages; `body` marks the guides that have a written article.
// Guides without a body are shown as short summaries and kept out of the sitemap and search index until the article is written.
export interface GuideLinks {
  body: boolean;
  shop: { label: string; href: string }[];
}

export const GUIDE_LINKS: Record<string, GuideLinks> = {
  'best-electric-commuter-bike-australia-guide-2026': {
    body: true,
    shop: [
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Step-through commuters', href: '/shop/electric-bikes/step-through-commuters/' },
      { label: 'E-bike helmets and lights', href: '/shop/safety-security-carry/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'melbourne-ebike-laws-and-safety-standards': {
    body: true,
    shop: [
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Shipping and returns', href: '/shipping/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'cargo-electric-bikes-replacing-second-family-car': {
    body: true,
    shop: [
      { label: 'Cargo & family e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'Child seats', href: '/shop/safety-security-carry/child-seats/' },
      { label: 'Racks and panniers', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
    ],
  },
  'ebike-battery-care-and-range-maximization-guide': {
    body: true,
    shop: [
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'E-bike chargers', href: '/shop/batteries-parts-kits/ebike-chargers/' },
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
    ],
  },
  'belt-drive-vs-chain-ebikes-pros-cons-australia': {
    body: true,
    shop: [
      { label: 'Belt-drive commuters', href: '/shop/electric-bikes/belt-drive-commuters/' },
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'mid-drive-vs-hub-motors-australian-hills-comparison': {
    body: true,
    shop: [
      { label: 'Electric mountain bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'Mid-drive conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'hydraulic-vs-mechanical-disc-brakes-ebike-safety': {
    body: true,
    shop: [
      { label: 'Brake pads & rotors', href: '/shop/batteries-parts-kits/brakes-rotors-pads/' },
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Tyres & tubes', href: '/shop/batteries-parts-kits/tyres-tubes/' },
    ],
  },
  'folding-ebikes-commuter-guide-train-apartment': {
    body: true,
    shop: [
      { label: 'Folding e-bikes', href: '/shop/electric-bikes/foldable-electric-bikes/' },
      { label: 'Compact folders', href: '/shop/electric-bikes/compact-folding-bikes/' },
      { label: 'Fat tyre folders', href: '/shop/electric-bikes/fat-tyre-folding-bikes/' },
    ],
  },
  'fat-tyre-ebikes-beach-sand-trail-riding-australia': {
    body: true,
    shop: [
      { label: 'Fat tyre e-bikes', href: '/shop/electric-bikes/fat-tyre-lifestyle-ebikes/' },
      { label: 'All-terrain fat tyre', href: '/shop/electric-bikes/fat-tyre-all-terrain-ebikes/' },
      { label: 'Classic cruisers', href: '/shop/electric-bikes/classic-cruiser-ebikes/' },
    ],
  },
  'electric-mountain-bikes-full-suspension-vs-hardtail': {
    body: true,
    shop: [
      { label: 'Electric mountain bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'Full-suspension eMTB', href: '/shop/electric-bikes/full-suspension-emtb/' },
      { label: 'Hardtail eMTB', href: '/shop/electric-bikes/hardtail-emtb/' },
    ],
  },
  'ebike-conversion-kits-diy-guide-australia': {
    body: true,
    shop: [
      { label: 'Mid-drive conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Hub motor kits', href: '/shop/batteries-parts-kits/hub-motor-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
    ],
  },
  'cryptocurrency-ebike-buying-discount-guide': {
    body: true,
    shop: [
      { label: 'Shop all products', href: '/shop/' },
      { label: 'Shipping', href: '/shipping/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'moped-style-ebikes-retro-super73-cafe-racer': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Fat tyre e-bikes', href: '/shop/electric-bikes/fat-tyre-ebikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'step-through-vs-step-over-frame-guide': {
    body: true,
    shop: [
      { label: 'Step-through e-bikes', href: '/shop/electric-bikes/step-through-commuters/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-warranty-consumer-rights-australia': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'best-ebikes-under-2000-australia-budget': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/commuter-electric-bikes/' },
      { label: 'Folding e-bikes', href: '/shop/electric-bikes/folding-electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-subsidies-incentives-rebates-australia': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/commuter-electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-troubleshooting-common-problems-fixes': {
    body: true,
    shop: [
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Chargers', href: '/shop/batteries-parts-kits/chargers/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-maintenance-schedule-checklist': {
    body: true,
    shop: [
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Tyres & tubes', href: '/shop/batteries-parts-kits/tyres-tubes/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-motor-types-hub-mid-drive-friction': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-range-how-far-can-you-go-explained': {
    body: true,
    shop: [
      { label: 'Batteries & chargers', href: '/shop/batteries-parts-kits/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-road-rules-every-australian-state': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'ebike-speed-limiters-derestriction-legal-risks': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'ebike-battery-replacement-choosing-right-one': {
    body: true,
    shop: [
      { label: 'Batteries & chargers', href: '/shop/batteries-parts-kits/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'ebike-battery-fire-safety-lithium-ion': {
    body: true,
    shop: [
      { label: 'Batteries & chargers', href: '/shop/batteries-parts-kits/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'electric-scooter-laws-victoria-and-australia-2026': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter e-scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-scooter-vs-ebike-commuting-comparison': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Compare', href: '/compare/' },
    ],
  },
  'best-electric-scooter-commuter-australia': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-maintenance-tyres-brakes-guide': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'dual-motor-electric-scooter-long-range-guide': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-safety-gear-essentials-australia': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-battery-range-maximizing-tips': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'folding-electric-scooter-last-mile-commuting': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-tyre-types-solid-pneumatic': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-speed-power-performance-guide': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-wet-weather-rain-riding-tips': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-scooter-vs-car-cost-comparison-australia': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'electric-skateboard-laws-safety-gear-australia': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/' },
    ],
  },
  'best-electric-skateboard-beginner-guide-australia': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'electric-longboard-vs-shortboard-choosing-guide': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'all-terrain-electric-skateboard-off-road-riding': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'electric-skateboard-maintenance-belts-wheels-bearings': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'electric-skateboard-braking-techniques-safety': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'onewheel-style-boards-beginner-guide': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-skateboard-range-speed-battery-guide': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'electric-skateboard-commuting-pros-cons': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
    ],
  },
  'electric-unicycles-euc-beginner-guide-australia': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/' },
    ],
  },
  'hoverboard-buying-guide-kids-adults-australia': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-unicycle-commuting-guide-australia': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'hoverboard-safety-guide-kids-parents': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'euc-long-range-touring-guide': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'hoverboard-go-kart-attachments-guide': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-unicycle-vs-scooter-comparison': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'hoverboard-laws-australia-where-to-ride': {
    body: true,
    shop: [
      { label: 'Self-balancing EVs', href: '/shop/self-balancing-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-bikes-vs-scooters-for-kids-teens': {
    body: true,
    shop: [
      { label: 'Kids e-bikes', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-balance-bike-toddler-guide-australia': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'youth-electric-dirt-bike-buying-guide': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-go-kart-kids-guide-australia': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'kids-electric-quad-bike-safety-guide': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'stacyc-vs-gasgas-kids-balance-bike-comparison': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-dirt-bike-vs-petrol-kids-comparison': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'kids-electric-vehicle-age-guide-which-ev': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-drift-trike-go-kart-guide': {
    body: true,
    shop: [
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-trikes-stability-mobility-guide': {
    body: true,
    shop: [
      { label: 'Electric trikes', href: '/shop/electric-bikes/' },
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Step-through commuters', href: '/shop/electric-bikes/step-through-commuters/' },
    ],
  },
  'mobility-scooter-buying-guide-australia': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'travel-folding-mobility-scooter-guide': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'heavy-duty-mobility-scooter-all-terrain-guide': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'mobility-scooter-battery-range-charging-tips': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'mobility-scooter-laws-footpath-rules-australia': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'mobility-scooter-accessories-comfort-safety': {
    body: true,
    shop: [
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'ebike-battery-types-lithium-ion-explained': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'bafang-mid-drive-conversion-kit-guide': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'hub-motor-conversion-kit-diy-ebike': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-charger-guide-fast-standard-solar': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-tyre-replacement-guide-sizes-types': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-brake-pad-rotor-replacement-guide': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-battery-capacity-voltage-amp-hours-explained': {
    body: true,
    shop: [
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'how-to-secure-your-ebike-locks-gps-and-insurance': {
    body: true,
    shop: [
      { label: 'U-locks & D-locks', href: '/shop/safety-security-carry/u-d-locks/' },
      { label: 'Folding locks', href: '/shop/safety-security-carry/folding-locks/' },
      { label: 'Chain locks', href: '/shop/safety-security-carry/chain-locks/' },
    ],
  },
  'best-ebike-accessories-lights-helmets-locks': {
    body: true,
    shop: [
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Locks', href: '/shop/safety-security-carry/u-d-locks/' },
      { label: 'Lights & visibility', href: '/shop/safety-security-carry/lights-visibility/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
    ],
  },
  'ebike-helmet-guide-australia-laws-types': {
    body: true,
    shop: [
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety & security', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'best-bike-lock-guide-u-lock-folding-chain': {
    body: true,
    shop: [
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-pannier-bag-waterproof-commuting-guide': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'bike-rack-basket-cargo-carrying-guide': {
    body: true,
    shop: [
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'child-seat-ebike-safety-installation-guide': {
    body: true,
    shop: [
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'bike-light-lumens-guide-front-rear-sets': {
    body: true,
    shop: [
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'high-vis-jacket-reflective-gear-cycling': {
    body: true,
    shop: [
      { label: 'Safety, locks & carry', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'phone-mount-ebike-quad-lock-guide': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-quad-bikes-atv-farm-recreation-guide': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'kids-electric-quad-bike-buying-guide-australia': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'adult-electric-atv-recreation-farm-guide': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-quad-bike-vs-petrol-atv-comparison': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'farm-utility-electric-quad-guide-australia': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-quad-bike-safety-helmet-gear-guide': {
    body: true,
    shop: [
      { label: 'Electric quad bikes', href: '/shop/electric-quad-bikes/' },
      { label: 'Kids & off-road EVs', href: '/shop/kids-off-road-ev/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'electric-jet-ski-buying-guide-australia': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'electric-surfboard-efoil-beginner-guide': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'electric-jetboard-bodyboard-guide': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'sea-doo-rise-electric-jet-ski-review': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'electric-watercraft-laws-australia-boating': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'efoil-hydrofoil-learning-guide-beginners': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
  'electric-water-sports-battery-range-guide': {
    body: true,
    shop: [
      { label: 'Electric water sports', href: '/shop/electric-water-sports/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'Shipping and returns', href: '/shipping/' },
    ],
  },
};
