import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for ${siteConfig.name}.`,
};

export default function TermsConditionsPage() {
  const lastUpdated = "July 27, 2026";

  return (
    <>
      <PageHero title="Terms & Conditions" description={`Last updated: ${lastUpdated}`} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page prose prose-neutral mx-auto max-w-3xl prose-headings:text-navy-950 prose-a:text-gold-600">
          <p>
            [Placeholder content — replace with terms reviewed by a legal professional before
            launch.] These Terms & Conditions govern your use of the {siteConfig.name} website and
            services.
          </p>

          <h2>Services</h2>
          <p>
            {siteConfig.name} provides career consulting, reverse-recruiting, and related services
            as described on this website. Specific deliverables, timelines, and fees for paid
            engagements will be confirmed separately in writing before work begins.
          </p>

          <h2>No Guarantee of Employment</h2>
          <p>
            While we work diligently to improve your job search materials, strategy, and
            interview performance, we cannot and do not guarantee any specific outcome, including
            job offers, interviews, or salary levels. Hiring decisions are made solely by
            employers.
          </p>

          <h2>Payments & Refunds</h2>
          <p>
            Fees for paid packages are outlined at the time of booking. Refund eligibility, if
            any, will be specified in your service agreement.
          </p>

          <h2>Client Responsibilities</h2>
          <p>
            You agree to provide accurate information about your background and experience.
            {siteConfig.name} is not responsible for inaccuracies in materials based on
            information you provide.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            {siteConfig.name} shall not be liable for any indirect, incidental, or consequential
            damages arising from use of our services or this website.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes
            constitutes acceptance of the updated terms.
          </p>

          <h2>Contact</h2>
          <p>Questions about these terms can be sent to {siteConfig.email}.</p>
        </div>
      </section>
    </>
  );
}
