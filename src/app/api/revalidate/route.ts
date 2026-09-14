import { revalidateTag } from "next/cache";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// El servidor Rust llama a esta ruta cada vez que cambia algo en la base
// (vía su listener de Postgres LISTEN/NOTIFY). Body esperado:
//   { "tags": ["charlas", "programa-cronograma"] }
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const tags: unknown = body?.tags;

  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
    return NextResponse.json(
      { message: "Body inválido: se espera { tags: string[] }" },
      { status: 400 }
    );
  }

  for (const tag of tags as string[]) {
    revalidateTag(tag);
  }

  return NextResponse.json({ revalidated: true, tags, now: Date.now() });
}
