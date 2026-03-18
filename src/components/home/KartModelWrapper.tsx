"use client";

import dynamic from "next/dynamic";

const KartModelSection = dynamic(() => import("@/components/home/KartModelSection"), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-lg" />,
});

export default function KartModelWrapper() {
  return <KartModelSection />;
}
