import { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) | Agence Web Embrun",
  description: "Trouvez les réponses à vos questions sur la création de site internet, le SEO, les tarifs et la maintenance web avec Face Nord Graphisme dans les Hautes-Alpes."
};

const faqs = [
  {
    q: "Quel est le prix pour la création d'un site internet ?",
    a: "Chaque projet est unique ! Le tarif dépend de vos besoins (site vitrine simple, e-commerce complexe, refonte, etc.). Un site vitrine de base peut démarrer autour de 1000€, tandis qu'une boutique en ligne complète nécessitera un budget plus important. Contactez-moi pour obtenir un devis gratuit et personnalisé."
  },
  {
    q: "Combien de temps faut-il pour créer un site web ?",
    a: "En général, il faut compter entre 3 et 6 semaines pour un site vitrine, et entre 2 et 3 mois pour un site e-commerce, sous réserve de validation rapide des étapes et de la fourniture des contenus (textes, photos, logos)."
  },
  {
    q: "Est-ce que je pourrai modifier mon site moi-même ?",
    a: "Absolument. Tous mes sites sont conçus avec des CMS (systèmes de gestion de contenu) modernes et intuitifs. Une fois le site en ligne, je vous fournis une formation pour que vous soyez autonome sur la modification de vos textes, images, ou l'ajout d'articles/produits."
  },
  {
    q: "Comment se passe la maintenance du site une fois en ligne ?",
    a: "Vous pouvez choisir de gérer la maintenance vous-même, mais je recommande fortement de souscrire à un forfait de maintenance mensuel ou annuel. Cela inclut les mises à jour techniques, de sécurité, les sauvegardes régulières et une assistance en cas de problème technique."
  },
  {
    q: "Mon site sera-t-il bien référencé sur Google ?",
    a: "Dès la création, votre site sera optimisé techniquement pour le SEO (vitesse, balises, structure, images). C'est ce qu'on appelle le SEO technique On-Page. Cependant, pour arriver en première position sur des mots-clés très concurrentiels, il faudra envisager une stratégie SEO complète sur le long terme (rédaction de contenu régulier, stratégie de liens entrants)."
  },
  {
    q: "Travaillez-vous uniquement avec des clients dans les Hautes-Alpes ?",
    a: "Bien que j'apprécie particulièrement travailler avec les acteurs locaux autour d'Embrun, Gap, Briançon ou Guillestre pour pouvoir se rencontrer physiquement, je suis tout à fait en mesure d'accompagner des clients partout en France. Les outils de visio-conférence et de partage d'écran nous permettent de collaborer très efficacement à distance."
  }
];

export default function FaqPage() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen transition-colors duration-300">
      <AnimatedText effect="fade-up" delay={0.1}>
        <div className="text-center mb-16">
          <span className="text-[#239ea0] font-bold tracking-widest uppercase text-sm mb-4 block">FAQ</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1a1a1a] dark:text-white mb-6">
            Foire Aux Questions
          </h1>
          <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto">
            Retrouvez ici les réponses aux questions les plus fréquentes concernant la création de sites internet et mes prestations web.
          </p>
        </div>
      </AnimatedText>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <AnimatedText key={index} effect="fade-up" delay={0.15 + (index * 0.05)}>
            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm [&_summary::-webkit-details-marker]:hidden open:shadow-md transition-all duration-300">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 md:p-8 font-bold text-[#1a1a1a] dark:text-white text-lg md:text-xl outline-none group-open:text-[#239ea0] transition-colors">
                {faq.q}
                <ChevronDown size={24} className="shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#239ea0]" />
              </summary>

              <div className="px-6 pb-6 md:px-8 md:pb-8">
                <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                  {faq.a}
                </p>
              </div>
            </details>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText effect="zoom-in" delay={0.5} className="mt-24">
        <div className="bg-[#f4f7f9] dark:bg-[#111111] border border-gray-100 dark:border-white/5 p-10 md:p-14 rounded-[32px] text-center transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1a1a1a] dark:text-white">Vous n'avez pas trouvé votre réponse ?</h2>
          <p className="text-[#666666] dark:text-[#a1a1aa] mb-8 text-lg max-w-xl mx-auto">
            N'hésitez pas à me contacter directement. Je me ferai un plaisir de discuter de votre projet et de répondre à toutes vos interrogations.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-[#239ea0] text-white font-bold rounded-xl hover:bg-[#1c8486] transition-colors shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1">
            Posez-moi votre question
          </Link>
        </div>
      </AnimatedText>
    </div>
  );
}
