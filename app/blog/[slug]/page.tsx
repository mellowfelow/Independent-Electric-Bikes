import { fitTitle, fitDesc } from '@/lib/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GUIDE_LINKS } from '@/config/blogLinks';

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  const hasBody = GUIDE_LINKS[post.slug]?.body ?? false;

  return {
    ...(hasBody ? {} : { robots: { index: false, follow: true } }),
    title: fitTitle(post.title),
    description: fitDesc(post.excerpt, ' Read the full guide from Independent Electric Bikes.'),
    alternates: { canonical: `https://${SITE.domain}/blog/${post.slug}/` },
  };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
    },
    mainEntityOfPage: `https://${SITE.domain}/blog/${post.slug}/`,
  };

  const guide = GUIDE_LINKS[post.slug] ?? { body: false, shop: [] };
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: post.title, href: `/blog/${post.slug}/` },
  ];
  const moreGuides = POSTS.filter((x) => x.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={blogPostingSchema} />

      <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <Breadcrumbs items={trail} />

          <header className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
              <span className="text-emerald-400 uppercase tracking-wider">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">{post.title}</h1>
          </header>

          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] border border-slate-800">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <article className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            <p className="text-lg text-slate-200 font-medium leading-relaxed bg-slate-900 p-6 rounded-2xl border border-slate-800">
              {post.excerpt}
            </p>

            {guide.body ? (
              <>
            <p>
              When evaluating the <strong>best electric commuter bike in Australia</strong>, riders must weigh several critical factors: motor wattage and hill climbing torque, battery cell quality, braking safety, and local service support. In Australian capital cities like Melbourne, Sydney, and Brisbane, commuter routes often mix flat arterial roads with sudden steep incline gradients.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">1. Motor Wattage & Torque Output (Bafang Systems)</h2>
            <p>
              Under the EN 15194 pedal-assist standard used in Australia, a bike ridden as a bicycle on public roads has a motor limited to 250W continuous rated power with assistance cutting out at 25 km/h; more powerful or faster bikes may be restricted to private land. Wattage alone does not determine how easily a bike climbs hills—torque (measured in Newton-meters) is key. Hub motors deliver assistance as soon as the pedal sensor engages, while mid-drive motors work through the gears and suit steep climbs. Check the torque figure on the manufacturer&apos;s page for the exact model.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">2. Battery Cell Chemistry & Thermal Safety</h2>
            <p>
              Not all e-bike batteries are created equal. Low-quality packs can lose capacity quickly or struggle in hot Australian summers. Look for a battery with a built-in Battery Management System (BMS) for thermal cut-off protection, and ask the seller which cell brand and certification the pack uses.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">3. Hydraulic Disc Brakes vs Mechanical Brakes</h2>
            <p>
              Because electric bikes travel faster and weigh more than traditional bicycles, hydraulic disc brakes (such as Tektro HD-M275) provide significantly better stopping power and require minimal hand lever pressure compared to mechanical cable brakes.
            </p>

              </>
            ) : (
              <p>The full guide is being written. In the meantime, browse the related products below or <Link href="/contact/" className="text-emerald-400 underline">ask us a question</Link>.</p>
            )}

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl mt-8">
              <h3 className="text-lg font-bold text-white mb-2">Ready to Upgrade Your Daily Commute?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">
                Explore our full electric commuter and cargo bike range, dispatched from Brunswick, Victoria with express freight across Australia.
              </p>
              <Link href="/shop/" className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block">
                View E-Bike Catalog &rarr;
              </Link>
            </div>
          </article>

          {guide.shop.length > 0 && (
            <section aria-label="Related products" className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-emerald-400">Shop related to this guide</h2>
              <ul className="flex flex-wrap gap-2">
                {guide.shop.map((l) => (
                  <li key={l.href}><Link href={l.href} className="inline-block rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-emerald-500 hover:text-emerald-400">{l.label}</Link></li>
                ))}
              </ul>
            </section>
          )}

          <section aria-label="More guides" className="mt-8">
            <h2 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-emerald-400">More guides</h2>
            <ul className="space-y-2">
              {moreGuides.map((g) => (
                <li key={g.slug}><Link href={`/blog/${g.slug}/`} className="text-sm font-bold text-white hover:text-emerald-400">{g.title}</Link></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
