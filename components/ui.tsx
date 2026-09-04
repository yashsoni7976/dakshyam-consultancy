import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Joins class names, dropping falsy values. */
export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * One vertical band of the page.
 *
 * `canvas` sits on the eggshell page ground; `taupe` steps one surface level
 * up. Bands alternate down the page, and consecutive canvas bands are told
 * apart by a hairline rather than a shadow — borders over elevation is the
 * flat editorial rule the system runs on.
 */
export function Section({
  children,
  className,
  tone = "canvas",
  divider = false,
  ...rest
}: ComponentProps<"section"> & {
  tone?: "canvas" | "taupe";
  divider?: boolean;
}) {
  return (
    <section
      className={cx(
        "section-y",
        tone === "taupe" && "bg-taupe",
        divider && "border-t border-stone",
        className,
      )}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

/** 1px stone rule. The most common separator in the system. */
export function Divider({ className }: { className?: string }) {
  return <hr className={cx("border-0 border-t border-stone", className)} />;
}

/**
 * Technical section label in mono, in the brand navy accent.
 *
 * Only *section* eyebrows are accented. The bare `label-mono` utility stays
 * neutral for metadata labels — the proof strip, footer column headings,
 * table heads — so they don't eat into the colour budget.
 */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label-mono text-sandstone-deep">{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display-type max-w-3xl text-heading-sm text-ink sm:text-heading">
        {title}
      </h2>
      {description ? <p className="max-w-2xl text-body text-smoke">{description}</p> : null}
    </div>
  );
}

/**
 * The banner every inner page opens with.
 *
 * Asymmetric like the homepage hero: the headline holds the left column, the
 * supporting copy sits to its right on wide screens.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="border-b border-stone bg-eggshell">
      <div className="container-page pb-16 pt-14 sm:pb-20 sm:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-5">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="display-type text-heading text-ink sm:text-display">{title}</h1>
          </div>
          <div className="flex flex-col gap-6">
            {description ? (
              <p className="max-w-xl text-body-lg text-smoke">{description}</p>
            ) : null}
            {children}
            {aside}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Controls                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * NOTE: this sets `inline-flex`, and Tailwind emits `.inline-flex` after
 * `.hidden` in the stylesheet. Passing `hidden` through `className` therefore
 * does nothing — put responsive visibility on a wrapper element instead.
 */
const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full border text-body-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

const BUTTON_SIZES = {
  sm: "px-3.5 py-2",
  md: "px-4 py-2.5",
  lg: "px-5 py-3",
} as const;

/**
 * Two-step hierarchy, and only two: a black fill and an eggshell outline.
 * Coloured CTA fills are not part of the system.
 */
const BUTTON_VARIANTS = {
  primary: "border-hairline bg-ink text-eggshell hover:bg-graphite",
  secondary: "border-hairline bg-eggshell text-ink hover:bg-taupe",
  ghost: "border-transparent bg-transparent text-ink hover:border-hairline hover:bg-taupe",
  /** For use on the ink panel, where the fill/outline pair inverts. */
  inverse: "border-transparent bg-eggshell text-ink hover:bg-stone",
  inverseOutline:
    "border-white/25 bg-transparent text-eggshell hover:border-white/50 hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  external,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const classes = cx(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...rest
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return (
    <button
      className={cx(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], className)}
      {...rest}
    />
  );
}

/** Underlined in-text action, for when a pill would be too loud. */
export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cx(
    "inline-flex items-center gap-1.5 text-body-sm font-medium text-sandstone-deep underline decoration-sandstone-line underline-offset-4 transition-colors hover:decoration-sandstone-deep",
    className,
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Surfaces                                                                   */
/* -------------------------------------------------------------------------- */

const CARD_TONES = {
  /** The dominant pattern: flat taupe, no border, no shadow. */
  taupe: "bg-taupe",
  /** Elevated only when it genuinely needs to sit above its neighbours. */
  raised: "bg-eggshell shadow-whisper",
  /** On a taupe band, an eggshell card with a hairline reads as the step up. */
  outline: "bg-eggshell border border-stone",
} as const;

export function Card({
  className,
  tone = "taupe",
  size = "md",
  children,
  ...rest
}: ComponentProps<"div"> & {
  tone?: keyof typeof CARD_TONES;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={cx(
        "rounded-card",
        CARD_TONES[tone],
        size === "sm" && "p-5",
        size === "md" && "p-6 sm:p-8",
        size === "lg" && "rounded-card-lg p-8 sm:p-10",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/** Tinted plate behind a monochrome icon — the accent's largest permitted area. */
export function IconPlate({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-plate bg-sandstone-wash text-sandstone-deep">
      {children}
    </span>
  );
}

/** Neutral pill for sector names, tags and other free-form labels. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border border-stone bg-eggshell px-3 py-1 text-micro text-smoke",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Classification pill. The leading dot marks the category — kept achromatic,
 * because the sparks are reserved for artwork.
 */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "central" | "state";
}) {
  const dots = {
    neutral: "bg-ash",
    central: "bg-sandstone-deep",
    state: "bg-eggshell ring-1 ring-sandstone",
  } as const;

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-stone bg-eggshell py-1 pl-2.5 pr-3 text-micro font-medium text-graphite">
      <span className={cx("size-1.5 rounded-full", dots[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Figures                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * A row of numbers ruled by hairlines rather than boxed into cards — the
 * editorial treatment the system prefers for data. Ruling each cell rather
 * than gapping a filled grid keeps it count-agnostic: a partial last row
 * cannot leave a filled hole.
 */
export function StatRow({
  stats,
  className,
}: {
  stats: Array<{ id: string; value: string; label: string; description?: string }>;
  className?: string;
}) {
  return (
    <dl className={cx("grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-col gap-2 border-t border-stone py-7">
          <dd className="display-type text-heading-sm text-ink tabular-nums">
            {stat.value}
          </dd>
          <dt className="text-body-sm font-medium text-ink">{stat.label}</dt>
          {stat.description ? (
            <p className="text-body-sm text-smoke">{stat.description}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Shown wherever a collection is legitimately empty — blog, success stories,
 * showcase records. Says what will appear here rather than looking broken.
 */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card bg-taupe px-6 py-20 text-center">
      <h3 className="display-type text-heading-xs text-ink">{title}</h3>
      <p className="max-w-md text-body-sm text-smoke">{description}</p>
      {action ? (
        <ButtonLink href={action.href} variant="secondary" className="mt-2">
          {action.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Closing call to action, shared by most pages                               */
/* -------------------------------------------------------------------------- */

/**
 * The one ink-filled surface on the page. Black is the system's only hard
 * contrast, so it is spent here — once, at the bottom — and nowhere else.
 */
export function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-card-lg bg-ink-warm px-6 py-14 sm:px-12 sm:py-20">
        {/* Decorative spark — the sole splash of colour, kept behind the type. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full opacity-60 blur-3xl sm:size-96"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, #178dcd 0%, #004382 45%, #002a52 80%, transparent 92%)",
          }}
        />
        <div className="relative flex max-w-2xl flex-col items-start gap-5">
          <h2 className="display-type text-heading-sm text-eggshell sm:text-heading">
            {title}
          </h2>
          <p className="text-body text-stone">{description}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink href={primary.href} variant="inverse">
              {primary.label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="inverseOutline">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
