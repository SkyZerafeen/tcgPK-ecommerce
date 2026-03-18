import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getRequiredPublicEnv(
  name: "NEXT_PUBLIC_SUPABASE_URL" | "NEXT_PUBLIC_SUPABASE_ANON_KEY",
): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${name}. Add it to .env.local (and keep it out of git).`,
    );
  }
  return value;
}

/**
 * Creates a Supabase client for Server Components.
 *
 * This is intentionally "auth-less" (no cookie/session persistence) since
 * `products` is publicly readable via RLS. We'll introduce SSR cookie handling
 * when we implement real authentication.
 */
export function createSupabaseServerClient(): SupabaseClient {
  return createClient(
    getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_URL"),
    getRequiredPublicEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    },
  );
}

