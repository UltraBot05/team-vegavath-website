export interface Sponsor {
  id: string;
  name: string;
  logo_url: string;
  website_url: string | null;
  description: string | null;
  tier: "title" | "gold" | "silver" | "community";
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export type CreateSponsorInput = Omit<Sponsor, "id" | "created_at">;
export type UpdateSponsorInput = Partial<CreateSponsorInput>;