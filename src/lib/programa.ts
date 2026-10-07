import type { SupabaseClient } from "@supabase/supabase-js";

export type Actividad = {
  tipo: string | null;
  tema: string | null;
  inicio: string | null; // 'AAAA-MM-DDTHH:mm:00', la hora tal cual (sin zona)
  fin: string | null;
  salon: string | null;
  descripcion: string | null;
  ponentes: string[];
  moderadores: string[];
  dependencias: string[];
};

type FilaPrograma = Omit<Actividad, "ponentes" | "moderadores" | "dependencias"> & {
  ponentes: string[] | null;
  moderadores: string[] | null;
  dependencias: string[] | null;
};

// Las horas de las charlas se guardan "tal cual" en UTC (9:00 del evento = 09:00Z). Aquí solo se
// normalizan a 'AAAA-MM-DDTHH:mm:00' para que getDay/getTime del cronograma las lean sin convertir.
export const horaTalCual = (iso: string | null) => (iso ? new Date(iso).toISOString().slice(0, 19) : null);

// Sirve con cualquier cliente: supabasePublico() en el servidor o supabaseNavegador en el navegador.
export async function obtenerPrograma(db: SupabaseClient): Promise<Actividad[]> {
  const { data, error } = await db
    .from("programa_cronograma")
    .select("tipo,tema,inicio,fin,salon,descripcion,ponentes,moderadores,dependencias")
    .order("inicio");
  if (error) throw new Error(error.message);

  return ((data ?? []) as FilaPrograma[]).map((a) => ({
    ...a,
    inicio: horaTalCual(a.inicio),
    fin: horaTalCual(a.fin),
    ponentes: a.ponentes ?? [],
    moderadores: a.moderadores ?? [],
    dependencias: a.dependencias ?? [],
  }));
}
