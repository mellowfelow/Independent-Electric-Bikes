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

const NEW_ACCESSORIES = [
  // Replacement Batteries & Chargers (5 items)
  createProduct('Samsung 48V 20Ah Lithium Replacement Battery Pack', 899, 'accessories', 'replacement-batteries-chargers', 'replacement-batteries-chargers', 'Best Seller', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', '50km+ Long Range', 'N/A Accessory Item', '48V 20Ah 960Wh Samsung 21700', 'Up to 100 km extra range', 'N/A', 'N/A', '4.5 kg', 'N/A', 'Waterproof Key-Lock Case', 'N/A'),
  createProduct('Bosch Fast Charger 6A Smart System', 249, 'accessories', 'replacement-batteries-chargers', 'replacement-batteries-chargers', 'Best Value', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', '6A Fast Charger for 36V Bosch', '50% charge in 1.2 hrs', 'N/A', 'N/A', '1.0 kg', 'N/A', 'Compact Sealed Housing', 'N/A'),
  createProduct('LG 52V 24Ah Extended Long-Range Battery', 1099, 'accessories', 'replacement-batteries-chargers', 'replacement-batteries-chargers', 'Premium', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', '50km+ Long Range', 'N/A Accessory Item', '52V 24Ah 1248Wh LG MJ1 Cells', 'Up to 120 km extra range', 'N/A', 'N/A', '5.8 kg', 'N/A', 'Heavy Duty Hailong Case', 'N/A'),
  createProduct('Shimano STEPS 4A Fast Battery Charger', 199, 'accessories', 'replacement-batteries-chargers', 'replacement-batteries-chargers', 'Popular', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', '4A Quick Charger for EC-E8004', '80% charge in 2 hrs', 'N/A', 'N/A', '0.9 kg', 'N/A', 'OEM Weatherproof Housing', 'N/A'),
  createProduct('Universal 48V 3A Smart Charger XLR', 129, 'accessories', 'replacement-batteries-chargers', 'replacement-batteries-chargers', 'Sale', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', '48V 3A Auto-Cutoff Charger', 'Full charge in 4-6 hrs', 'N/A', 'N/A', '0.7 kg', 'N/A', 'Anodized Aluminium Cooling Shell', 'N/A'),

  // Security Locks (5 items)
  createProduct('Kryptonite New York Legend 1515 Chain Lock', 299, 'accessories', 'security-locks', 'security-locks', 'Best Seller', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '4.8 kg', 'N/A', '15mm 3T Manganese Steel Chain', 'N/A'),
  createProduct('Abus Bordo Granit XPlus 6500 Folding Lock', 249, 'accessories', 'security-locks', 'security-locks', 'Premium', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '1.7 kg', 'N/A', '5.5mm Hardened Steel Bars', 'N/A'),
  createProduct('Hiplok D1000 Anti-Angle Grinder U-Lock', 499, 'accessories', 'security-locks', 'security-locks', 'Premium', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '1.9 kg', 'N/A', 'Ferosafe Graphene Composite Shackle', 'N/A'),
  createProduct('Kryptonite Evolution Mini-7 with Cable', 149, 'accessories', 'security-locks', 'security-locks', 'Best Value', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '1.6 kg', 'N/A', '13mm Hardened Max-Performance Steel', 'N/A'),
  createProduct('GPS Smart Tracker Alarm for E-Bikes', 179, 'accessories', 'security-locks', 'security-locks', 'New', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', '1000mAh Internal Rechargeable', '120 days standby', 'N/A', 'N/A', '0.2 kg', 'N/A', 'Hidden Frame-Mounted IP67 Casing', 'N/A'),

  // Safety Apparel & Helmets (5 items)
  createProduct('Thousand Heritage Helmet MIPS', 189, 'accessories', 'safety-apparel-helmets', 'safety-apparel-helmets', 'Best Seller', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '0.45 kg', 'N/A', 'ABS Shell + MIPS Safety System', 'N/A'),
  createProduct('Lumos Ultra Smart LED Helmet with Indicators', 249, 'accessories', 'safety-apparel-helmets', 'safety-apparel-helmets', 'Popular', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', '3.7V 1100mAh USB Rechargeable', 'Up to 10 hrs lighting', 'N/A', 'N/A', '0.37 kg', 'N/A', 'In-Mold Polycarbonate Shell', 'N/A'),
  createProduct('Giro Fixture MIPS II Mountain Helmet', 129, 'accessories', 'safety-apparel-helmets', 'safety-apparel-helmets', 'Best Value', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '0.33 kg', 'N/A', 'Full Hardbody Wrap Polycarbonate', 'N/A'),
  createProduct('Fox Racing Dropframe Pro Enduro Helmet', 329, 'accessories', 'safety-apparel-helmets', 'safety-apparel-helmets', 'none', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '0.75 kg', 'N/A', 'Dual-Density Varizorb EPS Shell', 'N/A'),
  createProduct('Proviz REFLECT360 High-Vis Waterproof Jacket', 199, 'accessories', 'safety-apparel-helmets', 'safety-apparel-helmets', 'New', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '0.50 kg', 'N/A', '100% Reflective Material Shell', 'N/A'),

  // Utility & Cargo Add-Ons (5 items)
  createProduct('Thule Yepp Maxi Frame Mount Child Seat', 349, 'accessories', 'utility-cargo-add-ons', 'utility-cargo-add-ons', 'Best Seller', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '4.6 kg', '22 kg', 'Shock-Absorbing Molded Polymer', 'N/A'),
  createProduct('Ortlieb Back-Roller Classic Waterproof Panniers 40L', 289, 'accessories', 'utility-cargo-add-ons', 'utility-cargo-add-ons', 'Popular', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '1.9 kg', '18 kg', 'IP64 Waterproof Polyester Fabric', 'N/A'),
  createProduct('Quad Lock Handlebar Mount Pro Kit', 89, 'accessories', 'utility-cargo-add-ons', 'utility-cargo-add-ons', 'Best Value', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '0.12 kg', 'N/A', 'CNC Machined Aluminium Glass Nylon', 'N/A'),
  createProduct('Bosch SmartphoneGrip Smart System Mount', 119, 'accessories', 'utility-cargo-add-ons', 'utility-cargo-add-ons', 'none', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'Inductive Qi Charging Built-in', 'Powered via E-Bike System', 'N/A', 'N/A', '0.22 kg', 'N/A', 'Heavy Duty Handlebar Clamp', 'N/A'),
  createProduct('Blackburn Outpost Front Cargo Rack', 159, 'accessories', 'utility-cargo-add-ons', 'utility-cargo-add-ons', 'New', 'Hub Drive', 'Cadence Sensor', 'CE Certified', 'V-Brake', 'Under 50km', 'N/A Accessory Item', 'N/A', 'N/A', 'N/A', 'N/A', '1.1 kg', '20 kg', '6061 T6 Aircraft Aluminium Tubing', 'N/A'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'accessories.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_ACCESSORIES.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 20 new accessories to config/data/accessories.ts');
} else {
  console.error('Could not find closing bracket in accessories.ts');
}
