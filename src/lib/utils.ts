/**
 * Generates a URL-friendly slug from a string.
 * Example: "EmbedX 2.0" → "embedx-2-0"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Formats a date string to DD/MM/YYYY display format.
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formats a date string to readable format.
 * Example: "November 2025"
 */
export function formatDateLong(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

/**
 * Constructs a full R2 public URL from a path.
 */
export function r2Url(path: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "";
  return `${base}/${path}`;
}

/**
 * Returns true if a string is a valid URL.
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns true if a string is a valid email address.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}