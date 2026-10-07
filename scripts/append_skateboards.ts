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

const NEW_SKATEBOARDS = [
  // Street Electric Skateboards (10 items)
  createProduct('Evolve Bamboo GTR Series 2 Street', 1999, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Best Seller', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 1500W High Torque Motors', '14Ah 504Wh Samsung Lithium', 'Up to 50 km', '25 km/h (AU Compliant)', 'Regenerative Braking via Phased Bluetooth', '10.3 kg', '120 kg', '38" Custom Bamboo + Fiberglass Deck', '4-Speed Drive Selector'),
  createProduct('Meepo Hurricane Ultra Street', 2299, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Popular', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 3500W Belt Drive Motors', '12S4P Molicel P42A 725Wh', 'Up to 50 km', '25 km/h (AU Compliant)', 'Smooth Regenerative Braking', '12.5 kg', '150 kg', '39" T700 Carbon Fiber Deck', 'LY-FOC Wireless Controller'),
  createProduct('Exway Flex ER Street Belt', 1299, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Best Value', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 1000W Brushless Belt Drive', '12S2P 345Wh Sony Lithium', 'Up to 45 km', '25 km/h (AU Compliant)', 'Smart Regenerative Braking', '8.2 kg', '100 kg', 'Bamboo/Fiberglass Flexible Composite', '4 Gear Smart Remote'),
  createProduct('Tynee Explorer Street Longboard', 1699, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'New', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 3000W Belt Drive Motors', '12S4P Molicel 725Wh', 'Up to 55 km', '25 km/h (AU Compliant)', 'FOC Regenerative Braking', '11.8 kg', '130 kg', 'Flexible Bamboo Curved Deck', 'OLED Screen Remote Control'),
  createProduct('Backfire Zealot X Belt Longboard', 1799, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Best Seller', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 1500W Belt Drive Motors', '14S2P 504Wh Molicel', 'Up to 55 km', '25 km/h (AU Compliant)', 'Electronic Brake System', '10.5 kg', '110 kg', 'ABS Composite Deck + RGB Lighting', 'OLED Halo Wireless Remote'),
  createProduct('Meepo V5 ER Street Shortboard', 799, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Sale', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 500W Hub Motors', '10S2P 288Wh Battery', 'Up to 30 km', '25 km/h (AU Compliant)', 'Smooth Pocket Remote Braking', '8.0 kg', '100 kg', '8-Ply Canadian Maple Deck', '4-Speed Pocket Remote'),
  createProduct('WowGo Pioneer 4 Street', 999, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Best Value', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 680W Belt Drive Motors', '12S2P 216Wh Samsung', 'Up to 35 km', '25 km/h (AU Compliant)', 'Electronic Regenerative Braking', '8.5 kg', '120 kg', 'Canadian Maple + Canadian Birch', 'Ergonomic OLED Remote'),
  createProduct('Exway Wave Hub Street', 1099, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'none', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 1000W Hub Motors', '216Wh Quick-Swappable Pack', 'Up to 24 km', '25 km/h (AU Compliant)', 'Smart ESC Regenerative', '6.9 kg', '100 kg', '30" Compact Canadian Maple', 'Wireless Smart Remote'),
  createProduct('Propulsion Board Demon Street', 2499, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'Premium', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', '50km+ Long Range', 'Dual 3500W Belt Motors', '12S4P 604Wh Molicel', 'Up to 60 km', '25 km/h (AU Compliant)', 'Custom VESC Regenerative Braking', '11.5 kg', '140 kg', 'Full Carbon Fiber Drop Deck', 'VESC Wand Remote'),
  createProduct('Aboard Electric Longboard Street', 1399, 'electric-skateboards', 'street-electric-skateboards', 'street-electric-skateboards', 'New', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 1200W Belt Motors', '10S4P 432Wh LG', 'Up to 40 km', '25 km/h (AU Compliant)', 'Regenerative Electronic Brake', '9.5 kg', '120 kg', '7-Ply Bamboo Composite Deck', '2.4GHz Digital Remote'),

  // All-Terrain / Pneumatic Boards (10 items)
  createProduct('Evolve Hadean Bamboo All-Terrain', 2899, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Best Seller', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 3000W High Torque Motors', '43.2V 16Ah 691Wh Custom Pack', 'Up to 65 km', '25 km/h (AU Compliant)', 'Smooth Bluetooth Phased Braking', '13.6 kg', '120 kg', 'Forged Carbon + Layered Bamboo', 'Phased Evolve Remote'),
  createProduct('Onewheel GT S-Series All-Terrain', 4299, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Premium', 'Rear Hub', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', '113V Hypercore Brushless Motor', '113V High Voltage Lithium Pack', 'Up to 50 km', '25 km/h (AU Compliant)', 'Dynamic Gyroscopic Pushback', '15.8 kg', '125 kg', 'Powdercoated Aircraft Aluminium Rails', 'Self-Balancing Gyro Control'),
  createProduct('Meepo Hurricane Ultra All-Terrain', 2599, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Popular', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 3500W Belt Drive Motors', '725Wh Molicel Battery Pack', 'Up to 50 km', '25 km/h (AU Compliant)', 'Regenerative Pneumatic Braking', '15.5 kg', '150 kg', 'Carbon Fiber All-Terrain Deck', 'LY-FOC Smart Remote'),
  createProduct('Tynee Explorer All-Terrain 7" Pneumatic', 1899, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Best Value', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 3000W Heavy Duty Belts', '12S4P 725Wh Battery', 'Up to 55 km', '25 km/h (AU Compliant)', 'VESC Regenerative Braking', '14.0 kg', '130 kg', 'Flexible Curved All-Terrain Bamboo', 'OLED Remote Control'),
  createProduct('Exway Atlas Pro 2WD Pneumatic', 2499, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'none', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 3000W High Torque Belts', '12S4P 701Wh Battery Pack', 'Up to 55 km', '25 km/h (AU Compliant)', 'Electronic Brake System', '14.2 kg', '130 kg', '3D Carbon Fiber Molded Deck', 'Smart OLED Remote'),
  createProduct('Lacroix Nazaré Super All-Terrain', 5999, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Premium', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 4000W 6389 Motors', '12S12P 2000Wh Sony VTC6', 'Up to 100 km', '25 km/h (AU Compliant)', 'Dual VESC 6.6 Regenerative', '18.5 kg', '160 kg', 'Canadian Maple + Carbon Enclosure', 'Hoyt St Puck Remote'),
  createProduct('Evolve Carbon GTR Series 2 All-Terrain', 2499, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Best Seller', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 1500W Brushless Motors', '14Ah 504Wh Samsung Pack', 'Up to 50 km', '25 km/h (AU Compliant)', 'Bluetooth Phased Braking', '12.1 kg', '120 kg', '100% Carbon Fiber Deck Frame', 'Phased Evolve Remote'),
  createProduct('Onewheel Pint X All-Terrain', 2299, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Popular', 'Rear Hub', 'Gyroscopic', 'Off-Road Private Land', 'Regenerative', 'Under 50km', '750W Hypercore Motor', '324Wh Lithium Ion Pack', 'Up to 29 km', '25 km/h (AU Compliant)', 'Gyroscopic Pushback Braking', '12.2 kg', '110 kg', 'Compact Single-Wheel Aluminum Frame', 'Self-Balancing Control'),
  createProduct('Propulsion Board All-Terrain Beast', 2999, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'New', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', '50km+ Long Range', 'Dual 3500W High Torque Belts', '12S4P 725Wh Molicel', 'Up to 60 km', '25 km/h (AU Compliant)', 'VESC Custom Braking', '15.0 kg', '150 kg', 'Drop-Down Carbon Fiber Deck', 'VESC Wand Remote'),
  createProduct('Backfire Ranger X3 Pneumatic', 1999, 'electric-skateboards', 'all-terrain-electric-skateboards', 'all-terrain-electric-skateboards', 'Best Value', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Regenerative', 'Under 50km', 'Dual 1500W Ultra-Quiet Hubs', '504Wh Samsung Battery', 'Up to 35 km', '25 km/h (AU Compliant)', 'Electronic Regenerative Braking', '12.8 kg', '110 kg', 'Flexible Composite Drop-Deck', 'OLED Halo Remote'),

  // Mini & Portable Shortboards (5 items)
  createProduct('Evolve Stoke Series 2 Shortboard', 1699, 'electric-skateboards', 'mini-electric-skateboards', 'mini-electric-skateboards', 'Best Seller', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 1500W Belt Motors', '14Ah 504Wh Samsung Pack', 'Up to 45 km', '25 km/h (AU Compliant)', 'Phased Bluetooth Braking', '8.5 kg', '110 kg', '33.5" Surf-Style Bamboo Deck', 'Phased Remote'),
  createProduct('Tynee Mini 3 Pro Shortboard', 1199, 'electric-skateboards', 'mini-electric-skateboards', 'mini-electric-skateboards', 'Best Value', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 2000W Belt Motors', '12S2P 345Wh Battery', 'Up to 35 km', '25 km/h (AU Compliant)', 'FOC Regenerative Braking', '7.8 kg', '110 kg', '30" Kicktail Canadian Maple', 'OLED Screen Remote'),
  createProduct('Meepo Mini 5 ER Shortboard', 899, 'electric-skateboards', 'mini-electric-skateboards', 'mini-electric-skateboards', 'Popular', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 500W Hub Motors', '10S2P 288Wh Battery', 'Up to 30 km', '25 km/h (AU Compliant)', 'Smooth Pocket Remote Brake', '7.5 kg', '100 kg', '30" Deep Concave Kicktail Maple', '4-Speed Pocket Remote'),
  createProduct('Exway Wave Belt Shortboard', 1299, 'electric-skateboards', 'mini-electric-skateboards', 'mini-electric-skateboards', 'none', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 1000W Belt Drive Motors', '216Wh Swappable Battery Pack', 'Up to 24 km', '25 km/h (AU Compliant)', 'Smart ESC Regenerative', '7.4 kg', '100 kg', '30" Canadian Maple Kicktail Deck', 'Smart OLED Remote'),
  createProduct('WowGo Mini 2 Pocket Shortboard', 799, 'electric-skateboards', 'mini-electric-skateboards', 'mini-electric-skateboards', 'Sale', 'Dual Motor', 'Throttle', 'CE Certified', 'Regenerative', 'Under 50km', 'Dual 680W Belt Drive Motors', '10S2P 216Wh Samsung', 'Up to 25 km', '25 km/h (AU Compliant)', 'Electronic Brake System', '6.9 kg', '100 kg', '30" U-Shaped Concave Maple', 'OLED Wireless Remote'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'skateboards.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_SKATEBOARDS.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 25 new skateboards to config/data/skateboards.ts');
} else {
  console.error('Could not find closing bracket in skateboards.ts');
}
