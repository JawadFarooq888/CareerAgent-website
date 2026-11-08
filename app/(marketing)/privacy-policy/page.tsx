import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "November 8, 2026";
  const { legal } = siteConfig;

  return (
    <>
      <PageHero title="Privacy Policy" description={`Last updated: ${lastUpdated}`} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page prose prose-neutral mx-auto max-w-3xl prose-headings:text-ink-950 prose-a:text-brand-600">
          <p>
            This policy explains what personal information {siteConfig.name} collects, why we
            collect it, and what choices you have.
          </p>

          <h2>Who is responsible for your data</h2>
          <p>
            {legal.name}
            {legal.registeredAddress ? `, ${legal.registeredAddress}` : ""} is the data
            controller for the information described here. You can contact us about privacy at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <h2>What we collect and why</h2>
          <ul>
            <li>
              <strong>Contact and consultation forms:</strong> your name, email, phone number (if
              you give it) and your message. We use this to reply to you and to provide the
              services you ask for. The legal basis is taking steps at your request before
              entering into a contract, and performing that contract.
            </li>
            <li>
              <strong>Information for your job search:</strong> details you share with us, such as
              your resume, work history and target roles. We use this only to deliver your
              services, on the basis of our contract with you.
            </li>
            <li>
              <strong>Newsletter:</strong> your email address, if you subscribe. We use it to send
              career tips, based on your consent. You can unsubscribe at any time by emailing us.
            </li>
            <li>
              <strong>Payments:</strong> handled by Paddle.com, our Merchant of Record. Paddle
              collects your payment details directly; we never see or store your full card
              number. We receive order details such as your name, email and what you bought.
            </li>
            <li>
              <strong>Website usage:</strong> if analytics is enabled, basic information about how
              visitors use the site (pages viewed, device and browser type, approximate location),
              based on our legitimate interest in improving the website.
            </li>
          </ul>
          <p>We do not sell your personal information.</p>

          <h2>Who we share it with</h2>
          <p>We share personal information only with:</p>
          <ul>
            <li>
              service providers who help us run the website and our business, such as website
              hosting, our database provider, our email delivery service (Resend) and analytics
              (Google Analytics);
            </li>
            <li>Paddle.com, which processes payments as our Merchant of Record;</li>
            <li>professional advisers, such as accountants or lawyers, where needed;</li>
            <li>authorities, when the law requires it.</li>
          </ul>
          <p>
            We will only share your resume or details with employers or recruiters as part of
            your job search, and only as agreed with you.
          </p>

          <h2>Cookies</h2>
          <p>
            We use cookies that are needed for the website to work. If analytics is enabled, Google
            Analytics also sets cookies to count visits and understand how the site is used. You
            can block or delete cookies in your browser settings, and you can opt out of Google
            Analytics with Google&apos;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              opt-out browser add-on
            </a>
            .
          </p>

          <h2>How long we keep it</h2>
          <ul>
            <li>Inquiries that do not become clients: up to 24 months.</li>
            <li>
              Client records: for as long as we work together, then up to 6 years for tax and
              legal reasons.
            </li>
            <li>Newsletter email: until you unsubscribe.</li>
          </ul>

          <h2>Your rights</h2>
          <p>
            You can ask us to give you a copy of your data, correct it, delete it, or stop using it
            for a particular purpose. Where we rely on your consent, you can withdraw it at any
            time. To make a request, email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. We will reply within one
            month. If you are in the UK or EU, you also have the right to complain to your local
            data protection authority.
          </p>

          <h2>International transfers</h2>
          <p>
            We work remotely and our service providers may store data in other countries,
            including the United States. Where required, we rely on safeguards such as Standard
            Contractual Clauses offered by those providers.
          </p>

          <h2>Security</h2>
          <p>
            We take reasonable steps to protect your information, including encrypted connections
            (HTTPS) and limiting access to the people who need it.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy from time to time. The date at the top shows when it was last
            changed. See also our <Link href="/terms-conditions">Terms &amp; Conditions</Link> and{" "}
            <Link href="/refund-policy">Refund Policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
