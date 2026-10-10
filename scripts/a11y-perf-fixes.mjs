// One-off: accessibility and loading fixes from the 2026-10-10 Lighthouse run (contrast, target size, heading order, lazy images).
import fs from 'node:fs';

const edit = (file, pairs) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = t.replace(/\r\n/g, '\n');
  for (const [a, b, all] of pairs) {
    if (!t.includes(a)) throw new Error(file + ': missing ' + a.slice(0, 60));
    t = all ? t.split(a).join(b) : t.replace(a, b);
  }
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};

// Trustpilot filter: white on #00b67a is 2.9:1. Use the darker brand-compatible green.
edit('components/TrustpilotReviews.tsx', [
  ["'bg-[#00b67a] text-white shadow-lg shadow-[#00b67a]/20'", "'bg-emerald-700 text-white shadow-lg shadow-emerald-950/30'"],
  [
    ['className={`h-2 rounded-full transition-all ${', "                idx === currentIndex ? 'w-8 bg-[#00b67a]' : 'w-2 bg-slate-800 hover:bg-slate-700'", '              }`}', '            />'].join('\n'),
    [
      'className="group flex h-6 min-w-6 items-center justify-center"',
      '            >',
      "              <span className={`block h-2 rounded-full transition-all ${idx === currentIndex ? 'w-8 bg-[#00b67a]' : 'w-2 bg-slate-700 group-hover:bg-slate-600'}`} />",
      '            </button>',
    ].join('\n'),
  ],
]);

// Footer: copyright text contrast, underlined ABN link inside text.
edit('components/Footer.tsx', [
  ['py-6 px-4 text-slate-500 text-[11px]', 'py-6 px-4 text-slate-400 text-[11px]'],
]);

// Hero dots: 24px minimum target.
edit('components/HomeHero.tsx', [['className="flex h-10 w-5 items-center justify-center"', 'className="flex h-10 w-6 items-center justify-center"']]);

// Product card title is an h2 so pages that jump from h1 to cards keep a valid heading order.
edit('components/ProductCard.tsx', [
  ['<h3 className="text-xs font-extrabold text-white mt-0.5', '<h2 className="text-xs font-extrabold text-white mt-0.5'],
  ['<Link href={productUrl}>{product.name}</Link>\n          </h3>', '<Link href={productUrl}>{product.name}</Link>\n          </h2>'],
]);

// Home: below-the-fold images are lazy (they competed with the hero for bandwidth); trust bar uses h3.
edit('app/page.tsx', [
  ['                <img\n                  src={cat.image}\n                  alt={cat.name}\n', '                <img\n                  src={cat.image}\n                  alt={cat.name}\n                  width={1200}\n                  height={900}\n                  loading="lazy"\n                  decoding="async"\n'],
  ['                  <img\n                    src={post.image}\n                    alt={post.title}\n', '                  <img\n                    src={post.image}\n                    alt={post.title}\n                    width={2000}\n                    height={1125}\n                    loading="lazy"\n                    decoding="async"\n'],
  ['<h4 className="font-bold text-white text-xs">', '<h3 className="font-bold text-white text-xs">', true],
]);
edit('app/blog/page.tsx', [['<img src={post.image} alt={post.title} className=', '<img src={post.image} alt={post.title} width={2000} height={1125} loading="lazy" decoding="async" className=']]);

// Product page link row: bigger tap targets.
edit('app/shop/[...slug]/page.tsx', [
  ['className="text-emerald-400 hover:text-emerald-300">More in {t.name} &rarr;</Link>', 'className="inline-block py-2 text-emerald-400 hover:text-emerald-300">More in {t.name} &rarr;</Link>'],
  ['className="text-emerald-400 hover:text-emerald-300">More from {brand.name} &rarr;</Link>', 'className="inline-block py-2 text-emerald-400 hover:text-emerald-300">More from {brand.name} &rarr;</Link>'],
]);
console.log('done');
