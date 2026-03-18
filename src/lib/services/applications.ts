import { sql } from "@/lib/db";
import type { Application, CreateApplicationInput } from "@/types/settings";

export async function createApplication(
  input: CreateApplicationInput
): Promise<Application> {
  const rows = await sql`
    INSERT INTO applications (
      name, email, domain_interest, portfolio_url
    ) VALUES (
      ${input.name}, ${input.email},
      ${input.domain_interest}, ${input.portfolio_url ?? null}
    ) RETURNING *`;
  return rows[0] as Application;
}

export async function getApplications(limit = 50): Promise<Application[]> {
  const rows = await sql`
    SELECT * FROM applications
    ORDER BY submitted_at DESC
    LIMIT ${limit}`;
  return rows as Application[];
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"]
): Promise<void> {
  await sql`
    UPDATE applications SET status = ${status} WHERE id = ${id}`;
}