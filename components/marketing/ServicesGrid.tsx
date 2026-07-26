import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/placeholder-data";
import { iconMap } from "@/components/marketing/icon-map";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export function ServicesGrid({ limit }: { limit?: number }) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="What I Offer"
          title="Career services built to get you hired"
          description="Every engagement is tailored to your background and goals — from a single resume rewrite to full done-for-you application management."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.slug}
                className="group rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-400">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-navy-950">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{service.summary}</p>
              </div>
            );
          })}
        </div>

        {limit && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500"
            >
              View all services <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
