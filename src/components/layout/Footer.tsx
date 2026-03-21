import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/types/settings";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/crew", label: "Team" },
  { href: "/join", label: "Join Us" },
] as const;

const DOMAINS = [
  "Automotive",
  "Robotics",
  "Design",
  "Media",
  "Marketing",
  "Programming",
] as const;

interface FooterProps {
  settings: SiteSettings | null;
}

type SocialLabel = "Instagram" | "LinkedIn" | "GitHub";

const SOCIAL_ICONS: Record<SocialLabel, string> = {
  Instagram: "https://pub-f86fbbd7cd4a45088698b74e2b9a3e5f.r2.dev/icons/instagram.png",
  LinkedIn: "https://pub-f86fbbd7cd4a45088698b74e2b9a3e5f.r2.dev/icons/linkedin.png",
  GitHub: "https://pub-f86fbbd7cd4a45088698b74e2b9a3e5f.r2.dev/icons/github.png",
};

function SocialLinks({ settings }: { settings: SiteSettings | null }) {
  if (!settings) return null;

  const links = [
    { url: settings.instagram_url, label: "Instagram" as SocialLabel },
    { url: settings.linkedin_url, label: "LinkedIn" as SocialLabel },
    { url: settings.github_url, label: "GitHub" as SocialLabel },
  ].filter((l): l is { url: string; label: SocialLabel } => Boolean(l.url));

  if (links.length === 0) return null;

  return (
    <div style={{ display: "flex", gap: "1.25rem", marginBottom: "1.25rem" }}>
      {links.map(({ url, label }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", background: "#1a1a1a", borderRadius: "0.75rem", border: "1px solid #2a2a2a", transition: "border-color 0.2s" }}
        >
          <Image
            src={SOCIAL_ICONS[label]}
            alt={label}
            width={36}
            height={36}
            style={{ width: "36px", height: "36px", objectFit: "contain" }}
          />
        </a>
      ))}
    </div>
  );
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2a2a2a] bg-[#121212]">
      <div className="max-w-7xl" style={{ margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "3.2rem" }} className="footer-grid">
          <div className="md:col-span-1">
            <p className="mb-4 text-3xl font-black uppercase tracking-wider text-[#EF5D08]">VEGAVATH</p>
            <p className="mb-5 text-lg leading-relaxed text-[#9a9a9a]">
              Racing toward innovation in automotive, robotics, design, media, and marketing excellence.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#EBEBEB]">Quick Links</p>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-lg text-[#9a9a9a] transition-colors hover:text-[#F29C04]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#EBEBEB]">Our Domains</p>
            <ul className="space-y-3">
              {DOMAINS.map((domain) => (
                <li key={domain} className="text-lg text-[#9a9a9a]">{domain}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[#EBEBEB]">Stay Connected</p>
            <SocialLinks settings={settings} />
            {settings?.contact_email && (
              <p className="mt-3 text-base text-[#9a9a9a]">{settings.contact_email}</p>
            )}
          </div>
        </div>

        <div style={{ marginTop: "2.8rem", borderTop: "1px solid #2a2a2a", paddingTop: "1.8rem", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <p className="text-sm text-[#666666]">{`© ${year} Team Vegavath. All rights reserved.`}</p>
          <div className="flex items-center gap-6">
            <Link href="/legal" className="text-sm text-[#666666] transition-colors hover:text-[#F29C04]">Legal</Link>
            <p className="text-sm text-[#666666]">Made with ♥ by Vegavath Team</p>
          </div>
        </div>

        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-[#EF5D08] to-transparent opacity-40" />
      </div>
    </footer>
  );
}