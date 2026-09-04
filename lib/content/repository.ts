import { cacheLife, cacheTag } from "next/cache";
import { CONTENT_TAGS, contentProvider } from "./providers";
import type { Slug } from "./types";

/**
 * The content API that pages and components use. Nothing else should import
 * from `content/data/` or from a provider directly.
 *
 * Each function wraps the active provider in a `use cache` scope with:
 *   - a `cacheTag`, so a future CMS webhook can invalidate exactly one
 *     collection via `revalidateTag()`;
 *   - a `cacheLife` profile matching how volatile that collection is.
 *
 * While the static provider is active these caches are effectively free and
 * every page prerenders. When the provider starts hitting a network or a
 * database, the same annotations become the caching strategy — no rewrite.
 *
 * Requires `cacheComponents: true` in next.config.ts.
 */

/* ----- Site identity -------------------------------------------------- */

export async function getSiteIdentity() {
  "use cache";
  cacheTag(CONTENT_TAGS.site);
  cacheLife("days");
  return contentProvider.getSiteIdentity();
}

export async function getNavigation() {
  "use cache";
  cacheTag(CONTENT_TAGS.site);
  cacheLife("days");
  return contentProvider.getNavigation();
}

/* ----- Schemes -------------------------------------------------------- */

export async function getSchemes() {
  "use cache";
  cacheTag(CONTENT_TAGS.schemes);
  cacheLife("days");
  return contentProvider.getSchemes();
}

export async function getScheme(slug: Slug) {
  "use cache";
  cacheTag(CONTENT_TAGS.schemes);
  cacheLife("days");
  return contentProvider.getScheme(slug);
}

export async function getFeaturedSchemes() {
  "use cache";
  cacheTag(CONTENT_TAGS.schemes);
  cacheLife("days");
  const all = await contentProvider.getSchemes();
  return all.filter((scheme) => scheme.featured);
}

/** Distinct sector tags across all schemes, for the Scheme Explorer filter. */
export async function getSchemeSectors() {
  "use cache";
  cacheTag(CONTENT_TAGS.schemes);
  cacheLife("days");
  const all = await contentProvider.getSchemes();
  return [...new Set(all.flatMap((scheme) => scheme.sectors))].sort();
}

/* ----- Services ------------------------------------------------------- */

export async function getServices() {
  "use cache";
  cacheTag(CONTENT_TAGS.services);
  cacheLife("days");
  return contentProvider.getServices();
}

export async function getService(slug: Slug) {
  "use cache";
  cacheTag(CONTENT_TAGS.services);
  cacheLife("days");
  return contentProvider.getService(slug);
}

/* ----- People and proof ----------------------------------------------- */

export async function getTeam() {
  "use cache";
  cacheTag(CONTENT_TAGS.team);
  cacheLife("days");
  return contentProvider.getTeam();
}

export async function getSuccessStories() {
  "use cache";
  cacheTag(CONTENT_TAGS.successStories);
  cacheLife("hours");
  return contentProvider.getSuccessStories();
}

/* ----- Editorial ------------------------------------------------------ */

export async function getBlogPosts() {
  "use cache";
  cacheTag(CONTENT_TAGS.blog);
  cacheLife("hours");
  return contentProvider.getBlogPosts();
}

export async function getBlogPost(slug: Slug) {
  "use cache";
  cacheTag(CONTENT_TAGS.blog);
  cacheLife("hours");
  return contentProvider.getBlogPost(slug);
}

/* ----- Legal ---------------------------------------------------------- */

export async function getLegalDocuments() {
  "use cache";
  cacheTag(CONTENT_TAGS.legal);
  cacheLife("weeks");
  return contentProvider.getLegalDocuments();
}

export async function getLegalDocument(slug: Slug) {
  "use cache";
  cacheTag(CONTENT_TAGS.legal);
  cacheLife("weeks");
  return contentProvider.getLegalDocument(slug);
}

/* ----- Pages ---------------------------------------------------------- */

export async function getHomePage() {
  "use cache";
  cacheTag(CONTENT_TAGS.home);
  cacheLife("days");
  return contentProvider.getHomePage();
}

/* ----- Derived values -------------------------------------------------- */

/**
 * Current year for copyright lines.
 *
 * Reading the clock directly in a component makes the page unprerenderable
 * under Cache Components. Resolving it inside a `use cache` scope keeps the
 * page static and refreshes the value daily.
 */
export async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
