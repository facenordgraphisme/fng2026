'use client'

import React from 'react'
import AnimatedText from './AnimatedText'
import Link from 'next/link'
import { Check } from 'lucide-react'

export interface HomeHeroData {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubtext: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  heroTrustItems?: string[];
}

// Text wrapped in *asterisks* in the Studio headline is rendered in the accent colour.
function renderAccent(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2
      ? <span key={i} className="text-[#239ea0]">{part.slice(1, -1)}</span>
      : part
  )
}

export default function HomeHero({ heroData }: { heroData: HomeHeroData }) {
  // Hero content animates in immediately (and renders behind the opaque
  // preloader overlay) so it counts toward FCP/LCP without waiting for the
  // multi-second preloader sequence to finish.
  const baseDelay = 0;

  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-transparent text-[#1a1a1a] dark:text-white">
      {/* Mountain is perfectly integrated by Preloader's persistent background layer */}

      <div className="z-10 text-center px-6 max-w-5xl pt-20">
        <AnimatedText effect="zoom-in" delay={baseDelay}>
          <div className="inline-block px-4 py-1.5 mb-6 text-sm md:text-base font-bold tracking-widest text-[#239ea0] bg-white dark:bg-[#1a1a1a] border border-[#239ea0]/20 rounded-full uppercase shadow-sm">
            {heroData.heroEyebrow}
          </div>
        </AnimatedText>

        <AnimatedText effect="3d-flip" delay={baseDelay + 0.15}>
          <h1 className="text-[2.6rem] md:text-6xl xl:text-7xl font-bold tracking-tight mb-8 text-[#1a1a1a] dark:text-white leading-[1.08] text-balance">
            {renderAccent(heroData.heroHeadline)}
          </h1>
        </AnimatedText>

        <AnimatedText delay={baseDelay + 0.3}>
          <p className="text-xl md:text-2xl text-[#666666] dark:text-[#a1a1aa] font-medium mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
            {heroData.heroSubtext}
          </p>
        </AnimatedText>

        <AnimatedText effect="fade-up" delay={baseDelay + 0.45}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            <Link href="/contact" className="px-10 py-4 bg-[#239ea0] text-white font-bold rounded-full hover:bg-[#1c8486] transition-all shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:shadow-[0_15px_30px_rgba(35,158,160,0.4)] hover:-translate-y-1 active:translate-y-0">
              {heroData.heroPrimaryCtaLabel}
            </Link>
            <Link href="/portfolio" className="group flex items-center gap-2 px-10 py-4 bg-white dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-white/20 text-[#1a1a1a] dark:text-white font-bold rounded-full hover:bg-[#1a1a1a] hover:text-white dark:hover:bg-white dark:hover:text-[#1a1a1a] transition-all shadow-md hover:-translate-y-1 active:translate-y-0">
              {heroData.heroSecondaryCtaLabel}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </Link>
          </div>
        </AnimatedText>

        {heroData.heroTrustItems && heroData.heroTrustItems.length > 0 && (
          <AnimatedText effect="fade-up" delay={baseDelay + 0.6}>
            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[#444] dark:text-[#a1a1aa]">
              {heroData.heroTrustItems.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#239ea0]" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedText>
        )}
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f4f7f9] dark:from-[#111111] to-transparent pointer-events-none transition-colors duration-300" />
    </section>
  )
}
