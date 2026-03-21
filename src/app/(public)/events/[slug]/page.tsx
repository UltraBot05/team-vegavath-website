import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Container } from "@/components/ui/Container";
import { getEventBySlug, getEvents } from "@/lib/services/events";
import { getGalleryByEvent } from "@/lib/services/gallery";
import EventMediaClient from "@/components/events/EventMediaClient";

export const dynamic = "force-dynamic";

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const events = await getEvents({ limit: 50 });
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  return {
    title: event ? `${event.title} | Team Vegavath` : "Event | Team Vegavath",
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const galleryItems = await getGalleryByEvent(event.id);
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <main style={{ minHeight: "100vh", background: "#121212", color: "#EBEBEB" }}>
      <section style={{ width: "100%", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <Container>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>

            <Link
              href="/events"
              className="inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border-[1.5px] border-[#EF5D08] bg-transparent px-6 py-3.5 text-[clamp(0.95rem,1.2vw,1rem)] font-semibold leading-[1.15] text-[#EF5D08] no-underline transition-all duration-200 hover:bg-[#EF5D08] hover:text-white"
            >
              ← Back to Events
            </Link>

            <div style={{ borderRadius: "1.5rem", border: "1px solid #2a2a2a", background: "#1a1a1a", padding: "2rem 1.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", textAlign: "center" }}>
                {event.logo_url ? (
                  <div style={{ position: "relative", height: "5rem", width: "5rem", overflow: "hidden", borderRadius: "1rem", border: "1px solid #2a2a2a", background: "#1a1a1a" }}>
                    <Image
                      src={event.logo_url}
                      alt={`${event.title} logo`}
                      width={80}
                      height={80}
                      style={{ height: "80px", width: "80px", objectFit: "contain", padding: "0.5rem" }}
                    />
                  </div>
                ) : null}

                <div style={{ width: "100%", textAlign: "center" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.28em", color: "#EF5D08" }}>
                    {formattedDate}
                  </p>
                  <h1 style={{ marginTop: "0.75rem", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#EBEBEB", textAlign: "center" }}>
                    {event.title}
                  </h1>
                  {event.description ? (
                    <div style={{ marginTop: "1rem", color: "#9a9a9a", lineHeight: 1.7, fontSize: "1rem", textAlign: "center" }}>
                      <ReactMarkdown>{event.description}</ReactMarkdown>
                    </div>
                  ) : null}
                </div>

                {event.registration_open ? (
                  <Link
                    href={event.registration_form_url || "/join"}
                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "9999px", background: "#EF5D08", padding: "0.75rem 2rem", fontSize: "0.875rem", fontWeight: 700, color: "white", textDecoration: "none" }}
                  >
                    Register Now
                  </Link>
                ) : null}
              </div>
            </div>

            {galleryItems.length > 0 ? (
              <section>
                <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, color: "#EBEBEB", textAlign: "center", marginBottom: "2rem" }}>
                  Event Media
                </h2>
                <EventMediaClient items={galleryItems} eventTitle={event.title} />
              </section>
            ) : null}

          </div>
        </Container>
      </section>
    </main>
  );
}











