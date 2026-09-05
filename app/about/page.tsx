import type { Metadata } from "next";
import { Clock, ExternalLink, Globe2, ShieldCheck } from "lucide-react";
import { HeroVisual } from "@/components/orb";
import {
  Card,
  CtaBanner,
  IconPlate,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getHomePage, getSiteIdentity, getTeam } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "About Us",
    description:
      "Who we are: subsidy and project finance consultants working with MSMEs and startups across Rajasthan.",
    path: "/about",
  });
}

const PRINCIPLES = [
  {
    icon: Clock,
    title: "Time-bound",
    body: "Government windows close. We work to your deadlines and tell you early when one is at risk.",
  },
  {
    icon: ShieldCheck,
    title: "Documentation first",
    body: "Most rejections are paperwork failures, not eligibility failures. We get the file right before it is filed.",
  },
  {
    icon: Globe2,
    title: "Whole-project view",
    body: "Subsidy, term loan and working capital are one decision. We structure them together, not in isolation.",
  },
];

export default async function AboutPage() {
  const [site, team, home] = await Promise.all([
    getSiteIdentity(),
    getTeam(),
    getHomePage(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Professional services, held to a global standard"
        description={`${site.name} exists to make government support reachable for the businesses it was written for. We handle the eligibility analysis, the project report, the filing and the follow-through — so an owner can stay focused on building the plant rather than chasing the file.`}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="prose-doc">
            <h2>What we do</h2>
            <p>
              We advise MSMEs, startups and established manufacturers across Rajasthan on
              the central and state schemes they qualify for, and we arrange the project
              finance that sits alongside them. That means eligibility mapping, detailed
              project reports, bank and NBFC liaison, application filing, and following a
              claim through to disbursement.
            </p>
            <h2>How we work</h2>
            <p>
              Every engagement starts with a free eligibility review. If no scheme fits
              your project, we will say so rather than bill you to find out slowly. If one
              does, you get a written plan: which scheme, what it is worth, what documents
              are needed, and a realistic timeline.
            </p>
            <p>
              We are a private consultancy. We are not a government body and we cannot
              approve your application — that decision always rests with the department or
              the lender. What we can do is make sure your file gives them no reason to
              refuse.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <dl className="grid h-fit gap-5 sm:grid-cols-2">
              {home.impact.stats.slice(0, 4).map((stat) => (
                <div key={stat.id} className="rounded-card bg-soft-meadow p-6">
                  <dd className="serif-type text-heading-sm break-words text-deep-ink tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-body-sm text-slate">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <HeroVisual className="mt-6 max-w-xs self-end" />
          </div>
        </div>
      </Section>

      <Section tone="meadow" divider>
        <SectionHeading
          eyebrow="How we operate"
          title="Three things we do not compromise on"
        />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {PRINCIPLES.map(({ icon: PrincipleIcon, title, body }) => (
            <li
              key={title}
              className="flex flex-col gap-5 rounded-card bg-soft-meadow p-6 sm:p-8"
            >
              <IconPlate>
                <PrincipleIcon className="size-5" aria-hidden="true" />
              </IconPlate>
              <h3 className="text-subheading font-medium text-deep-ink">{title}</h3>
              <p className="text-body-sm text-slate">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="The people you will work with"
          description="Engagements are led directly by the people named here — not handed to a junior after the first meeting."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li key={member.slug}>
              <Card className="flex h-full flex-col gap-3">
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- team photos are static JPEGs
                  <img
                    src={member.photo.src}
                    alt={member.photo.alt}
                    className="aspect-[4/3] w-full rounded-card object-cover object-top"
                  />
                ) : null}
                <h3 className="serif-type text-heading-sm text-deep-ink">
                  {member.name}
                </h3>
                <p className="label-caps">{member.role}</p>
                {member.bio ? (
                  <p className="pt-2 text-body-sm text-slate">{member.bio}</p>
                ) : null}
                {member.linkedinUrl ? (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-body-sm text-slate transition-colors hover:text-deep-ink"
                  >
                    LinkedIn
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBanner
        title="Tell us about your project"
        description="A short conversation is usually enough to tell whether a scheme fits. There is no charge for the first review."
        primary={{ label: "Book a consultation", href: "/contact" }}
      />
    </>
  );
}
