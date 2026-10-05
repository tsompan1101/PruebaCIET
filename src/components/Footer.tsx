import Link from 'next/link';

export default function Footer() {
  // Datos implícitos que antes venían de content.ts
  const footerData = {
    logo: "/images/tu-logo.svg", // Asegúrate de que esté en la carpeta public/
    description: "Breve descripción de tu organización o proyecto.",
    contact: {
      email: "contacto@tudominio.com",
      emailIcon: "/icons/email.svg",
      phone: "+52 834 000 0000",
      phoneIcon: "/icons/phone.svg",
    },
    redirectIcon: "/icons/redirect.svg",
    quickLinks: [
      { label: "Cronograma", href: "/cronograma" },
      { label: "Mapa", href: "/mapa" },
    ],
    social: [
      { label: "Aviso de Privacidad", href: "/privacidad" },
      { label: "Términos y Condiciones", href: "/terminos" },
    ],
  };

  return (
    <footer className="bg-brand-darker py-12 text-white">
      <div className="container-page grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <span className="font-display text-lg font-bold">
            <img
              src={footerData.logo}
              alt=""
              aria-hidden="true"
              className="w-80 opacity-80 brightness-0 invert"
            />
          </span>
          <p className="mt-3 max-w-xs text-sm text-white/70">{footerData.description}</p>

          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <img
                src={footerData.contact.emailIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 shrink-0 opacity-80 brightness-0 invert"
              />
              <a href={`mailto:${footerData.contact.email}`} className="break-all hover:text-white">
                {footerData.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <img
                src={footerData.contact.phoneIcon}
                alt=""
                aria-hidden="true"
                className="h-4 w-4 shrink-0 opacity-80 brightness-0 invert"
              />
              <a href={`tel:${footerData.contact.phone}`} className="hover:text-white">
                {footerData.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Links Rápidos
          </h4>
          <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {footerData.quickLinks.map((link) => (
              <li key={link.label + link.href}>
                {/* Puedes usar Link de Next.js si es una ruta interna */}
                <Link href={link.href} className="flex items-center gap-2 text-sm text-white/80 hover:text-white">
                  <img
                    src={footerData.redirectIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 opacity-70 brightness-0 invert"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
            Más información
          </h4>
          <div className="mt-4 flex flex-wrap gap-4">
            {footerData.social.map((s) => (
              <Link key={s.label} href={s.href} className="text-sm text-white/70 hover:text-white">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
        © {new Date().getFullYear()} — Todos los derechos reservados.
      </div>
    </footer>
  );
}
