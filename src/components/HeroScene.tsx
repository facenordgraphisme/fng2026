'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Float, Preload, Sparkles } from '@react-three/drei'
import { useTheme } from '@/components/ThemeProvider'

function ProceduralMountain({ color, opacity }: { color: string, opacity: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const geometry = useMemo(() => {
    // 48x48 segments for a highly detailed but low-poly looking mountain
    const geo = new THREE.PlaneGeometry(16, 16, 48, 48);
    geo.rotateX(-Math.PI / 2); // Lay flat
    
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      const distanceToCenter = Math.sqrt(x*x + z*z);
      
      // Peak formula: high in center, slopes down
      let height = Math.max(0, 4.5 - distanceToCenter * 0.7);
      
      if (height > 0) {
        // Add highly stylized rocky ridges using combined sine waves
        height += Math.sin(x * 3) * Math.cos(z * 3) * 0.4;
        height += Math.sin(x * 6) * Math.cos(z * 6) * 0.15;
      }
      
      // Base terrain slight variation
      height += Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.2;
      
      pos.setY(i, height - 1.5); // Shift down
    }
    geo.computeVertexNormals();
    return geo;
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05 // Very slow cinematic spin
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={geometry} position={[0, -1, 0]}>
        <meshStandardMaterial 
          color={color} 
          wireframe={true} 
          wireframeLinewidth={0.5}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene({ className }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  // Graceful handling to prevent Next.js hydration mismatch on Canvas props
  const isDark = mounted && resolvedTheme === 'dark';
  
  const mountainColor = isDark ? "#ffffff" : "#a1d6d7";
  const mountainOpacity = isDark ? 0.25 : 0.15;
  const sparkle1 = isDark ? "#ffffff" : "#a1d6d7";
  const sparkle2 = isDark ? "#888888" : "#1a1a1a";

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-1000 ${className || ''}`}>
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <ambientLight intensity={1} />
        <ProceduralMountain color={mountainColor} opacity={mountainOpacity} />
        {/* Magic particles adapt perfectly to dark mode contrast */}
        <Sparkles count={150} scale={14} size={2.5} speed={0.4} color={sparkle1} opacity={isDark ? 0.5 : 0.4} position={[0, 1, 0]} />
        <Sparkles count={50} scale={12} size={4} speed={0.2} color={sparkle2} opacity={isDark ? 0.3 : 0.15} position={[0, 2, 0]} />
        <Preload all />
      </Canvas>
    </div>
  )
}
