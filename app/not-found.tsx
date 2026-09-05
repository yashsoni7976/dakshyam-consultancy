import { HeroVisual } from "@/components/orb";
import { ButtonLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="container-page section-y">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="flex max-w-xl flex-col gap-6">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="serif-type text-heading text-deep-ink sm:text-display">
            We could not find that page
          </h1>
          <p className="text-subheading text-slate">
            The link may be out of date, or the page may have moved. The sitemap lists
            everything on this site.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/schemes" variant="secondary">
              Browse schemes
            </ButtonLink>
            <ButtonLink href="/sitemap" variant="ghost">
              View sitemap
            </ButtonLink>
          </div>
        </div>
        <HeroVisual className="max-w-sm justify-self-center" />
      </div>
    </div>
  );
}
