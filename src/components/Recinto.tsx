"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useLiveUpdates } from "@/hooks/useLiveUpdates";

type Zone = {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  image?: string;
};

const ZOOM_SCALE = 2.5;

export default function PublicMap({ initialZones }: { initialZones: Zone[] }) {
  const zones = initialZones;
  useLiveUpdates("stands");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const salaParam = searchParams.get("sala");

  // Si llegamos desde el cronograma con ?sala=Salón A, seleccionamos
  // automáticamente la zona cuyo nombre coincida (comparación flexible).
  useEffect(() => {
    if (!salaParam || zones.length === 0) return;
    const match = zones.find(
      (z) => z.label.trim().toLowerCase() === salaParam.trim().toLowerCase()
    );
    if (match) setSelectedZone(match);
  }, [salaParam, zones]);

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
              src="/mapa.svg"
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

            {/*
              AQUÍ VA TU INFORMACIÓN PERSONALIZADA POR ZONA.
              Por ejemplo, podrías tener un objeto/JSON con el detalle de
              cada zona por id y renderizarlo aquí según selectedZone.id.
            */}
            <p className="map-info-placeholder">
              Información de "{selectedZone.label}" aquí.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
