import type { Navigation, SiteIdentity } from "@/lib/content/types";

/**
 * Single source of truth for brand identity.
 *
 * Everything user-visible about "who we are" — name, contact, offices,
 * disclaimer — lives here and nowhere else. Rebranding is a change to this
 * file plus the logo asset.
 *
 * PLACEHOLDER values are marked `TODO(brand)`. They must be replaced with
 * Dakshyam Consulting's real details before launch; they are NOT carried over
 * from the reference site, because contact details, credentials and client
 * outcomes belong to that business.
 */
export const site: SiteIdentity = {
  name: "Dakshyam Consulting",
  shortName: "Dakshyam",
  legalName: "Dakshyam Consulting", // TODO(brand): registered legal entity name
  tagline: "Connect. Apply. Prosper.",
  description:
    "Dakshyam Consulting helps MSMEs and startups in Rajasthan navigate government subsidies, grants and project finance — from eligibility to disbursement.",
  url: "https://dakshyamconsulting.com", // TODO(brand): production domain
  logo: {
    src: "/brand/logo.svg", // TODO(brand): supply the real logo asset
    width: 180,
    height: 48,
    alt: "Dakshyam Consulting",
  },
  email: "hello@dakshyamconsulting.com", // TODO(brand)
  phoneE164: "+910000000000", // TODO(brand)
  phoneDisplay: "+91 00000 00000", // TODO(brand)
  whatsappMessage: "Hello, I need support with a subsidy application.",
  offices: [
    {
      id: "head-office",
      label: "Head Office",
      addressLines: ["TODO(brand): street address"], // TODO(brand)
      city: "Bikaner",
      state: "Rajasthan",
      postalCode: "334001",
      country: "India",
      isHeadOffice: true,
    },
  ],
  openingHours: "Mon – Sat: 10:00 AM – 07:00 PM",
  social: [
    // TODO(brand): replace with real profiles, or delete the entries.
    { id: "instagram", label: "Instagram", url: "https://instagram.com/" },
    { id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/" },
    { id: "youtube", label: "YouTube", url: "https://youtube.com/" },
  ],
  disclaimer:
    "Dakshyam Consulting is a private consultancy service provider specialising in MSME and startup consultation. We are not associated with, affiliated to, endorsed by, or in collaboration with any Government or Non-Government agency, institution, organisation or department. For service payments, please ensure all transactions are made directly to our official company account.",
  foundedYear: 2011, // TODO(brand): actual year of incorporation
};

export const navigation: Navigation = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Schemes", href: "/schemes" },
    { label: "Services", href: "/services" },
    { label: "Work Showcase", href: "/work-showcase" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact" },
  ],
  footer: [
    {
      id: "quick-links",
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Schemes", href: "/schemes" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Refund Policy", href: "/refund" },
        { label: "Legal Disclaimer", href: "/legal" },
      ],
    },
  ],
  legal: [
    { label: "Legal Disclaimer", href: "/legal" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};
