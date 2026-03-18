import Image from "next/image";
import type { Metadata } from "next";

import { getGalleryItems, getGalleryEvents } from "@/lib/services/gallery";
import type { GalleryItem } from "@/types/gallery";

export const metadata: Metadata = {
  title: "Gallery | Team Vegavath",
};

export const revalidate = 120;

type GalleryEventFilter = {
  event_label: string;
};

export default async function GalleryPage() {
  let galleryItems: GalleryItem[] = [];
  let galleryEvents: GalleryEventFilter[] = [];

  try {
    [galleryItems, galleryEvents] = await Promise.all([
      getGalleryItems(30),
      getGalleryEvents(),
    ]);
  } catch {
    galleryItems = [];
    galleryEvents = [];
  }

  const filterLabels = [
    "All",
    ...Array.from(
      new Set(
        galleryEvents
          .map((event) => event.event_label)
          .filter((eventLabel) => eventLabel.trim().length > 0)
      )
    ),
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-black tracking-[0.2em] text-white sm:text-5xl">
            GALLERY
          </h1>
          <p className="mx-auto max-w-3xl text-sm text-zinc-400 sm:text-base">
            A visual journey through our projects, events, workshops, and
            memorable moments
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3">
          {filterLabels.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200 transition-colors hover:border-orange-500 hover:text-orange-400"
            >
              {label}
            </button>
          ))}
        </div>

        {galleryItems.length === 0 ? (
          <p className="text-center text-base text-zinc-300">No photos yet.</p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {galleryItems.map((item) => (
              <article key={item.id} className="mb-4 break-inside-avoid">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.caption || item.event_label || "Gallery image"}
                    width={800}
                    height={600}
                    className="w-full rounded-lg mb-4"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <iframe
                    src={item.url}
                    title={item.caption || item.event_label || "Gallery video"}
                    className="w-full aspect-video rounded-lg mb-4"
                    allowFullScreen
                  />
                )}

                {item.caption ? (
                  <p className="text-sm text-zinc-400">{item.caption}</p>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
