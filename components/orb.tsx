import type { CSSProperties } from "react";
import { cx } from "./ui";

/**
 * The system's signature product visual: a soft-edged gradient sphere.
 *
 * This is the *only* place the violet and ember sparks are allowed to appear.
 * They are decoration — never a button, a link, a badge or a border — so the
 * colours live here rather than in a token any component could reach for.
 *
 * Purely ornamental, so it is hidden from assistive technology.
 */
const RECIPES: Record<string, CSSProperties> = {
  // Sandstone body, ember on the lit side, violet holding the shadow.
  sandstone: {
    background: [
      "radial-gradient(circle at 30% 26%, rgba(255,236,224,0.95) 0%, rgba(255,236,224,0) 42%)",
      "radial-gradient(circle at 62% 40%, rgba(255,71,4,0.8) 0%, rgba(255,71,4,0) 50%)",
      "radial-gradient(circle at 80% 84%, rgba(4,71,255,0.7) 0%, rgba(4,71,255,0) 55%)",
      "radial-gradient(circle at 46% 44%, #b9663f 0%, #a34a34 52%, #3a1d24 100%)",
    ].join(", "),
  },
  // Ember-led: the brightest of the three, the sun still on the stone.
  ember: {
    background: [
      "radial-gradient(circle at 30% 24%, rgba(255,244,232,0.92) 0%, rgba(255,244,232,0) 40%)",
      "radial-gradient(circle at 76% 80%, rgba(4,71,255,0.62) 0%, rgba(4,71,255,0) 56%)",
      "radial-gradient(circle at 44% 60%, rgba(212,116,90,0.8) 0%, rgba(212,116,90,0) 50%)",
      "radial-gradient(circle at 54% 36%, #ff4704 0%, #b9663f 55%, #4a2028 100%)",
    ].join(", "),
  },
  // Dusk rose: the quietest — the stone after the sun has left it.
  dusk: {
    background: [
      "radial-gradient(circle at 34% 30%, rgba(255,238,232,0.88) 0%, rgba(255,238,232,0) 44%)",
      "radial-gradient(circle at 72% 72%, rgba(4,71,255,0.5) 0%, rgba(4,71,255,0) 58%)",
      "radial-gradient(circle at 50% 50%, #d4846b 0%, #a34a34 56%, #402330 100%)",
    ].join(", "),
  },
};

export type OrbVariant = keyof typeof RECIPES;

export function Orb({
  variant = "sandstone",
  className,
  blur = true,
}: {
  variant?: OrbVariant;
  className?: string;
  /** Soft halo behind the sphere. Turn it off inside tight card frames. */
  blur?: boolean;
}) {
  return (
    <div
      className={cx("pointer-events-none relative aspect-square", className)}
      aria-hidden="true"
    >
      {blur ? (
        <div
          className="absolute inset-[-18%] rounded-full opacity-45 blur-3xl"
          style={RECIPES[variant]}
        />
      ) : null}
      <div className="absolute inset-0 rounded-full" style={RECIPES[variant]} />
      {/* A faint inner highlight keeps the sphere from reading as a flat disc. */}
      <div
        className="absolute inset-0 rounded-full mix-blend-soft-light"
        style={{
          background:
            "radial-gradient(circle at 38% 24%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 46%)",
        }}
      />
    </div>
  );
}

/**
 * The three-sphere row the design uses as an editorial accent. Sizes are
 * deliberately unequal — the arrangement should read as a composition, not a
 * grid of icons.
 */
export function OrbCluster({ className }: { className?: string }) {
  return (
    <div className={cx("flex items-end gap-6 sm:gap-8", className)} aria-hidden="true">
      <Orb variant="sandstone" className="w-32 sm:w-44" />
      <Orb variant="ember" className="w-20 sm:w-28" />
      <Orb variant="dusk" className="w-12 sm:w-16" />
    </div>
  );
}
