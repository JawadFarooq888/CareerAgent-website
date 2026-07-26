"use client";

import { useActionState } from "react";
import { TextField, TextAreaField } from "@/components/ui/FormField";
import type { FormActionResult } from "@/lib/actions/blog";

type Action = (prevState: FormActionResult, formData: FormData) => Promise<FormActionResult>;

export function PricingForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: Action;
  initial?: {
    name: string;
    price: string;
    billingNote: string | null;
    description: string | null;
    features: string[];
    highlighted: boolean;
    ctaText: string;
    order: number;
    published: boolean;
  };
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Package Name" name="name" required defaultValue={initial?.name} />
        <TextField label="Price" name="price" required defaultValue={initial?.price} placeholder="$249 or Custom" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Billing Note (optional)" name="billingNote" defaultValue={initial?.billingNote ?? ""} placeholder="one-time / per month" />
        <TextField label="CTA Text" name="ctaText" required defaultValue={initial?.ctaText ?? "Get Started"} />
      </div>
      <TextAreaField label="Description (optional)" name="description" rows={2} defaultValue={initial?.description ?? ""} />
      <TextAreaField
        label="Features (one per line)"
        name="features"
        required
        rows={6}
        defaultValue={initial?.features?.join("\n") ?? ""}
      />
      <TextField label="Sort Order" name="order" type="number" defaultValue={String(initial?.order ?? 0)} />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
          <input type="checkbox" name="highlighted" defaultChecked={initial?.highlighted ?? false} className="h-4 w-4 rounded border-black/20" />
          Highlighted (Most Popular)
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
          <input type="checkbox" name="published" defaultChecked={initial?.published ?? true} className="h-4 w-4 rounded border-black/20" />
          Published
        </label>
      </div>

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
