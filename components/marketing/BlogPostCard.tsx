import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostData } from "@/lib/blog";

export function BlogPostCard({ post }: { post: BlogPostData }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-navy-950 to-navy-700">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time className="text-xs text-navy-900/50" dateTime={post.publishedAt}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-2 text-lg font-semibold text-navy-950 group-hover:text-gold-600">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-900/70">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-500"
        >
          Read more <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
