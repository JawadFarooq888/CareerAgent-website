import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Me",
  description: `Meet ${siteConfig.ownerName}, ${siteConfig.ownerTitle.toLowerCase()} at ${siteConfig.name}, helping professionals land their next role faster.`,
};

const credentials = [
  "10+ years in talent acquisition and recruiting",
  "250+ professionals placed across tech, finance, and operations",
  "Certified résumé writer and career coach",
  "Former in-house corporate recruiter — I know what hiring managers actually look for",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title={`Hi, I'm ${siteConfig.ownerName}`}
        description={siteConfig.ownerTitle}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold text-navy-950 sm:text-3xl">
              I spent a decade on the other side of the hiring table.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-navy-900/70">
              <p>
                After years working as a corporate recruiter, I saw the same pattern over and
                over: talented, qualified candidates were getting passed over — not because they
                weren&apos;t good enough, but because their applications weren&apos;t built to
                get past the first screen.
              </p>
              <p>
                I started {siteConfig.name} to flip the script. Instead of working for
                companies trying to fill roles, I work directly for job seekers — using the same
                insider knowledge of ATS systems, hiring processes, and recruiter psychology to
                help you get noticed, get interviews, and get hired.
              </p>
              <p>
                Every client gets a personalized strategy, not a generic template. My goal is
                simple: shorten your job search and put you in the best possible position to
                negotiate a great offer.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-black/5 bg-navy-950/[0.02] p-8">
            <h3 className="text-lg font-semibold text-navy-950">Credentials & Experience</h3>
            <ul className="mt-5 space-y-3">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-navy-900/80">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's talk about your career goals"
        description="Book a free consultation and let's see if we're the right fit to work together."
      />
    </>
  );
}
