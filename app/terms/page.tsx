import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SHOP, SITE } from '@/config/site';
import { fitDesc, fitTitle } from '@/lib/catalog';
import { LegalPage, P, UL } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: fitTitle('Terms of Sale'),
  description: fitDesc('The terms that apply when you buy from Independent Electric Bikes: pricing in AUD including GST, ordering, payment, delivery, warranty, safe use and your consumer rights.'),
  alternates: { canonical: `https://${SITE.domain}/terms/` },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Sale"
      path="/terms/"
      intro="These terms apply to purchases made through this website. They do not limit your rights under the Australian Consumer Law."
      sections={[
        {
          id: 'seller',
          heading: 'Who you are buying from',
          body: (
            <P>
              {SITE.name} is operated by {SITE.entityName} (ABN {SITE.abn}), {CONTACT.address}. Contact: {CONTACT.email}, {CONTACT.phoneDisplay}.
            </P>
          ),
        },
        {
          id: 'prices',
          heading: 'Prices',
          body: (
            <UL>
              <li>All prices are in Australian dollars (AUD) and include GST where applicable.</li>
              <li>Prices, specifications and availability can change without notice. If we find an obvious pricing or listing error we will contact you, and you may confirm the corrected price or cancel with a full refund.</li>
              <li>
                The minimum order value is ${SHOP.minOrder} AUD. A {SHOP.cryptoDiscount}% discount applies to the product total when you choose to pay by cryptocurrency; freight is not discounted.
              </li>
            </UL>
          ),
        },
        {
          id: 'orders',
          heading: 'Placing an order',
          body: (
            <P>
              Submitting an order is an offer to buy. We confirm it by emailing you payment details, and your order is accepted and reserved once we have received your payment in full. We may decline or cancel an order, for example because of stock, pricing errors or suspected fraud, and will
              refund any payment received for it.
            </P>
          ),
        },
        {
          id: 'payment',
          heading: 'Payment',
          body: (
            <P>
              We accept direct bank transfer (EFT), PayID/Osko and cryptocurrency (BTC / USDT). Payment details are emailed to you after you order; please use your order reference as the payment reference. We do not collect card details on this website.
            </P>
          ),
        },
        {
          id: 'delivery',
          heading: 'Delivery',
          body: (
            <P>
              Delivery costs, timing and what to do if something is wrong are set out on our{' '}
              <Link href="/shipping/" className="text-emerald-400 hover:underline">
                Shipping &amp; Delivery
              </Link>{' '}
              page. Delivery dates are estimates only.
            </P>
          ),
        },
        {
          id: 'warranty',
          heading: 'Warranty, returns and consumer rights',
          body: (
            <P>
              Our warranty and the returns and refunds process are described in{' '}
              <Link href="/returns/" className="text-emerald-400 hover:underline">
                Returns, Refunds &amp; Warranty
              </Link>
              . Our goods come with guarantees that cannot be excluded under the Australian Consumer Law.
            </P>
          ),
        },
        {
          id: 'safe-use',
          heading: 'Safe and lawful use',
          body: (
            <>
              <P>
                Electric bikes sold for road use are designed to meet the EN 15194 pedal-assist standard (250W continuous rated power, assistance up to 25 km/h). Other products, such as some scooters, skateboards and off-road vehicles, may be restricted to private land or may not be legal on
                public roads or paths in your state or territory.
              </P>
              <P>You are responsible for checking and following the road rules that apply where you ride, wearing a helmet and appropriate protective gear, charging batteries only with the supplied charger, and following the manual.</P>
            </>
          ),
        },
        {
          id: 'liability',
          heading: 'Liability',
          body: (
            <P>
              To the extent the law allows, our liability for a breach of a non-excludable guarantee is limited to repair or replacement of the goods, or the cost of having them repaired or replaced, and we are not liable for indirect or consequential loss. Nothing in these terms excludes or
              limits any right you have under the Australian Consumer Law or any liability that cannot lawfully be limited.
            </P>
          ),
        },
        {
          id: 'website',
          heading: 'Website use and content',
          body: (
            <P>
              The content on this website, including text, logos and product photographs, belongs to us or our suppliers and may not be copied for commercial use without permission. Images may show indicative colours or accessories; the description and specification on the product page applies.
              Information about how we handle personal data is in our{' '}
              <Link href="/privacy/" className="text-emerald-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </P>
          ),
        },
        {
          id: 'law',
          heading: 'Governing law',
          body: (
            <P>
              These terms are governed by the laws of Victoria, Australia, and you and we submit to the non-exclusive jurisdiction of the courts of Victoria. We may update these terms; the version on this page when you order applies to that order.
            </P>
          ),
        },
      ]}
    />
  );
}
