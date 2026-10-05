import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Sin credenciales no se rompe el build: las páginas se muestran vacías hasta configurarlas
// (en .env.local para desarrollo, o en las variables de entorno del sitio en Netlify).
export const supabaseConfigurado = Boolean(url && key);

if (!supabaseConfigurado) {
  console.warn(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY: no se cargarán datos de Supabase.",
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
