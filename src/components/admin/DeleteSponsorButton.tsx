"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteSponsorButtonProps = {
  id: string;
  name: string;
};

export default function DeleteSponsorButton({ id, name }: DeleteSponsorButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = confirm(`Delete sponsor "${name}"? This cannot be undone.`);
    if (!confirmed) {
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/sponsors?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete sponsor");
      }

      router.push("/admin/sponsors");
    } catch (error) {
      console.error(error);
      alert("Failed to delete sponsor");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="mt-4 w-full rounded-lg border border-red-800 bg-red-900/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/50 disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete Sponsor"}
    </button>
  );
}