import { notFound } from "next/navigation";

/** Blog index temporarily disabled — uncomment the implementation below to restore. */
export const instant = false;

export default function BlogIndexPage() {
  notFound();
}

/*
import Link from "next/link";
import type { Metadata } from "next";
import { CtaBanner, EmptyState, PageHero, Section, Tag } from "@/components/ui";
import { getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Blog",
    description:
      "Guides and updates on government subsidies, MSME compliance and project finance in Rajasthan.",
    path: "/blog",
  });
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Guides and scheme updates"
        description="Plain explanations of how the schemes actually work — what qualifies, what gets rejected, and what changed in the latest notification."
      />

      <Section>
        {posts.length === 0 ? (
          <EmptyState
            title="No articles published yet"
            description="We are writing the first set of scheme guides now. In the meantime, the Scheme Explorer carries the current benefit and eligibility detail for every programme we handle."
            action={{ label: "Browse schemes", href: "/schemes" }}
          />
        ) : (
          <ul className="border-t border-border">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 py-8 transition-colors lg:grid-cols-[10rem_1fr_auto] lg:items-baseline lg:gap-10"
                >
                  <time dateTime={post.publishedAt} className="label-caps">
                    {formatDate(post.publishedAt)}
                  </time>
                  <div className="flex flex-col gap-3">
                    <h2 className="serif-type text-heading-sm text-deep-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-deep-ink/25">
                      {post.title}
                    </h2>
                    <p className="max-w-2xl text-body-sm text-slate">{post.excerpt}</p>
                  </div>
                  {post.tags.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <Tag>{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <CtaBanner
        title="Have a question we have not written about?"
        description="Ask it directly. If it is a common one, it usually becomes the next article."
        primary={{ label: "Ask an expert", href: "/contact" }}
      />
    </>
  );
}
*/
