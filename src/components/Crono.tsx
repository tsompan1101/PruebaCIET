"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLiveUpdates } from "@/hooks/useLiveUpdates";

type Actividad = {
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

function getDay(iso: string) {
    return iso.split("T")[0];
}

function getTime(iso: string) {
    return iso.split("T")[1]?.slice(0,5) ?? "";
}

export default function Cronograma ({
    initialData,
}: {
    initialData: Actividad[];
}) {
    const actividades = initialData;
    useLiveUpdates("cronograma");

    const days = useMemo(
        () => 
            Array.from(
                new Set(
                    actividades.filter((a) => a.inicio).map((a) => getDay(a.inicio!))
                )
            ).sort(), [actividades]
    );

    const [selectedDay, setSelectedDay] = useState<string | null>(
        days[0] ?? null
    );
    const [selected, setSelected] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const dayActividades = useMemo(
        () => actividades.filter((a) => a.inicio && getDay(a.inicio)  === selectedDay), [actividades, selectedDay]
    );

    const times = useMemo(
        () => Array.from(new Set(dayActividades.map((a) => getTime(a.inicio!)))).sort(), [dayActividades]
    );

    const salas = useMemo(
        () => Array.from (new Set(dayActividades.map((a) => a.salon ?? "Sin Salón"))).sort(), [dayActividades]
    ).slice(1);

    function openActividad(actividad: Actividad){
        setSelected(actividad);
        requestAnimationFrame(() => setModalVisible(true));
    }

    function closeActividad() {
        setModalVisible(false);
        setTimeout(() => setSelected(null), 200);
    }

    function formatDay(day: string) {
        const date = new Date(day + "T00:00:00");
        return date.toLocaleDateString("es-MX", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    }
  return (
    <div className="cronograma-page">
      <div className="cronograma-day-tabs">
        {days.map((day) => (
          <button
            key={day}
            className={`cronograma-day-tab ${
              day === selectedDay ? "active" : ""
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {formatDay(day)}
          </button>
        ))}
      </div>

      <div className="cronograma-grid-wrapper">
        <div
          className="cronograma-grid"
          style={{
            gridTemplateColumns: `100px repeat(${salas.length || 1}, 1fr)`,
          }}
        >
          <div className="cronograma-cell cronograma-corner"></div>
          {salas.map((sala) => (
            <div key={sala} className="cronograma-cell cronograma-header">
              {sala}
            </div>
          ))}

          {times.map((time) => {
            const evento = dayActividades.find(
              (a) => getTime(a.inicio!) === time && (a.tipo === "Evento" || a.salon === "Escenario")
            );

            if (evento) {
              return (
                <div key={time} className="cronograma-row-fragment">
                  <div className="cronograma-cell cronograma-time">{time}</div>
                  <div
                    className="cronograma-cell cronograma-evento-cell"
                    style={{ gridColumn: `2 / span ${salas.length || 1}` }}
                  >
                    <button
                      className="cronograma-taller-card cronograma-evento-card"
                      onClick={() => openActividad(evento)}
                    >
                      <span className="cronograma-taller-tipo">
                        {evento.tipo}
                      </span>
                      <span className="cronograma-taller-title">
                        {evento.tema}
                      </span>
                      <span className="cronograma-taller-time">
                        {getTime(evento.inicio!)} -{" "}
                        {evento.fin ? getTime(evento.fin) : ""}
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={time} className="cronograma-row-fragment">
                <div className="cronograma-cell cronograma-time">{time}</div>
                {salas.map((sala) => {
                  const actividad = dayActividades.find(
                    (a) =>
                      getTime(a.inicio!) === time &&
                      (a.salon ?? "Sin salón") === sala
                  );
                  return (
                    <div key={sala} className="cronograma-cell">
                      {actividad && (
                        <button
                          className="cronograma-taller-card"
                          onClick={() => openActividad(actividad)}
                        >
                          {actividad.tipo && (
                            <span className="cronograma-taller-tipo">
                              {actividad.tipo}
                            </span>
                          )}
                          <span className="cronograma-taller-title">
                            {actividad.tema}
                          </span>
                          <span className="cronograma-taller-time">
                            {getTime(actividad.inicio!)} -{" "}
                            {actividad.fin ? getTime(actividad.fin) : ""}
                          </span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {dayActividades.length === 0 && (
          <p className="cronograma-empty">No hay actividades para este día.</p>
        )}
      </div>

      {selected && (
        <div
          className={`cronograma-overlay ${modalVisible ? "visible" : ""}`}
          onClick={closeActividad}
        >
          <div
            className={`cronograma-modal ${modalVisible ? "visible" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cronograma-modal-close" onClick={closeActividad}>
              ✕
            </button>

            {selected.tipo && (
              <span className="cronograma-modal-tipo">{selected.tipo}</span>
            )}
            <h3>{selected.tema}</h3>
            <p className="cronograma-modal-meta">
              {selected.inicio && formatDay(getDay(selected.inicio))} ·{" "}
              {selected.inicio && getTime(selected.inicio)}
              {selected.fin ? ` - ${getTime(selected.fin)}` : ""} ·{" "}
              {selected.salon}
            </p>

            {selected.ponentes.length > 0 && (
              <p>
                <strong>Ponentes:</strong> {selected.ponentes.join(", ")}
              </p>
            )}
            {selected.moderadores.length > 0 && (
              <p>
                <strong>Moderadores:</strong> {selected.moderadores.join(", ")}
              </p>
            )}
            {selected.dependencias.length > 0 && (
              <p>
                <strong>Requiere antes:</strong>{" "}
                {selected.dependencias.join(", ")}
              </p>
            )}
            {selected.descripcion && (
              <p className="cronograma-modal-description">
                {selected.descripcion}
              </p>
            )}

            {selected.salon && (
              <Link
                href={`/mapa-publico?sala=${encodeURIComponent(selected.salon)}`}
                className="cronograma-modal-map-link"
              >
                Ver ubicación en el mapa →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
    
