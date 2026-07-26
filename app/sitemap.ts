import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllBlogPosts } from "@/lib/blog";

const staticRoutes = [
  "",
  "about",
  "services",
  "pricing",
  "testimonials",
  "blog",
  "faqs",
  "contact",
  "book-consultation",
  "privacy-policy",
  "terms-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
