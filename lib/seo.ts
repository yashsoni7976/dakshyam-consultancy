import type { Metadata } from "next";
import { getSiteIdentity } from "@/lib/content";
import type { SeoMeta } from "@/lib/content/types";

/**
 * Builds a page's `Metadata` from the centralised site identity.
 *
 * Pages describe only what is unique to them (title, description, path); the
 * brand name, canonical origin and social card defaults come from
 * `content/data/site.ts`, so a rebrand never means touching page files.
 */
export async function buildMetadata(meta: SeoMeta): Promise<Metadata> {
  const site = await getSiteIdentity();
  const canonical = new URL(meta.path, site.url).toString();
  const ogImage = meta.ogImage ?? site.logo.src;

  return {
    metadataBase: new URL(site.url),
    title: meta.title,
    description: meta.description,
    alternates: { canonical },
    robots: meta.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [{ url: ogImage }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

/**
 * schema.org `ProfessionalService` node for the organisation.
 * Emit once, in the root layout.
 */
export async function buildOrganizationJsonLd() {
  const site = await getSiteIdentity();
  const head = site.offices.find((office) => office.isHeadOffice) ?? site.offices[0];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    logo: new URL(site.logo.src, site.url).toString(),
    email: site.email,
    telephone: site.phoneE164,
    foundingDate: String(site.foundedYear),
    taxID: site.registration.gstin,
    identifier: site.registration.cin,
    areaServed: { "@type": "State", name: "Rajasthan" },
    sameAs: site.social.map((profile) => profile.url),
    openingHours: site.openingHours,
    address: head && {
      "@type": "PostalAddress",
      streetAddress: head.addressLines.join(", "),
      addressLocality: head.city,
      addressRegion: head.state,
      postalCode: head.postalCode,
      addressCountry: head.country,
    },
  };
}
