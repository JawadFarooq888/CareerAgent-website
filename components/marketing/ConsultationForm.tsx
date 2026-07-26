"use client";

import { useActionState, useState } from "react";
import { submitConsultationRequest } from "@/lib/actions/contact";
import { TextField, TextAreaField, HoneypotField } from "@/components/ui/FormField";
import { CheckCircle2 } from "lucide-react";

export function ConsultationForm() {
  const [state, formAction, isPending] = useActionState(submitConsultationRequest, null);
  const [startedAt] = useState(() => String(Date.now()));

  if (state?.ok) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gold-500/30 bg-gold-500/5 p-10 text-center">
        <CheckCircle2 size={40} className="text-gold-500" />
        <p className="text-lg font-semibold text-navy-950">Request received!</p>
        <p className="text-sm text-navy-900/70">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
      <HoneypotField />
      <input type="hidden" name="startedAt" value={startedAt} />

      <h3 className="text-lg font-semibold text-navy-950">
        Prefer we reach out to you instead?
      </h3>
      <p className="text-sm text-navy-900/60">
        Send your details and I&apos;ll personally follow up to schedule a time that works.
      </p>

      <TextField label="Full Name" name="name" required placeholder="Jane Doe" />
      <TextField label="Email" name="email" type="email" required placeholder="jane@example.com" />
      <TextField label="Phone (optional)" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
      <TextAreaField
        label="What are you looking for help with?"
        name="message"
        required
        placeholder="Tell me about your current role, target roles, and timeline..."
      />

      {state && !state.ok && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
      >
        {isPending ? "Sending..." : "Request a Callback"}
      </button>
    </form>
  );
}
