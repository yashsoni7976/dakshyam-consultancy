import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CtaBanner,
  Divider,
  EmptyState,
  Eyebrow,
  IconPlate,
  PageHero,
  Section,
  SectionHeading,
  StatRow,
  Tag,
  TextLink,
  cx,
} from "./ui";

describe("cx", () => {
  it("joins truthy class names and drops the rest", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
    expect(cx()).toBe("");
  });
});

describe("Section", () => {
  it("renders on the canvas with no band fill by default", () => {
    const { container } = render(<Section>body</Section>);
    const section = container.querySelector("section")!;
    expect(section).toHaveClass("section-y");
    expect(section).not.toHaveClass("bg-taupe");
    expect(section).not.toHaveClass("border-t");
  });

  it("takes the taupe band and an optional hairline", () => {
    const { container } = render(
      <Section tone="taupe" divider>
        body
      </Section>,
    );
    const section = container.querySelector("section")!;
    expect(section).toHaveClass("bg-taupe", "border-t", "border-stone");
  });

  it("wraps content in the shared page column", () => {
    const { container } = render(<Section>body</Section>);
    expect(container.querySelector(".container-page")).toHaveTextContent("body");
  });

  it("forwards arbitrary section attributes", () => {
    const { container } = render(<Section id="impact" aria-label="Impact" />);
    expect(container.querySelector("section")).toHaveAttribute("id", "impact");
  });
});

describe("Divider", () => {
  it("renders a stone hairline rule", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toHaveClass("border-t", "border-stone");
  });
});

describe("Eyebrow", () => {
  it("carries the sandstone accent, unlike the bare label utility", () => {
    render(<Eyebrow>Track record</Eyebrow>);
    const el = screen.getByText("Track record");
    expect(el).toHaveClass("label-mono", "text-sandstone-deep");
  });
});

