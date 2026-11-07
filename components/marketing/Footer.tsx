import Link from "next/link";
import { ArrowRight, Globe, Mail, Phone } from "lucide-react";
import { siteConfig, companyLinks, footerLinks } from "@/lib/site-config";
import { services } from "@/lib/placeholder-data";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { Logo } from "@/components/marketing/Logo";
import { LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/marketing/BrandIcons";

const socials = [
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: siteConfig.social.twitter, label: "Twitter", Icon: TwitterIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-950">{children}</h3>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink-950/5 bg-mist-50 text-ink-900/70">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label="CareerAgent home">
            <Logo />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-900/70">
            Hands-on job search support, resume and LinkedIn optimization, and interview coaching
            — so you land offers faster.
          </p>
          <div className="mt-6 max-w-sm">
            <NewsletterForm />
          </div>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Services</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services#${service.slug}`}
                  className="text-ink-900/70 transition-colors hover:text-brand-600"
                >
                  {service.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-medium text-brand-600 hover:text-brand-700"
              >
                All services <ArrowRight size={14} />
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Company</FooterHeading>
          <ul className="mt-5 space-y-3 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-900/70 transition-colors hover:text-brand-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterHeading>Get In Touch</FooterHeading>
          <ul className="mt-5 space-y-3.5 text-sm text-ink-900/70">
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-brand-600" />
              <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-brand-600">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-brand-600" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-brand-600">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Globe size={16} className="shrink-0 text-brand-600" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-950/10 text-ink-900/70 transition-colors hover:border-brand-400 hover:text-brand-600"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <Link
            href="/book-consultation"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Book a free consultation <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="border-t border-ink-950/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-900/70 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-brand-600">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
