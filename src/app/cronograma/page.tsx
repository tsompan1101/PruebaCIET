import Cronograma from "@/components/Crono";
import { getCronograma } from "@/lib/data";

export const revalidate = 60;

export default async function VisualCronograma() {
    const actividades = await getCronograma();
    return (
        <div className="page-cronogram ">
            <Cronograma initialData={actividades}/>
        </div>
    );
}
