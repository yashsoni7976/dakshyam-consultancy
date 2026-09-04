import { describe, expect, it } from "vitest";
import { cacheLife, cacheTag } from "next/cache";
import { CONTENT_TAGS } from "./providers";
import {
  getBlogPost,
  getBlogPosts,
  getCopyrightYear,
  getFeaturedSchemes,
  getHomePage,
  getLegalDocument,
  getLegalDocuments,
  getNavigation,
  getScheme,
  getSchemeSectors,
  getSchemes,
  getService,
  getServices,
  getSiteIdentity,
  getSuccessStories,
  getTeam,
} from "./repository";

describe("repository", () => {
  it("tags every read so a future CMS webhook can invalidate one collection", async () => {
    await getSchemes();
    expect(cacheTag).toHaveBeenCalledWith(CONTENT_TAGS.schemes);
    expect(cacheLife).toHaveBeenCalledWith("days");
  });

  it("gives volatile collections a shorter cache life than stable ones", async () => {
    await getBlogPosts();
    expect(cacheTag).toHaveBeenCalledWith(CONTENT_TAGS.blog);
    expect(cacheLife).toHaveBeenCalledWith("hours");

    await getLegalDocuments();
    expect(cacheTag).toHaveBeenCalledWith(CONTENT_TAGS.legal);
    expect(cacheLife).toHaveBeenCalledWith("weeks");
  });

  it("narrows featured schemes to the flagged ones", async () => {
    const featured = await getFeaturedSchemes();
    const all = await getSchemes();
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThan(all.length);
    expect(featured.every((scheme) => scheme.featured)).toBe(true);
  });

  it("derives a deduplicated, sorted sector list for the explorer filter", async () => {
    const sectors = await getSchemeSectors();
    expect(new Set(sectors).size).toBe(sectors.length);
    expect([...sectors].sort()).toEqual(sectors);

    const all = await getSchemes();
    for (const scheme of all) {
      for (const sector of scheme.sectors) expect(sectors).toContain(sector);
    }
  });

  it("resolves the copyright year inside a cache scope, not from a live clock read", async () => {
    expect(await getCopyrightYear()).toBe(new Date().getFullYear());
    expect(cacheLife).toHaveBeenCalledWith("days");
  });

  it("passes single-item reads through to the provider", async () => {
    const [schemes, services, docs, posts] = await Promise.all([
      getSchemes(),
      getServices(),
      getLegalDocuments(),
      getBlogPosts(),
    ]);
    expect((await getScheme(schemes[0].slug))?.slug).toBe(schemes[0].slug);
    expect((await getService(services[0].slug))?.slug).toBe(services[0].slug);
    expect((await getLegalDocument(docs[0].slug))?.slug).toBe(docs[0].slug);
    expect((await getBlogPost(posts[0].slug))?.slug).toBe(posts[0].slug);
  });

  it("exposes the remaining collections", async () => {
    expect((await getSiteIdentity()).name).toBeTruthy();
    expect((await getNavigation()).footer.length).toBeGreaterThan(0);
    expect((await getTeam()).length).toBeGreaterThan(0);
    expect(Array.isArray(await getSuccessStories())).toBe(true);
    expect((await getHomePage()).impact.stats.length).toBeGreaterThan(0);
  });
});
