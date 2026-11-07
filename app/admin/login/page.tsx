"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth";
import { siteConfig } from "@/lib/site-config";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-ink-950">{siteConfig.name} Admin</h1>
        <p className="mt-1 text-sm text-ink-900/70">Sign in to manage your site.</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-900/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-900/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm text-ink-950 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          {state && !state.ok && <p className="text-sm text-red-700">{state.message}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
