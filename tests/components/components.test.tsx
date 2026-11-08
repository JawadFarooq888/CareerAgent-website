// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({ usePathname: () => "/pricing" }));

const { FaqAccordion } = await import("@/components/marketing/FaqAccordion");
const { Navbar } = await import("@/components/marketing/Navbar");
const { JsonLd } = await import("@/components/marketing/JsonLd");
const { PricingCard } = await import("@/components/marketing/PricingCard");
const { BlogPostCard } = await import("@/components/marketing/BlogPostCard");
const { Button } = await import("@/components/ui/Button");

const faqs = [
  { question: "Q one?", answer: "Answer one." },
  { question: "Q two?", answer: "Answer two." },
];

describe("FaqAccordion", () => {
  it("opens the first item by default and keeps all answers in the DOM", () => {
    render(<FaqAccordion items={faqs} />);
    const [first, second] = screen.getAllByRole("button");
    expect(first).toHaveProperty("ariaExpanded", "true");
    expect(second).toHaveProperty("ariaExpanded", "false");
    expect(screen.getByText("Answer two.")).toBeTruthy(); // crawlable even when closed
  });

  it("opens one item at a time and can close the open one", () => {
    render(<FaqAccordion items={faqs} />);
    const [first, second] = screen.getAllByRole("button");

    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("true");
    expect(first.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(second);
    expect(second.getAttribute("aria-expanded")).toBe("false");
  });

  it("makes closed answers inert so keyboard users skip them", () => {
    render(<FaqAccordion items={faqs} />);
    const [, second] = screen.getAllByRole("button");
    const panel = document.getElementById(second.getAttribute("aria-controls")!)!;
    expect(panel.hasAttribute("inert")).toBe(true);
  });
});

describe("Navbar", () => {
  it("marks the current page", () => {
    render(<Navbar />);
    const current = screen
      .getAllByRole("link", { name: "Pricing" })
      .find((a) => a.getAttribute("aria-current") === "page");
    expect(current).toBeTruthy();
  });

  it("opens the mobile menu, locks scrolling, and closes on Escape", () => {
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Open menu" });

    fireEvent.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    expect(document.getElementById("mobile-menu")).toBeTruthy();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.getElementById("mobile-menu")).toBeNull();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile menu after a link is chosen", () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = document.getElementById("mobile-menu")!;
    fireEvent.click(menu.querySelector('a[href="/services"]')!);
    expect(document.getElementById("mobile-menu")).toBeNull();
  });
});

describe("JsonLd", () => {
  it("cannot be broken out of with </script>", () => {
    const html = renderToStaticMarkup(
      <JsonLd data={{ headline: "</script><script>alert(1)</script>" }} />
    );
    expect(html.match(/<\/script>/gi)).toHaveLength(1); // only the real closing tag
    expect(html).not.toContain("<script>alert");
  });

  it("still produces valid JSON", () => {
    const html = renderToStaticMarkup(<JsonLd data={{ a: "<b>&</b>", n: 1 }} />);
    const json = html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "");
    expect(JSON.parse(json)).toEqual({ a: "<b>&</b>", n: 1 });
  });
});

describe("PricingCard", () => {
  it("falls back to the consultation link when Paddle is not configured", () => {
    render(
      <PricingCard
        name="Starter"
        price="$249"
        features={["Resume rewrite"]}
        ctaText="Get Started"
        paddlePriceId="pri_123"
      />
    );
    const cta = screen.getByRole("link", { name: "Get Started" });
    expect(cta.getAttribute("href")).toBe("/book-consultation");
    expect(screen.queryByRole("button", { name: "Buy Now" })).toBeNull();
  });

  it("shows the Most Popular badge only when highlighted", () => {
    const props = { name: "A", price: "$1", features: [], ctaText: "Go" };
    const { rerender } = render(<PricingCard {...props} />);
    expect(screen.queryByText("Most Popular")).toBeNull();
    rerender(<PricingCard {...props} highlighted />);
    expect(screen.getByText("Most Popular")).toBeTruthy();
  });
});

describe("BlogPostCard", () => {
  it("links to the post and shows a reading time", () => {
    render(
      <BlogPostCard
        post={{
          slug: "my-post",
          title: "My Post",
          excerpt: "Excerpt",
          category: "Unknown Category",
          publishedAt: "2026-01-15",
          content: ["word ".repeat(660)],
        }}
      />
    );
    expect(screen.getByRole("link", { name: "My Post" }).getAttribute("href")).toBe(
      "/blog/my-post"
    );
    expect(screen.getByText(/3 min read/)).toBeTruthy();
  });
});

describe("Button", () => {
  it("renders an external link safely", () => {
    render(
      <Button href="https://example.com" external>
        Go
      </Button>
    );
    const a = screen.getByRole("link", { name: "Go" });
    expect(a.getAttribute("target")).toBe("_blank");
    expect(a.getAttribute("rel")).toContain("noopener");
  });

  it("renders a real button when there is no href", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Click" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
