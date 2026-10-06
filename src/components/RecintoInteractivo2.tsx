"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabaseNavegador } from "@/lib/supabase-browser";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { leerViewBox, obtenerZonas, type SocialPlatform, type VBox, type Zone } from "@/lib/mapa";

const ZOOM_SCALE = 5;
const MAP_SRC = "/mapa1.svg";

const SOCIAL_ICON_PATHS: Record<SocialPlatform, string> = {
  facebook:
    "M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.25-1.5 1.55-1.5H16.7V4.7C16.4 4.66 15.42 4.58 14.28 4.58c-2.38 0-4.02 1.45-4.02 4.12V10.9H7.5V14h2.76v8h3.24Z",
  instagram:
    "M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm0 6.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm4.7-6.25a.87.87 0 1 1-1.73 0 .87.87 0 0 1 1.73 0ZM20 8c-.06-1.24-.34-2.34-1.24-3.24C17.86 3.86 16.76 3.58 15.52 3.52 14.26 3.46 9.74 3.46 8.48 3.52 7.24 3.58 6.14 3.86 5.24 4.76 4.34 5.66 4.06 6.76 4 8c-.06 1.26-.06 5.78 0 7.04.06 1.24.34 2.34 1.24 3.24.9.9 2 1.18 3.24 1.24 1.26.06 5.78.06 7.04 0 1.24-.06 2.34-.34 3.24-1.24.9-.9 1.18-2 1.24-3.24.06-1.26.06-5.77 0-7.04ZM18.5 16.1a2.9 2.9 0 0 1-1.63 1.63c-1.13.45-3.8.34-5.04.34s-3.92.1-5.04-.34a2.9 2.9 0 0 1-1.63-1.63c-.45-1.12-.35-3.8-.35-5.04s-.1-3.92.35-5.04A2.9 2.9 0 0 1 6.79 4.4c1.13-.45 3.8-.34 5.04-.34s3.92-.1 5.04.34c.76.3 1.34.87 1.63 1.63.45 1.12.35 3.8.35 5.04s.1 3.92-.35 5.04Z",
  twitter:
    "m14.2 10.4 6.14-7.14h-1.45l-5.33 6.2-4.26-6.2H3.5l6.44 9.37L3.5 20.1h1.45l5.63-6.55 4.5 6.55h5.8l-6.68-9.7Zm-2 2.32-.65-.94-5.2-7.44h2.23l4.2 6 .65.94 5.46 7.81h-2.23l-4.46-6.37Z",
  linkedin:
    "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.24h4.56V23H.22V8.24zM8.02 8.24h4.37v2.02h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.98V23h-4.56v-6.77c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.6 1.76-2.6 3.57V23H8.02V8.24z",
  website:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.93 6h-3.1a15.6 15.6 0 0 0-1.38-4.24A8.02 8.02 0 0 1 18.93 8ZM12 4.06c.78 1.05 1.7 2.6 2.2 3.94H9.8c.5-1.34 1.42-2.9 2.2-3.94ZM4.26 14a8.1 8.1 0 0 1 0-4h3.5a16.6 16.6 0 0 0 0 4h-3.5Zm.81 2h3.1a15.6 15.6 0 0 0 1.38 4.24A8.02 8.02 0 0 1 5.07 16Zm3.1-8h-3.1a8.02 8.02 0 0 1 4.48-4.24A15.6 15.6 0 0 0 8.17 8ZM12 19.94c-.78-1.05-1.7-2.6-2.2-3.94h4.4c-.5 1.34-1.42 2.9-2.2 3.94ZM14.5 14h-5a14.5 14.5 0 0 1 0-4h5a14.5 14.5 0 0 1 0 4Zm.62 5.24A15.6 15.6 0 0 0 16.5 15h3.1a8.02 8.02 0 0 1-4.48 4.24ZM17.24 13a16.6 16.6 0 0 0 0-4h3.5a8.1 8.1 0 0 1 0 4h-3.5Z",
};

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d={SOCIAL_ICON_PATHS[platform]} />
    </svg>
  );
}

export default function PublicMap() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const viewBox = useRef<VBox | null>(null);

  // Las zonas salen de Supabase (tabla zonas + su stand). El viewBox del plano se lee una sola vez.
  const cargar = useCallback(async () => {
    try {
      viewBox.current ??= await leerViewBox(MAP_SRC);
      setZones(await obtenerZonas(supabaseNavegador, viewBox.current));
    } catch (e) {
      console.warn("No se pudieron cargar las zonas:", e);
    }
  }, []);

  useEffect(() => {
    void cargar();
  }, [cargar]);

  // Si alguien edita el mapa en el dashboard, se actualiza sin recargar la página.
  useSupabaseRealtime(["zonas", "stands"], cargar);

  // Mantiene el panel abierto al día (o lo cierra si la zona ya no existe).
  useEffect(() => {
    setSelectedZone((actual) => (actual ? (zones.find((z) => z.id === actual.id) ?? null) : null));
  }, [zones]);

  const wrapperStyle: React.CSSProperties = selectedZone
    ? {
        transform: `scale(${ZOOM_SCALE})`,
        transformOrigin: `${selectedZone.xPct + selectedZone.wPct / 2}% ${
          selectedZone.yPct + selectedZone.hPct / 2
        }%`,
      }
    : { transform: "scale(1)" };

  return (
    <div className="map-public-page">
      <div className="map-public-body">
        <div className="map-container">
          <div className="map-zoom-wrapper" style={wrapperStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={MAP_SRC}
              alt="Mapa"
              className="map-image"
              draggable={false}
            />

            {zones.map((zone) => (
              <div
                key={zone.id}
                className="map-hotspot"
                style={{
                  left: `${zone.xPct}%`,
                  top: `${zone.yPct}%`,
                  width: `${zone.wPct}%`,
                  height: `${zone.hPct}%`,
                }}
                onClick={() => setSelectedZone(zone)}
                onMouseEnter={() => setHoveredId(zone.id)}
                onMouseLeave={() =>
                  setHoveredId((id) => (id === zone.id ? null : id))
                }
              >
                {zone.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={zone.image}
                    alt={zone.label}
                    className="map-hotspot-icon"
                  />
                ) : (
                  <div className="map-hotspot-icon-placeholder" />
                )}

                {hoveredId === zone.id && (
                  <div className="map-hotspot-tooltip">{zone.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedZone && (
          <div className="map-info-panel">
            <button
              className="map-info-close"
              onClick={() => setSelectedZone(null)}
            >
              ✕
            </button>
            <h3>{selectedZone.label}</h3>

            {selectedZone.infoImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={selectedZone.infoImage}
                alt={selectedZone.label}
                className="map-info-image"
              />
            ) : (
              <div className="map-info-image-placeholder">
                {/* IMAGEN_ZONA_AQUI: agrega infoImage en /zonas.json */}
                Imagen de "{selectedZone.label}" aquí
              </div>
            )}

            <p className="map-info-description">
              {selectedZone.description ??
                `Información de "${selectedZone.label}" aquí.`}
            </p>

            {selectedZone.socialLinks && selectedZone.socialLinks.length > 0 && (
              <div className="map-info-social">
                {selectedZone.socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    className="map-info-social-link"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    <SocialIcon platform={link.platform} />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
