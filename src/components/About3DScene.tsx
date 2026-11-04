'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useDeferred3D } from '@/lib/useDeferred3D'

const About3DCanvas = dynamic(() => import('./About3DCanvas'), { ssr: false })

// Charge la scène sur ordinateur après la première interaction, et la met en pause hors écran.
export default function About3DScene() {
  const container = useRef<HTMLDivElement>(null)
  const show3D = useDeferred3D()
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = container.current
    if (!el || !show3D) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [show3D])

  return <div ref={container} className="absolute inset-0 z-0">{show3D && <About3DCanvas active={inView} />}</div>
}