describe("SectionHeading", () => {
  it("renders a level-2 heading in the display weight", () => {
    render(<SectionHeading title="Real impact" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Real impact" });
    expect(heading).toHaveClass("display-type");
  });

  it("renders the eyebrow and description only when supplied", () => {
    const { rerender } = render(<SectionHeading title="T" />);
    expect(screen.queryByText("Funding")).not.toBeInTheDocument();

    rerender(<SectionHeading eyebrow="Funding" title="T" description="D" />);
    expect(screen.getByText("Funding")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("centres when asked", () => {
    const { container } = render(<SectionHeading title="T" align="center" />);
    expect(container.firstChild).toHaveClass("items-center", "text-center");
  });
});

describe("PageHero", () => {
  it("renders exactly one level-1 heading", () => {
    render(<PageHero title="About us" />);
    expect(screen.getByRole("heading", { level: 1, name: "About us" })).toBeInTheDocument();
  });

  it("renders eyebrow, description, children and aside when given", () => {
    render(
      <PageHero eyebrow="About" title="T" description="D" aside={<i data-testid="aside" />}>
        <span data-testid="child" />
      </PageHero>,
    );
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("aside")).toBeInTheDocument();
  });

  it("omits the optional slots when they are absent", () => {
    const { container } = render(<PageHero title="T" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });
});

describe("ButtonLink", () => {
  it("renders an internal link with the filled pill by default", () => {
    render(<ButtonLink href="/contact">Talk to us</ButtonLink>);
    const link = screen.getByRole("link", { name: "Talk to us" });
    expect(link).toHaveAttribute("href", "/contact");
    expect(link).toHaveClass("rounded-full", "bg-ink");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens external links safely", () => {
    render(
      <ButtonLink href="https://example.com" external>
        Guidelines
      </ButtonLink>,
    );
    const link = screen.getByRole("link", { name: "Guidelines" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it.each(["primary", "secondary", "ghost", "inverse", "inverseOutline"] as const)(
    "renders the %s variant",
    (variant) => {
      render(
        <ButtonLink href="/x" variant={variant}>
          {variant}
        </ButtonLink>,
      );
      expect(screen.getByRole("link", { name: variant })).toBeInTheDocument();
    },
  );

  it.each(["sm", "md", "lg"] as const)("renders the %s size", (size) => {
    render(
      <ButtonLink href="/x" size={size}>
        {size}
      </ButtonLink>,
    );
    expect(screen.getByRole("link", { name: size })).toBeInTheDocument();
  });
});

describe("Button", () => {
  it("fires its click handler", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Send</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire while disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Send
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("passes through the button type", () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});

describe("TextLink", () => {
  it("renders an accented underlined link", () => {
    render(<TextLink href="/schemes">All schemes</TextLink>);
    expect(screen.getByRole("link", { name: "All schemes" })).toHaveClass(
      "text-sandstone-deep",
      "underline",
    );
  });

  it("marks external links rel-safe", () => {
    render(
      <TextLink href="https://example.com" external>
        Source
      </TextLink>,
    );
    expect(screen.getByRole("link", { name: "Source" })).toHaveAttribute(
      "rel",
      "noopener noreferrer",
    );
  });
});

describe("Card", () => {
  it("is a flat taupe panel with no border or shadow by default", () => {
    const { container } = render(<Card>content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("rounded-card", "bg-taupe");
    expect(card.className).not.toMatch(/shadow|border/);
  });

  it.each([
    ["raised", "shadow-whisper"],
    ["outline", "border"],
  ] as const)("renders the %s tone", (tone, expected) => {
    const { container } = render(<Card tone={tone}>c</Card>);
    expect(container.firstChild).toHaveClass(expected);
  });

  it("uses the larger radius at the large size", () => {
    const { container } = render(
      <Card size="lg">c</Card>,
    );
    expect(container.firstChild).toHaveClass("rounded-card-lg");
  });

  it("accepts the small size and extra classes", () => {
    const { container } = render(
      <Card size="sm" className="custom">
        c
      </Card>,
    );
    expect(container.firstChild).toHaveClass("p-5", "custom");
  });
});

describe("IconPlate", () => {
  it("tints the plate with the accent wash", () => {
    render(
      <IconPlate>
        <svg data-testid="glyph" />
      </IconPlate>,
    );
    expect(screen.getByTestId("glyph").parentElement).toHaveClass(
      "bg-sandstone-wash",
      "text-sandstone-deep",
    );
  });
});

describe("Tag", () => {
  it("renders a neutral outlined pill", () => {
    render(<Tag>Agro</Tag>);
    expect(screen.getByText("Agro")).toHaveClass("rounded-full", "border-stone");
  });
});

describe("Badge", () => {
  it("marks central schemes with a filled accent dot", () => {
    const { container } = render(<Badge tone="central">Central Govt</Badge>);
    expect(container.querySelector("span span")).toHaveClass("bg-sandstone-deep");
  });

  it("marks state schemes with a hollow ring instead of a second colour", () => {
    const { container } = render(<Badge tone="state">State Govt</Badge>);
    const dot = container.querySelector("span span")!;
    expect(dot).toHaveClass("ring-sandstone");
    expect(dot).not.toHaveClass("bg-sandstone-deep");
  });

  it("defaults to the neutral dot", () => {
    const { container } = render(<Badge>PMEGP</Badge>);
    expect(container.querySelector("span span")).toHaveClass("bg-ash");
  });

  it("hides the dot from assistive technology", () => {
    const { container } = render(<Badge>PMEGP</Badge>);
    expect(container.querySelector("span span")).toHaveAttribute("aria-hidden", "true");
  });
});

describe("StatRow", () => {
  const stats = [
    { id: "a", value: "120+", label: "Units served", description: "Across Rajasthan." },
    { id: "b", value: "₹48 Cr", label: "Subsidy secured" },
  ];

  it("renders each stat as a definition pair", () => {
    render(<StatRow stats={stats} />);
    expect(screen.getByText("120+").tagName).toBe("DD");
    expect(screen.getByText("Units served").tagName).toBe("DT");
    expect(screen.getByText("Across Rajasthan.")).toBeInTheDocument();
  });

  it("omits the description when a stat has none", () => {
    const { container } = render(<StatRow stats={[stats[1]]} />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });

  it("rules each cell rather than filling a grid, so a partial row leaves no hole", () => {
    const { container } = render(<StatRow stats={stats} />);
    for (const cell of container.querySelectorAll("dl > div")) {
      expect(cell).toHaveClass("border-t", "border-stone");
    }
    expect(container.querySelector("dl")).not.toHaveClass("bg-stone");
  });

  it("renders nothing but the list when handed no stats", () => {
    const { container } = render(<StatRow stats={[]} />);
    expect(container.querySelectorAll("dl > div")).toHaveLength(0);
  });
});

describe("EmptyState", () => {
  it("explains what will appear rather than looking broken", () => {
    render(<EmptyState title="No articles yet" description="We are writing them." />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("No articles yet");
    expect(screen.getByText("We are writing them.")).toBeInTheDocument();
  });

  it("renders an action only when one is supplied", () => {
    const { rerender } = render(<EmptyState title="T" description="D" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    rerender(
      <EmptyState title="T" description="D" action={{ label: "Browse", href: "/schemes" }} />,
    );
    expect(screen.getByRole("link", { name: "Browse" })).toHaveAttribute("href", "/schemes");
  });
});

describe("CtaBanner", () => {
  const props = {
    title: "Not sure which scheme fits?",
    description: "Send us your outline.",
    primary: { label: "Get advice", href: "/contact" },
  };

  it("renders on the warm ink panel", () => {
    const { container } = render(<CtaBanner {...props} />);
    expect(container.querySelector(".bg-ink-warm")).toBeInTheDocument();
  });

  it("renders the primary action, and the secondary only when given", () => {
    const { rerender } = render(<CtaBanner {...props} />);
    expect(screen.getByRole("link", { name: "Get advice" })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);

    rerender(<CtaBanner {...props} secondary={{ label: "Browse", href: "/schemes" }} />);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("hides the decorative spark from assistive technology", () => {
    const { container } = render(<CtaBanner {...props} />);
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
  });
});
