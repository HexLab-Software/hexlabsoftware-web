"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function BookingSkeleton() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="h-[600px] animate-pulse rounded-2xl bg-slate-800/40" />
    </section>
  );
}

const Booking = dynamic(
  () => import("@/components/sections/booking").then((m) => m.Booking),
  {
    loading: () => <BookingSkeleton />,
    ssr: false,
  },
);

/**
 * Defers the heavy `@calcom/embed-react` + Cal API bundle until the booking
 * section nears the viewport. `next/dynamic` only fetches the chunk when the
 * component first renders, so gating `<Booking />` on an IntersectionObserver
 * keeps that bundle off the initial load — most visitors never scroll this far.
 *
 * The wrapper carrying the `#booking` anchor is always rendered so the header
 * CTA can jump here before the embed mounts, and the skeleton reserves the
 * embed's height so the late mount doesn't shift layout.
 */
export function BookingLoader() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} id="booking">
      {show ? <Booking /> : <BookingSkeleton />}
    </div>
  );
}
