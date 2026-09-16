import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { siteConfig, navLinks, footerLinks } from "@/lib/site-config";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { LinkedInIcon, TwitterIcon, InstagramIcon } from "@/components/marketing/BrandIcons";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="text-xl font-bold text-white">{siteConfig.name}</span>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Hands-on job search support, resume and LinkedIn optimization, and interview coaching
            — so you land offers faster.
          </p>
          <div className="mt-5 flex gap-4">
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-gold-400">
              <LinkedInIcon size={20} />
            </a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/60 hover:text-gold-400">
              <TwitterIcon size={20} />
            </a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-gold-400">
              <InstagramIcon size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/60 hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Get In Touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold-400" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-gold-400">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold-400" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-gold-400">
                {siteConfig.phone}
              </a>
            </li>
          </ul>
          <div className="mt-5">
            <NewsletterForm variant="footer" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold-400">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
