import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { MarkdownLite } from "@/components/markdown-lite";
import { CtaBanner, Section } from "@/components/ui";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.coverImage?.src,
  });
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  return (
    <>
      <div className="border-b border-stone">
        <div className="container-page pb-16 pt-10 sm:pb-20 sm:pt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-body-sm text-smoke transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All articles
          </Link>
          <div className="mt-10 flex max-w-3xl flex-col gap-5">
            <time dateTime={post.publishedAt} className="label-mono">
              {formatDate(post.publishedAt)} · {post.author}
            </time>
            <h1 className="display-type text-heading text-ink sm:text-display">
              {post.title}
            </h1>
            <p className="text-body-lg text-smoke">{post.excerpt}</p>
          </div>
        </div>
      </div>

      <Section>
        <article className="prose-doc">
          <MarkdownLite source={post.body} />
        </article>
      </Section>

      <CtaBanner
        title="Want this applied to your project?"
        description="We will check your eligibility against the current guidelines and tell you what the claim is worth."
        primary={{ label: "Talk to an expert", href: "/contact" }}
      />
    </>
  );
}
