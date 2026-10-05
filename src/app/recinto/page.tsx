import PublicMap from "@/components/RecintoInteractivo2";
import { getZonas } from "@/lib/datos-publicos";

export default async function Page() {
  const zonas = await getZonas();
  return <PublicMap initialZones={zonas} />;
}
