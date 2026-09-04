import type { Service } from "@/lib/content/types";

/**
 * Service catalogue.
 *
 * `advisory` services are delivered in-house. `compliance` services may be
 * fulfilled through partner firms — set `externalUrl` when the CTA should hand
 * the visitor off rather than open the internal enquiry form.
 */
export const services: Service[] = [
  {
    slug: "subsidy-consulting",
    title: "Subsidy Consulting",
    description:
      "Expert guidance on identifying and applying for central and state government subsidies available to Rajasthan enterprises.",
    icon: "banknote",
    category: "advisory",
    displayOrder: 10,
  },
  {
    slug: "project-finance",
    title: "Project Finance",
    description:
      "Debt syndication and loan advisory across banks and NBFCs — term loans, working capital, CGTMSE-backed facilities and acquisition finance.",
    icon: "landmark",
    category: "advisory",
    displayOrder: 20,
  },
  {
    slug: "msme-documentation",
    title: "MSME Documentation",
    description:
      "Complete assistance with Udyam registration, compliance certificates, detailed project reports and audit readiness.",
    icon: "file-text",
    category: "advisory",
    displayOrder: 30,
  },
  {
    slug: "startup-advisory",
    title: "Startup Advisory",
    description:
      "From idea to exit — strategic advice, financial modelling and ecosystem navigation for early-stage founders.",
    icon: "rocket",
    category: "advisory",
    displayOrder: 40,
  },
  {
    slug: "export-assistance",
    title: "Export Assistance",
    description:
      "Take your business global with market entry guidance, IEC registration and international certification support.",
    icon: "globe",
    category: "advisory",
    displayOrder: 50,
  },
  {
    slug: "legal-and-ip",
    title: "Legal & Intellectual Property",
    description:
      "Protect your innovations through trademark and patent filings, agreements and ongoing legal compliance.",
    icon: "scale",
    category: "advisory",
    displayOrder: 60,
  },
  {
    slug: "company-registration",
    title: "Company Registration",
    description:
      "Incorporate a Private Limited, LLP or OPC quickly and correctly, with all post-incorporation filings handled.",
    icon: "building-2",
    category: "compliance",
    displayOrder: 70,
  },
  {
    slug: "gst-services",
    title: "GST Services",
    description:
      "Registration through monthly filings — we handle the GST cycle so you never miss a deadline or an input credit.",
    icon: "receipt",
    category: "compliance",
    displayOrder: 80,
  },
  {
    slug: "income-tax",
    title: "Income Tax",
    description:
      "Return filing and tax planning for businesses and promoters, structured to keep liabilities predictable.",
    icon: "calculator",
    category: "compliance",
    displayOrder: 90,
  },
  {
    slug: "startup-india",
    title: "Startup India Recognition",
    description:
      "DPIIT recognition, tax exemption applications and access to the benefits that come with being a recognised startup.",
    icon: "badge-check",
    category: "compliance",
    displayOrder: 100,
  },
  {
    slug: "trademark",
    title: "Trademark Registration",
    description:
      "Secure your name, logo and brand identity with searches, filings and objection handling.",
    icon: "shield-check",
    category: "compliance",
    displayOrder: 110,
  },
  {
    slug: "ongoing-compliance",
    title: "Ongoing Compliance",
    description:
      "Annual filings, statutory registers and notice handling — continuous cover so nothing lapses while you focus on growth.",
    icon: "clipboard-check",
    category: "compliance",
    displayOrder: 120,
  },
];
