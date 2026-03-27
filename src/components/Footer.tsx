import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-white/10 py-12 px-6 mt-32 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-500 dark:text-[#a1a1aa]">
        <div>
          <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-4">FACE NORD GRAPHISME</h3>
          <p className="leading-relaxed">Création de Sites internet dans les Hautes-Alpes – Briançon, Embrun, Guillestre, Gap, Tallard…</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#1a1a1a] dark:text-white mb-4">Contact</h4>
          <p>contact@facenordgraphisme.fr</p>
          <p>06 51 11 39 28</p>
        </div>
        <div className="flex gap-6 pt-2">
          <a href="#" className="hover:text-[#239ea0] dark:hover:text-white transition-colors font-medium">Facebook</a>
          <a href="#" className="hover:text-[#239ea0] dark:hover:text-white transition-colors font-medium">Instagram</a>
          <a href="#" className="hover:text-[#239ea0] dark:hover:text-white transition-colors font-medium">LinkedIn</a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-100 dark:border-white/5 text-center md:text-left text-xs text-gray-400 dark:text-[#666666] flex flex-col md:flex-row justify-between items-center gap-4">
        <div>&copy; {new Date().getFullYear()} Face Nord Graphisme. Tous droits réservés.</div>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="hover:text-[#239ea0] dark:hover:text-white transition-colors">Mentions Légales</Link>
          <Link href="/politique-de-confidentialite" className="hover:text-[#239ea0] dark:hover:text-white transition-colors">Politique de Confidentialité</Link>
        </div>
      </div>
    </footer>
  )
}
