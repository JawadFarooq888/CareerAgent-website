"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/lib/validations/testimonial";
import type { FormActionResult } from "@/lib/actions/blog";

function parseFormData(formData: FormData) {
  return testimonialSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") ?? "",
    company: formData.get("company") ?? "",
    quote: formData.get("quote"),
    rating: formData.get("rating"),
    photoUrl: formData.get("photoUrl") ?? "",
    published: formData.get("published") === "on",
  });
}

export async function createTestimonial(
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.testimonial.create({ data: parsed.data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.testimonial.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
}
