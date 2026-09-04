import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getLegalDocument, getLegalDocuments } from "@/lib/content";
import { LegalPage, legalMetadata } from "./legal-document";

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));
vi.mock("next/navigation", () => ({ notFound }));

describe("legalMetadata", () => {
  it("builds metadata from the document itself", async () => {
    const [doc] = await getLegalDocuments();
    const meta = await legalMetadata(doc.slug);
    expect(meta.title).toBe(doc.title);
    expect(meta.description).toBe(doc.subtitle);
    expect(String(meta.alternates?.canonical)).toContain(`/${doc.slug}`);
  });

  it("returns empty metadata for an unknown slug rather than throwing", async () => {
    expect(await legalMetadata("no-such-doc")).toEqual({});
  });
});

describe("LegalPage", () => {
  it("renders the document title, subtitle and every section", async () => {
    const [doc] = await getLegalDocuments();
    render(await LegalPage({ slug: doc.slug }));

    expect(screen.getByRole("heading", { level: 1, name: doc.title })).toBeInTheDocument();
    expect(screen.getByText(doc.subtitle)).toBeInTheDocument();
    for (const section of doc.sections) {
      expect(
        screen.getByRole("heading", { level: 2, name: section.heading }),
      ).toBeInTheDocument();
    }
  });

  it("renders bullets where a section has them", async () => {
    const docs = await getLegalDocuments();
    const withBullets = docs.find((doc) =>
      doc.sections.some((section) => section.bullets?.length),
    );
    if (!withBullets) return;

    render(await LegalPage({ slug: withBullets.slug }));
    expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
  });

  it("stamps the last-updated date", async () => {
    const [doc] = await getLegalDocuments();
    render(await LegalPage({ slug: doc.slug }));
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it("404s on an unknown slug", async () => {
    await expect(LegalPage({ slug: "not-a-document" })).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });

  it("renders every legal route the navigation links to", async () => {
    for (const doc of await getLegalDocuments()) {
      expect(await getLegalDocument(doc.slug)).not.toBeNull();
    }
  });
});
