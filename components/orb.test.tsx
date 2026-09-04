import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Orb, OrbCluster } from "./orb";

/**
 * The two sparks are permitted here and nowhere else in the system. Match the
 * channels only: jsdom normalises hex to spaced `rgb()`, and each recipe uses
 * the sparks at whatever alpha suits it.
 */
const VIOLET = "4, 71, 255";
const EMBER = "255, 71, 4";

describe("Orb", () => {
  it("is decorative, so the whole thing is hidden from assistive technology", () => {
    const { container } = render(<Orb />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("is not interactive", () => {
    const { container } = render(<Orb />);
    expect(container.firstChild).toHaveClass("pointer-events-none", "aspect-square");
  });

  it.each(["sandstone", "ember", "dusk"] as const)("paints the %s recipe", (variant) => {
    const { container } = render(<Orb variant={variant} />);
    const sphere = container.querySelectorAll("div > div")[1] as HTMLElement;
    expect(sphere.style.background).toContain("radial-gradient");
  });

  it("defaults to the sandstone recipe", () => {
    const { container: a } = render(<Orb />);
    const { container: b } = render(<Orb variant="sandstone" />);
    const styleOf = (root: HTMLElement) =>
      (root.querySelectorAll("div > div")[1] as HTMLElement).style.background;
    expect(styleOf(a as HTMLElement)).toBe(styleOf(b as HTMLElement));
  });

  it("keeps a violet note in the shadow so the artwork is not monotone", () => {
    const { container } = render(<Orb variant="sandstone" />);
    expect(container.innerHTML).toContain(VIOLET);
  });

  it("renders the ember spark at full saturation, as only artwork may", () => {
    const { container } = render(<Orb variant="ember" />);
    expect(container.innerHTML).toContain(EMBER);
  });

  it("drops the halo layer when blur is off", () => {
    const withBlur = render(<Orb />).container.querySelectorAll("div > div");
    const withoutBlur = render(<Orb blur={false} />).container.querySelectorAll("div > div");
    expect(withoutBlur.length).toBe(withBlur.length - 1);
  });

  it("accepts sizing classes from the caller", () => {
    const { container } = render(<Orb className="w-32" />);
    expect(container.firstChild).toHaveClass("w-32");
  });
});

describe("OrbCluster", () => {
  it("renders three spheres at unequal sizes", () => {
    const { container } = render(<OrbCluster />);
    const orbs = container.querySelectorAll("[aria-hidden='true'].aspect-square");
    expect(orbs).toHaveLength(3);
    const widths = [...orbs].map((orb) => orb.className.match(/w-\d+/)?.[0]);
    expect(new Set(widths).size).toBe(3);
  });

  it("hides the whole composition from assistive technology", () => {
    const { container } = render(<OrbCluster />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
