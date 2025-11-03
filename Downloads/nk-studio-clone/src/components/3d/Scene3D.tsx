'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  PerspectiveCamera, 
  Environment, 
  OrbitControls,
  useTexture,
  MeshReflectorMaterial
} from '@react-three/drei'
import * as THREE from 'three'

// Glowing Monolith Component - with tilt toward right
function GlowingMonolith({ position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const edgesRef = useRef<THREE.LineSegments>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const innerGlowRef = useRef<THREE.Mesh>(null)
  
  // Static positioning with no animation
  
  return (
    <group rotation={[0, 0, -Math.PI * 0.1]} position={position}>  {/* Increased tilt to match target image */}
      {/* Main Monolith inner core */}
      <mesh ref={meshRef} castShadow>
        <boxGeometry args={[4.5, 22, 4.5]} /> {/* Increased height */}
        <meshPhysicalMaterial
          color="#20E7B7"
          emissive="#20E7B7"
          emissiveIntensity={4} /* Increased intensity */
          transparent={true}
          opacity={0.4} /* Slightly increased opacity */
          transmission={0.95}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
      
      {/* Outer glow effect */}
      <mesh ref={glowRef}>
        <boxGeometry args={[5.8, 24, 5.8]} /> {/* Larger glow effect */}
        <meshStandardMaterial
          color="#20E7B7"
          emissive="#20E7B7"
          emissiveIntensity={6} /* Increased glow */
          toneMapped={false}
          transparent={true}
          opacity={0.25}
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh ref={innerGlowRef}>
        <boxGeometry args={[3.8, 20, 3.8]} /> {/* Adjusted dimensions */}
        <meshStandardMaterial
          color="#20E7B7"
          emissive="#20E7B7"
          emissiveIntensity={5} /* Increased glow */
          transparent={true}
          opacity={0.7} /* Increased opacity */
          toneMapped={false}
        />
      </mesh>
      
      {/* Glowing edges - more pronounced */}
      <lineSegments ref={edgesRef}>
        <edgesGeometry attach="geometry">
          <boxGeometry args={[4.7, 22, 4.7]} /> {/* Increased dimensions */}
        </edgesGeometry>
        <lineBasicMaterial 
          attach="material" 
          color="#20E7B7" 
          linewidth={4} /* Thicker lines */
          toneMapped={false}
        />
      </lineSegments>
      
      {/* Inner edges for more definition */}
      <lineSegments>
        <edgesGeometry attach="geometry">
          <boxGeometry args={[4.2, 21, 4.2]} /> {/* Adjusted dimensions */}
        </edgesGeometry>
        <lineBasicMaterial 
          attach="material" 
          color="#ffffff" 
          linewidth={1.5}  /* Slightly thicker */
          transparent={true}
          opacity={0.8} /* Increased opacity */
          toneMapped={false}
        />
      </lineSegments>
      
      {/* Small details: horizontal lines at intervals - more of them */}
      {[-7, -5, -3, -1, 1, 3, 5, 7].map((yOffset, i) => (
        <lineSegments key={i} position={[0, yOffset, 0]}>          
          <edgesGeometry attach="geometry">
            <boxGeometry args={[3.3, 0.05, 3.3]} /> {/* Slightly larger */}
          </edgesGeometry>
          <lineBasicMaterial 
            attach="material" 
            color="#20E7B7" 
            linewidth={1.5} /* Thicker lines */
            transparent={true}
            opacity={0.95} /* More visible */
            toneMapped={false}
          />
        </lineSegments>
      ))}
      
      {/* Additional outer glow effect */}
      <mesh>
        <boxGeometry args={[7, 26, 7]} /> {/* Very large outer glow */}
        <meshBasicMaterial
          color="#20E7B7"
          transparent={true}
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Enhanced light sources */}
      <pointLight 
        position={[0, 0, 0]} 
        color="#20E7B7" 
        intensity={35} /* Increased intensity */
        distance={50} /* Increased range */
      />
      
      <pointLight 
        position={[0, 8, 0]} 
        color="#20E7B7" 
        intensity={40} /* Increased intensity */
        distance={55} /* Increased range */
      />
      
      {/* Additional light source at bottom */}
      <pointLight 
        position={[0, -8, 0]} 
        color="#20E7B7" 
        intensity={30}
        distance={45}
      />
    </group>
  )
}

