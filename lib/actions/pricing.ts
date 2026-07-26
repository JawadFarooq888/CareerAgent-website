"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { pricingPackageSchema } from "@/lib/validations/pricing";
import type { FormActionResult } from "@/lib/actions/blog";

function parseFormData(formData: FormData) {
  return pricingPackageSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    billingNote: formData.get("billingNote") ?? "",
    description: formData.get("description") ?? "",
    features: formData.get("features") ?? "",
    highlighted: formData.get("highlighted") === "on",
    ctaText: formData.get("ctaText"),
    order: formData.get("order") ?? "0",
    published: formData.get("published") === "on",
  });
}

export async function createPricingPackage(
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.pricingPackage.create({ data: parsed.data });
  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  redirect("/admin/pricing");
}

export async function updatePricingPackage(
  id: string,
  _prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const parsed = parseFormData(formData);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await prisma.pricingPackage.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
  redirect("/admin/pricing");
}

export async function deletePricingPackage(id: string) {
  await prisma.pricingPackage.delete({ where: { id } });
  revalidatePath("/admin/pricing");
  revalidatePath("/pricing");
}
