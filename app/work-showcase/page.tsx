import type { Metadata } from "next";
import { Orb } from "@/components/orb";
import {
  CtaBanner,
  EmptyState,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getSchemes, getSuccessStories } from "@/lib/content";
import { formatInr } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Work Showcase",
    description:
      "A record of subsidy claims, waivers and reimbursements delivered for Rajasthan enterprises, listed by scheme and sector.",
    path: "/work-showcase",
  });
}

export default async function WorkShowcasePage() {
  const [stories, schemes] = await Promise.all([getSuccessStories(), getSchemes()]);

  return (
    <>
      <PageHero
        eyebrow="Work showcase"
        title="Unlocking growth. Securing subsidies."
        description="We bridge the gap between ambitious businesses and government support — from initial documentation through to final disbursement."
        aside={<Orb variant="ember" className="w-24 sm:w-32" />}
      />

      <Section>
        <SectionHeading
          eyebrow="Record"
          title="Claims delivered"
          description="Every row is an engagement taken from eligibility review through to disbursement."
        />

        <div className="mt-12">
          {stories.length === 0 ? (
            <EmptyState
              title="The public record is being compiled"
              description="Client outcomes are published only with written consent and evidence of the sanction. Until those are cleared, the scheme list below is the best guide to what we handle."
              action={{ label: "Discuss your project", href: "/contact" }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-160 border-collapse text-body-sm">
                <caption className="sr-only">
                  Subsidy and finance claims delivered, by client and scheme
                </caption>
                <thead>
                  <tr className="border-y border-stone text-left">
                    <th scope="col" className="label-mono py-3 pr-4">
                      Client
                    </th>
                    <th scope="col" className="label-mono px-4 py-3">
                      Scheme
                    </th>
                    <th scope="col" className="label-mono px-4 py-3">
                      Sector
                    </th>
                    <th scope="col" className="label-mono px-4 py-3">
                      Location
                    </th>
                    <th scope="col" className="label-mono py-3 pl-4 text-right">
                      Deliverable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story) => (
                    <tr key={story.slug} className="border-b border-stone">
                      <th scope="row" className="py-4 pr-4 text-left font-medium text-ink">
                        {story.clientName}
                      </th>
                      <td className="px-4 py-4 text-smoke">{story.schemeCode}</td>
                      <td className="px-4 py-4 text-smoke">{story.sector ?? "—"}</td>
                      <td className="px-4 py-4 text-smoke">{story.location ?? "—"}</td>
                      <td className="py-4 pl-4 text-right font-medium text-ink tabular-nums">
                        {formatInr(story.amountInr)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Section>

      <Section tone="taupe" divider>
        <SectionHeading
          eyebrow="Coverage"
          title="Schemes we file against"
          description="The programmes we work with regularly, central and state."
        />
        <ol className="mt-12 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, index) => (
            <li
              key={scheme.slug}
              className="flex items-baseline gap-4 border-b border-stone py-3.5 text-body-sm"
            >
              <span className="font-mono text-micro text-ash tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-medium text-ink">{scheme.code}</span>
              <span className="label-mono ml-auto">
                {scheme.government === "central" ? "Central" : "State"}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner
        title="Add your project to the record"
        description="Tell us what you are building and we will map it against every scheme it could claim."
        primary={{ label: "Connect with an expert", href: "/contact" }}
      />
    </>
  );
}
