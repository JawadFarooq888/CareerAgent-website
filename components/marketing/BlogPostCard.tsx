import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  BookOpen,
  FileText,
  HandCoins,
  Laptop,
  MessagesSquare,
  Search,
  Share2,
  Target,
} from "lucide-react";
import type { BlogPostData } from "@/lib/blog";

const categoryIcons: Record<string, typeof BookOpen> = {
  "Resume Tips": FileText,
  "Job Search Strategies": Search,
  "LinkedIn Tips": Share2,
  "Interview Preparation": MessagesSquare,
  "Salary Negotiation": HandCoins,
  "Remote Jobs": Laptop,
  "Reverse Recruiting": Target,
  "Pricing & Value": BadgeDollarSign,
};

function readingTime(content: string[]) {
  const words = content.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function BlogPostCard({ post }: { post: BlogPostData }) {
  const Icon = categoryIcons[post.category] ?? BookOpen;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-44 items-end overflow-hidden bg-gradient-to-br from-mist-100 to-brand-200 p-6">
        <div aria-hidden="true" className="bg-dot-grid absolute inset-0 opacity-[0.08]" />
        <Icon
          aria-hidden="true"
          size={120}
          strokeWidth={1}
          className="absolute -right-4 -top-4 text-brand-600/20 transition-transform duration-500 group-hover:scale-110"
        />
        <span className="relative rounded-full border border-brand-500/20 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs text-ink-900/70">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {" · "}
          {readingTime(post.content)} min read
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-ink-950 transition-colors group-hover:text-brand-600">
          {/* Stretched link makes the whole card clickable. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-900/70">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Read article{" "}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