// Aurora Particles - enhanced for more visible effect
function AuroraParticles() {
  const particleCount = 60000 // Further increased particle count for more vibrant effect
  const positions = useRef<Float32Array>(new Float32Array(particleCount * 3))
  const speeds = useRef<Float32Array>(new Float32Array(particleCount))
  const sizes = useRef<Float32Array>(new Float32Array(particleCount))
  const colors = useRef<Float32Array>(new Float32Array(particleCount * 3))
  
  // Create wave-like aurora shapes as seen in the target image
  useEffect(() => {
    // First set - background particles for the starfield effect
    for (let i = 0; i < particleCount * 0.4; i++) {
      // Random spherical coordinates - wider distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.9 // Nearly full hemisphere
      const r = 40 + Math.random() * 50 // Push particles further out
      
      // Convert to cartesian
      positions.current[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions.current[i * 3 + 1] = r * Math.cos(phi) + Math.random() * 25
      positions.current[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      
      // Particle characteristics
      speeds.current[i] = 0.005 + Math.random() * 0.02 // Slow movement
      sizes.current[i] = Math.random() * 0.25 + 0.05 // Very small particles for star effect
      
      // More bluish teal tint as in target image
      colors.current[i * 3] = 0.02 + Math.random() * 0.05    // R: minimal
      colors.current[i * 3 + 1] = 0.35 + Math.random() * 0.5 // G: higher
      colors.current[i * 3 + 2] = 0.25 + Math.random() * 0.4 // B: medium-high
    }
    
    // Second set - primary aurora bands as seen in target image
    for (let i = Math.floor(particleCount * 0.4); i < particleCount * 0.7; i++) {
      // Create wave-like clusters concentrated in specific areas
      const segment = Math.floor((i - particleCount * 0.4) / (particleCount * 0.06))
      const theta = (segment / 4) * Math.PI * 2 + Math.random() * 0.6
      const phi = Math.random() * 0.4 + 0.15 // More concentrated bands
      const r = 30 + Math.sin(theta * 8) * 20 // More pronounced wavy radius
      
      // Create ribbon-like structures as seen in target image
      positions.current[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 2.0
      positions.current[i * 3 + 1] = 5 + Math.cos(theta * 5) * 15 + Math.random() * 12
      positions.current[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 2.0
      
      // Varied sizes for depth
      sizes.current[i] = 0.6 + Math.random() * 1.2
      
      // Vibrant green color in the aurora bands - matching target image
      colors.current[i * 3] = 0.01 + Math.random() * 0.05      // R: very minimal
      colors.current[i * 3 + 1] = 0.5 + Math.random() * 0.45   // G: very pronounced
      colors.current[i * 3 + 2] = 0.2 + Math.random() * 0.2    // B: lower
    }

    // Third set - terrain/ground effect particles
    for (let i = Math.floor(particleCount * 0.7); i < particleCount; i++) {
      // Create wave-like ground pattern as seen in target image
      const x = (Math.random() - 0.5) * 100 // Wide spread on x-axis
      const z = (Math.random() - 0.5) * 100 // Wide spread on z-axis
      
      // Create undulating terrain surface
      const y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 10 - 15 + Math.random() * 5
      
      // Set positions
      positions.current[i * 3] = x
      positions.current[i * 3 + 1] = y
      positions.current[i * 3 + 2] = z
      
      // Larger particles for ground effect
      sizes.current[i] = 0.8 + Math.random() * 2.5
      
      // Vibrant green color for the ground - matching target image
      colors.current[i * 3] = 0.01 + Math.random() * 0.03      // R: minimal
      colors.current[i * 3 + 1] = 0.6 + Math.random() * 0.35   // G: very high
      colors.current[i * 3 + 2] = 0.15 + Math.random() * 0.15  // B: low
    }
  }, [])
  
  // We're completely removing the motion of the particles
  // No useFrame animation to keep the scene static

  return (
    <>
      {/* Main particles - creating texture */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.current, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15} /* Smaller particles for grainy texture */
          vertexColors
          transparent
          opacity={0.5} /* Slightly increased opacity for visibility */
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      
      {/* Add textured atmospheric planes for the grainy effect */}
      <mesh position={[0, 5, -10]} rotation={[-Math.PI * 0.1, 0, 0]} scale={[100, 60, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color="#0a4a40" 
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
      
      {/* Add reflective terrain/water plane as seen in target image */}
      <mesh position={[0, -18, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={[100, 100, 1]}>
        <planeGeometry />
        <meshStandardMaterial 
          color="#0a5f4f" 
          metalness={0.2}
          roughness={0.7}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* Extra atmospheric layer for depth */}
      <mesh position={[0, -5, -40]} rotation={[0, 0, 0]} scale={[150, 100, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          color="#064039" 
          transparent 
          opacity={0.25} 
          blending={THREE.AdditiveBlending} 
        />
      </mesh>
    </>
  )
}

// Main Scene Component
interface SceneProps {
  mouseY?: number;
}

function Scene({ mouseY = 0 }: SceneProps) {
  const { camera } = useThree()
  
  // Base camera position - adjusted to match the reference image exactly
  const baseCameraPos = useMemo(() => ({
    x: -5, 
    y: 12, 
    z: 25
  }), [])
  
  const baseLookAt = useMemo(() => ({
    x: 15, // Look toward the center-right where monolith is
    y: 5, 
    z: -5
  }), [])
  
  // Initial camera setup
  useEffect(() => {
    // Position camera to exactly match the reference image
    camera.position.set(baseCameraPos.x, baseCameraPos.y, baseCameraPos.z)
    camera.lookAt(baseLookAt.x, baseLookAt.y, baseLookAt.z)
    
    // Set higher field of view for more dramatic perspective
    if ('fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov = 65
      camera.updateProjectionMatrix()
    }
  }, [camera, baseCameraPos, baseLookAt])
  
  // Update camera based on mouse position
  useEffect(() => {
    if (mouseY !== undefined) {
      // Mouse Y controls camera height and angle
      // mouseY ranges from -1 (bottom of screen) to 1 (top of screen)
      const heightAdjustment = mouseY * 6 // More dramatic effect
      
      // Adjust camera height based on mouse Y
      camera.position.y = baseCameraPos.y + heightAdjustment
      
      // More dramatic camera angle change
      camera.lookAt(
        baseLookAt.x, 
        baseLookAt.y + heightAdjustment * 2,
        baseLookAt.z
      )
    }
  }, [camera, mouseY, baseCameraPos, baseLookAt])

  return (
    <>
      {/* Darker teal-tinted fog with increased density to match the reference image */}
      <fog attach="fog" args={['#052e29', 10, 130]} /> {/* Adjusted fog color to match target image */}
      
      {/* Subtle ambient light - not tinted to avoid excessive color cast */}
      <ambientLight intensity={0.4} color="#0d5347" /> {/* Increased intensity for more vibrant effect */}
      
      {/* Main directional light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={0.5} 
        castShadow 
        shadow-mapSize-width={2048} 
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      
      {/* Restored monolith with tilt toward right */}
      <GlowingMonolith position={[20, 8, -5]} /> {/* Slight adjustment to match target image */}
      
      {/* Add grainy texture overlay */}
      <mesh position={[0, 0, 15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          transparent
          opacity={0.15}
          blending={THREE.MultiplyBlending}
          map={createNoiseTexture(1, 0.15)}
        />
      </mesh>
      
      {/* Aurora effects */}
      <AuroraParticles />
      
      {/* More subtle spotlights */}
      <spotLight
        position={[0, 30, 0]}
        angle={0.7}
        penumbra={0.9}
        intensity={5} /* Increased intensity */
        castShadow
        color="#20E7B7"
        distance={80}
      />
      
      {/* Light for the left area */}
      <spotLight
        position={[-30, 25, 0]}
        angle={0.5}
        penumbra={0.9}
        intensity={4} /* Increased intensity */
        castShadow
        color="#20E7B7"
        distance={70}
      />
      
      {/* Enhanced lighting specifically for the monolith area */}
      <spotLight
        position={[20, 20, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={8}
        target-position={[20, 5, -5]}
        castShadow
        color="#20E7B7"
        distance={60}
      />
      
      {/* Additional spotlight to highlight monolith from another angle */}
      <spotLight
        position={[15, 10, 10]}
        angle={0.5}
        penumbra={0.9}
        intensity={7}
        target-position={[20, 5, -5]}
        castShadow
        color="#20E7B7"
        distance={50}
      />
      
      {/* Very subtle hemisphere light */}
      <hemisphereLight 
        color="#20E7B7" 
        groundColor="#000000" 
        intensity={0.3} /* Increased intensity */
      />
      
      {/* Environment reflection */}
      <Environment preset="night" />
    </>
  )
}

// Define custom noise texture function for grainy effect
function createNoiseTexture(scale = 1, factor = 0.2) {
  return useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext('2d')
    
    if (context) {
      // Fill with black
      context.fillStyle = 'black'
      context.fillRect(0, 0, size, size)
      
      // Add noise
      const imageData = context.getImageData(0, 0, size, size)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        // Random noise value
        const noise = (0.5 - Math.random()) * factor
        
        // Apply to RGB channels
        data[i] = 128 + noise * 255    // R
        data[i + 1] = 128 + noise * 255  // G
        data[i + 2] = 128 + noise * 255  // B
        // Alpha channel
        data[i + 3] = 255
      }
      
      context.putImageData(imageData, 0, 0)
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(scale, scale)
    return texture
  }, [scale, factor])
}

export default function Scene3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const noiseTexture = createNoiseTexture(1, 0.15)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    // Calculate normalized mouse position (-1 to 1)
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1 // Invert Y
    
    setMousePosition({ x, y })
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-[#042825]" /* Add base background color */
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-noise opacity-15" /> {/* Add noise texture overlay */}
      <Canvas shadows dpr={[1, 2]}>
        <Scene mouseY={mousePosition.y} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false}
          autoRotate={false} /* Disabled auto-rotation */
        />
      </Canvas>
    </div>
  )
}
