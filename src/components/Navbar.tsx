"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/recinto", label: "Recinto" },
  { href: "/ponentes", label: "Participantes"},
  { href: "/cronograma", label:"Cronograma"}
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar">
      <div className="navbar-logo">{/* LOGO_AQUI */}</div>

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
