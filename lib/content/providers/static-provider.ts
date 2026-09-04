import { blogPosts } from "@/content/data/blog";
import { home } from "@/content/data/home";
import { legalDocuments } from "@/content/data/legal";
import { schemes } from "@/content/data/schemes";
import { services } from "@/content/data/services";
import { navigation, site } from "@/content/data/site";
import { successStories } from "@/content/data/success-stories";
import { team } from "@/content/data/team";
import type { ContentProvider } from "./provider";

const byDisplayOrder = <T extends { displayOrder: number }>(a: T, b: T) =>
  a.displayOrder - b.displayOrder;

/**
 * Content served from the TypeScript modules in `content/data/`.
 *
 * Sorting and published-filtering live here rather than in the data files, so
 * a future API provider can push the same rules down into a query without the
 * pages noticing.
 */
export const staticContentProvider: ContentProvider = {
  name: "static",

  async getSiteIdentity() {
    return site;
  },

  async getNavigation() {
    return navigation;
  },

  async getSchemes() {
    return [...schemes].sort(byDisplayOrder);
  },

  async getScheme(slug) {
    return schemes.find((scheme) => scheme.slug === slug) ?? null;
  },

  async getServices() {
    return [...services].sort(byDisplayOrder);
  },

  async getService(slug) {
    return services.find((service) => service.slug === slug) ?? null;
  },

  async getTeam() {
    return [...team].sort(byDisplayOrder);
  },

  async getSuccessStories() {
    return successStories.filter((story) => story.published).sort(byDisplayOrder);
  },

  async getBlogPosts() {
    return blogPosts
      .filter((post) => post.published)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },

  async getBlogPost(slug) {
    return blogPosts.find((post) => post.slug === slug && post.published) ?? null;
  },

  async getLegalDocuments() {
    return legalDocuments;
  },

  async getLegalDocument(slug) {
    return legalDocuments.find((doc) => doc.slug === slug) ?? null;
  },

  async getHomePage() {
    return home;
  },
};
