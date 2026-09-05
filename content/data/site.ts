import type { Navigation, SiteIdentity } from "@/lib/content/types";

/**
 * Single source of truth for brand identity.
 *
 * Everything user-visible about "who we are" — name, contact, offices,
 * disclaimer — lives here and nowhere else. Rebranding is a change to this
 * file plus the logo asset.
 */
export const site: SiteIdentity = {
  name: "Dakshyam Consultancy",
  shortName: "Dakshyam",
  legalName: "Dakshyam Consultancy Private Limited",
  tagline: "From Idea to Industry",
  description:
    "Dakshyam Consultancy helps MSMEs and startups in Rajasthan navigate government subsidies, grants and project finance — from eligibility to disbursement.",
  url: "https://www.dakshyam.com",
  logo: {
    src: "/brand/logo.png",
    width: 758,
    height: 163,
    alt: "Dakshyam Consultancy",
  },
  email: "raghavsoni@dakshyam.com",
  phoneE164: "+917877223715",
  phoneDisplay: "+91 78772 23715",
  whatsappMessage: "Hello, I need support with a subsidy application.",
  offices: [
    {
      id: "head-office",
      label: "Head Office — Bikaner",
      addressLines: ["Middha Bhawan, Old Ginani", "Opposite Gol Park, Bikaner City"],
      city: "Bikaner",
      state: "Rajasthan",
      postalCode: "334001",
      country: "India",
      isHeadOffice: true,
      phoneE164: "+918824544246",
      phoneDisplay: "+91 88245 44246",
    },
    {
      id: "branch-sri-dungargarh",
      label: "Branch Office — Sri Dungargarh",
      addressLines: ["Opposite Old Tank, Station Main Road", "Bigga Bass"],
      city: "Sri Dungargarh",
      state: "Rajasthan",
      postalCode: "331803",
      country: "India",
      isHeadOffice: false,
      phoneE164: "+917891223715",
      phoneDisplay: "+91 78912 23715",
    },
  ],
  openingHours: "Mon – Sat: 10:00 AM – 07:00 PM",
  social: [],
  disclaimer:
    "Dakshyam Consultancy is a private consultancy service provider specialising in MSME and startup consultation. We are not associated with, affiliated to, endorsed by, or in collaboration with any Government or Non-Government agency, institution, organisation or department. For service payments, please ensure all transactions are made directly to our official company account.",
  foundedYear: 2024,
  registration: {
    cin: "U69200RJ2024PTC096595",
    gstin: "08AALCD0551D1ZY",
    pan: "AALCD0551D",
  },
};

export const navigation: Navigation = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Schemes", href: "/schemes" },
    { label: "Services", href: "/services" },
    // { label: "Work Showcase", href: "/work-showcase" },
    // { label: "Blog", href: "/blog" },
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
        // { label: "Blog", href: "/blog" },
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
