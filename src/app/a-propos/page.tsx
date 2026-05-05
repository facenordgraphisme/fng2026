import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import About3DScene from "@/components/About3DScene";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Développeur Web Hautes-Alpes (Embrun)",
  description: "Découvrez Face Nord Graphisme, votre partenaire local pour la création de sites internet dans les Hautes-Alpes. Basé à Embrun, j'accompagne les pros du 05."
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f4f7f9] dark:bg-[#111111] min-h-screen pb-32 transition-colors duration-300">
      
      {/* Hero Section */}
      <section className="bg-white dark:bg-[#1a1a1a] pt-32 pb-48 relative overflow-hidden transition-colors duration-300">
        <About3DScene />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center pointer-events-none">
          <AnimatedText>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 text-[#1a1a1a] dark:text-white leading-tight pointer-events-auto">
              Vous souhaitez créer un site internet dans les Hautes-Alpes ?
            </h1>
          </AnimatedText>

          <AnimatedText>
            <p className="text-xl text-[#666666] dark:text-[#a1a1aa] leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
              Pour mettre en valeur votre entreprise vous souhaitez un site web qui a autant de panache que l'ascension d'une montagne ? Vous êtes au bon endroit. La personne qui va vous créer un site internet dans les Hautes-Alpes, c'est moi, <strong className="text-[#1a1a1a] dark:text-white">François-Xavier Pin</strong>.
            </p>
            <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed max-w-3xl mx-auto">
              Je vis à Puy-Sanières dans les Alpes (05). C'est un magnifique village perché, surplombant le lac de Serre-Ponçon. Fervent passionné de ski, de vélo ainsi que de développement web, je suis convaincu que la montagne et la création de sites web partagent cette même quête de dépassement, cette même passion pour l'aventure et l'innovation.
            </p>
          </AnimatedText>
        </div>

        {/* Diagonal / Wave Separator Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[150px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[#f4f7f9] dark:fill-[#111111] transition-colors duration-300"></path>
          </svg>
        </div>
      </section>

      {/* Sections Overlapping Layout */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 space-y-32">
        
        {/* Section 2: Expertise Locale (Image Left) */}
        <div className="flex flex-col md:flex-row items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-img1.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="Espace de travail développeur web à Embrun (Hautes-Alpes)" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-ml-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                Une <span className="text-[#239ea0]">expertise locale</span> pour créer un site web dans les Hautes-Alpes.
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                Installé aux portes d'Embrun, entre Gap et Briançon, je suis parfaitement positionné pour comprendre les besoins spécifiques des entreprises locales et des projets web de notre région. Que vous soyez une entreprise cherchant à renforcer votre présence en ligne ou un particulier souhaitant concrétiser un projet web, je suis là pour vous accompagner à chaque étape. J'aime quand un projet me permet de collaborer avec des artisans et entreprises des Hautes-Alpes (Briançon, Guillestre, Embrun, Gap ou encore Tallard), mais je peux aussi proposer mes services à distance.
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 3: Passion Webdesign (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-img2.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="Conception et webdesign pour projets digitaux locaux" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-mr-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                Le Webdesign : une <span className="text-[#239ea0]">passion</span> devenue métier.
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg mb-4">
                Passionné d'informatique depuis mon plus jeune âge, j'ai toujours été fasciné par les nouvelles technologies. J'avais 15 ans lorsque j'ai fait mes premiers pas dans le monde du balisage HTML. Une expérience précoce qui a marqué le début d'un véritable intérêt pour le web design et le développement.
              </p>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                Après avoir passé une dizaine d'années à travailler dans le secteur saisonnier en montagne, j'ai converti ma passion en métier. Mon expertise me permet désormais de vous accompagner partout en France.
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 4: Compétences Techniques (Image Left) */}
        <div className="flex flex-col md:flex-row items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-img3.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="Développement de site internet sur-mesure et e-commerce" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-ml-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                Mes <span className="text-[#239ea0]">compétences techniques</span> au service de votre identité en ligne.
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                Ma formation initiale sur la suite Adobe et la création de sites WordPress m'ont permis d'acquérir des bases solides en design et en gestion de contenu. Par la suite, j'ai approfondi mes connaissances en apprenant les différents langages de développement front-end. C'est ainsi que je suis capable de créer des sites web au design unique, sans aucune limite créative ou technique. J'aime relever des défis et je suis prêt pour le vôtre.
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 5: Pourquoi me choisir (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-img4.png" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="Maquette de site internet sur tablette - UX/UI Design" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-mr-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                <span className="text-[#239ea0]">Pourquoi me choisir</span> pour créer un site internet ?
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg mb-6">
                À l’ère du numérique, avoir un site internet est bien plus qu’une simple présence en ligne. C’est un investissement stratégique qui contribuera à développer votre activité :
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-[#239ea0] mr-3 mt-1">✓</span>
                  <span className="text-[#666666] dark:text-[#a1a1aa] text-lg">Visible 24/24h et 7/7j, soyez accessible à tout moment.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#239ea0] mr-3 mt-1">✓</span>
                  <span className="text-[#666666] dark:text-[#a1a1aa] text-lg">Attirez et convertissez de nouveaux clients grâce à une expérience utilisateur fluide.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#239ea0] mr-3 mt-1">✓</span>
                  <span className="text-[#666666] dark:text-[#a1a1aa] text-lg">Renforcez votre crédibilité avec un site moderne et professionnel.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#239ea0] mr-3 mt-1">✓</span>
                  <span className="text-[#666666] dark:text-[#a1a1aa] text-lg">Démarquez-vous des concurrents grâce à un design unique.</span>
                </li>
              </ul>
              
              <div className="mt-10">
                <Link href="/contact" className="inline-block px-10 py-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold rounded-md hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white transition-colors">
                  Contactez-moi
                </Link>
              </div>
            </AnimatedText>
          </div>
        </div>

      </div>
    </div>
  )
}
