import type { MetadataRoute } from "next";
import { getSchemes, getSiteIdentity } from "@/lib/content";

/**
 * Sitemap generated from the content repository, so a new scheme or post is
 * indexed without anyone remembering to edit an XML file.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, schemes] = await Promise.all([getSiteIdentity(), getSchemes()]);

  const url = (path: string) => new URL(path, site.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/schemes"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.8 },
    // { url: url("/work-showcase"), changeFrequency: "weekly", priority: 0.7 },
    { url: url("/success-stories"), changeFrequency: "weekly", priority: 0.7 },
    // { url: url("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.7 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/refund"), changeFrequency: "yearly", priority: 0.3 },
    { url: url("/legal"), changeFrequency: "yearly", priority: 0.3 },
  ];

  return [
    ...staticRoutes,
    ...schemes.map((scheme) => ({
      url: url(`/schemes/${scheme.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // ...posts.map((post) => ({
    //   url: url(`/blog/${post.slug}`),
    //   lastModified: post.updatedAt ?? post.publishedAt,
    //   changeFrequency: "monthly" as const,
    //   priority: 0.6,
    // })),
  ];
}
