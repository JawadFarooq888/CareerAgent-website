import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/marketing/PageHero";
import { ContactForm } from "@/components/marketing/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch to ask a question or discuss how CareerAgent can help with your job search.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your job search"
        description="Have a question before booking a consultation? Send a message and I'll respond within one business day."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-navy-950">Contact Information</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Mail size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-navy-950">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-navy-900/70 hover:text-gold-600">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-navy-950">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-sm text-navy-900/70 hover:text-gold-600">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold-500" />
                <div>
                  <p className="text-sm font-medium text-navy-950">Location</p>
                  <p className="text-sm text-navy-900/70">{siteConfig.address}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
