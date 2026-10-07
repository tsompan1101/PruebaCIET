export type Red = {
  plataforma: "linkedin" | "facebook" | "instagram" | "twitter" | "web";
  etiqueta: string;
  url: string;
};

const URL_RE = /https?:\/\/[^\s,;]+/gi;

// participantes.redes es texto libre: aquí se sacan las URLs http(s) que contenga y se clasifican.
// Solo se aceptan http y https, así que nunca salen enlaces "javascript:".
export function extraerRedes(texto: string | null): Red[] {
  if (!texto) return [];

  const vistos = new Set<string>();
  const redes: Red[] = [];

  for (const hallado of texto.match(URL_RE) ?? []) {
    const url = hallado.replace(/[).,;]+$/, ""); // puntuación pegada al final
    if (vistos.has(url)) continue;

    let host: string;
    try {
      host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    } catch {
      continue;
    }
    vistos.add(url);

    if (host.endsWith("linkedin.com")) redes.push({ plataforma: "linkedin", etiqueta: "LinkedIn", url });
    else if (host.endsWith("facebook.com") || host === "fb.com") redes.push({ plataforma: "facebook", etiqueta: "Facebook", url });
    else if (host.endsWith("instagram.com")) redes.push({ plataforma: "instagram", etiqueta: "Instagram", url });
    else if (host === "x.com" || host.endsWith("twitter.com")) redes.push({ plataforma: "twitter", etiqueta: "X", url });
    else redes.push({ plataforma: "web", etiqueta: host, url });
  }
  return redes;
}
