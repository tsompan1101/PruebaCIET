import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { horaTalCual } from "@/lib/programa";
import { extraerRedes } from "@/lib/redes";
import { supabasePublico } from "@/lib/supabase";
// Ajusta las rutas de import según tu alias.

// En Next 15 o superior, params es una Promise. En Next 14 es un objeto: quita Promise<...> y los await.
type Props = { params: Promise<{ id: string }> };

interface FilaPonente {
  id: number;
  nombre_completo: string;
  cargo_puesto: string | null;
  institucion: string | null;
  lugar_residencia: string | null;
  sector_perteneciente: string | null;
  participacion_congreso: string | null;
  area_experiencia: string[] | null;
  semblanza: string | null;
  imagen: string | null;
  redes: string | null;
}

interface FilaCharla {
  id: number;
  titulo: string;
  tipo: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  salon: string | null;
}
interface FilaCronograma {
  rol: string;
  charlas: FilaCharla | FilaCharla[] | null;
}

// Solo columnas públicas: nunca correo ni teléfono.
const COLUMNAS =
  "id,nombre_completo,cargo_puesto,institucion,lugar_residencia,sector_perteneciente,participacion_congreso,area_experiencia,semblanza,imagen,redes";

// cache(): generateMetadata y la página comparten una sola consulta por petición.
const obtenerPonente = cache(async (idTexto: string): Promise<FilaPonente | null> => {
  const id = Number(idTexto);
  if (!Number.isInteger(id) || id <= 0) return null;

  const { data, error } = await supabasePublico("participantes")
    .from("participantes")
    .select(COLUMNAS)
    .eq("id", id) // cualquier participante, por su enlace (p. ej. desde un QR), aparezca o no en la lista
    .maybeSingle();

  if (error) throw new Error(`No se pudo cargar al ponente: ${error.message}`);
  return data as FilaPonente | null;
});

interface CharlaPonente {
  id: number;
  titulo: string;
  tipo: string | null;
  rol: string;
  inicio: string;
  fin: string | null;
  salon: string | null;
}

async function obtenerCharlas(participanteId: number): Promise<CharlaPonente[]> {
  const { data, error } = await supabasePublico("programa-cronograma")
    .from("cronograma")
    .select("rol,charlas(id,titulo,tipo,fecha_inicio,fecha_fin,salon)")
    .eq("participante_id", participanteId);

  if (error) {
    console.error("No se pudieron cargar las charlas del ponente:", error.message);
    return []; // la ficha se muestra igual, sin la lista de charlas
  }

  const charlas: CharlaPonente[] = [];
  for (const fila of (data ?? []) as unknown as FilaCronograma[]) {
    const c = Array.isArray(fila.charlas) ? fila.charlas[0] : fila.charlas;
    if (!c) continue;
    charlas.push({
      id: c.id,
      titulo: c.titulo,
      tipo: c.tipo,
      rol: fila.rol,
      inicio: horaTalCual(c.fecha_inicio) ?? "",
      fin: horaTalCual(c.fecha_fin),
      salon: c.salon,
    });
  }
  return charlas.sort((a, b) => a.inicio.localeCompare(b.inicio));
}

const dia = (h: string) =>
  new Date(`${h.slice(0, 10)}T00:00:00`).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
const horas = (h: string) => h.slice(11, 16);

const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter((w) => w && !w.endsWith(".")) // sin títulos: Dr., Ing., Lic.
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obtenerPonente((await params).id);
  if (!p) return { title: "Ponente no encontrado" };
  return {
    title: `${p.nombre_completo} · Ponentes`,
    description: [p.cargo_puesto, p.institucion].filter(Boolean).join(", ") || undefined,
    openGraph: { images: p.imagen ? [p.imagen] : undefined },
  };
}

export default async function PonenteDetalle({ params }: Props) {
  const p = await obtenerPonente((await params).id);
  if (!p) notFound();

  const charlas = await obtenerCharlas(p.id);
  const redes = extraerRedes(p.redes);
  const areas = p.area_experiencia ?? [];
  const parrafos = (p.semblanza ?? "").split(/\n+/).map((t) => t.trim()).filter(Boolean);
  const datos = [
    { etiqueta: "Procedencia", valor: p.lugar_residencia },
    { etiqueta: "Sector", valor: p.sector_perteneciente },
    { etiqueta: "Participación", valor: p.participacion_congreso },
  ].filter((d) => d.valor);

  return (
    <main className="pd-page">
      <Link href="/ponentes" className="pd-volver">
        ← Todos los ponentes
      </Link>

      <article className="pd-ficha">
        {/* Lado izquierdo: Fotografía en formato avatar destacado */}
        <div className="pd-foto-container">
          <div className="pd-foto-wrapper">
            {p.imagen ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="pd-foto" src={p.imagen} alt={p.nombre_completo} />
            ) : (
              <div className="pd-foto-vacia" aria-hidden="true">
                {iniciales(p.nombre_completo)}
              </div>
            )}
          </div>
        </div>

        {/* Lado derecho: Credenciales e información */}
        <div className="pd-info">
          <div className="pd-header">
            <h1>{p.nombre_completo}</h1>
            {p.cargo_puesto && <p className="pd-cargo">{p.cargo_puesto}</p>}
            {p.institucion && <p className="pd-institucion">{p.institucion}</p>}
          </div>

          {datos.length > 0 && (
            <dl className="pd-datos">
              {datos.map((d) => (
                <div key={d.etiqueta}>
                  <dt>{d.etiqueta}</dt>
                  <dd>{d.valor}</dd>
                </div>
              ))}
            </dl>
          )}

          {areas.length > 0 && (
            <ul className="pd-tags" aria-label="Áreas de experiencia">
              {areas.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}

          {redes.length > 0 && (
            <div className="pd-redes">
              {redes.map((r) => (
                <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer">
                  {r.etiqueta}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>

      {parrafos.length > 0 && (
        <section className="pd-seccion">
          <h2>Semblanza</h2>
          {parrafos.map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </section>
      )}

      {charlas.length > 0 && (
        <section className="pd-seccion">
          <h2>Participa en</h2>
          <ul className="pd-charlas">
            {charlas.map((c) => (
              <li key={`${c.id}-${c.rol}`}>
                <div className="pd-charla-cab">
                  {c.tipo && <span className="pd-chip">{c.tipo}</span>}
                  {c.rol !== "ponente" && <span className="pd-chip pd-chip-rol">{c.rol}</span>}
                </div>
                <strong>{c.titulo}</strong>
                {c.inicio && (
                  <span className="pd-charla-meta">
                    {dia(c.inicio)} · {horas(c.inicio)}
                    {c.fin ? ` - ${horas(c.fin)}` : ""}
                    {c.salon ? ` · ${c.salon}` : ""}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <Link href="/cronograma" className="pd-ver-cronograma">
            Ver el cronograma completo →
          </Link>
        </section>
      )}
    </main>
  );
}
