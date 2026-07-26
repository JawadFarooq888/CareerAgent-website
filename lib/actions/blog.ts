"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations/blog";

export type FormActionResult = { ok: false; message: string } | null;

function parseFormData(formData: FormData) {
  return blogPostSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImage: formData.get("coverImage") ?? "",
    seoTitle: formData.get("seoTitle") ?? "",
    seoDescription: formData.get("seoDescription") ?? "",
    published: formData.get("published") === "on",
  });
}

export async function createBlogPost(
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await prisma.blogPost.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? new Date() : null,
      },
    });
  } catch {
    return { ok: false, message: "A post with this slug may already exist." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });

  try {
    await prisma.blogPost.update({
      where: { id },
      data: {
        ...parsed.data,
        publishedAt: parsed.data.published ? (existing?.publishedAt ?? new Date()) : null,
      },
    });
  } catch {
    return { ok: false, message: "A post with this slug may already exist." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
