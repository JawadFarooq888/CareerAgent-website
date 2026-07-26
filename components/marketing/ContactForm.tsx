"use client";

import { useActionState, useState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { TextField, TextAreaField, HoneypotField } from "@/components/ui/FormField";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const [startedAt] = useState(() => String(Date.now()));

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-10 text-center">
        <CheckCircle2 size={40} className="text-gold-500" />
        <p className="text-lg font-semibold text-navy-950">Message sent!</p>
        <p className="text-sm text-navy-900/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <HoneypotField />
      <input type="hidden" name="startedAt" value={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full Name" name="name" required placeholder="Jane Doe" />
        <TextField label="Email" name="email" type="email" required placeholder="jane@example.com" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Phone (optional)" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
        <TextField label="Subject" name="subject" placeholder="How can I help?" />
      </div>
      <TextAreaField label="Message" name="message" required placeholder="Tell me a bit about your situation and what you're looking for..." />

      {state && !state.ok && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50 sm:w-auto"
      >
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
