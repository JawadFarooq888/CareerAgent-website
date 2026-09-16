import { Hero } from "@/components/marketing/Hero";
import { StatsSection } from "@/components/marketing/StatsSection";
import { ServicesGrid } from "@/components/marketing/ServicesGrid";
import { ComparisonSection } from "@/components/marketing/ComparisonSection";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { TestimonialsPreview } from "@/components/marketing/TestimonialsPreview";
import { CTASection } from "@/components/marketing/CTASection";
import { FadeIn } from "@/components/marketing/FadeIn";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FadeIn>
        <StatsSection />
      </FadeIn>
      <FadeIn>
        <ServicesGrid limit={6} />
      </FadeIn>
      <FadeIn>
        <ComparisonSection />
      </FadeIn>
      <FadeIn>
        <HowItWorks />
      </FadeIn>
      <FadeIn>
        <TestimonialsPreview />
      </FadeIn>
      <FadeIn>
        <CTASection />
      </FadeIn>
    </>
  );
}
