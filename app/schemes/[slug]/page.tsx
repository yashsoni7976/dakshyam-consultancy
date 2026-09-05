import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, FileDown } from "lucide-react";
import { Badge, ButtonLink, CtaBanner, Section, Tag } from "@/components/ui";
import { getScheme, getSchemes } from "@/lib/content";
import { formatBytes } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

/** Prerender every scheme at build time; unknown slugs 404 via notFound(). */
export async function generateStaticParams() {
  const schemes = await getSchemes();
  return schemes.map((scheme) => ({ slug: scheme.slug }));
}

export async function generateMetadata(
  props: PageProps<"/schemes/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const scheme = await getScheme(slug);
  if (!scheme) return {};

  return buildMetadata({
    title: `${scheme.code} — ${scheme.name}`,
    description: scheme.summary,
    path: `/schemes/${scheme.slug}`,
  });
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-5 rounded-card bg-soft-meadow p-6 sm:p-8">
      <h2 className="label-caps">{title}</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-body-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-deep-ink" aria-hidden="true" />
            <span className="text-slate">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SchemePage(props: PageProps<"/schemes/[slug]">) {
  const { slug } = await props.params;
  const scheme = await getScheme(slug);

  if (!scheme) notFound();

  return (
    <>
      <div className="border-b border-border">
        <div className="container-page pt-10 pb-16 sm:pt-12 sm:pb-20">
          <Link
            href="/schemes"
            className="inline-flex items-center gap-1.5 text-body-sm text-slate transition-colors hover:text-deep-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All schemes
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <div className="flex flex-col gap-5">
              <Badge tone={scheme.government === "central" ? "central" : "state"}>
                {scheme.government === "central"
                  ? "Central Government"
                  : "State Government"}
              </Badge>
              <h1 className="serif-type text-heading text-deep-ink sm:text-display">
                {scheme.code}
              </h1>
              <p className="text-subheading text-slate">{scheme.name}</p>
            </div>

            <div className="flex flex-col gap-6">
              <p className="text-body text-slate">{scheme.summary}</p>
              <p className="rounded-card border-l-2 border-deep-ink bg-soft-meadow px-4 py-3 text-body-sm font-medium text-deep-ink">
                {scheme.keyAdvantage}
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact">Check eligibility &amp; consult</ButtonLink>
                {scheme.documents.map((doc) => (
                  <ButtonLink key={doc.href} href={doc.href} variant="secondary" external>
                    <FileDown className="size-3.5" aria-hidden="true" />
                    {doc.label}
                    {doc.sizeBytes ? (
                      <span className="text-slate">({formatBytes(doc.sizeBytes)})</span>
                    ) : null}
                  </ButtonLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-5 lg:grid-cols-3">
          <DetailList title="Key benefits" items={scheme.benefits} />
          <DetailList title="Eligibility" items={scheme.eligibility} />
          <DetailList title="Eligible projects" items={scheme.eligibleProjects} />
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <h2 className="label-caps">Sectors covered</h2>
          <ul className="flex flex-wrap gap-2">
            {scheme.sectors.map((sector) => (
              <li key={sector}>
                <Tag>{sector}</Tag>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-12 max-w-3xl border-t border-border pt-6 text-body-sm text-slate">
          <span className="font-medium text-deep-ink">Please note:</span> subsidy
          quantums, caps and eligibility criteria are set by the issuing department and
          change by notification. The linked guideline PDF is the authoritative source —
          verify against it before committing to an investment decision.
        </p>
      </Section>

      <CtaBanner
        title={`Think you qualify for ${scheme.code}?`}
        description="We will check your eligibility against the current guidelines, tell you what the claim is worth, and list exactly what documents it needs."
        primary={{ label: "Start your application", href: "/contact" }}
        secondary={{ label: "Compare other schemes", href: "/schemes" }}
      />
    </>
  );
}
