import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { faqs } from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";

export function FaqPreview() {
  return (
    <section className="bg-mist-50 py-20 sm:py-28">
      <div className="container-page mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="Common Questions"
          title="Before you book, here's what people usually ask"
        />

        <div className="mt-10">
          <FaqAccordion items={faqs.slice(0, 4)} />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faqs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            See all FAQs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
