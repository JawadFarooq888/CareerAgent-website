import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { StarRating } from "@/components/marketing/StarRating";
import { JsonLd } from "@/components/marketing/JsonLd";
import { FadeIn } from "@/components/marketing/FadeIn";
import { testimonials } from "@/lib/placeholder-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real results from clients who worked with CareerAgent to land interviews and job offers faster.",
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
        <section className="bg-white py-20 sm:py-28">
          <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-black/5 bg-navy-950/[0.02] p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <StarRating rating={t.rating} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-900/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-black/5 pt-4">
                  <p className="text-sm font-semibold text-navy-950">{t.name}</p>
                  <p className="text-xs text-navy-900/60">
                    {t.role} &middot; {t.company}
                  </p>
                </figcaption>
              </figure>
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
