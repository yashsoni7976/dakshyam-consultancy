import type {
  BlogPost,
  HomePageContent,
  LegalDocument,
  Navigation,
  Scheme,
  Service,
  SiteIdentity,
  Slug,
  SuccessStory,
  TeamMember,
} from "../types";

/**
 * The contract every content source must satisfy.
 *
 * Today the only implementation is `StaticContentProvider`, which reads the
 * TypeScript modules in `content/data/`. When a backend arrives, add an
 * `ApiContentProvider` (or `DbContentProvider`) alongside it and switch the
 * export in `lib/content/providers/index.ts`. No page or component changes.
 *
 * Every method is async even though the static provider resolves immediately.
 * That is deliberate: it keeps the call sites' shape identical across the
 * migration, so swapping the provider cannot cause a sync/async refactor.
 */
export interface ContentProvider {
  readonly name: string;

  getSiteIdentity(): Promise<SiteIdentity>;
  getNavigation(): Promise<Navigation>;

  getSchemes(): Promise<Scheme[]>;
  getScheme(slug: Slug): Promise<Scheme | null>;

  getServices(): Promise<Service[]>;
  getService(slug: Slug): Promise<Service | null>;

  getTeam(): Promise<TeamMember[]>;

  getSuccessStories(): Promise<SuccessStory[]>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: Slug): Promise<BlogPost | null>;

  getLegalDocuments(): Promise<LegalDocument[]>;
  getLegalDocument(slug: Slug): Promise<LegalDocument | null>;

  getHomePage(): Promise<HomePageContent>;
}

/**
 * Cache tags, one per content collection.
 *
 * Used by `repository.ts` via `cacheTag()`. When the backend lands, its
 * webhook or Server Action calls `revalidateTag(CONTENT_TAGS.schemes)` after
 * an edit and the affected pages regenerate — nothing else has to change.
 */
export const CONTENT_TAGS = {
  site: "content:site",
  schemes: "content:schemes",
  services: "content:services",
  team: "content:team",
  successStories: "content:success-stories",
  blog: "content:blog",
  legal: "content:legal",
  home: "content:home",
} as const;

export type ContentTag = (typeof CONTENT_TAGS)[keyof typeof CONTENT_TAGS];
