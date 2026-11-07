import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { TestimonialCard } from "@/components/marketing/TestimonialCard";

export function TestimonialsPreview() {
  return (
    <section className="bg-mist-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Success Stories"
          title="Real clients, real results"
          description="A few of the professionals I've helped land offers over the past year."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Read more success stories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
