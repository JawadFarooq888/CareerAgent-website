import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Please provide a bit more detail (at least 10 characters)."),
  honeypot: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const consultationSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a bit about your goals (at least 10 characters)."),
  honeypot: z.string().max(0).optional(),
  startedAt: z.string().optional(),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const MIN_FILL_TIME_MS = 1500;
