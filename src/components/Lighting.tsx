'use client'

import { Suspense } from "react";
import { Environment } from "@react-three/drei";

export default function Lighting() {
  return (
    <group>
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>

      <directionalLight
        position={[0, -0, -0]}
        intensity={5}
        args={["red"]}
      />
      <directionalLight
        position={[20, 0, 0]}
        intensity={600}
        args={["purple"]}
      />
      <ambientLight intensity={0} />
    </group>
  );
} 