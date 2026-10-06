import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local",
  );
}

// Para componentes "use client": lecturas públicas y suscripción a cambios en tiempo real.
// (En Server Components se usa supabasePublico() de lib/supabase.ts, que cachea con etiquetas.)
export const supabaseNavegador = createClient(url as string, key as string, {
  auth: { persistSession: false, autoRefreshToken: false },
});
