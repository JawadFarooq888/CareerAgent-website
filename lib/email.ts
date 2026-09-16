import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendLeadNotification(params: {
  subject: string;
  html: string;
}): Promise<void> {
  if (!resend) {
    console.log("[email:placeholder] RESEND_API_KEY not set — skipping send.", params.subject);
    return;
  }

  try {
    const { error } = await resend.emails.send({
      // Resend's shared sending domain works without verifying your own domain,
      // but only delivers to the email address your Resend account was created with.
      from: process.env.EMAIL_FROM ?? `${siteConfig.name} <onboarding@resend.dev>`,
      to: siteConfig.email,
      subject: params.subject,
      html: params.html,
    });
    if (error) {
      console.error("Resend rejected the notification email:", error);
    }
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
  }
}
