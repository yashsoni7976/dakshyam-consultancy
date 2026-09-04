"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, FileDown, Search } from "lucide-react";
import type { Government, Scheme } from "@/lib/content/types";
import { formatBytes } from "@/lib/format";
import { Badge, Tag, cx } from "./ui";

type GovernmentFilter = Government | "all";

const GOVERNMENT_OPTIONS: { value: GovernmentFilter; label: string }[] = [
  { value: "all", label: "All schemes" },
  { value: "central", label: "Central Govt" },
  { value: "state", label: "State Govt" },
];

/**
 * Client-side filtering over the full scheme list.
 *
 * The whole list is prerendered into the page — 11 schemes is small enough
 * that filtering in the browser is instant and needs no request. If the list
 * grows past a few hundred, move the filter into a search param and let the
 * server narrow it instead.
 */
export function SchemeExplorer({
  schemes,
  sectors,
}: {
  schemes: Scheme[];
  sectors: string[];
}) {
  const [government, setGovernment] = useState<GovernmentFilter>("all");
  const [sector, setSector] = useState<string>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return schemes.filter((scheme) => {
      if (government !== "all" && scheme.government !== government) return false;
      if (sector !== "all" && !scheme.sectors.includes(sector)) return false;
      if (!needle) return true;

      return [scheme.code, scheme.name, scheme.summary, ...scheme.sectors]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [schemes, government, sector, query]);

  const reset = () => {
    setGovernment("all");
    setSector("all");
    setQuery("");
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Controls */}
      <div className="flex flex-col gap-5 rounded-card bg-taupe p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="scheme-search" className="label-mono">
              Search
            </label>
            <div className="relative mt-2">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ash"
                aria-hidden="true"
              />
              <input
                id="scheme-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Scheme name, benefit or sector"
                className="w-full rounded-input border border-stone bg-taupe py-2.5 pl-9 pr-3 text-body-sm text-ink outline-none placeholder:text-ash focus:border-sandstone-deep"
              />
            </div>
          </div>

          <div className="sm:w-60">
            <label htmlFor="scheme-sector" className="label-mono">
              Sector
            </label>
            <select
              id="scheme-sector"
              value={sector}
              onChange={(event) => setSector(event.target.value)}
              className="mt-2 w-full rounded-input border border-stone bg-taupe px-3 py-2.5 text-body-sm text-ink outline-none focus:border-sandstone-deep"
            >
              <option value="all">All sectors</option>
              {sectors.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab pills — the active one takes the ink fill. */}
        <div role="group" aria-label="Filter by government" className="flex flex-wrap gap-2">
          {GOVERNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={government === option.value}
              onClick={() => setGovernment(option.value)}
              className={cx(
                "rounded-full border px-4 py-2 text-body-sm font-medium transition-colors",
                government === option.value
                  ? "border-sandstone-line bg-sandstone-wash text-sandstone-deep"
                  : "border-hairline bg-eggshell text-smoke hover:text-ink",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone pb-4">
        <p aria-live="polite" className="text-body-sm text-smoke">
          Showing <span className="font-medium text-ink tabular-nums">{visible.length}</span>{" "}
          of {schemes.length} schemes
        </p>
        {visible.length !== schemes.length ? (
          <button
            type="button"
            onClick={reset}
            className="text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 hover:decoration-sandstone-deep"
          >
            Clear filters
          </button>
        ) : null}
      </div>

      {/* Results */}
      {visible.length === 0 ? (
        <div className="rounded-card bg-taupe px-6 py-20 text-center">
          <h3 className="display-type text-heading-xs text-ink">
            No scheme matches those filters
          </h3>
          <p className="mx-auto mt-3 max-w-md text-body-sm text-smoke">
            Try widening the sector, or{" "}
            <Link href="/contact" className="text-sandstone-deep underline decoration-sandstone-line underline-offset-4">
              describe your project to us
            </Link>{" "}
            — eligibility often depends on details a filter cannot capture.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-5">
          {visible.map((scheme) => (
            <li key={scheme.slug}>
              <article className="flex flex-col gap-5 rounded-card bg-taupe p-6 sm:p-8">
                <div className="flex flex-col gap-3">
                  <Badge tone={scheme.government === "central" ? "central" : "state"}>
                    {scheme.government === "central"
                      ? "Central Government"
                      : "State Government"}
                  </Badge>
                  <h2 className="display-type text-heading-xs text-ink">
                    <Link
                      href={`/schemes/${scheme.slug}`}
                      className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-sandstone-line"
                    >
                      {scheme.code}
                    </Link>
                  </h2>
                  <p className="text-body-sm text-smoke">{scheme.name}</p>
                </div>

                <p className="max-w-3xl text-body text-smoke">{scheme.summary}</p>

                <p className="max-w-3xl rounded-input border-l-2 border-sandstone-deep bg-eggshell px-4 py-3 text-body-sm font-medium text-ink">
                  {scheme.keyAdvantage}
                </p>

                <ul className="flex flex-wrap gap-2">
                  {scheme.sectors.map((name) => (
                    <li key={name}>
                      <Tag>{name}</Tag>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone pt-5">
                  <Link
                    href={`/schemes/${scheme.slug}`}
                    className="inline-flex items-center gap-1.5 text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 hover:decoration-sandstone-deep"
                  >
                    Eligibility &amp; benefits
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  {scheme.documents.map((doc) => (
                    <a
                      key={doc.href}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-body-sm text-smoke transition-colors hover:text-ink"
                    >
                      <FileDown className="size-3.5" aria-hidden="true" />
                      {doc.label}
                      {doc.sizeBytes ? (
                        <span className="text-smoke">({formatBytes(doc.sizeBytes)} PDF)</span>
                      ) : null}
                    </a>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
