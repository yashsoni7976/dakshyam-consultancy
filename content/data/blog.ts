import type { BlogPost } from "@/lib/content/types";

/**
 * Editorial posts.
 *
 * Static today. When the backend lands this becomes the `posts` table, and
 * `getBlogPost(slug)` in the repository is the only call site that changes.
 *
 * The seed post below is a factual comparison drawn from the scheme guidelines
 * in `schemes.ts`. Edit or replace it freely — but note that Cache Components
 * requires `generateStaticParams` to return at least one result, so
 * `/blog/[slug]` will fail to build if this list is emptied entirely.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "pmegp-or-pmfme-food-processing-rajasthan",
    title: "PMEGP or PMFME: which subsidy fits a food processing unit?",
    excerpt:
      "Both are central schemes, both pay a capital subsidy, and a food processing project in Rajasthan will often look eligible for either. The differences that decide it are the project size, who owns the entity, and how much you can put in yourself.",
    author: "Dakshyam Consulting",
    publishedAt: "2026-08-20",
    tags: ["PMEGP", "PMFME", "Food Processing"],
    published: true,
    body: `Owners setting up a food processing unit in Rajasthan almost always come to us having heard of both schemes, and having been told by someone that they qualify for both. Occasionally that is true. More often the project only fits one of them cleanly, and the choice is settled by three details that are easy to overlook.

## What each scheme actually pays

PMEGP — the Prime Minister Employment Generation Programme — pays a capital subsidy of 15% to 35% of project cost, capped at ₹17.50 lakhs. The percentage depends on the promoter category and whether the unit is rural or urban.

PMFME — PM Formalisation of Micro Food Processing Enterprises — pays a flat 35% of project cost covering machinery and building, capped at ₹10 lakhs.

So PMEGP has the higher ceiling and PMFME has the higher guaranteed rate. Which one pays more depends entirely on project size, and the crossover is closer than most people expect.

## The three details that decide it

**Project cost.** PMEGP allows a project up to ₹50 lakhs in the manufacturing sector. At that size, 35% would be ₹17.50 lakhs — exactly the cap. PMFME hits its ₹10 lakh ceiling at a project cost of about ₹28.5 lakhs. Above roughly ₹28 lakhs, PMEGP starts paying more in absolute terms; below it, the two converge and other factors decide.

**Constitution of the entity.** This is the one that most often settles it. PMEGP is restricted to individuals and proprietorship enterprises. PMFME accepts individuals, proprietorships, partnerships and companies. If you have already incorporated a private limited company, or you have a partner with a real equity stake, PMEGP is off the table and the question answers itself.

**Own contribution.** PMEGP asks for 5% to 10% of project cost from the promoter. PMFME asks for 10% to 40%. For a promoter who is tight on margin money, that gap is often more decisive than the subsidy amount — a scheme you cannot fund your share of is not an option.

## Two things people get wrong

Eligibility for PMEGP requires a minimum qualification of 8th pass. It is a small thing, but it is checked, and it has stopped applications late in the process.

And PMFME carries an ODOP preference — the One District One Product initiative. If your product is the identified product for your district, your PMFME application is materially stronger. Bikaneri bhujia in Bikaner is the obvious example. This does not appear as a hard eligibility criterion, so it gets ignored, but it affects outcomes.

## The short version

If you are a sole promoter, running a proprietorship, with a project above roughly ₹28 lakhs and limited margin money, PMEGP is usually the better claim. If you have a partnership or a company, or your product is your district's ODOP product, PMFME is generally the stronger route.

If the project sits near the crossover, the honest answer is that it needs working out properly against your actual cost sheet — the split between machinery, building and working capital changes what each scheme will pay, because PMFME's 35% applies to machinery and building rather than to the whole project cost.

Figures here are drawn from the current scheme guidelines, which are linked in full on each scheme page. Both schemes are revised by notification from time to time, so verify against the guideline document before committing to an investment decision.`,
  },
];
