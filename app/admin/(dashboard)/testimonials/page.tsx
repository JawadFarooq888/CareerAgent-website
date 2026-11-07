import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/lib/actions/testimonials";

export default async function AdminTestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof prisma.testimonial.findMany>> = [];
  let dbError = false;

  try {
    testimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Manage client success stories."
        action={
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus size={16} /> New Testimonial
          </Link>
        }
      />

      {dbError ? (
        <p className="text-sm text-amber-700">Database not connected.</p>
      ) : testimonials.length === 0 ? (
        <p className="text-sm text-ink-900/70">No testimonials yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-mist-50 text-xs uppercase tracking-wide text-ink-900/70">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {testimonials.map((t) => (
                <tr key={t.id} className="hover:bg-mist-50">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-ink-950">{t.name}</p>
                    <p className="text-xs text-ink-900/70">{t.role} {t.company && `· ${t.company}`}</p>
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">{t.rating} / 5</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={
                        t.published
                          ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                          : "rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600"
                      }
                    >
                      {t.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/testimonials/${t.id}/edit`}
                        className="text-ink-900/70 hover:text-brand-600"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteTestimonial(t.id);
                        }}
                      >
                        <button type="submit" className="text-ink-900/70 hover:text-red-600" aria-label="Delete">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
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
