"use client";

import { useEffect, useRef } from "react";
import { supabaseNavegador } from "@/lib/supabase-browser";

// Llama a onChange cuando cambia alguna de las tablas indicadas. Espera 400 ms para agrupar
// ráfagas (guardar 30 zonas de una vez genera 30 eventos, pero solo una recarga).
// Requiere que las tablas estén en la publicación supabase_realtime y tengan lectura pública (RLS).
export function useSupabaseRealtime(tablas: string[], onChange: () => void) {
  const callback = useRef(onChange);
  useEffect(() => {
    callback.current = onChange;
  });

  const clave = tablas.join(",");

  useEffect(() => {
    let espera: ReturnType<typeof setTimeout> | undefined;
    const disparar = () => {
      clearTimeout(espera);
      espera = setTimeout(() => callback.current(), 400);
    };

    // Nombre único: dos componentes pueden suscribirse a las mismas tablas sin chocar.
    const canal = supabaseNavegador.channel(`live-${crypto.randomUUID()}`);
    for (const tabla of clave.split(",")) {
      canal.on("postgres_changes", { event: "*", schema: "public", table: tabla }, disparar);
    }
    canal.subscribe();

    return () => {
      clearTimeout(espera);
      void supabaseNavegador.removeChannel(canal);
    };
  }, [clave]);
}
