"use client";

import { useActionState } from "react";
import { subscribeToNewsletter, type ActionResult } from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";

const initialState: ActionResult | null = null;

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "footer" }) {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);
  const isFooter = variant === "footer";

  return (
    <form action={formAction} className="w-full max-w-sm">
      <p className={cn("mb-2 text-sm font-semibold", isFooter ? "text-white" : "text-navy-900")}>
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
          placeholder="you@example.com"
          className={cn(
            "min-w-0 flex-1 rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-gold-400",
            isFooter
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/40"
              : "border-black/10 bg-white text-navy-900 placeholder:text-navy-900/40"
          )}
        />
        <button
          type="submit"
          disabled={isPending}
          className="shrink-0 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-50"
        >
          {isPending ? "..." : "Subscribe"}
        </button>
      </div>
      {state && (
        <p className={cn("mt-2 text-xs", state.ok ? "text-gold-400" : "text-red-400")}>
          {state.message}
        </p>
      )}
    </form>
  );
}
