export const siteConfig = {
  name: "CareerAgent",
  tagline: "Your Personal Career Agent",
  description:
    "CareerAgent is a personal career agent and career-consulting service that helps professionals land interviews and job offers faster through hands-on job search support, resume and LinkedIn optimization, and interview coaching.",
  url: "https://careeragent.example.com",
  ownerName: "Alex Morgan",
  ownerTitle: "Founder & Career Agent",
  email: "abbt989@gmail.com",
  phone: "+92 345 8137005",
  whatsappNumber: "923458137005",
  address: "Remote — serving clients worldwide",
  social: {
    linkedin: "https://linkedin.com/company/careeragent",
    twitter: "https://twitter.com/careeragent",
    instagram: "https://instagram.com/careeragent",
  },
  chatWidgetSrc: process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC ?? "",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Me" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Success Stories" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
] as const;
