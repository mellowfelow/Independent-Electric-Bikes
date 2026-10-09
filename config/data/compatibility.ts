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
  // Batteries for more vehicles (USD sources converted to AUD at 1.43)
  'Bosch PowerTube 500 Vertical Battery': { system: BOSCH_BIKES, rule: 'Bosch PowerTube 500Wh, vertical mount. Smart System generation: confirm the battery code and mount on your bike.' },
  'Bosch PowerTube 500 Horizontal Battery (BBP3750)': { system: BOSCH_BIKES, rule: 'Bosch PowerTube 500Wh BBP3750, horizontal mount (Smart System). Confirm your bike takes a horizontal PowerTube.' },
  'Bosch PowerTube 625 Horizontal Battery': { system: BOSCH_BIKES, rule: 'Bosch PowerTube 625Wh, horizontal mount. Confirm your bike takes a horizontal PowerTube.' },
  'Specialized U2-710 Battery (Turbo Tero, Vado and Como Gen 2)': {
    confirmed: ['Specialized Turbo Tero 3.0', 'Specialized Turbo Vado 4.0'],
    system: ['Specialized Turbo Vado 3.0', 'Specialized Turbo Como 3.0'],
    rule: 'Specialized says the 710Wh U2 fits all Turbo Tero and second-generation Vado and Como. It does not fit first-generation bikes or the SL range.',
  },
  'Lectric XPedition 2.0 Spare Battery': { system: ['Lectric XPedition Dual Battery'], rule: 'Spare pack for the Lectric XPedition 2.0. Confirm your bike generation with us.' },
  'Aventon Level Replacement Battery 48V 14Ah': {
    confirmed: ['Aventon Level 3 Step-Through', 'Aventon Level 3 Step-Over'],
    rule: '48V 14Ah (672Wh) Level pack. Not for the Soltera.2 (36V 360Wh). V1 Level bikes may need a V2 terminal.',
  },
  'Fiido C11 and C11 Pro Replacement Battery': {
    confirmed: ['Fiido C11 Step-Through', 'Fiido C11 Pro Long Range'],
    rule: 'Current C11 and C11 Pro battery. Older C11 packs with a black switch button are a different version.',
  },
  'Brompton Electric Replacement Battery 36V 8.55Ah (Original)': {
    system: ['Brompton Electric C Line 6-Speed'],
    rule: 'Original-generation Brompton Electric battery. Works with the original Brompton charger only.',
  },
  'Evolve Standard Electric Skateboard Battery': {
    system: ['Evolve Bamboo GTR Series 2 Street', 'Evolve Carbon GTR Series 2 All-Terrain', 'Evolve Carbon GTR Street Series 2', 'Evolve Hadean Bamboo All-Terrain', 'Evolve Hadean Carbon All-Terrain', 'Evolve Stoke Series 2 Shortboard', 'Evolve GTR Bamboo Series 2 All-Terrain', 'Evolve GTR Bamboo Series 2 Two-in-One', 'Evolve Fusion Bamboo Electric Skateboard', 'Evolve Diablo Bamboo Street'],
    rule: 'Evolve standard-range pack. Evolve board packs differ by model, so confirm yours with us (we work with an authorised Evolve service centre).',
  },
  'Hoverboard 36V 4.4Ah 10S2P Replacement Battery': {
    system: ['Bullet SX-2500 6.5 Inch Hoverboard', 'Bullet Gen III SX-3000 6.5 Inch Hoverboard', 'Vivid V500 6.5 Inch Street Hoverboard', 'E-Glide 65B Street Hoverboard'],
    rule: 'Generic 36V 4.4Ah pack for 6.5 inch hoverboards. Match the plug and pack size to your board.',
  },
  'Mobility Scooter 12V 35Ah AGM Replacement Battery': { rule: 'Fits by size: 12V 35Ah sealed lead-acid (AGM) mobility scooter battery. Match terminal type and dimensions to your current battery; most scooters use two in series.' },
  'InMotion V12 Charger 100.8V 2.3A': { confirmed: ['InMotion V12 HT High Torque EUC'], rule: '100.8V 2.3A GX16-5 pin charger for the InMotion V12.' },
  '100.8V 8A Rapid Charger for Begode EX.N, RS, Sherman and InMotion V12': { confirmed: ['InMotion V12 HT High Torque EUC'], rule: '100.8V 8A rapid charger, GX16-5 pin, for Begode EX.N, RS, Sherman and InMotion V12.' },
  '84.2V 5A Rapid Charger for KingSong 16X/18XL and InMotion V11/V10F': { confirmed: ['KingSong 16X High-Torque EUW', 'InMotion V11 Suspension EUC'], rule: '84.2V 5A rapid charger for KingSong 16X and 18XL, InMotion V11 and V10F.' },
  'InMotion V11 18 x 3 CST C-1488 Tyre': { confirmed: ['InMotion V11 Suspension EUC'], rule: '18 x 3 inch tyre for the InMotion V11 (also fits MSP and RS).' },
  // Replacement batteries above A$350 for brands that had none (USD at 1.43, EUR at 1.63)
  'Eunorau Universal 48V 15Ah Secondary Battery': { system: ["Eunorau META26 X2.0","Eunorau E-Fat-Step Pro","Eunorau G30 Max Cargo","Eunorau E-Fat-Step 20","Eunorau 1000W FAT-HD All-Terrain Fat Tyre E-Bike"], rule: 'Universal 48V 15Ah add-on pack with RA4, Bullet and XT60-F ports. Eunorau lists it for the FAT-AWD 3.0 and G20-Cargo; confirm the port and mount for your model.' },
  'Mokwheel Basalt Series Battery 48V 19.6Ah': { confirmed: ['Mokwheel Basalt Step-Thru', 'Mokwheel Basalt Deluxe ST'], rule: '48V 19.6Ah removable pack for the Mokwheel Basalt, Scoria, Obsidian and Onyx series.' },
  'DiroDi Rover G5-6 Battery 52V 20Ah': { confirmed: ['DiroDi Rover Plus Gen 6 Step-Thru'], rule: '52V 20Ah pack for DiroDi Rover generations 5 and 6.' },
  'DiroDi Rover Pro/Dual Battery 52V 20Ah': { confirmed: ['DiroDi Rover Gen 6 1000W Dual'], rule: '52V 20Ah pack for the DiroDi Rover Pro and Dual.' },
  'DiroDi Rover Gen 1-4 Battery 48V 17.4Ah': { system: ['DiroDi Rover Plus Low-Step 48V', 'DiroDi Rover Plus 750W'], rule: '48V 17.4Ah pack for DiroDi Rover generations 1 to 4. Check your generation and voltage first (Gen 1 250W bikes are 36V).' },
  'DiroDi Rover Gen 1-4 Battery 48V 15.6Ah': { system: ['DiroDi Rover Plus Low-Step 48V', 'DiroDi Rover Plus 750W'], rule: '48V 15.6Ah pack for DiroDi Rover generations 1 to 4. Check your generation and voltage first (Gen 1 250W bikes are 36V).' },
  'Rad Power Safe Shield Semi-Integrated Battery 14Ah': { confirmed: ['Rad Power RadWagon 4 Pro'], system: ['Rad Power RadExpand 5'], rule: '48V 14Ah (589 to 672Wh) Rad battery. It only works with Rad\'s updated charger, not older Rad or third-party chargers.' },
  'Pedego Long Range Cargo Battery 48V 20Ah': { system: ['Pedego Stretch Cargo'], rule: 'Genuine UL 2271 replacement for the Pedego Cargo. Confirm your battery voltage and connector.' },
  'Bosch PowerTube 750 Horizontal Battery (BBP3770)': { system: BOSCH_BIKES, rule: 'Bosch PowerTube 750Wh BBP3770, horizontal mount (Smart System). Mainly for cargo and touring bikes that take a 750Wh pack: confirm yours does.' },
  'Giant EnergyPak 500 Top Load Battery': { rule: "Giant lists it for MY17-18 e-bike models and MY19 FastRoad E+ and Quick E. Check your model year with a Giant dealer." },
  'Engwe EP-2 Pro Battery 13Ah': { confirmed: ['Engwe EP-2 Pro Fat Folder'], rule: '13Ah battery for the Engwe EP-2 Pro.' },
};
