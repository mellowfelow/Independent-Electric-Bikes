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

const NEW_SELFBALANCING = [
  // Electric Unicycles (EUWs) (10 items)
  createProduct('Begode Master Pro V2 EUC 134V', 5499, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Premium', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '4500W High Torque C38 Motor', '134.4V 4800Wh Samsung 50S Pack', 'Up to 200 km', '25 km/h (AU Compliant)', 'Gyroscopic Tiltback + Regen', '53.0 kg', '150 kg', 'Heavy Duty Suspension EUC Chassis', 'Gyroscopic Direct Assist'),
  createProduct('InMotion V14 Adventure EUC', 4899, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Best Seller', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '4000W Nominal / 9000W Peak', '134.4V 2400Wh High Rate Lithium', 'Up to 120 km', '25 km/h (AU Compliant)', 'Gyroscopic Electronic Brake', '39.0 kg', '140 kg', 'C-Arm Air Suspension Frame', 'Gyroscopic Direct Assist'),
  createProduct('Leaperkim Lynx 151V EUC', 5999, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Best Seller', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '3200W Nominal / 8000W Peak Motor', '151.2V 2700Wh Samsung 50S', 'Up to 150 km', '25 km/h (AU Compliant)', 'Gyroscopic Dynamic Brake', '40.0 kg', '150 kg', 'Magnesium Alloy Adjustable Suspension', 'Gyroscopic Direct Assist'),
  createProduct('Begode Extreme 134V Off-Road EUC', 4299, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Popular', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '3500W C38 High Torque Motor', '134.4V 2400Wh High Discharge', 'Up to 110 km', '25 km/h (AU Compliant)', 'Gyroscopic Electronic Regen', '38.5 kg', '140 kg', 'CNC Machined Air Suspension Body', 'Gyroscopic Direct Assist'),
  createProduct('Kingsong S22 Pro Eagle EUC', 4699, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Popular', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '4000W Custom High Torque Engine', '126V 2220Wh LG M50LT', 'Up to 120 km', '25 km/h (AU Compliant)', 'Gyroscopic Dynamic Tiltback', '35.0 kg', '135 kg', 'DNM 130mm Travel Suspension', 'Gyroscopic Direct Assist'),
  createProduct('InMotion V12 HT High Torque EUC', 2999, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Best Value', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '2800W Nominal / 5000W Peak Engine', '100.8V 1750Wh Lithium Pack', 'Up to 110 km', '25 km/h (AU Compliant)', 'Gyroscopic Tiltback Electronic', '29.0 kg', '120 kg', 'IPX5 Sealed Waterproof Shell', 'Gyroscopic Direct Assist'),
  createProduct('Begode Falcon 100V Compact EUC', 2399, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'New', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '2800W High Torque Motor', '100.8V 900Wh High Rate Pack', 'Up to 60 km', '25 km/h (AU Compliant)', 'Gyroscopic Electronic Regen', '25.0 kg', '120 kg', 'Suspended Compact City Shell', 'Gyroscopic Direct Assist'),
  createProduct('Kingsong KS-16XS Suspension EUC', 2799, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'none', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '2200W High Torque Hub Engine', '84V 777Wh Lithium Ion', 'Up to 70 km', '25 km/h (AU Compliant)', 'Gyroscopic Brake System', '22.0 kg', '120 kg', 'Single Air Spring Suspension', 'Gyroscopic Direct Assist'),
  createProduct('InMotion V11 Suspension EUC', 3299, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'Best Seller', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '2200W Nominal Motor Drive', '84V 1500Wh LG Lithium', 'Up to 100 km', '25 km/h (AU Compliant)', 'Gyroscopic Electronic Braking', '27.0 kg', '120 kg', 'Dual Air Shock Suspension Frame', 'Gyroscopic Direct Assist'),
  createProduct('Begode Commander Mini 116V', 3899, 'self-balancing-ev', 'electric-unicycles', 'electric-unicycles', 'New', 'Hub Drive', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '3200W High Torque Hub', '116.6V 2400Wh High Rate', 'Up to 110 km', '25 km/h (AU Compliant)', 'Gyroscopic Electronic Regen', '36.0 kg', '140 kg', 'Heavy-Duty Suspended Alloy Casing', 'Gyroscopic Direct Assist'),

  // Hoverboards & Self-Balancing Boards (5 items)
  createProduct('Segway Ninebot S-MAX Self-Balancing', 1499, 'self-balancing-ev', 'hoverboards', 'hoverboards', 'Best Seller', 'Dual Motor', 'Gyroscopic', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 500W High Torque Motors', '432Wh Removable Battery Pack', 'Up to 38 km', '20 km/h (AU Compliant)', 'Gyroscopic Auto-Brake', '22.8 kg', '110 kg', 'Hand-Control Steering Bar Alloy', 'Gyroscopic Lean Control'),
  createProduct('Hover-1 Titan Pro All-Terrain Hoverboard', 599, 'self-balancing-ev', 'hoverboards', 'hoverboards', 'Best Value', 'Dual Motor', 'Gyroscopic', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 250W Motors (500W Peak)', '36V 4.0Ah Lithium Ion', 'Up to 18 km', '15 km/h (AU Compliant)', 'Gyroscopic Electronic Brake', '11.5 kg', '100 kg', '10" Pneumatic All-Terrain Wheels', 'Gyroscopic Balance Board'),
  createProduct('Razor Hovertrax Positech Smart Board', 499, 'self-balancing-ev', 'hoverboards', 'hoverboards', 'Popular', 'Dual Motor', 'Gyroscopic', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 350W Silent Motors', '36V Lithium Battery Pack', 'Up to 15 km', '14 km/h (AU Compliant)', 'Gyroscopic Smart Brake', '9.8 kg', '100 kg', 'Shatter-Resistant Polymer Frame', 'Gyroscopic Auto-Leveling'),
  createProduct('Segway Ninebot S Kids Hoverboard', 799, 'self-balancing-ev', 'hoverboards', 'hoverboards', 'Best Value', 'Dual Motor', 'Gyroscopic', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 400W Motors', '310Wh Lithium Pack', 'Up to 22 km', '16 km/h (AU Compliant)', 'Gyroscopic Electronic Brake', '12.8 kg', '85 kg', 'Knee-Control Bar Alloy Frame', 'Gyroscopic Smart Control'),
  createProduct('Gyroor Warrior All-Terrain Hoverboard', 699, 'self-balancing-ev', 'hoverboards', 'hoverboards', 'New', 'Dual Motor', 'Gyroscopic', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 350W Motors (700W Total)', '36V 4.4Ah LG Cells', 'Up to 16 km', '16 km/h (AU Compliant)', 'Gyroscopic Electronic Brake', '13.5 kg', '120 kg', '8.5" Off-Road Solid Rubber Alloy', 'Gyroscopic Balance System'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'selfbalancing.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_SELFBALANCING.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 15 new self-balancing EVs to config/data/selfbalancing.ts');
} else {
  console.error('Could not find closing bracket in selfbalancing.ts');
}
