// Which batteries, chargers and parts suit which vehicles in the catalogue. Names must match product names in config/data.
// Two levels, always shown to customers as such:
//  - confirmed: the manufacturer or retailer page names this model (or its exact battery/charger) as compatible.
//  - system: same drive system or platform; battery generation, mount or voltage must still be checked against the bike's label.
// Audited 2026-10-10 against: Trek, Cube, Cannondale, Tern, Riese & Muller, Giant, Merida, Segway, Rad Power, Pedego, Eunorau,
// Mokwheel, DiroDi, Brompton, Bosch and Shimano help pages, 99spokes (drive systems); 99 Bikes, Pushys, PedL, Scooter Hut,
// Twelve Board Store, Exway, Stacyc Australia (part fitment). Where a source did not name the model, the fit is `system`.

export interface PartFit {
  /** Models the seller or manufacturer names as compatible. */
  confirmed?: string[];
  /** Models that use the same drive system or platform. */
  system?: string[];
  /** Short fitment rule shown on the card. */
  rule: string;
}

/** Bikes on a Bosch drive system. Used for chargers (which work across PowerPack and PowerTube). */
export const BOSCH_BIKES = [
  'Trek Allant+ 5', 'Trek Allant+ 8 ST', 'Trek Rail 5 Gen 3', 'Trek Rail 9.8 GX AXS',
  'Cube Touring Hybrid ONE', 'Cube Touring Hybrid ONE 400', 'Cube Touring Hybrid Pro 500', 'Cube Kathmandu Hybrid Pro 600',
  'Cannondale Adventure Neo 4', 'Cannondale Cargowagen Neo 2',
  'Gazelle Arroyo C7 HMB', 'Gazelle Ultimate C380 HMB', 'Gazelle Medeo T9 HMB',
  'Tern GSD S10 LX', 'Tern GSD S00 LX Cargo Plus', 'Tern HSD P9', 'Tern HSD P9 Performance', 'Tern Vektron Q9 Folding', 'Tern Vektron S10 Gen 2',
  'Riese & Müller Load 4 75', 'Riese & Müller Multicharger2', 'Riese & Müller Multicharger3 Mixte', 'Riese & Müller Packster 70 Vario',
];

/**
 * Bosch bikes whose manufacturer page names a frame-integrated PowerTube battery. Bikes with a rack-mounted PowerPack
 * (Gazelle Medeo and Arroyo, Tern Vektron, Cannondale Cargowagen) are left out because a PowerTube does not fit them.
 */
export const BOSCH_POWERTUBE_BIKES = [
  'Trek Allant+ 8 ST',
  'Cube Touring Hybrid ONE', 'Cube Touring Hybrid ONE 400', 'Cube Touring Hybrid Pro 500', 'Cube Kathmandu Hybrid Pro 600',
  'Cannondale Adventure Neo 4', 'Gazelle Ultimate C380 HMB',
  'Riese & Müller Load 4 75', 'Riese & Müller Multicharger2', 'Riese & Müller Multicharger3 Mixte', 'Riese & Müller Packster 70 Vario',
];

/** Riese & Muller lists a 750Wh PowerTube / DualBattery option on these. */
export const BOSCH_750_BIKES = ['Riese & Müller Load 4 75', 'Riese & Müller Multicharger3 Mixte', 'Riese & Müller Packster 70 Vario'];

export const SHIMANO_BIKES = [
  'Merida eSpresso City 300 EQ', 'Merida eSpresso City 200 EQ', 'Merida eSpresso 400', 'Merida eSpresso 300 SE',
  'Merida eOne-Forty 400', 'Merida eOne-Sixty 7000', 'Merida eBig.Nine 400',
];

/** Merida pages name a 504Wh BT-E8010/E8035 battery for these. */
const SHIMANO_504_BIKES = ['Merida eSpresso City 300 EQ', 'Merida eOne-Sixty 7000'];

export const GIANT_BIKES = ['Giant Explore E+ 4', 'Giant Explore E+ 3 Power', 'Giant Trance X Advanced E+ 2', 'Giant Reign E+ 1 Pro'];

