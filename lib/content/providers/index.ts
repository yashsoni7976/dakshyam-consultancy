import { staticContentProvider } from "./static-provider";
import type { ContentProvider } from "./provider";

/**
 * The active content source for this deployment.
 *
 * MIGRATION POINT — this is the single line that changes when the backend
 * goes live. See docs/CONTENT-ARCHITECTURE.md § "Phase 2".
 *
 *   export const contentProvider: ContentProvider =
 *     process.env.CONTENT_SOURCE === "api"
 *       ? apiContentProvider
 *       : staticContentProvider;
 */
export const contentProvider: ContentProvider = staticContentProvider;

export { CONTENT_TAGS } from "./provider";
export type { ContentProvider, ContentTag } from "./provider";
