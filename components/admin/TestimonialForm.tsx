"use client";

import { useActionState } from "react";
import { TextField, TextAreaField } from "@/components/ui/FormField";
import type { FormActionResult } from "@/lib/actions/blog";

type Action = (prevState: FormActionResult, formData: FormData) => Promise<FormActionResult>;

export function TestimonialForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: Action;
  initial?: {
    name: string;
    role: string | null;
    company: string | null;
    quote: string;
    rating: number;
    photoUrl: string | null;
    published: boolean;
  };
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Name" name="name" required defaultValue={initial?.name} />
        <TextField label="Rating (1-5)" name="rating" type="number" required defaultValue={String(initial?.rating ?? 5)} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Role (optional)" name="role" defaultValue={initial?.role ?? ""} />
        <TextField label="Company (optional)" name="company" defaultValue={initial?.company ?? ""} />
      </div>
      <TextAreaField label="Quote" name="quote" required rows={4} defaultValue={initial?.quote} />
      <TextField label="Photo URL (optional)" name="photoUrl" defaultValue={initial?.photoUrl ?? ""} />

      <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? true}
          className="h-4 w-4 rounded border-black/20"
        />
        Published
      </label>

      {state && !state.ok && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400 disabled:opacity-50"
      >
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
