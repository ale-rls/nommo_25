'use client'

import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Logo from '@/components/Logo';
import Blob from '@/components/Blob';
import Lighting from '@/components/Lighting';
import { ContactSection } from "@/components/ContactSection";

export default function App() {
  const [loaded, setLoaded] = useState(true);

  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex justify-center items-center">
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
      <section id="video" className="min-h-screen flex justify-center items-center">
        <div style={{ 
          width: '80%', 
          maxWidth: '1200px', 
          aspectRatio: '16/9', 
          background: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          Video Placeholder
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
