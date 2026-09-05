import { cx } from "./ui";

/**
 * Organic decorative blobs — the garden-meadow atmosphere behind hero visuals.
 *
 * Moss green, fuchsia, hi-yellow and deep ink appear here only. They must
 * never surface in buttons, badges, or functional UI chrome.
 */
function Blob({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cx("absolute", className)}
      aria-hidden="true"
    >
      <path
        d="M45.9,-58.1C58.7,-47.2,67.8,-31.8,70.4,-15.2C73,1.4,68.1,19.2,57.8,33.1C47.5,47,31.8,57,14.8,62.1C-2.2,67.2,-20.5,67.4,-36.1,59.8C-51.7,52.2,-64.6,36.8,-69.8,19.1C-75,-1.6,-72.5,-24.6,-61.8,-40.8C-51.1,-57,-32.2,-66.4,-13.8,-68.8C4.6,-71.2,33.1,-69,45.9,-58.1Z"
        transform="translate(100 100)"
        fill={fill}
      />
    </svg>
  );
}

/**
 * Hero product mockup card floating above organic blob shapes.
 * Shows a stylised scheme dashboard — product-forward, not illustrative.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      className={cx("relative mx-auto aspect-[4/3] w-full max-w-lg", className)}
      aria-hidden="true"
    >
      <Blob fill="#59e25d" className="top-[6%] left-[-8%] size-[55%] opacity-90" />
      <Blob fill="#e261e5" className="top-[18%] right-[-6%] size-[48%] opacity-85" />
      <Blob fill="#ffe228" className="bottom-[8%] left-[12%] size-[42%] opacity-90" />
      <Blob fill="#130e30" className="right-[10%] bottom-[14%] size-[36%] opacity-80" />

      <div className="absolute inset-[10%] flex flex-col gap-4 rounded-card bg-white p-6 shadow-none sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <span className="label-caps text-deep-ink">Scheme dashboard</span>
          <span className="rounded-full bg-brand px-3 py-1 text-caption font-medium text-white">
            Live
          </span>
        </div>
        <div className="grid flex-1 gap-3">
          {[
            { label: "PMEGP", value: "₹25L cap", pct: 85 },
            { label: "CGTMSE", value: "Collateral-free", pct: 72 },
            { label: "RIICO", value: "Land subsidy", pct: 58 },
          ].map((row) => (
            <div key={row.label} className="rounded-2xl bg-soft-meadow p-3">
              <div className="flex items-center justify-between text-body-sm">
                <span className="font-medium text-deep-ink">{row.label}</span>
                <span className="text-slate">{row.value}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-canvas">
                <div
                  className="h-full rounded-full bg-deep-ink"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-caption text-slate">
          Eligibility mapped across central &amp; state schemes
        </p>
      </div>
    </div>
  );
}

/** @deprecated Use HeroVisual — kept for gradual migration. */
export function OrbCluster({ className }: { className?: string }) {
  return <HeroVisual className={className} />;
}

/** @deprecated Use HeroVisual — kept for about page single orb slot. */
export function Orb({
  className,
}: {
  variant?: string;
  className?: string;
  blur?: boolean;
}) {
  return <HeroVisual className={cx("max-w-xs", className)} />;
}
