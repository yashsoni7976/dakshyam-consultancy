import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import { OrbCluster } from "@/components/orb";
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
      {/* Hero — asymmetric: headline left, supporting copy and artwork right. */}
      <div className="border-b border-stone">
        <div className="container-page pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-20">
            <div className="flex flex-col gap-7">
              <Eyebrow>{home.hero.eyebrow}</Eyebrow>
              <h1 className="display-type text-heading text-ink sm:text-display">
                {home.hero.headingLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={home.hero.primaryCta.href}>
                  {home.hero.primaryCta.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={home.hero.secondaryCta.href} variant="secondary">
                  {home.hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <p className="max-w-md text-body-lg text-smoke">{home.hero.body}</p>
              <OrbCluster />
            </div>
          </div>
        </div>

        {/* Proof strip — hairline-ruled rather than boxed. */}
        <div className="border-t border-stone">
          <dl className="container-page grid divide-y divide-stone sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {home.hero.badges.map((badge, index) => (
              <div key={badge.id} className={index === 0 ? "py-6 sm:pr-8" : "py-6 sm:px-8"}>
                <dt className="label-mono">{badge.label}</dt>
                <dd className="display-type mt-1 text-heading-xs text-ink tabular-nums">
                  {badge.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Impact statistics */}
      <Section>
        <SectionHeading
          eyebrow="Track record"
          title={home.impact.heading}
          description={home.impact.body}
        />
        <StatRow stats={home.impact.stats} className="mt-12" />
      </Section>

      {/* Sectors */}
      <Section tone="taupe" divider>
        <SectionHeading
          eyebrow="Sectors"
          title={home.sectors.heading}
          description={home.sectors.body}
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-stone sm:grid-cols-2 lg:grid-cols-4">
          {home.sectors.items.map((item) => (
            <li key={item.id} className="flex flex-col gap-6 bg-taupe p-6 sm:p-8">
              <IconPlate>
                <Icon name={item.icon} />
              </IconPlate>
              <h3 className="text-subheading font-medium text-ink">{item.label}</h3>
            </li>
          ))}
        </ul>
      </Section>

      {/* Featured schemes */}
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
                <h3 className="display-type text-heading-xs text-ink">{scheme.code}</h3>
                <p className="text-body-sm text-smoke">{scheme.keyAdvantage}</p>
                <Link
                  href={`/schemes/${scheme.slug}`}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 transition-colors hover:decoration-sandstone-deep"
                >
                  Scheme details
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      {/* Project finance — the flagship feature panel. */}
      <Section tone="taupe" divider>
        <Card tone="outline" size="lg" className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>Project finance</Eyebrow>
            <h2 className="display-type text-heading-sm text-ink">{home.finance.heading}</h2>
            <p className="text-body text-smoke">{home.finance.body}</p>
            <ButtonLink href={home.finance.cta.href} className="mt-2 self-start">
              {home.finance.cta.label}
            </ButtonLink>
          </div>

          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {home.finance.capabilities.map((capability) => (
              <li
                key={capability}
                className="border-b border-stone py-3 text-body-sm text-graphite"
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
