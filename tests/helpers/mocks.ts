import { vi } from "vitest";

// A Prisma stand-in: every model method is a vi.fn() so tests can assert on
// calls and make them throw, without a database.
function model() {
  return {
    create: vi.fn().mockResolvedValue({ id: "new-id" }),
    update: vi.fn().mockResolvedValue({}),
    upsert: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
    findUnique: vi.fn().mockResolvedValue(null),
    findMany: vi.fn().mockResolvedValue([]),
  };
}

export function createPrismaMock() {
  return {
    contactInquiry: model(),
    newsletterSubscriber: model(),
    blogPost: model(),
    pricingPackage: model(),
    testimonial: model(),
    contentBlock: model(),
    adminUser: model(),
  };
}

export function form(fields: Record<string, string>) {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) fd.set(key, value);
  return fd;
}

// A timestamp far enough in the past to pass the "filled too fast" bot check.
export const humanStartedAt = () => String(Date.now() - 10_000);
