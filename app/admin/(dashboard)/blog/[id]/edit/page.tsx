import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BlogForm } from "@/components/admin/BlogForm";
import { updateBlogPost } from "@/lib/actions/blog";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const action = updateBlogPost.bind(null, id);

  return (
    <>
      <AdminPageHeader title="Edit Blog Post" />
      <BlogForm action={action} initial={post} submitLabel="Save Changes" />
    </>
  );
}
