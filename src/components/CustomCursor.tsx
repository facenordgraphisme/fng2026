'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [hasMouse, setHasMouse] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const cursor = cursorRef.current
    if (!cursor) return

    // Don't disable on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" })

    const moveCursor = (e: MouseEvent) => {
      if (!hasMouse) {
        setHasMouse(true)
        // Dynamically hide the system cursor only once we confirm the user actually has a mouse!
        document.body.style.cursor = 'none';
        const interactables = document.querySelectorAll('a, button, input, textarea');
        interactables.forEach((el) => { (el as HTMLElement).style.cursor = 'none'; });
      }
      mouseX = e.clientX
      mouseY = e.clientY
      xTo(mouseX)
      yTo(mouseY)
    }

    const mousedown = () => gsap.to(cursor, { scale: 0.8, duration: 0.2 })
    const mouseup = () => gsap.to(cursor, { scale: 1, duration: 0.2 })

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', mousedown)
    window.addEventListener('mouseup', mouseup)

    // Handle magnetic interactions
    let ctx = gsap.context(() => {});
    
    const handleLinks = () => {
       const targets = document.querySelectorAll('a, button, input, textarea, [data-magnetic="true"]')
       targets.forEach(target => {
         if (hasMouse) {
           (target as HTMLElement).style.cursor = 'none';
         }
         
         if ((target as any)._hasCursorEvent) return;
         (target as any)._hasCursorEvent = true;

         target.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2.5, backgroundColor: 'rgba(35, 158, 160, 0.15)', borderColor: 'transparent', duration: 0.3 })
         })
         target.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderColor: '#239ea0', duration: 0.3 })
         })
       })
    }

    handleLinks()
    const observer = new MutationObserver(handleLinks)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', mousedown)
      window.removeEventListener('mouseup', mouseup)
      observer.disconnect()
      ctx.revert()
    }
  }, [])

  if (!isClient) return null

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[#239ea0] pointer-events-none z-[99999] hidden md:flex items-center justify-center transform-gpu -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(35,158,160,0.3)] transition-colors"
    >
      <div className="w-1.5 h-1.5 bg-[#239ea0] rounded-full absolute shadow-[0_0_5px_rgba(35,158,160,0.8)]" />
    </div>
  )
}
