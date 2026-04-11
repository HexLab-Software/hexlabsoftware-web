"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll-triggered reveal wrapper. Children start in the `.reveal` or
 * `.reveal-stagger` resting state (hidden + offset); when the element
 * intersects the viewport an `in-view` class is added so the CSS
 * transition in `globals.css` plays.
 *
 * `stagger` uses the grid variant that animates its children sequentially
 * via nth-child delays — one observer per grid instead of one per card.
 */
export function Reveal({
  children,
  className = "",
  stagger = false,
  once = true,
  threshold = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  once?: boolean;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("in-view");
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const base = stagger ? "reveal-stagger" : "reveal";
  return (
    <div ref={ref} className={`${base} ${className}`}>
      {children}
    </div>
  );
}
