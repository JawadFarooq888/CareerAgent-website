import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { updateInquiryStatus } from "@/lib/actions/inquiries";
import { InquiryStatus } from "@/app/generated/prisma/enums";

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const inquiry = await prisma.contactInquiry.findUnique({ where: { id } });
  if (!inquiry) notFound();

  async function setStatus(formData: FormData) {
    "use server";
    const status = formData.get("status") as InquiryStatus;
    await updateInquiryStatus(id, status);
  }

  return (
    <>
      <Link
        href="/admin/inquiries"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-900/60 hover:text-gold-600"
      >
        <ArrowLeft size={16} /> Back to Inquiries
      </Link>

      <AdminPageHeader
        title={inquiry.name}
        description={`${inquiry.type} inquiry submitted ${inquiry.createdAt.toLocaleString()}`}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4 rounded-2xl border border-black/5 bg-white p-6">
          <div>
            <p className="text-xs font-semibold uppercase text-navy-900/40">Email</p>
            <p className="text-sm text-navy-950">{inquiry.email}</p>
          </div>
          {inquiry.phone && (
            <div>
              <p className="text-xs font-semibold uppercase text-navy-900/40">Phone</p>
              <p className="text-sm text-navy-950">{inquiry.phone}</p>
            </div>
          )}
          {inquiry.subject && (
            <div>
              <p className="text-xs font-semibold uppercase text-navy-900/40">Subject</p>
              <p className="text-sm text-navy-950">{inquiry.subject}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold uppercase text-navy-900/40">Message</p>
            <p className="whitespace-pre-wrap text-sm text-navy-900/80">{inquiry.message}</p>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-black/5 bg-white p-6">
          <p className="text-xs font-semibold uppercase text-navy-900/40">Current Status</p>
          <StatusBadge status={inquiry.status} />

          <form action={setStatus} className="space-y-3 pt-2">
            <select
              name="status"
              defaultValue={inquiry.status}
              className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
            >
              {Object.values(InquiryStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-800"
            >
              Update Status
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
