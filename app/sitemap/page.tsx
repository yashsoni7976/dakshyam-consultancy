import Link from "next/link";
import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { getBlogPosts, getNavigation, getSchemes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Sitemap",
    description: "Every page on this site, in one list.",
    path: "/sitemap",
  });
}

function LinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="label-mono">{title}</h2>
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href} className="border-b border-stone">
            <Link
              href={link.href}
              className="block py-2.5 text-body-sm text-smoke transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function HtmlSitemapPage() {
  const [nav, schemes, posts] = await Promise.all([
    getNavigation(),
    getSchemes(),
    getBlogPosts(),
  ]);

  const legalGroup = nav.footer.find((group) => group.id === "legal");

  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every page, in one list"
        description="Quickly find what you are looking for."
      />

      <Section>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <LinkList title="Main navigation" links={nav.primary} />
          <LinkList title="Legal" links={legalGroup?.links ?? []} />
          <LinkList
            title="Schemes"
            links={schemes.map((scheme) => ({
              label: scheme.code,
              href: `/schemes/${scheme.slug}`,
            }))}
          />
          <LinkList
            title="Articles"
            links={posts.map((post) => ({
              label: post.title,
              href: `/blog/${post.slug}`,
            }))}
          />
        </div>
      </Section>
    </>
  );
}
