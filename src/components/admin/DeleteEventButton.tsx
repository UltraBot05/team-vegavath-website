"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteEventButtonProps {
  id: string;
  title: string;
}

export default function DeleteEventButton({ id, title }: DeleteEventButtonProps) {
  const router = useRouter();
  const [archiving, setArchiving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleArchive() {
    if (!confirm(`Archive "${title}"? It will be hidden from the public site but can be restored.`)) return;
    setArchiving(true);
    try {
      const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
      if (res.ok) router.push("/admin/events");
      else alert("Failed to archive event");
    } catch {
      alert("Failed to archive event");
    } finally {
      setArchiving(false);
    }
  }

  async function handlePermanentDelete() {
    const confirm1 = confirm(`Permanently delete "${title}"? This CANNOT be undone.`);
    if (!confirm1) return;
    const confirm2 = confirm(`Are you absolutely sure? "${title}" will be gone forever.`);
    if (!confirm2) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/events?id=${id}&permanent=true`, { method: "DELETE" });
      if (res.ok) router.push("/admin/events");
      else alert("Failed to delete event");
    } catch {
      alert("Failed to delete event");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-2">
      <button
        type="button"
        onClick={handleArchive}
        disabled={archiving || deleting}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-[#9a9a9a] transition-colors hover:border-[#EF5D08] hover:text-[#EBEBEB] disabled:opacity-50"
      >
        {archiving ? "Archiving..." : "Archive Event (hide from site)"}
      </button>
      <button
        type="button"
        onClick={handlePermanentDelete}
        disabled={archiving || deleting}
        className="w-full rounded-lg border border-red-800 bg-red-900/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-900/50 disabled:opacity-50"
      >
        {deleting ? "Deleting..." : "Permanently Delete Event"}
      </button>
    </div>
  );
}
