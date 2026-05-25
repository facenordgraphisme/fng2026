'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'

const services = [
  { label: 'Création de site internet', href: '/creation-site-internet-hautes-alpes' },
  { label: 'Boutique e-commerce', href: '/boutique-e-commerce-hautes-alpes' },
  { label: 'Refonte AI-Friendly', href: '/refonte-ai-friendly' },
  { label: 'Référencement SEO', href: '/referencement-seo-hautes-alpes' },
  { label: 'Référencement IA', href: '/referencement-ia' },
  { label: 'Maintenance', href: '/maintenance-site-internet-hautes-alpes' },
]

const cities = [
  { label: 'Agence web Gap', href: '/villes/gap-hautes-alpes' },
  { label: 'Agence web Briançon', href: '/villes/briancon-hautes-alpes' },
  { label: 'Agence web Embrun', href: '/villes/embrun-serre-poncon' },
]

export default function Footer() {
  const openCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault()
    window.dispatchEvent(new Event('show-cookie-banner'))
  }

  return (
    <footer className="bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/10 py-16 px-6 mt-32 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">

        {/* Brand */}
        <div className="lg:col-span-1">
          <h3 className="text-base font-bold text-[#1a1a1a] dark:text-white mb-3 tracking-wide uppercase">
            Face Nord Graphisme
          </h3>
          <p className="text-gray-500 dark:text-[#a1a1aa] leading-relaxed mb-4">
            Création de sites internet, SEO et identité visuelle pour les artisans et PME des Hautes-Alpes.
          </p>
          <div className="flex items-center gap-1.5 text-[#239ea0] text-xs font-semibold mb-1">
            <MapPin className="size-3.5" />
            Embrun (05) — Département 05
          </div>
          <p className="text-gray-400 dark:text-[#666] text-xs">contact@facenordgraphisme.fr</p>
          <p className="text-gray-400 dark:text-[#666] text-xs">06 51 11 39 28</p>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-semibold text-[#1a1a1a] dark:text-white mb-4 text-xs uppercase tracking-widest">
            Prestations
          </h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-gray-500 dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cities + Nav */}
        <div>
          <h4 className="font-semibold text-[#1a1a1a] dark:text-white mb-4 text-xs uppercase tracking-widest">
            Zones d'intervention
          </h4>
          <ul className="space-y-2.5 mb-6">
            {cities.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-gray-500 dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <h4 className="font-semibold text-[#1a1a1a] dark:text-white mb-3 text-xs uppercase tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-2">
            {[
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Blog', href: '/blog' },
              { label: 'À propos', href: '/a-propos' },
              { label: 'Contact', href: '/contact' },
              { label: 'FAQ', href: '/faq' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-gray-500 dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="font-semibold text-[#1a1a1a] dark:text-white mb-4 text-xs uppercase tracking-widest">
            Votre projet
          </h4>
          <p className="text-gray-500 dark:text-[#a1a1aa] leading-relaxed mb-5">
            Devis gratuit sous 48 h. Décrivez votre projet et recevez une proposition personnalisée.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors"
          >
            Démarrer mon projet →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 dark:text-[#666]">
        <div>&copy; {new Date().getFullYear()} Face Nord Graphisme — Création de site internet Hautes-Alpes</div>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
          <Link href="/mentions-legales" className="hover:text-[#239ea0] transition-colors">Mentions légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-[#239ea0] transition-colors">Politique de confidentialité</Link>
          <button onClick={openCookieSettings} className="hover:text-[#239ea0] transition-colors cursor-pointer text-left focus:outline-none">
            Cookies
          </button>
        </div>
      </div>
    </footer>
  )
}
