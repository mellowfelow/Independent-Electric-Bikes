import { PRODUCTS, SHOP, type Product } from '@/config/site';
import { COPY_POOLS, type CopyPool } from '@/config/data/copy';
import { brandNameOf, productCategoryLabel } from '@/lib/catalog';
import { fitsOfPart, partsForVehicle } from '@/lib/compat';

/**
 * Unique, fact-based product copy. Nothing here invents a specification: every product-specific statement comes from
 * the product's own name, price, category, brand, compatibility data or (for the few verified models) the manufacturer
 * data. The remaining guidance describes the product TYPE in general and is rotated so no two pages share the same mix.
 */

const money0 = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`;

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
};
const pickBy = <T,>(list: T[], seed: string): T => list[hash(seed) % list.length];
const ordinal = (n: number) => {
  const v = n % 100;
  const s = ['th', 'st', 'nd', 'rd'];
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};
const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

/** Everything the product name itself tells us. */
interface Attrs {
  volts?: number;
  ah?: number;
  wh?: number;
  watts?: number;
  wheel?: string;
  tyre?: string;
  flags: string[];
}

const FLAGS: [string, RegExp][] = [
  ['stepthrough', /step[- ]?thr(?:ough|u)|low[- ]step/i],
  ['stepover', /step[- ]?over|diamond/i],
  ['folding', /\bfold(?:ing|er|able)?\b/i],
  ['cargo', /\bcargo\b|long[- ]?tail|front[- ]loader|\bbox bike\b/i],
  ['dualbattery', /dual battery/i],
  ['dualmotor', /dual(?: \d+w)? motor|\bdual \d+w\b/i],
  ['belt', /\bbelt\b/i],
  ['fattyre', /fat[- ]?(?:tyre|tire)/i],
  ['hardtail', /hardtail/i],
  ['fullsusp', /full[- ]?susp|dual[- ]susp/i],
  ['suspension', /\bsuspension\b/i],
  ['middrive', /mid[- ]?drive/i],
  ['hubmotor', /hub motor/i],
  ['allterrain', /all[- ]terrain|off[- ]?road/i],
  ['longrange', /long[- ]range/i],
  ['lightweight', /lightweight|\blight\b/i],
  ['mini', /\bmini\b|compact/i],
  ['kids', /\bkids?\b|youth|\bjunior\b/i],
  ['replacement', /replacement|spare/i],
  ['pair', /\(pair\)|\bpair\b|\b3-pack\b/i],
  ['smart', /\bsmart\b|bluetooth|app\b/i],
];

export function parseAttrs(name: string): Attrs {
  const a: Attrs = { flags: [] };
  const v = name.match(/\b(\d{2,3}(?:\.\d)?)\s?V\b/);
  if (v) a.volts = Number(v[1]);
  const ah = name.match(/\b(\d{1,3}(?:\.\d)?)\s?Ah\b/i);
  if (ah) a.ah = Number(ah[1]);
  const wh = name.match(/\b(\d{3,4})\s?Wh\b/i);
  if (wh) a.wh = Number(wh[1]);
  const w = name.match(/\b(\d{3,5})\s?W\b/);
  if (w) a.watts = Number(w[1]);
  const wheel = name.match(/\b(\d{2}(?:\.\d)?)(?:\s?(?:inch|in)\b|")/i);
  if (wheel) a.wheel = wheel[1];
  const tyre = name.match(/\b(\d{2}(?:\.\d)?\s?x\s?\d(?:\.\d+)?)\b|\b(700\s?x\s?\d+c)\b|\b(700c)\b/i);
  if (tyre) a.tyre = (tyre[1] || tyre[2] || tyre[3]).replace(/\s+/g, '');
  if (!a.wh && a.volts && a.ah) a.wh = Math.round(a.volts * a.ah);
  for (const [k, re] of FLAGS) if (re.test(name)) a.flags.push(k);
  return a;
}

const FLAG_SENTENCES: Record<string, string[]> = {
  stepthrough: [
    'A step-through frame has a lowered or absent top tube, so the rider steps through the frame rather than swinging a leg over the saddle.',
    'The step-through layout in the name means a low frame entry, which helps with mounting at lights or while carrying a load.',
    'Step-through frames trade a little rigidity for easy access, a trade-off worth weighing against how often you stop, start and mount.',
  ],
  stepover: [
    'A step-over (diamond) frame has a traditional top tube, which usually gives a stiffer, more road-bike-like feel than a step-through.',
    'The step-over frame named here is the conventional shape; riders who find high frames awkward to mount may prefer to test a lower one first.',
  ],
  folding: [
    'Folding models are built to collapse for storage in a flat, a car boot or on public transport, which is the main reason people choose them.',
    'The folding design named here trades some ride stability for compact storage, so it suits short, mixed trips better than long open-road rides.',
    'Because it folds, check the folded dimensions and weight before buying, since lifting a heavy folded bike is where many riders feel the limit.',
  ],
  cargo: [
    'Cargo-style frames are built around carrying capacity, with a longer wheelbase or load platform so shopping, school gear or child seats can ride safely.',
    'A cargo layout changes how a bike handles, so a test ride, especially loaded, tells you more than any figure on a spec sheet.',
    'Longer cargo frames need more storage and parking space than a standard bike, which matters in apartments and shared garages.',
  ],
  dualbattery: [
    'Dual-battery systems add a second pack for extra range or a spare, at the cost of extra weight and a second charging routine.',
    'The dual-battery setup in the name suggests longer range options; the manufacturer sheet is the place to confirm usable capacity with both packs fitted.',
  ],
  dualmotor: [
    'Dual-motor designs put drive power on both wheels, which can help with traction and hills but also increases weight and battery drain.',
    'A dual-motor layout is usually aimed at buyers who want stronger acceleration and hill-climbing, so check local rules on where that performance may be used.',
  ],
  belt: [
    'A belt-driven drivetrain replaces the chain with a toothed belt, which is cleaner and quieter and needs no oiling.',
    'The belt drive named here avoids chain grease on clothing and is a common choice for riders who want low-maintenance commuting.',
  ],
  fattyre: [
    'Fat tyres run at lower pressure on a wider footprint, which smooths rough surfaces and gives grip on sand and gravel.',
    'Wide fat tyres add comfort and traction but also weight and rolling resistance, so they suit mixed terrain more than smooth-road speed.',
    'Fat-tyre bikes tend to be heavier and bulkier, so check that your storage and any car rack can handle the wider wheels.',
  ],
  hardtail: [
    'A hardtail has front suspension only, which keeps weight and maintenance down compared with a full-suspension bike.',
    'Hardtail trail bikes suit riders who value simplicity and climbing efficiency over rear-wheel comfort on rough descents.',
  ],
  fullsusp: [
    'Full suspension adds a rear shock for control and comfort on rough trail, with extra pivots that need periodic servicing.',
    'The full-suspension design named here is aimed at technical trail riding rather than smooth commuting.',
  ],
  suspension: [
    'Suspension of some kind is part of the specification, which softens bumps but adds moving parts that benefit from regular checks.',
    'Having suspension listed means ride comfort has been addressed, though travel and setup vary widely between models.',
  ],
  middrive: [
    'A mid-drive motor sits at the cranks and works through the bike gears, which usually suits hills and uneven terrain.',
    'Mid-drive systems place weight low and central, which helps balance, and they use the gears to stay efficient on climbs.',
  ],
  hubmotor: [
    'A hub motor sits in the wheel itself, a simple layout with few drivetrain parts to wear.',
    'Hub-motor drives are mechanically straightforward and quiet, and suit flatter routes and riders who want little drivetrain upkeep.',
  ],
  allterrain: [
    'The all-terrain or off-road wording points to tyres and a build meant for dirt, gravel or grass rather than only smooth pavement.',
    'Off-road capable models are usually restricted to private land or marked trails, so check where you plan to ride before buying.',
  ],
  longrange: [
    'Long-range models carry a larger battery to extend the distance between charges, which also adds weight and charging time.',
    'The long-range label is a manufacturer positioning, and real distance varies with rider weight, terrain, speed and temperature.',
  ],
  lightweight: [
    'Lighter models are easier to carry up stairs and lift onto racks, which matters when the bike is stored somewhere other than the ground floor.',
    'A lower overall weight helps handling and portability, though smaller batteries often come with it, so check what range the maker states.',
  ],
  mini: [
    'Mini or compact versions shrink the deck, frame or footprint for storage and portability, at some cost to stability at speed.',
    'The compact size in the name suits tight storage and mixed transport trips, so check it still fits your height and weight.',
  ],
  kids: [
    'Youth-sized products are scaled for smaller riders, so age, height and adult supervision matter more than top speed.',
    'Kids models normally pair a lower top speed with smaller dimensions, and protective gear should be treated as part of the purchase.',
  ],
  replacement: [
    'As a replacement part it must match the original in connector, size and rating, so confirm those details before ordering.',
    'Replacement items are only worth buying when they match the original specification, so compare the markings on the existing part first.',
  ],
  pair: [
    'This item is supplied as a pair or multi-pack, which matters when comparing its price against single-item listings.',
  ],
  smart: [
    'The smart or connected wording suggests app or electronic features, so check which phones and firmware versions the maker supports.',
  ],
};

function typeInfo(p: Product): CopyPool | undefined {
  return COPY_POOLS[`${p.category}/${p.subcategory}`];
}

function siblings(p: Product): Product[] {
  return PRODUCTS.filter((x) => x.category === p.category && x.subcategory === p.subcategory).sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
}

/** The product's position in its sub-category, used to rotate pool sentences so neighbours never share the same mix. */
function ringIndex(p: Product): number {
  const sib = PRODUCTS.filter((x) => x.category === p.category && x.subcategory === p.subcategory);
  return Math.max(0, sib.findIndex((x) => x.slug === p.slug));
}

/**
 * Steiner triple system on 21 points (Bose construction): 70 triples in which any two share at most one point.
 * Each product takes one triple of the 21 guidance sentences for its type, so two products of the same type never
 * share more than one guidance sentence.
 */
const TRIPLES: number[][] = (() => {
  const id = (x: number, i: number) => i * 7 + x;
  const out: number[][] = [];
  for (let x = 0; x < 7; x++) out.push([id(x, 0), id(x, 1), id(x, 2)]);
  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 7; x++) {
      for (let y = x + 1; y < 7; y++) out.push([id(x, i), id(y, i), id(((x + y) * 4) % 7, (i + 1) % 3)]);
    }
  }
  return out.map((tr) => tr.sort((a, b) => a - b));
})();

export interface ProductCopy {
  /** Two or three sentences, unique per product. Used for the lead paragraph, APIs and agent tools. */
  summary: string;
  /** Longer body paragraphs for the "About" section. */
  paragraphs: string[];
  /** Facts taken directly from the model name, labelled as such. */
  highlights: { label: string; value: string }[];
  /** Nearest models by price in the same sub-category (for links). */
  alternatives: Product[];
  /** Product-specific replacement for the generic "specification pending" notice. */
  specNotice: string;
}

export function productCopy(p: Product): ProductCopy {
  const brand = brandNameOf(p);
  const label = productCategoryLabel(p);
  const pool = typeInfo(p);
  const type = pool?.type ?? label.toLowerCase();
  const typePlural = pool?.typePlural ?? `${label.toLowerCase()} products`;
  const attrs = parseAttrs(p.name);
  const idx = ringIndex(p);
  const flat = pool ? [...pool.intro, ...pool.suits, ...pool.check, ...pool.care.slice(0, 3)] : [];
  const picks = flat.length === 21 ? TRIPLES[idx % TRIPLES.length].map((k) => flat[k]) : [];
  const seed = p.slug;
  const brandLead = p.name.toLowerCase().startsWith(brand.toLowerCase());
  const article = /^[aeiou]/i.test(type) ? 'an' : 'a';

  // 1. Opening sentence.
  const open = pickBy(
    [
      `${p.name} is ${article} ${type}${brandLead ? '' : ` from ${brand}`}, listed at ${money0(p.price)} AUD.`,
      `Listed at ${money0(p.price)} AUD, the ${p.name} is ${article} ${type}${brandLead ? '' : ` made by ${brand}`}.`,
      `${brandLead ? p.name : `${p.name} (${brand})`} is one of the ${typePlural} we stock, priced at ${money0(p.price)} AUD.`,
      `Among our ${typePlural}, the ${p.name}${brandLead ? '' : ` from ${brand}`} sits at ${money0(p.price)} AUD.`,
    ],
    seed
  );

  // 2. What the name itself states.
  const named: string[] = [];
  const highlights: { label: string; value: string }[] = [];
  if (attrs.volts && attrs.ah) {
    named.push(
      pickBy(
        [
          `The name lists a ${attrs.volts}V, ${attrs.ah}Ah battery, which multiplies out to about ${attrs.wh}Wh of nominal energy; the manufacturer's own figure is the one to rely on.`,
          `A ${attrs.volts}V ${attrs.ah}Ah rating appears in the model name, roughly ${attrs.wh}Wh when volts are multiplied by amp-hours.`,
        ],
        seed + 'b'
      )
    );
    highlights.push({ label: 'Battery (from name)', value: `${attrs.volts}V ${attrs.ah}Ah (about ${attrs.wh}Wh nominal)` });
  } else if (attrs.volts) {
    named.push(`The model name states a ${attrs.volts}V system, so any charger or accessory should match that voltage.`);
    highlights.push({ label: 'Voltage (from name)', value: `${attrs.volts}V` });
  } else if (attrs.wh) {
    named.push(`The model name quotes ${attrs.wh}Wh of battery capacity; the manufacturer's data sheet confirms how that translates into real-world distance.`);
    highlights.push({ label: 'Capacity (from name)', value: `${attrs.wh}Wh` });
  } else if (attrs.ah) {
    named.push(`A ${attrs.ah}Ah capacity is part of the model name, useful when comparing it with other packs at the same voltage.`);
    highlights.push({ label: 'Capacity (from name)', value: `${attrs.ah}Ah` });
  }
  if (attrs.watts) {
    named.push(
      pickBy(
        [
          `It is listed with a ${attrs.watts.toLocaleString('en-AU')}W rating; makers quote nominal, continuous or peak power differently, so compare like with like.`,
          `The ${attrs.watts.toLocaleString('en-AU')}W figure in the name is a power rating, and the difference between nominal and peak output varies by brand.`,
        ],
        seed + 'w'
      )
    );
    highlights.push({ label: 'Power (from name)', value: `${attrs.watts.toLocaleString('en-AU')}W` });
  }
  if (attrs.wheel) {
    named.push(`The ${attrs.wheel}-inch size in the name refers to the wheel or tyre, which affects ride feel, storage and which spare tyres will fit.`);
    highlights.push({ label: 'Size (from name)', value: `${attrs.wheel} inch` });
  } else if (attrs.tyre) {
    named.push(`The ${attrs.tyre.replace('x', ' x ')} marking is a tyre size, the detail to match when buying replacement tyres or tubes.`);
    highlights.push({ label: 'Tyre size (from name)', value: attrs.tyre.replace('x', ' x ') });
  }
  const flagLines = attrs.flags.filter((f) => FLAG_SENTENCES[f]).slice(0, 2).map((f) => pickBy(FLAG_SENTENCES[f], seed + f));
  const flagHighlights = attrs.flags
    .map((f) => ({ stepthrough: 'Step-through frame', stepover: 'Step-over frame', folding: 'Folding design', cargo: 'Cargo layout', dualbattery: 'Dual battery', dualmotor: 'Dual motor', belt: 'Belt drive', fattyre: 'Fat tyres', hardtail: 'Hardtail', fullsusp: 'Full suspension', middrive: 'Mid-drive', hubmotor: 'Hub motor', allterrain: 'All-terrain', longrange: 'Long-range', lightweight: 'Lightweight', mini: 'Compact', kids: 'Youth-sized', replacement: 'Replacement part', pair: 'Sold as a pair or pack' } as Record<string, string>)[f])
    .filter(Boolean) as string[];
  if (flagHighlights.length) highlights.push({ label: 'Named features', value: flagHighlights.join(', ') });

  // 3. Verified manufacturer data, where it exists.
  const verifiedBits: string[] = [];
  if (p.verified) {
    const s = p.specs;
    const f = p.filters || {};
    const drive = [f.motorType && `${f.motorType.toLowerCase()} motor`, f.sensorType && `${f.sensorType.toLowerCase()} pedal assist`].filter(Boolean);
    if (drive.length) verifiedBits.push(`The manufacturer lists a ${drive.join(' with ')}${f.brakeType ? ` and ${f.brakeType.toLowerCase()} brakes` : ''}.`);
    const figs = [s.range && `range ${s.range.toLowerCase()}`, s.topSpeed && `assisted top speed ${s.topSpeed}`, s.weight && `weight ${s.weight}`, s.payload && `payload ${s.payload}`].filter(Boolean);
    if (figs.length) verifiedBits.push(`Verified figures: ${figs.join(', ')}.`);
  }

  // 4. Type guidance: three sentences chosen so siblings share at most one.
  const [g1, g2, g3] = [picks[0] ?? '', picks[1] ?? '', picks[2] ?? ''];

  // 5. Price position among siblings.
  const sib = siblings(p);
  const pos = sib.findIndex((x) => x.slug === p.slug) + 1;
  const min = sib[0]?.price ?? p.price;
  const max = sib[sib.length - 1]?.price ?? p.price;
  const others = sib.filter((x) => x.slug !== p.slug);
  const alternatives = [...others].sort((a, b) => Math.abs(a.price - p.price) - Math.abs(b.price - p.price) || a.name.localeCompare(b.name)).slice(0, 3);
  let priceLine: string;
  if (sib.length >= 5) {
    priceLine = pickBy(
      [
        `By price it is ${ordinal(pos)} of ${sib.length} ${typePlural} listed here, across a range of ${money0(min)} to ${money0(max)}.`,
        `Of the ${sib.length} ${typePlural} in the catalogue, it ranks ${ordinal(pos)} from the lowest price; the full range runs from ${money0(min)} to ${money0(max)}.`,
      ],
      seed + 'p'
    );
  } else if (sib.length > 1) {
    priceLine = `It is one of ${sib.length} ${typePlural} listed, with prices from ${money0(min)} to ${money0(max)}.`;
  } else {
    priceLine = `It is currently the only ${type} in this part of the catalogue.`;
  }
  const altLine = alternatives.length
    ? `Closest alternatives by price: ${list(alternatives.map((a) => `${a.name} (${money0(a.price)})`))}.`
    : '';

  // 6. Compatibility and brand facts.
  let fitLine = '';
  const fit = fitsOfPart(p);
  if (fit && fit.confirmed.length + fit.system.length > 0) {
    const names = [...fit.confirmed, ...fit.system].slice(0, 3).map((x) => x.name);
    const total = fit.confirmed.length + fit.system.length;
    fitLine = `Listed as suiting ${total} ${total === 1 ? 'vehicle' : 'vehicles'} in the catalogue, including ${list(names)}.`;
  } else {
    const parts = partsForVehicle(p);
    if (parts.length) fitLine = `We list ${parts.length} matching ${parts.length === 1 ? 'part or accessory' : 'parts and accessories'} for it, such as ${list(parts.slice(0, 2).map((x) => x.part.name))}.`;
  }
  const brandProducts = PRODUCTS.filter((x) => brandNameOf(x) === brand);
  let brandLine = '';
  if (brandProducts.length > 1) {
    const bp = brandProducts.map((x) => x.price);
    brandLine = `${brand} has ${brandProducts.length} products listed, from ${money0(Math.min(...bp))} to ${money0(Math.max(...bp))}.`;
  } else {
    brandLine = `It is currently the only ${brand} product we list.`;
  }

  const lead = named[0] ?? flagLines[0] ?? '';
  const summary = [open, lead, priceLine].filter(Boolean).join(' ');

  // The body never repeats a sentence already used in the summary.
  const paragraphs = [
    [...named.slice(named[0] ? 1 : 0), ...verifiedBits].join(' '),
    [named[0] ? flagLines[0] : flagLines[1], g1, named[0] ? flagLines[1] : '', altLine || brandLine].filter(Boolean).join(' '),
    [g2, g3].filter(Boolean).join(' '),
    [fitLine, altLine ? brandLine : ''].filter(Boolean).join(' '),
  ].filter((t) => t.trim().length > 0);

  // 7. Specification notice for unverified vehicles, tied to this model.
  const missing = attrs.volts || attrs.wh ? 'motor output, range, weight and payload' : 'motor, battery, range, weight and payload';
  const specNotice = pickBy(
    [
      `We have not yet checked the ${p.name} against ${brand}'s own pages, so ${missing} are not published here. Ask us for the manufacturer sheet and the Australian road-legal status of this ${type} before you order.`,
      `Figures for ${missing} on the ${p.name} are held back until we have verified them with ${brand}. Contact us for the manufacturer's sheet and to confirm where this ${type} may be ridden in Australia.`,
      `The ${p.name} does not have a verified specification table yet: ${missing} still need confirming with ${brand}. We can send the maker's sheet and confirm road-legal status for this ${type} on request.`,
    ],
    seed + 'n'
  );

  void SHOP;
  return { summary, paragraphs, highlights, alternatives, specNotice };
}

/** Compact plain-text description for APIs, search and agent tools. */
export function productSummary(p: Product): string {
  return productCopy(p).summary;
}
