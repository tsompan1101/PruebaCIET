"use server";

import { updateTag } from "next/cache";

// Solo se pueden invalidar estos tags (los que usa supabasePublico).
const TAGS_PERMITIDOS = new Set(["cronograma", "zonas", "participantes"]);

export async function revalidarTag(tag: string) {
  if (!TAGS_PERMITIDOS.has(tag)) return;
  updateTag(tag); // Expira el tag al momento, así el router.refresh() posterior ve datos nuevos.
}
