import type { Metadata } from 'next';
import Link from 'next/link';
import { CONTACT, SITE } from '@/config/site';
import { fitDesc, fitTitle } from '@/lib/catalog';
import { LegalPage, P, UL } from '@/components/LegalPage';

export const metadata: Metadata = {
  title: fitTitle('Privacy Policy'),
  description: fitDesc('What personal information Independent Electric Bikes collects when you order or contact us, how it is used and stored, and how to access or correct it.'),
  alternates: { canonical: `https://${SITE.domain}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy/"
      intro="What we collect, why, who handles it, and your choices. We handle personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles."
      sections={[
        {
          id: 'who',
          heading: 'Who we are',
          body: (
            <P>
              {SITE.name} is operated by {SITE.entityName} (ABN {SITE.abn}), {CONTACT.address}. In this policy &ldquo;we&rdquo; means that company. You can reach us at {CONTACT.email} or {CONTACT.phoneDisplay}.
            </P>
          ),
        },
        {
          id: 'collect',
          heading: 'Information we collect',
          body: (
            <UL>
              <li>
                <strong className="text-white">Orders:</strong> your name, email, phone number, delivery address, the items you order, the payment method you choose and your order reference.
              </li>
              <li>
                <strong className="text-white">Enquiries:</strong> your name, email, phone number, company name (wholesale) and the message you send through our forms, email or WhatsApp.
              </li>
              <li>
                <strong className="text-white">Payment confirmation:</strong> a link or note you send to confirm a payment. We never ask for card numbers on this website; payments are made by bank transfer, PayID or cryptocurrency outside the site.
              </li>
              <li>
                <strong className="text-white">Your browser:</strong> your shopping cart is kept in your own browser&rsquo;s local storage so it is still there when you return. We do not run advertising or analytics trackers on this website.
              </li>
            </UL>
          ),
        },
        {
          id: 'use',
          heading: 'How we use it',
          body: (
            <UL>
              <li>To process and deliver your order, send order confirmations and payment details, and arrange warranty or returns.</li>
              <li>To answer your enquiries and provide customer support.</li>
              <li>To keep business, tax and accounting records and meet legal obligations.</li>
              <li>To detect and prevent fraud and misuse of our website.</li>
            </UL>
          ),
        },
        {
          id: 'share',
          heading: 'Who we share it with',
          body: (
            <>
              <P>We only share information that is needed to do the job, with:</P>
              <UL>
                <li>couriers and freight carriers, to deliver your order (name, address and phone number);</li>
                <li>our website host and database provider, which store and process the website and the order and enquiry records;</li>
                <li>our email service provider, which delivers the emails we send you;</li>
                <li>professional advisers, regulators or law enforcement when the law requires it.</li>
              </UL>
              <P>
                Some of these providers are located or store data outside Australia, including in the United States. By placing an order or contacting us you consent to that, and we take reasonable steps to make sure they handle your information securely. We do not sell your personal
                information.
              </P>
            </>
          ),
        },
        {
          id: 'whatsapp',
          heading: 'WhatsApp and phone',
          body: <P>If you contact or order through WhatsApp, the conversation is also subject to WhatsApp&rsquo;s own privacy policy. We use your number only to deal with your enquiry or order.</P>,
        },
        {
          id: 'keep',
          heading: 'How long we keep it and how we protect it',
          body: (
            <P>
              We keep order records for as long as we need them to support your warranty and to meet tax and accounting obligations, which in Australia is generally at least five years. Access to our order and enquiry records is limited to authorised staff and protected by a passcode, and the
              services we use encrypt data in transit. No online system is completely secure, so please contact us at once if you think your information has been misused.
            </P>
          ),
        },
        {
          id: 'rights',
          heading: 'Access, correction and complaints',
          body: (
            <>
              <P>
                You can ask to see the personal information we hold about you, or to have it corrected or deleted where we are not required to keep it, by contacting us at {CONTACT.email}. We will respond within a reasonable time.
              </P>
              <P>
                If you are not satisfied with our response you can complain to the Office of the Australian Information Commissioner at{' '}
                <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                  oaic.gov.au
                </a>
                .
              </P>
            </>
          ),
        },
        {
          id: 'changes',
          heading: 'Changes to this policy',
          body: (
            <P>
              We may update this policy from time to time. The latest version is always on this page with its update date. See also our{' '}
              <Link href="/terms/" className="text-emerald-400 hover:underline">
                Terms of Sale
              </Link>
              .
            </P>
          ),
        },
      ]}
    />
  );
}
