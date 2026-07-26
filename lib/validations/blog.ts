import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3, "Title is required."),
  slug: z
    .string()
    .min(3, "Slug is required.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, hyphen-separated."),
  excerpt: z.string().min(10, "Excerpt is required."),
  content: z.string().min(20, "Content is required."),
  coverImage: z.string().url().optional().or(z.literal("")),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  published: z.boolean(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;
