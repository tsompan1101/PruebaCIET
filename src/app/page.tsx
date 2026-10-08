import Section from "@/components/Sections";
import CtaSection from "@/components/CtaSection";
import EjesTematicosSection from "@/components/EjesTematicos";
import ExpoTampicoSection from "@/components/ExpoSection";

export default function HomePage() {
  return (
    <div className="page-home">
      <section className="section hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="hero-badge-icon-bolt">
                <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
              </svg>
            </div>

            <p className="hero-eyebrow">Congreso</p>
            <h1 className="hero-title">
              Internacional
              <br />
              <strong>de Energía</strong>
            </h1>
            <p className="hero-year">Tamaulipas 2026</p>

            <div className="hero-dates">
              <span className="hero-dates-days">27 · 28 · 29</span>
              <span className="hero-dates-detail">
                Octubre 2026
                <br />
                Expo Tampico
              </span>
            </div>

            <p className="hero-description">
              Del 27 al 29 de octubre en la Expo Tampico, líderes y expertos
              del sector energético se reúnen para{" "}
              <strong>
                impulsar la innovación, transición, soberanía y justicia
                energética.
              </strong>
            </p>

            <div className="hero-actions">
              <a
                href="https://forms.gle/Efy2RDsgyjvbi8J48"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Regístrate ahora
              </a>
              <a className="btn btn-outline" href="#Evento">
                Acerca del evento
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="">
              {/* IMAGEN_HERO_AQUI: reemplazar por <img src="/hero-energia.png" alt="..." /> */}
              <img src="/ciet2026.webp" />
            </div>
          </div>
        </div>

        <svg
          className="hero-wave"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,48 C240,90 480,0 720,24 C960,48 1200,84 1440,36 L1440,90 L0,90 Z" />
        </svg>
          </section>

          <Section />
          <CtaSection />
          <EjesTematicosSection />
          <ExpoTampicoSection />

    </div>
  );
}
