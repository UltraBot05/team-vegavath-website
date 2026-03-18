export interface GalleryItem {
  id: string;
  event_id: string | null;
  event_label: string;
  type: "image" | "video";
  url: string;
  thumbnail_url: string | null;
  caption: string | null;
  taken_at: string | null;
  display_order: number;
  created_at: string;
}

export type CreateGalleryItemInput = Omit<GalleryItem, "id" | "created_at">;