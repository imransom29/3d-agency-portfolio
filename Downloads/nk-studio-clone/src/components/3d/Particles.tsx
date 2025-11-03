import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ParticlesProps {
  count?: number;
  color?: string;
}

export default function Particles({ count = 1000, color = '#20E7B7' }: ParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360);
      
      let x = Math.sin(theta) * Math.cos(phi);
      let y = Math.sin(theta) * Math.sin(phi);
      let z = Math.cos(theta);
      
      const distance = THREE.MathUtils.randFloat(1, 3.5);
      
      positions[i * 3] = x * distance;
      positions[i * 3 + 1] = y * distance;
      positions[i * 3 + 2] = z * distance;
    }
    
    return positions;
  }, [count]);
  
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.0005;
    mesh.current.rotation.y += 0.0005;
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.015} 
        color={color}
        sizeAttenuation 
        transparent={true}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}
