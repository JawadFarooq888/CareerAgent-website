import { Hero } from "@/components/marketing/Hero";
import { StatsSection } from "@/components/marketing/StatsSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TestimonialsPreview } from "@/components/marketing/TestimonialsPreview";
import { CTASection } from "@/components/marketing/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesGrid limit={6} />
      <ComparisonSection />
      <HowItWorks />
      <TestimonialsPreview />
      <CTASection />
    </>
  );
}
