"use client";

import React from "react";
import Image from "next/image";

interface ExpoTampicoSectionProps {
  /** Enlace opcional de Google Maps */
  mapUrl?: string;
}

export default function ExpoTampicoSection({
  mapUrl = "https://maps.google.com/?q=Expo+Tampico",
}: ExpoTampicoSectionProps) {
  return (
    <section className="expo-section">
      <div className="expo-container">

        {/* Encabezado */}
        <header className="expo-header">
          <h2 className="expo-title">Expo Tampico, Tamaulipas</h2>

          <div className="expo-title-divider" aria-hidden="true">
            <span className="expo-title-line" />
            <svg viewBox="0 0 24 24" className="expo-title-icon">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
            </svg>
            <span className="expo-title-line" />
          </div>

          <p className="expo-subtitle">
            Av. Hidalgo s/n, Tampico, Tamaulipas · 27 — 29 de octubre de 2026
          </p>
        </header>

        {/* Tarjeta con imagen de fondo y contenido en degradado */}
        <div className="expo-card">
          <div className="expo-card-overlay" aria-hidden="true" />

          <div className="expo-card-content">
            {/* Logo Expo Tampico */}
            <div className="expo-logo-wrapper">
              <Image
                src="/ExpoTampico.svg" /* Reemplaza por la ruta de tu logo blanco */
                alt="Expo Tampico Logo"
                width={200}
                height={50}
                className="expo-logo-img"
              />
            </div>

            <p className="expo-description">
              El moderno e innovador centro de convenciones y exposiciones llamado
              Expo-Tampico es único en la región por su diseño y sus sistemas
              operativos de servicio, que con tecnología e infraestructura de primer
              nivel posee los más altos estándares de calidad, garantizando la
              atención adecuada para el desarrollo de todo tipo de eventos, desde
              espectáculos artísticos hasta exposiciones, congresos y convenciones.
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="expo-btn"
            >
              ¿Cómo llegar?
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
