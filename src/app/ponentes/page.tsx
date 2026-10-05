import PonenteCard, { PonenteCardProps } from "@/components/PonenteCard";
import { supabaseConfigurado, supabasePublico } from "@/lib/supabase";
// Ajusta estas rutas según el alias que tengas configurado,
// por ejemplo "@/componentes/PonenteCard" si usas el alias "@" -> "./".

interface Ponente extends PonenteCardProps {
  id: number;
}

// Quién aparece en esta página, según participantes.participacion_congreso.
// (Los valores deben coincidir con el enum de la base.)
const PARTICIPACIONES = ["Conferencista Magistral", "Panelista", "Tallerista"];

interface FilaParticipante {
  id: number;
  nombre_completo: string;
  institucion: string | null;
  cargo_puesto: string | null;
  imagen: string | null;
  redes: string | null;
}

// La tarjeta muestra el nombre en dos líneas: lo último (dos palabras) son los apellidos
// y lo anterior, el título y nombre(s). Con apellidos con partículas ("de la Cruz") puede
// quedar mal repartido; la solución de fondo es guardar nombre y apellidos en columnas aparte.
function dividirNombre(nombre: string): [string, string] {
  const p = nombre.trim().split(/\s+/);
  if (p.length <= 2) return [p[0] ?? "", p.slice(1).join(" ")];
  return [p.slice(0, -2).join(" "), p.slice(-2).join(" ")];
}

const LINKEDIN = /https?:\/\/[^\s,;]*linkedin\.com[^\s,;]*/i;

async function obtenerPonentes(): Promise<Ponente[]> {
  if (!supabaseConfigurado) return [];

  // Solo columnas públicas: nunca se pide correo ni teléfono.
  const { data, error } = await supabasePublico("participantes")
    .from("participantes")
    .select("id,nombre_completo,institucion,cargo_puesto,imagen,redes")
    .in("participacion_congreso", PARTICIPACIONES)
    .order("id");

  if (error) {
    console.error("No se pudieron cargar los ponentes:", error.message);
    return [];
  }

  return (data as FilaParticipante[]).map((p) => {
    const [firstLine, lastLine] = dividirNombre(p.nombre_completo);
    return {
      id: p.id,
      firstLine,
      lastLine,
      role: [p.cargo_puesto, p.institucion].filter(Boolean).join(", "),
      imageUrl: p.imagen,
      linkedinUrl: p.redes?.match(LINKEDIN)?.[0] ?? null,
    };
  });
}

export default async function Ponentes() {
  const ponentes = await obtenerPonentes();

  return (
    <div className="page-ponentes">
      <div className="ponentes-banner">
        {/* FONDO_PONENTES_AQUI: reemplazar por la foto de la instalación/refinería */}
        <img src="./Ponentes-2.webp" />
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

      {ponentes.length === 0 ? (
        <p className="ponentes-intro">Próximamente anunciaremos a nuestros ponentes.</p>
      ) : (
        <div className="ponentes-grid">
          {ponentes.map(({ id, ...ponente }) => (
            <PonenteCard key={id} {...ponente} />
          ))}
        </div>
      )}
    </div>
  );
}
