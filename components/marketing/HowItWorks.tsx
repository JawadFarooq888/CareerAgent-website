import { CalendarCheck, FileText, Rocket, Trophy } from "lucide-react";
import { SectionHeading } from "@/components/marketing/SectionHeading";

const steps = [
  {
    number: "01",
    icon: CalendarCheck,
    title: "Free Consultation",
    description:
      "We discuss your background, target roles, and challenges to see if we're a good fit — no pressure, no obligation.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Strategy & Materials",
    description:
      "I rebuild your resume, LinkedIn, and application materials around what hiring managers and ATS systems actually look for.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Active Search",
    description:
      "I manage outreach and applications on your behalf every week, targeting roles that match your goals.",
  },
  {
    number: "04",
    icon: Trophy,
    title: "Interview & Offer",
    description:
      "You walk into interviews prepared and confident, with negotiation support ready for when the offer comes in.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-mist-50 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.06]"
      />
      <div className="container-page relative">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple, structured path to your next offer"
          description="Four clear stages, with me doing the heavy lifting at every one."
        />

        <ol className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-brand-500/0 via-brand-500/40 to-brand-500/0 lg:block"
          />
          {steps.map((step) => (
            <li key={step.number} className="relative flex flex-col items-center text-center">
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-500/30 bg-white text-brand-600 shadow-md shadow-brand-700/10">
                <step.icon size={22} />
              </span>
              <div className="mt-6 flex-1 rounded-2xl border border-ink-950/10 bg-white p-6 transition-colors hover:border-brand-500/40 hover:shadow-md">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  Step {step.number}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/70">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
