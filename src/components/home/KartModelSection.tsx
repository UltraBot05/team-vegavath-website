"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";
import { Suspense } from "react";

export default function KartModelSection() {
  return (
    <div>
      <div className="h-96 w-full overflow-hidden rounded-lg bg-gray-900">
        <Canvas camera={{ position: [5, 3, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 6, 4]} intensity={0.9} />
            <Box args={[2.8, 0.6, 1.4]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#8a8a8a" />
            </Box>
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
      <p className="mt-3 text-center text-sm text-gray-500">3D Kart Model — Full model coming soon</p>
    </div>
  );
}
