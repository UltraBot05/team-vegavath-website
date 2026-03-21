import Image from "next/image";
import type { Metadata } from "next";
import { getActiveSponsors } from "@/lib/services/sponsors";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sponsors | Team Vegavath",
};

export const revalidate = 120;

export default async function SponsorsPage() {
  let sponsors = [] as Awaited<ReturnType<typeof getActiveSponsors>>;

  try {
    sponsors = await getActiveSponsors();
  } catch {
    sponsors = [];
  }

  const premium = sponsors.filter((s) => s.tier === "premium");
  const community = sponsors.filter((s) => s.tier === "community");

  return (
    <main style={{ background: "#121212", color: "#EBEBEB", overflowX: "hidden" }}>
      <section style={{ width: "100%", paddingTop: "6rem", paddingBottom: "6rem" }}>
        <Container>
          <div style={{ display: "flex", flexDirection: "column", gap: "5rem" }}>

            <header style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#EBEBEB", textAlign: "center" }}>Our Sponsors</h1>
              <p style={{ marginTop: "0.75rem", fontSize: "1rem", color: "#9a9a9a", textAlign: "center" }}>
                The partners who power our innovation
              </p>
            </header>

            {premium.length > 0 && (
              <section style={{ width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#EF5D08" }}>Premium Partners</p>
                  <div style={{ margin: "0.75rem auto 0", width: "3rem", height: "3px", background: "#EF5D08", borderRadius: "2px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 24rem), 1fr))", gap: "1.5rem", width: "100%" }}>
                  {premium.map((sponsor) => (
                    <article
                      key={sponsor.id}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", borderRadius: "0.75rem", border: "1px solid #2a2a2a", background: "#1a1a1a", padding: "2rem 1.5rem", textAlign: "center", transition: "border-color 0.2s" }}
                      className="hover:border-[#EF5D08]"
                    >
                      <div style={{ display: "flex", height: "80px", width: "160px", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem", border: "1px solid #2a2a2a", background: "#222222", padding: "0.75rem", flexShrink: 0 }}>
                        <Image
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          width={140}
                          height={70}
                          style={{ height: "70px", width: "140px", objectFit: "contain" }}
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                        <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#EBEBEB" }}>{sponsor.name}</p>
                        {sponsor.description && (
                          <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "#9a9a9a", textAlign: "center" }}>{sponsor.description}</p>
                        )}
                        {sponsor.website_url && (
                          <a href={sponsor.website_url} target="_blank" rel="noreferrer" style={{ marginTop: "0.25rem", fontSize: "0.85rem", fontWeight: 600, color: "#EF5D08", textDecoration: "none" }}>
                            Visit website →
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {community.length > 0 && (
              <section style={{ width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: "#9a9a9a" }}>Community Partners</p>
                  <div style={{ margin: "0.75rem auto 0", width: "3rem", height: "3px", background: "#2a2a2a", borderRadius: "2px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1.5rem", width: "100%" }}>
                  {community.map((sponsor) => (
                    <article
                      key={sponsor.id}
                      style={{ borderRadius: "0.75rem", border: "1px solid #2a2a2a", background: "#1a1a1a", padding: "1.5rem", transition: "border-color 0.2s" }}
                      className="hover:border-[#EF5D08]"
                    >
                      <div style={{ marginBottom: "1rem", height: "60px", display: "flex", alignItems: "center" }}>
                        <Image
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          width={120}
                          height={60}
                          style={{ height: "60px", width: "120px", objectFit: "contain" }}
                        />
                      </div>
                      <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#EBEBEB", marginBottom: "0.5rem" }}>{sponsor.name}</p>
                      {sponsor.description && (
                        <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "#9a9a9a" }}>{sponsor.description}</p>
                      )}
                      {sponsor.website_url && (
                        <a href={sponsor.website_url} target="_blank" rel="noreferrer" style={{ marginTop: "0.75rem", display: "inline-block", fontSize: "0.8rem", fontWeight: 600, color: "#EF5D08", textDecoration: "none" }}>
                          Visit website →
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: "56rem", border: "2px dashed #EF5D08", borderRadius: "1.5rem", padding: "3rem 2rem", textAlign: "center", boxSizing: "border-box" }}>
                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#EBEBEB", textAlign: "center" }}>Interested in Sponsoring Vegavath?</h2>
                <p style={{ marginTop: "0.75rem", fontSize: "0.95rem", color: "#9a9a9a", textAlign: "center" }}>Partner with us to reach passionate engineering students and support the next generation of innovators.</p>
                <a
                  href="mailto:teamvegavathracing@pes.edu"
                  style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", borderRadius: "9999px", background: "#EF5D08", padding: "0.75rem 2rem", fontSize: "0.95rem", fontWeight: 700, color: "white", textDecoration: "none" }}
                >
                  Become a Sponsor →
                </a>
              </div>
            </section>

          </div>
        </Container>
      </section>
    </main>
  );
}







