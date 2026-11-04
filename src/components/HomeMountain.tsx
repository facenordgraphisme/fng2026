'use client'

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useDeferred3D } from '@/lib/useDeferred3D'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

// Fond de la page d'accueil : un dessin statique, remplacé sur ordinateur par la
// scène WebGL après la première interaction. Le rendu s'arrête une fois le fond masqué.
export default function HomeMountain() {
  const container = useRef<HTMLDivElement>(null)
  const show3D = useDeferred3D()
  const [active, setActive] = useState(true)

  useGSAP(() => {
    gsap.to(container.current, {
      yPercent: 40,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '1000px top',
        scrub: true,
        onUpdate: (self) => setActive(self.progress < 1),
      },
    })
  }, { scope: container })

  return (
    <div ref={container} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${show3D ? 'opacity-0' : 'opacity-40 dark:opacity-25'}`}
        style={{ backgroundImage: 'url(/assets/mountain-wireframe.svg)' }}
      />
      {show3D && (
        <div className="absolute inset-0 opacity-60">
          <HeroScene active={active} />
        </div>
      )}
    </div>
  )
}
