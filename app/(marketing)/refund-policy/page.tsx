import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/marketing/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: `Refund policy for ${siteConfig.name} career services.`,
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  const lastUpdated = "November 8, 2026";
  const days = siteConfig.legal.refundWindowDays;

  return (
    <>
      <PageHero title="Refund Policy" description={`Last updated: ${lastUpdated}`} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page prose prose-neutral mx-auto max-w-3xl prose-headings:text-ink-950 prose-a:text-brand-600">
          <p>
            We want you to feel confident working with {siteConfig.name}. If you are not happy
            with a purchase, you can ask for a full refund within <strong>{days} days</strong> of
            the payment date, for any reason.
          </p>

          <h2>One-time packages</h2>
          <p>
            For one-time packages (such as the Starter package), you can request a full refund
            within {days} days of your purchase.
          </p>

          <h2>Monthly plans</h2>
          <p>
            For monthly plans (such as the Accelerator package), you can request a full refund of
            any monthly payment within {days} days of that payment. You can cancel at any time,
            and you will not be charged for the following month. Cancelling stops future payments;
            it does not by itself refund a past payment.
          </p>

          <h2>How to request a refund</h2>
          <p>
            Our orders are processed by our online reseller Paddle.com, who is the Merchant of
            Record. To request a refund, you can either:
          </p>
          <ul>
            <li>
              visit <a href="https://paddle.net" target="_blank" rel="noopener noreferrer">paddle.net</a>{" "}
              and look up your order using the email address you paid with, or
            </li>
            <li>
              email us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with your
              order number, and we will arrange it for you.
            </li>
          </ul>
          <p>
            Approved refunds go back to the original payment method. Depending on your bank, it
            can take 5–10 business days to appear.
          </p>

          <h2>Free consultations</h2>
          <p>The initial consultation is free, so no payment or refund is involved.</p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this policy, please{" "}
            <Link href="/contact">contact us</Link> or email{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. See also our{" "}
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
