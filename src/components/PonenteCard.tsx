export interface PonenteCardProps {
  firstLine: string;
  lastLine: string;
  role: string;
  linkedinUrl?: string | null;
}

export default function PonenteCard({
  firstLine,
  lastLine,
  role,
  linkedinUrl,
}: PonenteCardProps) {
  return (
    <article className="ponente-card">
      <div className="ponente-photo">
        {/* FOTO_PONENTE_AQUI: reemplazar por <img src="..." alt={`${firstLine} ${lastLine}`} /> */}
        <div className="ponente-photo-placeholder">
          Foto de {firstLine} {lastLine}
        </div>
        <div className="ponente-photo-gradient" />

        {linkedinUrl && (
          <a
            className="ponente-social"
            href={linkedinUrl}
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
