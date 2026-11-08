import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPrismaMock, form, humanStartedAt } from "../helpers/mocks";

const prisma = vi.hoisted(() => ({ current: null as unknown as ReturnType<typeof createPrismaMock> }));
const sendLeadNotification = vi.hoisted(() => vi.fn());

vi.mock("@/lib/prisma", () => ({
  get prisma() {
    return prisma.current;
  },
}));
vi.mock("@/lib/email", () => ({ sendLeadNotification }));

const { submitContactForm, submitConsultationRequest } = await import("@/lib/actions/contact");
const { subscribeToNewsletter } = await import("@/lib/actions/newsletter");

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Looking for help with my job search.",
};

beforeEach(() => {
  prisma.current = createPrismaMock();
  sendLeadNotification.mockReset().mockResolvedValue(undefined);
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe.each([
  ["contact form", submitContactForm, "GENERAL"],
  ["consultation form", submitConsultationRequest, "CONSULTATION"],
] as const)("%s", (_label, action, type) => {
  it("saves a valid submission and notifies the owner", async () => {
    const result = await action(null, form({ ...valid, startedAt: humanStartedAt() }));

    expect(result.ok).toBe(true);
    expect(prisma.current.contactInquiry.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ type, name: "Jane Doe", email: "jane@example.com" }),
    });
    expect(sendLeadNotification).toHaveBeenCalledOnce();
  });

  it("rejects invalid input without touching the database", async () => {
    const result = await action(null, form({ ...valid, email: "nope", startedAt: humanStartedAt() }));

    expect(result).toEqual({ ok: false, message: expect.stringMatching(/valid email/i) });
    expect(prisma.current.contactInquiry.create).not.toHaveBeenCalled();
  });

  it("silently drops bots that fill the honeypot", async () => {
    const result = await action(
      null,
      form({ ...valid, company: "Spam Inc", startedAt: humanStartedAt() })
    );

    expect(result.ok).toBe(true); // bots are not told they were caught
    expect(prisma.current.contactInquiry.create).not.toHaveBeenCalled();
    expect(sendLeadNotification).not.toHaveBeenCalled();
  });

  it("silently drops submissions filled faster than a human could", async () => {
    const result = await action(null, form({ ...valid, startedAt: String(Date.now()) }));

    expect(result.ok).toBe(true);
    expect(prisma.current.contactInquiry.create).not.toHaveBeenCalled();
  });

  it.each([
    ["missing", undefined],
    ["zero (forged)", "0"],
    ["not a number", "abc"],
    ["in the future", String(Date.now() + 60_000)],
    ["older than a day (replayed)", String(Date.now() - 25 * 60 * 60 * 1000)],
  ])("drops submissions whose start time is %s", async (_case, startedAt) => {
    const fields: Record<string, string> = { ...valid };
    if (startedAt !== undefined) fields.startedAt = startedAt;

    await action(null, form(fields));

    expect(prisma.current.contactInquiry.create).not.toHaveBeenCalled();
  });

  it("HTML-escapes user input in the notification email", async () => {
    await action(
      null,
      form({
        name: `<img src=x onerror=alert(1)>`,
        email: "jane@example.com",
        message: `<a href="https://evil.example">Click to verify your account</a>`,
        startedAt: humanStartedAt(),
      })
    );

    const { html } = sendLeadNotification.mock.calls[0][0];
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<a href");
    expect(html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });

  it("shows a friendly error and does not leak details when the database fails", async () => {
    prisma.current.contactInquiry.create.mockRejectedValue(
      new Error("connect ECONNREFUSED 10.0.0.5:5432 password=hunter2")
    );

    const result = await action(null, form({ ...valid, startedAt: humanStartedAt() }));

    expect(result.ok).toBe(false);
    expect(result.message).toMatch(/something went wrong/i);
    expect(result.message).not.toMatch(/ECONNREFUSED|password|5432/);
  });

  it("rejects a 1 MB message instead of storing it", async () => {
    const result = await action(
      null,
      form({ ...valid, message: "a".repeat(1_000_000), startedAt: humanStartedAt() })
    );

    expect(result.ok).toBe(false);
    expect(prisma.current.contactInquiry.create).not.toHaveBeenCalled();
  });
});

describe("newsletter", () => {
  it("subscribes a valid email idempotently", async () => {
    const result = await subscribeToNewsletter(null, form({ email: "a@b.co" }));

    expect(result.ok).toBe(true);
    expect(prisma.current.newsletterSubscriber.upsert).toHaveBeenCalledWith({
      where: { email: "a@b.co" },
      update: {},
      create: { email: "a@b.co" },
    });
  });

  it("rejects an invalid email", async () => {
    const result = await subscribeToNewsletter(null, form({ email: "bad" }));
    expect(result.ok).toBe(false);
    expect(prisma.current.newsletterSubscriber.upsert).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const result = await subscribeToNewsletter(null, form({ email: "a@b.co", company: "x" }));
    expect(result.ok).toBe(true);
    expect(prisma.current.newsletterSubscriber.upsert).not.toHaveBeenCalled();
  });

  it("handles a database failure gracefully", async () => {
    prisma.current.newsletterSubscriber.upsert.mockRejectedValue(new Error("db down"));
    const result = await subscribeToNewsletter(null, form({ email: "a@b.co" }));
    expect(result).toEqual({ ok: false, message: expect.stringMatching(/something went wrong/i) });
  });

  it("rejects a missing email field", async () => {
    const result = await subscribeToNewsletter(null, new FormData());
    expect(result.ok).toBe(false);
  });
});
