"use client";

import { useEffect, useRef, useState } from "react";

type Zone = {
  id: string;
  label: string;
  xPct: number; // posición izquierda en %
  yPct: number; // posición superior en %
  wPct: number; // ancho en %
  hPct: number; // alto en %
};

const initialZones: Zone[] = [
  {
    "id": "zona-1783362552627",
    "label": "BAÑO 1",
    "xPct": 44.1,
    "yPct": 0.26666666666666666,
    "wPct": 4.599999999999994,
    "hPct": 7.200000000000001
  },
  {
    "id": "zona-1783362564265",
    "label": "BAÑO 2",
    "xPct": 63.7,
    "yPct": 0.5333333333333333,
    "wPct": 4.299999999999997,
    "hPct": 6.9333333333333345
  },
  {
    "id": "zona-1783362584686",
    "label": "BAÑO 3",
    "xPct": 28.999999999999996,
    "yPct": 66,
    "wPct": 5.400000000000002,
    "hPct": 6.799999999999997
  },
  {
    "id": "zona-1783362596777",
    "label": "ESCALERAS",
    "xPct": 34.5,
    "yPct": 66.4,
    "wPct": 4.700000000000003,
    "hPct": 5.86666666666666
  },
  {
    "id": "zona-1783362611400",
    "label": "VENTA 1",
    "xPct": 58.199999999999996,
    "yPct": 0.4,
    "wPct": 5.6000000000000085,
    "hPct": 7.333333333333333
  },
  {
    "id": "zona-1783362621801",
    "label": "VENTA 2",
    "xPct": 38.800000000000004,
    "yPct": 0.5333333333333333,
    "wPct": 4.999999999999993,
    "hPct": 7.2
  },
  {
    "id": "zona-1783362637154",
    "label": "CARGA MADERO",
    "xPct": 53.6,
    "yPct": 0.13333333333333333,
    "wPct": 4.499999999999993,
    "hPct": 7.466666666666666
  },
  {
    "id": "zona-1783362648329",
    "label": "CARGA ALTAMIRA",
    "xPct": 34.300000000000004,
    "yPct": 0.26666666666666666,
    "wPct": 4.399999999999999,
    "hPct": 7.6
  },
  {
    "id": "zona-1783362658196",
    "label": "CAMERINO",
    "xPct": 68.4,
    "yPct": 0.5333333333333333,
    "wPct": 3.1999999999999886,
    "hPct": 7.333333333333333
  },
  {
    "id": "zona-1783362673775",
    "label": "ESCENARIO PRINCIPAL",
    "xPct": 64.1,
    "yPct": 31.066666666666663,
    "wPct": 2.6000000000000085,
    "hPct": 11.600000000000009
  },
  {
    "id": "zona-1783362691960",
    "label": "FIRA",
    "xPct": 28.9,
    "yPct": 19.333333333333332,
    "wPct": 1.6999999999999993,
    "hPct": 2.1333333333333364
  },
  {
    "id": "zona-1783362710397",
    "label": "BT",
    "xPct": 29.099999999999998,
    "yPct": 36.666666666666664,
    "wPct": 1.5,
    "hPct": 2
  },
  {
    "id": "zona-1783362724947",
    "label": "UT1",
    "xPct": 28.999999999999996,
    "yPct": 38.93333333333333,
    "wPct": 1.6000000000000014,
    "hPct": 2
  },
  {
    "id": "zona-1783362737060",
    "label": "UT2",
    "xPct": 28.9,
    "yPct": 41.199999999999996,
    "wPct": 1.8000000000000007,
    "hPct": 1.7333333333333414
  },
  {
    "id": "zona-1783362798937",
    "label": "R1",
    "xPct": 31.2,
    "yPct": 21.2,
    "wPct": 1.9000000000000021,
    "hPct": 4.800000000000001
  },
  {
    "id": "zona-1783362817969",
    "label": "R2",
    "xPct": 42.6,
    "yPct": 50.26666666666667,
    "wPct": 3.3999999999999986,
    "hPct": 2.2666666666666586
  },
  {
    "id": "zona-1783362844884",
    "label": "R3",
    "xPct": 46,
    "yPct": 50.26666666666667,
    "wPct": 3,
    "hPct": 2.2666666666666586
  },
  {
    "id": "zona-1783362915144",
    "label": "CENAGAS1",
    "xPct": 31.3,
    "yPct": 13.733333333333334,
    "wPct": 3.2999999999999936,
    "hPct": 4.533333333333331
  },
  {
    "id": "zona-1783362928831",
    "label": "CFE",
    "xPct": 34.699999999999996,
    "yPct": 13.866666666666665,
    "wPct": 3.200000000000003,
    "hPct": 4.133333333333335
  },
  {
    "id": "zona-1783362939545",
    "label": "PEMEX",
    "xPct": 37.9,
    "yPct": 13.600000000000001,
    "wPct": 3.1000000000000014,
    "hPct": 4.666666666666664
  },
  {
    "id": "zona-1783362988335",
    "label": "SENER",
    "xPct": 41.199999999999996,
    "yPct": 13.466666666666665,
    "wPct": 3.1000000000000014,
    "hPct": 4.533333333333335
  },
  {
    "id": "zona-1783362998480",
    "label": "SEDENER",
    "xPct": 44.4,
    "yPct": 13.600000000000001,
    "wPct": 3,
    "hPct": 4.533333333333331
  },
  {
    "id": "zona-1783363014362",
    "label": "SEMARNAT",
    "xPct": 47.599999999999994,
    "yPct": 13.733333333333334,
    "wPct": 3.000000000000007,
    "hPct": 4.399999999999999
  },
  {
    "id": "zona-1783363028061",
    "label": "ASEA",
    "xPct": 50.6,
    "yPct": 13.733333333333334,
    "wPct": 3.3000000000000043,
    "hPct": 4.133333333333333
  },
  {
    "id": "zona-1783363047123",
    "label": "CNE",
    "xPct": 53.900000000000006,
    "yPct": 13.600000000000001,
    "wPct": 3.29999999999999,
    "hPct": 4.399999999999999
  },
  {
    "id": "zona-1783363096577",
    "label": "ECONOMÍA",
    "xPct": 33,
    "yPct": 21.2,
    "wPct": 3.1000000000000014,
    "hPct": 4.400000000000002
  },
  {
    "id": "zona-1783363118694",
    "label": "CENAGAS2",
    "xPct": 36.3,
    "yPct": 21.066666666666666,
    "wPct": 4.700000000000003,
    "hPct": 4.399999999999999
  },
  {
    "id": "zona-1783363138454",
    "label": "IMP",
    "xPct": 47.4,
    "yPct": 21.333333333333336,
    "wPct": 5.000000000000007,
    "hPct": 4.399999999999999
  },
  {
    "id": "zona-1783363150863",
    "label": "GEOTECO",
    "xPct": 52.300000000000004,
    "yPct": 21.2,
    "wPct": 3.3000000000000043,
    "hPct": 4.800000000000001
  },
  {
    "id": "zona-1783363178678",
    "label": "JAGUAR",
    "xPct": 55.60000000000001,
    "yPct": 21.333333333333336,
    "wPct": 1.5999999999999872,
    "hPct": 4.266666666666666
  },
  {
    "id": "zona-1783363194343",
    "label": "ENGIE",
    "xPct": 52.300000000000004,
    "yPct": 29.733333333333334,
    "wPct": 3.700000000000003,
    "hPct": 4.533333333333331
  },
  {
    "id": "zona-1783363203191",
    "label": "REYCO",
    "xPct": 41.9,
    "yPct": 37.46666666666666,
    "wPct": 4.800000000000004,
    "hPct": 6.400000000000006
  },
  {
    "id": "zona-1783363213534",
    "label": "CMIC",
    "xPct": 52.300000000000004,
    "yPct": 47.86666666666667,
    "wPct": 3.5,
    "hPct": 4.799999999999997
  },
  {
    "id": "zona-1783363350709",
    "label": "A",
    "xPct": 59.5,
    "yPct": 14.000000000000002,
    "wPct": 1.7999999999999972,
    "hPct": 4.399999999999997
  },
  {
    "id": "zona-1783363358214",
    "label": "B",
    "xPct": 61.199999999999996,
    "yPct": 13.600000000000001,
    "wPct": 1.500000000000007,
    "hPct": 2.2666666666666657
  },
  {
    "id": "zona-1783363371168",
    "label": "C",
    "xPct": 62.7,
    "yPct": 13.600000000000001,
    "wPct": 1.9000000000000057,
    "hPct": 2.133333333333331
  },
  {
    "id": "zona-1783363388939",
    "label": "D",
    "xPct": 61.3,
    "yPct": 16,
    "wPct": 1.4000000000000057,
    "hPct": 1.8666666666666671
  },
  {
    "id": "zona-1783363411967",
    "label": "E",
    "xPct": 62.8,
    "yPct": 15.6,
    "wPct": 1.5,
    "hPct": 2.533333333333333
  },
  {
    "id": "zona-1783363493531",
    "label": "F",
    "xPct": 32.800000000000004,
    "yPct": 29.333333333333332,
    "wPct": 2.0999999999999943,
    "hPct": 4.933333333333334
  },
  {
    "id": "zona-1783363515021",
    "label": "G",
    "xPct": 34.699999999999996,
    "yPct": 30,
    "wPct": 3.200000000000003,
    "hPct": 1.8666666666666671
  },
  {
    "id": "zona-1783363552022",
    "label": "H",
    "xPct": 34.9,
    "yPct": 32.266666666666666,
    "wPct": 2.8999999999999986,
    "hPct": 1.8666666666666671
  },
  {
    "id": "zona-1783363565033",
    "label": "I",
    "xPct": 37.7,
    "yPct": 30.133333333333333,
    "wPct": 1.7999999999999972,
    "hPct": 4
  },
  {
    "id": "zona-1783363600683",
    "label": "J",
    "xPct": 41.8,
    "yPct": 28.799999999999997,
    "wPct": 5.000000000000007,
    "hPct": 6.5333333333333385
  },
  {
    "id": "zona-1783363615189",
    "label": "K",
    "xPct": 49,
    "yPct": 29.599999999999998,
    "wPct": 3.200000000000003,
    "hPct": 2.400000000000002
  },
  {
    "id": "zona-1783363624716",
    "label": "L",
    "xPct": 49.1,
    "yPct": 32,
    "wPct": 3.1000000000000014,
    "hPct": 2.133333333333333
  },
  {
    "id": "zona-1783363645655",
    "label": "M",
    "xPct": 32.800000000000004,
    "yPct": 39.33333333333333,
    "wPct": 1.79999999999999,
    "hPct": 4.666666666666671
  },
  {
    "id": "zona-1783363657097",
    "label": "N",
    "xPct": 34.699999999999996,
    "yPct": 39.733333333333334,
    "wPct": 3.000000000000007,
    "hPct": 1.7333333333333343
  },
  {
    "id": "zona-1783363670521",
    "label": "O",
    "xPct": 34.699999999999996,
    "yPct": 41.86666666666667,
    "wPct": 3.3000000000000043,
    "hPct": 1.7333333333333343
  },
  {
    "id": "zona-1783363680693",
    "label": "P",
    "xPct": 37.8,
    "yPct": 39.6,
    "wPct": 1.7000000000000028,
    "hPct": 4
  },
  {
    "id": "zona-1783363689196",
    "label": "Q",
    "xPct": 48.9,
    "yPct": 39.6,
    "wPct": 1.7000000000000028,
    "hPct": 4.266666666666666
  },
  {
    "id": "zona-1783363719942",
    "label": "R",
    "xPct": 50.7,
    "yPct": 39.2,
    "wPct": 3.1000000000000014,
    "hPct": 2.5333333333333314
  },
  {
    "id": "zona-1783363734866",
    "label": "S",
    "xPct": 50.6,
    "yPct": 41.733333333333334,
    "wPct": 3.3000000000000043,
    "hPct": 2
  },
  {
    "id": "zona-1783363739967",
    "label": "T",
    "xPct": 53.800000000000004,
    "yPct": 39.733333333333334,
    "wPct": 1.7000000000000028,
    "hPct": 4.133333333333333
  },
  {
    "id": "zona-1783363756087",
    "label": "U",
    "xPct": 32.9,
    "yPct": 47.733333333333334,
    "wPct": 3.3999999999999986,
    "hPct": 4.799999999999997
  },
  {
    "id": "zona-1783363766172",
    "label": "V",
    "xPct": 36.199999999999996,
    "yPct": 48.266666666666666,
    "wPct": 3.200000000000003,
    "hPct": 1.8666666666666671
  },
  {
    "id": "zona-1783363847823",
    "label": "W",
    "xPct": 39.5,
    "yPct": 48,
    "wPct": 3.1000000000000014,
    "hPct": 2.266666666666673
  },
  {
    "id": "zona-1783363859497",
    "label": "X",
    "xPct": 42.699999999999996,
    "yPct": 48.13333333333333,
    "wPct": 3.200000000000003,
    "hPct": 2
  },
  {
    "id": "zona-1783363866252",
    "label": "Y",
    "xPct": 45.9,
    "yPct": 48.13333333333333,
    "wPct": 3.1000000000000014,
    "hPct": 2.13333333333334
  },
  {
    "id": "zona-1783363877879",
    "label": "Z",
    "xPct": 49.2,
    "yPct": 48,
    "wPct": 3.1000000000000014,
    "hPct": 2.6666666666666714
  }

];

