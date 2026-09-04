import { describe, expect, it } from "vitest";
import { getSiteIdentity } from "@/lib/content";
import { buildMetadata, buildOrganizationJsonLd } from "./seo";

describe("buildMetadata", () => {
  it("resolves the canonical URL against the site origin", async () => {
    const site = await getSiteIdentity();
    const meta = await buildMetadata({
      title: "Services",
      description: "What we do.",
      path: "/services",
    });
    expect(meta.alternates?.canonical).toBe(new URL("/services", site.url).toString());
    expect(String(meta.metadataBase)).toBe(new URL(site.url).toString());
  });

  it("mirrors title and description into the OG and Twitter cards", async () => {
    const meta = await buildMetadata({
      title: "Blog",
      description: "Scheme guides.",
      path: "/blog",
    });
    expect(meta.openGraph).toMatchObject({
      title: "Blog",
      description: "Scheme guides.",
      locale: "en_IN",
      type: "website",
    });
    expect(meta.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Blog",
      description: "Scheme guides.",
    });
  });

  it("falls back to the site logo when a page supplies no OG image", async () => {
    const site = await getSiteIdentity();
    const meta = await buildMetadata({ title: "T", description: "D", path: "/" });
    expect(meta.openGraph?.images).toEqual([{ url: site.logo.src }]);
  });

  it("uses a page's own OG image when it has one", async () => {
    const meta = await buildMetadata({
      title: "Post",
      description: "D",
      path: "/blog/x",
      ogImage: "/covers/x.png",
    });
    expect(meta.openGraph?.images).toEqual([{ url: "/covers/x.png" }]);
    expect(meta.twitter?.images).toEqual(["/covers/x.png"]);
  });

  it("omits robots directives unless a page opts out of indexing", async () => {
    const indexed = await buildMetadata({ title: "T", description: "D", path: "/" });
    expect(indexed.robots).toBeUndefined();

    const hidden = await buildMetadata({
      title: "T",
      description: "D",
      path: "/x",
      noindex: true,
    });
    expect(hidden.robots).toEqual({ index: false, follow: false });
  });
});

describe("buildOrganizationJsonLd", () => {
  it("emits a ProfessionalService node built from site identity", async () => {
    const site = await getSiteIdentity();
    const node = await buildOrganizationJsonLd();

    expect(node["@context"]).toBe("https://schema.org");
    expect(node["@type"]).toBe("ProfessionalService");
    expect(node.name).toBe(site.name);
    expect(node.email).toBe(site.email);
    expect(node.telephone).toBe(site.phoneE164);
    expect(node.foundingDate).toBe(String(site.foundedYear));
    expect(node.sameAs).toEqual(site.social.map((profile) => profile.url));
  });

  it("resolves the logo to an absolute URL, as schema.org requires", async () => {
    const site = await getSiteIdentity();
    const node = await buildOrganizationJsonLd();
    expect(node.logo).toBe(new URL(site.logo.src, site.url).toString());
    expect(node.logo.startsWith("http")).toBe(true);
  });

  it("uses the head office for the postal address", async () => {
    const site = await getSiteIdentity();
    const head = site.offices.find((office) => office.isHeadOffice) ?? site.offices[0];
    const node = await buildOrganizationJsonLd();
    expect(node.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: head.city,
      addressRegion: head.state,
      postalCode: head.postalCode,
    });
  });

  it("serialises to valid JSON, since it is injected as a script body", async () => {
    const node = await buildOrganizationJsonLd();
    expect(() => JSON.parse(JSON.stringify(node))).not.toThrow();
  });
});
