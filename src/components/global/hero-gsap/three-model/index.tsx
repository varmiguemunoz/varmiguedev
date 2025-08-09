'use client';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useMemo, useRef } from 'react';
import { useThemeHex } from '@/hooks/use-theme-colors';

function FloatingObject({ geometry, position, color1, color2, speed, amplitude = 0.25 }: any) {
  const ref = useRef<THREE.Mesh>(null);
  const baseY = Array.isArray(position) ? position[1] ?? 0 : 0;

  const gradientMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.35,
        metalness: 0.2,
      }),
    []
  );

  // Crear geometría con gradiente
  const geom = geometry;
  const colors = [];
  const colorTop = new THREE.Color(color1);
  const colorBottom = new THREE.Color(color2);

  for (let i = 0; i < geom.attributes.position.count; i++) {
    const y = geom.attributes.position.getY(i);
    const t = (y + 1) / 2;
    colors.push(
      colorBottom.r + (colorTop.r - colorBottom.r) * t,
      colorBottom.g + (colorTop.g - colorBottom.g) * t,
      colorBottom.b + (colorTop.b - colorBottom.b) * t
    );
  }

  geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.005;
    ref.current.rotation.y += 0.01;
    ref.current.position.y = baseY + Math.sin(state.clock.elapsedTime * speed) * amplitude;
  });

  return <mesh ref={ref} position={position} geometry={geom} material={gradientMaterial} castShadow />;
}

function Scene() {
  const primaryHex = useThemeHex('--primary') ?? '#A855F7';
  const accentHex = useThemeHex('--accent') ?? '#4ADE80';
  const circleGeom = new THREE.SphereGeometry(1, 64, 64);
  const platformGeom = new THREE.CylinderGeometry(2, 2, 0.3, 64);

  return (
    <group position={[0, 1.5, 0]} scale={[1.25, 1.25, 1.25]}>
      {/* Luces mejoradas */}
      <ambientLight intensity={0.6} />
      <hemisphereLight color={primaryHex} groundColor={accentHex} intensity={0.5} />
      <spotLight position={[6, 7, 6]} angle={0.35} penumbra={1} intensity={2.0} castShadow />
      <pointLight position={[0, 3, 3]} intensity={1.4} color={primaryHex} distance={15} />

      {/* Plataforma */}
      <mesh geometry={platformGeom} position={[0, -1, 0]} receiveShadow>
        <meshStandardMaterial color={accentHex} roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Círculo principal con gradiente: elevar base y reducir amplitud para evitar contacto */}
      <FloatingObject
        geometry={circleGeom}
        position={[0, 0.5, 0]}
        color1={primaryHex}
        color2={accentHex}
        speed={1}
        amplitude={0.2}
      />

      {/* Objetos flotantes extra */}
      <FloatingObject
        geometry={new THREE.IcosahedronGeometry(0.4, 0)}
        position={[2, 0.5, 0]}
        color1={accentHex}
        color2={primaryHex}
        speed={1.2}
      />
      <FloatingObject
        geometry={new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16)}
        position={[-2, 1, 0]}
        color1={primaryHex}
        color2={accentHex}
        speed={1.5}
      />

      {/* Controles */}
      <OrbitControls enablePan={false} enableZoom={false} target={[0, 0, 0]} />
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="h-full w-full overflow-hidden">
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 57 }} className="block h-full">
        <Scene />
      </Canvas>
    </div>
  );
}