const ZOOM_SCALE = 5.5;
const STORAGE_KEY = "mapa-zonas-borrador";
const HANDLE_SIZE_PCT = 1.5; // tamaño visual de las esquinas de redimensionado

type Interaction =
  | { type: "draw"; startX: number; startY: number }
  | { type: "move"; zoneId: string; offsetX: number; offsetY: number }
  | {
      type: "resize";
      zoneId: string;
      anchorX: number; // esquina opuesta fija, en %
      anchorY: number;
    }
  | null;

function clamp(n: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, n));
}

export default function InteractiveMap() {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoomedZone, setZoomedZone] = useState<Zone | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<Zone | null>(null);
  const [interaction, setInteraction] = useState<Interaction>(null);
  const [showJson, setShowJson] = useState(false);
  const [jsonText, setJsonText] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const selected = zones.find((z) => z.id === selectedId) ?? null;

  // Carga cualquier borrador guardado en el navegador (solo mientras editas)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setZones(JSON.parse(saved));
      } catch {
        /* ignora si está corrupto */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
  }, [zones]);

  function getPct(clientX: number, clientY: number) {
    const rect = containerRef.current!.getBoundingClientRect();
    return {
      x: clamp(((clientX - rect.left) / rect.width) * 100),
      y: clamp(((clientY - rect.top) / rect.height) * 100),
    };
  }

  function updateZone(id: string, changes: Partial<Zone>) {
    setZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, ...changes } : z))
    );
  }

  function deleteZone(id: string) {
    setZones((prev) => prev.filter((z) => z.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function duplicateZone(zone: Zone) {
    const copy: Zone = {
      ...zone,
      id: `zona-${Date.now()}`,
      label: `${zone.label} (copia)`,
      xPct: clamp(zone.xPct + 3),
      yPct: clamp(zone.yPct + 3),
    };
    setZones((prev) => [...prev, copy]);
    setSelectedId(copy.id);
  }

  // ---- Empezar interacción sobre el fondo (dibujar zona nueva) ----
  function handleContainerMouseDown(e: React.MouseEvent) {
    if (!editMode) return;
    const { x, y } = getPct(e.clientX, e.clientY);
    setSelectedId(null);
    setInteraction({ type: "draw", startX: x, startY: y });
    setDraft({ id: "draft", label: "", xPct: x, yPct: y, wPct: 0, hPct: 0 });
  }

  // ---- Empezar a mover una zona existente ----
  function handleZoneMouseDown(e: React.MouseEvent, zone: Zone) {
    if (!editMode) return;
    e.stopPropagation();
    const { x, y } = getPct(e.clientX, e.clientY);
    setSelectedId(zone.id);
    setInteraction({
      type: "move",
      zoneId: zone.id,
      offsetX: x - zone.xPct,
      offsetY: y - zone.yPct,
    });
  }

  // ---- Empezar a redimensionar desde una esquina ----
  function handleHandleMouseDown(
    e: React.MouseEvent,
    zone: Zone,
    corner: "nw" | "ne" | "sw" | "se"
  ) {
    if (!editMode) return;
    e.stopPropagation();
    const anchorX = corner.includes("w") ? zone.xPct + zone.wPct : zone.xPct;
    const anchorY = corner.includes("n") ? zone.yPct + zone.hPct : zone.yPct;
    setSelectedId(zone.id);
    setInteraction({ type: "resize", zoneId: zone.id, anchorX, anchorY });
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!interaction) return;
    const { x, y } = getPct(e.clientX, e.clientY);

    if (interaction.type === "draw") {
      setDraft({
        id: "draft",
        label: "",
        xPct: Math.min(interaction.startX, x),
        yPct: Math.min(interaction.startY, y),
        wPct: Math.abs(x - interaction.startX),
        hPct: Math.abs(y - interaction.startY),
      });
    } else if (interaction.type === "move") {
      const zone = zones.find((z) => z.id === interaction.zoneId);
      if (!zone) return;
      const newX = clamp(x - interaction.offsetX, 0, 100 - zone.wPct);
      const newY = clamp(y - interaction.offsetY, 0, 100 - zone.hPct);
      updateZone(zone.id, { xPct: newX, yPct: newY });
    } else if (interaction.type === "resize") {
      const { anchorX, anchorY } = interaction;
      const newX = Math.min(anchorX, x);
      const newY = Math.min(anchorY, y);
      const newW = Math.abs(x - anchorX);
      const newH = Math.abs(y - anchorY);
      updateZone(interaction.zoneId, {
        xPct: newX,
        yPct: newY,
        wPct: newW,
        hPct: newH,
      });
    }
  }

  function handleMouseUp() {
    if (interaction?.type === "draw" && draft) {
      if (draft.wPct >= 1 && draft.hPct >= 1) {
        const label = window.prompt("Nombre de esta zona:", "") || "";
        if (label.trim()) {
          const newZone: Zone = {
            ...draft,
            id: `zona-${Date.now()}`,
            label: label.trim(),
          };
          setZones((prev) => [...prev, newZone]);
          setSelectedId(newZone.id);
        }
      }
    }
    setDraft(null);
    setInteraction(null);
  }

  function copyJson() {
    const text = JSON.stringify(zones, null, 2);
    navigator.clipboard.writeText(text).catch(() => {});
    setJsonText(text);
    setShowJson(true);
  }

  function loadJson() {
    try {
      const parsed = JSON.parse(jsonText);
      setZones(parsed);
      setShowJson(false);
    } catch {
      alert("El JSON no es válido, revísalo e intenta de nuevo.");
    }
  }

  const wrapperStyle: React.CSSProperties = zoomedZone
    ? {
        transform: `scale(${ZOOM_SCALE})`,
        transformOrigin: `${zoomedZone.xPct + zoomedZone.wPct / 2}% ${
          zoomedZone.yPct + zoomedZone.hPct / 2
        }%`,
      }
    : { transform: "scale(1)" };

  const corners: Array<"nw" | "ne" | "sw" | "se"> = ["nw", "ne", "sw", "se"];

  return (
    <div className="map-page">
      <div className="map-toolbar">
        <button
          className={`map-toggle-btn ${editMode ? "active" : ""}`}
          onClick={() => {
            setEditMode(!editMode);
            setZoomedZone(null);
            setSelectedId(null);
          }}
        >
          {editMode ? "Salir del modo edición" : "Modo edición"}
        </button>

        {zoomedZone && (
          <button className="map-back-btn" onClick={() => setZoomedZone(null)}>
            ← Volver al mapa completo
          </button>
        )}

        {editMode && (
          <>
            <button className="map-back-btn" onClick={copyJson}>
              Copiar JSON
            </button>
            <button
              className="map-back-btn"
              onClick={() => {
                setJsonText(JSON.stringify(zones, null, 2));
                setShowJson((s) => !s);
              }}
            >
              Pegar / ver JSON
            </button>
            <button
              className="map-back-btn map-danger-btn"
              onClick={() => {
                if (confirm("¿Borrar todas las zonas?")) setZones([]);
              }}
            >
              Borrar todas
            </button>
          </>
        )}
      </div>

      <div className="map-body">
        <div
          className="map-container"
          ref={containerRef}
          onMouseDown={handleContainerMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="map-zoom-wrapper" style={wrapperStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="mapa1.svg"
              alt="Mapa"
              className="map-image"
              draggable={false}
            />

            {zones.map((zone) => (
              <div
                key={zone.id}
                className={`map-hotspot ${
                  selectedId === zone.id ? "map-hotspot-selected" : ""
                }`}
                style={{
                  left: `${zone.xPct}%`,
                  top: `${zone.yPct}%`,
                  width: `${zone.wPct}%`,
                  height: `${zone.hPct}%`,
                }}
                onMouseDown={(e) => handleZoneMouseDown(e, zone)}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!editMode) setZoomedZone(zone);
                }}
                title={zone.label}
              >
                {!zoomedZone && (
                  <span className="map-hotspot-label">{zone.label}</span>
                )}

                {editMode &&
                  selectedId === zone.id &&
                  corners.map((corner) => (
                    <span
                      key={corner}
                      className={`map-handle map-handle-${corner}`}
                      onMouseDown={(e) => handleHandleMouseDown(e, zone, corner)}
                    />
                  ))}
              </div>
            ))}

            {draft && (
              <div
                className="map-hotspot map-hotspot-draft"
                style={{
                  left: `${draft.xPct}%`,
                  top: `${draft.yPct}%`,
                  width: `${draft.wPct}%`,
                  height: `${draft.hPct}%`,
                }}
              />
            )}
          </div>
        </div>

        {editMode && (
          <div className="map-sidebar">
            <h3>Zonas ({zones.length})</h3>
            <ul className="map-zone-list">
              {zones.map((zone) => (
                <li
                  key={zone.id}
                  className={selectedId === zone.id ? "active" : ""}
                  onClick={() => setSelectedId(zone.id)}
                >
                  {zone.label || "(sin nombre)"}
                </li>
              ))}
              {zones.length === 0 && (
                <p className="map-empty-text">
                  Aún no hay zonas. Dibuja una arrastrando sobre el mapa.
                </p>
              )}
            </ul>

            {selected && (
              <div className="map-zone-editor">
                <h4>Editar zona</h4>
                <label>
                  Nombre
                  <input
                    type="text"
                    value={selected.label}
                    onChange={(e) =>
                      updateZone(selected.id, { label: e.target.value })
                    }
                  />
                </label>
                <div className="map-zone-grid">
                  <label>
                    X %
                    <input
                      type="number"
                      value={Math.round(selected.xPct * 10) / 10}
                      onChange={(e) =>
                        updateZone(selected.id, { xPct: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    Y %
                    <input
                      type="number"
                      value={Math.round(selected.yPct * 10) / 10}
                      onChange={(e) =>
                        updateZone(selected.id, { yPct: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    Ancho %
                    <input
                      type="number"
                      value={Math.round(selected.wPct * 10) / 10}
                      onChange={(e) =>
                        updateZone(selected.id, { wPct: Number(e.target.value) })
                      }
                    />
                  </label>
                  <label>
                    Alto %
                    <input
                      type="number"
                      value={Math.round(selected.hPct * 10) / 10}
                      onChange={(e) =>
                        updateZone(selected.id, { hPct: Number(e.target.value) })
                      }
                    />
                  </label>
                </div>
                <div className="map-zone-actions">
                  <button onClick={() => duplicateZone(selected)}>
                    Duplicar
                  </button>
                  <button
                    className="map-danger-btn"
                    onClick={() => deleteZone(selected.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showJson && (
        <div className="map-json-panel">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            rows={10}
          />
          <div className="map-zone-actions">
            <button onClick={loadJson}>Cargar este JSON</button>
            <button onClick={() => setShowJson(false)}>Cerrar</button>
          </div>
          <p className="map-help-text">
            Pega aquí el arreglo de zonas dentro de{" "}
            <code>initialZones</code> en <code>InteractiveMap.tsx</code> para
            dejarlas fijas en el código.
          </p>
        </div>
      )}

      {editMode && (
        <p className="map-help-text">
          Arrastra sobre el mapa para crear una zona nueva. Haz click sobre
          una zona existente para seleccionarla, arrástrala para moverla, o
          usa las esquinas para cambiar su tamaño.
        </p>
      )}
    </div>
  );
}
