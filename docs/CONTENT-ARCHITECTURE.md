# Content architecture

How content is centralised today, and how it moves to a backend later without
rewriting pages.

## The core rule

> **Pages render. They never own content.**

Every string, number, image reference and document link the site shows comes
from one place — the content repository. No page or component may import from
`content/data/` directly, and no copy is hard-coded in JSX.

```
app/**/page.tsx          ← layout + presentation only
   │  imports
   ▼
lib/content/repository.ts    ← the ONLY public API. `use cache` + tags + lifetimes
   │  delegates to
   ▼
lib/content/providers/       ← swappable source. MIGRATION POINT
   │  static-provider.ts  →  content/data/*.ts   (today)
   └  api-provider.ts     →  CMS / DB / REST     (later)
```

Three layers, each with one job:

| Layer | File | Responsibility |
|---|---|---|
| **Model** | `lib/content/types.ts` | What content *is*. One TypeScript interface per entity. |
| **Source** | `lib/content/providers/` | Where content *comes from*. Implements `ContentProvider`. |
| **Access** | `lib/content/repository.ts` | How pages *get* content. Caching, tagging, revalidation. |

## Why the repository is async today

Every method on `ContentProvider` returns a `Promise`, even though the static
provider resolves instantly from an in-memory array. That is deliberate. If the
static layer were synchronous, moving to a backend would turn every call site
async — a refactor touching every page, in the same change that introduces
network failure modes. Keeping the signature async from day one means the
migration is genuinely a one-file change.

## Caching: written once, correct in both phases

`next.config.ts` enables `cacheComponents: true`. Each repository function
declares a `use cache` scope with a tag and a lifetime:

```ts
export async function getSchemes() {
  "use cache";
  cacheTag(CONTENT_TAGS.schemes);   // invalidation handle
  cacheLife("days");                // freshness budget
  return contentProvider.getSchemes();
}
```

While the static provider is active these annotations cost nothing and every
page prerenders to static HTML. The moment the provider starts making network
calls, the same annotations *become* the caching strategy — no new code. The
build output already reflects this; routes carry `Revalidate 1d / Expire 1w`
derived from the profiles above.

Lifetimes are chosen by volatility:

| Collection | Profile | Reasoning |
|---|---|---|
| Site identity, navigation | `days` | Changes at rebrand cadence. |
| Schemes, services, home, team | `days` | Changes when a policy is notified. |
| Success stories, blog | `hours` | Editorially updated; should appear same-day. |
| Legal documents | `weeks` | Changes only on legal review. |

## Content collections

| Collection | File | Entity | Status |
|---|---|---|---|
| Site identity | `content/data/site.ts` | `SiteIdentity`, `Navigation` | Structure complete; values are `TODO(brand)` |
| Schemes | `content/data/schemes.ts` | `Scheme` | **11 schemes, fully populated** |
| Services | `content/data/services.ts` | `Service` | **12 services, fully populated** |
| Homepage | `content/data/home.ts` | `HomePageContent`, `Stat` | Copy complete; statistics are `TODO(brand)` |
| Legal | `content/data/legal.ts` | `LegalDocument` | **4 documents drafted**; needs legal review |
| Team | `content/data/team.ts` | `TeamMember` | Placeholder — needs real people |
| Success stories | `content/data/success-stories.ts` | `SuccessStory` | Intentionally empty — needs consented client data |
| Blog | `content/data/blog.ts` | `BlogPost` | Empty — no posts yet |

### On the `TODO(brand)` placeholders

Business-identity fields are placeholders rather than values copied from the
reference site. Contact details, team members, "700+ units served",
"₹50+ Cr subsidy secured", the 4.9 Google rating and every named client
outcome are factual claims about *that* firm. They are structurally present in
the model and ready to receive Dakshyam Consulting's own verifiable numbers.

Grep for the remaining ones at any time:

```bash
grep -rn "TODO(brand)\|TODO(legal)" content/ lib/
```

## Migration to a backend

### Phase 1 — now: static, prerendered

Content is TypeScript in `content/data/`. Type-checked, diffable, reviewable in
a PR, deployed with the code. Zero infrastructure. Correct choice while the
content changes a few times a month and one or two people edit it.

### Phase 2 — add the backend

The work, in order:

1. **Pick the source.** Options, roughly in ascending order of effort:
   - *Git-based CMS* (Keystatic, TinaCMS) — edits still land as commits, so the
     static provider stays and non-technical editors get a UI. Cheapest path if
     the only pain point is "an editor can't change copy".
   - *Headless CMS* (Sanity, Payload, Strapi) — real editorial workflow,
     drafts, media library. The right answer once blog and success stories are
     actively maintained.
   - *Own database* (Postgres + Prisma/Drizzle) — needed only if content
     becomes transactional: application tracking, client logins, document
     uploads. Note the source site chose Firestore for exactly the three
     collections that are hardest to keep in code — blog, showcase records,
     and admin-managed data.
