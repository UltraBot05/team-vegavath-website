import { sql } from "@/lib/db";
import type { TeamMember, CreateMemberInput, UpdateMemberInput } from "@/types/member";

export async function getMembers(): Promise<TeamMember[]> {
  const rows = await sql`
    SELECT * FROM team_members
    WHERE is_active = true
    ORDER BY tier, display_order ASC`;
  return rows as TeamMember[];
}

export async function getMembersByTier(
  tier: "core" | "crew" | "legacy"
): Promise<TeamMember[]> {
  const rows = await sql`
    SELECT * FROM team_members
    WHERE tier = ${tier} AND is_active = true
    ORDER BY display_order ASC`;
  return rows as TeamMember[];
}

export async function createMember(input: CreateMemberInput): Promise<TeamMember> {
  const rows = await sql`
    INSERT INTO team_members (
      name, role, tier, domain, quote,
      photo_url, display_order, is_active
    ) VALUES (
      ${input.name}, ${input.role}, ${input.tier},
      ${input.domain ?? null}, ${input.quote ?? null},
      ${input.photo_url ?? null}, ${input.display_order}, ${input.is_active}
    ) RETURNING *`;
  return rows[0] as TeamMember;
}

export async function updateMember(
  id: string,
  input: UpdateMemberInput
): Promise<TeamMember | null> {
  const rows = await sql`
    UPDATE team_members SET
      name = COALESCE(${input.name ?? null}, name),
      role = COALESCE(${input.role ?? null}, role),
      tier = COALESCE(${input.tier ?? null}, tier),
      domain = COALESCE(${input.domain ?? null}, domain),
      quote = COALESCE(${input.quote ?? null}, quote),
      photo_url = COALESCE(${input.photo_url ?? null}, photo_url),
      display_order = COALESCE(${input.display_order ?? null}, display_order)
    WHERE id = ${id}
    RETURNING *`;
  return (rows[0] as TeamMember) ?? null;
}

export async function toggleMemberActive(
  id: string,
  is_active: boolean
): Promise<void> {
  await sql`
    UPDATE team_members SET is_active = ${is_active} WHERE id = ${id}`;
}

export async function deleteMember(id: string): Promise<void> {
  await sql`DELETE FROM team_members WHERE id = ${id}`;
}