import Link from 'next/link';

export default function Footer() {
  const footerData = {
    logo: "/logo.webp", // Reemplaza con la ruta de tu logo
    contact: {
      title: "Contacto e Informes",
      subtitle: "Secretaría de Desarrollo Energético Tamaulipas",
      address: "Carretera Victoria-Soto la Marina, km.5.5, Parque Tecnotam edificio empresarial, piso 2, CP. 87137, Cd. Victoria, Tamaulipas.",
      addressIcon: "/location.svg",
      email: "congreso.energia@tamaulipas.gob.mx",
      emailIcon: "/email.svg",
      phone: "(+52) 834 318 8000 - Ext. 58175",
      phoneIcon: "/phone.svg",
    },
    socialLinks: [
      { label: "Facebook", href: "https://www.facebook.com/share/1E5fxCdUa7/", icon: "/facebook.svg" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/sedenertam?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: "/linkedin.svg" },
      { label: "Instagram", href: "https://www.instagram.com/gobtam?igsh=Z2FheGw5NDl1YThn", icon: "/instagram.svg" },
      { label: "X", href: "https://x.com/SedenerTam", icon: "/x.svg" },
      { label: "Youtube", href: "https://www.youtube.com/@Secretar%C3%ADadeDesarrolloEnerg%C3%A9ti", icon: "/youtube.svg" },
    ],
    credits: {
      title: "Sitio desarrollado por:",
      logo: "/logo-sedener.png", // Reemplaza con la ruta del logo correspondiente
      alt: "Secretaría de Desarrollo Energético Tamaulipas"
    }
  };

  return (
    <footer style={{ backgroundColor: '#1c1b18', color: '#b0a89a', padding: '48px 24px', fontFamily: 'sans-serif' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}
      >
        {/* Columna 1: Logo Principal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={footerData.logo}
            alt="Congreso Internacional de Energía Tamaulipas 2026"
            style={{ width: '256px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Columna 2: Contacto e Informes */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', color: '#e6dfd3' }}>
            {footerData.contact.title}
          </h3>
          <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#a39a8c' }}>
            {footerData.contact.subtitle}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', lineHeight: '1.6', color: '#8e8678' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
              <img
                src={footerData.contact.addressIcon}
                alt=""
                aria-hidden="true"
                style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <span>{footerData.contact.address}</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <img
                src={footerData.contact.emailIcon}
                alt=""
                aria-hidden="true"
                style={{ width: '16px', height: '16px', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <a href={`mailto:${footerData.contact.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {footerData.contact.email}
              </a>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={footerData.contact.phoneIcon}
                alt=""
                aria-hidden="true"
                style={{ width: '16px', height: '16px', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
              />
              <a href={`tel:${footerData.contact.phone.replace(/[^0-9+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {footerData.contact.phone}
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Redes Sociales */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', color: '#e6dfd3' }}>
            Redes Sociales
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: '#8e8678' }}>
            {footerData.socialLinks.map((social) => (
              <li key={social.label} style={{ marginBottom: '8px' }}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none' }}
                >
                  <img
                    src={social.icon}
                    alt=""
                    aria-hidden="true"
                    style={{ width: '14px', height: '14px', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: 0.7 }}
                  />
                  <span>{social.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 4: Créditos de Desarrollo */}
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 'bold', color: '#e6dfd3' }}>
            {footerData.credits.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={footerData.credits.logo}
              alt={footerData.credits.alt}
              style={{ height: '88px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>

      </div>
    </footer>
  );
}
