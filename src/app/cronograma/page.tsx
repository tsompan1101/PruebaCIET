import Cronograma from "@/components/Crono";
import { obtenerPrograma, type Actividad } from "@/lib/programa";
import { supabasePublico } from "@/lib/supabase";
// Ajusta las rutas de import según tu alias (por ejemplo "@/componentes/Crono").

export default async function CronogramaPage() {
  let initialData: Actividad[] = [];
  try {
    // Lectura en el servidor, cacheada con la etiqueta "programa-cronograma" (se renueva cada 5 min).
    initialData = await obtenerPrograma(supabasePublico("programa-cronograma"));
  } catch (e) {
    console.error("No se pudo cargar el programa:", e);
  }

  // El componente cliente se encarga de mantenerlo al día con Supabase Realtime.
  return <Cronograma initialData={initialData} />;
}
