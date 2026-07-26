"use client";

import { useActionState } from "react";
import { TextField, TextAreaField } from "@/components/ui/FormField";
import type { FormActionResult } from "@/lib/actions/blog";

type Action = (prevState: FormActionResult, formData: FormData) => Promise<FormActionResult>;

export function BlogForm({
  action,
  initial,
  submitLabel = "Save Post",
}: {
  action: Action;
  initial?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    published: boolean;
  };
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-black/5 bg-white p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Title" name="title" required defaultValue={initial?.title} />
        <TextField label="Slug" name="slug" required defaultValue={initial?.slug} placeholder="my-post-title" />
      </div>
      <TextAreaField label="Excerpt" name="excerpt" required rows={2} defaultValue={initial?.excerpt} />
      <TextAreaField label="Content" name="content" required rows={10} defaultValue={initial?.content} />
      <TextField label="Cover Image URL (optional)" name="coverImage" defaultValue={initial?.coverImage ?? ""} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="SEO Title (optional)" name="seoTitle" defaultValue={initial?.seoTitle ?? ""} />
        <TextField label="SEO Description (optional)" name="seoDescription" defaultValue={initial?.seoDescription ?? ""} />
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-900">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initial?.published ?? false}
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
