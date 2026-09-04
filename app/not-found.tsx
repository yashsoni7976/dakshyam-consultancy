import { Orb } from "@/components/orb";
import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page section-y">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex max-w-xl flex-col gap-6">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="display-type text-heading text-ink sm:text-display">
            We could not find that page
          </h1>
          <p className="text-body-lg text-smoke">
            The link may be out of date, or the page may have moved. The sitemap lists
            everything on this site.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/schemes" variant="secondary">
              Browse schemes
            </ButtonLink>
            <ButtonLink href="/sitemap" variant="ghost">
              View sitemap
            </ButtonLink>
          </div>
        </div>
        <Orb variant="dusk" className="w-40 justify-self-center sm:w-56" />
      </div>
    </div>
  );
}
