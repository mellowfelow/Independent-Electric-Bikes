// Old /shop/accessories/... URLs after the accessories category was split into dedicated categories.
export const ACCESSORY_REDIRECTS: { source: string; destination: string }[] = [
  {
    "source": "/shop/accessories/security-locks",
    "destination": "/shop/safety-security-carry"
  },
  {
    "source": "/shop/accessories/safety-apparel-helmets",
    "destination": "/shop/safety-security-carry"
  },
  {
    "source": "/shop/accessories/utility-cargo-add-ons",
    "destination": "/shop/safety-security-carry"
  },
  {
    "source": "/shop/accessories/replacement-batteries-chargers",
    "destination": "/shop/batteries-parts-kits"
  },
  {
    "source": "/shop/accessories/kryptonite-evolution-standard-u-lock",
    "destination": "/shop/safety-security-carry/u-d-locks/kryptonite-evolution-standard-u-lock"
  },
  {
    "source": "/shop/accessories/abus-granit-x-plus-540-u-lock",
    "destination": "/shop/safety-security-carry/u-d-locks/abus-granit-x-plus-540-u-lock"
  },
  {
    "source": "/shop/accessories/hiplok-gold-chain-lock",
    "destination": "/shop/safety-security-carry/chain-locks/hiplok-gold-chain-lock"
  },
  {
    "source": "/shop/accessories/fox-racing-dropframe-pro-helmet",
    "destination": "/shop/safety-security-carry/helmets/fox-racing-dropframe-pro-helmet"
  },
  {
    "source": "/shop/accessories/troy-lee-designs-stage-mips-helmet",
    "destination": "/shop/safety-security-carry/helmets/troy-lee-designs-stage-mips-helmet"
  },
  {
    "source": "/shop/accessories/alpinestars-venture-riding-jacket",
    "destination": "/shop/safety-security-carry/jackets-hi-vis/alpinestars-venture-riding-jacket"
  },
  {
    "source": "/shop/accessories/thule-yepp-nexxt-maxi-child-seat",
    "destination": "/shop/safety-security-carry/child-seats/thule-yepp-nexxt-maxi-child-seat"
  },
  {
    "source": "/shop/accessories/rixen-kaul-front-handlebar-basket",
    "destination": "/shop/safety-security-carry/racks-baskets/rixen-kaul-front-handlebar-basket"
  },
  {
    "source": "/shop/accessories/bosch-fast-charger-6a-smart-system",
    "destination": "/shop/batteries-parts-kits/ebike-chargers/bosch-fast-charger-6a-smart-system"
  },
  {
    "source": "/shop/accessories/shimano-steps-4a-fast-battery-charger",
    "destination": "/shop/batteries-parts-kits/ebike-chargers/shimano-steps-4a-fast-battery-charger"
  },
  {
    "source": "/shop/accessories/kryptonite-new-york-legend-1515-chain-lock",
    "destination": "/shop/safety-security-carry/chain-locks/kryptonite-new-york-legend-1515-chain-lock"
  },
  {
    "source": "/shop/accessories/abus-bordo-granit-xplus-6500-folding-lock",
    "destination": "/shop/safety-security-carry/folding-locks/abus-bordo-granit-xplus-6500-folding-lock"
  },
  {
    "source": "/shop/accessories/hiplok-d1000-anti-angle-grinder-u-lock",
    "destination": "/shop/safety-security-carry/u-d-locks/hiplok-d1000-anti-angle-grinder-u-lock"
  },
  {
    "source": "/shop/accessories/kryptonite-evolution-mini-7-with-cable",
    "destination": "/shop/safety-security-carry/u-d-locks/kryptonite-evolution-mini-7-with-cable"
  },
  {
    "source": "/shop/accessories/thousand-heritage-helmet-mips",
    "destination": "/shop/safety-security-carry/helmets/thousand-heritage-helmet-mips"
  },
  {
    "source": "/shop/accessories/lumos-ultra-smart-led-helmet-with-indicators",
    "destination": "/shop/safety-security-carry/helmets/lumos-ultra-smart-led-helmet-with-indicators"
  },
  {
    "source": "/shop/accessories/giro-fixture-mips-ii-mountain-helmet",
    "destination": "/shop/safety-security-carry/helmets/giro-fixture-mips-ii-mountain-helmet"
  },
  {
    "source": "/shop/accessories/fox-racing-dropframe-pro-enduro-helmet",
    "destination": "/shop/safety-security-carry/helmets/fox-racing-dropframe-pro-enduro-helmet"
  },
  {
    "source": "/shop/accessories/proviz-reflect360-high-vis-waterproof-jacket",
    "destination": "/shop/safety-security-carry/jackets-hi-vis/proviz-reflect360-high-vis-waterproof-jacket"
  },
  {
    "source": "/shop/accessories/thule-yepp-maxi-frame-mount-child-seat",
    "destination": "/shop/safety-security-carry/child-seats/thule-yepp-maxi-frame-mount-child-seat"
  },
  {
    "source": "/shop/accessories/ortlieb-back-roller-classic-waterproof-panniers-40l",
    "destination": "/shop/safety-security-carry/panniers-bags/ortlieb-back-roller-classic-waterproof-panniers-40l"
  },
  {
    "source": "/shop/accessories/quad-lock-handlebar-mount-pro-kit",
    "destination": "/shop/safety-security-carry/phone-mounts/quad-lock-handlebar-mount-pro-kit"
  },
  {
    "source": "/shop/accessories/bosch-smartphonegrip-smart-system-mount",
    "destination": "/shop/safety-security-carry/phone-mounts/bosch-smartphonegrip-smart-system-mount"
  },
  {
    "source": "/shop/accessories/blackburn-outpost-front-cargo-rack",
    "destination": "/shop/safety-security-carry/racks-baskets/blackburn-outpost-front-cargo-rack"
  },
  {
    "source": "/shop/accessories",
    "destination": "/shop/batteries-parts-kits"
  },
  { source: '/shop/batteries-chargers', destination: '/shop/batteries-parts-kits' },
  { source: '/shop/batteries-chargers/:path*', destination: '/shop/batteries-parts-kits/:path*' },
  { source: '/shop/parts-components', destination: '/shop/batteries-parts-kits' },
  { source: '/shop/parts-components/:path*', destination: '/shop/batteries-parts-kits/:path*' },
  { source: '/shop/conversion-kits', destination: '/shop/batteries-parts-kits' },
  { source: '/shop/conversion-kits/:path*', destination: '/shop/batteries-parts-kits/:path*' },
  { source: '/shop/safety-gear', destination: '/shop/safety-security-carry' },
  { source: '/shop/safety-gear/:path*', destination: '/shop/safety-security-carry/:path*' },
  { source: '/shop/locks-security', destination: '/shop/safety-security-carry' },
  { source: '/shop/locks-security/:path*', destination: '/shop/safety-security-carry/:path*' },
  { source: '/shop/bags-racks-carry', destination: '/shop/safety-security-carry' },
  { source: '/shop/bags-racks-carry/:path*', destination: '/shop/safety-security-carry/:path*' },
];
