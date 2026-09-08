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
    <section className="bg-navy-950/[0.02] py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why It Works"
          title="Doing it alone vs. working with a career agent"
          description="The difference isn't effort — it's having someone in your corner who knows how hiring actually works."
        />

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-black/5 bg-white">
            <thead>
              <tr>
                <th className="w-1/5 border-b border-black/5 bg-navy-950/[0.02] p-5 text-left text-sm font-semibold text-navy-900/50">
                  &nbsp;
                </th>
                <th className="border-b border-black/5 bg-navy-950/[0.02] p-5 text-left text-sm font-semibold text-navy-900/60">
                  <span className="inline-flex items-center gap-2">
                    <X size={16} className="text-red-500" /> On Your Own
                  </span>
                </th>
                <th className="border-b border-gold-500/30 bg-gold-500/10 p-5 text-left text-sm font-semibold text-navy-950">
                  <span className="inline-flex items-center gap-2">
                    <Check size={16} className="text-gold-600" /> With CareerAgent
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.label}>
                  <td
                    className={
                      "p-5 text-sm font-semibold text-navy-950" +
                      (index !== rows.length - 1 ? " border-b border-black/5" : "")
                    }
                  >
                    {row.label}
                  </td>
                  <td
                    className={
                      "p-5 text-sm text-navy-900/60" +
                      (index !== rows.length - 1 ? " border-b border-black/5" : "")
                    }
                  >
                    {row.alone}
                  </td>
                  <td
                    className={
                      "bg-gold-500/5 p-5 text-sm font-medium text-navy-950" +
                      (index !== rows.length - 1 ? " border-b border-black/5" : "")
                    }
                  >
                    {row.withUs}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
