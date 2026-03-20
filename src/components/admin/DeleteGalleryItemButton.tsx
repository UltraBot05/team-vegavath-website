"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteGalleryItemButtonProps = {
  id: string;
};

export default function DeleteGalleryItemButton({ id }: DeleteGalleryItemButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) {
      return;
    }

    setDeleting(true);

    try {
      const response = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete gallery item.");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-sm text-red-400 transition-colors hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}