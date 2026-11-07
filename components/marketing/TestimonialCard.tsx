import { Quote } from "lucide-react";
import { StarRating } from "@/components/marketing/StarRating";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TestimonialCard({
  name,
  role,
  company,
  quote,
  rating,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}) {
  return (
    <figure className="relative flex flex-col rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Quote
        aria-hidden="true"
        size={36}
        className="absolute right-6 top-6 fill-brand-500/10 text-brand-500/20"
      />
      <StarRating rating={rating} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-900/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist-100 text-sm font-semibold text-brand-700">
          {initials(name)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink-950">{name}</p>
          <p className="text-xs text-ink-900/70">
            {role} &middot; {company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
