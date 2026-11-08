import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPrismaMock, form } from "../helpers/mocks";

// Mock next-auth itself (not @/lib/auth) so the real requireAdmin() and the
// real proxy logic are what get tested.
const session = vi.hoisted(() => ({ current: null as null | { user: { id: string } } }));
const prisma = vi.hoisted(() => ({ current: null as unknown as ReturnType<typeof createPrismaMock> }));

vi.mock("next-auth", () => {
  const auth = (arg?: unknown) => {
    if (typeof arg === "function") {
      return (req: object) => arg({ ...req, auth: session.current });
    }
    return Promise.resolve(session.current);
  };
  return {
    default: () => ({ handlers: {}, auth, signIn: vi.fn(), signOut: vi.fn() }),
    AuthError: class AuthError extends Error {},
  };
});
vi.mock("next-auth/providers/credentials", () => ({ default: (c: unknown) => c }));
vi.mock("@/lib/prisma", () => ({
  get prisma() {
    return prisma.current;
  },
}));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({
  redirect: (url: string) => {
    throw Object.assign(new Error("NEXT_REDIRECT"), { url });
  },
}));

const blog = await import("@/lib/actions/blog");
const pricing = await import("@/lib/actions/pricing");
const testimonials = await import("@/lib/actions/testimonials");
const content = await import("@/lib/actions/content");
const inquiries = await import("@/lib/actions/inquiries");
const { default: proxy } = await import("@/proxy");

const anyForm = () =>
  form({
    title: "Hello",
    slug: "hello",
    excerpt: "An excerpt long enough.",
    content: "Content that is long enough to pass validation.",
    name: "Starter",
    price: "$1",
    features: "a",
    ctaText: "Buy",
    quote: "A quote long enough.",
    rating: "5",
    key: "home.hero",
    value: "Hi",
  });

// Every admin Server Action, called the way an attacker would via direct POST.
const adminActions: [string, () => Promise<unknown>][] = [
  ["createBlogPost", () => blog.createBlogPost(null, anyForm())],
  ["updateBlogPost", () => blog.updateBlogPost("id", null, anyForm())],
  ["deleteBlogPost", () => blog.deleteBlogPost("id")],
  ["createPricingPackage", () => pricing.createPricingPackage(null, anyForm())],
  ["updatePricingPackage", () => pricing.updatePricingPackage("id", null, anyForm())],
  ["deletePricingPackage", () => pricing.deletePricingPackage("id")],
  ["createTestimonial", () => testimonials.createTestimonial(null, anyForm())],
  ["updateTestimonial", () => testimonials.updateTestimonial("id", null, anyForm())],
  ["deleteTestimonial", () => testimonials.deleteTestimonial("id")],
  ["upsertContentBlock", () => content.upsertContentBlock(anyForm())],
  ["deleteContentBlock", () => content.deleteContentBlock("id")],
  ["updateInquiryStatus", () => inquiries.updateInquiryStatus("id", "CLOSED")],
];

const allPrismaCalls = () =>
  Object.values(prisma.current).flatMap((m) => Object.values(m).flatMap((fn) => fn.mock.calls));

beforeEach(() => {
  prisma.current = createPrismaMock();
  session.current = null;
});

describe("admin Server Actions without a session", () => {
  it("covers every exported admin action", () => {
    const exported = [blog, pricing, testimonials, content, inquiries].flatMap((mod) =>
      Object.entries(mod).filter(([, v]) => typeof v === "function").map(([k]) => k)
    );
    expect(exported.sort()).toEqual(adminActions.map(([name]) => name).sort());
  });

  it.each(adminActions)("%s is rejected and never touches the database", async (_name, call) => {
    await expect(call()).rejects.toThrow("Unauthorized");
    expect(allPrismaCalls()).toHaveLength(0);
  });
});

describe("admin Server Actions with a session", () => {
  beforeEach(() => {
    session.current = { user: { id: "admin-1" } };
  });

  it("createBlogPost saves and redirects", async () => {
    await expect(blog.createBlogPost(null, anyForm())).rejects.toMatchObject({
      url: "/admin/blog",
    });
    expect(prisma.current.blogPost.create).toHaveBeenCalledOnce();
  });

  it("createBlogPost reports validation errors instead of saving", async () => {
    const result = await blog.createBlogPost(null, form({ title: "x" }));
    expect(result).toEqual({ ok: false, message: expect.any(String) });
    expect(prisma.current.blogPost.create).not.toHaveBeenCalled();
  });

  it("deleteTestimonial deletes the given id", async () => {
    await testimonials.deleteTestimonial("t-1");
    expect(prisma.current.testimonial.delete).toHaveBeenCalledWith({ where: { id: "t-1" } });
  });

  it("upsertContentBlock ignores a blank key", async () => {
    await content.upsertContentBlock(form({ key: "   ", value: "x" }));
    expect(prisma.current.contentBlock.upsert).not.toHaveBeenCalled();
  });

  it("updateInquiryStatus rejects a status that is not in the enum", async () => {
    await expect(
      inquiries.updateInquiryStatus("id", "HACKED" as never)
    ).rejects.toThrow(/invalid status/i);
    expect(prisma.current.contactInquiry.update).not.toHaveBeenCalled();
  });
});

describe("proxy (admin route guard)", () => {
  const request = (pathname: string) => ({
    nextUrl: new URL(`https://site.test${pathname}`),
    url: `https://site.test${pathname}`,
  });
  const run = (pathname: string) =>
    (proxy as unknown as (req: object) => Response | undefined)(request(pathname));

  it.each(["/admin", "/admin/dashboard", "/admin/inquiries/abc", "/admin/login/../dashboard"])(
    "redirects anonymous visitors from %s to the login page",
    (pathname) => {
      const res = run(pathname);
      expect(res?.headers.get("location")).toBe("https://site.test/admin/login");
    }
  );

  it("lets anonymous visitors see the login page", () => {
    expect(run("/admin/login")).toBeUndefined();
  });

  it("sends logged-in admins from the login page to the dashboard", () => {
    session.current = { user: { id: "admin-1" } };
    expect(run("/admin/login")?.headers.get("location")).toBe(
      "https://site.test/admin/dashboard"
    );
  });

  it("lets logged-in admins through", () => {
    session.current = { user: { id: "admin-1" } };
    expect(run("/admin/dashboard")).toBeUndefined();
  });

  it("only runs on /admin routes", async () => {
    const { config } = await import("@/proxy");
    expect(config.matcher).toEqual(["/admin/:path*"]);
  });
});
