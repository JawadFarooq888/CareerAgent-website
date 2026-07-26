import { Button } from "@/components/ui/Button";

export function CTASection({
  title = "Ready to accelerate your job search?",
  description = "Book a free, no-obligation consultation and let's build a plan to get you hired faster.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-gold-500">
      <div className="container-page flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-navy-950/80">{description}</p>
        <Button href="/book-consultation" variant="secondary" size="lg">
          Book Your Free Consultation
        </Button>
      </div>
    </section>
  );
}
