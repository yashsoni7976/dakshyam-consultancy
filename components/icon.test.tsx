import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./icon";

describe("Icon", () => {
  it("resolves a known name to an svg", () => {
    const { container } = render(<Icon name="wheat" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders nothing for an unknown name rather than crashing the page", () => {
    const { container } = render(<Icon name="not-an-icon" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("is decorative, so it is hidden from assistive technology", () => {
    const { container } = render(<Icon name="landmark" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the default size class and honours an override", () => {
    const { container: a } = render(<Icon name="rocket" />);
    expect(a.querySelector("svg")).toHaveClass("size-5");

    const { container: b } = render(<Icon name="rocket" className="size-8" />);
    expect(b.querySelector("svg")).toHaveClass("size-8");
  });

  it("covers every name the content layer can emit", async () => {
    const { schemes } = await import("@/content/data/schemes");
    const { services } = await import("@/content/data/services");
    const { home } = await import("@/content/data/home");

    const names = new Set<string>([
      ...services.map((service) => service.icon),
      ...home.sectors.items.map((item) => item.icon),
    ]);
    expect(schemes.length).toBeGreaterThan(0);

    for (const name of names) {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg"), `missing icon: ${name}`).toBeInTheDocument();
    }
  });
});
