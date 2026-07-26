import { SectionHeading } from "@/components/marketing/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    description:
      "We discuss your background, target roles, and challenges to see if we're a good fit — no pressure, no obligation.",
  },
  {
    number: "02",
    title: "Strategy & Materials",
    description:
      "I rebuild your resume, LinkedIn, and application materials around what hiring managers and ATS systems actually look for.",
  },
  {
    number: "03",
    title: "Active Search",
    description:
      "I manage outreach and applications on your behalf every week, targeting roles that match your goals.",
  },
  {
    number: "04",
    title: "Interview & Offer",
    description:
      "You walk into interviews prepared and confident, with negotiation support ready for when the offer comes in.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-navy-950 py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="How It Works"
          title="A simple, structured path to your next offer"
          light
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="relative rounded-2xl border border-white/10 bg-white/5 p-7">
              <span className="text-4xl font-bold text-gold-500/40">{step.number}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
