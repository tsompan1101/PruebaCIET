import Cronograma from "@/components/Crono";
import { getCronograma } from "@/lib/datos-publicos";

export default async function Page() {
  const actividades = await getCronograma();
  return <Cronograma initialData={actividades} />;
}
