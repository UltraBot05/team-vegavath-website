import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllSettings } from "@/lib/services/settings";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getAllSettings().catch(() => null);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
