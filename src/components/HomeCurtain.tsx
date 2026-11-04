import type { CSSProperties } from 'react'

const PANELS = [0, 1, 2, 3, 4]

// Rideau de marque de la page d'accueil. Sans JavaScript, masqué sur mobile
// et joué une seule fois par session (voir le script de src/app/layout.tsx).
export default function HomeCurtain() {
  return (
    <div
      aria-hidden="true"
      className="fn-curtain fixed inset-0 z-[10000] pointer-events-none hidden md:flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {PANELS.map((i) => (
          <div
            key={i}
            className="fn-curtain-panel h-full flex-1 bg-[#1a1a1a] border-r border-[#2a2a2a]/30 last:border-r-0"
            style={{ '--i': i } as CSSProperties}
          />
        ))}
      </div>
      <div className="fn-curtain-text relative flex flex-col items-center gap-3 text-center uppercase">
        <div className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter">Face Nord</div>
        <div className="text-xl md:text-3xl lg:text-4xl font-light text-[#239ea0] tracking-[0.5em] ml-2">Graphisme</div>
      </div>
    </div>
  )
}
