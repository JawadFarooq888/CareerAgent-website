import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().min(2, "Name is required."),
  role: z.string().optional(),
  company: z.string().optional(),
  quote: z.string().min(10, "Quote is required."),
  rating: z.coerce.number().int().min(1).max(5),
  photoUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean(),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;
