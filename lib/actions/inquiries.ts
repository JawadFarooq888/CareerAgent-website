"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { InquiryStatus } from "@/app/generated/prisma/enums";

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  await requireAdmin();
  // The value comes from a form, so check it is a real status before saving.
  if (!Object.values(InquiryStatus).includes(status)) {
    throw new Error("Invalid status");
  }
  await prisma.contactInquiry.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/inquiries");
  revalidatePath(`/admin/inquiries/${id}`);
}
