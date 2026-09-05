import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { getCopyrightYear, getNavigation, getSiteIdentity } from "@/lib/content";

export async function SiteFooter() {
  const [site, nav, year] = await Promise.all([
    getSiteIdentity(),
    getNavigation(),
    getCopyrightYear(),
  ]);

  const head = site.offices.find((office) => office.isHeadOffice) ?? site.offices[0];

  return (
    <footer className="mt-auto bg-soft-meadow">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex w-fit items-center">
            {/* eslint-disable-next-line @next/next/no-img-element -- logo is a raster asset of known aspect ratio */}
            <img src={site.logo.src} alt={site.logo.alt} className="h-7 w-auto" />
          </Link>
          <p className="max-w-xs text-body-sm text-slate">{site.description}</p>
          <ul className="flex flex-wrap gap-2">
            {site.social.map((profile) => (
              <li key={profile.id}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-canvas px-3 py-1.5 text-caption font-medium tracking-tight text-slate uppercase transition-colors hover:text-deep-ink"
                >
                  {profile.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {nav.footer.map((group) => (
          <nav key={group.id} aria-labelledby={`footer-${group.id}`}>
            <h2 id={`footer-${group.id}`} className="label-caps">
              {group.title}
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-slate transition-colors hover:text-deep-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="label-caps">Contact</h2>
          <ul className="mt-5 flex flex-col gap-3 text-body-sm text-slate">
            <li className="flex items-start gap-2.5">
              <Mail className="mt-1 size-3.5 shrink-0 text-slate" aria-hidden="true" />
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-deep-ink"
              >
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-1 size-3.5 shrink-0 text-slate" aria-hidden="true" />
              <a
                href={`tel:${site.phoneE164}`}
                className="transition-colors hover:text-deep-ink"
              >
                {site.phoneDisplay}
              </a>
            </li>
            {head ? (
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-1 size-3.5 shrink-0 text-slate"
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {head.addressLines.join(", ")}
                  <br />
                  {head.city}, {head.state} {head.postalCode}
                </address>
              </li>
            ) : null}
            <li className="pt-1">{site.openingHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-5 py-8">
          <p className="max-w-4xl text-caption leading-relaxed text-slate">
            <span className="font-medium text-deep-ink">Disclaimer:</span>{" "}
            {site.disclaimer}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-caption text-slate">
            <span>
              © {year} {site.legalName}
            </span>
            <span>CIN: {site.registration.cin}</span>
            <span>GSTIN: {site.registration.gstin}</span>
            {nav.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-deep-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
