import { describe, expect, it } from "vitest";
import { contactSchema, consultationSchema } from "@/lib/validations/contact";
import { newsletterSchema } from "@/lib/validations/newsletter";
import { blogPostSchema } from "@/lib/validations/blog";
import { pricingPackageSchema } from "@/lib/validations/pricing";
import { testimonialSchema } from "@/lib/validations/testimonial";

const validContact = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "I need help with my job search.",
};

describe("contactSchema", () => {
  it("accepts a valid submission", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it.each([
    ["short name", { name: "J" }],
    ["invalid email", { email: "not-an-email" }],
    ["short message", { message: "hi" }],
  ])("rejects %s", (_label, override) => {
    expect(contactSchema.safeParse({ ...validContact, ...override }).success).toBe(false);
  });

  it("rejects oversized fields so the database cannot be flooded", () => {
    expect(contactSchema.safeParse({ ...validContact, name: "a".repeat(201) }).success).toBe(false);
    expect(
      contactSchema.safeParse({ ...validContact, message: "a".repeat(5001) }).success
    ).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, phone: "1".repeat(41) }).success).toBe(false);
    expect(
      contactSchema.safeParse({ ...validContact, subject: "a".repeat(201) }).success
    ).toBe(false);
  });

  it("returns a human-readable message for the first problem", () => {
    const result = contactSchema.safeParse({ ...validContact, email: "x" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues[0].message).toMatch(/valid email/i);
  });
});

describe("consultationSchema", () => {
  it("accepts a valid request", () => {
    expect(consultationSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects an oversized message", () => {
    expect(
      consultationSchema.safeParse({ ...validContact, message: "a".repeat(5001) }).success
    ).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(newsletterSchema.safeParse({ email: "a@b.co" }).success).toBe(true);
  });

  it.each(["", "plainaddress", "a@", "@b.com", "a b@c.com"])("rejects %j", (email) => {
    expect(newsletterSchema.safeParse({ email }).success).toBe(false);
  });
});

describe("blogPostSchema", () => {
  const valid = {
    title: "Hello",
    slug: "hello-world",
    excerpt: "A short excerpt here.",
    content: "Content that is long enough to pass.",
    published: true,
  };

  it("accepts a valid post", () => {
    expect(blogPostSchema.safeParse(valid).success).toBe(true);
  });

  it.each(["Hello-World", "hello world", "hello--world", "-hello", "hello/../x", "héllo"])(
    "rejects unsafe slug %j",
    (slug) => {
      expect(blogPostSchema.safeParse({ ...valid, slug }).success).toBe(false);
    }
  );

  it("allows an empty cover image but rejects a non-URL", () => {
    expect(blogPostSchema.safeParse({ ...valid, coverImage: "" }).success).toBe(true);
    expect(blogPostSchema.safeParse({ ...valid, coverImage: "not a url" }).success).toBe(false);
  });
});

describe("pricingPackageSchema", () => {
  const valid = {
    name: "Starter",
    price: "$249",
    features: "  One \n\nTwo  \n  ",
    highlighted: false,
    ctaText: "Buy",
    order: "2",
    published: true,
  };

  it("splits features by line, trims them and drops blanks", () => {
    const result = pricingPackageSchema.parse(valid);
    expect(result.features).toEqual(["One", "Two"]);
  });

  it("coerces order to an integer", () => {
    expect(pricingPackageSchema.parse(valid).order).toBe(2);
    expect(pricingPackageSchema.safeParse({ ...valid, order: "1.5" }).success).toBe(false);
  });
});

describe("testimonialSchema", () => {
  const valid = { name: "Sam", quote: "Great service overall.", rating: "5", published: true };

  it.each(["1", "5"])("accepts rating %s", (rating) => {
    expect(testimonialSchema.safeParse({ ...valid, rating }).success).toBe(true);
  });

  it.each(["0", "6", "4.5", "abc"])("rejects rating %s", (rating) => {
    expect(testimonialSchema.safeParse({ ...valid, rating }).success).toBe(false);
  });
});
