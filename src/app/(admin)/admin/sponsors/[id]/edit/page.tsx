import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import DeleteSponsorButton from "@/components/admin/DeleteSponsorButton";
import SponsorForm from "@/components/admin/SponsorForm";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit Sponsor | Admin",
};

export const dynamic = "force-dynamic";

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const { id } = await params;
  const rows = await sql`SELECT * FROM sponsors WHERE id = ${id} LIMIT 1`;

  if (rows.length === 0) {
    notFound();
  }

  const sponsor = rows[0]!;

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-[#EBEBEB] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Link
          href="/admin/sponsors"
          className="w-fit text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Back to sponsors
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#EBEBEB]">Edit Sponsor</h1>

        <SponsorForm
          mode="edit"
          initialData={{
            id: sponsor.id,
            name: sponsor.name,
            tier: sponsor.tier,
            website_url: sponsor.website_url,
            description: sponsor.description,
            display_order: sponsor.display_order,
            is_active: sponsor.is_active,
          }}
        />

        <DeleteSponsorButton id={sponsor.id as string} name={sponsor.name as string} />
      </div>
    </main>
  );
}