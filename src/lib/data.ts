const API_URL = process.env.API_URL ?? "https://intermetatarsal-monnie-discriminatively.ngrok-free.dev";

// El API vive en la red interna, por lo que puede no estar disponible durante el
// build. Devolvemos una lista vacía en ese caso para que el prerender no falle;
// la revalidación por tag/tiempo traerá los datos reales en cuanto responda.
async function fetchColeccion(path: string, tag: string, etiqueta: string) {
    try {
        const res = await fetch(`${API_URL}${path}`, {
            next: { tags: [tag], revalidate: 3000 },
        });

        if (!res.ok) {
            console.error(`Error al obtener ${etiqueta}: ${res.status}`);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error(`Error al obtener ${etiqueta}:`, error);
        return [];
    }
}

export async function getCronograma() {
    return fetchColeccion("/cronograma", "cronograma", "el cronograma");
}

export async function getStands() {
    return fetchColeccion("/stands", "stands", "los Stands");
}
