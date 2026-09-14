"use client";

import { useEffect, useMemo, useState } from "react";

type Evento = {
  tipo: string;
  tema: string;
  inicio: string;
  fin: string;
  sala: string;
  descripcion: string;
  ponentes: string[];
  moderadores: string[];
  dependencias: string[];
};

export default function Cronograma() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selected, setSelected] = useState<Evento | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch("/cronograma.json")
      .then((res) => res.json())
      .then((data: Evento[]) => {
        setEventos(data);

        const dias = Array.from(
          new Set(data.map((e) => e.inicio.split(" ")[0]))
        ).sort();

        setSelectedDay(dias[0] ?? null);
      })
      .catch(() => console.warn("No se pudo cargar cronograma.json"));
  }, []);

  const days = useMemo(
    () =>
      Array.from(
        new Set(eventos.map((e) => e.inicio.split(" ")[0]))
      ).sort(),
    [eventos]
  );

  const dayEventos = useMemo(
    () =>
      eventos.filter(
        (e) => e.inicio.split(" ")[0] === selectedDay
      ),
    [eventos, selectedDay]
  );

  const times = useMemo(
    () =>
      Array.from(
        new Set(
          dayEventos.map((e) => e.inicio.split(" ")[1])
        )
      ).sort(),
    [dayEventos]
  );

  const locations = useMemo(
    () =>
      Array.from(
        new Set(dayEventos.map((e) => e.sala))
      ).sort(),
    [dayEventos]
  );

  function openEvento(evento: Evento) {
    setSelected(evento);
    requestAnimationFrame(() => setModalVisible(true));
  }

  function closeEvento() {
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
      {/* Tabs */}
      <div className="cronograma-day-tabs">
        {days.map((day) => (
          <button
            key={day}
            className={`cronograma-day-tab ${
              selectedDay === day ? "active" : ""
            }`}
            onClick={() => setSelectedDay(day)}
          >
            {formatDay(day)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="cronograma-grid-wrapper">
        <div
          className="cronograma-grid"
          style={{
            gridTemplateColumns: `100px repeat(${locations.length || 1},1fr)`,
          }}
        >
          {/* Esquina */}
          <div className="cronograma-cell cronograma-corner"></div>

          {/* Salas */}
          {locations.map((loc) => (
            <div key={loc} className="cronograma-cell cronograma-header">
              {loc}
            </div>
          ))}

          {/* Horarios */}
          {times.map((time) => (
            <div key={time} className="cronograma-row-fragment">
              <div className="cronograma-cell cronograma-time">
                {time}
              </div>

              {locations.map((loc) => {
                const eventosCelda = dayEventos.filter(
                  (e) =>
                    e.inicio.split(" ")[1] === time &&
                    e.sala === loc
                );

                return (
                  <div key={loc} className="cronograma-cell">
                    {eventosCelda.map((evento, index) => (
                      <button
                        key={index}
                        className="cronograma-taller-card"
                        onClick={() => openEvento(evento)}
                      >
                        <span className="cronograma-taller-title">
                          {evento.tema}
                        </span>

                        <span className="cronograma-taller-time">
                          {evento.inicio.split(" ")[1]} -{" "}
                          {evento.fin.split(" ")[1]}
                        </span>

                        <span
                          style={{
                            display: "block",
                            fontSize: ".75rem",
                            marginTop: 6,
                            opacity: 0.8,
                          }}
                        >
                          {evento.tipo}
                        </span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {dayEventos.length === 0 && (
          <p className="cronograma-empty">
            No hay actividades para este día.
          </p>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className={`cronograma-overlay ${
            modalVisible ? "visible" : ""
          }`}
          onClick={closeEvento}
        >
          <div
            className={`cronograma-modal ${
              modalVisible ? "visible" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cronograma-modal-close"
              onClick={closeEvento}
            >
              ✕
            </button>

            <h3>{selected.tema}</h3>

            <p className="cronograma-modal-meta">
              {formatDay(selected.inicio.split(" ")[0])}
              {" • "}
              {selected.inicio.split(" ")[1]}
              {" - "}
              {selected.fin.split(" ")[1]}
              {" • "}
              {selected.sala}
            </p>

            <p>
              <strong>Tipo:</strong> {selected.tipo}
            </p>

            {selected.descripcion &&
              selected.descripcion !== "N/A" && (
                <>
                  <h4>Descripción</h4>
                  <p className="cronograma-modal-description">
                    {selected.descripcion}
                  </p>
                </>
              )}

            {selected.ponentes.length > 0 && (
              <>
                <h4>Ponentes</h4>
                <ul>
                  {selected.ponentes.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </>
            )}

            {selected.moderadores.length > 0 && (
              <>
                <h4>Moderadores</h4>
                <ul>
                  {selected.moderadores.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </>
            )}

            {selected.dependencias.length > 0 && (
              <>
                <h4>Dependencias</h4>
                <ul>
                  {selected.dependencias.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
