# Dakshyam Consulting

Website for Dakshyam Consulting — subsidy and project-finance consultancy for
MSMEs and startups in Rajasthan.

Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · TypeScript.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## How this project is organised

All content is centralised. Pages render; they never own copy or data.

```
content/data/          Content as typed TypeScript — the current source of truth
lib/content/types.ts   The content model (also the future CMS schema)
lib/content/repository.ts  The only API pages use. Caching + invalidation tags
lib/content/providers/     Swappable content source. Backend migration point
lib/seo.ts             Metadata + schema.org, built from site identity
app/                   Routes. Layout and presentation only
docs/                  Architecture plan and source audit
public/documents/      Government scheme guideline PDFs
```

**[`DESIGN.md`](DESIGN.md)** is the visual specification — the warm cream
editorial system, with a Bikaner sandstone accent used as punctuation. It is implemented as a Tailwind v4 `@theme` block
in `app/globals.css`; the "Design tokens" section of the architecture doc
explains how the two line up.

Read **[`docs/CONTENT-ARCHITECTURE.md`](docs/CONTENT-ARCHITECTURE.md)** before
adding content or wiring a backend. It explains the three-layer split, the
caching strategy, and the phased migration to a CMS.

**[`docs/source-audit/`](docs/source-audit/README.md)** is the reference audit
of rajasthansubsidy.com — the full page inventory, extracted content, and the
boundaries on what may be reused.

## Before launch

Business-identity values are placeholders. Find them with:

```bash
grep -rn "TODO(brand)\|TODO(legal)" content/ lib/
```

`TODO(brand)` needs Dakshyam Consulting's real details and verifiable figures.
`TODO(legal)` needs review by a qualified advocate.
