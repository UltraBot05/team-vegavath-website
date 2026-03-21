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
    <main className="bg-[#121212] text-[#EBEBEB]">
      <section className="w-full py-24">
        <Container>
          <div className="space-y-24">
            {premium.length > 0 && (
              <section className="w-full space-y-8">
                <div className="mx-auto w-full max-w-4xl space-y-2 border border-red-500 text-center">
                  <h1 className="text-4xl font-bold tracking-tight text-[#EBEBEB] md:text-5xl">Our Sponsors</h1>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#EF5D08]">Premium Partners</h2>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {premium.map((sponsor) => (
                    <article
                      key={sponsor.id}
                      className="flex flex-col items-center gap-5 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 text-center transition-colors hover:border-[#EF5D08] sm:flex-row sm:justify-center"
                    >
                      <div className="flex h-[70px] w-[140px] shrink-0 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#222222] p-3">
                        <Image
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          width={120}
                          height={60}
                          className="h-[60px] w-[120px] object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-center gap-2 text-center">
                        <p className="text-lg font-bold text-[#EBEBEB]">{sponsor.name}</p>
                        {sponsor.description && (
                          <p className="text-sm leading-relaxed text-[#9a9a9a]">{sponsor.description}</p>
                        )}
                        {sponsor.website_url && (
                          <a
                            href={sponsor.website_url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 text-xs font-semibold text-[#EF5D08] transition-colors hover:text-[#F29C04]"
                          >
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
              <section className="w-full space-y-6">
                <h2 className="text-center text-xs font-semibold uppercase tracking-widest text-[#9a9a9a]">Community Partners</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {community.map((sponsor) => (
                    <article
                      key={sponsor.id}
                      className="rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-5 transition-colors hover:border-[#EF5D08]"
                    >
                      <div className="mb-4 flex h-[60px] items-center justify-start">
                        <Image
                          src={sponsor.logo_url}
                          alt={sponsor.name}
                          width={120}
                          height={60}
                          className="h-[60px] w-[120px] object-contain"
                        />
                      </div>
                      <p className="mb-2 text-sm font-bold text-[#EBEBEB]">{sponsor.name}</p>
                      {sponsor.description && (
                        <p className="text-xs leading-relaxed text-[#9a9a9a]">{sponsor.description}</p>
                      )}
                      {sponsor.website_url && (
                        <a
                          href={sponsor.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-block text-xs font-semibold text-[#EF5D08] transition-colors hover:text-[#F29C04]"
                        >
                          Visit website →
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center sm:p-10">
              <div className="mx-auto w-full max-w-4xl border border-red-500 text-center">
                <h2 className="text-4xl font-bold text-[#EBEBEB] md:text-5xl">Interested in sponsoring Vegavath?</h2>
                <p className="mt-2 text-sm text-[#9a9a9a]">Partner with us to reach passionate engineering students and support the next generation of innovators.</p>
                <a
                  href="mailto:teamvegavathracing@pes.edu"
                  className="mt-5 inline-flex items-center rounded-lg bg-[#EF5D08] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#d44f06]"
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






