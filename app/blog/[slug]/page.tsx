import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const post = POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'E-Bike Guides Blog', item: `https://${SITE.domain}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://${SITE.domain}/blog/${post.slug}/` },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <nav className="text-xs text-slate-400 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-emerald-400">Home</Link> /
            <Link href="/blog/" className="hover:text-emerald-400">Blog</Link> /
            <span className="text-slate-200 font-bold truncate">{post.title}</span>
          </nav>

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

            <p>
              When evaluating the <strong>best electric commuter bike in Australia</strong>, riders must weigh several critical factors: motor wattage and hill climbing torque, battery cell quality, braking safety, and local service support. In Australian capital cities like Melbourne, Sydney, and Brisbane, commuter routes often mix flat arterial roads with sudden steep incline gradients.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">1. Motor Wattage & Torque Output (Bafang Systems)</h2>
            <p>
              Australian EN15194 regulations permit 250W-500W pedal assist motors capped at 25 km/h for public road compliance. However, wattage alone does not determine how easily a bike climbs hills—torque (measured in Newton-meters) is key. Flagship VYRON electric bikes utilize 80Nm high-torque Bafang rear hub motors that deliver immediate assistance as soon as pedal sensors engage.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">2. Battery Cell Chemistry & Thermal Safety</h2>
            <p>
              Not all e-bike batteries are created equal. Generic battery packs deteriorate rapidly after 200 recharge cycles or fail during hot Australian summer heatwaves. Always select electric bikes powered by Samsung 21700 or LG Chem lithium-ion cells with integrated Battery Management Systems (BMS) for thermal cut-off protection.
            </p>

            <h2 className="text-2xl font-bold text-white pt-4">3. Hydraulic Disc Brakes vs Mechanical Brakes</h2>
            <p>
              Because electric bikes travel faster and weigh more than traditional bicycles, hydraulic disc brakes (such as Tektro HD-M275) provide significantly better stopping power and require minimal hand lever pressure compared to mechanical cable brakes.
            </p>

            <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-2xl mt-8">
              <h3 className="text-lg font-bold text-white mb-2">Ready to Upgrade Your Daily Commute?</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-4">
                Explore our full electric commuter and cargo bike range assembled in Brunswick, Victoria with express freight across Australia.
              </p>
              <Link href="/shop/" className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl inline-block">
                View E-Bike Catalog &rarr;
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
