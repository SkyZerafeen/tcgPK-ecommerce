import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getRequiredPublicEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Add it to .env.local (and keep it out of git).`,
    );
  }
  return value;
}

/**
 * Creates a Supabase client configured from public env vars.
 *
 * Note: This is a minimal setup (no SSR cookie handling yet). We'll add
 * server/middleware clients when we implement authentication flows.
 */
export function createSupabaseClient(): SupabaseClient {
  return createClient(
    getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}

export const supabaseClient = createSupabaseClient();

