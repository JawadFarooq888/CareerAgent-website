import { z } from "zod";

export const pricingPackageSchema = z.object({
  name: z.string().min(2, "Name is required."),
  price: z.string().min(1, "Price is required."),
  billingNote: z.string().optional(),
  description: z.string().optional(),
  features: z
    .string()
    .transform((val) =>
      val
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean)
    ),
  highlighted: z.boolean(),
  ctaText: z.string().min(1, "CTA text is required."),
  order: z.coerce.number().int().default(0),
  published: z.boolean(),
});

export type PricingPackageInput = z.infer<typeof pricingPackageSchema>;
