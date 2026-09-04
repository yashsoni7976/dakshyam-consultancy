import type { SuccessStory } from "@/lib/content/types";

/**
 * Client outcomes shown on /success-stories and in the homepage ticker.
 *
 * IMPORTANT: every entry names a real client and a real disbursement. Publish
 * an entry only when Dakshyam Consulting has that client's written consent and
 * can evidence the sanction. Entries here are examples of the SHAPE of the
 * data — they are intentionally empty until real, consented records exist.
 *
 * Once the backend lands, this list is replaced by the `success_stories`
 * table and `published` becomes an editorial flag in the admin UI.
 */
export const successStories: SuccessStory[] = [];
