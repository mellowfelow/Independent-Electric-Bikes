import { fitTitle, fitDesc } from '@/lib/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GUIDE_LINKS } from '@/config/blogLinks';
import { getBlogContent } from '@/lib/blog';
import { BLOG_IMAGES } from '@/config/data/blogImages';

const topicOf = (slug: string) => GUIDE_LINKS[slug]?.shop.map((l) => l.href.match(/^\/shop\/([a-z-]+)\//)?.[1]).find(Boolean) ?? (slug.includes('ebike') ? 'electric-bikes' : undefined);

const CTAS: Record<string, { title: string; text: string; label: string }> = {
  'electric-bikes': { title: 'Ready to Find Your E-Bike?', text: 'Browse commuter, cargo, folding and mountain e-bikes from Brunswick, Victoria, with express freight across Australia.', label: 'Shop E-Bikes' },
  'electric-scooters': { title: 'Ready to Pick Your E-Scooter?', text: 'Compare commuter and long-range electric scooters, with accessories and spares, dispatched from Brunswick, Victoria.', label: 'Shop E-Scooters' },
  'electric-skateboards': { title: 'Ready to Roll?', text: 'Explore street and all-terrain electric skateboards and longboards, plus spare belts, wheels and chargers.', label: 'Shop Electric Skateboards' },
  'self-balancing-ev': { title: 'Ready to Balance?', text: 'See electric unicycles and hoverboards for beginners and experienced riders.', label: 'Shop Self-Balancing EVs' },
  'kids-off-road-ev': { title: 'Ready for the Kids?', text: 'Browse electric balance bikes, dirt bikes, go-karts and trikes for young riders.', label: 'Shop Kids & Off-Road EVs' },
  'mobility-scooters': { title: 'Need Help Choosing a Mobility Scooter?', text: 'Browse travel, folding and all-terrain mobility scooters, or contact us and we will help you find the right fit.', label: 'Shop Mobility Scooters' },
  'batteries-parts-kits': { title: 'Need Parts or Upgrades?', text: 'Find batteries, chargers, conversion kits, tyres and brakes for e-bikes, scooters and more.', label: 'Shop Batteries, Parts & Kits' },
  'safety-security-carry': { title: 'Ride Safer, Carry More', text: 'Helmets, lights, locks, racks and bags for e-bike and scooter riders.', label: 'Shop Safety, Locks & Carry' },
  'electric-quad-bikes': { title: 'Ready for the Property?', text: 'Browse kids and adult electric quad bikes and ATVs for recreation and farm work.', label: 'Shop Electric Quads' },
  'electric-water-sports': { title: 'Ready for the Water?', text: 'Explore electric jet skis, eFoils and electric surfboards, or contact us for availability and delivery.', label: 'Shop Electric Water Sports' },
};

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
  const topic = topicOf(post.slug);
  const others = POSTS.filter((x) => x.slug !== post.slug);
  const sameTopic = others.filter((x) => topic && topicOf(x.slug) === topic);
  const moreGuides = [...sameTopic, ...others.filter((x) => !sameTopic.includes(x))].slice(0, 3);
  const cta = (topic && CTAS[topic]) || { title: 'Looking for Something Specific?', text: 'Browse the full range of electric bikes, scooters, skateboards and more, dispatched from Brunswick, Victoria.', label: 'Shop the Full Range' };
  const ctaHref = topic && CTAS[topic] ? `/shop/${topic}/` : '/shop/';
  const html = getBlogContent(post.slug);

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

          <figure className="mb-8">
            <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-800">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            {BLOG_IMAGES[post.slug] && (
              <figcaption className="mt-2 text-[11px] text-slate-500">
                Photo:{' '}
                <a href={BLOG_IMAGES[post.slug].sourceUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-300">
                  {BLOG_IMAGES[post.slug].credit}
                </a>
                {BLOG_IMAGES[post.slug].license ? `, ${BLOG_IMAGES[post.slug].license}` : ''}
              </figcaption>
            )}
          </figure>

          <article className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            <p className="text-lg text-slate-200 font-medium leading-relaxed bg-slate-900 p-6 rounded-2xl border border-slate-800">
              {post.excerpt}
            </p>

            {html ? (
              <div
                className="blog-content prose prose-invert prose-headings:text-white prose-h2:text-2xl prose-h2:font-bold prose-h2:pt-4 prose-h3:text-xl prose-h3:font-bold prose-h3:pt-2 prose-strong:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <p>The full guide is being written. In the meantime, browse the related products below or <Link href="/contact/" className="text-emerald-400 underline">ask us a question</Link>.</p>
            )}

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl mt-8">
              <h3 className="text-lg font-bold text-white mb-2">{cta.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">
                {cta.text}
              </p>
              <Link href={ctaHref} className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block">
                {cta.label} &rarr;
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
