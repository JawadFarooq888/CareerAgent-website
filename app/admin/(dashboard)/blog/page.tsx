import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { prisma } from "@/lib/prisma";
import { deleteBlogPost } from "@/lib/actions/blog";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = [];
  let dbError = false;

  try {
    posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminPageHeader
        title="Blog"
        description="Manage blog posts."
        action={
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <Plus size={16} /> New Post
          </Link>
        }
      />

      {dbError ? (
        <p className="text-sm text-amber-700">Database not connected.</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-ink-900/70">No blog posts yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/5 bg-mist-50 text-xs uppercase tracking-wide text-ink-900/70">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-mist-50">
                  <td className="px-5 py-3.5 font-medium text-ink-950">{post.title}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={
                        post.published
                          ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                          : "rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600"
                      }
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-ink-900/70">
                    {post.updatedAt.toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-ink-900/70 hover:text-brand-600"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteBlogPost(post.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="text-ink-900/70 hover:text-red-600"
                          aria-label="Delete"
                        >
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
