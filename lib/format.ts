/**
 * Formatting helpers.
 *
 * Money is stored as a plain number of rupees in the content layer so it can
 * be sorted and totalled; it becomes a string only here, at render time.
 */

const LAKH = 100_000;
const CRORE = 10_000_000;

/** Formats rupees the way Indian business writing does: lakhs and crores. */
export function formatInr(amount: number): string {
  if (amount >= CRORE) {
    return `₹${trim(amount / CRORE)} Cr`;
  }
  if (amount >= LAKH) {
    return `₹${trim(amount / LAKH)} Lakhs`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

function trim(value: number): string {
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

/** Human-readable file size for document download links. */
export function formatBytes(bytes: number): string {
  const mb = bytes / 1_048_576;
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

/** e.g. "31 August 2026" */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
