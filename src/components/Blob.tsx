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
  ortographic = true,
  ...props
}: GroupProps & {
  displaceProps?: DisplaceProps;
  ortographic?: boolean;
}) {
  const { theme } = useTheme();
  const ref = useRef<Mesh>(null!);
  const rand = useMemo(() => Math.random(), []);
  const strength = useRef(1);
  const scale = useRef(2);
  const mousePosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 }); // Actual interpolated position
  const velocity = useRef({ x: 0, y: 0 }); // For momentum
  const displaceRef = useRef<
    DisplaceType & { strength: number; offset: Vector3; scale: number }
  >(null!);

  // Constants for spring behavior
  const ATTACK_SPEED = 0.25; // Medium attack (how fast it follows the mouse)
  const RELEASE_SPEED = 1.08; // Long release (how fast it returns to rest)
  const SPRING_TENSION = 0.7; // How "tight" the spring feels
  const DAMPING = 0.075; // How quickly oscillations settle
  // Constants for displacement response
  const DISPLACEMENT_STRENGTH_FACTOR = 40.5; // How much velocity affects displacement
  const DISPLACEMENT_SCALE_FACTOR = -4.1; // How much velocity affects scale

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to range [-1, 1]
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
      
      // Smooth easing function
      const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      const easedProgress = easeInOutCubic(scrollProgress);
      
      // Further reduced ranges: strength goes from 1 to 1.25, scale goes from 2 to 2.5
      strength.current = 1 + (easedProgress * 0.195);
      scale.current = 2 + (easedProgress * 0.05);
    };

    // Call once to set initial values
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(({ clock }, dt) => {
    // Base vertical movement from sine wave
    const baseY = Math.sin(clock.elapsedTime + rand * 100) * 0.1 - 0.2;
    
    // Spring physics simulation for smooth movement
    const targetX = mousePosition.current.x;
    const targetY = mousePosition.current.y;

    // Calculate spring force
    const springX = (targetX - currentPosition.current.x) * SPRING_TENSION;
    const springY = (targetY - currentPosition.current.y) * SPRING_TENSION;

    // Update velocity with spring force
    velocity.current.x += springX * (targetX !== 0 ? ATTACK_SPEED : RELEASE_SPEED);
    velocity.current.y += springY * (targetY !== 0 ? ATTACK_SPEED : RELEASE_SPEED);

    // Apply damping
    velocity.current.x *= DAMPING;
    velocity.current.y *= DAMPING;

    // Calculate total velocity magnitude for displacement effect
    const velocityMagnitude = Math.sqrt(
      velocity.current.x * velocity.current.x + 
      velocity.current.y * velocity.current.y
    );

    // Update displacement based on both scroll and velocity
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);
    const easeInOutCubic = (t: number) => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easedProgress = easeInOutCubic(scrollProgress);

    // Combine scroll and velocity effects
    strength.current = 1 + (easedProgress * 0.195) + (velocityMagnitude * DISPLACEMENT_STRENGTH_FACTOR);
    scale.current = 2 + (easedProgress * 0.05) + (velocityMagnitude * DISPLACEMENT_SCALE_FACTOR);

    // Update position
    currentPosition.current.x += velocity.current.x;
    currentPosition.current.y += velocity.current.y;

    // Apply the smoothed position to the sphere
    ref.current.position.y = baseY + currentPosition.current.y * -2;
    ref.current.position.z = currentPosition.current.x * (window.innerWidth / window.innerHeight * -2);
    ref.current.position.x = 0;

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
        args={[0.37, 128, 128]}
        position={[0, 0, 0]}
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
            type='perlin'
          />
        </LayerMaterial>
      </Sphere>
    </group>
  );
} 