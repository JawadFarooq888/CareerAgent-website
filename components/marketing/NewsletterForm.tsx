"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type ActionResult } from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";

const initialState: ActionResult | null = null;

export function NewsletterForm() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <form action={formAction} className="w-full max-w-sm">
      <p className="mb-2 text-sm font-semibold text-ink-900">
        Get free career tips in your inbox
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />
        <input
          type="email"
          name="email"
          required
          aria-label="Email address"
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none placeholder:text-ink-900/50 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          {isPending ? "..." : "Subscribe"}
        </button>
      </div>
      {state && (
        <p className={cn("mt-2 text-xs", state.ok ? "text-brand-700" : "text-red-700")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
