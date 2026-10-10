// One-off: wires the blog guide link panel, breadcrumbs and thin-guide handling into the blog post page and sitemap.
import fs from 'node:fs';

let p = fs.readFileSync('app/blog/[slug]/page.tsx', 'utf8');
const crlf = p.includes('\r\n');
p = p.replace(/\r\n/g, '\n');
const rep = (a, b) => {
  if (!p.includes(a)) throw new Error('missing: ' + a.slice(0, 60));
  p = p.replace(a, b);
};

rep("import { JsonLd } from '@/components/JsonLd';", "import { JsonLd } from '@/components/JsonLd';\nimport { Breadcrumbs } from '@/components/Breadcrumbs';\nimport { GUIDE_LINKS } from '@/config/blogLinks';");
rep('  if (!post) return {};\n\n  return {', '  if (!post) return {};\n  const hasBody = GUIDE_LINKS[post.slug]?.body ?? false;\n\n  return {\n    ...(hasBody ? {} : { robots: { index: false, follow: true } }),');

const bs = p.indexOf('  const breadcrumbSchema = {');
const be = p.indexOf('  };\n', bs) + 5;
p =
  p.slice(0, bs) +
  "  const guide = GUIDE_LINKS[post.slug] ?? { body: false, shop: [] };\n  const trail = [\n    { name: 'Home', href: '/' },\n    { name: 'Blog', href: '/blog/' },\n    { name: post.title, href: `/blog/${post.slug}/` },\n  ];\n  const moreGuides = POSTS.filter((x) => x.slug !== post.slug).slice(0, 3);\n" +
  p.slice(be);
rep('      <JsonLd data={breadcrumbSchema} />\n', '');

const ns = p.indexOf('          <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">');
const ne = p.indexOf('</nav>', ns) + 7;
p = p.slice(0, ns) + '          <Breadcrumbs items={trail} />\n' + p.slice(ne);

const as = p.indexOf('            <p>\n              When evaluating the');
const ae = p.indexOf('            <div className="bg-emerald-950/40');
let body = p.slice(as, ae);
body = body
  .replace('Flagship VYRON electric bikes utilize 80Nm high-torque Bafang rear hub motors that deliver immediate assistance as soon as pedal sensors engage.', "Hub motors deliver assistance as soon as the pedal sensor engages, while mid-drive motors work through the gears and suit steep climbs. Check the torque figure on the manufacturer's page for the exact model.")
  .replace('Always select electric bikes powered by Samsung 21700 or LG Chem lithium-ion cells with integrated Battery Management Systems (BMS) for thermal cut-off protection.', 'Look for a battery with a built-in Battery Management System (BMS) for thermal cut-off protection, and ask the seller which cell brand and certification the pack uses.')
  .replace('Generic battery packs deteriorate rapidly after 200 recharge cycles or fail during hot Australian summer heatwaves.', 'Low-quality packs can lose capacity quickly or struggle in hot Australian summers.');
p =
  p.slice(0, as) +
  '            {guide.body ? (\n              <>\n' +
  body +
  '              </>\n            ) : (\n              <p>The full guide is being written. In the meantime, browse the related products below or <Link href="/contact/" className="text-emerald-400 underline">ask us a question</Link>.</p>\n            )}\n\n' +
  p.slice(ae);

rep('Explore our full electric commuter and cargo bike range assembled in Brunswick, Victoria with express freight across Australia.', 'Explore our full electric commuter and cargo bike range, dispatched from Brunswick, Victoria with express freight across Australia.');

const chip = 'inline-block rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-emerald-500 hover:text-emerald-400';
rep(
  '          </article>\n',
  '          </article>\n\n' +
    '          {guide.shop.length > 0 && (\n' +
    '            <section aria-label="Related products" className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">\n' +
    '              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-emerald-400">Shop related to this guide</h2>\n' +
    '              <ul className="flex flex-wrap gap-2">\n' +
    '                {guide.shop.map((l) => (\n' +
    `                  <li key={l.href}><Link href={l.href} className="${chip}">{l.label}</Link></li>\n` +
    '                ))}\n' +
    '              </ul>\n' +
    '            </section>\n' +
    '          )}\n\n' +
    '          <section aria-label="More guides" className="mt-8">\n' +
    '            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-emerald-400">More guides</h2>\n' +
    '            <ul className="space-y-2">\n' +
    '              {moreGuides.map((g) => (\n' +
    '                <li key={g.slug}><Link href={`/blog/${g.slug}/`} className="text-sm font-bold text-white hover:text-emerald-400">{g.title}</Link></li>\n' +
    '              ))}\n' +
    '            </ul>\n' +
    '          </section>\n',
);
fs.writeFileSync('app/blog/[slug]/page.tsx', crlf ? p.replace(/\n/g, '\r\n') : p);

let s = fs.readFileSync('app/sitemap.ts', 'utf8');
s = s
  .replace("import { ACTIVE_BRANDS }", "import { GUIDE_LINKS } from '@/config/blogLinks';\nimport { ACTIVE_BRANDS }")
  .replace('for (const post of POSTS) add(', 'for (const post of POSTS.filter((x) => GUIDE_LINKS[x.slug]?.body)) add(');
fs.writeFileSync('app/sitemap.ts', s);
console.log('ok');
