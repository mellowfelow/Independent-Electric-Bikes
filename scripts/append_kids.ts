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

const NEW_KIDS = [
  // Electric Balance Bikes (10 items)
  createProduct('Stacyc 16eDrive Brushless Pro', 1499, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Best Seller', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '20V High Output Brushless Motor', '20V 4Ah Lithium Ion Pack', 'Up to 60 minutes run time', '21 km/h (Child Speed Modes)', 'Rear Mechanical Disc Brake', '9.0 kg', '35 kg', 'TIG Welded Aluminium Alloy', '3 Power Speed Modes'),
  createProduct('Stacyc 12eDrive Balance Bike', 1099, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Popular', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '20V Brushless Motor', '20V 2Ah Lithium Battery', 'Up to 45 minutes run time', '14 km/h (Child Speed Modes)', 'Rear Caliper Disc Brake', '7.7 kg', '34 kg', 'Aluminium Heat-Treated Frame', '3 Power Speed Modes'),
  createProduct('KTM Factory Replica 16eDrive', 1699, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Premium', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', 'High Output Brushless Motor', '20V 4Ah Lithium Ion', 'Up to 60 minutes run time', '21 km/h (Child Speed Modes)', 'Rear Disc Brake', '9.0 kg', '35 kg', 'Factory Racing KTM Replica Frame', '3 Power Modes'),
  createProduct('Husqvarna Factory Replica 12eDrive', 1299, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Best Value', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '20V Brushless Motor Drive', '20V 2Ah Lithium Ion', 'Up to 45 minutes run time', '14 km/h (Child Speed Modes)', 'Rear Disc Brake', '7.7 kg', '34 kg', 'Husqvarna Factory Team Alloy', '3 Power Modes'),
  createProduct('GASGAS Factory Replica 16eDrive', 1699, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'New', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', 'High Output Brushless Motor', '20V 4Ah Lithium Ion', 'Up to 60 minutes run time', '21 km/h (Child Speed Modes)', 'Rear Disc Brake', '9.0 kg', '35 kg', 'GASGAS Factory Racing Frame', '3 Power Modes'),
  createProduct('Thumpstar TSB 12 Electric Balance', 899, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Best Value', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '250W Geared Rear Motor', '24V 5.2Ah Lithium Pack', 'Up to 50 minutes run time', '16 km/h (Child Speed Modes)', 'Rear Disc Brake', '8.5 kg', '40 kg', 'High Tensile Alloy Frame', 'Low/High Speed Select'),
  createProduct('Burmax E-Balance 16 Pro', 999, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Sale', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '350W Brushless Motor', '24V 5.8Ah Removable', 'Up to 60 minutes run time', '20 km/h (Child Speed Modes)', 'Rear Mechanical Disc', '10.2 kg', '45 kg', 'Aluminium Alloy Balance Frame', '3 Speed Settings'),
  createProduct('Mondraker Grommy 16 Kids E-Bike', 2299, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Premium', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', 'Mondraker Custom Brushless 250W', '4Ah 80Wh Quick-Change', 'Up to 70 minutes run time', '17 km/h (3 Speed Modes)', 'Tektro Hydraulic Disc Brake', '8.5 kg', '40 kg', 'Stealth Alloy 6061 Frame', '3 Speed Digital Mode'),
  createProduct('Bulls Tokee Ultra E-Balance 14', 1199, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'none', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '200W Brushless Engine', '24V 4.0Ah Lithium', 'Up to 50 minutes run time', '15 km/h (3 Speed Modes)', 'Rear Cable Disc', '8.1 kg', '35 kg', 'Ultralight Kids Geometry Alloy', '3 Speed Governor'),
  createProduct('Thumpstar TSB 16 Pro Balance', 1099, 'kids-off-road-ev', 'electric-balance-bikes', 'electric-balance-bikes', 'Popular', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '350W Geared Hub Engine', '24V 5.8Ah Lithium', 'Up to 60 minutes run time', '22 km/h (Child Speed Modes)', 'Rear Mechanical Disc', '9.8 kg', '45 kg', 'Reinforced Balance Alloy Frame', 'Low/Med/High Speed Select'),

  // Youth Dirt & Pit Bikes (10 items)
  createProduct('Sur-Ron Light Bee Youth Edition', 4899, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Best Seller', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '3000W Peak High Torque Mid-Drive', '48V 20Ah 960Wh Lithium', 'Up to 60 km', '25 km/h (AU Governed / 50 km/h Unrestricted)', 'Dual 4-Piston Hydraulic Disc', '48.0 kg', '75 kg', 'Forged Aluminium Alloy Frame', 'Dual Power Mode Select'),
  createProduct('Talaria XXX Youth Pit Bike', 4499, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Popular', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '2500W Mid Motor Drive', '60V 25Ah 1500Wh LG Pack', 'Up to 65 km', '25 km/h (AU Governed)', 'Front & Rear Hydraulic Disc', '50.0 kg', '80 kg', 'Extruded Aluminium Frame', 'Eco/Sport Dual Mode'),
  createProduct('Kuberg Cross Hero Youth Dirt Bike', 3299, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Best Value', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', '3000W High Performance Motor', '36V 12Ah Heavy Duty Pack', 'Up to 2 hours riding', '25 km/h (AU Governed)', 'Tektro Hydraulic Disc Brakes', '33.0 kg', '50 kg', 'Double Cradle Steel Tube Frame', 'Fully Programmable Speed/Torque'),
  createProduct('Sur-Ron Hyperbee Youth E-Dirt Bike', 3899, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'New', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '2000W Peak Air-Cooled Mid Drive', '48V 18Ah Lithium Battery', 'Up to 50 km', '25 km/h (AU Governed)', 'Dual Hydraulic Disc Brakes', '40.0 kg', '65 kg', 'Ultralight Forged Alloy Frame', 'Dual Speed Switch'),
  createProduct('Razor MX650 Dirt Rocket Pit Bike', 1299, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Best Value', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '650W High-Torque Chain Drive', '36V Sealed Lead Acid Pack', 'Up to 40 minutes run time', '25 km/h (AU Compliant)', 'Dual Hand-Operated Disc Brakes', '44.5 kg', '100 kg', 'Steel Motocross Geometry Frame', 'Single Speed Variable Twist'),
  createProduct('MotoTec 36V 1000W Demon Pit Bike', 1499, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Sale', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '1000W 36V Neodymium Motor', '36V 12Ah Lithium Pack', 'Up to 45 minutes run time', '25 km/h (AU Compliant)', 'Front & Rear Mechanical Disc', '38.0 kg', '70 kg', 'Heavy Duty Steel Cradle Frame', '3-Speed Parental Governor'),
  createProduct('Thumpstar TSB 70 E-Pit Bike', 2199, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'none', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', '1500W Mid-Drive Brushless Engine', '48V 15Ah Lithium Ion', 'Up to 90 minutes riding', '25 km/h (AU Governed)', 'Hydraulic Disc Brakes 180mm', '39.0 kg', '75 kg', 'Chromoly Steel Cradle Chassis', 'Parental Speed Governor Switch'),
  createProduct('Torrot Motocross ONE Electric Pit', 3699, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Premium', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', '1050W Programmable Motor', '48V 6.6Ah Swappable Pack', 'Up to 60 minutes riding', '25 km/h (AU Governed)', 'Hydraulic Disc Brakes', '28.0 kg', '30 kg', 'Tubular Steel Frame', 'Bluetooth iOS/Android App Control'),
  createProduct('Kuberg Freerider Youth E-Dirt Bike', 5299, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'Premium', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', '50km+ Long Range', '12kW Peak Brushless Motor', '48V 20Ah Lithium Battery', 'Up to 60 km', '25 km/h (AU Governed)', 'Dual Hydraulic Disc 203mm', '36.0 kg', '85 kg', 'Double Cradle Steel Tube', 'Programmable Torque Controller'),
  createProduct('Kayo e-KSD Youth Electric Motocross', 2899, 'kids-off-road-ev', 'youth-electric-dirt-bikes', 'youth-electric-dirt-bikes', 'New', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', '2000W Brushless Mid Engine', '60V 20Ah Lithium Pack', 'Up to 75 minutes riding', '25 km/h (AU Governed)', 'Hydraulic Disc Brakes', '45.0 kg', '80 kg', 'Steel Tube Motocross Frame', '3-Level Speed Limiter'),

  // Electric Go-Karts & Drift Trikes (5 items)
  createProduct('Segway Ninebot GoKart Pro 2', 3299, 'kids-off-road-ev', 'electric-go-karts', 'electric-go-karts', 'Best Seller', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '4300W Peak Quad-Vented Motors', '432Wh Air-Cooled Battery Pack', 'Up to 25 km', '25 km/h (AU Governed / 43 km/h Race)', 'Mechanical Handbrake + Electronic', '51.2 kg', '100 kg', 'High-Strength Steel Frame & TPE Lip', '4 Driving Modes (Safety/Sport/Race)'),
  createProduct('Razor Crazy Cart XL Adult/Youth', 1699, 'kids-off-road-ev', 'electric-go-karts', 'electric-go-karts', 'Popular', 'Rear Hub', 'Throttle', 'Off-Road Private Land', 'Regenerative', 'Under 50km', '500W High Torque Chain Motor', '36V Sealed Lead Acid Pack', 'Up to 40 minutes run time', '25 km/h (AU Compliant)', 'Drift Bar Dynamic Brake', '50.0 kg', '109 kg', 'Powdercoated Steel Drift Frame', 'Variable Speed Foot Pedal'),
  createProduct('Burmax 1000W Electric Go-Kart', 1899, 'kids-off-road-ev', 'electric-go-karts', 'electric-go-karts', 'Best Value', 'Mid-Drive', 'Throttle', 'Off-Road Private Land', 'Hydraulic Disc', 'Under 50km', '1000W 48V Brushless Motor', '48V 12Ah Lead Acid / Lithium Opt', 'Up to 45 minutes run time', '25 km/h (AU Compliant)', 'Rear Hydraulic Disc Brake', '65.0 kg', '90 kg', 'Tubular Steel Roll-Cage Frame', '3 Speed Safety Governor Key'),
  createProduct('Segway Ninebot GoKart Kit Edition', 1899, 'kids-off-road-ev', 'electric-go-karts', 'electric-go-karts', 'none', 'Dual Motor', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', 'Dual 400W Motors (S-MAX Engine)', '310Wh Lithium Battery Pack', 'Up to 20 km', '24 km/h (AU Governed)', 'Mechanical Handbrake + Electronic', '28.0 kg', '100 kg', 'Adjustable Frame Length Steel', 'App Controlled Speed Modes'),
  createProduct('Triad Drift Trike Counter-Measure E', 1999, 'kids-off-road-ev', 'electric-go-karts', 'electric-go-karts', 'New', 'Front Hub', 'Throttle', 'Off-Road Private Land', 'Mechanical Disc', 'Under 50km', '1000W Brushless Front Hub Engine', '48V 14Ah Lithium Ion', 'Up to 45 minutes run time', '25 km/h (AU Compliant)', 'Tektro Mechanical Front Disc', '31.0 kg', '100 kg', 'Twin-Tube Steel Frame + Slick Sleeves', 'Twist Grip Variable Throttle'),
];

const filePath = path.join(process.cwd(), 'config', 'data', 'kids.ts');
let fileContent = fs.readFileSync(filePath, 'utf-8');

const lastBracketIndex = fileContent.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  const newItemsJson = NEW_KIDS.map((item) => '  ' + JSON.stringify(item, null, 2).replace(/\n/g, '\n  ')).join(',\n');
  fileContent = fileContent.substring(0, lastBracketIndex) + ',\n' + newItemsJson + '\n];\n';
  fs.writeFileSync(filePath, fileContent, 'utf-8');
  console.log('Successfully appended 25 new kids EVs to config/data/kids.ts');
} else {
  console.error('Could not find closing bracket in kids.ts');
}
