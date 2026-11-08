import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().max(254, "Email is too long.").email("Please enter a valid email address."),
  honeypot: z.string().optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
