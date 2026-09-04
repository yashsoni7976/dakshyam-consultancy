import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Card, PageHero, Section } from "@/components/ui";
import { getSiteIdentity } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Contact Us",
    description:
      "Talk to our subsidy and project finance consultants. Free first eligibility review for Rajasthan businesses.",
    path: "/contact",
  });
}

/** One row of the "reach us directly" list. */
function ChannelRow({
  icon: ChannelIcon,
  label,
  value,
  href,
  external,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const body = (
    <>
      <ChannelIcon className="mt-0.5 size-4 shrink-0 text-ash" aria-hidden="true" />
      <span className="flex flex-col gap-0.5">
        <span className="text-body-sm font-medium text-ink">{label}</span>
        <span className="text-body-sm text-smoke">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return <li className="flex items-start gap-3 py-4">{body}</li>;
  }

  return (
    <li className="border-b border-stone last:border-0">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="flex items-start gap-3 py-4 transition-opacity hover:opacity-70"
      >
        {body}
      </a>
    </li>
  );
}

export default async function ContactPage() {
  const site = await getSiteIdentity();
  const whatsapp = `https://wa.me/${site.phoneE164.replace(/\D/g, "")}?text=${encodeURIComponent(site.whatsappMessage)}`;

  const consentText = `I consent to ${site.name} collecting and processing the personal data in this form for the purpose of business consultancy and subsidy assistance, in accordance with the DPDP Act 2023 and the`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building"
        description="The first eligibility review is free. Send the project outline and we will come back with the schemes it qualifies for and what they are worth."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <h2 className="display-type text-heading-xs text-ink">Send us a message</h2>
            <p className="mt-2 text-body-sm text-smoke">We reply within one working day.</p>
            <div className="mt-8">
              <ContactForm consentText={consentText} />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Card className="flex flex-col gap-2">
              <h2 className="label-mono">Reach us directly</h2>
              <ul className="flex flex-col">
                <ChannelRow
                  icon={MessageCircle}
                  label="WhatsApp"
                  value="Fastest response"
                  href={whatsapp}
                  external
                />
                <ChannelRow
                  icon={Phone}
                  label="Call us"
                  value={site.phoneDisplay}
                  href={`tel:${site.phoneE164}`}
                />
                <ChannelRow
                  icon={Mail}
                  label="Email us"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <ChannelRow
                  icon={Clock}
                  label="Working hours"
                  value={site.openingHours}
                />
              </ul>
            </Card>

            {site.offices.map((office) => (
              <Card key={office.id} className="flex flex-col gap-3">
                <h2 className="label-mono">{office.label}</h2>
                <address className="flex items-start gap-3 text-body-sm not-italic text-smoke">
                  <MapPin className="mt-1 size-3.5 shrink-0 text-ash" aria-hidden="true" />
                  <span>
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="block">
                      {office.city}, {office.state} {office.postalCode}
                    </span>
                  </span>
                </address>
                {office.mapUrl ? (
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 hover:decoration-sandstone-deep"
                  >
                    View on map
                  </a>
                ) : null}
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
