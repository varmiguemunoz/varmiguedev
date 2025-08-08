'use client';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { useRef } from 'react';

function FloatingObject({ geometry, position, color1, color2, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);

  const gradientMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
  });

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
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.3;
  });

  return <mesh ref={ref} position={position} geometry={geom} material={gradientMaterial} castShadow />;
}

function Scene() {
  const circleGeom = new THREE.SphereGeometry(1, 64, 64);
  const platformGeom = new THREE.CylinderGeometry(2, 2, 0.3, 64);

  return (
    <group position={[0, 1.5, 0]} scale={[1.25, 1.25, 1.25]}>
      {/* Luz */}
      <ambientLight intensity={0.3} />
      <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.2} castShadow />

      {/* Plataforma */}
      <mesh geometry={platformGeom} position={[0, -1, 0]} receiveShadow>
        <meshStandardMaterial color="#4ADE80" />
      </mesh>

      {/* Círculo principal con gradiente */}
      <FloatingObject geometry={circleGeom} position={[0, 0.2, 0]} color1="#4ADE80" color2="#A855F7" speed={0.8} />

      {/* Objetos flotantes extra */}
      <FloatingObject
        geometry={new THREE.IcosahedronGeometry(0.4, 0)}
        position={[2, 0.5, 0]}
        color1="#A855F7"
        color2="#4ADE80"
        speed={1.2}
      />
      <FloatingObject
        geometry={new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16)}
        position={[-2, 1, 0]}
        color1="#4ADE80"
        color2="#A855F7"
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
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 55 }} className="block h-full">
        <Scene />
      </Canvas>
    </div>
  );
}
