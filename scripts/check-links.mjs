// Internal link audit. Run `npm run build` first, then `npm run check:links`.
// Reads the prerendered HTML in .next/server/app, ignores duplicate-path pages (their canonical is the real URL),
// and reports broken internal links, unreachable pages, and pages with few contextual (non-header/footer) inbound links.
// Exits 1 when a broken link or an unreachable page is found.
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), '.next', 'server', 'app');
if (!fs.existsSync(ROOT)) {
  console.error('No build found. Run `npm run build` first.');
  process.exit(2);
}
const MIN_INBOUND = Number(process.argv[2] || 2);

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (f.endsWith('.html')) files.push(p);
  }
})(ROOT);

const cut = (h, a, b) => {
  const i = h.indexOf(a);
  if (i < 0) return h;
  const j = h.indexOf(b, i);
  return j < 0 ? h : h.slice(0, i) + h.slice(j + b.length);
};
const hrefs = (h) => {
  const out = [];
  let i = 0;
  while ((i = h.indexOf('<a ', i)) >= 0) {
    const e = h.indexOf('</a>', i);
    if (e < 0) break;
    const m = h.slice(i, e).match(/href="([^"]*)"/);
    if (m) out.push(m[1].split('#')[0].split('?')[0]);
    i = e + 4;
  }
  return out;
};
const withSlash = (h) => (h.startsWith('/') && !h.endsWith('/') && !/\.[a-z0-9]+$/.test(h) ? h + '/' : h);

const pages = new Map();
for (const f of files) {
  let url = '/' + path.relative(ROOT, f).replace(/\\/g, '/').replace(/\.html$/, '') + '/';
  if (url === '/index/') url = '/';
  if (/_not-found|_global-error/.test(url)) continue;
  const html = fs.readFileSync(f, 'utf8');
  const cm = html.match(/<link rel="canonical" href="https?:\/\/[^/]+(\/[^"]*)"/);
  pages.set(url, { canon: cm ? withSlash(cm[1]) : url, all: hrefs(html), body: hrefs(cut(cut(html, '<header', '</header>'), '<footer', '</footer>')) });
}
const canonOf = (u) => pages.get(u)?.canon ?? u;
for (const [u, p] of [...pages]) if (p.canon !== u) pages.delete(u);

const resolve = (h) => {
  if (!h.startsWith('/')) return null;
  const t = withSlash(h);
  return pages.has(t) ? t : pages.has(canonOf(t)) ? canonOf(t) : t;
};

const broken = [];
const inbound = new Map();
const reach = new Map([['/', 0]]);
for (const [u, p] of pages) {
  for (const h of p.all) {
    const t = resolve(h);
    if (!t || /^\/(api|_next)\//.test(t) || /\.[a-z0-9]+$/.test(t)) continue;
    if (!pages.has(t)) broken.push(`${u} -> ${t}`);
  }
  for (const t of new Set(p.body.map(resolve).filter((x) => x && x !== u && pages.has(x)))) inbound.set(t, (inbound.get(t) || 0) + 1);
}
const queue = ['/'];
while (queue.length) {
  const u = queue.shift();
  for (const h of pages.get(u).all) {
    const t = resolve(h);
    if (t && pages.has(t) && !reach.has(t)) {
      reach.set(t, reach.get(u) + 1);
      queue.push(t);
    }
  }
}

const unreachable = [...pages.keys()].filter((u) => !reach.has(u) && !/^\/(admin|checkout|search)\//.test(u));
const weak = [...pages.keys()].filter((u) => (inbound.get(u) || 0) < MIN_INBOUND && !/^\/(admin|checkout|search|thank-you)/.test(u));

console.log(`Pages (canonical): ${pages.size}`);
console.log(`Broken internal links: ${broken.length}`);
broken.slice(0, 50).forEach((b) => console.log('  ' + b));
console.log(`Unreachable from home: ${unreachable.length}`);
unreachable.slice(0, 30).forEach((u) => console.log('  ' + u));
console.log(`Pages with fewer than ${MIN_INBOUND} contextual inbound links: ${weak.length}`);
weak.slice(0, 30).forEach((u) => console.log(`  ${u} (${inbound.get(u) || 0})`));
process.exit(broken.length || unreachable.length ? 1 : 0);
