import { z } from "zod";

// Length caps stop a single submission from flooding the database or inbox.
const name = z.string().trim().min(2, "Please enter your name.").max(200, "Name is too long.");
const email = z.string().trim().max(254, "Email is too long.").email("Please enter a valid email address.");
const phone = z.string().trim().max(40, "Phone number is too long.").optional();

export const contactSchema = z.object({
  name,
  email,
  phone,
  subject: z.string().trim().max(200, "Subject is too long.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please provide a bit more detail (at least 10 characters).")
    .max(5000, "Message is too long (5,000 characters max)."),
  honeypot: z.string().optional(),
  startedAt: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const consultationSchema = z.object({
  name,
  email,
  phone,
  message: z
    .string()
    .trim()
    .min(10, "Tell us a bit about your goals (at least 10 characters).")
    .max(5000, "Message is too long (5,000 characters max)."),
  honeypot: z.string().optional(),
  startedAt: z.string().optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const MIN_FILL_TIME_MS = 1500;
// Forms older than this are treated as replayed or forged.
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
