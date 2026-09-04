import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { getLegalDocument } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

/**
 * Shared renderer for the four legal pages.
 *
 * Each route stays a thin file so the URLs remain top-level (`/terms`,
 * `/privacy`, …) while the markup and metadata live in one place.
 */
export async function legalMetadata(slug: string): Promise<Metadata> {
  const doc = await getLegalDocument(slug);
  if (!doc) return {};
  return buildMetadata({
    title: doc.title,
    description: doc.subtitle,
    path: `/${doc.slug}`,
  });
}

export async function LegalPage({ slug }: { slug: string }) {
  const doc = await getLegalDocument(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero eyebrow="Legal" title={doc.title} description={doc.subtitle} />

      <Section>
        <article className="prose-doc">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <p className="mt-14 border-t border-stone pt-6 text-body-sm text-smoke">
            Last updated: {formatDate(doc.lastUpdated)}
          </p>
        </article>
      </Section>
    </>
  );
}
