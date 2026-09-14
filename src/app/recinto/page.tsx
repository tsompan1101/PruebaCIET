import { Suspense } from "react";
import PublicMap from "@/components/RecintoInteractivo2";

export const revalidate = 60;

export default function MapaPublicoPage() {
    return (
        <div className="page-mapa">
            <Suspense fallback={null}>
                <PublicMap />
            </Suspense>
        </div>
    );
}
