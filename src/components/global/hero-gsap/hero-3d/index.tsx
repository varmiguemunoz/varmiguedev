import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Avatar3D() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#8B5CF6" metalness={0.8} roughness={0.2} envMapIntensity={1} />
      </mesh>
      <mesh position={[0, -1.5, 0.5]} rotation={[-Math.PI / 6, 0, 0]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#10B981" metalness={0.9} roughness={0.1} envMapIntensity={1} />
      </mesh>
    </Float>
  );
}

function CodeElements() {
  return (
    <group>
      {/* Code bracket symbols using simple geometries */}
      <mesh position={[-2, 1, -1]}>
        <boxGeometry args={[0.4, 0.8, 0.1]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[-2.3, 1.3, -1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>
      <mesh position={[-2.3, 0.7, -1]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#8B5CF6" />
      </mesh>

      {/* React logo representation */}
      <mesh position={[2, -1, -1]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
      <mesh position={[2, -1, -1]} rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
      <mesh position={[2, -1, -1]} rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[0.3, 0.05, 8, 16]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
      <mesh position={[2, -1, -1]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#10B981" />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#10B981" />

        <Avatar3D />
        <CodeElements />

        <Environment preset="night" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
