import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { JsonLd } from "@/components/marketing/JsonLd";
import { faqs } from "@/lib/placeholder-data";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about reverse recruiting, pricing, timelines, and how the process works.",
};

export default function FaqsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Everything you need to know before booking a consultation."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page mx-auto max-w-3xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        description="Book a free consultation and we'll walk through everything together."
      />
    </>
  );
}
