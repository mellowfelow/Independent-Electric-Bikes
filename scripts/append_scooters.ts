import fs from 'fs';
import path from 'path';

function createProduct(
  name: string,
  price: number,
  category: string,
  subcategory: string,
  subSubcategory: string,
  badge: 'Best Seller' | 'Popular' | 'Best Value' | 'Premium' | 'Sale' | 'New' | 'none',
  motorType: 'Rear Hub' | 'Front Hub' | 'Mid-Drive' | 'Dual Motor' | 'Hub Drive',
  sensorType: 'Torque Sensor' | 'Cadence Sensor' | 'Gyroscopic' | 'Throttle',
  compliance: 'EN15194 Certified' | 'Off-Road Private Land' | 'CE Certified',
  brakeType: 'Hydraulic Disc' | 'Mechanical Disc' | 'Regenerative' | 'V-Brake',
  batteryRange: 'Under 50km' | '50km+ Long Range',
  motor: string,
  battery: string,
  range: string,
  topSpeed: string,
  brakes: string,
  weight: string,
  payload: string,
  frame: string,
  gears: string
) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    slug,
    name,
    price,
    category,
    subcategory,
    subSubcategory,
    badge,
    featured: false,
    filters: {
      motorType,
      sensorType,
      compliance,
      brakeType,
      batteryRange,
    },
    description: `${name} is engineered for Australian conditions with superior quality components, high torque motors, and reliable lithium battery tech.`,
    shortDescription: `${name} featuring high torque motor, heavy-duty frame, and long-range battery.`,
    images: [`https://picsum.photos/seed/${slug}/1200/900`],
    specs: {
      motor,
      battery,
      range,
      topSpeed,
      brakes,
      weight,
      payload,
      frame,
      gears,
    },
  };
}

