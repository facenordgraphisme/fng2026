'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Magnetic({ children, className }: { children: React.ReactElement, className?: string }) {
  const magnetic = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = magnetic.current
    if (!element) return

    // QuickTo sets properties super fast
    const xTo = gsap.quickTo(element, "x", {duration: 1, ease: "elastic.out(1, 0.3)"})
    const yTo = gsap.quickTo(element, "y", {duration: 1, ease: "elastic.out(1, 0.3)"})

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = element.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      // Pull strength
      xTo(x * 0.35)
      yTo(y * 0.35)
    }

    const mouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    element.addEventListener('mousemove', mouseMove)
    element.addEventListener('mouseleave', mouseLeave)

    return () => {
      element.removeEventListener('mousemove', mouseMove)
      element.removeEventListener('mouseleave', mouseLeave)
    }
  }, [])

  return (
    <div ref={magnetic} className={className} data-magnetic="true" style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
