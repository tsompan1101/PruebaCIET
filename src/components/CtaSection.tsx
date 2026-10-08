"use client";

import React from "react";

interface CtaSectionProps {
  /** Enlace opcional del botón de registro */
  registerUrl?: string;
}

export default function CtaSection({
  registerUrl = "https://forms.gle/Efy2RDsgyjvbi8J48",
}: CtaSectionProps) {
  return (
    <section className="cta-section">
      {/* Capa de tinte que usa var(--primary-color) */}
      <div className="cta-overlay" aria-hidden="true" />

      <div className="cta-container">
        <h2 className="cta-title">
          ¡No pierdas la oportunidad de
          <br />
          ser parte del <strong>futuro energético</strong>!
        </h2>

        <p className="cta-description">
          Regístrate hoy al Congreso Internacional de Energía Tamaulipas 2026 y
          únete a los líderes que están transformando el sector.
        </p>

        <a
          href={registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn"
        >
          Regístrate ahora
        </a>
      </div>
    </section>
  );
}
