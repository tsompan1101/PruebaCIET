import type { SupabaseClient } from "@supabase/supabase-js";

export type SocialPlatform = "facebook" | "instagram" | "twitter" | "linkedin" | "website";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
};

export type Zone = {
  id: string;
  label: string;
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  image?: string;
  infoImage?: string;
  description?: string;
  socialLinks?: SocialLink[];
};

export type VBox = [number, number, number, number];
const VB_DEFECTO: VBox = [0, 0, 1000, 700];

// El editor del dashboard guarda cada zona en unidades del SVG (x, y, w, h). Para dibujarla en
// porcentajes hace falta el viewBox del plano; se lee del propio archivo SVG.
export async function leerViewBox(src: string): Promise<VBox> {
  try {
    const txt = await (await fetch(src)).text();
    const m = /viewBox\s*=\s*["']\s*([-\d.eE+]+)[\s,]+([-\d.eE+]+)[\s,]+([-\d.eE+]+)[\s,]+([-\d.eE+]+)/i.exec(txt);
    if (m) {
      const v = m.slice(1, 5).map(Number) as VBox;
      if (v.every(Number.isFinite) && v[2] > 0 && v[3] > 0) return v;
    }
  } catch {
    // sin plano o sin red: se usa el valor por defecto
  }
  return VB_DEFECTO;
}

type StandRow = {
  id: number;
  numero_stand: string;
  nombre_stand: string | null;
  descripcion: string | null;
  imagen_url: string | null;
};
type ZonaRow = { id: number; data: Record<string, unknown> | null; stands: StandRow[] | null };

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
const txt = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);

function geometria(d: Record<string, unknown>, vb: VBox): Pick<Zone, "xPct" | "yPct" | "wPct" | "hPct"> | null {
  const [bx, by, bw, bh] = vb;

  // Zonas dibujadas en el dashboard: unidades del SVG
  const x = num(d.x), y = num(d.y), w = num(d.w), h = num(d.h);
  if (x !== undefined && y !== undefined && w !== undefined && h !== undefined) {
    return { xPct: ((x - bx) / bw) * 100, yPct: ((y - by) / bh) * 100, wPct: (w / bw) * 100, hPct: (h / bh) * 100 };
  }

  // Zonas antiguas (las de zonas.json): ya vienen en porcentaje
  const xPct = num(d.xPct), yPct = num(d.yPct), wPct = num(d.wPct), hPct = num(d.hPct);
  if (xPct !== undefined && yPct !== undefined && wPct !== undefined && hPct !== undefined) {
    return { xPct, yPct, wPct, hPct };
  }
  return null;
}

// zonas (geometría en data) + el stand que tenga zona_id = zonas.id (nombre, descripción e imagen).
export async function obtenerZonas(db: SupabaseClient, vb: VBox): Promise<Zone[]> {
  const { data, error } = await db
    .from("zonas")
    .select("id,data,stands(id,numero_stand,nombre_stand,descripcion,imagen_url)")
    .order("id");
  if (error) throw new Error(error.message);

  const zonas: Zone[] = [];
  for (const r of (data ?? []) as unknown as ZonaRow[]) {
    const d = r.data ?? {};
    const g = geometria(d, vb);
    if (!g) continue; // zona sin geometría: no se dibuja
    const stand = r.stands?.[0];
    zonas.push({
      id: String(r.id),
      label: stand?.nombre_stand || txt(d.nombre) || txt(d.label) || (stand ? `Stand ${stand.numero_stand}` : ""),
      ...g,
      image: txt(d.image),
      infoImage: stand?.imagen_url || txt(d.infoImage),
      description: stand?.descripcion || txt(d.description),
      socialLinks: Array.isArray(d.socialLinks) ? (d.socialLinks as SocialLink[]) : undefined,
    });
  }
  return zonas;
}
