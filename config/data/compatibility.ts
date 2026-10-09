// Which batteries, chargers and parts suit which vehicles in the catalogue. Names must match product names in config/data.
// Two levels, always shown to customers as such:
//  - confirmed: the manufacturer or retailer page names this model (or its exact battery/charger) as compatible.
//  - system: same drive system or platform; battery generation, mount or voltage must still be checked against the bike's label.
// Sources checked 2026-10-09: Trek, Cube, Cannondale, Tern, Riese & Muller, Giant, Merida, Segway, 99spokes (drive systems);
// 99 Bikes, Pushys, PedL, Scooter Hut, Twelve Board Store, Stacyc Australia (part fitment).

export interface PartFit {
  /** Models the seller or manufacturer names as compatible. */
  confirmed?: string[];
  /** Models that use the same drive system or platform. */
  system?: string[];
  /** Short fitment rule shown on the card. */
  rule: string;
}

export const BOSCH_BIKES = [
  'Trek Allant+ 5', 'Trek Allant+ 8 ST', 'Trek Rail 5 Gen 3', 'Trek Rail 9.8 GX AXS',
  'Cube Touring Hybrid ONE', 'Cube Touring Hybrid ONE 400', 'Cube Touring Hybrid Pro 500', 'Cube Kathmandu Hybrid Pro 600',
  'Cannondale Adventure Neo 4', 'Cannondale Cargowagen Neo 2',
  'Gazelle Arroyo C7 HMB', 'Gazelle Ultimate C380 HMB', 'Gazelle Medeo T9 HMB',
  'Tern GSD S10 LX', 'Tern GSD S00 LX Cargo Plus', 'Tern HSD P9', 'Tern HSD P9 Performance', 'Tern Vektron Q9 Folding', 'Tern Vektron S10 Gen 2',
  'Riese & Müller Load 4 75', 'Riese & Müller Multicharger2', 'Riese & Müller Multicharger3 Mixte', 'Riese & Müller Packster 70 Vario',
];

export const SHIMANO_BIKES = [
  'Merida eSpresso City 300 EQ', 'Merida eSpresso City 200 EQ', 'Merida eSpresso 400', 'Merida eSpresso 300 SE',
  'Merida eOne-Forty 400', 'Merida eOne-Sixty 7000', 'Merida eBig.Nine 400',
];

export const GIANT_BIKES = ['Giant Explore E+ 4', 'Giant Explore E+ 3 Power', 'Giant Trance X Advanced E+ 2', 'Giant Reign E+ 1 Pro'];

export const MULTI_VOLT_SCOOTERS = [
  'Kaabo Mantis 8 Dual Motor', 'Kaabo Mantis 10 Plus V2 Dual Motor', 'Kaabo Wolf Warrior X Plus (2026)', 'Kaabo Wolf King GTR Extreme',
  'Dualtron Eagle Pro 60V', 'Dualtron Thunder 60V 35Ah', 'Dualtron Thunder 3 Super Beast',
  'Apollo City Pro 2026', 'Apollo Pro 72V Hyper Scooter', 'Apollo Phantom V4 60V',
  'Vsett 8+ Dual Motor Commuter', 'Vsett 10+ Apex Super Scooter', 'Nami Klima Dual 1000W', 'Nami Burn-E 2 Max Hyper',
  'Dragon Raptor All Terrain Dual', 'Dragon Lightning V2 Dual Motor', 'Dragon GTR V2 2400W Max', 'Dragon Cyclone Pro All Terrain', 'Dragon X8 Pro Dual Motor',
  'Bolzzen Atom Lite e-Scooter', 'Bolzzen Atom Pro e-Scooter',
];

export const STACYC_BIKES = ['Stacyc 12eDrive Balance Bike', 'Stacyc 16eDrive Brushless Pro'];
const STACYC_FAMILY = ['KTM Factory Replica 16eDrive', 'Husqvarna Factory Replica 12eDrive', 'GASGAS Factory Replica 16eDrive'];

