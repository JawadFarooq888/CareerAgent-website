import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { testimonials } from "@/lib/placeholder-data";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import { StarRating } from "@/components/marketing/StarRating";

export function TestimonialsPreview() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Success Stories"
          title="Real clients, real results"
          description="A few of the professionals I've helped land offers over the past year."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-black/5 bg-navy-950/[0.02] p-7"
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

        <div className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500"
          >
            Read more success stories <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
