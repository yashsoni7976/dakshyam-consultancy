"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { NavLink } from "@/lib/content/types";
import { ButtonLink, cx } from "./ui";

/**
 * Interactive shell of the site header.
 *
 * Split from `SiteHeader` so the content fetch stays on the server and only
 * the menu toggle and active-route highlighting ship to the browser.
 *
 * Visually the bar is close to invisible: no fill of its own beyond the page
 * canvas, one hairline underneath, and the outline/filled pill pair on the
 * right as the only weight.
 */
export function HeaderNav({
  logoSrc,
  logoAlt,
  links,
  phoneE164,
  phoneDisplay,
}: {
  logoSrc: string;
  logoAlt: string;
  links: NavLink[];
  phoneE164: string;
  phoneDisplay: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);

  // Close the menu when the route changes, so a tap on a link (or a back
  // navigation) doesn't leave it hanging open. Adjusted during render rather
  // than in an effect — React re-renders before painting, so the menu never
  // flashes in its open state on the new page.
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-eggshell/85 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo is a raster asset of known aspect ratio */}
          <img src={logoSrc} alt={logoAlt} className="h-7 w-auto" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-start gap-0.5 xl:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cx(
                "whitespace-nowrap rounded-full px-3 py-2 text-body-sm transition-colors",
                isActive(link.href)
                  ? "bg-sandstone-wash font-medium text-sandstone-deep"
                  : "text-smoke hover:bg-taupe hover:text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Responsive visibility lives on a wrapper, never on the button
              itself: the kit's base class sets `inline-flex`, and Tailwind
              emits `.inline-flex` after `.hidden`, so a `hidden` on the button
              would silently lose the cascade. */}
          <div className="hidden md:block">
            <ButtonLink href={`tel:${phoneE164}`} variant="secondary">
              <Phone className="size-3.5" aria-hidden="true" />
              <span className="whitespace-nowrap">{phoneDisplay}</span>
            </ButtonLink>
          </div>

          <div className="hidden sm:block">
            <ButtonLink href="/contact" className="whitespace-nowrap">
              Free consultation
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full border border-hairline p-2 text-ink transition-colors hover:bg-taupe xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-stone bg-eggshell xl:hidden"
      >
        <ul className="container-page flex flex-col py-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cx(
                  "block rounded-full px-4 py-3 text-body-sm",
                  isActive(link.href)
                    ? "bg-sandstone-wash font-medium text-sandstone-deep"
                    : "text-smoke",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-col gap-2 px-1 pb-1 pt-3">
            <ButtonLink href={`tel:${phoneE164}`} variant="secondary" className="w-full">
              <Phone className="size-3.5" aria-hidden="true" />
              <span>{phoneDisplay}</span>
            </ButtonLink>
            <div className="sm:hidden">
              <ButtonLink href="/contact" className="w-full">
                Free consultation
              </ButtonLink>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
