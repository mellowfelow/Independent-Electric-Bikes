export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQs keyed by category/subcategory slug.
 * Rendered on category pages with FAQPage JSON-LD schema.
 */
export const CATEGORY_FAQS: Record<string, FaqItem[]> = {
  // ── Main Categories ──────────────────────────────────────────

  'electric-bikes': [
    {
      question: 'What size electric bike do I need?',
      answer: 'E-bike sizing follows standard bicycle sizes based on your height. Riders 160–175 cm suit a medium frame, 175–185 cm a large. Step-through frames offer easier mounting for all heights. Check each product page for the manufacturer\'s size chart and standover height.',
    },
    {
      question: 'Do electric bikes need registration in Australia?',
      answer: 'Pedelec e-bikes (250 W, pedal-assist only, max 25 km/h assisted speed) do not require registration in any Australian state. E-bikes with throttles or motors above 250 W may need registration depending on your state. Our product pages indicate which models are road-legal.',
    },
    {
      question: 'What is the difference between hub motor and mid-drive?',
      answer: 'Hub motors sit in the wheel and offer simple, low-maintenance power — ideal for flat commutes. Mid-drive motors connect to the crankset, providing better torque and hill-climbing through the gears. Mid-drives cost more but suit hilly terrain and off-road riding.',
    },
  ],

  'electric-scooters': [
    {
      question: 'How fast do electric scooters go?',
      answer: 'Entry-level electric scooters reach 25–32 km/h, while performance models can exceed 80 km/h. In Australian states where e-scooters are legal on public paths, the speed limit is typically 25 km/h. Higher-speed models are restricted to private property.',
    },
    {
      question: 'Are electric scooters waterproof?',
      answer: 'Most electric scooters carry an IP54 rating, meaning they resist light rain and splashes but should not be submerged or ridden through deep puddles. Always dry your scooter after wet rides and avoid charging while damp. Our listings show each model\'s IP rating.',
    },
    {
      question: 'How long does an electric scooter battery last?',
      answer: 'Electric scooter batteries last 2–4 years or 300–500 charge cycles. A typical 36 V 15 Ah battery delivers 30–50 km per charge. Avoid draining below 20 % or charging above 90 % regularly to extend lifespan. Store indoors at room temperature when not in use.',
    },
  ],

  'electric-skateboards': [
    {
      question: 'Are electric skateboards legal in Australia?',
      answer: 'Electric skateboard laws vary by state. Queensland allows them on footpaths and roads under 50 km/h zones. Most other states classify them as motor vehicles requiring registration. Check your state transport authority before riding on public roads or paths.',
    },
    {
      question: 'How fast do electric skateboards go?',
      answer: 'Street electric skateboards typically reach 35–45 km/h, while all-terrain models max out around 50 km/h. Belt-drive boards offer stronger acceleration; hub motor boards are quieter and lower-maintenance. Speed depends on rider weight, terrain, and battery charge.',
    },
  ],

  'self-balancing-ev': [
    {
      question: 'Are hoverboards safe for kids?',
      answer: 'Modern hoverboards with UL2272 certification are safe for children aged 8 and above. Essential safety features include a self-balancing mode, non-slip foot pads, and a speed limiter. Always pair with a helmet, knee pads, and elbow pads. Supervise beginners on flat, open ground.',
    },
    {
      question: 'How hard is it to ride an electric unicycle?',
      answer: 'Most riders learn basic electric unicycle balance in 3–10 hours of practice. Start near a wall or railing for support. Beginner-friendly EUCs have wider pedals and lower max speeds. The learning curve is steeper than scooters but rewarding — experienced riders cover 50+ km per charge.',
    },
  ],

  'kids-off-road-ev': [
    {
      question: 'What age is a kids electric dirt bike for?',
      answer: 'Electric balance bikes suit ages 2–5 (12-inch wheels, 5–10 km/h). Kids pit bikes suit ages 5–10 (14–16 inch wheels, 15–25 km/h). Youth dirt bikes suit ages 10–16 (larger frames, 30–45 km/h). Always match the bike to the child\'s height and riding confidence.',
    },
    {
      question: 'Do kids need a licence for an electric dirt bike?',
      answer: 'On private property, no licence is required for kids electric dirt bikes in any Australian state. On public roads or trails, rules vary — most states classify electric dirt bikes as motor vehicles if they exceed 250 W or 25 km/h. Keep kids\' bikes on private land or designated tracks.',
    },
  ],

  'mobility-scooters': [
    {
      question: 'Do I need a licence for a mobility scooter in Australia?',
      answer: 'No licence is required for mobility scooters in Australia if they meet the definition of a motorised wheelchair: max speed 10 km/h and designed for people with a disability. They can be used on footpaths and pedestrian areas. No registration or insurance is legally required.',
    },
    {
      question: 'What is the weight limit for a mobility scooter?',
      answer: 'Standard mobility scooters support 100–135 kg. Heavy-duty models support 150–230 kg with reinforced frames, wider seats, and more powerful motors. Our product pages list the maximum user weight for each model. Choose a scooter rated at least 20 kg above your weight for comfort.',
    },
  ],

  'batteries-parts-kits': [
    {
      question: 'Can I upgrade my e-bike battery for more range?',
      answer: 'Yes, you can upgrade to a higher-capacity battery if it matches your bike\'s voltage and connector. Moving from a 10 Ah to a 14 Ah battery at the same voltage adds roughly 40 % more range. Check our compatibility panel on each battery page to confirm it fits your specific bike model.',
    },
    {
      question: 'How do I know which battery fits my electric bike?',
      answer: 'Match three things: voltage (36 V or 48 V — must match your motor), connector type (varies by brand), and mounting style (frame, rack, or downtube). Our compatibility panel on each battery page lists confirmed and system-compatible bike models. Contact us if your model isn\'t listed.',
    },
  ],

  'safety-security-carry': [
    {
      question: 'What type of lock is best for an electric bike?',
      answer: 'A Sold Secure Gold-rated U-lock or folding lock provides the strongest theft protection for e-bikes. Pair it with a cable lock to secure both wheels. Budget at least 10 % of your bike\'s value on a lock. Our lock range includes Abus, Kryptonite, and other certified brands.',
    },
    {
      question: 'Do I need a special helmet for an electric bike?',
      answer: 'Standard AS/NZS 2063-certified bicycle helmets are legally sufficient for pedelec e-bikes in Australia. For faster e-bikes (Class 3 / speed pedelecs), consider a NTA 8776-certified speed pedelec helmet with extended rear coverage. All helmets in our range meet Australian standards.',
    },
  ],

  // ── Subcategories ────────────────────────────────────────────

  'urban-commuter-ebikes': [
    {
      question: 'What range do commuter e-bikes typically get?',
      answer: 'Most commuter e-bikes deliver 50–100 km per charge in eco mode. A 36 V 14 Ah battery suits rides up to 30 km each way. For longer commutes, choose a 48 V battery or carry a spare. Eco mode maximises range while still providing meaningful pedal assistance.',
    },
    {
      question: 'Are commuter e-bikes good for hilly areas?',
      answer: 'Yes — mid-drive commuter e-bikes handle hills better than hub motors because they use the bike\'s gears for torque multiplication. For steep climbs, look for 65+ Nm torque. Our Urban range includes both hub and mid-drive options rated by hill-climbing ability.',
    },
  ],

  'cargo-family-ebikes': [
    {
      question: 'How much weight can a cargo e-bike carry?',
      answer: 'Cargo e-bikes typically carry 80–200 kg total payload including the rider. Long-tail models suit 2 child seats plus groceries. Front-loader (bakfiets) styles carry larger, bulkier loads. Each product page lists the manufacturer\'s maximum gross vehicle weight.',
    },
    {
      question: 'Can I use a cargo e-bike for school runs?',
      answer: 'Absolutely — cargo e-bikes are popular for school runs in Australia. Fit up to two child seats on a long-tail, or use a front-loader box for younger children. Add a rain canopy for weather protection. They replace a second car for many families.',
    },
  ],

  'electric-mountain-bikes': [
    {
      question: 'Full suspension or hardtail eMTB — which should I choose?',
      answer: 'Hardtail eMTBs cost less and are lighter, suiting fire roads, gravel, and moderate trails. Full-suspension eMTBs absorb rough terrain better, improving control on rocky descents and root-strewn singletrack. For serious trail riding, full suspension is worth the extra investment.',
    },
    {
      question: 'Can I ride an electric mountain bike on trails in Australia?',
      answer: 'E-MTBs are welcome on most mountain bike trails across Australia. Some land managers restrict e-bike access, so check trail-specific rules — MTBA (Mountain Bike Australia) maintains an e-bike trail access guide. Pedelec-only e-MTBs (250 W, 25 km/h assist) have the widest trail access.',
    },
  ],

  'foldable-electric-bikes': [
    {
      question: 'Can I take a folding e-bike on public transport?',
      answer: 'Yes — folding e-bikes are allowed on trains, trams, and buses across most Australian cities when folded. Melbourne Metro, Sydney Trains, and Brisbane TransLink all permit folded bikes. Check your local operator for size restrictions. Most of our folding e-bikes fold to under 80×60×40 cm.',
    },
    {
      question: 'How heavy are folding electric bikes?',
      answer: 'Folding e-bikes weigh 15–25 kg depending on battery size and frame material. Lightweight models under 18 kg suit daily train commuters. If carrying weight matters, look for carbon or aluminium frames with smaller 36 V batteries. Our listings show exact folded dimensions and weight.',
    },
  ],

  'fat-tyre-lifestyle-ebikes': [
    {
      question: 'What are fat tyre e-bikes good for?',
      answer: 'Fat tyre e-bikes (4-inch+ tyres) excel on sand, snow, gravel, and loose surfaces where thin tyres sink. They\'re also popular as cruiser-style lifestyle bikes for casual urban riding. The wide tyres provide a cushioned, stable ride without suspension on most surfaces.',
    },
    {
      question: 'Are moped-style e-bikes road legal in Australia?',
      answer: 'Moped-style e-bikes with 250 W motors and pedal assist only (25 km/h max assist) are road legal in Australia without registration. Models with throttles or higher-powered motors may require registration as motor vehicles. Our product pages clearly indicate road-legal compliance.',
    },
  ],

  'commuter-electric-scooters': [
    {
      question: 'What is the best electric scooter for commuting?',
      answer: 'The best commuter e-scooter has 30+ km range, pneumatic tyres for comfort, front and rear brakes, and weighs under 15 kg for carrying. IP54 water resistance handles light rain. Budget $600–$1,200 for a reliable daily commuter. Our commuter range includes models from Segway, Xiaomi, and VSETT.',
    },
    {
      question: 'How do I maintain my commuter e-scooter?',
      answer: 'Check tyre pressure weekly (if pneumatic), inspect brakes monthly, and tighten folding mechanism bolts every 500 km. Clean the deck and wheels after wet rides. Charge after every ride but avoid leaving plugged in overnight. Service brake pads and cables every 1,000 km.',
    },
  ],

  'long-range-electric-scooters': [
    {
      question: 'How fast do performance electric scooters go?',
      answer: 'Dual-motor performance scooters reach 60–100+ km/h. Single-motor long-range models typically max at 45–55 km/h. In Australian states where e-scooters are street-legal, the public road limit is 25 km/h. High-speed models are for private property or designated tracks only.',
    },
    {
      question: 'What range can a long-range e-scooter achieve?',
      answer: 'Long-range e-scooters with 48 V 20 Ah+ batteries deliver 60–100 km per charge in eco mode. Dual-battery setups exceed 120 km. Actual range depends on speed, rider weight, terrain, and temperature. Our listings show both manufacturer range and real-world tested estimates.',
    },
  ],

  'hoverboards': [
    {
      question: 'Are hoverboards safe for kids?',
      answer: 'Modern hoverboards with UL2272 certification are safe for children aged 8 and above. Essential safety features include a self-balancing mode, non-slip foot pads, and a speed limiter. Always pair with a helmet, knee pads, and elbow pads. Supervise beginners on flat, open ground.',
    },
  ],

  'electric-unicycles': [
    {
      question: 'How hard is it to ride an electric unicycle?',
      answer: 'Most riders learn basic electric unicycle balance in 3–10 hours of practice. Start near a wall or railing for support. Beginner-friendly EUCs have wider pedals and lower max speeds. The learning curve is steeper than scooters but rewarding — experienced riders cover 50+ km per charge.',
    },
  ],

  'electric-balance-bikes': [
    {
      question: 'What age is an electric balance bike for?',
      answer: 'Electric balance bikes suit ages 2–5 with 12-inch wheels and a top speed of 5–10 km/h. They teach throttle control and balance before children move to pedal bikes. Look for adjustable speed limiters and a lightweight frame the child can manage independently.',
    },
  ],

  'youth-electric-dirt-bikes': [
    {
      question: 'What age is a youth electric dirt bike for?',
      answer: 'Youth electric dirt bikes suit ages 8–16 depending on the frame size and motor power. Smaller pit bikes (14–16 inch wheels, up to 25 km/h) suit 8–12 year olds. Full-size youth models suit 12–16. Always match the bike to the child\'s height and riding experience.',
    },
  ],

  'electric-go-karts': [
    {
      question: 'Are electric go-karts safe for kids?',
      answer: 'Electric go-karts with adjustable speed limiters, seatbelts, and roll bars are safe for children aged 6 and above on flat, enclosed surfaces. Always supervise younger riders. Our go-karts have progressive throttle controls that parents can set to a safe maximum speed.',
    },
  ],

  'travel-mobility-scooters': [
    {
      question: 'Can I take a folding mobility scooter on an aeroplane?',
      answer: 'Many folding mobility scooters are airline-approved if the lithium battery is under 300 Wh and removable. Check with your airline for specific battery and weight limits. Our travel models clearly state airline compatibility. Remove the battery and carry it in the cabin.',
    },
  ],

  'heavy-duty-mobility-scooters': [
    {
      question: 'What terrain can a heavy-duty mobility scooter handle?',
      answer: 'Heavy-duty mobility scooters with 4 wheels and pneumatic tyres handle grass, gravel, gentle slopes, and uneven footpaths. They are not designed for steep hills, sand, or mud. Models with full suspension and larger wheels manage rougher surfaces. Check each product\'s terrain rating.',
    },
  ],

  // ── New Categories & Subcategories ──────────────────────────────

  'electric-dirt-motorbikes': [
    {
      question: 'Do I need a licence for an electric dirt bike in Australia?',
      answer: 'On private property, no licence is required. On public roads, electric dirt bikes exceeding 250 W or 25 km/h are classified as motor vehicles in most states and require registration, a motorcycle licence, and compulsory third-party insurance. Keep high-power models on private land or designated tracks.',
    },
    {
      question: 'What is the difference between Sur-Ron and Talaria electric dirt bikes?',
      answer: 'Sur-Ron offers a wider model range from the entry-level Light Bee S to the road-registrable Storm Bee. Talaria focuses on high-torque off-road performance with the XXX and X3 series. Both brands use swappable lithium batteries. Parts availability in Australia is strong for both.',
    },
  ],

  'electric-mopeds': [
    {
      question: 'Are electric mopeds road legal in Australia?',
      answer: 'Electric mopeds that meet the definition of a moped (50 cc equivalent, max 50 km/h) are road legal in all Australian states with moped registration, a car or motorcycle licence, and a helmet. Models like the NIU NQi and Super SOCO CUx are designed for on-road use with full lighting and indicators.',
    },
    {
      question: 'How far can an electric moped go on one charge?',
      answer: 'Most electric mopeds deliver 60–100 km per charge depending on speed and rider weight. Dual-battery models like the NIU NQi GTS Sport can exceed 120 km. Charge times range from 4–7 hours on a standard household outlet.',
    },
  ],

  'electric-tricycles': [
    {
      question: 'Who are electric tricycles best suited for?',
      answer: 'Electric trikes suit riders who want extra stability — older adults, people with balance concerns, and anyone carrying heavy loads. The three-wheel design eliminates the need to balance at stops. Many models include a large rear cargo basket for shopping or deliveries.',
    },
  ],

  'hub-motor-conversion-kits': [
    {
      question: 'What is the difference between a hub motor and mid-drive conversion kit?',
      answer: 'Hub motor kits replace the front or rear wheel with a motorised wheel — they are simpler to install and cheaper. Mid-drive kits replace the bottom bracket and use the bike\'s gears for better torque and hill climbing. Hub kits suit flat commutes; mid-drives suit hilly terrain.',
    },
  ],

  'electric-quad-bikes': [
    {
      question: 'Are electric quad bikes legal in Australia?',
      answer: 'Electric quad bikes are legal on private property without any licence or registration. On public roads, they must meet ADR (Australian Design Rules) standards, be registered, and the rider must hold a motorcycle or car licence depending on the state. Most recreational models are for private land only.',
    },
    {
      question: 'What age can kids ride electric quad bikes?',
      answer: 'Electric quad bikes with speed limiters suit children from age 6. Models under 800 W with parental speed controls are safest for younger riders. Always supervise children, require a helmet, and start on flat, enclosed ground away from traffic.',
    },
  ],

  'kids-electric-quads': [
    {
      question: 'What is the best electric quad bike for kids?',
      answer: 'For ages 6–10, look for models under 800 W with adjustable speed limiters, a kill switch, and a sturdy roll bar. The Razor Dirt Quad 500 and MotoTec 36V are popular entry points. Match the quad to the child\'s weight — most kids models support 55–75 kg.',
    },
  ],

  'adult-electric-quads': [
    {
      question: 'How powerful are adult electric quad bikes?',
      answer: 'Adult electric ATVs range from 3 kW farm utility models to 60+ kW performance machines like the Segway Villain SX10. Battery capacity determines range — expect 40–80 km per charge for recreational riding. High-torque electric motors deliver instant acceleration without gear shifting.',
    },
  ],

  'electric-water-sports': [
    {
      question: 'Do I need a licence for an electric surfboard or eFoil?',
      answer: 'Electric surfboards and eFoils are generally unregulated in Australian waters, but local waterway rules may apply. Electric jet skis require a personal watercraft licence in all states. Always check your state maritime authority for powered watercraft rules before riding.',
    },
    {
      question: 'How long does an electric surfboard battery last?',
      answer: 'Most electric surfboards and eFoils deliver 60–90 minutes of ride time per charge. Riding style affects duration — cruising at low speed extends it, while full-throttle carving shortens it. Batteries charge in 1.5–3 hours. Carry a spare battery for extended sessions.',
    },
  ],

  'electric-surfboards': [
    {
      question: 'What is the difference between an eFoil and an electric surfboard?',
      answer: 'An eFoil (electric hydrofoil) lifts the board above the water on a wing, creating a silent, smooth ride over flat water. A traditional electric surfboard rides on the surface like a powered shortboard. eFoils require more practice but are quieter and more efficient.',
    },
  ],

  'electric-jetskis': [
    {
      question: 'How fast do electric jet skis go?',
      answer: 'Electric jet skis reach 50–100+ km/h depending on the model. The Taiga Orca Carbon tops out at around 100 km/h. Battery range is typically 1.5–2.5 hours of mixed riding. They are significantly quieter than petrol jet skis and produce zero emissions on the water.',
    },
  ],
};
