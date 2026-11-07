"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function upsertContentBlock(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "");
  if (!key) return;

  await prisma.contentBlock.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePath("/admin/content");
}

export async function deleteContentBlock(id: string) {
  await requireAdmin();
  await prisma.contentBlock.delete({ where: { id } });
  revalidatePath("/admin/content");
}
