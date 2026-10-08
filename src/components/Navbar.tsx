"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/recinto", label: "Mapa del Congreso" },
  { href: "/ponentes", label: "Ponentes" },
  { href: "/cronograma", label: "Programa" }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      {/* Logo envuelto en un Link a la página principal */}
      <Link href="/" className="navbar-logo-link">
        <Image
          src="/g1.webp" /* Asegúrate de que la imagen esté ubicada en la carpeta public/logo.png */
          alt="Logo"
          width={160}
          height={80}
          priority
          className="navbar-logo-img"
        />
      </Link>

      <nav className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link ${pathname === link.href ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