/** Scooters the seller lists for the multi-voltage charger. Pack voltage must still match one of its outputs. */
export const MULTI_VOLT_SCOOTERS = [
  'Kaabo Mantis 8 Dual Motor', 'Kaabo Mantis 10 Plus V2 Dual Motor', 'Kaabo Wolf King GTR Extreme',
  'Dualtron Eagle Pro 60V', 'Dualtron Thunder 3 Super Beast',
  'Apollo City Pro 2026', 'Apollo Pro 72V Hyper Scooter', 'Apollo Phantom V4 60V',
  'Vsett 8+ Dual Motor Commuter', 'Vsett 10+ Apex Super Scooter', 'Nami Klima Dual 1000W', 'Nami Burn-E 2 Max Hyper',
  'Dragon Raptor All Terrain Dual', 'Dragon Lightning V2 Dual Motor', 'Dragon GTR V2 2400W Max', 'Dragon Cyclone Pro All Terrain', 'Dragon X8 Pro Dual Motor',
  'Bolzzen Atom Lite e-Scooter', 'Bolzzen Atom Pro e-Scooter',
];

export const STACYC_BIKES = ['Stacyc 12eDrive Balance Bike', 'Stacyc 16eDrive Brushless Pro'];
const STACYC_FAMILY = ['KTM Factory Replica 16eDrive', 'Husqvarna Factory Replica 12eDrive', 'GASGAS Factory Replica 16eDrive'];

/** Evolve's own battery page lists GTR and Hadean variants only (not Stoke, Fusion or Diablo). */
const EVOLVE_GTR_HADEAN = [
  'Evolve Bamboo GTR Series 2 Street', 'Evolve Carbon GTR Series 2 All-Terrain', 'Evolve Carbon GTR Street Series 2',
  'Evolve Hadean Bamboo All-Terrain', 'Evolve Hadean Carbon All-Terrain',
  'Evolve GTR Bamboo Series 2 All-Terrain', 'Evolve GTR Bamboo Series 2 Two-in-One',
];

