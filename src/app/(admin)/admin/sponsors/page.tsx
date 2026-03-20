import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import SponsorForm from "@/components/admin/SponsorForm";
import { auth } from "@/lib/auth";
import { getSponsors } from "@/lib/services/sponsors";
import type { Sponsor } from "@/types/sponsor";

export const metadata: Metadata = {
  title: "Sponsors | Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminSponsorsPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string }>;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const { new: newMode } = await searchParams;

  if (newMode === "true") {
    return (
      <main className="min-h-screen bg-[#121212] px-4 py-10 text-[#EBEBEB] sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#EBEBEB]">Add New Sponsor</h1>
          <SponsorForm mode="create" />
        </div>
      </main>
    );
  }

  const sponsors = await getSponsors().catch(() => [] as Sponsor[]);

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-[#EBEBEB] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#EBEBEB]">Manage Sponsors</h1>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/admin/dashboard"
            className="w-fit text-sm text-[#9a9a9a] transition-colors hover:text-[#EBEBEB]"
          >
            ← Back to dashboard
          </Link>

          <Link
            href="/admin/sponsors?new=true"
            className="rounded-lg bg-[#EF5D08] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#d84f00]"
          >
            Add New Sponsor
          </Link>
        </div>

        <section className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#2a2a2a] text-sm">
              <thead className="bg-[#121212] text-left text-xs uppercase tracking-[0.12em] text-[#9a9a9a]">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Tier</th>
                  <th className="px-5 py-3">Active</th>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Logo URL</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a2a]">
                {sponsors.length > 0 ? (
                  sponsors.map((sponsor) => (
                    <tr key={sponsor.id} className="text-[#EBEBEB]">
                      <td className="whitespace-nowrap px-5 py-3 font-medium text-[#EBEBEB]">
                        {sponsor.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 uppercase text-[#c7c7c7]">
                        {sponsor.tier}
                      </td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <span
                          className={sponsor.is_active ? "text-green-400" : "text-red-400"}
                        >
                          {sponsor.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-3 text-[#c7c7c7]">
                        {sponsor.display_order}
                      </td>
                      <td className="px-5 py-3 text-[#c7c7c7]">{truncateText(sponsor.logo_url, 40)}</td>
                      <td className="whitespace-nowrap px-5 py-3">
                        <Link
                          href={`/admin/sponsors/${sponsor.id}/edit`}
                          className="rounded-md border border-[#2a2a2a] bg-[#121212] px-3 py-1 text-xs font-medium text-[#EBEBEB] transition-colors hover:border-[#EF5D08]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center text-[#9a9a9a]">
                      No sponsors yet.
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

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}...`;
}
