"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// El servidor Rust ya avisa a /api/revalidate por su cuenta (server-to-server)
// cada vez que cambia algo en Postgres, así que este hook YA NO llama a
// /api/revalidate — solo escucha el WebSocket y le pide a Next.js que vuelva
// a pintar la página con lo que Rust ya dejó fresco en el caché.
export function useLiveUpdates(tag: "cronograma" | "stands") {
  const router = useRouter();

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
      console.warn("NEXT_PUBLIC_WS_URL no está configurado.");
      return;
    }

    const socket = new WebSocket(wsUrl);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // El servidor manda el nombre de la tabla en "table", no "tipo".
        if (data.table && data.table !== tag) return;
      } catch {
        return;
      }

      // Rust ya invalidó el caché (revalidateTag) antes de que llegue este
      // mensaje — aquí solo se le pide al router que vuelva a pedir los
      // Server Components para que la UI de esta pestaña se actualice sola.
      router.refresh();
    };

    socket.onerror = () => {
      console.warn("Error de conexión al WebSocket:", wsUrl);
    };

    return () => socket.close();
  }, [tag, router]);
}
