import { ArrowRight, CalendarCheck, CheckCircle2, FileCheck2, Send, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  "Personalized job search strategy",
  "Done-for-you applications",
  "Real interview coaching",
];

const pipeline = [
  { icon: FileCheck2, label: "Resume & LinkedIn rebuilt", detail: "ATS-optimized", done: true },
  { icon: Send, label: "Tailored applications sent", detail: "Every week", done: true },
  { icon: CalendarCheck, label: "Interviews scheduled", detail: "With coaching", done: true },
  { icon: Trophy, label: "Offer negotiated", detail: "Your next role", done: false },
];

function PipelineCard() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
      <div
        aria-hidden="true"
        className="absolute -inset-6 rounded-[2rem] bg-brand-500/10 blur-3xl"
      />
      <div className="relative rounded-3xl border border-ink-950/10 bg-white p-6 shadow-xl shadow-brand-700/10 sm:p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-ink-900/70">
              Your job search
            </p>
            <p className="mt-1 text-lg font-semibold text-ink-950">Handled end to end</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Active
          </span>
        </div>

        <ol className="mt-6 space-y-3">
          {pipeline.map((step) => (
            <li
              key={step.label}
              className="flex items-center gap-4 rounded-2xl border border-ink-950/5 bg-mist-50 p-4"
            >
              <span
                className={
                  step.done
                    ? "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white"
                    : "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dashed border-brand-400/50 text-brand-600"
                }
              >
                <step.icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-950">{step.label}</p>
                <p className="text-xs text-ink-900/70">{step.detail}</p>
              </div>
              {step.done && <CheckCircle2 size={18} className="shrink-0 text-brand-600" />}
            </li>
          ))}
        </ol>

        <div className="mt-6 flex items-center gap-3 border-t border-ink-950/10 pt-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
            {siteConfig.ownerName
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <p className="text-xs leading-relaxed text-ink-900/70">
            <span className="font-semibold text-ink-950">{siteConfig.ownerName}</span> works on your
            search every week, so you can focus on interviews.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist-100 via-mist-50 to-white">
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          maskImage: "radial-gradient(80% 60% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(80% 60% at 50% 0%, black 30%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(20,160,147,0.25) 0%, rgba(20,160,147,0) 70%)",
        }}
      />
      <div className="container-page relative grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:py-28">
        <div className="flex flex-col items-start gap-7">
          <p className="rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600">
            {siteConfig.tagline}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl lg:text-[3.5rem]">
            Land your next job faster with a{" "}
            <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
              career agent working for you
            </span>{" "}
            — not the employer.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-ink-900/70">
            I handle the job search grind — finding roles, tailoring applications, and coaching you
            through interviews — so you can focus on landing the offer.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-ink-900/70">
                <CheckCircle2 size={18} className="text-brand-600" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/book-consultation" size="lg">
              Book Your Free Consultation <ArrowRight size={18} />
            </Button>
            <Button
              href="/services"
              variant="outline"
              size="lg"
            >
              Explore Services
            </Button>
          </div>
          <p className="text-xs text-ink-900/70">
            Free 30-minute call &middot; No obligation &middot; Replies within 1 business day
          </p>
        </div>

        <PipelineCard />
      </div>
    </section>
  );
}
