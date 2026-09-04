import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icon";
import {
  ButtonLink,
  CtaBanner,
  IconPlate,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/ui";
import { getServices } from "@/lib/content";
import type { Service } from "@/lib/content/types";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Services",
    description:
      "Subsidy consulting, project finance, MSME documentation, registrations and ongoing compliance for businesses in Rajasthan.",
    path: "/services",
  });
}

/**
 * Services sit in a hairline-gapped grid rather than separate cards — the
 * whole block reads as one panel, which keeps a six-item list calm. Both
 * categories hold exactly six, so no partial row can leave a filled hole.
 */
function ServiceGrid({
  services,
  surface,
}: {
  services: Service[];
  /** Which band the grid sits on, so the tile fill matches it. */
  surface: "canvas" | "taupe";
}) {
  const tile = surface === "taupe" ? "bg-taupe" : "bg-eggshell";

  return (
    <ul className="mt-12 grid gap-px overflow-hidden rounded-card bg-stone sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.slug} className={`flex flex-col gap-5 p-6 sm:p-8 ${tile}`}>
          <IconPlate>
            <Icon name={service.icon} />
          </IconPlate>
          <h3 className="text-subheading font-medium text-ink">{service.title}</h3>
          <p className="text-body-sm text-smoke">{service.description}</p>
          <a
            href={service.externalUrl ?? "/contact"}
            {...(service.externalUrl
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 hover:decoration-sandstone-deep"
          >
            Get started
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  const advisory = services.filter((service) => service.category === "advisory");
  const compliance = services.filter((service) => service.category === "compliance");

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything between an idea and a disbursement"
        description="Subsidy liaising, project reports, debt syndication and the statutory work that has to sit underneath all of it."
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact">Schedule a free consultation</ButtonLink>
          <ButtonLink href="/schemes" variant="secondary">
            See which schemes you qualify for
          </ButtonLink>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Advisory"
          title="Funding and growth"
          description="The core engagement: working out what your project can claim, and building the file that claims it."
        />
        <ServiceGrid services={advisory} surface="canvas" />
      </Section>

      <Section tone="taupe" divider>
        <SectionHeading
          eyebrow="Compliance"
          title="Registrations and statutory work"
          description="A subsidy claim only survives if the entity behind it is clean. These keep it that way."
        />
        <ServiceGrid services={compliance} surface="taupe" />
      </Section>

      <CtaBanner
        title="Need something that is not listed?"
        description="Most of our work starts as a question we have not written a service page for. Describe the problem and we will tell you whether we can help."
        primary={{ label: "Talk to our experts", href: "/contact" }}
      />
    </>
  );
}
