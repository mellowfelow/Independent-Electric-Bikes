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
    body: false,
    shop: [
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
      { label: 'Shipping and returns', href: '/shipping/' },
      { label: 'FAQ', href: '/faq/' },
    ],
  },
  'cargo-electric-bikes-replacing-second-family-car': {
    body: false,
    shop: [
      { label: 'Cargo & family e-bikes', href: '/shop/electric-bikes/cargo-family-ebikes/' },
      { label: 'Child seats', href: '/shop/safety-security-carry/child-seats/' },
      { label: 'Racks and panniers', href: '/shop/safety-security-carry/racks-baskets/' },
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
    ],
  },
  'ebike-battery-care-and-range-maximization-guide': {
    body: false,
    shop: [
      { label: 'E-bike batteries', href: '/shop/batteries-parts-kits/ebike-batteries/' },
      { label: 'E-bike chargers', href: '/shop/batteries-parts-kits/ebike-chargers/' },
      { label: 'Batteries, parts & kits', href: '/shop/batteries-parts-kits/' },
    ],
  },
  'belt-drive-vs-chain-ebikes-pros-cons-australia': {
    body: false,
    shop: [
      { label: 'Belt-drive commuters', href: '/shop/electric-bikes/belt-drive-commuters/' },
      { label: 'Urban & commuter e-bikes', href: '/shop/electric-bikes/urban-commuter-ebikes/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'mid-drive-vs-hub-motors-australian-hills-comparison': {
    body: false,
    shop: [
      { label: 'Electric mountain bikes', href: '/shop/electric-bikes/electric-mountain-bikes/' },
      { label: 'Mid-drive conversion kits', href: '/shop/batteries-parts-kits/mid-drive-conversion-kits/' },
      { label: 'Compare e-bikes', href: '/compare/' },
    ],
  },
  'hydraulic-vs-mechanical-disc-brakes-ebike-safety': {
    body: false,
    shop: [
      { label: 'Brake pads & rotors', href: '/shop/batteries-parts-kits/brakes-rotors-pads/' },
      { label: 'E-bikes', href: '/shop/electric-bikes/' },
      { label: 'Tyres & tubes', href: '/shop/batteries-parts-kits/tyres-tubes/' },
    ],
  },
  'electric-scooter-laws-victoria-and-australia-2026': {
    body: false,
    shop: [
      { label: 'Electric scooters', href: '/shop/electric-scooters/' },
      { label: 'Commuter e-scooters', href: '/shop/electric-scooters/commuter-electric-scooters/' },
      { label: 'Helmets', href: '/shop/safety-security-carry/helmets/' },
    ],
  },
  'how-to-secure-your-ebike-locks-gps-and-insurance': {
    body: false,
    shop: [
      { label: 'U-locks & D-locks', href: '/shop/safety-security-carry/u-d-locks/' },
      { label: 'Folding locks', href: '/shop/safety-security-carry/folding-locks/' },
      { label: 'Chain locks', href: '/shop/safety-security-carry/chain-locks/' },
    ],
  },
  'cryptocurrency-ebike-buying-discount-guide': {
    body: false,
    shop: [
      { label: 'Shop all products', href: '/shop/' },
      { label: 'Shipping', href: '/shipping/' },
      { label: 'Contact us', href: '/contact/' },
    ],
  },
};
