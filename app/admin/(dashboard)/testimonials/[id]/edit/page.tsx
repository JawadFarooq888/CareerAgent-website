import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "@/lib/actions/testimonials";
import { prisma } from "@/lib/prisma";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  const action = updateTestimonial.bind(null, id);

  return (
    <>
      <AdminPageHeader title="Edit Testimonial" />
      <TestimonialForm action={action} initial={testimonial} submitLabel="Save Changes" />
    </>
  );
}
