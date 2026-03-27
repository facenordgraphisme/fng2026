import AnimatedText from "@/components/AnimatedText";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto min-h-screen transition-colors duration-300">
      <AnimatedText>
        <span className="text-[#239ea0] font-bold tracking-widest uppercase text-sm mb-4 block text-center">Me Contacter</span>
        <h1 className="text-5xl md:text-6xl font-black mb-8 text-center tracking-tight text-[#1a1a1a] dark:text-white">
          Prêt à atteindre de nouveaux sommets ?
        </h1>
        <p className="text-center text-[#666666] dark:text-[#a1a1aa] text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          Vous êtes basé à Embrun, à Gap, à Briançon ou ailleurs dans les Hautes-Alpes ? Vous cherchez à créer un site internet professionnel ou une boutique en ligne pour développer votre activité ? Je vous accompagne dans la réalisation de votre projet digital.
        </p>
      </AnimatedText>

      <div className="grid lg:grid-cols-2 gap-12">
        <AnimatedText className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none p-10 rounded-3xl h-fit transition-colors duration-300">
          <ContactForm />
        </AnimatedText>

        <AnimatedText className="flex flex-col justify-center space-y-10">
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <Phone className="text-[#239ea0]" size={24} /> Par téléphone
            </h3>
            <a href="tel:0651113928" className="text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] text-lg transition-colors inline-block ml-9">06 51 11 39 28</a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <Mail className="text-[#239ea0]" size={24} /> Par e-mail
            </h3>
            <a href="mailto:contact@facenordgraphisme.fr" className="text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] text-lg transition-colors inline-block ml-9">contact@facenordgraphisme.fr</a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <MapPin className="text-[#239ea0]" size={24} /> Mon adresse
            </h3>
            <div className="text-[#666666] dark:text-[#a1a1aa] text-lg ml-9 leading-relaxed">
              Basé à Puy-Sanières,<br/>
              45 Impasse du Serre<br/>
              05200 Puy-Sanières
            </div>
            <div className="ml-9 mt-4">
              <a href="https://www.google.com/maps/place/Le+Serre,+05200+Puy-Sani%C3%A8res" target="_blank" rel="noopener noreferrer" className="text-[#239ea0] font-bold text-sm hover:underline">
                &rarr; Me trouver sur Google Maps
              </a>
            </div>
          </div>
        </AnimatedText>
      </div>
    </div>
  )
}
