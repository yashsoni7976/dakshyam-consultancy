import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PageTransition } from "./page-transition";

const { usePathname, useReducedMotion } = vi.hoisted(() => ({
  usePathname: vi.fn(() => "/"),
  useReducedMotion: vi.fn(() => false),
}));
vi.mock("next/navigation", () => ({ usePathname }));
vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  useReducedMotion,
}));

describe("PageTransition", () => {
  it("renders its children", async () => {
    render(
      <PageTransition>
        <p>Page body</p>
      </PageTransition>,
    );
    expect(await screen.findByText("Page body")).toBeInTheDocument();
  });

  it("never hides content behind opacity:0 in the server HTML", async () => {
    // The guarantee is about what ships before hydration: `initial={{opacity:0}}`
    // in the server HTML would leave the page blank for anyone whose JS is slow
    // or blocked. That path only runs under a real server render, so assert on
    // renderToStaticMarkup rather than on a jsdom client render.
    const { renderToStaticMarkup } = await import("react-dom/server");
    const html = renderToStaticMarkup(
      <PageTransition>
        <p>Page body</p>
      </PageTransition>,
    );
    expect(html).toContain("Page body");
    expect(html).not.toMatch(/opacity:\s*0(?!\.)/);
  });

  it("respects a reduced-motion preference", async () => {
    useReducedMotion.mockReturnValue(true);
    const { container } = render(
      <PageTransition>
        <p>Page body</p>
      </PageTransition>,
    );
    await screen.findByText("Page body");
    expect(container.innerHTML).not.toContain("opacity: 0");
    useReducedMotion.mockReturnValue(false);
  });

  it("remounts the wrapper when the route changes, so the fade re-runs", async () => {
    const { rerender, container } = render(
      <PageTransition>
        <p>One</p>
      </PageTransition>,
    );
    await screen.findByText("One");
    const first = container.querySelector("div");

    usePathname.mockReturnValue("/about");
    rerender(
      <PageTransition>
        <p>Two</p>
      </PageTransition>,
    );
    await screen.findByText("Two");
    expect(container.querySelector("div")).not.toBe(first);
  });
});
