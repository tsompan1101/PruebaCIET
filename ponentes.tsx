import PonenteCard, { PonenteCardProps } from "@/components/PonenteCard";
// Ajusta esta ruta de import según el alias que tengas configurado,
// por ejemplo "@/componentes/PonenteCard" si usas el alias "@" -> "./".

interface Ponente extends PonenteCardProps {
  id: number;
}

const ponentes: Ponente[] = [
  {
    id: 1,
    firstLine: "Dr. Américo",
    lastLine: "Villarreal Anaya",
    role: "Gobernador del Estado de Tamaulipas",
    linkedinUrl: null,
  },
  {
    id: 2,
    firstLine: "Lic. Mónica",
    lastLine: "Villarreal Anaya",
    role: "Presidenta Municipal de Tampico, Tamaulipas",
    linkedinUrl: null,
  },
  {
    id: 3,
    firstLine: "Ing. Walter Julián",
    lastLine: "Ángel Jiménez",
    role: "Secretario de Desarrollo Energético de Tamaulipas",
    linkedinUrl: "#",
  },
];

export default function Ponentes() {
  return (
    <div className="page-ponentes">
      <div className="ponentes-banner">
        {/* FONDO_PONENTES_AQUI: reemplazar por la foto de la instalación/refinería */}
        <div className="ponentes-banner-overlay" />
      </div>

      <div className="ponentes-header">
        <h1 className="ponentes-title">Ponentes</h1>
        <p className="ponentes-intro">
          Conoce a los <strong>expertos</strong> que están transformando el{" "}
          <strong>sector energético.</strong> Nuestros ponentes comparten su
          experiencia, innovación y visión de futuro, impulsando el diálogo y
          la colaboración para un desarrollo sostenible y competitivo.
        </p>
      </div>

      <div className="ponentes-grid">
        {ponentes.map(({ id, ...ponente }) => (
          <PonenteCard key={id} {...ponente} />
        ))}
      </div>
    </div>
  );
}
