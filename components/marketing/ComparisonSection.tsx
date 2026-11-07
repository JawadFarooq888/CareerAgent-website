import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/marketing/SectionHeading";

const rows = [
  {
    label: "Finding relevant roles",
    alone: "Hours scrolling job boards every week",
    withUs: "Curated roles matched to your goals, including unlisted openings",
  },
  {
    label: "Application quality",
    alone: "One generic resume sent everywhere",
    withUs: "ATS-optimized resume tailored to each role",
  },
  {
    label: "Application volume",
    alone: "A handful of applications a week, if you have time",
    withUs: "Consistent, done-for-you applications every week",
  },
  {
    label: "Interview prep",
    alone: "Winging it and hoping for the best",
    withUs: "Structured coaching with real feedback before it counts",
  },
  {
    label: "Salary negotiation",
    alone: "Accepting the first offer out of fear",
    withUs: "Data-backed negotiation strategy and scripts",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-mist-50 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why It Works"
          title="Doing it alone vs. working with a career agent"
          description="The difference isn't effort — it's having someone in your corner who knows how hiring actually works."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900/70">
              <X size={16} className="text-red-500" /> On Your Own
            </span>
            <ul className="mt-5 space-y-3">
              {rows.map((row) => (
                <li key={row.label} className="rounded-lg bg-mist-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/70">
                    {row.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-900/70">{row.alone}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-500/30 bg-white p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
              <Check size={16} /> With CareerAgent
            </span>
            <ul className="mt-5 space-y-3">
              {rows.map((row) => (
                <li key={row.label} className="rounded-lg bg-brand-500/5 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-900/70">
                    {row.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink-950">{row.withUs}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
