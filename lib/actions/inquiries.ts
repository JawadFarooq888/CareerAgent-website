"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import type { InquiryStatus } from "@/app/generated/prisma/enums";

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireAdmin();
  await prisma.contactInquiry.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}
