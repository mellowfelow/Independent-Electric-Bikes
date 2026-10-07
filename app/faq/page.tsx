import { Metadata } from 'next';
import { FAQ, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: `Electric Bike FAQ & Warranty Support | ${SITE.name}`,
  description: `Frequently asked questions regarding Victorian e-bike laws, battery range expectations, express freight, and 2-Year warranty claims.`,
  alternates: { canonical: `https://${SITE.domain}/faq/` },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `https://${SITE.domain}/faq/` },
    ],
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Knowledge Base</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">Frequently Asked Questions</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Everything you need to know about battery charging, Australian road compliance, express delivery, and warranty support.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
          {FAQ.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-2">
              <h2 className="text-base font-extrabold text-white">{item.question}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
