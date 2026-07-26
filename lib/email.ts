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
    await resend.emails.send({
      from: `${siteConfig.name} <notifications@${siteConfig.name.toLowerCase()}.example.com>`,
      to: siteConfig.email,
      subject: params.subject,
      html: params.html,
    });
  } catch (error) {
    console.error("Failed to send lead notification email:", error);
  }
}
