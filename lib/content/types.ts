/**
 * Content model for the whole site.
 *
 * Every piece of copy, data and media reference the site renders is described
 * by a type in this file. Pages never hard-code strings — they read from the
 * content repository (`lib/content/repository.ts`), which today is backed by
 * static TypeScript in `content/data/` and tomorrow by a CMS or API.
 */

/** A URL-safe identifier used in routes and as a stable primary key. */
export type Slug = string;

/** ISO-8601 date, e.g. "2026-08-31". */
export type IsoDate = string;

export type Government = "central" | "state";

/* -------------------------------------------------------------------------- */
/* Site identity                                                              */
/* -------------------------------------------------------------------------- */

export interface Office {
  id: Slug;
  /** e.g. "Bikaner (H.O.)" */
  label: string;
  addressLines: string[];
  city: string;
  state: string;
  postalCode: string;
  country: string;
  /** Marks the registered head office for schema.org and the footer. */
  isHeadOffice: boolean;
  mapUrl?: string;
}

export interface SocialProfile {
  id: Slug;
  label: string;
  url: string;
}

export interface SiteIdentity {
  /** Legal / display brand name. Changing this rebrands the entire site. */
  name: string;
  shortName: string;
  legalName: string;
  tagline: string;
  description: string;
  /** Absolute production origin, no trailing slash. */
  url: string;
  logo: { src: string; width: number; height: number; alt: string };
  email: string;
  /** E.164, used for tel: and wa.me links. */
  phoneE164: string;
  /** Human-formatted for display. */
  phoneDisplay: string;
  whatsappMessage: string;
  offices: Office[];
  openingHours: string;
  social: SocialProfile[];
  /** Footer/legal disclaimer shown site-wide. */
  disclaimer: string;
  foundedYear: number;
}

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  label: string;
  href: string;
  /** External links get rel="noopener noreferrer" and target="_blank". */
  external?: boolean;
}

export interface NavGroup {
  id: Slug;
  title: string;
  links: NavLink[];
}

export interface Navigation {
  primary: NavLink[];
  footer: NavGroup[];
  legal: NavLink[];
}

/* -------------------------------------------------------------------------- */
/* Schemes — the core domain object                                           */
/* -------------------------------------------------------------------------- */

export interface SchemeDocument {
  label: string;
  /** Path under /public, or an absolute URL once documents move to storage. */
  href: string;
  sizeBytes?: number;
}

export interface Scheme {
  slug: Slug;
  /** Short form used in cards and filters, e.g. "PMEGP". */
  code: string;
  /** Full official name. */
  name: string;
  government: Government;
  summary: string;
  /** One-line hook used on the homepage scheme cards. */
  keyAdvantage: string;
  benefits: string[];
  eligibility: string[];
  eligibleProjects: string[];
  /** Free-text sector tags powering the Scheme Explorer filter. */
  sectors: string[];
  documents: SchemeDocument[];
  /** Controls ordering in listings; lower sorts first. */
  displayOrder: number;
  featured: boolean;
}

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export interface Service {
  slug: Slug;
  title: string;
  description: string;
  /** Lucide icon name, resolved in the UI layer. */
  icon: string;
  /** Grouping for the services page. */
  category: "advisory" | "compliance";
  /** Optional external partner destination for compliance services. */
  externalUrl?: string;
  displayOrder: number;
}

/* -------------------------------------------------------------------------- */
/* People                                                                     */
/* -------------------------------------------------------------------------- */

export interface TeamMember {
  slug: Slug;
  name: string;
  role: string;
  bio?: string;
  photo?: { src: string; alt: string };
  linkedinUrl?: string;
  displayOrder: number;
}

/* -------------------------------------------------------------------------- */
/* Proof: stats, success stories, showcase records                            */
/* -------------------------------------------------------------------------- */

export interface Stat {
  id: Slug;
  /** Display value including its unit, e.g. "700+" or "50+ Cr". */
  value: string;
  label: string;
  description?: string;
}

export type BenefitKind =
  | "capital-subsidy"
  | "interest-subvention"
  | "stamp-duty-waiver"
  | "sgst-reimbursement"
  | "other";

export interface SuccessStory {
  slug: Slug;
  clientName: string;
  /** Scheme code, referencing `Scheme.code`. */
  schemeCode: string;
  benefitKind: BenefitKind;
  /** Amount in rupees; formatted for display in the UI layer. */
  amountInr: number;
  /** Optional prose, e.g. "Waived Stamp Duty". */
  headline: string;
  sector?: string;
  location?: string;
  /** Only publish with written client consent — see docs/CONTENT-ARCHITECTURE.md. */
  published: boolean;
  displayOrder: number;
}

/* -------------------------------------------------------------------------- */
/* Editorial                                                                  */
/* -------------------------------------------------------------------------- */

export interface BlogPost {
  slug: Slug;
  title: string;
  excerpt: string;
  /** Markdown body. */
  body: string;
  coverImage?: { src: string; alt: string };
  author: string;
  publishedAt: IsoDate;
  updatedAt?: IsoDate;
  tags: string[];
  published: boolean;
}

/* -------------------------------------------------------------------------- */
/* Legal                                                                      */
/* -------------------------------------------------------------------------- */

export interface LegalSection {
  heading: string;
  /** Paragraphs of prose. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface LegalDocument {
  slug: Slug;
  title: string;
  subtitle: string;
  sections: LegalSection[];
  lastUpdated: IsoDate;
}

/* -------------------------------------------------------------------------- */
/* Page-level composition                                                     */
/* -------------------------------------------------------------------------- */

export interface SeoMeta {
  title: string;
  description: string;
  /** Path relative to site root, e.g. "/schemes". */
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface HomePageContent {
  hero: {
    eyebrow: string;
    headingLines: string[];
    body: string;
    primaryCta: NavLink;
    secondaryCta: NavLink;
    badges: Stat[];
  };
  impact: { heading: string; body: string; stats: Stat[] };
  sectors: { heading: string; body: string; items: { id: Slug; label: string; icon: string }[] };
  finance: { heading: string; body: string; capabilities: string[]; cta: NavLink };
  schemesTeaser: { heading: string; body: string; cta: NavLink; featuredSlugs: Slug[] };
}
