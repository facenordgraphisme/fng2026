'use client';

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
});
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { globalState } from "@/lib/store";

gsap.registerPlugin(ScrollTrigger);

export default function Preloader() {
  const container = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mountainContainerRef = useRef<HTMLDivElement>(null);
  const mountainInnerRef = useRef<HTMLDivElement>(null);
  const text1 = useRef<HTMLDivElement>(null);
  const text2 = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!complete) {
      document.body.style.overflow = "hidden";
      // Try to maintain scroll at top during loading
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [complete]);

  useGSAP(() => {
    if (globalState.isPreloaderDone) {
      setComplete(true);
      gsap.set(container.current, { visibility: "hidden" });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setComplete(true);
        globalState.isPreloaderDone = true;
      }
    });

    gsap.set(container.current, { visibility: "visible" });

    // Premium text reveal with blur and scale
    tl.fromTo(text1.current, 
      { y: 30, opacity: 0, filter: "blur(10px)", scale: 0.95 },
      { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.4, ease: "power4.out" }
    )
    .fromTo(text2.current,
      { y: 20, opacity: 0, filter: "blur(10px)", scale: 0.95 },
      { y: 0, opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.4, ease: "power4.out" },
      "-=1.1"
    )
    // Hold briefly, then exit letters
    .to([text1.current, text2.current], {
      y: -30,
      opacity: 0,
      filter: "blur(8px)",
      scale: 1.05,
      duration: 1,
      ease: "power3.inOut",
      stagger: 0.1,
      delay: 0.5
    })
    // Safely fade the inner mountain wrapper so it forms gracefully and doesn't conflict with parallax
    .to(mountainInnerRef.current, {
       opacity: 0.6,
       duration: 1.2,
       ease: "power2.out"
    }, "-=0.2")
    // 5-panel stagger wipe upwards
    .to(panelsRef.current, {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.inOut"
    }, "-=1.2");

    // Seamless scroll parallax for the integrated mountain
    gsap.to(mountainContainerRef.current, {
      yPercent: 40,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "1000px top",
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <div 
      ref={container}
      className={`fixed inset-0 flex items-center justify-center pointer-events-none ${complete ? 'z-[0]' : 'z-[10000]'}`}
      style={{ visibility: "hidden" }} // Hide before GSAP kicks in
    >
      {/* 5 Background Panels - Behind mountain so mountain is visible during preloader */}
      <div className={`absolute inset-0 flex w-full h-full overflow-hidden ${complete ? 'hidden' : 'pointer-events-auto z-0'}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            ref={(el) => {
              if (panelsRef.current) panelsRef.current[i] = el;
            }}
            className="h-full flex-1 bg-[#1a1a1a] border-r border-[#2a2a2a]/30 last:border-r-0 transform-gpu"
          />
        ))}
      </div>
      
      {/* The persistently integrated mountain Canvas */}
      <div ref={mountainContainerRef} className={`absolute w-full h-full opacity-100 ${complete ? 'z-0' : 'z-10'}`}>
         <div ref={mountainInnerRef} className="w-full h-full opacity-100">
           <HeroScene />
         </div>
      </div>

      {/* Typography layer */}
      {!complete && (
        <div className="relative z-20 flex flex-col items-center justify-center gap-1 sm:gap-3 px-4 text-center">
          <h1 
            ref={text1}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Face Nord
          </h1>
          <h2 
            ref={text2}
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light text-[#239ea0] tracking-[0.3em] sm:tracking-[0.5em] uppercase sm:ml-2"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Graphisme
          </h2>
        </div>
      )}
    </div>
  );
}
