import { describe, expect, it } from "vitest";
import { cn, escapeHtml } from "@/lib/utils";

describe("cn", () => {
  it("joins classes and drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("lets later Tailwind classes override earlier conflicting ones", () => {
    expect(cn("px-4 py-2", "px-8")).toBe("py-2 px-8");
  });
});

describe("escapeHtml", () => {
  it("escapes every HTML-significant character", () => {
    expect(escapeHtml(`<a href="x" onclick='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;"
    );
  });

  it("neutralises a script injection payload", () => {
    const out = escapeHtml("<script>alert(1)</script>");
    expect(out).not.toContain("<");
    expect(out).not.toContain(">");
  });

  it("escapes & first so entities are not double-decoded", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });

  it("leaves plain text unchanged", () => {
    expect(escapeHtml("Jane Doe, PM @ Acme")).toBe("Jane Doe, PM @ Acme");
  });
});
