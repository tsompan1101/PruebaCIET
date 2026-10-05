"use server";

import { revalidateTag } from "next/cache";

// Solo se pueden invalidar estos tags (los que usa supabasePublico).
const TAGS_PERMITIDOS = new Set(["cronograma", "zonas", "participantes"]);

export async function revalidarTag(tag: string) {
  if (!TAGS_PERMITIDOS.has(tag)) return;
  revalidateTag(tag); // En Next 16: revalidateTag(tag, "max")
}
