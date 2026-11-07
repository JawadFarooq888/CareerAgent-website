import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const assurances = ["Free 30-minute call", "No obligation", "Reply within 1 business day"];

export function CTASection({
  title = "Ready to accelerate your job search?",
  description = "Book a free, no-obligation consultation and let's build a plan to get you hired faster.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-brand-500/15 bg-mist-100 px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.07]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(50% 80% at 50% 100%, rgba(20,160,147,0.3) 0%, rgba(20,160,147,0) 70%)",
          }}
        />
        <div className="relative flex flex-col items-center gap-6">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-ink-900/70">{description}</p>
          <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href="/book-consultation" size="lg" className="w-full sm:w-auto">
              Book Your Free Consultation <ArrowRight size={18} />
            </Button>
            <Button
              href="/pricing"
              variant="ghost"
              size="lg"
              className="w-full hover:bg-white/70 sm:w-auto"
            >
              View Pricing
            </Button>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-900/70">
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
