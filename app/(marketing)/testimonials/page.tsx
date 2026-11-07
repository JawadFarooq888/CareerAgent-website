import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";
import { JsonLd } from "@/components/marketing/JsonLd";
import { FadeIn } from "@/components/marketing/FadeIn";
import { testimonials } from "@/lib/placeholder-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real results from clients who worked with CareerAgent to land interviews and job offers faster.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
  // Note: no aggregateRating/review schema here on purpose — Google's
  // structured data policy prohibits review markup that isn't from real,
  // verifiable reviewers. Add it back once the testimonials above are
  // replaced with real client reviews.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${siteConfig.name} Career Consulting`,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Success Stories"
        title="Real clients, real results"
        description="A track record of helping professionals land interviews and offers faster."
      />

      <FadeIn>
        <section className="bg-mist-50 py-20 sm:py-28">
          <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <CTASection />
      </FadeIn>
    </>
  );
}
