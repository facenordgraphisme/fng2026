'use client'

import React from 'react'
import AnimatedText from './AnimatedText'
import Link from 'next/link'

export default function HomeHero() {
  return (
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-transparent text-[#1a1a1a] dark:text-white">
      {/* Mountain is perfectly integrated by Preloader's persistent background layer */}

      <div className="z-10 text-center px-6 max-w-5xl pt-20">
        <AnimatedText effect="zoom-in" delay={3.5}>
          <div className="inline-block px-4 py-1.5 mb-6 text-sm md:text-base font-bold tracking-widest text-[#239ea0] bg-white dark:bg-[#1a1a1a] border border-[#239ea0]/20 rounded-full uppercase shadow-sm">
            Création de sites internet
          </div>
        </AnimatedText>

        <AnimatedText effect="3d-flip" delay={3.65}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 text-[#1a1a1a] dark:text-white leading-[1.1]">
            Des expériences digitales <span className="text-[#239ea0] italic pr-2">sur-mesure</span>
          </h1>
        </AnimatedText>
        
        <AnimatedText delay={3.8}>
          <p className="text-xl md:text-2xl text-[#666666] dark:text-[#a1a1aa] font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Face Nord Graphisme propulse votre activité locale grâce à un site web performant, moderne et taillé pour vos clients.
          </p>
        </AnimatedText>
        
        <AnimatedText effect="fade-up" delay={3.95}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            <Link href="/contact" className="px-10 py-4 bg-[#239ea0] text-white font-bold rounded-full hover:bg-[#1c8486] transition-all shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:shadow-[0_15px_30px_rgba(35,158,160,0.4)] hover:-translate-y-1 active:translate-y-0">
              Démarrer un projet
            </Link>
            <Link href="/portfolio" className="group flex items-center gap-2 px-10 py-4 bg-white dark:bg-[#111111] border-2 border-[#1a1a1a] dark:border-white/20 text-[#1a1a1a] dark:text-white font-bold rounded-full hover:bg-[#1a1a1a] hover:text-white dark:hover:bg-white dark:hover:text-[#1a1a1a] transition-all shadow-md hover:-translate-y-1 active:translate-y-0">
              Voir les projets
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </AnimatedText>
      </div>

      {/* Smooth gradient transition to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f4f7f9] dark:from-[#111111] to-transparent pointer-events-none transition-colors duration-300" />
    </section>
  )
}
