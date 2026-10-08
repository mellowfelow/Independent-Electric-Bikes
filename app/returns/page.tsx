import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SITE } from '@/config/site';
import { fitDesc, fitTitle } from '@/lib/catalog';
import { EmailText } from '@/components/EmailText';
import { LegalPage, P, UL } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: fitTitle('Returns, Refunds & Warranty'),
  description: fitDesc('Your Australian Consumer Law rights, our 2-year frame and 12-month electrical and motor warranty, and how to make a return, refund or warranty claim.'),
  alternates: { canonical: `https://${SITE.domain}/returns/` },
};

export default function ReturnsPage() {
  return (
    <LegalPage
      title="Returns, Refunds & Warranty"
      path="/returns/"
      intro="Your rights under Australian law, our warranty, and how to make a claim."
      sections={[
        {
          id: 'acl',
          heading: 'Your rights under Australian Consumer Law',
          body: (
            <>
              <P>
                Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage. You are also entitled to have the goods repaired or
                replaced if they fail to be of acceptable quality and the failure does not amount to a major failure.
              </P>
              <P>Goods must be of acceptable quality, match their description and be fit for the purpose they are sold for. Nothing on this page limits those rights.</P>
            </>
          ),
        },
        {
          id: 'warranty',
          heading: 'Our warranty',
          body: (
            <>
              <UL>
                <li>
                  <strong className="text-white">2-year frame warranty</strong> on the frame of every bike.
                </li>
                <li>
                  <strong className="text-white">12-month electrical and motor warranty</strong> covering the motor, battery, controller and display.
                </li>
              </UL>
              <P>
                The warranty is provided by {SITE.entityName} (ABN {SITE.abn}), {CONTACT.address}, and starts on the delivery date. It covers defects in materials and workmanship. It does not cover damage from accidents, misuse, unauthorised modification or poor storage, or normal wear of
                consumable parts such as tyres, brake pads and chains. The warranty is in addition to, and does not replace, your rights under the Australian Consumer Law.
              </P>
              <P>We hold replacement batteries, motors, controllers, tyres and brake pads at our Brunswick facility for local servicing.</P>
            </>
          ),
        },
        {
          id: 'claim',
          heading: 'How to make a claim',
          body: (
            <>
              <UL>
                <li>
                  Contact us by email at <EmailText email={CONTACT.email} />, by phone or WhatsApp on {CONTACT.phoneDisplay}, or through the{' '}
                  <Link href="/contact/" className="text-emerald-400 hover:underline">
                    contact page
                  </Link>
                  .
                </li>
                <li>Give your order reference (it starts with IEB-), a description of the problem and clear photos or a short video.</li>
                <li>We will tell you what we need next and how to return the item if a return is required. Please do not send goods back before we have confirmed the arrangements.</li>
              </UL>
              <P>You do not pay the cost of returning goods that are faulty or that were not as described.</P>
            </>
          ),
        },
        {
          id: 'refunds',
          heading: 'Refunds',
          body: (
            <P>
              Where you are entitled to a refund we pay it using the original payment method where possible, in Australian dollars, once the return has been received and checked or the fault has been confirmed. We will keep you updated by email.
            </P>
          ),
        },
        {
          id: 'change-of-mind',
          heading: 'Change of mind',
          body: (
            <P>
              Australian Consumer Law does not require a refund if you simply change your mind. If you want to change or cancel an order, contact us as soon as possible. If the order has not been dispatched we will cancel it and refund any payment received. After dispatch, a change-of-mind
              return is at our discretion, so please contact us before sending anything back.
            </P>
          ),
        },
        {
          id: 'transit',
          heading: 'Damaged or incorrect items',
          body: (
            <P>
              If your order arrives damaged or is not what you ordered, follow the steps on our{' '}
              <Link href="/shipping/" className="text-emerald-400 hover:underline">
                Shipping &amp; Delivery
              </Link>{' '}
              page and we will arrange a repair, replacement or refund.
            </P>
          ),
        },
      ]}
    />
  );
}
