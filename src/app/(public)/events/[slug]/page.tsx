import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Container } from "@/components/ui/Container";
import { getEventBySlug, getEvents } from "@/lib/services/events";
import { getGalleryByEvent } from "@/lib/services/gallery";

export const dynamic = "force-dynamic";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const events = await getEvents({ limit: 50 });

  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  return {
    title: event ? `${event.title} | Team Vegavath` : "Event | Team Vegavath",
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const galleryItems = await getGalleryByEvent(event.id);
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-[#EBEBEB]">
      <section className="w-full py-24">
        <Container>
          <div className="space-y-24">
            <Link
              href="/events"
              className="inline-flex w-fit items-center text-sm font-medium text-[#EF5D08] transition hover:text-[#F29C04]"
            >
              ← Back to Events
            </Link>

            <div className="rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a]/80 p-6 shadow-xl shadow-black/20 sm:p-8">
              <div className="flex flex-col items-center gap-6 text-center sm:justify-between">
                <div className="flex flex-col items-center gap-5 text-center">
                  {event.logo_url ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a]/80">
                      <Image
                        src={event.logo_url}
                        alt={`${event.title} logo`}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain p-2"
                      />
                    </div>
                  ) : null}

                  <div className="mx-auto w-full max-w-4xl space-y-3 border border-red-500 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#EF5D08]">
                      {formattedDate}
                    </p>
                    <h1 className="text-center text-4xl font-black tracking-tight text-[#EBEBEB] md:text-5xl">
                      {event.title}
                    </h1>
                    {event.description ? (
                      <div className="prose prose-invert mx-auto w-full max-w-3xl text-[#9a9a9a] [&_p]:text-center">
                        <ReactMarkdown>{event.description}</ReactMarkdown>
                      </div>
                    ) : null}
                  </div>
                </div>

                {event.registration_open ? (
                  <Link
                    href={event.registration_form_url || "/join"}
                    className="inline-flex w-fit items-center justify-center rounded-xl bg-[#EF5D08] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#F29C04]"
                  >
                    Register Now
                  </Link>
                ) : null}
              </div>
            </div>

            <section className="space-y-6">
              <div className="mx-auto w-full max-w-4xl border border-red-500 text-center">
                <h2 className="text-center text-4xl font-black tracking-tight text-[#EBEBEB] md:text-5xl">
                  Event Photos
                </h2>
              </div>

              {galleryItems.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryItems.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a]/80"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={item.url}
                          alt={item.caption || `${event.title} photo`}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-sm text-[#9a9a9a] sm:text-base">No photos yet.</p>
              )}
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}











