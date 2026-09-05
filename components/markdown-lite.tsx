import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for post bodies.
 *
 * Supports `## ` headings, `- ` bullet lists, `**bold**` and paragraphs —
 * which is all the editorial content currently uses. Swap in a real Markdown
 * pipeline (remark/rehype) when posts need links, images or tables; the
 * content model already stores the body as Markdown, so nothing else changes.
 */
export function MarkdownLite({ source }: { source: string }) {
  const blocks = source.split(/\n{2,}/).filter((block) => block.trim());

  return (
    <>
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        if (trimmed.startsWith("## ")) {
          return <h2 key={index}>{trimmed.slice(3)}</h2>;
        }

        if (trimmed.startsWith("- ")) {
          const items = trimmed
            .split("\n")
            .map((line) => line.replace(/^-\s+/, "").trim())
            .filter(Boolean);
          return (
            <ul key={index}>
              {items.map((item) => (
                <li key={item}>{inline(item)}</li>
              ))}
            </ul>
          );
        }

        return <p key={index}>{inline(trimmed)}</p>;
      })}
    </>
  );
}

/** Renders `**bold**` spans; everything else stays literal text. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={index} className="font-medium text-deep-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}
