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
          ? "border-gold-500 bg-navy-950 text-white shadow-xl lg:scale-105"
          : "border-black/5 bg-white text-navy-950 hover:shadow-lg"
      )}
    >
      {highlighted && (
        <span className="mb-4 inline-flex w-fit rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-navy-950">
          Most Popular
        </span>
      )}
      <h3 className={cn("text-lg font-semibold", highlighted ? "text-white" : "text-navy-950")}>
        {name}
      </h3>
      {description && (
        <p className={cn("mt-1 text-sm", highlighted ? "text-white/60" : "text-navy-900/60")}>
          {description}
        </p>
      )}
      <div className="mt-5 flex items-baseline gap-2">
        <span className="text-4xl font-bold">{price}</span>
        {billingNote && (
          <span className={cn("text-sm", highlighted ? "text-white/50" : "text-navy-900/50")}>
            {billingNote}
          </span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check size={18} className="mt-0.5 shrink-0 text-gold-500" />
            <span className={highlighted ? "text-white/80" : "text-navy-900/80"}>{feature}</span>
          </li>
        ))}
      </ul>

      {canCheckout ? (
        <PaddleCheckoutButton
          priceId={paddlePriceId!}
          variant={highlighted ? "primary" : "outline"}
          className={cn("mt-8 w-full", !highlighted && "border-navy-950")}
        >
          Buy Now
        </PaddleCheckoutButton>
      ) : (
        <Button
          href="/book-consultation"
          variant={highlighted ? "primary" : "outline"}
          className={cn("mt-8 w-full", !highlighted && "border-navy-950")}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );
}
