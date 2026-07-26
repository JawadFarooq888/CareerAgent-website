import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "@/lib/actions/testimonials";

export default function NewTestimonialPage() {
  return (
    <>
      <AdminPageHeader title="New Testimonial" />
      <TestimonialForm action={createTestimonial} submitLabel="Create Testimonial" />
    </>
  );
}