export const PART_FITS: Record<string, PartFit> = {
  // E-bike batteries and chargers
  'Shimano STEPS BT-E8035 Integrated Down Tube Battery 504Wh': {
    confirmed: ['Merida eBig.Nine 400'],
    system: SHIMANO_504_BIKES,
    rule: 'Shimano STEPS 504Wh down-tube battery (36V 14Ah). Check your bike for BT-E8035 or the -L variant and the mount. Charge with the EC-E6002 or EC-E8004.',
  },
  'Shimano STEPS BT-E8010 Down Tube Battery 504Wh': {
    confirmed: ['Merida eSpresso 300 SE'],
    system: SHIMANO_504_BIKES,
    rule: 'Shimano STEPS 504Wh down-tube battery. Merida pages show different battery codes for the same model across markets, so confirm the code printed on your current pack.',
  },
  'Shimano STEPS EC-E6002 Battery Charger': {
    confirmed: ['Merida eBig.Nine 400', 'Merida eSpresso 300 SE'],
    system: SHIMANO_BIKES,
    rule: 'Charges Shimano STEPS BT-E8010 and BT-E8035 batteries (among others). Australian 240V mains.',
  },
  'Shimano STEPS 4A Fast Battery Charger': {
    system: SHIMANO_BIKES,
    rule: 'Shimano EC-E8004, 4A. Charges BT-E8010 directly; BT-E8035, BT-E8035-L and BT-E8036 need the SM-BTE80 adapter (not included).',
  },
  'Bosch 4A Standard Charger Smart System (BPC3400)': {
    system: BOSCH_BIKES,
    rule: 'Charger for Bosch Smart System batteries (PowerTube 500, 625, 750 and PowerPack 545, 725), 4A. Older Bosch systems use a different charger, so check your system generation.',
  },
  'Bosch Fast Charger 6A for System 2 Batteries': {
    system: BOSCH_BIKES,
    rule: 'Bosch 6A fast charger for System 2 / Active and Performance Line PowerPack and PowerTube batteries (current software needed for 6A; older batteries charge at 4A). Not confirmed for Smart System batteries: use the 4A BPC3400 for those.',
  },
  'Giant EnergyPak Smart Charger': {
    system: GIANT_BIKES,
    rule: 'Giant says it suits its newest EnergyPak systems. Confirm your battery generation with a Giant dealer.',
  },
  'Bosch PowerTube 500 Vertical Battery': {
    system: BOSCH_POWERTUBE_BIKES,
    rule: 'Bosch PowerTube 500Wh, vertical mount, Smart System. For frame-integrated PowerTube bikes only (not rack-mounted PowerPack bikes). Confirm your battery code, mount and system generation.',
  },
  'Bosch PowerTube 500 Horizontal Battery (BBP3750)': {
    system: BOSCH_POWERTUBE_BIKES,
    rule: 'Bosch PowerTube 500Wh BBP3750, horizontal mount, Smart System. For frame-integrated PowerTube bikes only. Confirm your bike takes a horizontal Smart System PowerTube.',
  },
  'Bosch PowerTube 625 Horizontal Battery': {
    system: BOSCH_POWERTUBE_BIKES,
    rule: 'Bosch PowerTube 625Wh, horizontal mount. For frame-integrated PowerTube bikes only. Confirm your bike takes a horizontal PowerTube and your system generation.',
  },
  'Bosch PowerTube 750 Horizontal Battery (BBP3770)': {
    system: BOSCH_750_BIKES,
    rule: 'Bosch PowerTube 750Wh BBP3770, horizontal mount, Smart System. Riese & Müller lists a 750Wh PowerTube option on these models; confirm yours takes one.',
  },
  'Specialized U2-710 Battery (Turbo Tero, Vado and Como Gen 2)': {
    confirmed: ['Specialized Turbo Tero 3.0', 'Specialized Turbo Vado 4.0'],
    system: ['Specialized Turbo Vado 3.0', 'Specialized Turbo Como 3.0'],
    rule: 'Specialized says the 710Wh U2 fits all Turbo Tero and second-generation Vado and Como (an upgrade on the 530Wh pack some Tero fit). It does not fit first-generation bikes or the SL range.',
  },
  'Lectric XPedition 2.0 Spare Battery': { system: ['Lectric XPedition Dual Battery'], rule: 'Spare pack for the Lectric XPedition 2.0. Confirm your bike generation with us.' },
  'Aventon Level Replacement Battery 48V 14Ah': {
    confirmed: ['Aventon Level 3 Step-Through', 'Aventon Level 3 Step-Over'],
    rule: '48V 14Ah (672Wh) Level pack, also listed for Abound and Level 3/4. Not for the Soltera.2 (36V 360Wh). V1 Level bikes may need a V2 terminal.',
  },
  'Fiido C11 and C11 Pro Replacement Battery': {
    confirmed: ['Fiido C11 Step-Through', 'Fiido C11 Pro Long Range'],
    rule: 'Current C11 and C11 Pro battery. Older C11 packs with a black switch button are a different version.',
  },
  'Brompton Electric Replacement Battery 36V 8.55Ah (Original)': {
    system: ['Brompton Electric C Line 6-Speed'],
    rule: 'Original 36V 8.55Ah (300Wh) Brompton Electric battery, listed for bikes through about 2023. Works with the original Brompton charger only. Current C Line and P Line bikes use the 345Wh Greenway pack instead.',
  },
  'Eunorau Universal 48V 15Ah Secondary Battery': {
    system: ['Eunorau G30 Max Cargo', 'Eunorau 1000W FAT-HD All-Terrain Fat Tyre E-Bike'],
    rule: 'Universal 48V 15Ah add-on pack with RA4, Bullet and XT60-F ports. Eunorau lists it for the FAT-AWD 3.0 and G20-Cargo; its G30 Cargo and fat-tyre bikes use the same 48V family but confirm the port and mount.',
  },
  'Mokwheel Basalt Series Battery 48V 19.6Ah': {
    confirmed: ['Mokwheel Basalt Step-Thru', 'Mokwheel Basalt Deluxe ST'],
    rule: '48V 19.6Ah removable pack for the Mokwheel Basalt, Scoria, Obsidian and Onyx series.',
  },
  'DiroDi Rover G5-6 Battery 52V 20Ah': {
    confirmed: ['DiroDi Rover Gen 6 1000W Dual'],
    system: ['DiroDi Rover Plus Gen 6 Step-Thru'],
    rule: '52V 20Ah pack for DiroDi Rover Gen 5 and 6 in 500W and 1000W. The Gen 6 250W uses a 48V 20Ah pack instead, so check your motor size.',
  },
  'DiroDi Rover Pro/Dual Battery 52V 20Ah': {
    system: ['DiroDi Rover Gen 6 1000W Dual'],
    rule: '52V 20Ah pack listed for the DiroDi Rover Pro and Dual. Confirm your model and generation with us.',
  },
  'DiroDi Rover Gen 1-4 Battery 48V 17.4Ah': {
    confirmed: ['DiroDi Rover Plus 750W'],
    system: ['DiroDi Rover Plus Low-Step 48V'],
    rule: '48V 17.4Ah pack for DiroDi Rover generations 1 to 4 (the 750W Plus uses it). Check your generation and voltage first: Gen 1 250W bikes are 36V.',
  },
  'DiroDi Rover Gen 1-4 Battery 48V 15.6Ah': {
    system: ['DiroDi Rover Plus Low-Step 48V', 'DiroDi Rover Plus 750W'],
    rule: '48V 15.6Ah pack for DiroDi Rover generations 1 to 4. Check your generation and voltage first: Gen 1 250W bikes are 36V.',
  },
  'Rad Power Safe Shield Semi-Integrated Battery 14Ah': {
    system: ['Rad Power RadWagon 4 Pro'],
    rule: '48V 14Ah (589 to 672Wh) semi-integrated Rad battery. Rad lists the RadWagon 4 for both external and semi-integrated packs and the RadExpand 5 for external packs, so confirm which style your bike takes. Works only with Rad\'s updated charger.',
  },
  'Pedego Long Range Cargo Battery 48V 20Ah': {
    rule: 'Secondary range-extender for the Pedego Cargo only. Pedego says it cannot be used with other Pedego models and verifies Cargo ownership before shipping. Not listed for any bike on this site.',
  },
  'Giant EnergyPak 500 Top Load Battery': { rule: 'Giant lists it for MY17-18 e-bike models and MY19 FastRoad E+ and Quick E. Check your model year with a Giant dealer. Not listed for any bike on this site.' },
  'Engwe EP-2 Pro Battery 13Ah': { confirmed: ['Engwe EP-2 Pro Fat Folder'], rule: '13Ah battery for the Engwe EP-2 Pro (a 17.5Ah upgrade also exists).' },
  // Scooters, boards, kids
  'Segway-Ninebot Fast Charger for MAX Scooters': {
    system: ['Segway Ninebot Max G2 Pro'],
    rule: 'Segway lists its MAX fast charger for the MAX G30 family and G2 E/D. It does not name the G2 Pro, and it is not for the F-series or MAX G3 E.',
  },
  'Original Ninebot by Segway Scooter Charger 42V 1.7A': {
    confirmed: ['Xiaomi Mi Electric Scooter 1S'],
    rule: '42V 1.7A output, which matches the Xiaomi 1S pack voltage. Check your scooter label before ordering.',
  },
  'Multi-Voltage Charger for Kaabo, Dualtron, Apollo and Vsett Scooters': {
    confirmed: ['Dualtron Thunder 60V 35Ah', 'Kaabo Wolf Warrior X Plus (2026)'],
    system: MULTI_VOLT_SCOOTERS,
    rule: 'Seller lists it for Kaabo, Dualtron, Apollo, Vsett, Nami, Dragon and Bolzzen scooters, with 48V (54.6V 2A), 60V (67.2V 1.75A), 52V and 72V outputs. Choose the output that matches your battery pack. It is not for 84V packs, and the connector is not checked for every brand.',
  },
  'Evolve 5A Charger for Hadean, Diablo and Renegade': {
    confirmed: ['Evolve Hadean Carbon All-Terrain', 'Evolve Hadean Bamboo All-Terrain'],
    rule: 'Evolve 5A charger for Hadean, Diablo and Renegade boards.',
  },
  'Evolve Standard Electric Skateboard Battery': {
    confirmed: EVOLVE_GTR_HADEAN,
    rule: 'Evolve standard pack in 14Ah (GTR) and 16Ah (Hadean) versions. Choose the version for your board. It is not listed for the Stoke, Fusion or Diablo.',
  },
  'Evolve Replacement Trucks (Hadean, GT, GTR)': {
    confirmed: ['Evolve Hadean Carbon All-Terrain', 'Evolve Hadean Bamboo All-Terrain', 'Evolve Carbon GTR Street Series 2', 'Evolve Carbon GTR Series 2 All-Terrain', 'Evolve Bamboo GTR Series 2 Street', 'Evolve GTR Bamboo Series 2 All-Terrain', 'Evolve GTR Bamboo Series 2 Two-in-One'],
    rule: 'Evolve trucks for the Hadean, GT and GTR ranges.',
  },
  'Exway Riot 15mm Replacement Belt (Pair)': {
    confirmed: ['Exway Flex Riot Street Board', 'Exway Wave Riot Shortboard', 'Exway Wave Riot Plus Headlight Shortboard'],
    rule: '15mm HTD 5M belt pair, 255mm (the standard length on Flex and Wave Riot boards with a 36T pulley). Boards with a 28T pulley need 230mm belts.',
  },
  'Onewheel Pint Car Charger': { confirmed: ['Onewheel Pint'], rule: 'Car charger for the Onewheel Pint only.' },
  'Stacyc 18V Smart Battery Charger': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Charges Stacyc 18V batteries (12eDrive and 16eDrive). Factory Replica bikes are built on the same platform.',
  },
  'Stacyc Replacement Throttle for 12eDrive and 16eDrive': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Throttle for Stacyc 12eDrive and 16eDrive bikes.',
  },
  'Dualtron Thunder 60V 35Ah Replacement Battery': {
    confirmed: ['Dualtron Thunder 60V 35Ah'],
    rule: '60V 35Ah pack for the Dualtron Thunder. Not for the Thunder 2 (72V 40Ah) or Thunder 3 (72V 40Ah).',
  },
  'Xiaomi Scooter 8.5 x 2.0 Inner Tube with Bent Valve': {
    system: ['Xiaomi Mi Electric Scooter 1S'],
    rule: 'Fits 8.5 x 2.0 inch scooter tyres (Xiaomi-style, bent valve). Check your tyre size.',
  },
  'Hoverboard 36V 4.4Ah 10S2P Replacement Battery': {
    rule: 'Generic 36V 10S2P 4.4Ah (18650) pack, about 135 x 75 x 58 mm. Not matched to a board on this site: retailers list 36V for the Bullet SX-2500 but not its capacity or pack size, and none state it for the SX-3000, Vivid V500 or E-Glide 65B. Check your board\'s battery label, size and plug first.',
  },
  'Mobility Scooter 12V 35Ah AGM Replacement Battery': { rule: 'Fits by size: 12V 35Ah sealed lead-acid (AGM) mobility scooter battery. Match terminal type and dimensions to your current battery; most scooters use two in series. Not matched to a model on this site.' },
  'InMotion V12 Charger 100.8V 2.3A': { confirmed: ['InMotion V12 HT High Torque EUC'], rule: '100.8V 2.3A GX16-5 pin charger for the InMotion V12.' },
  '100.8V 8A Rapid Charger for Begode EX.N, RS, Sherman and InMotion V12': { confirmed: ['InMotion V12 HT High Torque EUC'], rule: '100.8V 8A rapid charger, GX16-5 pin, for Begode EX.N, RS, Sherman and InMotion V12.' },
  '84.2V 5A Rapid Charger for KingSong 16X/18XL and InMotion V11/V10F': { confirmed: ['KingSong 16X High-Torque EUW', 'InMotion V11 Suspension EUC'], rule: '84.2V 5A rapid charger for KingSong 16X and 18XL, InMotion V11 and V10F.' },
  'InMotion V11 18 x 3 CST C-1488 Tyre': { confirmed: ['InMotion V11 Suspension EUC'], rule: '18 x 3 inch tyre for the InMotion V11 (also fits MSP and RS).' },
  'Bosch SmartphoneGrip Smart System Mount': { system: BOSCH_BIKES, rule: 'Works only with Bosch Smart System bikes (2022 onward), not older Bosch systems. Check that your bike has the Smart System before ordering.' },
  'Razor MX650 12V 12Ah Sealed Lead Acid Battery (3-Pack)': {
    confirmed: ['Razor MX650 Dirt Rocket Pit Bike'],
    rule: 'Three 12V 12Ah sealed lead-acid batteries (36V in series). The retailer lists this pack for the Razor MX650 and MX500. Charge with the original Razor 36V charger. Not for lithium-powered bikes.',
  },
  'Stacyc 18V 5Ah Battery': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Stacyc 18V (20V max) 5Ah battery for the 18V platform. The 16eDrive ships with a 4Ah pack, so confirm the pack size you need. Not for the 36V 16eDrive Elite, 18eDrive or 20eDrive.',
  },
  // Conversion kits
  'Bafang BBS02B 48V 750W Mid-Drive Conversion Kit': { rule: 'Fits bikes with a threaded 68 to 73mm bottom bracket shell (33.5mm inner diameter). 750W is above the 250W limit for road e-bikes in Australia: for private land or off-road use. Not matched to a bike on this site.' },
  'Bafang BBSHD 48V 1000W Mid-Drive Conversion Kit': { rule: 'Sold for a 68mm bottom bracket shell (73mm and 100mm versions also exist, so confirm your shell width). 1000W is above the 250W limit for road e-bikes in Australia: for private land or off-road use. Not matched to a bike on this site.' },
  // Fit-by-size parts (no model list: wheel size, valve type and brake mount decide)
  'Entity Inner Tube 700c': { rule: 'Fits 700c wheels. Pick Presta or Schrader to match your rim and check the tyre width printed on the sidewall.' },
  'Freedom to Ride Schrader Tube 27.5 x 2.1-2.5': { rule: 'Fits 27.5 inch wheels with 2.1 to 2.5 inch tyres and a Schrader valve.' },
  'Schwalbe Marathon E-Plus 27.5 x 2.0 Wire Bead Tyre': { rule: 'Fits 27.5 x 2.0 inch wheels. ECE-R75 e-bike rated (E-50, up to 50 km/h).' },
  'Schwalbe Marathon Plus 700C Wire Bead Tyre': { rule: 'Fits 700c wheels (check the width on your current tyre). E-bike rated (E-25; some sizes E-50): confirm the rating for your size.' },
  'Schwalbe Marathon Plus Tour Reflective 700C Tyre': { rule: 'Fits 700c wheels, 37-622 (28 x 1.40 inch). E-bike rated (E-50, up to 50 km/h).' },
  'Schwalbe Marathon Plus E-25 Hybrid Tyre 700 x 35c': { rule: 'Fits 700c wheels, 35c width. E-25 rated (up to 25 km/h).' },
  'Tektro 180mm Disc Brake Rotor': { rule: '180mm disc rotor. Confirm 6-bolt or Centerlock for your hub, and that your caliper and adaptor are set up for 180mm.' },
  'Shimano Deore RT56 6-Bolt Disc Rotor 160mm': { rule: '160mm 6-bolt rotor for use with resin (organic) pads.' },
  'Shimano SLX RT66 Disc Rotor 180mm': { rule: '180mm Shimano rotor. Confirm 6-bolt or Centerlock for your hub, and that your caliper and adaptor are set up for 180mm.' },
  'SwissStop Disc 27E Brake Pads (Shimano/Tektro)': { rule: 'E-bike brake pads for several Shimano and Tektro hydraulic calipers. Match your caliper model before ordering.' },
  'Tektro Mechanical Disc Brake Pads': { rule: 'For Tektro Novela, IOX and Lyra mechanical disc brakes.' },
};
