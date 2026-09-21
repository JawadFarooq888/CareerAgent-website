import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { PricingCard } from "@/components/marketing/PricingCard";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { FadeIn } from "@/components/marketing/FadeIn";
import { JsonLd } from "@/components/marketing/JsonLd";
import { pricingPackages, faqs } from "@/lib/placeholder-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for reverse recruiting, resume writing, and career consulting packages.",
};

export default function PricingPage() {
  const pricingJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Career Coaching and Reverse Recruiting",
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pricing Packages",
      itemListElement: pricingPackages
        .filter((pkg) => pkg.price.startsWith("$"))
        .map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          price: pkg.price.replace("$", ""),
          priceCurrency: "USD",
          description: pkg.description,
        })),
    },
  };

  return (
    <>
      <JsonLd data={pricingJsonLd} />
      <PageHero
        eyebrow="Pricing"
        title="Simple, transparent pricing"
        description="Choose the level of support that fits your job search. Not sure which package is right? Book a free consultation and we'll figure it out together."
      />

      <FadeIn>
        <section className="bg-white py-20 sm:py-28">
          <div className="container-page grid gap-8 lg:grid-cols-3">
            {pricingPackages.map((pkg) => (
              <PricingCard key={pkg.name} {...pkg} />
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="bg-navy-950/[0.02] py-20 sm:py-28">
          <div className="container-page mx-auto max-w-3xl">
            <h2 className="text-center text-2xl font-bold text-navy-950 sm:text-3xl">
              Pricing Questions
            </h2>
            <div className="mt-10">
              <FaqAccordion items={faqs.slice(0, 3)} />
            </div>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
