"use client";

import dynamic from "next/dynamic";

export const BookingLoader = dynamic(
  () => import("@/components/sections/booking").then((m) => m.Booking),
  {
    loading: () => (
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="h-[600px] animate-pulse rounded-2xl bg-slate-800/40" />
      </section>
    ),
    ssr: false,
  },
);
