import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  honeypot: z.string().max(0).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
