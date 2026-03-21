import type { Metadata } from "next";
import { getEvents } from "@/lib/services/events";
import { getGalleryItems, getGalleryEvents } from "@/lib/services/gallery";
import type { Event } from "@/types/event";
import type { GalleryItem } from "@/types/gallery";
import GalleryClient from "@/components/gallery/GalleryClient";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Gallery | Team Vegavath",
};

export const revalidate = 120;

type GalleryEventFilter = {
  event_label: string;
  event_id: string | null;
};

type FilterOption = {
  id: string | "all";
  label: string;
};

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];
  let galleryEvents: GalleryEventFilter[] = [];
  let events: Event[] = [];

  try {
    [galleryItems, galleryEvents, events] = await Promise.all([
      getGalleryItems(),
      getGalleryEvents(),
      getEvents({ limit: 100 }),
    ]);
  } catch {
    galleryItems = [];
    galleryEvents = [];
    events = [];
  }

  const galleryEventIds = new Set(
    galleryEvents
      .map((event) => event.event_id)
      .filter((eventId): eventId is string => Boolean(eventId))
  );

  const filters: FilterOption[] = [
    { id: "all", label: "All" },
    ...events
      .filter((event) => galleryEventIds.has(event.id))
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((event) => ({
        id: event.id,
        label: event.title,
      })),
  ];

  return (
    <main className="bg-[#121212] text-[#EBEBEB]">
      <section className="w-full py-24">
        <Container>
          <div className="space-y-8">
            <header className="mx-auto w-full max-w-4xl space-y-4 border border-red-500 text-center">
              <h1 className="text-4xl font-black tracking-[0.2em] text-[#EBEBEB] md:text-5xl">
                GALLERY
              </h1>
              <p className="mx-auto max-w-3xl text-sm text-[#9a9a9a] sm:text-base">
                A visual journey through our projects, events, workshops, and
                memorable moments
              </p>
            </header>

            <GalleryClient items={galleryItems} filters={filters} />
          </div>
        </Container>
      </section>
    </main>
  );
}


