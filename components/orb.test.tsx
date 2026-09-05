import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroVisual, Orb, OrbCluster } from "./orb";

describe("HeroVisual", () => {
  it("is decorative, so the whole thing is hidden from assistive technology", () => {
    const { container } = render(<HeroVisual />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("renders organic blob shapes in the decorative palette", () => {
    const { container } = render(<HeroVisual />);
    const fills = [...container.querySelectorAll("path")].map((path) =>
      path.getAttribute("fill"),
    );
    expect(fills).toContain("#59e25d");
    expect(fills).toContain("#e261e5");
    expect(fills).toContain("#ffe228");
    expect(fills).toContain("#130e30");
  });

  it("floats a white product card above the blobs", () => {
    const { container } = render(<HeroVisual />);
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });

  it("accepts sizing classes from the caller", () => {
    const { container } = render(<HeroVisual className="max-w-md" />);
    expect(container.firstChild).toHaveClass("max-w-md");
  });
});

describe("OrbCluster", () => {
  it("delegates to HeroVisual", () => {
    const { container } = render(<OrbCluster />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });
});

describe("Orb", () => {
  it("delegates to HeroVisual for backward compatibility", () => {
    const { container } = render(<Orb />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
