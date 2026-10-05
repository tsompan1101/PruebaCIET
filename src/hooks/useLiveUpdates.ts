"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { revalidarTag } from "@/app/actions/revalidar";

// Tablas reales (no vistas) que alimentan cada tag. Supabase Realtime no emite
// eventos de vistas, así que hay que escuchar las tablas de origen.
// AJUSTA estos nombres a tu esquema.
const TABLAS_POR_TAG: Record<string, string[]> = {
  cronograma: ["charlas"],
  zonas: ["zonas", "stands"],
};

let cliente: SupabaseClient | null = null;

function getCliente(): SupabaseClient {
  if (!cliente) {
    cliente = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }
  return cliente;
}

// Misma firma que antes: useLiveUpdates("cronograma").
// Cuando cambia una tabla en Supabase, invalida el caché del tag y vuelve a
// renderizar la página en el servidor con los datos nuevos.
export function useLiveUpdates(tag: string) {
  const router = useRouter();

  useEffect(() => {
    const supabase = getCliente();
    const tablas = TABLAS_POR_TAG[tag] ?? [tag];
    let timer: ReturnType<typeof setTimeout> | undefined;

    // Agrupa ráfagas de cambios (p. ej. un PUT que reemplaza todas las zonas).
    const refrescar = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await revalidarTag(tag);
        router.refresh();
      }, 500);
    };

    let canal = supabase.channel(`live-${tag}`);
    for (const table of tablas) {
      canal = canal.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        refrescar,
      );
    }
    canal.subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(canal);
    };
  }, [tag, router]);
}
