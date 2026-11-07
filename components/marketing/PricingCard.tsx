import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { PaddleCheckoutButton } from "@/components/marketing/PaddleCheckoutButton";
import { isPaddleConfigured } from "@/lib/paddle-config";

export function PricingCard({
  name,
  price,
  billingNote,
  description,
  features,
  highlighted,
  ctaText,
  paddlePriceId,
}: {
  name: string;
  price: string;
  billingNote?: string | null;
  description?: string | null;
  features: readonly string[];
  highlighted?: boolean;
  ctaText: string;
  paddlePriceId?: string | null;
}) {
  const canCheckout = isPaddleConfigured() && !!paddlePriceId;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border p-8 transition-transform duration-200 hover:-translate-y-1",
        highlighted
          ? "border-2 border-brand-600 bg-mist-50 text-ink-950 shadow-xl shadow-brand-700/10 lg:scale-105"
          : "border-black/5 bg-white text-ink-950 hover:shadow-lg"
      )}
    >
      {highlighted && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </span>
      )}
      <h3 className="text-lg font-semibold text-ink-950">
        {name}
      </h3>
      {description && (
        <p className="mt-1 text-sm text-ink-900/70">
          {description}
        </p>
      )}
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold">{price}</span>
        {billingNote && (
          <span className="text-sm text-ink-900/70">
            {billingNote}
          </span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check size={18} className="mt-0.5 shrink-0 text-brand-500" />
            <span className="text-ink-900/80">{feature}</span>
          </li>
        ))}
      </ul>

      {canCheckout ? (
        <PaddleCheckoutButton
          priceId={paddlePriceId!}
          variant={highlighted ? "primary" : "outline"}
          className="mt-8 w-full"
        >
          Buy Now
        </PaddleCheckoutButton>
      ) : (
        <Button
          href="/book-consultation"
          variant={highlighted ? "primary" : "outline"}
          className="mt-8 w-full"
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
}
