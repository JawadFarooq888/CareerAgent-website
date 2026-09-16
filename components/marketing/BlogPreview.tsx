import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import { BlogPostCard } from "@/components/marketing/BlogPostCard";
import { SectionHeading } from "@/components/marketing/SectionHeading";

export function BlogPreview() {
  const posts = getAllBlogPosts().slice(0, 3);

  return (
    <section className="bg-navy-950/[0.02] py-20 sm:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="From the Blog"
          title="Job search advice you can actually use"
          description="Practical, no-fluff guidance on resumes, LinkedIn, interviews, and salary negotiation."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 hover:text-gold-500"
          >
            Read more articles <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
