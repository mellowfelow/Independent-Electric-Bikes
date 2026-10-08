import { Metadata } from 'next';
import Link from 'next/link';
import { SITE, BRAND, CONTACT } from '@/config/site';
import { fitTitle, fitDesc } from '@/lib/catalog';
import { Bike, ShieldCheck, Award, MapPin, CheckCircle2, Phone, Mail } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: fitTitle('About Independent Electric Bikes, Brunswick VIC'),
  description: fitDesc('Independent Electric Bikes is operated by VYRON Industries Pty Ltd (ABN 23 618 699 479), established 2017 in Brunswick, Victoria.'),
  alternates: { canonical: `https://${SITE.domain}/about/` },
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE.name}`,
    description: BRAND.description,
    mainEntity: {
      '@type': 'Organization',
      name: SITE.name,
      legalName: SITE.entityName,
      foundingDate: BRAND.foundingYear,
      foundingLocation: BRAND.foundingLocation,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '380 Sydney Road',
        addressLocality: 'Brunswick',
        addressRegion: 'VIC',
        postalCode: '3056',
        addressCountry: 'AU',
      },
      url: `https://${SITE.domain}/`,
      sameAs: BRAND.sameAs,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'About Us', item: `https://${SITE.domain}/about/` },
    ],
  };

  return (
    <>
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-16 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Story & History</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">About Independent Electric Bikes</h1>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Engineering, assembling, and distributing electric commuter, cargo, and folding bikes across Victoria and Australia since 2017.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Main Entity Narrative (>700 Words) */}
          <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-300 leading-relaxed">
            <h2 className="text-2xl font-black text-white border-b border-slate-800 pb-3">
              Established in Brunswick, Victoria (2017)
            </h2>
            <p>
              <strong>{SITE.name}</strong> is operated by <strong>{SITE.entityName}</strong> (
              <a
                href="https://abr.business.gov.au/ABN/View?id=23618699479"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-bold"
              >
                ABN {SITE.abn}
              </a>
              ), a registered Australian private company incorporated in April 2017 with active GST registration. Headquartered at 380 Sydney Road in Brunswick, Victoria (VIC 3056), our company was founded to address a clear gap in the Australian urban transport market: the need for genuinely high-torque, durable electric commuter bikes capable of tackling steep Victorian gradients, long daily distance commutes, and heavy cargo payloads without fragile component failures.
            </p>

            <p>
              Traditional imported electric bicycles were frequently underpowered for Australian terrain or lacked local spare parts support. By designing our flagship <strong>Vyron Electric Bikes</strong> line with custom-tuned 500W Bafang motors, Samsung 21700 lithium battery cells, and Tektro hydraulic braking systems, Independent Electric Bikes established a reputation for rugged reliability among Melbourne commuters, delivery couriers, and family cargo cyclists.
            </p>

            <h3 className="text-xl font-bold text-white pt-4">
              Direct-from-Manufacturer Value & Local Support
            </h3>
            <p>
              Unlike traditional bicycle retailers that burden consumers with multi-tiered distributor and dealer markups, VYRON Industries operates on a direct-to-consumer and direct-to-commercial fleet model. Every electric bike ordered through our platform is dispatched directly from our Brunswick facility with 90% pre-assembly, heavy-duty 7-ply box protection, and 100% transit insurance.
            </p>

            <p>
              Because we maintain a full inventory of replacement Bafang motors, lithium battery packs, controllers, wiring harnesses, tires, and Tektro brake pads in our Melbourne warehouse, our customers enjoy rapid turnaround times on maintenance, upgrades, and warranty claims backed by our official <strong>2-Year Frame Warranty</strong> and <strong>12-Month Electrical Warranty</strong>.
            </p>

            <h3 className="text-xl font-bold text-white pt-4">
              Victorian & Australian E-Bike Legal Standards (EN15194)
            </h3>
            <p>
              All standard electric commuter and cargo bikes supplied by Independent Electric Bikes strictly comply with Australian EN15194 safety standards and state road rules. Equipped with 250W-500W pedal-assist systems capped at a maximum assisted speed of 25 km/h, our e-bikes are 100% legal to ride on public roads, bicycle lanes, and council shared paths across Victoria, New South Wales, Queensland, and all Australian states without requiring a driver’s license, vehicle registration, or third-party compulsory insurance.
            </p>
          </div>

          {/* Differentiators Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-extrabold text-white text-center">Why Australian Cyclists Choose VYRON</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BRAND.differentiation.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-400" />
              <span>Company Milestones & Growth</span>
            </h3>

            <div className="space-y-4">
              {BRAND.milestones.map((m) => (
                <div key={m.year} className="flex flex-col sm:flex-row gap-2 sm:gap-6 border-b border-slate-800/80 pb-4">
                  <div className="font-mono font-black text-emerald-400 text-lg w-20 flex-shrink-0">{m.year}</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{m.event}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Showroom Contact Card */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-8 text-center space-y-4">
            <MapPin className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="text-2xl font-black text-white">Visit Our Brunswick Showroom</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Test ride our entire electric commuter, cargo, and folding bike lineup at <strong>{CONTACT.address}</strong>.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a href={`tel:${CONTACT.phone}`} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs">
                Call {CONTACT.phoneDisplay}
              </a>
              <Link href="/contact/" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700">
                Contact Form & Showroom Hours
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
