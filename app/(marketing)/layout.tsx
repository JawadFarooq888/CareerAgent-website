import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { FloatingActions } from "@/components/marketing/FloatingActions";
import { StickyMobileCTA } from "@/components/marketing/StickyMobileCTA";
import { JsonLd } from "@/components/marketing/JsonLd";
import { siteConfig } from "@/lib/site-config";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    founder: {
      "@type": "Person",
      name: siteConfig.ownerName,
      jobTitle: siteConfig.ownerTitle,
    },
    sameAs: [siteConfig.social.linkedin, siteConfig.social.twitter, siteConfig.social.instagram],
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingActions />
      <StickyMobileCTA />
    </>
  );
}
