import { supabaseConfigurado, supabasePublico } from "@/lib/supabase";

/* ---------- Tipos ---------- */

export type Actividad = {
  tipo: string | null;
  tema: string | null;
  inicio: string | null;
  fin: string | null;
  salon: string | null;
  descripcion: string | null;
  ponentes: string[];
  moderadores: string[];
  dependencias: string[];
};

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "linkedin"
  | "website";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type Zone = {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  image?: string;
  infoImage?: string;
  description?: string;
  socialLinks?: SocialLink[];
};

/* ---------- Consultas (solo en Server Components) ---------- */

// Vista programa_cronograma. El tag "cronograma" es el mismo que usa useLiveUpdates.
export async function getCronograma(): Promise<Actividad[]> {
  if (!supabaseConfigurado) return [];

  const { data, error } = await supabasePublico("cronograma")
    .from("programa_cronograma")
    .select("*")
    .order("inicio", { ascending: true });

  if (error) {
    console.error("Error cargando programa_cronograma:", error.message);
    return [];
  }

  return (data ?? []).map((r: any) => ({
    tipo: r.tipo ?? null,
    tema: r.tema ?? null,
    inicio: r.inicio ?? null,
    fin: r.fin ?? null,
    salon: r.salon ?? null,
    descripcion: r.descripcion ?? null,
    ponentes: r.ponentes ?? [],
    moderadores: r.moderadores ?? [],
    dependencias: r.dependencias ?? [],
  }));
}

// Vista zonas_mapa. Si la zona viene en una columna JSONB `data`, se aplana.
export async function getZonas(): Promise<Zone[]> {
  if (!supabaseConfigurado) return [];

  const { data, error } = await supabasePublico("zonas")
    .from("zonas_mapa")
    .select("*");

  if (error) {
    console.error("Error cargando zonas_mapa:", error.message);
    return [];
  }

  return (data ?? []).map((r: any) =>
    r.data ? ({ id: r.id, ...r.data } as Zone) : (r as Zone),
  );
}
