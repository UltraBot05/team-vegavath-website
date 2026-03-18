import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import SignOutButton from "@/components/admin/SignOutButton";
import { auth } from "@/lib/auth";
import { getApplications } from "@/lib/services/applications";
import { getEvents } from "@/lib/services/events";
import { getAllSettings } from "@/lib/services/settings";
import { getMembers } from "@/lib/services/team";
import type { Application, SiteSettings } from "@/types/settings";
import type { Event } from "@/types/event";
import type { TeamMember } from "@/types/member";

export const metadata: Metadata = {
  title: "Dashboard | Team Vegavath Admin",
};

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS: SiteSettings = {
  recruitment_open: false,
  maintenance_mode: false,
  maintenance_message: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  instagram_url: "",
  linkedin_url: "",
  github_url: "",
};

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(date);
}

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const [settings, applications, events, members] = await Promise.all([
    getAllSettings().catch(() => DEFAULT_SETTINGS),
    getApplications(10).catch(() => [] as Application[]),
    getEvents({ limit: 5 }).catch(() => [] as Event[]),
    getMembers().catch(() => [] as TeamMember[]),
  ]);

  const pendingApplications = applications.filter(
    (application) => application.status === "pending"
  ).length;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
          <SignOutButton />
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Total Events</p>
            <p className="mt-2 text-3xl font-bold text-zinc-100">{events.length}</p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Total Members</p>
            <p className="mt-2 text-3xl font-bold text-zinc-100">{members.length}</p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Pending Applications
            </p>
            <p className="mt-2 text-3xl font-bold text-zinc-100">{pendingApplications}</p>
          </article>

          <article className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Recruitment Status</p>
            <p
              className={`mt-2 text-3xl font-bold ${
                settings.recruitment_open ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {settings.recruitment_open ? "OPEN" : "CLOSED"}
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/events"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Manage Events
          </Link>
          <Link
            href="/admin/team"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Manage Team
          </Link>
          <Link
            href="/admin/gallery"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Manage Gallery
          </Link>
          <Link
            href="/admin/sponsors"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Manage Sponsors
          </Link>
          <Link
            href="/admin/settings"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600 hover:bg-zinc-800"
          >
            Settings
          </Link>
        </section>

        <section className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
          <div className="border-b border-zinc-800 px-5 py-4">
            <h2 className="text-lg font-bold text-zinc-100">Recent Applications</h2>
            <p className="mt-1 text-sm text-zinc-400">Latest 10 submissions from join form</p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800 text-sm">
              <thead className="bg-zinc-950/60 text-left text-xs uppercase tracking-[0.12em] text-zinc-400">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Domain</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {applications.length > 0 ? (
                  applications.map((application) => (
                    <tr key={application.id} className="text-zinc-200">
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-zinc-100">
                        {application.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-zinc-300">
                        {application.email}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">{application.domain_interest}</td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span className="inline-flex rounded-full border border-zinc-700 px-2 py-1 text-xs uppercase tracking-wide text-zinc-200">
                          {application.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-zinc-300">
                        {formatDate(application.submitted_at)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-zinc-400">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
