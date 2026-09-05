import type { Metadata, Viewport } from "next";
import { Hedvig_Letters_Serif, Inter } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteIdentity } from "@/lib/content";
import { buildOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

/** Inter — all UI and body text. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Hedvig Letters Serif — display and section headlines (variable font). */
const hedvigSerif = Hedvig_Letters_Serif({
  variable: "--font-hedvig-letters-serif",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteIdentity();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    formatDetection: { telephone: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#f9fbf2",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = await buildOrganizationJsonLd();

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${hedvigSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-deep-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-6 focus:left-6 focus:z-50 focus:rounded-full focus:bg-deep-ink focus:px-4 focus:py-2.5 focus:text-body-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
