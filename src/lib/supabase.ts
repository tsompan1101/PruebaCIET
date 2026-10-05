import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  throw new Error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local",
  );
}

// Cliente de solo lectura (anon key) para Server Components. Cada consulta se guarda en la caché
// de Next con una etiqueta (para revalidateTag) y, como respaldo, caduca a los 5 minutos.
// Lo que puede leer el público lo decide RLS / los permisos por columna en la base, no esta clave.
export function supabasePublico(tag: string) {
  return createClient(url as string, key as string, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { tags: [tag], revalidate: 300 } }),
    },
  });
}
