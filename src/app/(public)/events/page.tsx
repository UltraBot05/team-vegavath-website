import type { Metadata } from "next";
import { getEvents } from "@/lib/services/events";
import type { Event } from "@/types/event";
import EventsClient from "@/components/events/EventsClient";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Events | Team Vegavath",
};

export const revalidate = 60;

export default async function EventsPage() {
  let events: Event[] = [];

  try {
    events = await getEvents({ limit: 50 });
  } catch {
    events = [];
  }

  return (
    <main className="bg-[#121212] text-[#EBEBEB]">
      <section className="w-full py-24">
        <Container>
          <div className="space-y-8">
            <header className="mx-auto w-full max-w-4xl space-y-4 border border-red-500 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-[#EBEBEB] md:text-5xl">
                Events
              </h1>
            </header>
            <EventsClient events={events} />
          </div>
        </Container>
      </section>
    </main>
  );
}


