import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 27, 2026";

  return (
    <>
      <PageHero title="Privacy Policy" description={`Last updated: ${lastUpdated}`} />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-page prose prose-neutral mx-auto max-w-3xl prose-headings:text-navy-950 prose-a:text-gold-600">
          <p>
            [Placeholder content — replace with your reviewed privacy policy before launch.]
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
            policy explains what information we collect through this website, how we use it, and
            the choices you have.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information you voluntarily provide through our contact, consultation, and
            newsletter forms, including your name, email address, phone number, and any details
            you share in your message. We do not knowingly collect sensitive personal information.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to respond to inquiries, schedule consultations,
            deliver the services you request, and — if you opt in — send occasional career-related
            newsletter content. We do not sell your personal information to third parties.
          </p>

          <h2>Cookies & Analytics</h2>
          <p>
            This site may use cookies and analytics tools (such as Google Analytics) to understand
            how visitors use the site and improve our content. You can control cookies through your
            browser settings.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain inquiry and client information for as long as necessary to provide our
            services and comply with legal obligations.
          </p>

          <h2>Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at
            any time by contacting us at {siteConfig.email}.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this policy, please contact us at {siteConfig.email}.
          </p>
        </div>
      </section>
    </>
  );
}
