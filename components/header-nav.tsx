"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/lib/content/types";
import { ButtonLink, navLinkClasses } from "./ui";

/**
 * Site header — soft meadow bar, logo left, links centre, one CTA right.
 * Active nav links highlight text in brand colour; buttons stay filled pills.
 */
export function HeaderNav({
  logoSrc,
  logoAlt,
  links,
}: {
  logoSrc: string;
  logoAlt: string;
  links: NavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);

  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    setOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="z-40 bg-soft-meadow">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo is a raster asset of known aspect ratio */}
          <img src={logoSrc} alt={logoAlt} className="h-7 w-auto" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-1 xl:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={navLinkClasses(
                isActive(link.href),
                "px-3 py-2 text-body whitespace-nowrap",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href="/contact" size="sm" className="whitespace-nowrap">
              Free consultation
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full p-2 text-deep-ink transition-colors hover:bg-canvas xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-border bg-soft-meadow xl:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={navLinkClasses(
                  isActive(link.href),
                  "block px-4 py-3 text-body-sm",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 sm:hidden">
            <ButtonLink href="/contact" size="sm">
              Free consultation
            </ButtonLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
