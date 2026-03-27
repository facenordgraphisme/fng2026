import HomeHero from "@/components/HomeHero";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import { getServices, getProjects } from "@/sanity/lib/queries";

export default async function Home() {
  const services = await getServices();
  const projects = await getProjects();

  return (
    <div className="relative w-full overflow-hidden text-[#1a1a1a] dark:text-white transition-colors duration-300">
      {/* Hero Section using new Client Component for GSAP scroll-pin wow factor */}
      <HomeHero />

      {/* About Section Snippet (Overlapping Layout) */}
      <section className="py-24 bg-[#f4f7f9] dark:bg-[#111111] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center relative gap-8 md:gap-0">
            <div className="w-full md:w-6/12 md:-mr-[10%] z-10 mt-12 md:mt-0">
              <AnimatedText effect="slide-side" className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 relative transition-colors duration-300">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight text-[#1a1a1a] dark:text-white">Passionné par le web, ancré à Embrun</h2>
                <div className="text-[#666666] dark:text-[#a1a1aa] text-lg space-y-6 leading-relaxed mb-8">
                  <p>
                    Au-delà de ma passion pour l’informatique et les nouvelles technologies, je suis un amoureux de la montagne et des sports outdoor. Je comprends et partage les valeurs de notre magnifique région des Hautes-Alpes.
                  </p>
                  <p>
                    <b>Professionnel du tourisme, commerce local ou association sportive</b>, je saurai mettre en valeur votre activité en harmonie avec l’esprit et le cadre exceptionnel de notre territoire.
                  </p>
                </div>
                <Link href="/a-propos" className="inline-block px-8 py-3 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold rounded-md hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white shadow-md hover:-translate-y-1 transition-all">
                  En savoir plus
                </Link>
              </AnimatedText>
            </div>
            <div className="w-full md:w-7/12 z-0">
              <AnimatedText effect="zoom-in" className="relative h-[400px] md:h-[650px] w-full rounded-3xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <Image src="/assets/home_intro.png" fill className="object-cover transition-transform duration-1000 origin-center hover:scale-110" alt="Montagne et lac" />
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white dark:bg-[#1a1a1a] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-4/12 flex-shrink-0">
            <AnimatedText effect="3d-flip" className="sticky top-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1a1a] dark:text-white leading-tight">Ce que je peux faire pour vous</h2>
              <p className="text-[#666666] dark:text-[#a1a1aa] text-lg mb-8 leading-relaxed">
                Un site web professionnel pour attirer, convaincre et développer votre activité localement ou à distance.
              </p>
              <Link href="/prestations" className="inline-block px-8 py-3 bg-[#239ea0] text-white font-bold rounded-md hover:bg-[#1c8486] transition-colors shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1">
                Toutes les prestations
              </Link>
            </AnimatedText>
          </div>
          <div className="lg:w-8/12">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service: any, i: number) => {
                const href = service.slug?.current ? `/prestations/${service.slug.current}` : "/prestations";
                return (
                  <Link href={href} key={i} className="block group h-full">
                    <AnimatedText effect="fade-up" delay={i * 0.15} className="bg-[#f4f7f9] dark:bg-[#111111] h-full rounded-2xl p-8 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-none transition-all duration-300 border border-transparent group-hover:border-[#239ea0]/30 flex flex-col items-start group-hover:-translate-y-2">
                      <div className="text-4xl mb-6 text-[#239ea0] bg-white dark:bg-[#1a1a1a] p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                        {service.icon || "✨"}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors">{service.title}</h3>
                      <p className="text-[#666666] dark:text-[#a1a1aa] text-sm leading-relaxed">{service.description || service.desc}</p>
                    </AnimatedText>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-24 bg-[#f4f7f9] dark:bg-[#111111] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedText effect="zoom-in" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white">Dernières réalisations</h2>
          </AnimatedText>
          <div className="grid md:grid-cols-3 gap-8">
             {projects.slice(0, 3).map((project: any, i: number) => {
                const href = project.slug?.current ? `/portfolio/${project.slug.current}` : "/portfolio";
                const bgImage = project.mainImage?.url || project.mainImage || `/assets/about-img${(i % 3) + 1}.png`;
                return (
                  <Link href={href} key={i} className="block group">
                    <AnimatedText effect="3d-flip" delay={i * 0.15} className="relative h-[400px] w-full rounded-3xl overflow-hidden group cursor-pointer shadow-lg bg-gray-200 dark:bg-gray-800">
                      <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700">
                        <Image src={bgImage} fill className="object-cover" alt={project.title} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <div className="w-12 h-1 bg-[#239ea0] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                      </div>
                    </AnimatedText>
                  </Link>
                );
             })}
          </div>
          <div className="mt-16 text-center">
            <Link href="/portfolio" className="inline-block px-10 py-4 bg-white dark:bg-[#1a1a1a] border-2 border-[#1a1a1a] dark:border-white/20 text-[#1a1a1a] dark:text-white font-bold rounded-md hover:bg-[#1a1a1a] dark:hover:bg-white hover:text-white dark:hover:text-[#1a1a1a] transition-colors shadow-sm cursor-pointer">
              Voir tous les projets
            </Link>
          </div>
        </div>
      </section>

      {/* Call to action (Reverse Overlapping) */}
      <section className="py-32 bg-white dark:bg-[#1a1a1a] relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
            <div className="w-full md:w-6/12 md:-ml-[10%] z-10 mt-12 md:mt-0">
              <AnimatedText effect="slide-side" delay={0.2} className="bg-white dark:bg-[#111111] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-none border border-gray-50 dark:border-white/5 relative transition-colors duration-300">
                <h2 className="text-4xl font-bold mb-6 text-[#1a1a1a] dark:text-white leading-tight">Gagnez en visibilité, crédibilité, clients</h2>
                <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed mb-10">
                  Je suis à votre écoute pour échanger autour de vos besoins, idées ou questions. Contactez-moi pour un devis gratuit et donnons vie à votre projet.
                </p>
                <Link href="/contact" className="inline-block px-10 py-4 bg-[#239ea0] text-white font-bold rounded-md hover:bg-[#1c8486] transition-all shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1">
                  Discutons de votre projet
                </Link>
              </AnimatedText>
            </div>
            <div className="w-full md:w-7/12 z-0">
              <AnimatedText effect="zoom-in" className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800">
                <Image src="/assets/home_cta.png" fill className="object-cover hover:scale-105 transition-transform duration-1000" alt="Workspace" />
              </AnimatedText>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
