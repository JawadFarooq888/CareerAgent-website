import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${siteConfig.name}.`,
  alternates: {
    canonical: "/terms-conditions",
  },
};

export default function TermsConditionsPage() {
  const lastUpdated = "November 8, 2026";
  const { legal } = siteConfig;

  return (
    <>
      <PageHero title="Terms & Conditions" description={`Last updated: ${lastUpdated}`} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page prose prose-neutral mx-auto max-w-3xl prose-headings:text-ink-950 prose-a:text-brand-600">
          <h2>Who we are</h2>
          <p>
            This website and the {siteConfig.name} services are provided by {legal.name}
            {legal.registeredAddress ? `, ${legal.registeredAddress}` : ""} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;). When you use this website or buy our services, you are entering
            into an agreement with us. By using the website, you accept these terms. If you do not
            agree, please do not use the website.
          </p>

          <h2>Our services</h2>
          <p>
            {siteConfig.name} provides career services, including reverse recruiting, job search
            support, resume and LinkedIn writing, interview coaching and career consulting, as
            described on our <Link href="/services">Services</Link> and{" "}
            <Link href="/pricing">Pricing</Link> pages. We will agree the details of your
            engagement, such as target roles and schedule, with you when you start.
          </p>

          <h2>No guarantee of a job</h2>
          <p>
            We work hard to improve your job search, but hiring decisions are made only by
            employers. We cannot and do not guarantee any interview, job offer or salary.
          </p>

          <h2>Payments and subscriptions</h2>
          <p>
            Our order process is conducted by our online reseller Paddle.com. Paddle.com is the
            Merchant of Record for all our orders, and handles payment, billing and refunds.
            Paddle&apos;s{" "}
            <a href="https://www.paddle.com/legal/checkout-buyer-terms" target="_blank" rel="noopener noreferrer">
              buyer terms
            </a>{" "}
            also apply to your purchase.
          </p>
          <ul>
            <li>Prices are shown on our Pricing page. Taxes are calculated at checkout.</li>
            <li>One-time packages are paid once, at the time of purchase.</li>
            <li>
              Monthly plans are billed every month from the date you subscribe and renew
              automatically until you cancel. You can cancel at any time, and cancellation takes
              effect at the end of the current billing month.
            </li>
          </ul>

          <h2>Refunds</h2>
          <p>
            You can request a full refund within {legal.refundWindowDays} days of any payment.
            See our <Link href="/refund-policy">Refund Policy</Link> for details.
          </p>

          <h2>Your responsibilities</h2>
          <p>
            You agree to give us accurate information about your experience and background. We are
            not responsible for problems caused by information you give us that is inaccurate. You
            are responsible for reviewing and approving materials (such as your resume) before
            they are used.
          </p>

          <h2>Acceptable use</h2>
          <p>When using this website, you must not:</p>
          <ul>
            <li>break any law or use the website for fraud or spam;</li>
            <li>infringe anyone&apos;s intellectual property;</li>
            <li>
              interfere with the website&apos;s security, including uploading malware, probing for
              vulnerabilities or scraping the website.
            </li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            We own this website and its content, including text, design and our methods. Once you
            have paid, you may use the materials we prepare for you (such as your resume, cover
            letters and LinkedIn text) for your own job search.
          </p>

          <h2>Website availability</h2>
          <p>
            We try to keep the website running smoothly, but we do not promise that it will always
            be available or free of errors.
          </p>

          <h2>Suspension and termination</h2>
          <p>
            We may suspend or end our services if you seriously or repeatedly break these terms, do
            not pay, or if there is a fraud or security risk.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the extent allowed by law, we are not liable for any indirect or consequential loss
            arising from your use of the website or our services. Our total liability to you is
            limited to the amount you paid us for the service concerned. Nothing in these terms
            limits rights you have under consumer protection law.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The date at the top shows when they were
            last changed.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or through our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
