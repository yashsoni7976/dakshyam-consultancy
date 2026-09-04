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
    <HeaderNav
      siteName="Dakshyam Consulting"
      logoSrc="/brand/logo.svg"
      links={links}
      phoneE164="+910000000000"
      phoneDisplay="+91 00000 00000"
    />,
  );
}

/** The desktop nav and the mobile nav both render every link. */
const desktopNav = () => screen.getAllByRole("navigation", { name: "Primary" })[0];

describe("HeaderNav", () => {
  beforeEach(() => usePathname.mockReturnValue("/"));

  it("renders the wordmark as a link home, with a decorative logo", () => {
    const { container } = setup();
    expect(screen.getAllByRole("link", { name: /Dakshyam Consulting/ })[0]).toHaveAttribute(
      "href",
      "/",
    );
    expect(container.querySelector("img")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("marks the current route with aria-current", () => {
    setup("/schemes");
    const current = within(desktopNav()).getByRole("link", { name: "Schemes" });
    expect(current).toHaveAttribute("aria-current", "page");
    expect(within(desktopNav()).getByRole("link", { name: "Home" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("tints the active pill with the accent wash", () => {
    setup("/schemes");
    expect(within(desktopNav()).getByRole("link", { name: "Schemes" })).toHaveClass(
      "bg-sandstone-wash",
      "text-sandstone-deep",
    );
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

  it("renders a tel: link for the phone number", () => {
    setup();
    expect(screen.getAllByRole("link", { name: /\+91 00000 00000/ })[0]).toHaveAttribute(
      "href",
      "tel:+910000000000",
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
        siteName="Dakshyam Consulting"
        logoSrc="/brand/logo.svg"
        links={links}
        phoneE164="+910000000000"
        phoneDisplay="+91 00000 00000"
      />,
    );
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("hides the mobile nav from the tree while collapsed", () => {
    const { container } = setup();
    expect(container.querySelector("#mobile-nav")).toHaveAttribute("hidden");
  });
});
