import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex flex-1 items-center bg-mist-50">
        <div className="container-page flex flex-col items-center py-24 text-center sm:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-5xl">
            This page took a different career path
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-900/70">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you
            back on track.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/">Back to Home</Button>
            <Button href="/book-consultation" variant="outline">
              Book Free Consultation <ArrowRight size={16} />
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {suggestions.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-medium text-ink-800/70 hover:text-brand-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
