import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";
import Link from "next/link";
import About3DScene from "@/components/About3DScene";
import { Metadata } from "next";
import { getAboutPage } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const rawTitle = about.seoTitle || "À Propos | Développeur Web Hautes-Alpes (Embrun)";
  const title = rawTitle.includes("Face Nord Graphisme") ? { absolute: rawTitle } : rawTitle;
  const description = about.seoDescription || "Découvrez Face Nord Graphisme, votre partenaire local pour la création de sites internet dans les Hautes-Alpes. Basé à Embrun, j'accompagne les pros du 05.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.facenordgraphisme.fr/a-propos" },
  };
}

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <div className="w-full bg-[#f4f7f9] dark:bg-[#111111] min-h-screen pb-32 transition-colors duration-300">

      {/* Hero Section */}
      <section className="bg-white dark:bg-[#1a1a1a] pt-32 pb-48 relative overflow-hidden transition-colors duration-300">
        <About3DScene />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center pointer-events-none">
          <AnimatedText>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 text-[#1a1a1a] dark:text-white leading-tight pointer-events-auto">
              {about.heroHeading}
            </h1>
          </AnimatedText>

          <AnimatedText>
            <p className="text-xl text-[#666666] dark:text-[#a1a1aa] leading-relaxed font-medium mb-8 max-w-3xl mx-auto">
              {about.heroParagraph1}
            </p>
            <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed max-w-3xl mx-auto">
              {about.heroParagraph2}
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
              <Image src="/assets/face-nord-graphisme-a-propos.jpg" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" alt="François-Xavier Pin — Face Nord Graphisme, agence web à Embrun (Hautes-Alpes)" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-ml-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                {about.section1Heading}
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                {about.section1Body}
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 3: Passion Webdesign (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-webdesign.webp" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" alt="Sites ÉvasionSki et Voyageurs des Alpes conçus par François-Xavier Pin" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-mr-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                {about.section2Heading}
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg mb-4">
                {about.section2Body1}
              </p>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                {about.section2Body2}
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 4: Compétences Techniques (Image Left) */}
        <div className="flex flex-col md:flex-row items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-dev.webp" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" alt="Outplanners, plateforme de réservation développée par Face Nord Graphisme, sur ordinateur et mobile" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-ml-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                {about.section3Heading}
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                {about.section3Body}
              </p>
            </AnimatedText>
          </div>
        </div>

        {/* Section 5: Pourquoi me choisir (Image Right) */}
        <div className="flex flex-col md:flex-row-reverse items-center relative gap-8 md:gap-0">
          <div className="w-full md:w-7/12 z-0">
            <AnimatedText className="relative h-[400px] md:h-[600px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-none border border-transparent dark:border-white/10 dark:opacity-80 transition-all duration-300">
              <Image src="/assets/about-mobile.webp" fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" alt="Versions mobiles des sites La Montagne Guide, Voyageurs des Alpes et ÉvasionSki" />
            </AnimatedText>
          </div>
          <div className="w-full md:w-6/12 md:-mr-24 z-10">
            <AnimatedText className="bg-white dark:bg-[#1a1a1a] p-10 md:p-14 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none border border-gray-50 dark:border-white/5 transition-colors duration-300">
              <h3 className="text-3xl font-bold text-[#1a1a1a] dark:text-white mb-6 leading-tight">
                {about.section4Heading}
              </h3>
              <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg mb-6">
                {about.section4Intro}
              </p>
              <ul className="space-y-4">
                {(about.section4Checklist || []).map((item: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#239ea0] mr-3 mt-1">✓</span>
                    <span className="text-[#666666] dark:text-[#a1a1aa] text-lg">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link href="/contact" className="inline-block px-10 py-4 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold rounded-md hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white transition-colors">
                  {about.section4CtaLabel}
                </Link>
              </div>
            </AnimatedText>
          </div>
        </div>

      </div>
    </div>
  )
}
