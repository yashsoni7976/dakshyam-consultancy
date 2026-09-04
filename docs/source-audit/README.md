# Source audit — rajasthansubsidy.com

Captured **31 August 2026**. This directory is a reference archive of the site
we were asked to use as the content model. It is **input material, not shipped
content** — see "Reuse boundaries" below.

## How it was captured

The source is a client-rendered Vite + React SPA (`<div id="root">` plus a
1.88 MB JS bundle), so the raw HTML contains no content. There is no
sourcemap — `/assets/index-*.js.map` returns the SPA's `index.html` fallback,
not a map. Pages were therefore rendered with headless Chrome
(`--dump-dom --virtual-time-budget=20000`) and the DOM converted to structured
text. Route list came from the bundle's router table plus `/sitemap.xml`.

Raw per-page text lives in `pages/*.txt`. Sitemap URLs in `sitemap-urls.txt`.

## Page inventory — 17 routes

`/sitemap.xml` declares 10 URLs; the bundle's router declares 17. The seven
undeclared routes are the legal pages and the admin area.

| # | Route | Page | In sitemap | Content source | Captured |
|---|---|---|---|---|---|
| 1 | `/` | Home | ✅ | Static | ✅ `pages/home.txt` |
| 2 | `/about` | About Us | ✅ | Static | ✅ `pages/about.txt` |
| 3 | `/services` | Services | ✅ | Static | ✅ `pages/services.txt` |
| 4 | `/schemes` | Scheme Explorer | ✅ | Static | ✅ `pages/schemes.txt` |
| 5 | `/success-stories` | Success Stories | ✅ | Static | ✅ `pages/success-stories.txt` |
| 6 | `/work-showcase` | Work Showcase | ✅ | **Firestore** | ✅ `pages/work-showcase.txt` (table empty) |
| 7 | `/blog` | Blog index | ✅ | **Firestore** | ✅ `pages/blog.txt` (no posts) |
| 8 | `/blog/:slug` | Blog post | ✅ (1 URL) | **Firestore** | ⚠️ `pages/blog-food-bikaner.txt` — renders empty |
| 9 | `/contact` | Contact | ✅ | Static + form | ✅ `pages/contact.txt` |
| 10 | `/sitemap` | HTML sitemap | ✅ | Static | ✅ `pages/sitemap.txt` |
| 11 | `/terms` | Terms & Conditions | ❌ | Static | ✅ `pages/terms.txt` |
| 12 | `/privacy` | Privacy Policy | ❌ | Static | ✅ `pages/privacy.txt` |
| 13 | `/refund` | Refund Policy | ❌ | Static | ✅ `pages/refund.txt` |
| 14 | `/legal` | Legal Disclaimer | ❌ | Static | ✅ `pages/legal.txt` |
| 15 | `/login` | Admin login | ❌ | Firebase Auth | ⛔ not captured — auth-gated |
| 16 | `/admin` | Admin console | ❌ | Firebase Auth | ⛔ not captured — auth-gated |
| 17 | `*` | 404 | — | Static | — |

### Findings worth carrying forward

- **The source already has a backend.** Firebase Auth + Firestore drive
  `/blog`, `/blog/:slug` and the `/work-showcase` records table, administered
  through `/admin`. All three render empty in production today — the showcase
  table literally says *"Records will appear once added by Admin."* This is the
  strongest evidence for which collections need a CMS on day one.
- **SPA, so no server rendering.** Every page ships the same empty shell and
  hydrates client-side. Titles are patched in after hydration (the DOM shows
  two `<title>` tags). For a subsidy-discovery site that lives on organic
  search, this is the single biggest thing to improve — hence Server
  Components and prerendering in the new build.
- **1.88 MB of JavaScript on first load**, including `jsPDF`, a PDF viewer and
  a Google API client shipped to every visitor.
- **Legal pages are absent from `sitemap.xml`** while being linked from the
  footer.
- **jsPDF/pdfobject and reCAPTCHA** suggest a client-side document generator
  and a protected contact form.

## Content assets captured

- `public/documents/schemes/*.pdf` — 11 official government scheme guideline
  PDFs (24 MB total), renamed to stable slugs. These are Government of India /
  Government of Rajasthan public policy documents.
- Remaining imagery on the source site is Unsplash stock plus `i.pravatar.cc`
  placeholder avatars — nothing worth mirroring.

## Reuse boundaries

Content from this audit splits into three buckets. The split is enforced in
`content/data/`:

| Bucket | Examples | Treatment |
|---|---|---|
| **Public policy fact** | Scheme names, subsidy percentages, eligibility, guideline PDFs | Reused freely. Sourced from government publications, verified against the linked PDFs. Lives in `content/data/schemes.ts`. |
| **Generic category copy** | Service names ("GST Services"), section headings | Rewritten in our own words, structure retained. Lives in `content/data/services.ts`, `home.ts`. |
| **Another business's identity & claims** | Team names, phone/email/address, "700+ units served", "₹50+ Cr subsidy", 4.9 Google rating, named client outcomes | **Not copied.** Structure preserved, values replaced with `TODO(brand)` placeholders for Dakshyam Consulting's own verifiable data. |

The third bucket matters: those are factual assertions about a specific firm's
track record, and named clients with disbursement amounts are that firm's
references. Publishing them under Dakshyam Consulting would be a
misrepresentation, and the client names carry a consent obligation. Every one
of those fields is present in the content model — waiting on real values.
