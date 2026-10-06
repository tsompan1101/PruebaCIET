import PublicMap from "@/components/RecintoInteractivo2";

// El mapa carga sus zonas desde Supabase en el cliente (y se actualiza en tiempo real).
export default function Page() {
  return <PublicMap />;
}
