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

const NEW_MOBILITY = [
  // Travel & Folding Mobility Scooters (8 items)
  createProduct('Pride Mobility Go-Go LX Travel', 2899, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Best Seller', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '24V DC Sealed Motor Drive', '24V 12Ah SLA / Lithium Option', 'Up to 20 km', '10 km/h (AU Limit)', 'Intelligent Electromagnetic Braking', '38.0 kg (Disasssembles)', '136 kg', 'CTS Independent Suspension Alloy', 'Variable Speed Dial'),
  createProduct('Drive Medical Scout 4 Travel Scooter', 2299, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Best Value', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '270W Sealed Rear Motor', '24V 20Ah Quick Connect', 'Up to 24 km', '10 km/h (AU Limit)', 'Electromagnetic Auto-Brake', '43.0 kg (Disassembles)', '135 kg', 'Steel Quick-Disassembly Frame', 'Variable Speed Dial'),
  createProduct('Solax Transformer Auto-Folding Scooter', 3899, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Premium', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '120W Rear Hub Motor Drive', '24V 10Ah Airline Approved Lithium', 'Up to 20 km', '10 km/h (AU Limit)', 'Electromagnetic Safety Brake', '24.0 kg', '125 kg', 'Automatic Remote Folding Alloy', 'Variable Speed Throttle'),
  createProduct('Merits Roadster 4 Portable Scooter', 2499, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Popular', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '250W Rear Sealed Transaxle', '24V 18Ah Quick Battery', 'Up to 22 km', '10 km/h (AU Limit)', 'Electromagnetic Disc Brake', '41.0 kg', '136 kg', 'Compact Disassembling Frame', 'Variable Speed Control'),
  createProduct('Tzora Titan Hummer Folding Scooter', 4299, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'New', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '400W High Torque Motor', '24V 14Ah Lithium Pack', 'Up to 30 km', '10 km/h (AU Limit)', 'Electromagnetic Auto Brake', '31.0 kg', '136 kg', 'Heavy Duty Folding 4-Wheel Alloy', 'Variable Speed Throttle'),
  createProduct('Shoprider Echo 3 Portable Scooter', 1899, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Sale', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '200W Rear Hub Transaxle', '24V 10Ah Battery Pack', 'Up to 15 km', '10 km/h (AU Limit)', 'Electromagnetic Brake', '32.0 kg', '115 kg', 'Lightweight 3-Wheel Alloy', 'Variable Speed Dial'),
  createProduct('Monarch Buzzaround EX Heavy Travel', 3499, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'none', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '320W High Output Transaxle', '24V 22Ah Heavy Duty SLA', 'Up to 28 km', '10 km/h (AU Limit)', 'Electromagnetic Disc Brake', '48.0 kg', '150 kg', 'Comfort Suspension Alloy Frame', 'Variable Speed Throttle'),
  createProduct('Solax Mobie Plus Folding Scooter', 3699, 'mobility-scooters', 'travel-mobility-scooters', 'travel-mobility-scooters', 'Popular', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '120W Gearless Transaxle', '24V 10Ah Airline Safe Lithium', 'Up to 18 km', '10 km/h (AU Limit)', 'Electromagnetic Brake', '23.0 kg', '125 kg', 'Manual Easy-Fold Aircraft Alloy', 'Variable Speed Dial'),

  // Heavy-Duty All-Terrain Mobility Scooters (7 items)
  createProduct('Afiscooter S4 Heavy Duty 4-Wheel', 7999, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'Best Seller', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', '1400W High Torque Heavy Transaxle', '24V 100Ah Heavy Duty AGM', 'Up to 50 km', '10 km/h (AU Limit)', 'Full Hydraulic Brakes + Electro', '155 kg', '200 kg', 'Shock-Absorbing Steel Canopy Frame', 'Ergonomic Speed Governor'),
  createProduct('Pride Wrangler All-Terrain Heavy Duty', 8499, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'Premium', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 24V 775W High Power Motors', '24V 100Ah Deep Cycle AGM', 'Up to 48 km', '10 km/h (AU Limit)', 'Dual Hydraulic Disc + Electro', '170 kg', '204 kg', 'Full Suspension Rugged Chassis', 'CTS All-Terrain Speed Control'),
  createProduct('Shoprider Endeavor 889 All-Terrain', 5299, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'Popular', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '1200W Heavy Duty Transaxle', '24V 75Ah Deep Cycle Battery', 'Up to 40 km', '10 km/h (AU Limit)', 'Electromagnetic + Hand Brake', '140 kg', '180 kg', 'Double Pillow Comfort Suspension', 'Variable Speed Governor'),
  createProduct('Drive Medical Cobra GT4 Heavy Duty', 6499, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'Best Value', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', '950W Nominal / 1350W Peak', '24V 75Ah Heavy Duty Batteries', 'Up to 55 km', '10 km/h (AU Limit)', 'Electromagnetic Disc Brakes', '150 kg', '200 kg', 'Modern Automotive Style Chassis', 'Speed Control Dial'),
  createProduct('Invacare Comet Ultra Heavy Duty', 6899, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'none', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', '1200W High Torque Transaxle', '24V 75Ah Premium AGM', 'Up to 50 km', '10 km/h (AU Limit)', 'Dual Electromagnetic Brakes', '148 kg', '220 kg', 'Reinforced Heavy-Weight Alloy', 'Auto-Speed Reduction Dial'),
  createProduct('Afiscooter C4 Mid-Size All-Terrain', 6299, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'New', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', '950W High Output Transaxle', '24V 70Ah Deep Cycle AGM', 'Up to 45 km', '10 km/h (AU Limit)', 'Electromagnetic Safety Brake', '122 kg', '150 kg', 'Advanced Ergonomic Full Suspension', 'Speed Limiter Knob'),
  createProduct('Merits Silverado Extreme Heavy Duty', 7499, 'mobility-scooters', 'heavy-duty-mobility-scooters', 'heavy-duty-mobility-scooters', 'Best Seller', 'Rear Hub', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', '1300W High Torque Motor', '24V 100Ah High Capacity', 'Up to 55 km', '10 km/h (AU Limit)', 'Intelligent Electromagnetic Disc', '160 kg', '200 kg', 'Full Suspension Heavy Duty Chassis', 'Digital Speed Control Display'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'mobility.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_MOBILITY.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 15 new mobility scooters to config/data/mobility.ts');
} else {
  console.error('Could not find closing bracket in mobility.ts');
}
