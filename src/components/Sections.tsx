import Image from "next/image";

interface CongresoSectionProps {
  /** ID del video de YouTube opcional para incrustar */
  videoId?: string;
}

export default function Section({
  videoId = "GVuE1mdyviLHrK5m"
}: CongresoSectionProps) {
  return (
    <section className="congreso-section" id="Evento">
      <div className="congreso-grid">
        {/* Columna Izquierda: Información */}
        <div className="congreso-text-content">
          <span className="congreso-badge">El Congreso</span>

          <p className="congreso-description">
            El <strong>Congreso Internacional de Energía Tamaulipas 2026</strong> se
            realizará del 27 al 29 de octubre en la Expo Tampico, reuniendo a los
            más destacados tomadores de decisiones, inversionistas, especialistas
            técnicos, representantes de organismos gubernamentales, universidades,
            centros de investigación y empresas líderes nacionales e
            internacionales, con el propósito de propiciar el diálogo, la
            cooperación, el intercambio de soluciones y los retos del sector frente
            a la transición, soberanía y justicia energética, así como frente al
            desarrollo sostenible.
          </p>

          <div className="congreso-branding-wrapper">
            <Image
              src="/eslogan.webp" /* Puedes usar g1.webp o colocar el arte gráfico correspondiente */
              alt="Tamaulipas donde la Transformación del Sistema Energético Avanza"
              width={480}
              height={120}
              priority
              className="congreso-branding-img"
            />
          </div>
        </div>

        {/* Columna Derecha: Video reproductor */}
        <div className="congreso-video-container">
          <iframe
            className="congreso-iframe"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="Congreso Internacional de Energía Tamaulipas 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
