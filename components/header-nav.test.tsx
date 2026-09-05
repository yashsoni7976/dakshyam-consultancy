import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NavLink } from "@/lib/content/types";
import { HeaderNav } from "./header-nav";

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn(() => "/") }));
vi.mock("next/navigation", () => ({ usePathname }));

const links: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Schemes", href: "/schemes" },
  { label: "Contact Us", href: "/contact" },
];

function setup(pathname = "/") {
  usePathname.mockReturnValue(pathname);
  return render(
    <HeaderNav logoSrc="/brand/logo.png" logoAlt="Dakshyam Consultancy" links={links} />,
  );
}

/** The desktop nav and the mobile nav both render every link. */
const desktopNav = () => screen.getAllByRole("navigation", { name: "Primary" })[0];

describe("HeaderNav", () => {
  beforeEach(() => usePathname.mockReturnValue("/"));

  it("renders the logo as a link home", () => {
    setup();
    expect(
      screen.getAllByRole("link", { name: "Dakshyam Consultancy" })[0],
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("img", { name: "Dakshyam Consultancy" })).toHaveAttribute(
      "src",
      "/brand/logo.png",
    );
  });

  it("marks the current route with aria-current", () => {
    setup("/schemes");
    const current = within(desktopNav()).getByRole("link", { name: "Schemes" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(within(desktopNav()).getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("highlights the active nav link with brand text only", () => {
    setup("/schemes");
    const active = within(desktopNav()).getByRole("link", { name: "Schemes" });
    const cta = screen.getByRole("link", { name: "Free consultation" });
    expect(active).toHaveClass("text-brand", "font-semibold");
    expect(active).not.toHaveClass("bg-brand");
    expect(cta).toHaveClass("bg-brand", "text-white");
  });

  it("matches home exactly, so every route does not light it up", () => {
    setup("/schemes");
    expect(within(desktopNav()).getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("treats a nested route as inside its section", () => {
    setup("/schemes/pmegp");
    expect(within(desktopNav()).getByRole("link", { name: "Schemes" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("renders a single consultation CTA on desktop", () => {
    setup();
    expect(screen.getByRole("link", { name: "Free consultation" })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("keeps the mobile menu closed until the toggle is pressed", async () => {
    setup();
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-nav");

    await userEvent.click(toggle);
    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("closes the menu again on a second press", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    await userEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes the menu when the route changes, without flashing it open", async () => {
    const { rerender } = setup();
    await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    usePathname.mockReturnValue("/contact");
    rerender(
      <HeaderNav
        logoSrc="/brand/logo.png"
        logoAlt="Dakshyam Consultancy"
        links={links}
      />,
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("hides the mobile nav from the tree while collapsed", () => {
    const { container } = setup();
    expect(container.querySelector("#mobile-nav")).toHaveAttribute("hidden");
  });
});
