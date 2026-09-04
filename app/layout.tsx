import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteIdentity } from "@/lib/content";
import { buildOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

/**
 * Inter carries the whole system. It runs at 400/500 for body, nav and
 * buttons, and at 300 as the substitute for Waldenburg on display headlines —
 * the whisper weight the design leans on for authority.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

/** Technical micro-copy only — section labels and metadata. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteIdentity();
  return {
    metadataBase: new URL(site.url),
    // Every page title becomes "<page> | Dakshyam Consultancy" unless it opts out.
    title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
    description: site.description,
    applicationName: site.name,
    formatDetection: { telephone: true },
  };
}

/** Light is the whole system; there is no dark variant to advertise. */
export const viewport: Viewport = {
  themeColor: "#fdfcfc",
  colorScheme: "light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = await buildOrganizationJsonLd();

  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-eggshell font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2.5 focus:text-body-sm focus:font-medium focus:text-eggshell"
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
          // Serialised server-side from trusted, in-repo content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
