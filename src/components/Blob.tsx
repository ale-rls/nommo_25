'use client'

import { Sphere } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Displace, LayerMaterial } from "lamina";
import { useMemo, useRef, useEffect } from "react";
import { MathUtils, Mesh, Vector3 } from "three";
import { Displace as DisplaceType } from "lamina/vanilla";
import { useTheme } from '../app/ThemeContext';

// Define our own DisplaceProps type
interface DisplaceProps {
  strength?: number;
  scale?: number;
  offset?: [number, number, number];
}

export default function Blob({
  displaceProps,
  ...props
}: GroupProps & {
  displaceProps?: DisplaceProps;
}) {
  const { theme } = useTheme();
  const ref = useRef<Mesh>(null!);
  const rand = useMemo(() => Math.random(), []);
  const strength = useRef(1);
  const scale = useRef(2);
  const displaceRef = useRef<
    DisplaceType & { strength: number; offset: Vector3; scale: number }
  >(null!);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      
      // Smooth easing function
      const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const easedProgress = easeInOutCubic(scrollProgress);
      
      // Further reduced ranges: strength goes from 1 to 1.25, scale goes from 2 to 2.5
      strength.current = 1 + (easedProgress * 0.25);
      scale.current = 2 + (easedProgress * 0.5);
    };

    // Call once to set initial values
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }, dt) => {
    ref.current.position.y =
      Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2;

    if (displaceRef.current.strength !== strength.current) {
      displaceRef.current.strength = MathUtils.lerp(
        displaceRef.current.strength,
        strength.current,
        0.05
      );
    }

    if (displaceRef.current.scale !== scale.current) {
      displaceRef.current.scale = MathUtils.lerp(
        displaceRef.current.scale,
        scale.current,
        0.05
      );
    }

    if (strength.current > 0) {
      displaceRef.current.offset.x += 0.3 * dt;
    }
  });

  return (
    <group {...props}>
      <Sphere
        castShadow
        ref={ref}
        args={[0.4, 128, 128]}
      >
        <LayerMaterial
          color={theme === 'light' ? 'white' : 'black'}
          lighting={"physical"}
          transmission={0.1}
          roughness={0.1}
          thickness={2}
        >
          <Displace
            ref={displaceRef}
            strength={strength.current}
            scale={scale.current}
            offset={[100.009189000000357626, 0, 0]}
          />
        </LayerMaterial>
      </Sphere>
    </group>
  );
} 