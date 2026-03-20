"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteMemberButtonProps {
  id: string;
  name: string;
}

export default function DeleteMemberButton({ id, name }: DeleteMemberButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Permanently delete "${name}"? This cannot be undone.`)) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });

      if (res.ok) {
        router.push("/admin/team");
      } else {
        alert("Failed to delete member");
      }
    } catch {
      alert("Failed to delete member");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="mt-4 w-full rounded-lg border border-red-800 bg-red-900/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-900/50 disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete Member"}
    </button>
  );
}