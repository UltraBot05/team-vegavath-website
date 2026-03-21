"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/crew", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/join", label: "Join Us" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#EF5D08]/20 bg-[#121212]/80 backdrop-blur-md">
      <nav className="flex w-full items-center justify-between" style={{ height: "80px", paddingLeft: "clamp(1.25rem, 5vw, 6rem)", paddingRight: "clamp(1.25rem, 5vw, 6rem)" }}>
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <Image
            src="https://pub-f86fbbd7cd4a45088698b74e2b9a3e5f.r2.dev/icons/logo.png"
            alt="Vegavath"
            width={48}
            height={48}
            className="object-contain" style={{ height: "72px", width: "72px" }}
          />
          <span className="font-black uppercase tracking-wider text-[#EF5D08]" style={{ fontSize: "2rem" }}>
            VEGAVATH
          </span>
        </Link>

        <ul className="hidden md:flex items-center" style={{ gap: "2.5rem" }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{ fontSize: "1.1rem" }}
                className={`font-semibold tracking-wide transition-colors duration-200 hover:text-[#EF5D08] ${
                  pathname === href ? "text-[#EF5D08]" : "text-[#9a9a9a]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0.6rem 0.75rem", background: "rgba(239,93,8,0.1)", border: "1px solid rgba(239,93,8,0.3)", borderRadius: "0.5rem", cursor: "pointer" }}
          className="md:hidden"
        >
          <span style={{ display: "block", height: "2px", width: "22px", background: "#EF5D08", borderRadius: "2px" }} />
          <span style={{ display: "block", height: "2px", width: "22px", background: "#EF5D08", borderRadius: "2px" }} />
          <span style={{ display: "block", height: "2px", width: "22px", background: "#EF5D08", borderRadius: "2px" }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden" style={{ borderTop: "1px solid rgba(239,93,8,0.2)", background: "rgba(18,18,18,0.98)", backdropFilter: "blur(12px)" }}>
          <ul style={{ display: "flex", flexDirection: "column", padding: "0.5rem 0 1rem 0" }}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "block",
                    padding: "0.875rem 1.5rem",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: pathname === href ? "#EF5D08" : "#EBEBEB",
                    borderLeft: pathname === href ? "3px solid #EF5D08" : "3px solid transparent",
                    transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}