import { Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { upsertContentBlock, deleteContentBlock } from "@/lib/actions/content";

export default async function AdminContentPage() {
  let blocks: Awaited<ReturnType<typeof prisma.contentBlock.findMany>> = [];
  let dbError = false;

  try {
    blocks = await prisma.contentBlock.findMany({ orderBy: { key: "asc" } });
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminPageHeader
        title="Content"
        description="Editable copy overrides used across the site. Add a key, then reference it in a page via getContentBlock()."
      />

      {dbError ? (
        <p className="text-sm text-amber-700">Database not connected.</p>
      ) : (
        <>
          <div className="mb-6 overflow-hidden rounded-2xl border border-black/5 bg-white">
            {blocks.length === 0 ? (
              <p className="p-6 text-sm text-ink-900/70">No content overrides yet.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/5 bg-mist-50 text-xs uppercase tracking-wide text-ink-900/70">
                  <tr>
                    <th className="px-5 py-3">Key</th>
                    <th className="px-5 py-3">Value</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {blocks.map((block) => (
                    <tr key={block.id}>
                      <td className="px-5 py-3.5 font-mono text-xs text-ink-950">{block.key}</td>
                      <td className="px-5 py-3.5 text-ink-900/70">{block.value}</td>
                      <td className="px-5 py-3.5">
                        <form
                          action={async () => {
                            "use server";
                            await deleteContentBlock(block.id);
                          }}
                          className="flex justify-end"
                        >
                          <button type="submit" className="text-ink-900/70 hover:text-red-600" aria-label="Delete">
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <form action={upsertContentBlock} className="max-w-lg space-y-4 rounded-2xl border border-black/5 bg-white p-6">
            <h3 className="text-sm font-semibold text-ink-950">Add / Update Content Block</h3>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-900">Key</label>
              <input
                name="key"
                required
                placeholder="home.hero.heading"
                className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-400/40"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-900">Value</label>
              <textarea
                name="value"
                required
                rows={3}
                className="w-full resize-none rounded-lg border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-400/40"
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Save
            </button>
          </form>
        </>
      )}
    </>
  );
}
