import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PricingForm } from "@/components/admin/PricingForm";
import { updatePricingPackage } from "@/lib/actions/pricing";
import { prisma } from "@/lib/prisma";

export default async function EditPricingPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pkg = await prisma.pricingPackage.findUnique({ where: { id } });
  if (!pkg) notFound();

  const action = updatePricingPackage.bind(null, id);

  return (
    <>
      <AdminPageHeader title="Edit Pricing Package" />
      <PricingForm action={action} initial={pkg} submitLabel="Save Changes" />
    </>
  );
}
