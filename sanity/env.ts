/**
 * Centralised environment variable access for all Sanity configuration.
 * Throws at startup if a required variable is missing — fail fast,
 * fail loud, rather than producing mysterious fetch errors at runtime.
 */

function assertEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `[Sanity] Missing required environment variable: "${key}"\n` +
        `Make sure it is set in .env.local and that you have restarted the dev server.`
    );
  }
  return value;
}

export const sanityEnv = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mhnc2acu",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  /**
   * API version — pin to a specific date so queries never silently
   * change behaviour when Sanity releases breaking API updates.
   */
  apiVersion: "2024-01-01",
  /**
   * The read token is only needed server-side (for draft previews, etc.).
   * Public pages use the unauthenticated CDN.
   */
  readToken: process.env.SANITY_API_READ_TOKEN ?? "",
} as const;