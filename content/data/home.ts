import type { HomePageContent, Stat } from "@/lib/content/types";

/**
 * Homepage composition.
 *
 * Section order and copy live here so the page component stays a pure layout.
 *
 * NOTE: every figure in `impactStats` and `hero.badges` is a factual claim
 * about Dakshyam Consulting's track record. They are marked TODO(brand) and
 * must be replaced with numbers the business can evidence — they are not
 * carried over from the reference site.
 */
export const impactStats: Stat[] = [
  {
    id: "units-served",
    value: "TODO(brand)",
    label: "Business units served",
    description: "Comprehensive consultancy for MSMEs across Rajasthan.",
  },
  {
    id: "subsidy-secured",
    value: "TODO(brand)",
    label: "Subsidy secured",
    description: "Helping businesses avail subsidy from government schemes.",
  },
  {
    id: "loans-disbursed",
    value: "TODO(brand)",
    label: "Loans disbursed",
    description: "Finance availed from banks and NBFCs.",
  },
  {
    id: "years-experience",
    value: "TODO(brand)",
    label: "Years of experience",
    description: "Dedicated service to Rajasthan enterprises.",
  },
  {
    id: "projects-completed",
    value: "TODO(brand)",
    label: "Projects completed",
    description: "Delivered across sectors including agro and food processing.",
  },
];

export const home: HomePageContent = {
  hero: {
    eyebrow: "Empowering industries. Building tomorrow.",
    headingLines: ["From Idea", "To Industry"],
    body: "We transform business ideas into successful industries through finance, subsidies, registrations and strategic guidance — from eligibility to disbursement across Rajasthan.",
    primaryCta: { label: "Explore Schemes", href: "/schemes" },
    secondaryCta: { label: "Talk to an Expert", href: "/contact" },
    badges: [
      { id: "clients", value: "TODO(brand)", label: "Clients served" },
      { id: "turnaround", value: "TODO(brand)", label: "Turnaround time" },
      { id: "success-rate", value: "TODO(brand)", label: "Success rate" },
    ],
  },
  impact: {
    heading: "Real impact in numbers",
    body: "Our work has helped businesses across the state access the support they are entitled to.",
    stats: impactStats,
  },
  sectors: {
    heading: "Most popular projects",
    body: "Sector-specific consultancy for high-impact Rajasthan industries.",
    items: [
      { id: "agro-processing", label: "Agro Processing", icon: "wheat" },
      { id: "food-processing", label: "Food Processing", icon: "utensils" },
      { id: "solar", label: "Solar", icon: "sun" },
      { id: "hospitality", label: "Resort / Hotel", icon: "hotel" },
    ],
  },
  finance: {
    heading: "Expert project finance for Rajasthan units",
    body: "We hand-hold clients from concept to commissioning with structured funding through banking channels, while ensuring every government incentive is claimed.",
    capabilities: [
      "Project finance for manufacturing units",
      "Working capital loans",
      "Reducing finance cost through bank transfer",
      "Acquisition finance",
      "Promoter funding",
      "Construction finance",
      "Loan against property (LAP)",
      "Valuation and legal services",
    ],
    cta: { label: "Get Financial Advisory", href: "/contact" },
  },
  schemesTeaser: {
    heading: "Top government schemes & grants",
    body: "Funding opportunities open to Rajasthan-based MSMEs right now.",
    cta: { label: "View All Schemes", href: "/schemes" },
    featuredSlugs: ["pmegp", "pmfme", "rips-2024", "brupy"],
  },
};
