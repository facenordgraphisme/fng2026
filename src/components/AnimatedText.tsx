'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export type AnimationEffect = 'fade-up' | '3d-flip' | 'zoom-in' | 'slide-side';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  effect?: AnimationEffect;
  delay?: number;
}

export default function AnimatedText({ children, className, effect = 'fade-up', delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let fromState: gsap.TweenVars = { opacity: 0 };
    let toState: gsap.TweenVars = { opacity: 1, duration: 1.2, delay, ease: 'power3.out' };

    switch (effect) {
      case '3d-flip':
        fromState = { ...fromState, rotationX: -90, y: 50, transformOrigin: 'top center' };
        toState = { ...toState, rotationX: 0, y: 0, ease: 'back.out(1.5)' };
        break;
      case 'zoom-in':
        fromState = { ...fromState, scale: 0.8, filter: 'blur(10px)' };
        toState = { ...toState, scale: 1, filter: 'blur(0px)', ease: 'expo.out', duration: 1.5 };
        break;
      case 'slide-side':
        fromState = { ...fromState, x: -100 };
        toState = { ...toState, x: 0, ease: 'power4.out' };
        break;
      case 'fade-up':
      default:
        fromState = { ...fromState, y: 60 };
        toState = { ...toState, y: 0 };
        break;
    }

    toState.scrollTrigger = {
      trigger: containerRef.current,
      start: 'top 85%',
      toggleActions: 'play none none reverse' // Replays nicely if you scroll back up
    };

    gsap.fromTo(containerRef.current, fromState, toState);
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className} style={{ perspective: '1000px' }}>
      {children}
    </div>
  )
}
