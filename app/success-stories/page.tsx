import type { Metadata } from "next";
import { Badge, Card, CtaBanner, EmptyState, PageHero, Section } from "@/components/ui";
import { getSuccessStories } from "@/lib/content";
import { formatInr } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Success Stories",
    description:
      "Subsidies, waivers and reimbursements secured for businesses across Rajasthan.",
    path: "/success-stories",
  });
}

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories();

  const total = stories.reduce((sum, story) => sum + story.amountInr, 0);

  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title="Real beneficiaries, real disbursements"
        description="Every entry below is a claim we took from eligibility review through to money in the client's account."
      />

      <Section>
        {stories.length === 0 ? (
          <EmptyState
            title="Case studies are being prepared"
            description="We publish a client outcome only once that client has given written consent and the sanction can be evidenced. The first set is being cleared now."
            action={{ label: "Discuss your project", href: "/contact" }}
          />
        ) : (
          <>
            <p className="border-b border-border pb-6 text-body-sm text-slate">
              <span className="font-medium text-deep-ink tabular-nums">
                {formatInr(total)}
              </span>{" "}
              secured across {stories.length} published{" "}
              {stories.length === 1 ? "engagement" : "engagements"}.
            </p>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <li key={story.slug}>
                  <Card className="flex h-full flex-col gap-3">
                    <Badge>{story.schemeCode}</Badge>
                    <h2 className="text-subheading font-medium text-deep-ink">
                      {story.clientName}
                    </h2>
                    <p className="text-body-sm text-slate">{story.headline}</p>
                    <p className="mt-auto pt-5 serif-type text-heading-sm text-deep-ink tabular-nums">
                      {formatInr(story.amountInr)}
                    </p>
                    {story.sector || story.location ? (
                      <p className="text-micro text-slate">
                        {[story.sector, story.location].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          </>
        )}
      </Section>

      <CtaBanner
        title="Ready to write your own?"
        description="Send us your project outline and we will tell you what it can claim."
        primary={{ label: "Consult with us", href: "/contact" }}
        secondary={{ label: "Browse schemes", href: "/schemes" }}
      />
    </>
  );
}
