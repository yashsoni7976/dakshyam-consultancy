import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { HeroVisual } from "@/components/orb";
import {
  Badge,
  ButtonLink,
  Card,
  CtaBanner,
  Eyebrow,
  IconPlate,
  Section,
  SectionHeading,
  StatRow,
} from "@/components/ui";
import { getFeaturedSchemes, getHomePage, getSiteIdentity } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteIdentity();
  return buildMetadata({
    title: `${site.name} — Subsidy & Project Finance Consultants in Rajasthan`,
    description: site.description,
    path: "/",
  });
}

export default async function HomePage() {
  const [home, featured] = await Promise.all([getHomePage(), getFeaturedSchemes()]);

  return (
    <>
      {/* Hero — headline left, product mockup with blob backdrop right. */}
      <div className="bg-canvas">
        <div className="container-page pt-12 pb-16 sm:pt-16 sm:pb-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="flex flex-col gap-6">
              <Eyebrow>{home.hero.eyebrow}</Eyebrow>
              <h1 className="serif-type text-heading-lg text-deep-ink sm:text-display">
                {home.hero.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="max-w-lg text-body text-slate">{home.hero.body}</p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={home.hero.primaryCta.href}>
                  {home.hero.primaryCta.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={home.hero.secondaryCta.href} variant="secondary">
                  {home.hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <HeroVisual />
          </div>
        </div>

        {/* Proof strip — trust badges on soft meadow band. */}
        <div className="bg-soft-meadow">
          <dl className="container-page grid gap-6 py-10 sm:grid-cols-3 sm:gap-8">
            {home.hero.badges.map((badge) => (
              <div key={badge.id} className="flex flex-col gap-1">
                <dt className="label-caps">{badge.label}</dt>
                <dd className="serif-type text-heading-sm text-deep-ink tabular-nums">
                  {badge.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Section>
        <SectionHeading
          eyebrow="Track record"
          title={home.impact.heading}
          description={home.impact.body}
        />
        <StatRow stats={home.impact.stats} className="mt-12" />
      </Section>

      <Section tone="meadow">
        <SectionHeading
          eyebrow="Sectors"
          title={home.sectors.heading}
          description={home.sectors.body}
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {home.sectors.items.map((item) => (
            <li key={item.id}>
              <Card className="flex h-full flex-col gap-6">
                <IconPlate>
                  <Icon name={item.icon} />
                </IconPlate>
                <h3 className="serif-type text-heading-sm text-deep-ink">{item.label}</h3>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Funding"
            title={home.schemesTeaser.heading}
            description={home.schemesTeaser.body}
          />
          <ButtonLink href={home.schemesTeaser.cta.href} variant="secondary">
            {home.schemesTeaser.cta.label}
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((scheme) => (
            <li key={scheme.slug}>
              <Card className="flex h-full flex-col gap-4">
                <Badge tone={scheme.government === "central" ? "central" : "state"}>
                  {scheme.government === "central" ? "Central Govt" : "State Govt"}
                </Badge>
                <h3 className="serif-type text-heading-sm text-deep-ink">
                  {scheme.code}
                </h3>
                <p className="text-body-sm text-slate">{scheme.keyAdvantage}</p>
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-body-sm font-medium text-deep-ink underline decoration-deep-ink/25 underline-offset-4 transition-colors hover:decoration-deep-ink"
                >
                  Scheme details
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="meadow">
        <Card size="lg" tone="canvas" className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Project finance</Eyebrow>
            <h2 className="serif-type text-heading-sm text-deep-ink">
              {home.finance.heading}
            </h2>
            <p className="text-body text-slate">{home.finance.body}</p>
            <ButtonLink href={home.finance.cta.href} className="mt-2 sm:self-start">
              {home.finance.cta.label}
            </ButtonLink>
          </div>

          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {home.finance.capabilities.map((capability) => (
              <li
                key={capability}
                className="border-b border-border py-3 text-body-sm text-deep-ink"
              >
                {capability}
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <CtaBanner
        title="Not sure which scheme fits your project?"
        description="Send us your project outline. We will tell you which central and state schemes you qualify for, what they are worth, and what it takes to apply."
        primary={{ label: "Get free expert advice", href: "/contact" }}
        secondary={{ label: "Browse all schemes", href: "/schemes" }}
      />
    </>
  );
}
