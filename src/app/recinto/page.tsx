import PublicMap from "@/components/RecintoInteractivo2";
// Ajusta la ruta de import según tu alias.

// El mapa es un componente cliente: lee las zonas de Supabase y se actualiza en vivo.
export default function MapaPublicoPage() {
  return (
    <>
      <div className="ponentes-header" style={{ paddingTop: "80px" }}>
        <h1 className="ponentes-title">Mapa del Congreso</h1>
        <p className="ponentes-intro">
          Conoce los <strong>Stands</strong> que están dentro de la{" "}
          <strong>Feria Industrial.</strong>
        </p>
      </div>
      <PublicMap />
    </>
  );
}
