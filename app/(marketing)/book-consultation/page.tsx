import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { CalendlyEmbed } from "@/components/marketing/CalendlyEmbed";
import { ConsultationForm } from "@/components/marketing/ConsultationForm";

export const metadata: Metadata = {
  title: "Book a Free Consultation",
  description: "Schedule your free consultation to discuss your job search goals and find the right service package.",
};

export default function BookConsultationPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Consultation"
        title="Let's build your job search plan"
        description="Pick a time below, or send your details and I'll reach out to schedule personally."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <CalendlyEmbed />
          </div>
          <div className="lg:col-span-2">
            <ConsultationForm />
          </div>
        </div>
      </section>
    </>
  );
}
