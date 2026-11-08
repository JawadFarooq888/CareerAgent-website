import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { companyLinks, footerLinks, navLinks, siteConfig } from "@/lib/site-config";
import { services } from "@/lib/placeholder-data";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

const marketingDir = path.resolve(__dirname, "../../app/(marketing)");
const pageExists = (href: string) =>
  existsSync(path.join(marketingDir, href === "/" ? "" : href, "page.tsx"));

describe("blog data", () => {
  const posts = getAllBlogPosts();

  it("has unique, URL-safe slugs", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("has valid dates and is sorted newest first", () => {
    const times = posts.map((p) => new Date(p.publishedAt).getTime());
    for (const t of times) expect(Number.isNaN(t)).toBe(false);
    expect([...times].sort((a, b) => b - a)).toEqual(times);
  });

  it("every post has a title, excerpt and content", () => {
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(5);
      expect(post.excerpt.length).toBeGreaterThan(20);
      expect(post.content.length).toBeGreaterThan(0);
    }
  });

  it("looks posts up by slug and returns undefined for unknown slugs", () => {
    expect(getBlogPostBySlug(posts[0].slug)?.title).toBe(posts[0].title);
    expect(getBlogPostBySlug("does-not-exist")).toBeUndefined();
    expect(getBlogPostBySlug("../../etc/passwd")).toBeUndefined();
  });

  it("does not let callers mutate the stored order", () => {
    getAllBlogPosts().reverse();
    expect(getAllBlogPosts()[0].slug).toBe(posts[0].slug);
  });
});

describe("navigation", () => {
  it.each([...navLinks, ...companyLinks, ...footerLinks].map((l) => [l.href]))(
    "%s points at a real page",
    (href) => {
      expect(pageExists(href)).toBe(true);
    }
  );

  it("service anchors are unique", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("uses the production domain for every URL", () => {
    for (const url of urls) expect(url.startsWith(siteConfig.url)).toBe(true);
  });

  it("lists every blog post", () => {
    for (const post of getAllBlogPosts()) {
      expect(urls).toContain(`${siteConfig.url}/blog/${post.slug}`);
    }
  });

  it("only lists pages that exist and never lists admin pages", () => {
    for (const url of urls) {
      const route = url.slice(siteConfig.url.length) || "/";
      expect(route.startsWith("/admin")).toBe(false);
      if (!route.startsWith("/blog/")) expect(pageExists(route)).toBe(true);
    }
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});

describe("robots", () => {
  it("blocks /admin and points at the sitemap", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules[0].disallow).toContain("/admin");
    expect(r.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
  });
});

describe("legal config", () => {
  it("refund window meets Paddle's 14–90 day rule", () => {
    expect(siteConfig.legal.refundWindowDays).toBeGreaterThanOrEqual(14);
    expect(siteConfig.legal.refundWindowDays).toBeLessThanOrEqual(90);
  });
});
