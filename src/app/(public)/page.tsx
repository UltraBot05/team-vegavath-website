import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getUpcomingEvents, getPastEvents } from "@/lib/services/events";
import { getActiveSponsors } from "@/lib/services/sponsors";
import KartModelWrapper from "@/components/home/KartModelWrapper";

export const metadata: Metadata = {
  title: "Team Vegavath | Innovation in Automotive, Robotics & Technology",
};

export const revalidate = 60;

const domains = [
  {
    name: "Automotive",
    description: "High-performance systems for race-ready electric karts.",
  },
  {
    name: "Robotics",
    description: "Autonomous workflows, sensing, and control integration.",
  },
  {
    name: "Design",
    description: "Human-centric product, CAD, and rapid prototyping.",
  },
  {
    name: "Media",
    description: "Storytelling, documentation, and creative production.",
  },
  {
    name: "Marketing",
    description: "Partnership growth and strategic team outreach.",
  },
];

function formatEventDate(date: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

type EventPreview = {
  id: string;
  slug: string;
  title: string;
  event_date: string;
  cover_image_url: string | null;
};

export default async function HomePage() {
  const [upcomingEvents, pastEvents, sponsors] = await Promise.all([
    (async (): Promise<EventPreview[]> => {
      try {
        return await getUpcomingEvents(3);
      } catch {
        return [];
      }
    })(),
    (async (): Promise<EventPreview[]> => {
      try {
        return await getPastEvents(3);
      } catch {
        return [];
      }
    })(),
    (async () => {
      try {
        return await getActiveSponsors();
      } catch {
        return [];
      }
    })(),
  ]);

  return (
    <main>
      <section className="flex min-h-screen items-center justify-center px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl md:text-7xl">
            Team Vegavath
          </h1>
          <p className="mt-6 text-lg text-zinc-600 sm:text-xl">
            Innovation in Automotive, Robotics, and Technology
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/join"
              className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Join Us
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">Our Build</h2>
          <KartModelWrapper />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-zinc-900">Our Domains</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {domains.map((domain) => (
              <div key={domain.name} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {domain.name[0]}
                </div>
                <h3 className="text-lg font-bold text-zinc-900">{domain.name}</h3>
                <p className="mt-2 line-clamp-1 text-sm text-zinc-600">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">Upcoming Events</h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-zinc-600">No upcoming events. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-video w-full bg-zinc-200">
                    {event.cover_image_url ? (
                      <Image
                        src={event.cover_image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-zinc-900">{event.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{formatEventDate(event.event_date)}</p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="mt-4 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/events" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {pastEvents.length > 0 ? (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">Past Events</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {pastEvents.slice(0, 3).map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-video w-full bg-zinc-200">
                    {event.cover_image_url ? (
                      <Image
                        src={event.cover_image_url}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-zinc-900">{event.title}</h3>
                    <p className="mt-1 text-sm text-zinc-600">{formatEventDate(event.event_date)}</p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="mt-4 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/events" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                View All Events
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {sponsors.length > 0 ? (
        <section className="px-6 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">Our Partners</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {sponsors.map((sponsor) => (
                <Link
                  key={sponsor.id}
                  href={sponsor.website_url ?? "#"}
                  target={sponsor.website_url ? "_blank" : undefined}
                  rel={sponsor.website_url ? "noreferrer" : undefined}
                  className="rounded-lg border border-zinc-200 bg-white p-4"
                >
                  <Image
                    src={sponsor.logo_url}
                    alt={sponsor.name}
                    width={120}
                    height={60}
                    className="h-[60px] w-[120px] object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-zinc-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Join Team Vegavath</h2>
          <p className="mt-4 text-zinc-300">
            Be part of a community building the future of mobility and technology
          </p>
          <div className="mt-8">
            <Link
              href="/join"
              className="inline-flex rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}