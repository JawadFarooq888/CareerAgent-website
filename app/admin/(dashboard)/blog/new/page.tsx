import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BlogForm } from "@/components/admin/BlogForm";
import { createBlogPost } from "@/lib/actions/blog";

export default function NewBlogPostPage() {
  return (
    <>
      <AdminPageHeader title="New Blog Post" />
      <BlogForm action={createBlogPost} submitLabel="Create Post" />
    </>
  );
}
