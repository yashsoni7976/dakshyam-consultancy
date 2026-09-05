import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import type { Scheme } from "@/lib/content/types";
import { SchemeExplorer } from "./scheme-explorer";

const schemes: Scheme[] = [
  {
    slug: "pmegp",
    code: "PMEGP",
    name: "Prime Minister's Employment Generation Programme",
    government: "central",
    summary: "Credit-linked subsidy for new micro enterprises.",
    keyAdvantage: "Up to 35% subsidy on project cost.",
    benefits: [],
    eligibility: [],
    eligibleProjects: [],
    sectors: ["Manufacturing", "Service"],
    documents: [
      { label: "PMEGP Guidelines", href: "/documents/pmegp.pdf", sizeBytes: 376_000 },
    ],
    displayOrder: 1,
    featured: true,
  },
  {
    slug: "rips-2024",
    code: "RIPS 2024",
    name: "Rajasthan Investment Promotion Scheme",
    government: "state",
    summary: "State capital investment subsidy.",
    keyAdvantage: "Capital subsidy plus SGST reimbursement.",
    benefits: [],
    eligibility: [],
    eligibleProjects: [],
    sectors: ["Manufacturing", "Solar"],
    documents: [],
    displayOrder: 2,
    featured: false,
  },
];

const sectors = ["Manufacturing", "Service", "Solar"];

const setup = () => render(<SchemeExplorer schemes={schemes} sectors={sectors} />);
const results = () => screen.getAllByRole("listitem").map((li) => li.textContent ?? "");
const count = () => screen.getByText(/Showing/).textContent ?? "";

describe("SchemeExplorer", () => {
  it("lists every scheme before any filtering", () => {
    setup();
    expect(count()).toMatch(/Showing\s*2\s*of 2 schemes/);
    expect(screen.getByRole("heading", { name: "PMEGP" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "RIPS 2024" })).toBeInTheDocument();
  });

  it("narrows to central schemes and back", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Central Govt" }));
    expect(screen.getByRole("heading", { name: "PMEGP" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "RIPS 2024" })).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "All schemes" }));
    expect(screen.getByRole("heading", { name: "RIPS 2024" })).toBeInTheDocument();
  });

  it("marks the active government filter with aria-pressed and the accent tint", async () => {
    setup();
    const state = screen.getByRole("button", { name: "State Govt" });
    await userEvent.click(state);
    expect(state).toHaveAttribute("aria-pressed", "true");
    expect(state).toHaveClass("bg-brand", "text-white");
    expect(screen.getByRole("button", { name: "All schemes" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("filters by sector", async () => {
    setup();
    await userEvent.selectOptions(screen.getByLabelText("Sector"), "Solar");
    expect(screen.getByRole("heading", { name: "RIPS 2024" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "PMEGP" })).not.toBeInTheDocument();
  });

  it("searches across code, name, summary and sectors", async () => {
    setup();
    const search = screen.getByLabelText("Search");

    await userEvent.type(search, "employment generation");
    expect(results()).toHaveLength(3); // one card + its two sector tags
    expect(screen.getByRole("heading", { name: "PMEGP" })).toBeInTheDocument();

    await userEvent.clear(search);
    await userEvent.type(search, "state capital");
    expect(screen.getByRole("heading", { name: "RIPS 2024" })).toBeInTheDocument();
  });

  // KNOWN GAP, documented rather than endorsed: the haystack is code, name,
  // summary and sectors. The key advantage — where the numbers people actually
  // search for live ("35% subsidy", "SGST", "interest subvention") — is not
  // indexed. See the summary note.
  it("does not currently search the key advantage text", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Search"), "SGST");
    expect(screen.queryByRole("heading", { name: "RIPS 2024" })).not.toBeInTheDocument();
  });

  it("ignores case and surrounding whitespace in the query", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Search"), "  PmEgP  ");
    expect(screen.getByRole("heading", { name: "PMEGP" })).toBeInTheDocument();
  });

  it("combines filters, not replaces them", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Central Govt" }));
    await userEvent.selectOptions(screen.getByLabelText("Sector"), "Solar");
    expect(count()).toMatch(/Showing\s*0\s*of 2 schemes/);
  });

  it("explains an empty result and points at the contact page", async () => {
    setup();
    await userEvent.type(screen.getByLabelText("Search"), "nonexistent scheme");
    expect(
      screen.getByRole("heading", { name: /No scheme matches those filters/ }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /describe your project/ })).toHaveAttribute(
      "href",
      "/contact",
    );
  });

  it("announces the result count politely", () => {
    setup();
    expect(screen.getByText(/Showing/)).toHaveAttribute("aria-live", "polite");
  });

  it("offers a reset only while a filter is applied, and it clears all three", async () => {
    setup();
    expect(
      screen.queryByRole("button", { name: "Clear filters" }),
    ).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Search"), "PMEGP");
    await userEvent.click(screen.getByRole("button", { name: "Central Govt" }));
    await userEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(count()).toMatch(/Showing\s*2\s*of 2 schemes/);
    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(screen.getByRole("button", { name: "All schemes" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("links each card to its detail page and renders its documents", () => {
    setup();
    expect(screen.getByRole("link", { name: "PMEGP" })).toHaveAttribute(
      "href",
      "/schemes/pmegp",
    );
    const doc = screen.getByRole("link", { name: /PMEGP Guidelines/ });
    expect(doc).toHaveAttribute("href", "/documents/pmegp.pdf");
    expect(doc).toHaveAttribute("rel", "noopener noreferrer");
    expect(doc).toHaveTextContent("367 KB PDF");
  });

  it("renders the classification badge per scheme", () => {
    setup();
    expect(screen.getByText("Central Government")).toBeInTheDocument();
    expect(screen.getByText("State Government")).toBeInTheDocument();
  });

  it("puts the accent rule on the key advantage", () => {
    const { container } = setup();
    expect(container.querySelector(".border-deep-ink")).toHaveTextContent(
      "Up to 35% subsidy",
    );
  });

  it("renders every sector as a tag on its card", () => {
    setup();
    const card = screen.getByRole("heading", { name: "PMEGP" }).closest("article")!;
    expect(within(card).getByText("Manufacturing")).toBeInTheDocument();
    expect(within(card).getByText("Service")).toBeInTheDocument();
  });
});
