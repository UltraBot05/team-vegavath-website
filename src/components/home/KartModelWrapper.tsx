"use client";
import dynamic from "next/dynamic";

const KartModelSection = dynamic(() => import("@/components/home/KartModelSection"), {
  ssr: false,
  loading: () => <div style={{ height: "24rem", width: "100%", background: "#1a1a1a", borderRadius: "0.5rem" }} />,
});

export default function KartModelWrapper() {
  return (
    <>
      <div className="hidden md:block">
        <KartModelSection />
      </div>
      <div className="md:hidden" style={{ width: "100%", height: "16rem", background: "#1a1a1a", borderRadius: "0.75rem", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", color: "#666", fontSize: "0.875rem" }}>
        Full kart model coming soon
      </div>
    </>
  );
}