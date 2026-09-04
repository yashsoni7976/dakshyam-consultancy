import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getNavigation, getSiteIdentity } from "@/lib/content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

/**
 * Both are async server components. They are ordinary async functions that
 * return an element, so awaiting them and handing the result to RTL exercises
 * the real content layer.
 */
describe("SiteHeader", () => {
  it("passes site identity and navigation down to the interactive shell", async () => {
    const [site, nav] = await Promise.all([getSiteIdentity(), getNavigation()]);
    render(await SiteHeader());

    expect(screen.getByRole("img", { name: site.logo.alt })).toBeInTheDocument();
    for (const link of nav.primary) {
      expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
    }
  });
});

describe("SiteFooter", () => {
  it("renders every footer navigation group as a labelled nav landmark", async () => {
    const nav = await getNavigation();
    render(await SiteFooter());

    for (const group of nav.footer) {
      const landmark = screen.getByRole("navigation", { name: group.title });
      for (const link of group.links) {
        expect(within(landmark).getByRole("link", { name: link.label })).toHaveAttribute(
          "href",
          link.href,
        );
      }
    }
  });

  it("renders contact details as actionable links", async () => {
    const site = await getSiteIdentity();
    render(await SiteFooter());

    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
    expect(screen.getByRole("link", { name: site.phoneDisplay })).toHaveAttribute(
      "href",
      `tel:${site.phoneE164}`,
    );
  });

  it("renders the head office address in an address element", async () => {
    const site = await getSiteIdentity();
    const head = site.offices.find((office) => office.isHeadOffice) ?? site.offices[0];
    const { container } = render(await SiteFooter());

    const address = container.querySelector("address")!;
    expect(address).toHaveTextContent(head.city);
    expect(address).toHaveTextContent(head.postalCode);
  });

  it("prints registration identifiers in the footer bar", async () => {
    const site = await getSiteIdentity();
    render(await SiteFooter());
    expect(screen.getByText(`CIN: ${site.registration.cin}`)).toBeInTheDocument();
    expect(screen.getByText(`GSTIN: ${site.registration.gstin}`)).toBeInTheDocument();
  });

  it("opens social profiles in a new tab, rel-safe", async () => {
    const site = await getSiteIdentity();
    render(await SiteFooter());

    for (const profile of site.social) {
      const link = screen.getByRole("link", { name: profile.label });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("carries the not-a-government-body disclaimer", async () => {
    const site = await getSiteIdentity();
    render(await SiteFooter());
    expect(screen.getByText(/Disclaimer:/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(site.disclaimer.slice(0, 40)))).toBeInTheDocument();
  });

  it("prints the current copyright year and the legal entity", async () => {
    const site = await getSiteIdentity();
    render(await SiteFooter());
    expect(
      screen.getByText(`© ${new Date().getFullYear()} ${site.legalName}`),
    ).toBeInTheDocument();
  });
});
