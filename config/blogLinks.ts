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
  'electric-scooter-laws-victoria-and-australia-2026': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter e-scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
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
  'cryptocurrency-ebike-buying-discount-guide': {
    body: true,
    shop: [
      { label: 'Shop all products', href: '/shop/' },
      { label: 'Shipping', href: '/shipping/' },
      { label: 'Contact us', href: '/contact/' },
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
  'electric-skateboard-laws-safety-gear-australia': {
    body: true,
    shop: [
      { label: 'Electric skateboards', href: '/shop/electric-skateboards/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/' },
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
  'electric-scooter-vs-ebike-commuting-comparison': {
    body: true,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Compare', href: '/compare/' },
    ],
  },
  'ebike-for-seniors-mobility-step-through-guide': {
    body: true,
    shop: [
      { label: 'Step-through commuters', href: '/shop/electric-bikes/step-through-commuters/' },
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Mobility scooters', href: '/shop/mobility-scooters/' },
    ],
  },
  'rainy-weather-ebike-riding-tips-melbourne': {
    body: true,
    shop: [
      { label: 'Mudguards & fenders', href: '/shop/safety-security-carry/' },
      { label: 'Lights & visibility', href: '/shop/safety-security-carry/lights-visibility/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
    ],
  },
  'electric-bike-financing-payment-plans-australia': {
    body: true,
    shop: [
      { label: 'Shop all e-bikes', href: '/shop/electric-bikes/' },
      { label: 'Shop all products', href: '/shop/' },
      { label: 'Contact us', href: '/contact/' },
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
  'ebike-weight-capacity-heavy-rider-guide': {
    body: true,
    shop: [
      { label: 'Fat tyre e-bikes', href: '/shop/electric-bikes/fat-tyre-lifestyle-ebikes/' },
      { label: 'Cargo e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-tyre-pressure-guide-speed-comfort-grip': {
    body: true,
    shop: [
      { label: 'Tyres & tubes', href: '/shop/batteries-parts-kits/tyres-tubes/' },
      { label: 'Accessories', href: '/shop/accessories/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
    ],
  },
  'ebike-vs-car-annual-cost-comparison-australia': {
    body: true,
    shop: [
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Cargo e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'Shop all e-bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'cargo-ebike-child-seats-school-runs-safety': {
    body: true,
    shop: [
      { label: 'Cargo & family e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'Child seats', href: '/shop/safety-security-carry/child-seats/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
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
  'throttle-vs-pedal-assist-ebike-modes-explained': {
    body: true,
    shop: [
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-touring-australia-routes-gear-planning': {
    body: true,
    shop: [
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'Racks & baskets', href: '/shop/safety-security-carry/racks-baskets/' },
    ],
  },
  'winter-ebike-commuting-cold-weather-gear-tips': {
    body: true,
    shop: [
      { label: 'Lights & visibility', href: '/shop/safety-security-carry/lights-visibility/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
    ],
  },
  'ebike-motor-noise-quiet-riding-guide': {
    body: true,
    shop: [
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'plan-your-first-ebike-commute-route-checklist': {
    body: true,
    shop: [
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
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
  'ebike-display-apps-connectivity-features-guide': {
    body: true,
    shop: [
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-suspension-setup-front-fork-seatpost': {
    body: true,
    shop: [
      { label: 'Mountain e-bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'Full suspension e-bikes', href: '/shop/electric-bikes/full-suspension-ebikes/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
    ],
  },
  'panniers-vs-backpack-ebike-commuter-carrying': {
    body: true,
    shop: [
      { label: 'Safety, security & carry', href: '/shop/safety-security-carry/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Cargo e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
    ],
  },
  'night-riding-ebike-lights-reflectors-safety': {
    body: true,
    shop: [
      { label: 'Lights & reflectors', href: '/shop/safety-security-carry/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
    ],
  },
  'ebike-for-food-delivery-riders-uber-doordash': {
    body: true,
    shop: [
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Step-through e-bikes', href: '/shop/electric-bikes/step-through-commuters/' },
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Batteries & chargers', href: '/shop/batteries-parts-kits/' },
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
  'ebike-chain-maintenance-cleaning-lubrication': {
    body: true,
    shop: [
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'best-ebikes-for-hills-steep-terrain-australia': {
    body: true,
    shop: [
      { label: 'Mountain e-bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'Mid-drive e-bikes', href: '/shop/electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'electric-bike-insurance-australia-guide': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/locks-security/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'how-to-test-ride-ebike-what-to-check': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
  'ebike-parking-storage-apartment-solutions': {
    body: true,
    shop: [
      { label: 'Locks & security', href: '/shop/safety-security-carry/locks-security/' },
      { label: 'Folding e-bikes', href: '/shop/electric-bikes/folding-ebikes/' },
      { label: 'Safety & security', href: '/shop/safety-security-carry/' },
    ],
  },
  'regenerative-braking-ebike-how-it-works': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Batteries & chargers', href: '/shop/batteries-parts-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-pedals-types-clipless-flat-shoes': {
    body: true,
    shop: [
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'electric-cargo-trikes-business-delivery-guide': {
    body: true,
    shop: [
      { label: 'Cargo & family e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'Electric trikes', href: '/shop/electric-bikes/electric-trikes/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
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
  'how-to-clean-ebike-safely-washing-guide': {
    body: true,
    shop: [
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-vs-public-transport-cost-time-comparison': {
    body: true,
    shop: [
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Folding e-bikes', href: '/shop/electric-bikes/folding-ebikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
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
  'ebike-helmet-guide-australia-laws-types': {
    body: true,
    shop: [
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Safety & security', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'buying-second-hand-ebike-what-to-check': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-commuting-hot-weather-summer-tips': {
    body: true,
    shop: [
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Safety & accessories', href: '/shop/safety-security-carry/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
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
  'ebike-accessories-phone-mounts-mirrors-bells': {
    body: true,
    shop: [
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/locks-security/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
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
  'ebike-camping-bikepacking-gear-guide': {
    body: true,
    shop: [
      { label: 'Mountain e-bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'E-bike accessories', href: '/shop/safety-security-carry/' },
      { label: 'Batteries & parts', href: '/shop/batteries-parts-kits/' },
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
  'ebike-for-university-students-campus-commute': {
    body: true,
    shop: [
      { label: 'Folding e-bikes', href: '/shop/electric-bikes/folding-electric-bikes/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/commuter-electric-bikes/' },
      { label: 'Locks & security', href: '/shop/safety-security-carry/bike-locks-security/' },
    ],
  },
  'riding-ebike-with-dog-carriers-trailers': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Accessories', href: '/shop/accessories/' },
      { label: 'Cargo e-bikes', href: '/shop/electric-bikes/cargo-electric-bikes/' },
    ],
  },
  'ebike-gear-ratios-shifting-explained': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'ebike-fitness-health-benefits-exercise': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Commuter e-bikes', href: '/shop/electric-bikes/commuter-electric-bikes/' },
      { label: 'Step-through e-bikes', href: '/shop/electric-bikes/step-through-electric-bikes/' },
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
  'ebike-headlight-beam-patterns-visibility': {
    body: true,
    shop: [
      { label: 'Lights & reflectors', href: '/shop/accessories/lights-reflectors/' },
      { label: 'Safety gear', href: '/shop/safety-security-carry/' },
      { label: 'Accessories', href: '/shop/accessories/' },
    ],
  },
  'ebike-tyre-size-width-guide-choosing': {
    body: true,
    shop: [
      { label: 'Tyres & tubes', href: '/shop/batteries-parts-kits/tyres-tubes/' },
      { label: 'Parts & kits', href: '/shop/batteries-parts-kits/' },
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
    ],
  },
  'ebike-group-rides-community-clubs-australia': {
    body: true,
    shop: [
      { label: 'Electric bikes', href: '/shop/electric-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Accessories', href: '/shop/accessories/' },
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
  'electric-bikes-vs-scooters-for-kids-teens': {
    body: true,
    shop: [
      { label: 'Kids e-bikes', href: '/shop/kids-off-road-ev/' },
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
};
