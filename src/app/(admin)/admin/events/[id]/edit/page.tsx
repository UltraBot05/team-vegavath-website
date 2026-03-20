import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import DeleteEventButton from "@/components/admin/DeleteEventButton";
import EventForm from "@/components/admin/EventForm";
import ToggleEventStatusButton from "@/components/admin/ToggleEventStatusButton";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit Event | Admin",
};

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const { id } = await params;
  const rows = await sql`SELECT * FROM events WHERE id = ${id} LIMIT 1`;

  if (rows.length === 0) {
    notFound();
  }

  const event = rows[0]!;
  const formattedDate = event.event_date
    ? new Date(event.event_date as string).toISOString().slice(0, 10)
    : "";

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-[#EBEBEB] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Link
          href="/admin/events"
          className="w-fit text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Back to events list
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#EBEBEB]">Edit Event</h1>

        <EventForm
          mode="edit"
          initialData={{
            id: event.id,
            title: event.title,
            slug: event.slug,
            category: event.category,
            status: event.status,
            description: event.description,
            event_date: formattedDate,
            registration_open: event.registration_open,
            registration_form_url: event.registration_form_url,
          }}
        />

        <DeleteEventButton id={event.id as string} title={event.title as string} />
        <ToggleEventStatusButton
          id={event.id as string}
          currentStatus={event.status as string}
        />
      </div>
    </main>
  );
}