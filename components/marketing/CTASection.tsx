import { Button } from "@/components/ui/Button";

export function CTASection({
  title = "Ready to accelerate your job search?",
  description = "Book a free, no-obligation consultation and let's build a plan to get you hired faster.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 100%, rgba(201,162,39,0.3) 0%, rgba(201,162,39,0) 70%)",
        }}
      />
      <div className="container-page relative flex flex-col items-center gap-6 py-16 text-center sm:py-20">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-white/70">{description}</p>
        <Button href="/book-consultation" size="lg">
          Book Your Free Consultation
        </Button>
      </div>
    </section>
  );
}
