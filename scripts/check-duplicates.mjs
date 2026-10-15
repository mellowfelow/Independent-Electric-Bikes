// Duplicate-content audit on the built site. Run `npm run build` first, then `npm run check:duplicates`.
// For every canonical page it compares: <title>, meta description, and the visible body text of the main content
// (5-word shingles). Fails when two pages share an identical title or description, or when two product/brand pages
// overlap too much in body text or repeat a whole paragraph on many pages.
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), '.next', 'server', 'app');
if (!fs.existsSync(ROOT)) {
  console.error('No build found. Run `npm run build` first.');
  process.exit(2);
}
const MAX_OVERLAP = Number(process.argv[2] || 0.45); // share of 5-word shingles two pages may have in common
const MAX_PARAGRAPH_PAGES = Number(process.argv[3] || 6); // a long paragraph may appear on at most this many pages

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const pages = [];
for (const f of files) {
  let url = '/' + path.relative(ROOT, f).replace(/\\/g, '/').replace(/\.html$/, '') + '/';
  if (url === '/index/') url = '/';
  if (/_not-found|_global-error|\/admin|thank-you|\/checkout|\/search/.test(url)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const canon = (html.match(/<link rel="canonical" href="https?:\/\/[^/]+(\/[^"]*)"/) || [])[1];
  if (canon && canon !== url) continue;
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || '');
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const fullMain = (html.match(/<main[^]*?<\/main>/) || [''])[0].replace(/<script[^]*?<\/script>/g, '').replace(/<style[^]*?<\/style>/g, '');
  // Product and brand pages: judge the descriptive copy (lead paragraph + About section), not shared card or trust-bar chrome.
  const section = (id) => {
    const i = fullMain.indexOf(`id="${id}"`);
    if (i < 0) return '';
    const s = fullMain.lastIndexOf('<section', i);
    const e = fullMain.indexOf('</section>', i);
    return fullMain.slice(s, e);
  };
  const lead = (fullMain.match(/class="text-xs sm:text-sm text-slate-300 leading-relaxed border-y[^>]*>([^<]*)</) || [])[1] || '';
  const isProduct = url.startsWith('/shop/') && url.split('/').filter(Boolean).length === 3;
  const isBrand = url.startsWith('/brands/') && url !== '/brands/';
  const main = isProduct ? `<p>${lead}</p>${section('about-heading')}` : isBrand ? `${fullMain.slice(0, 6000)}${section('brand-about')}` : fullMain;
  const paras = [...main.matchAll(/<p[^>]*>([^]*?)<\/p>/g)].map((m) => decode(m[1].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()).filter((t) => t.length > 90);
  const text = decode(main.replace(/<[^>]*>/g, ' ')).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
  const kind = url.startsWith('/shop/') && url.split('/').filter(Boolean).length === 3 ? 'product' : url.startsWith('/brands/') && url !== '/brands/' ? 'brand' : url.startsWith('/blog/') && url !== '/blog/' ? 'post' : url.startsWith('/shop/') ? 'category' : 'other';
  pages.push({ url, kind, title, desc, paras, words: text.split(' '), });
}

let problems = 0;
const report = (msg) => { problems++; console.log('  ' + msg); };

// 1. exact duplicates
for (const field of ['title', 'desc']) {
  const seen = new Map();
  for (const p of pages) if (p[field]) seen.set(p[field], [...(seen.get(p[field]) || []), p.url]);
  const dups = [...seen].filter(([, u]) => u.length > 1);
  console.log(`Duplicate ${field}s: ${dups.length}`);
  dups.slice(0, 8).forEach(([t, u]) => report(`${t.slice(0, 60)} -> ${u.slice(0, 3).join(', ')}`));
}

// 2. repeated long paragraphs
const paraPages = new Map();
for (const p of pages) if (p.kind !== 'post') for (const t of new Set(p.paras)) paraPages.set(t, [...(paraPages.get(t) || []), p.url]);
const repeated = [...paraPages].filter(([, u]) => u.length > MAX_PARAGRAPH_PAGES);
console.log(`Paragraphs (90+ chars) used on more than ${MAX_PARAGRAPH_PAGES} pages: ${repeated.length}`);
repeated.slice(0, 20).forEach(([t, u]) => report(`${u.length} pages: ${t.slice(0, 70)} | ${u.slice(0, 3).join(" ")}`));

// 3. body-text overlap inside page types that are templated
const shingles = (words) => {
  const s = new Set();
  for (let i = 0; i + 5 <= words.length; i++) s.add(words.slice(i, i + 5).join(' '));
  return s;
};
for (const kind of ['product', 'brand']) {
  const group = pages.filter((p) => p.kind === kind).map((p) => ({ url: p.url, sh: shingles(p.words) }));
  // shingles shared by many pages are template chrome (trust bar, nav labels); ignore ones on over 30% of the group
  const df = new Map();
  for (const g of group) for (const s of g.sh) df.set(s, (df.get(s) || 0) + 1);
  const chrome = new Set([...df].filter(([, n]) => n > group.length * 0.3).map(([s]) => s));
  const inverted = new Map();
  group.forEach((g, i) => { for (const s of g.sh) if (!chrome.has(s)) (inverted.get(s) ?? inverted.set(s, []).get(s)).push(i); });
  let worst = { o: 0, a: '', b: '' };
  let over = 0;
  for (let i = 0; i < group.length; i++) {
    const counts = new Map();
    for (const s of group[i].sh) {
      if (chrome.has(s)) continue;
      const list = inverted.get(s);
      if (!list || list.length > 25) continue;
      for (const j of list) if (j > i) counts.set(j, (counts.get(j) || 0) + 1);
    }
    const own = [...group[i].sh].filter((s) => !chrome.has(s)).length || 1;
    for (const [j, c] of counts) {
      const other = [...group[j].sh].filter((s) => !chrome.has(s)).length || 1;
      const o = c / Math.min(own, other);
      if (o > MAX_OVERLAP) over++;
      if (o > worst.o) worst = { o, a: group[i].url, b: group[j].url };
    }
  }
  console.log(`${kind} pages: ${group.length}; pairs above ${Math.round(MAX_OVERLAP * 100)}% overlap: ${over}; worst pair ${Math.round(worst.o * 100)}% (${worst.a} / ${worst.b})`);
  if (over) problems++;
}

console.log(problems ? `\n${problems} problem group(s) found.` : '\nNo duplicate content problems found.');
process.exit(problems ? 1 : 0);
