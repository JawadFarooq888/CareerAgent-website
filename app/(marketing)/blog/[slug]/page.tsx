import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { JsonLd } from "@/components/marketing/JsonLd";
import { CTASection } from "@/components/marketing/CTASection";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: siteConfig.ownerName,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="bg-white py-16 sm:py-20">
        <div className="container-page mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-navy-900/60">
            <Link href="/" className="hover:text-gold-600">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog" className="hover:text-gold-600">
              Blog
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-navy-900/40">{post.title}</span>
          </nav>

          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-gold-600">
            {post.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
            {post.title}
          </h1>
          <time className="mt-3 block text-sm text-navy-900/50" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <div className="prose prose-neutral mt-10 max-w-none prose-headings:text-navy-950 prose-a:text-gold-600">
            {post.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>

      <CTASection
        title="Ready to put this into practice?"
        description="Book a free consultation and let's apply these strategies to your specific job search."
      />
    </>
  );
}