2. **Model the schema from `lib/content/types.ts`.** The interfaces are already
   the schema — collections, field types, relations (`SuccessStory.schemeCode`
   → `Scheme.code`) and the `published` / `displayOrder` editorial flags.
3. **Write `providers/api-provider.ts`** implementing `ContentProvider` against
   the new source. Validate responses at the boundary (Zod) so a bad CMS
   payload fails loudly in one place instead of rendering `undefined` into a
   page.
4. **Flip one line** in `providers/index.ts`:
   ```ts
   export const contentProvider: ContentProvider =
     process.env.CONTENT_SOURCE === "api" ? apiContentProvider : staticContentProvider;
   ```
   The env var lets both sources run side by side during the cutover, and gives
   you an instant rollback.
5. **Wire invalidation.** Add `app/api/revalidate/route.ts` — a webhook the CMS
   calls on publish, which maps the changed collection to its tag:
   ```ts
   revalidateTag(CONTENT_TAGS.schemes);
   ```
   The tags already exist in `providers/provider.ts`. Authenticate the webhook
   with a shared secret.
6. **Migrate the data** by exporting `content/data/*.ts` through a seed script.
   Because the data is typed and the provider interface is shared, the seed
   script can import the static provider and write straight into the CMS.

**Pages do not change in any of these steps.** That is the whole point of the
indentation.

### What can move incrementally

Collections migrate one at a time. A hybrid provider can read blog posts from
the CMS while schemes stay in code — reasonable, since scheme data changes when
a government notification lands and benefits from code review, whereas blog
posts do not.

## Assets

Scheme guideline PDFs live in `public/documents/schemes/` (24 MB, 11 files).
This is fine while they are static and infrequently changed, but it does put
24 MB of binaries in git history. When the backend lands, move them to object
storage (S3/R2) behind a CDN and change `SchemeDocument.href` to an absolute
URL — the type already permits it.

## Conventions

- **Slugs are primary keys.** They appear in URLs and in cross-references. Do
  not change a slug after publication; add a redirect instead.
- **`displayOrder` in tens** (10, 20, 30…) so an item can be inserted between
  two others without renumbering.
- **Money as `number` in rupees** (`SuccessStory.amountInr`), formatted in the
  UI. Never store a pre-formatted string — it cannot be sorted or totalled.
- **Sorting and filtering belong in the provider**, not in the data files and
  not in components, so a future SQL provider can push them into the query.
- **`published` is an explicit boolean** on every editorial entity. The static
  provider filters on it, so the flag keeps working unchanged in a CMS.
- **Verify scheme figures against the linked PDF** before each release. Subsidy
  percentages and caps change by notification.

## The UI layer

Pages compose shared primitives rather than repeating markup:

| File | Role |
|---|---|
| `components/ui.tsx` | `Section`, `PageHero`, `SectionHeading`, `Card`, `Badge`, `Tag`, `ButtonLink`, `StatRow`, `EmptyState`, `CtaBanner` |
| `components/site-header.tsx` + `header-nav.tsx` | Server fetch split from the client menu toggle, so only the interactive shell ships JS |
| `components/site-footer.tsx` | Footer groups rendered from `getNavigation()` |
| `components/scheme-explorer.tsx` | Client-side search + government/sector filtering |
| `components/legal-document.tsx` | One renderer behind all four legal routes |
| `components/markdown-lite.tsx` | Headings, lists, bold and paragraphs for post bodies |
| `components/icon.tsx` | Maps the `icon` string in content to a Lucide component |
| `components/orb.tsx` | The gradient-sphere product visual — the only place the accent colours appear |

### Design tokens

`DESIGN.md` is the specification; `app/globals.css` is its implementation as a
Tailwind v4 `@theme` block. The system is a warm cream editorial palette:

