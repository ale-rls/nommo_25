'use client'

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Logo from '@/components/Logo';
import Blob from '@/components/Blob';
import Lighting from '@/components/Lighting';
import { ContactSection } from "@/components/ContactSection";
import { VideoSection } from "@/components/VideoSection";

export default function App() {
  const [loaded, setLoaded] = useState(true);

  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex justify-center items-center relative">
        <Logo />
        <Canvas
          orthographic
          shadows
          camera={{
            position: [-674.32, 401.86, 10.18],
            near: -10000,
            far: 10000,
            zoom: 1.5 * 100,
          }}
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 200ms ease-in-out",
            position: 'fixed',
            zIndex: -1,
          }}
        >
          <Suspense fallback={null}>
            <Blob position={[-0, -0, -0]} />
          </Suspense>
          <Lighting />
        </Canvas>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
