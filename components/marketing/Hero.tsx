import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

const highlights = [
  "Personalized job search strategy",
  "Done-for-you applications",
  "Real interview coaching",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 10%, rgba(201,162,39,0.25) 0%, rgba(201,162,39,0) 70%)",
        }}
      />
      <div className="container-page relative flex flex-col items-start gap-8 py-20 sm:py-28 lg:py-32">
        <p className="rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400">
          {siteConfig.tagline}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Land your next job faster with a{" "}
          <span className="text-gold-400">career agent working for you</span>, not the employer.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-white/70">
          {siteConfig.description}
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-white/80">
              <CheckCircle2 size={18} className="text-gold-400" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/book-consultation" size="lg">
            Book Your Free Consultation
          </Button>
          <Button href="/services" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-navy-950">
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}
