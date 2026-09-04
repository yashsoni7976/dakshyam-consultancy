import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MarkdownLite } from "./markdown-lite";

describe("MarkdownLite", () => {
  it("renders paragraphs split on blank lines", () => {
    const { container } = render(<MarkdownLite source={"First para.\n\nSecond para."} />);
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent("First para.");
  });

  it("renders `## ` as a level-2 heading", () => {
    render(<MarkdownLite source="## Eligibility" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Eligibility");
  });

  it("renders a `- ` block as a list", () => {
    render(<MarkdownLite source={"- One\n- Two\n- Three"} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders **bold** as a strong span inside prose", () => {
    const { container } = render(<MarkdownLite source="Claim **35% subsidy** now." />);
    const strong = container.querySelector("strong")!;
    expect(strong).toHaveTextContent("35% subsidy");
    expect(container.querySelector("p")).toHaveTextContent("Claim 35% subsidy now.");
  });

  it("renders bold inside list items too", () => {
    const { container } = render(<MarkdownLite source={"- **PMEGP** subsidy"} />);
    expect(container.querySelector("li strong")).toHaveTextContent("PMEGP");
  });

  it("drops blank blocks and handles an empty source", () => {
    const { container } = render(<MarkdownLite source={"\n\n   \n\n"} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves an unmatched asterisk as literal text", () => {
    render(<MarkdownLite source="Rates are 3%* per annum." />);
    expect(screen.getByText(/3%\* per annum/)).toBeInTheDocument();
  });

  it("renders a realistic mixed document in order", () => {
    const { container } = render(
      <MarkdownLite
        source={"Intro line.\n\n## Benefits\n\n- **A** thing\n- B thing\n\nClosing line."}
      />,
    );
    const tags = [...container.children].map((node) => node.tagName);
    expect(tags).toEqual(["P", "H2", "UL", "P"]);
  });
});
