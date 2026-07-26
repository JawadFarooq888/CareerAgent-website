import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/PageHero";
import { BlogPostCard } from "@/components/marketing/BlogPostCard";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical job search advice: resume tips, LinkedIn optimization, interview preparation, salary negotiation, and more.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Career advice that actually works"
        description="Practical, no-fluff guidance on resumes, LinkedIn, interviews, and job search strategy."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
