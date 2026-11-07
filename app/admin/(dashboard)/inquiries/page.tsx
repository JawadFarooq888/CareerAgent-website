import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { prisma } from "@/lib/prisma";

export default async function AdminInquiriesPage() {
  let inquiries: Awaited<ReturnType<typeof prisma.contactInquiry.findMany>> = [];
  let dbError = false;

  try {
    inquiries = await prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminPageHeader title="Inquiries" description="Contact and consultation requests from your website." />

      {dbError ? (
        <p className="text-sm text-amber-700">Database not connected.</p>
      ) : inquiries.length === 0 ? (
        <p className="text-sm text-ink-900/70">No inquiries yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-mist-50 text-xs uppercase tracking-wide text-ink-900/70">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-mist-50">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-medium text-ink-950 hover:text-brand-600"
                    >
                      {inquiry.name}
                    </Link>
                    <p className="text-xs text-ink-900/70">{inquiry.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">{inquiry.type}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={inquiry.status} />
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">
                    {inquiry.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
