import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PricingForm } from "@/components/admin/PricingForm";
import { createPricingPackage } from "@/lib/actions/pricing";

export default function NewPricingPackagePage() {
  return (
    <>
      <AdminPageHeader title="New Pricing Package" />
      <PricingForm action={createPricingPackage} submitLabel="Create Package" />
    </>
  );
}
