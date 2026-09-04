import { getNavigation, getSiteIdentity } from "@/lib/content";
import { HeaderNav } from "./header-nav";

export async function SiteHeader() {
  const [site, nav] = await Promise.all([getSiteIdentity(), getNavigation()]);

  return (
    <HeaderNav
      siteName={site.name}
      logoSrc={site.logo.src}
      links={nav.primary}
      phoneE164={site.phoneE164}
      phoneDisplay={site.phoneDisplay}
    />
  );
}
