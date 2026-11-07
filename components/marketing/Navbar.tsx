"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/marketing/Logo";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md transition-shadow duration-200",
        scrolled || open ? "border-black/5 shadow-sm" : "border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label="CareerAgent home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-mist-100 text-ink-950"
                    : "text-ink-800/75 hover:bg-mist-50 hover:text-ink-950"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href="/book-consultation" size="sm" className="px-5 py-2.5">
            Book Free Consultation <ArrowRight size={15} />
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink-900 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-black/5 bg-white sm:h-[calc(100dvh-5rem)] lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {[{ href: "/", label: "Home" }, ...navLinks, { href: "/faqs", label: "FAQs" }].map(
              (link) => {
                const active = link.href === "/" ? pathname === "/" : isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium text-ink-800",
                      active && "bg-mist-100 text-ink-950"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              }
            )}
            <div className="mt-4 border-t border-black/5 px-1 pt-6">
              <Button href="/book-consultation" className="w-full">
                Book Free Consultation <ArrowRight size={16} />
              </Button>
              <p className="mt-3 text-center text-xs text-ink-900/70">
                Free 30-minute call &middot; No obligation
              </p>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
