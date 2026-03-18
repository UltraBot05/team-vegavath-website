import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { getEvents } from "@/lib/services/events";
import type { Event } from "@/types/event";

export const metadata: Metadata = {
  title: "Events | Team Vegavath",
};

export const revalidate = 60;

const FILTER_LABELS = ["All", "Workshops", "Competitions", "Talks"] as const;

export default async function EventsPage() {
  let events: Event[] = [];

  try {
    events = await getEvents({ limit: 50 });
  } catch {
    events = [];
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Events
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            {FILTER_LABELS.map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-orange-400"
              >
                {label}
              </button>
            ))}
          </div>
        </header>

        {events.length === 0 ? (
          <p className="text-base text-zinc-300">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/70"
              >
                <div className="relative aspect-video w-full bg-zinc-800">
                  {event.cover_image_url ? (
                    <Image
                      src={event.cover_image_url}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="h-full w-full bg-zinc-700" />
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <h2 className="text-lg font-bold text-white">{event.title}</h2>
                  <p className="text-sm text-zinc-300">
                    {new Date(event.event_date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-orange-600"
                  >
                    View Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