- **Surfaces** stack `eggshell` (#fdfcfc page canvas) → `taupe` (#f5f3f1 cards
  and bands) → `stone` (#ebe8e4 hairlines and icon plates). Never pure white.
- **Text** runs `ink` → `graphite` → `smoke` → `ash`, darkest to faintest.
  `ash` only reaches 2.6:1 on the canvas, so it is limited to decorative icons
  and placeholders; every run of real copy sits on `smoke` or darker.
- **Type** is Inter throughout: weight 300 for every display size (24/32/36/48px,
  tracking -0.02em) standing in for Waldenburg, 400/500 for everything else.
  Body takes the opposite tracking (+0.01em) — that contrast is deliberate.
  Geist Mono carries section labels via the `label-mono` utility.
- **Shape** is pills (9999px) for buttons and tags, 20/24px for cards, and 4px
  for inputs — the one place the pill is dropped.
- **Elevation** is a 1px `stone` hairline. `shadow-whisper` exists for the rare
  card that must sit above its neighbours; there are no blurred drop shadows.
- **`sandstone` is the interactive accent** — the weathered Dulmera red of
  Bikaner, and the same hue family as the ember spark taken down until it is
  usable as text. `sandstone-deep` (#a34a34, 5.7:1) is the default step and the
  only one safe at body sizes; `sandstone` (#b9663f) is 4.1:1 and is for icons,
  rules and display-size text; `sandstone-wash` / `sandstone-line` are the
  tinted surface and its hairline.
- **`violet` and `ember` are decoration only.** They appear inside `Orb` and
  the CTA banner's blurred spark, never on a button, link, badge or border.
  `alert` is a darkened ember reserved for form validation, where the spark
  itself would not clear 4.5:1 on the canvas.
- **`ink-warm` (#1a0f0b)** fills the single inverted surface — the closing CTA
  panel. It reads as black but holds the warmth of the canvas. Text and filled
  buttons stay pure `ink`.

The theme is light-only by design — the warm canvas *is* the brand, so there
is no `prefers-color-scheme: dark` block to keep in sync.

Two utilities do the layout work: `container-page` (1280px, stepped gutters)
and `section-y` (96px rhythm, 120px on wide screens).

> **Cascade trap:** `BUTTON_BASE` sets `inline-flex`, and Tailwind emits
> `.inline-flex` *after* `.hidden`, so passing `hidden` to a button's
> `className` silently does nothing. Put responsive visibility on a wrapper.

**Colour budget.** DESIGN.md caps the accent at roughly 5% of a viewport and
closes the list of places it may appear: eyebrow labels, inline links, focus
rings, active pill states, the rule on a highlighted callout, and icon plates.
Two consequences in the code:

- `Eyebrow` is accented; the bare `label-mono` utility is not. Metadata labels
  — the homepage proof strip, footer column headings, scheme-detail list
  titles, table heads — stay neutral so they don't eat the budget.
- Every icon plate goes through `IconPlate` rather than a hand-written span,
  so the tint lives in one place and cannot drift.

Adding a new accent placement is a change to DESIGN.md, not a judgement call.

> **Partial-row trap:** the `gap-px`-over-stone grid paints a filled cell
> wherever a list is not a multiple of the column count. Use it only for
> fixed-length lists (sectors, principles, services, scheme details); anything
> variable-length uses ruled cells (`StatRow`) or spaced cards.

Only four components are client components — the header menu, the scheme
filter, the contact form and its submit button. Everything else renders on the
server.

## Routes

All 17 routes are built and prerendered. `/schemes/[slug]` generates 11 pages
from `getSchemes()`; `/blog/[slug]` generates one per published post.

> **Cache Components constraint:** `generateStaticParams` must return at least
> one result, so `/blog/[slug]` will fail to build if `blogPosts` is emptied
> completely. Note also that the `dynamicParams` route segment config is
> rejected under `cacheComponents` — unknown slugs are handled by `notFound()`
> instead.

## The contact form

`app/actions/contact.ts` is a Server Action; the schema and subject list sit in
`lib/contact-schema.ts` because a `"use server"` module may only export async
functions — exporting a constant from there turns it into a server reference
and breaks at runtime.

Validation covers name, email, phone, subject, message length and DPDP consent,
plus a honeypot field that is silently accepted and discarded so bots get no
signal. A valid submission is currently logged server-side.

**Before launch:** wire real delivery (email or CRM) at the marked block, and
add IP-keyed rate limiting. A public form with no throttle will be found.

## Still to build

- **Deliver contact enquiries** — the action validates and logs; it does not yet
  send anywhere. Add rate limiting at the same time.
- **Brand assets** — `public/brand/logo.svg` is a placeholder monogram. Needs
  the real logo, a favicon and an OG image.
- **Real business data** — 25 `TODO(brand)` placeholders, plus the team list and
  success stories, which are empty pending consented client records.
- **Legal review** — all four documents are drafted but unreviewed.
- **Markdown** — `markdown-lite.tsx` covers headings, lists and bold. Swap in
  remark/rehype when posts need links, images or tables.
- **Accessibility and Core Web Vitals pass** before launch.
