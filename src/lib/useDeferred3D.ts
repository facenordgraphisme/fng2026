'use client'

import { useEffect, useState } from 'react'

const QUERY = '(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const EVENTS = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll'] as const

// Conservé entre deux navigations côté client : la 3D revient sans nouvelle attente.
let hasInteracted = false

/**
 * Autorise le chargement de three.js sur ordinateur, après la première interaction.
 * Reste à false sur mobile, où un visuel statique suffit.
 */
export function useDeferred3D() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia(QUERY).matches) return

    let cancelIdle = () => {}
    const start = () => {
      hasInteracted = true
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => setEnabled(true), { timeout: 1000 })
        cancelIdle = () => window.cancelIdleCallback(id)
      } else {
        const id = globalThis.setTimeout(() => setEnabled(true), 200)
        cancelIdle = () => globalThis.clearTimeout(id)
      }
    }

    const onInteract = () => {
      EVENTS.forEach((e) => window.removeEventListener(e, onInteract))
      start()
    }

    if (hasInteracted) {
      start()
    } else {
      EVENTS.forEach((e) => window.addEventListener(e, onInteract, { passive: true }))
    }

    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, onInteract))
      cancelIdle()
    }
  }, [])

  return enabled
}
