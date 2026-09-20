"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations/newsletter";

export type ActionResult = { ok: true; message: string } | { ok: false; message: string };

export async function subscribeToNewsletter(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
    honeypot: formData.get("company") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  if (parsed.data.honeypot) {
    return { ok: true, message: "Thanks for subscribing!" };
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return { ok: true, message: "Thanks for subscribing! Watch your inbox for career tips." };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return {
      ok: false,
      message: "Something went wrong. Please try again later or email us directly.",
    };
  }
}
