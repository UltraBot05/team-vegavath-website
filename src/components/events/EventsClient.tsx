"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "@/types/event";

type Props = {
  events: Event[];
};

const FILTER_LABELS = ["All", "Workshops", "Competitions", "Talks"] as const;
type FilterLabel = (typeof FILTER_LABELS)[number];

export default function EventsClient({ events }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterLabel>("All");

  const filtered =
    activeFilter === "All"
      ? events
      : events.filter(
          (e) => e.category?.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {FILTER_LABELS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveFilter(label)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeFilter === label
                ? "border-[#EF5D08] bg-[#EF5D08] text-white"
                : "border-[#2a2a2a] bg-[#1a1a1a] text-[#EBEBEB] hover:border-[#EF5D08] hover:text-[#F29C04]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-base text-[#9a9a9a]">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] transition-colors hover:border-[#EF5D08]"
            >
              <div className="relative aspect-video w-full bg-[#2a2a2a]">
                {event.cover_image_url ? (
                  <Image
                    src={event.cover_image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#2a2a2a]">
                    <span className="text-4xl">🏁</span>
                  </div>
                )}
              </div>
              <div className="space-y-3 p-4">
                <span className="inline-block rounded-full bg-[#EF5D08]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#EF5D08]">
                  {event.category}
                </span>
                <h2 className="text-lg font-bold text-[#EBEBEB]">{event.title}</h2>
                {event.event_date && (
                  <p className="text-sm text-[#9a9a9a]">
                    {new Date(event.event_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                <Link
                  href={`/events/${event.slug}`}
                  className="inline-flex items-center rounded-md bg-[#EF5D08] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#d44f06]"
                >
                  View Details →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
