'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, MeshDistortMaterial, Float } from '@react-three/drei'
import { useTheme } from '@/components/ThemeProvider'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => setMounted(true), [])

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
      
      // Interpolate scale on hover
      const targetScale = hovered ? 1.05 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  // Colors based on theme - making them extremely light and faint for readability
  const isDark = mounted && resolvedTheme === 'dark'
  const wireColor = isDark ? "#ffffff" : "#aae1e2"
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <mesh 
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[2.5, 2]} />
        <MeshDistortMaterial 
          color={wireColor} 
          envMapIntensity={0.2} 
          clearcoat={0} 
          metalness={0.1} 
          roughness={0.8}
          distort={hovered ? 0.3 : 0.15} 
          speed={hovered ? 2 : 1}
          wireframe={true}
          wireframeLinewidth={0.5}
          transparent={true}
          opacity={isDark ? 0.04 : 0.12} // Reduced opacity for lighter/thinner appearance
        />
      </mesh>
    </Float>
  )
}

export default function About3DScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-auto flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  )
}
