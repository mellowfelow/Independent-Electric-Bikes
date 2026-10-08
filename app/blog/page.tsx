import { fitTitle, fitDesc } from '@/lib/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { POSTS, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: fitTitle('Australian E-Bike Guides & Commuter Advice'),
  description: fitDesc('Expert articles on choosing the best electric commuter bike in Australia, Victorian e-bike laws, and dual-battery cargo bike advice.'),
  alternates: { canonical: `https://${SITE.domain}/blog/` },
};

export default function BlogIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'E-Bike Guides Blog', item: `https://${SITE.domain}/blog/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Commuter Intelligence</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">Australian E-Bike Guides</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Buying guides, motor technical explanations, battery care, and Australian electric bike laws.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {POSTS.map((post) => (
              <article key={post.slug} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-emerald-500/50 transition-all">
                <div className="aspect-[16/9] overflow-hidden bg-slate-950">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-2">
                      <span className="text-emerald-400 uppercase tracking-wider">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                    </h2>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3">{post.excerpt}</p>
                  </div>
                  <div className="pt-2">
                    <Link href={`/blog/${post.slug}/`} className="text-xs font-extrabold text-emerald-400 hover:text-emerald-300">
                      Read Full Article &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
