import { describe, expect, it } from "vitest";
import { blogPosts } from "@/content/data/blog";
import { successStories } from "@/content/data/success-stories";
import { staticContentProvider as provider } from "./static-provider";

const ordered = (items: { displayOrder: number }[]) =>
  items.map((item) => item.displayOrder);

const isAscending = (values: number[]) =>
  values.every((value, index) => index === 0 || values[index - 1] <= value);

describe("staticContentProvider", () => {
  it("identifies itself, so a swapped provider is visible in diagnostics", () => {
    expect(provider.name).toBe("static");
  });

  it.each([
    ["schemes", () => provider.getSchemes()],
    ["services", () => provider.getServices()],
    ["team", () => provider.getTeam()],
  ] as const)("returns %s sorted by displayOrder", async (_label, load) => {
    const items = await load();
    expect(items.length).toBeGreaterThan(0);
    expect(isAscending(ordered(items))).toBe(true);
  });

  it("does not mutate the underlying data when sorting", async () => {
    const before = [...blogPosts];
    await provider.getSchemes();
    await provider.getBlogPosts();
    expect(blogPosts).toEqual(before);
  });

  it("looks a scheme up by slug and returns null for an unknown one", async () => {
    const all = await provider.getSchemes();
    const found = await provider.getScheme(all[0].slug);
    expect(found?.slug).toBe(all[0].slug);
    expect(await provider.getScheme("not-a-scheme")).toBeNull();
  });

  it("looks a service up by slug and returns null for an unknown one", async () => {
    const all = await provider.getServices();
    expect((await provider.getService(all[0].slug))?.slug).toBe(all[0].slug);
    expect(await provider.getService("not-a-service")).toBeNull();
  });

  it("withholds unpublished success stories", async () => {
    const stories = await provider.getSuccessStories();
    expect(stories.every((story) => story.published)).toBe(true);
    expect(stories.length).toBeLessThanOrEqual(successStories.length);
  });

  it("returns blog posts newest first, published only", async () => {
    const posts = await provider.getBlogPosts();
    expect(posts.every((post) => post.published)).toBe(true);
    const dates = posts.map((post) => post.publishedAt);
    expect([...dates].sort().reverse()).toEqual(dates);
  });

  it("refuses to serve an unpublished post by slug", async () => {
    const draft = blogPosts.find((post) => !post.published);
    if (draft) expect(await provider.getBlogPost(draft.slug)).toBeNull();
    const live = blogPosts.find((post) => post.published);
    if (live) expect((await provider.getBlogPost(live.slug))?.slug).toBe(live.slug);
    expect(await provider.getBlogPost("no-such-post")).toBeNull();
  });

  it("serves legal documents and returns null for an unknown slug", async () => {
    const docs = await provider.getLegalDocuments();
    expect(docs.length).toBeGreaterThan(0);
    expect((await provider.getLegalDocument(docs[0].slug))?.slug).toBe(docs[0].slug);
    expect(await provider.getLegalDocument("not-legal")).toBeNull();
  });

  it("serves site identity, navigation and the home page composition", async () => {
    expect((await provider.getSiteIdentity()).name).toBeTruthy();
    expect((await provider.getNavigation()).primary.length).toBeGreaterThan(0);
    expect((await provider.getHomePage()).hero.headingLines.length).toBeGreaterThan(0);
  });
});
