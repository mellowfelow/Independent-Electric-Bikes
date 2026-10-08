import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SHOP, SITE } from '@/config/site';
import { fitDesc, fitTitle } from '@/lib/catalog';
import { EmailText } from '@/components/EmailText';
import { LegalPage, P, UL } from '@/components/LegalPage';

const free = `$${SHOP.freeShippingThreshold.toLocaleString('en-AU')}`;

export const metadata: Metadata = {
  title: fitTitle('Shipping & Delivery'),
  description: fitDesc(`Free express freight on orders over ${free}, flat $${SHOP.shippingFee} otherwise. Tracked courier delivery from our Brunswick, Victoria warehouse across Australia.`),
  alternates: { canonical: `https://${SITE.domain}/shipping/` },
};

export default function ShippingPage() {
  return (
    <LegalPage
      title="Shipping & Delivery"
      path="/shipping/"
      intro="How and when your order leaves our Brunswick warehouse, what it costs, and what to do when it arrives."
      sections={[
        {
          id: 'where',
          heading: 'Where we ship from and to',
          body: (
            <P>
              Every order is dispatched directly from our Brunswick, Victoria facility ({CONTACT.address}) by tracked courier freight. We deliver to addresses within Australia.
            </P>
          ),
        },
        {
          id: 'cost',
          heading: 'Shipping cost',
          body: (
            <UL>
              <li>
                <strong className="text-white">Free express freight</strong> on orders over {free} AUD, across Victoria and metro Australian cities.
              </li>
              <li>
                <strong className="text-white">Flat ${SHOP.shippingFee} AUD</strong> freight on orders below {free} AUD.
              </li>
              <li>The minimum order value is ${SHOP.minOrder} AUD.</li>
              <li>If your address is regional or remote, contact us before ordering and we will confirm the freight arrangements for your location.</li>
              <li>Shipping is calculated in your cart at checkout and shown before you place your order.</li>
            </UL>
          ),
        },
        {
          id: 'timing',
          heading: 'When your order ships',
          body: (
            <>
              <P>
                After you place an order we email you payment details. Your order is confirmed once payment has been received, and it is dispatched after that. Bank transfers and PayID payments normally clear quickly, and sending your payment receipt with your order reference helps us
                move faster.
              </P>
              <P>When your order is dispatched we email you the courier tracking details. Transit time depends on the carrier and your delivery address, so we do not promise a fixed delivery date.</P>
            </>
          ),
        },
        {
          id: 'packaging',
          heading: 'Packaging and assembly',
          body: <P>Bikes are packed in heavy-duty 7-ply cartons and arrive about 90% pre-assembled. Final set-up is described in the manual in the box.</P>,
        },
        {
          id: 'delivery',
          heading: 'When it arrives',
          body: (
            <>
              <P>Please check the carton before you sign for it and again when you unpack it. If anything is damaged, missing or not what you ordered:</P>
              <UL>
                <li>Note the damage on the courier paperwork if you can, and keep all packaging.</li>
                <li>
                  Contact us as soon as possible with your order reference and photos: email <EmailText email={CONTACT.email} />, phone or WhatsApp {CONTACT.phoneDisplay}, or use our{' '}
                  <Link href="/contact/" className="text-emerald-400 hover:underline">
                    contact page
                  </Link>
                  .
                </li>
              </UL>
              <P>
                We will arrange a repair, replacement or refund as set out in our{' '}
                <Link href="/returns/" className="text-emerald-400 hover:underline">
                  Returns, Refunds &amp; Warranty
                </Link>{' '}
                policy.
              </P>
            </>
          ),
        },
        {
          id: 'batteries',
          heading: 'Lithium batteries',
          body: (
            <P>
              E-bikes, scooters and spare batteries contain lithium-ion cells, which carriers treat as dangerous goods. We ship them in compliant packaging, and carrier restrictions can affect which services are available for some items.
            </P>
          ),
        },
        {
          id: 'help',
          heading: 'Questions',
          body: (
            <P>
              Contact {SITE.name} ({SITE.entityName}) on {CONTACT.phoneDisplay} or <EmailText email={CONTACT.email} />.
            </P>
          ),
        },
      ]}
    />
  );
}
