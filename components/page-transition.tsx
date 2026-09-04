"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";
import { LazyMotion, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

/**
 * Fades page content in on route change.
 *
 * Enter-only, deliberately. Exit animations need the outgoing tree to survive
 * the navigation, and the App Router unmounts it before `AnimatePresence` can
 * see it — every workaround involves holding a stale render, which is not
 * worth it for a fade.
 *
 * `children` is passed in from the server layout, so everything inside stays
 * a server component; only this wrapper ships to the browser.
 */

/** In the same register as the kit's hover transitions. */
const DURATION = 0.28;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Fetched after first paint, so the feature bundle stays out of the entry chunk. */
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

/** Never resubscribes — the snapshot only differs between server and client. */
const subscribe = () => () => {};

/**
 * False through SSR and the hydration render, true afterwards.
 *
 * This exists so the first paint is never transparent: `initial={{opacity:0}}`
 * would put `opacity:0` into the server-rendered HTML, leaving the page blank
 * for anyone whose JS is slow or blocked. On a lead-gen site that is a real
 * cost for no gain, so the first render is opaque and only subsequent
 * navigations animate.
 */
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useHydrated();

  // `initial={false}` snaps straight to the animated state, so this covers
  // both the first paint and the reduced-motion case without branching the
  // element tree (which would risk a hydration mismatch).
  const animate = hydrated && !prefersReducedMotion;

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        key={pathname}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION, ease: EASE }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
