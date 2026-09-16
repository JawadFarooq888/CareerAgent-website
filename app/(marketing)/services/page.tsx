import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CTASection } from "@/components/marketing/CTASection";
import { FadeIn } from "@/components/marketing/FadeIn";
import { services } from "@/lib/placeholder-data";
import { iconMap } from "@/components/marketing/icon-map";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Reverse recruiting, resume writing, LinkedIn optimization, interview coaching, and more — full-service career support to help you get hired faster.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Career services built around your goals"
        description="From a single resume rewrite to full done-for-you application management — choose the level of support that fits your job search."
      />

      <FadeIn>
        <section className="bg-white py-20 sm:py-28">
          <div className="container-page grid gap-6 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.slug}
                  id={service.slug}
                  className="group flex scroll-mt-24 gap-5 rounded-2xl border border-black/5 p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-950 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-navy-950">{service.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                      {service.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <CTASection />
      </FadeIn>
    </>
  );
}
