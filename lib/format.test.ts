import { describe, expect, it } from "vitest";
import { formatBytes, formatDate, formatInr } from "./format";

describe("formatInr", () => {
  it("switches to crores at one crore", () => {
    expect(formatInr(9_899_999)).toBe("₹99 Lakhs");
    expect(formatInr(10_000_000)).toBe("₹1 Cr");
  });

  // KNOWN EDGE, documented rather than endorsed: rounding happens after the
  // threshold check, so 99,99,500–99,99,999 renders as "₹100 Lakhs" instead of
  // rolling over to "₹1 Cr". A 500-rupee window; see the summary note.
  it("renders the very top of the lakh range as ₹100 Lakhs", () => {
    expect(formatInr(9_999_999)).toBe("₹100 Lakhs");
  });

  it("switches to lakhs at one lakh", () => {
    expect(formatInr(99_999)).toBe("₹99,999");
    expect(formatInr(100_000)).toBe("₹1 Lakhs");
  });

  it("drops a trailing .00 and a trailing zero decimal", () => {
    expect(formatInr(15_000_000)).toBe("₹1.5 Cr");
    expect(formatInr(2_500_000)).toBe("₹25 Lakhs");
    expect(formatInr(12_345_678)).toBe("₹1.23 Cr");
  });

  it("falls back to Indian digit grouping below a lakh", () => {
    expect(formatInr(50_000)).toBe("₹50,000");
    expect(formatInr(0)).toBe("₹0");
  });
});

describe("formatBytes", () => {
  it("reports megabytes to one decimal at or above 1 MB", () => {
    expect(formatBytes(1_048_576)).toBe("1.0 MB");
    expect(formatBytes(6_400_000)).toBe("6.1 MB");
  });

  it("reports whole kilobytes below 1 MB", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(376_000)).toBe("367 KB");
    expect(formatBytes(0)).toBe("0 KB");
  });
});

describe("formatDate", () => {
  it("renders an ISO date in long Indian form", () => {
    expect(formatDate("2026-08-31")).toBe("31 August 2026");
  });

  it("reads the date as UTC, so the day never shifts by timezone", () => {
    expect(formatDate("2026-01-01")).toBe("1 January 2026");
  });
});
