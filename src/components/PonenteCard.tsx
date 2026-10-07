import Link from "next/link";

export interface PonenteCardProps {
  firstLine: string;
  lastLine: string;
  role: string;
  linkedinUrl?: string | null;
  imageUrl?: string | null;
  href?: string; // si viene, toda la tarjeta lleva a esa página
}

export default function PonenteCard({
  firstLine,
  lastLine,
  role,
  linkedinUrl,
  imageUrl,
  href,
}: PonenteCardProps) {
  return (
    <article className="ponente-card" style={{ position: "relative" }}>
      {href && (
        // Enlace que cubre toda la tarjeta. Los estilos van en línea (ganan a cualquier CSS) porque,
        // sin position:absolute, un <a> vacío mide solo 1 píxel.
        <Link
          href={href}
          className="ponente-card-link"
          aria-label={`Ver más sobre ${firstLine} ${lastLine}`}
          style={{ position: "absolute", inset: 0, zIndex: 1, display: "block", cursor: "pointer", borderRadius: "inherit" }}
        />
      )}
      <div className="ponente-photo">
        <div className="ponente-photo-placeholder">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={`${firstLine} ${lastLine}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <>Foto de {firstLine} {lastLine}</>
          )}
        </div>
        <div className="ponente-photo-gradient" />

        {linkedinUrl && (
          <a
            className="ponente-social"
            style={{ zIndex: 2 }} // por encima del enlace que cubre la tarjeta
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${firstLine} ${lastLine}`}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.24h4.56V23H.22V8.24zM8.02 8.24h4.37v2.02h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.48 3.04 5.48 6.98V23h-4.56v-6.77c0-1.61-.03-3.68-2.24-3.68-2.25 0-2.6 1.76-2.6 3.57V23H8.02V8.24z" />
            </svg>
          </a>
        )}

        <div className="ponente-name">
          <span className="ponente-name-first">{firstLine}</span>
          <span className="ponente-name-last">{lastLine}</span>
        </div>
      </div>

      <div className="ponente-role">{role}</div>
    </article>
  );
}
