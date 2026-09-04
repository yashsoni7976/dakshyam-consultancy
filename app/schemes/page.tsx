import type { Metadata } from "next";
import { SchemeExplorer } from "@/components/scheme-explorer";
import { CtaBanner, PageHero, Section } from "@/components/ui";
import { getSchemeSectors, getSchemes } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Government Schemes & Subsidies in Rajasthan",
    description:
      "Search central and state government subsidy schemes open to Rajasthan MSMEs — PMEGP, PMFME, RIPS 2024, BRUPY, MYSY, VYUPY and more, with eligibility and official guidelines.",
    path: "/schemes",
  });
}

export default async function SchemesPage() {
  const [schemes, sectors] = await Promise.all([getSchemes(), getSchemeSectors()]);

  return (
    <>
      <PageHero
        eyebrow="Scheme explorer"
        title="Find the scheme your project qualifies for"
        description="Central and state programmes open to Rajasthan enterprises, with the benefit, the eligibility test and the official guideline document for each."
      />

      <Section>
        <SchemeExplorer schemes={schemes} sectors={sectors} />
      </Section>

      <CtaBanner
        title="Still not sure which one fits?"
        description="Eligibility often turns on details a filter cannot see — constitution of the entity, promoter category, where the land sits. Send us the project outline and we will map it properly."
        primary={{ label: "Get free expert advice", href: "/contact" }}
      />
    </>
  );
}
