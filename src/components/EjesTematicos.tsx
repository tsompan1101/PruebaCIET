"use client";

import React from "react";

interface EjeItem {
  id: number;
  titulo: string;
  descripcion: string;
  imagenBg: string;
}

const ejesData: EjeItem[] = [
  {
    id: 1,
    titulo: "Inversión Sostenible, Economía Circular y Beneficios Territoriales de la Energía",
    descripcion:
      "Impulsamos un modelo energético sustentable que promueve inversión responsable, aprovechamiento eficiente de recursos y desarrollo regional en beneficio de las comunidades.",
    imagenBg: "/Eje-1.webp", // Reemplaza por la ruta de tu imagen
  },
  {
    id: 2,
    titulo: "Electricidad, Transición Energética e Innovación Tecnológica para el desarrollo Productivo",
    descripcion:
      "Impulsamos el desarrollo productivo mediante soluciones eléctricas eficientes, innovación tecnológica y estrategias de transición energética que fortalecen la competitividad, promueven la sostenibilidad y generan nuevas oportunidades para la industria y las comunidades.",
    imagenBg: "/Eje-2.webp", // Reemplaza por la ruta de tu imagen
  },
  {
    id: 3,
    titulo: "Hidrocarburos, Gas Natural e Infraestructura estratégica del Golfo de México ",
    descripcion:
      "Fortalecemos el desarrollo energético mediante el aprovechamiento responsable de los hidrocarburos, el impulso al gas natural y la consolidación de infraestructura estratégica que impulsa la competitividad, la inversión y el crecimiento económico de la región del Golfo de México.",
    imagenBg: "/Eje-1.webp", // Reemplaza por la ruta de tu imagen
  },
];

export default function EjesTematicosSection() {
  return (
    <section className="ejes-section">
      <div className="ejes-container">

        {/* Encabezado */}
        <header className="ejes-header">
          <h2 className="ejes-title">Ejes temáticos</h2>

          <div className="ejes-title-divider" aria-hidden="true">
            <span className="ejes-title-line" />
            <svg viewBox="0 0 24 24" className="ejes-title-icon">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
            </svg>
            <span className="ejes-title-line" />
          </div>

          <p className="ejes-subtitle">
            El <strong>Congreso Internacional de Energía Tamaulipas 2026</strong> se centra en ejes estratégicos que marcan la pauta de la transformación del sistema energético de Tamaulipas.
          </p>
        </header>

        {/* Tarjetas Intercaladas */}
        <div className="ejes-grid">
          {ejesData.map((eje, index) => {
            // Alterna la clase entre 'align-left' (0 y 2) y 'align-right' (1)
            const alignmentClass = index % 2 === 0 ? "align-left" : "align-right";

            return (
              <article
                key={eje.id}
                className={`eje-card ${alignmentClass}`}
                style={{ backgroundImage: `url(${eje.imagenBg})` }}
              >
                <div className="eje-card-overlay" aria-hidden="true" />

                <div className="eje-card-content">
                  <h3 className="eje-card-title">{eje.titulo}</h3>
                  <p className="eje-card-description">{eje.descripcion}</p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
