import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

import DeleteMemberButton from "@/components/admin/DeleteMemberButton";
import MemberForm from "@/components/admin/MemberForm";
import { auth } from "@/lib/auth";
import { sql } from "@/lib/db";

export const metadata: Metadata = {
  title: "Edit Member | Admin",
};

export const dynamic = "force-dynamic";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    redirect("/admin");
  }

  const { id } = await params;
  const rows = await sql`SELECT * FROM team_members WHERE id = ${id} LIMIT 1`;

  const member = rows[0];

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#121212] px-4 py-10 text-[#EBEBEB] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Link
          href="/admin/team"
          className="w-fit text-sm text-zinc-400 transition-colors hover:text-zinc-200"
        >
          ← Back to team list
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#EBEBEB]">Edit Member</h1>

        <MemberForm
          mode="edit"
          initialData={{
            id: member.id,
            name: member.name,
            role: member.role,
            tier: member.tier,
            domain: member.domain,
            quote: member.quote,
            linkedin_url: member.linkedin_url,
            display_order: member.display_order,
            is_active: member.is_active,
          }}
        />

        <DeleteMemberButton id={member.id as string} name={member.name as string} />
      </div>
    </main>
  );
}