export const PART_FITS: Record<string, PartFit> = {
  // E-bike batteries and chargers
  'Shimano STEPS BT-E8035 Integrated Down Tube Battery 504Wh': {
    confirmed: ['Merida eBig.Nine 400'],
    system: SHIMANO_BIKES,
    rule: 'Shimano STEPS 504Wh down-tube battery (E8000/E7000/EP8 drive units). Check your bike for BT-E8035 or the -L variant and the mount.',
  },
  'Shimano STEPS BT-E8010 Down Tube Battery 504Wh': {
    confirmed: ['Merida eSpresso 300 SE'],
    system: SHIMANO_BIKES,
    rule: 'Shimano STEPS 504Wh down-tube battery. Confirm the battery code printed on your current pack.',
  },
  'Shimano STEPS EC-E6002 Battery Charger': {
    confirmed: ['Merida eBig.Nine 400', 'Merida eSpresso 300 SE'],
    system: SHIMANO_BIKES,
    rule: 'Charges Shimano STEPS BT-E8010 and BT-E8035 batteries (among others). Australian 240V mains.',
  },
  'Bosch 4A Standard Charger Smart System (BPC3400)': {
    system: BOSCH_BIKES,
    rule: 'Charger for Bosch Smart System batteries (2022 onward). Older Bosch bikes may use a different charger, so check your system generation.',
  },
  'Giant EnergyPak Smart Charger': {
    system: GIANT_BIKES,
    rule: 'Giant says it suits its newest EnergyPak systems. Confirm your battery generation with a Giant dealer.',
  },
  'Bosch Fast Charger 6A Smart System': {
    system: BOSCH_BIKES,
    rule: 'Fast charger for Bosch Smart System batteries (2022 onward). Older Bosch bikes may use a different charger.',
  },
  'Shimano STEPS 4A Fast Battery Charger': {
    system: SHIMANO_BIKES,
    rule: 'Fast charger for Shimano STEPS batteries. Confirm your battery code before ordering.',
  },
  // Scooters, boards, kids
  'Segway-Ninebot Fast Charger for MAX Scooters': {
    confirmed: ['Segway Ninebot Max G2 Pro'],
    rule: 'Segway lists its MAX fast charger for the MAX G30 and G2 families. It is not for the F-series or MAX G3 E.',
  },
  'Original Ninebot by Segway Scooter Charger 42V 1.7A': {
    confirmed: ['Xiaomi Mi Electric Scooter 1S'],
    rule: '42V 1.7A output, which matches the Xiaomi 1S pack voltage. Check your scooter label before ordering.',
  },
  'Multi-Voltage Charger for Kaabo, Dualtron, Apollo and Vsett Scooters': {
    confirmed: ['Dualtron Thunder 60V 35Ah', 'Kaabo Wolf Warrior X Plus (2026)'],
    system: MULTI_VOLT_SCOOTERS,
    rule: 'Seller lists it for Kaabo, Dualtron, Apollo, Vsett, Nami, Dragon and Bolzzen scooters. Choose the output (48V, 52V, 60V or 72V) that matches your battery pack.',
  },
  'Evolve 5A Charger for Hadean, Diablo and Renegade': {
    confirmed: ['Evolve Hadean Carbon All-Terrain', 'Evolve Hadean Bamboo All-Terrain'],
    rule: 'Evolve 5A charger for Hadean, Diablo and Renegade boards.',
  },
  'Onewheel Pint Car Charger': {
    confirmed: ['Onewheel Pint'],
    rule: 'Car charger for the Onewheel Pint only.',
  },
  'Stacyc 18V Smart Battery Charger': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Charges Stacyc 18V batteries. Factory Replica bikes are built on the Stacyc 12eDrive/16eDrive platform.',
  },
  'Dualtron Thunder 60V 35Ah Replacement Battery': {
    confirmed: ['Dualtron Thunder 60V 35Ah'],
    rule: '60V 35Ah pack for the Dualtron Thunder. Not for the Thunder 2 (72V 40Ah).',
  },
  'Evolve Replacement Trucks (Hadean, GT, GTR)': {
    confirmed: ['Evolve Hadean Carbon All-Terrain', 'Evolve Hadean Bamboo All-Terrain', 'Evolve Carbon GTR Street Series 2', 'Evolve Carbon GTR Series 2 All-Terrain', 'Evolve Bamboo GTR Series 2 Street'],
    rule: 'Evolve trucks for the Hadean, GT and GTR ranges.',
  },
  'Exway Riot 15mm Replacement Belt (Pair)': {
    confirmed: ['Exway Flex Riot Street Board', 'Exway Wave Riot Shortboard', 'Exway Wave Riot Plus Headlight Shortboard'],
    rule: '15mm belt pair for Exway Riot models.',
  },
  'Stacyc Replacement Throttle for 12eDrive and 16eDrive': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Throttle for Stacyc 12eDrive and 16eDrive bikes.',
  },
  'Xiaomi Scooter 8.5 x 2.0 Inner Tube with Bent Valve': {
    system: ['Xiaomi Mi Electric Scooter 1S'],
    rule: 'Fits 8.5 x 2.0 inch Xiaomi-style scooter tyres. Check your tyre size.',
  },
  // Fit-by-size parts (no model list: wheel size and valve type decide)
  'Entity Inner Tube 700c': { rule: 'Fits 700c wheels. Pick Presta or Schrader to match your rim and check the tyre width printed on the sidewall.' },
  'Freedom to Ride Schrader Tube 27.5 x 2.1-2.5': { rule: 'Fits 27.5 inch wheels with 2.1 to 2.5 inch tyres and a Schrader valve.' },
  'Schwalbe Marathon E-Plus 27.5 x 2.0 Wire Bead Tyre': { rule: 'Fits 27.5 x 2.0 inch wheels. Rated for e-bikes up to 50 km/h.' },
  'Schwalbe Marathon Plus 700C Wire Bead Tyre': { rule: 'Fits 700c wheels (check width on your current tyre). Rated for e-bikes up to 25 km/h.' },
  'Schwalbe Marathon Plus Tour Reflective 700C Tyre': { rule: 'Fits 700c wheels, 37-622 (28 x 1.40 inch). Rated for e-bikes up to 50 km/h.' },
  'Schwalbe Marathon Plus E-25 Hybrid Tyre 700 x 35c': { rule: 'Fits 700c wheels, 35c width. E-25 rated.' },
  'Tektro 180mm Disc Brake Rotor': { rule: '180mm 6-bolt disc rotor. Needs a caliper and adaptor set up for 180mm.' },
  'Shimano Deore RT56 6-Bolt Disc Rotor 160mm': { rule: '160mm 6-bolt rotor for use with resin (organic) pads.' },
  'Shimano SLX RT66 Disc Rotor 180mm': { rule: '180mm rotor. Needs a caliper and adaptor set up for 180mm.' },
  'SwissStop Disc 27E Brake Pads (Shimano/Tektro)': { rule: 'E-bike brake pads for several Shimano and Tektro hydraulic calipers. Match your caliper model before ordering.' },
  'Tektro Mechanical Disc Brake Pads': { rule: 'For Tektro Novela, IOX and Lyra mechanical disc brakes.' },
};
