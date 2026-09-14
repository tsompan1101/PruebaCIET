const API_URL = process.env.API_URL ?? "http://100.67.104.21:3000";

export async function getCronograma() {
    const res = await fetch('${API_URL}/cronograma', {
        next: {tags: ["cronograma"], revalidate: 3000},
    });

    if (!res.ok){
        throw new Error('Error al obtener el cronograma: ${res.status}');
    }

    return res.json();
}


export async function getStands() {
    const res = await fetch('${API_URL}/stands',{
        next: {tags: ["stands"], revalidate:3000},
    });

    if (!res.ok){
        throw new Error('Error al obtener los Stands: ${res.status}');
    }

    return res.json();
}