const NEW_SCOOTERS = [
  // Commuter E-Scooters (15 items)
  createProduct('Segway Ninebot Max G2 Pro', 1399, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Best Seller', 'Rear Hub', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', '450W Nominal / 1000W Peak Rear Hub', '36V 15.3Ah 551Wh Lithium', 'Up to 70 km', '25 km/h (AU Compliant)', 'Front Drum + Rear Regenerative', '24.3 kg', '120 kg', 'Aviation-Grade Alloy Foldable', 'Single Speed Electric'),
  createProduct('Niu KQi3 Max Heavy Commuter', 1199, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Popular', 'Rear Hub', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', '450W Brushless Rear Motor', '48V 12.7Ah 608Wh Lithium', 'Up to 65 km', '25 km/h (AU Compliant)', 'Dual Disc Brakes + EBS', '21.1 kg', '120 kg', 'Aerospace Grade Aluminium', 'Single Speed Electric'),
  createProduct('E-TWOW GT SE Smart Commuter', 1299, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Best Value', 'Front Hub', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', '700W Peak Front Hub Drive', '48V 10.5Ah 504Wh LG', 'Up to 50 km', '25 km/h (AU Compliant)', 'Front E-ABS + Rear Drum', '13.0 kg', '110 kg', 'Ultralight Foldable Alloy Frame', 'Single Speed Electric'),
  createProduct('Inokim Quick 4 Super Commuter', 1899, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Premium', 'Rear Hub', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', '600W Nominal / 1100W Peak Rear Motor', '52V 16Ah 832Wh Samsung', 'Up to 70 km', '25 km/h (AU Compliant)', 'Dual Drum Brakes', '21.5 kg', '120 kg', 'High Tensile Aluminium Foldable', 'Single Speed Electric'),
  createProduct('Apollo City Pro 2026', 2299, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'New', 'Dual Motor', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', 'Dual 500W Motors (2000W Peak)', '48V 20Ah 960Wh Lithium', 'Up to 65 km', '25 km/h (AU Compliant)', 'Dual Drum + Power Regen Throttle', '29.5 kg', '120 kg', 'Triple-Sealed IP66 Hydroformed Alloy', 'Single Speed Dual Drive'),
  createProduct('Vsett 8+ Dual Motor Commuter', 1599, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Popular', 'Dual Motor', 'Throttle', 'CE Certified', 'Mechanical Disc', '50km+ Long Range', 'Dual 600W Motors (1600W Peak)', '48V 16Ah 768Wh Lithium', 'Up to 60 km', '25 km/h (AU Compliant)', 'Dual Drum + E-ABS', '21.0 kg', '120 kg', 'Aircraft-Grade 6061-T6 Folding', 'Single Speed Dual Drive'),
  createProduct('Mercane WideWheel Pro V2', 1499, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'none', 'Dual Motor', 'Throttle', 'CE Certified', 'Mechanical Disc', 'Under 50km', 'Dual 500W High Torque Hubs', '48V 15Ah 720Wh Lithium', 'Up to 45 km', '25 km/h (AU Compliant)', '120mm Dual Disc Brakes', '24.5 kg', '110 kg', 'Die-Cast Ultra-Wide Alloy', 'Single Speed Dual Drive'),
  createProduct('Navee S65C Suspension Scooter', 1199, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Best Value', 'Rear Hub', 'Throttle', 'CE Certified', 'Mechanical Disc', '50km+ Long Range', '450W Gearless Rear Hub', '48V 12.5Ah 600Wh Lithium', 'Up to 65 km', '25 km/h (AU Compliant)', 'Front Drum + Rear Disc + E-ABS', '27.0 kg', '120 kg', 'IPX5 Water Resistant Alloy Frame', 'Single Speed Electric'),
  createProduct('Segway P65S Urban Scooter', 1799, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Premium', 'Rear Hub', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', '500W Nominal / 980W Peak Rear Hub', '48V 12Ah 561Wh Battery', 'Up to 65 km', '25 km/h (AU Compliant)', 'Front Disc + Rear Electronic', '28.0 kg', '120 kg', 'Ergonomic Premium Urban Alloy', 'Single Speed Electric'),
  createProduct('Kaabo Mantis 8 Dual Motor', 1899, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Best Seller', 'Dual Motor', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', 'Dual 800W Brushless Hub Motors', '48V 18.2Ah 873Wh LG', 'Up to 70 km', '25 km/h (AU Compliant)', 'Dual Semi-Hydraulic Disc Brakes', '26.5 kg', '120 kg', 'Aviation 6061-T6 Aluminium', 'Single Speed Dual Drive'),
  createProduct('Fluid Freeride Horizon V2', 999, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Sale', 'Rear Hub', 'Throttle', 'CE Certified', 'Mechanical Disc', 'Under 50km', '500W Rear Hub Motor', '48V 13Ah 624Wh Battery', 'Up to 45 km', '25 km/h (AU Compliant)', 'Rear Drum + Regenerative Brake', '18.0 kg', '120 kg', 'Compact Foldable Alloy Frame', 'Single Speed Electric'),
  createProduct('Pure Air3 Pro LR Scooter', 899, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Best Value', 'Rear Hub', 'Throttle', 'CE Certified', 'Mechanical Disc', '50km+ Long Range', '500W Peak Power Rear Engine', '37V 9.6Ah 355Wh Battery', 'Up to 50 km', '25 km/h (AU Compliant)', 'Front Drum + Rear E-ABS', '16.9 kg', '120 kg', 'Tubular Steel IP65 Waterproof', 'Single Speed Electric'),
  createProduct('EMove Touring Portable Scooter', 1299, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'Popular', 'Rear Hub', 'Throttle', 'CE Certified', 'Mechanical Disc', '50km+ Long Range', '500W Rear Hub Drive', '48V 13Ah 624Wh LG Cells', 'Up to 50 km', '25 km/h (AU Compliant)', 'Front Drum + Rear Drum + E-ABS', '17.0 kg', '140 kg', 'High Load Compact Foldable Alloy', 'Single Speed Electric'),
  createProduct('Zero 8X Compact Dual', 1699, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'none', 'Dual Motor', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', 'Dual 800W High Power Motors', '52V 18Ah 936Wh Battery', 'Up to 65 km', '25 km/h (AU Compliant)', 'Dual Disc Brakes + E-ABS', '33.0 kg', '120 kg', 'Forged Aluminium Heavy Duty', 'Single Speed Dual Drive'),
  createProduct('Mukuta 8 Dual Motor Commuter', 1799, 'electric-scooters', 'commuter-electric-scooters', 'commuter-electric-scooters', 'New', 'Dual Motor', 'Throttle', 'CE Certified', 'Hydraulic Disc', '50km+ Long Range', 'Dual 600W Brushless Hub Motors', '48V 15.6Ah 748Wh Battery', 'Up to 60 km', '25 km/h (AU Compliant)', 'Dual Hydraulic Disc Brakes', '25.0 kg', '120 kg', 'Aircraft Grade Foldable Alloy', 'Single Speed Dual Drive'),

  // Long-Range & Performance E-Scooters (15 items)
  createProduct('Segway GT2 SuperScooter', 4499, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Premium', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1500W Nominal / 6000W Peak', '50.4V 30Ah 1512Wh Premium', 'Up to 90 km', '25 km/h (AU Compliant)', 'Front & Rear Hydraulic Disc 140mm', '52.0 kg', '150 kg', 'Aviation Grade Aluminium SDT', 'Dual Drive Dynamic Select'),
  createProduct('InMotion RS Performance Beast', 4999, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Premium', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 2000W / 8400W Peak Motors', '72V 40Ah 2880Wh LG Cells', 'Up to 120 km', '25 km/h (AU Compliant)', 'Dual Hydraulic 4-Piston Brakes', '58.0 kg', '150 kg', 'Transforming Hydroformed Alloy Frame', 'Dual Drive Multi-Level Selector'),
  createProduct('Vsett 10+ Apex Super Scooter', 3299, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Best Seller', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1400W Motors (4200W Peak)', '60V 28Ah 1680Wh LG', 'Up to 90 km', '25 km/h (AU Compliant)', 'Dual ZOOM Hydraulic Disc Brakes', '36.0 kg', '130 kg', 'Forged Aluminium Heavy Duty Frame', 'Dual Drive Sport Turbo Select'),
  createProduct('Kaabo Wolf King GTR Extreme', 5999, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Best Seller', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 2000W Motors (13440W Peak)', '72V 35Ah 2520Wh LG Detachable', 'Up to 130 km', '25 km/h (AU Compliant)', 'Dual Hydraulic 4-Piston Disc 160mm', '62.0 kg', '150 kg', 'Dual-Stem Aircraft Grade Chassis', 'Dual Drive Infinite Torque Select'),
  createProduct('Dualtron Thunder 3 Super Beast', 5499, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Popular', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 2500W Motors (11000W Peak)', '72V 40Ah 2880Wh LG Cells', 'Up to 125 km', '25 km/h (AU Compliant)', 'Nutt 4-Piston Hydraulic Disc', '57.0 kg', '150 kg', 'Heavy Duty Forged Aluminium Chassis', 'Dual Drive Turbo Select'),
  createProduct('Apollo Pro 72V Hyper Scooter', 5299, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'New', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1200W Motors (6000W Peak)', '52V 30Ah 1560Wh Samsung', 'Up to 100 km', '25 km/h (AU Compliant)', 'Dual Hydraulic + Regen Braking', '42.0 kg', '150 kg', 'Unibody Aerospace Frame IP66', 'Dual Drive Smart Torque Select'),
  createProduct('Inokim OXO Super Performance', 3699, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'none', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1000W Brushless Gearless Motors', '60V 25.6Ah 1536Wh LG', 'Up to 110 km', '25 km/h (AU Compliant)', 'Front & Rear Hydraulic Disc 140mm', '33.5 kg', '120 kg', 'Patented OSAP Single-Sided Alloy', 'Single / Dual Drive Selector'),
  createProduct('Teverun Fighter Supreme 72V', 4899, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Premium', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 2000W Motors (8000W Peak)', '72V 35Ah 2520Wh SK Battery', 'Up to 120 km', '25 km/h (AU Compliant)', 'Full Hydraulic 4-Piston Disc', '45.0 kg', '150 kg', 'Hydroformed Aircraft Alloy Chassis', 'Dual Drive Smart Controller Select'),
  createProduct('Mukuta 10 Dual Performance', 2899, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Best Value', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1000W Motors (4300W Peak)', '60V 20.8Ah 1248Wh Battery', 'Up to 80 km', '25 km/h (AU Compliant)', 'Hydraulic Disc Brakes + E-ABS', '36.0 kg', '130 kg', 'Quad-Suspension Heavy Alloy', 'Dual Drive Sport Select'),
  createProduct('Dragon X8 Pro Dual Motor', 1999, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Best Value', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1000W High Torque Motors', '48V 21Ah 1008Wh LG Cells', 'Up to 75 km', '25 km/h (AU Compliant)', 'Dual Hydraulic Disc 140mm', '30.0 kg', '140 kg', 'Australian Designed All-Terrain Alloy', 'Dual Drive Selector Switch'),
  createProduct('Apollo Phantom V4 60V', 3499, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Popular', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1400W Motors (4400W Peak)', '60V 21Ah 1260Wh Battery', 'Up to 80 km', '25 km/h (AU Compliant)', 'Nutt Full Hydraulic Disc', '35.0 kg', '135 kg', 'Quad-Spring Quadruple Alloy', 'Dual Drive Mach1 Controller'),
  createProduct('EMove Cruiser S Long Range', 2299, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Best Seller', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '1000W Nominal / 1600W Peak Rear Engine', '52V 30Ah 1560Wh LG Cells', 'Up to 100 km', '25 km/h (AU Compliant)', 'Dual Hydraulic Disc Brakes', '23.5 kg', '160 kg', 'Heavy-Load IPX6 Waterproof Alloy', 'Single Speed Long Haul Drive'),
  createProduct('Segway P100S Long Range', 2899, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'none', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '650W Nominal / 1350W Peak Rear Hub', '47.2V 25Ah 1200Wh Battery', 'Up to 100 km', '25 km/h (AU Compliant)', 'Dual Hydraulic Disc Brakes', '32.9 kg', '120 kg', 'Torsion Bar Suspension Alloy Frame', 'Single Speed Power Select'),
  createProduct('Nami Burn-E 2 Max Hyper', 6299, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'Premium', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1500W Motors (8400W Peak)', '72V 32Ah 2304Wh Panasonic', 'Up to 140 km', '25 km/h (AU Compliant)', 'Logan 4-Piston Hydraulic Disc', '47.0 kg', '150 kg', 'Hand-Welded Tubular Aviation Frame', 'Dual Drive 50A Sine-Wave Controller'),
  createProduct('Solar EQ Dual Motor Off-Road', 2799, 'electric-scooters', 'long-range-electric-scooters', 'long-range-electric-scooters', 'New', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', 'Dual 1200W Motors (4000W Peak)', '52V 20Ah 1040Wh Battery', 'Up to 75 km', '25 km/h (AU Compliant)', 'Dual Hydraulic Disc Brakes', '34.0 kg', '140 kg', 'All-Terrain Dual Spring Alloy', 'Dual Drive Turbo Select'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'scooters.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_SCOOTERS.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 30 new e-scooters to config/data/scooters.ts');
} else {
  console.error('Could not find closing bracket in scooters.ts');
}
