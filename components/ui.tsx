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
 * `canvas` sits on the warm cream ground; `meadow` steps one surface level
 * up to soft meadow green-tint. Bands alternate down the page — surface
 * contrast alone, no shadows.
 */
export function Section({
  children,
  className,
  tone = "canvas",
  divider = false,
  ...rest
}: ComponentProps<"section"> & {
  tone?: "canvas" | "meadow";
  divider?: boolean;
}) {
  return (
    <section
      className={cx(
        "section-y",
        tone === "meadow" && "bg-soft-meadow",
        divider && "border-t border-border",
        className,
      )}
      {...rest}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function Divider({ className }: { className?: string }) {
  return <hr className={cx("border-0 border-t border-border", className)} />;
}

/** Small caps section label above headlines. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label-caps text-deep-ink">{children}</p>;
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
      <h2 className="max-w-3xl serif-type text-heading-sm text-deep-ink sm:text-heading">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-body text-slate">{description}</p>
      ) : null}
    </div>
  );
}

/** Banner every inner page opens with — asymmetric two-column hero. */
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
    <div className="bg-soft-meadow">
      <div className="container-page pt-14 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-5">
            {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
            <h1 className="serif-type text-heading-lg text-deep-ink sm:text-display">
              {title}
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            {description ? (
              <p className="max-w-xl text-subheading text-slate">{description}</p>
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

const BUTTON_BASE =
  "inline-flex w-full items-center justify-center gap-2 rounded-full border-0 text-body font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto";

const BUTTON_SIZES = {
  sm: "px-5 py-2 text-body-sm",
  md: "px-6 py-3",
  lg: "px-6 py-3.5",
} as const;

/** Logo-blue primary + deep-ink secondary — the only button hierarchy. */
const BUTTON_VARIANTS = {
  primary: "bg-brand text-white hover:bg-brand/90",
  secondary: "bg-deep-ink text-white hover:bg-deep-ink/90",
  ghost: "bg-transparent text-deep-ink hover:bg-soft-meadow",
  /** For use on deep-ink panels. */
  inverse: "bg-brand text-white hover:bg-brand/90",
  inverseOutline:
    "border border-white/30 bg-transparent text-white hover:border-white/50 hover:bg-white/10",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

/** Shared pill classes — nav active state and buttons use the same tokens. */
export function pillClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cx(BUTTON_BASE, BUTTON_SIZES[size], BUTTON_VARIANTS[variant], className);
}

/** Nav link — active state highlights text only, no fill pill. */
export function navLinkClasses(active: boolean, className?: string) {
  return cx(
    "font-medium transition-colors",
    active ? "font-semibold text-brand" : "text-deep-ink hover:text-brand",
    className,
  );
}

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
  const classes = pillClasses({ variant, size, className });

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
  return <button className={cx(pillClasses({ variant, size, className }))} {...rest} />;
}

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
    "inline-flex items-center gap-1.5 text-body-sm font-medium text-deep-ink underline decoration-deep-ink/25 underline-offset-4 transition-colors hover:decoration-deep-ink",
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
  meadow: "bg-soft-meadow",
  canvas: "bg-canvas",
  white: "bg-white",
} as const;

export function Card({
  className,
  tone = "meadow",
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
        size === "sm" && "p-6",
        size === "md" && "p-6 sm:p-8",
        size === "lg" && "p-8 sm:p-12",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function IconPlate({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas text-deep-ink">
      {children}
    </span>
  );
}

export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full bg-canvas px-3 py-1 text-caption font-medium tracking-tight text-slate uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Classification pill — achromatic only, no decorative colours in UI. */
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "central" | "state";
}) {
  const dots = {
    neutral: "bg-slate",
    central: "bg-deep-ink",
    state: "bg-canvas ring-1 ring-deep-ink/30",
  } as const;

  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-canvas py-1 pr-3 pl-2.5 text-caption font-medium tracking-tight text-deep-ink uppercase">
      <span className={cx("size-1.5 rounded-full", dots[tone])} aria-hidden="true" />
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Figures                                                                    */
/* -------------------------------------------------------------------------- */

export function StatRow({
  stats,
  className,
}: {
  stats: Array<{ id: string; value: string; label: string; description?: string }>;
  className?: string;
}) {
  return (
    <dl className={cx("grid gap-6 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stats.map((stat) => (
        <Card key={stat.id} size="sm" className="flex flex-col gap-2">
          <dd className="serif-type text-heading-sm text-deep-ink tabular-nums">
            {stat.value}
          </dd>
          <dt className="text-body-sm font-medium text-deep-ink">{stat.label}</dt>
          {stat.description ? (
            <p className="text-body-sm text-slate">{stat.description}</p>
          ) : null}
        </Card>
      ))}
    </dl>
  );
}

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
    <div className="flex flex-col items-center gap-4 rounded-card bg-soft-meadow px-6 py-20 text-center">
      <h3 className="serif-type text-heading-sm text-deep-ink">{title}</h3>
      <p className="max-w-md text-body-sm text-slate">{description}</p>
      {action ? (
        <ButtonLink href={action.href} variant="secondary" className="mt-2">
          {action.label}
        </ButtonLink>
      ) : null}
    </div>
  );
}

/** Closing call to action — deep ink panel with logo-blue primary. */
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
      <div className="relative overflow-hidden rounded-card bg-deep-ink px-6 py-14 sm:px-12 sm:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-moss-green/30 blur-3xl sm:size-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-10 size-56 rounded-full bg-fuchsia/25 blur-3xl"
        />
        <div className="relative flex max-w-2xl flex-col items-start gap-5">
          <h2 className="serif-type text-heading-sm text-white sm:text-heading">
            {title}
          </h2>
          <p className="text-body text-white/75">{description}</p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
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
