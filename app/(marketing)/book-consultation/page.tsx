import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
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
        description="Send your details below and I'll personally reach out within one business day to schedule a time."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page mx-auto max-w-xl">
          <ConsultationForm />
        </div>
      </section>
    </>
  );
}
