"use server";

import { prisma } from "@/lib/prisma";
import {
  contactSchema,
  consultationSchema,
  MAX_FORM_AGE_MS,
  MIN_FILL_TIME_MS,
} from "@/lib/validations/contact";
import { sendLeadNotification } from "@/lib/email";
import { escapeHtml } from "@/lib/utils";
import type { ActionResult } from "@/lib/actions/newsletter";

function isLikelyBot(honeypot: string | undefined, startedAt: string | undefined): boolean {
  if (honeypot) return true;
  // The real form always sends a recent start time; missing, forged (e.g. "0")
  // or replayed values mean the request did not come from the page.
  const elapsed = Date.now() - Number(startedAt);
  if (!startedAt || !Number.isFinite(elapsed)) return true;
  return elapsed < MIN_FILL_TIME_MS || elapsed > MAX_FORM_AGE_MS;
}

export async function submitContactForm(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    subject: formData.get("subject") || undefined,
    message: formData.get("message"),
    honeypot: formData.get("company") || undefined,
    startedAt: formData.get("startedAt") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  if (isLikelyBot(parsed.data.honeypot, parsed.data.startedAt)) {
    return { ok: true, message: "Thanks for reaching out! I'll get back to you within one business day." };
  }

  try {
    await prisma.contactInquiry.create({
      data: {
        type: "GENERAL",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    await sendLeadNotification({
      subject: `New contact inquiry from ${parsed.data.name}`,
      html: `<p><strong>${escapeHtml(parsed.data.name)}</strong> (${escapeHtml(parsed.data.email)}) sent:</p><p>${escapeHtml(parsed.data.message)}</p>`,
    });

    return { ok: true, message: "Thanks for reaching out! I'll get back to you within one business day." };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return {
      ok: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}

export async function submitConsultationRequest(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const parsed = consultationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    honeypot: formData.get("company") || undefined,
    startedAt: formData.get("startedAt") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  if (isLikelyBot(parsed.data.honeypot, parsed.data.startedAt)) {
    return { ok: true, message: "Thanks! I'll reach out shortly to schedule your consultation." };
  }

  try {
    await prisma.contactInquiry.create({
      data: {
        type: "CONSULTATION",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        message: parsed.data.message,
      },
    });

    await sendLeadNotification({
      subject: `New consultation request from ${parsed.data.name}`,
      html: `<p><strong>${escapeHtml(parsed.data.name)}</strong> (${escapeHtml(parsed.data.email)}) requested a consultation:</p><p>${escapeHtml(parsed.data.message)}</p>`,
    });

    return { ok: true, message: "Thanks! I'll reach out shortly to schedule your consultation." };
  } catch (error) {
    console.error("Consultation request submission failed:", error);
    return {
      ok: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
