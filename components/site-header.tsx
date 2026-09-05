import { getNavigation, getSiteIdentity } from "@/lib/content";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  const [site, nav] = await Promise.all([getSiteIdentity(), getNavigation()]);

  return (
    <HeaderNav logoSrc={site.logo.src} logoAlt={site.logo.alt} links={nav.primary} />
  );
}
