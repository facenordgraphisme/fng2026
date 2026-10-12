import { Metadata } from "next";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getFaqPage } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const faqPage = await getFaqPage();
  const rawTitle = faqPage.seoTitle || "Foire Aux Questions (FAQ) | Agence Web Embrun";
  const title = rawTitle.includes("Face Nord Graphisme") ? { absolute: rawTitle } : rawTitle;
  const description = faqPage.seoDescription || "Trouvez les réponses à vos questions sur la création de site internet, le SEO, les tarifs et la maintenance web avec Face Nord Graphisme dans les Hautes-Alpes.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.facenordgraphisme.fr/faq" },
  };
}

export default async function FaqPage() {
  const faqPage = await getFaqPage();
  const faqs = faqPage.items || [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AnimatedText effect="fade-up" delay={0.1}>
        <div className="text-center mb-16">
          <span className="text-[#239ea0] font-bold tracking-widest uppercase text-sm mb-4 block">{faqPage.eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#1a1a1a] dark:text-white mb-6">
            {faqPage.heading}
          </h1>
          <p className="text-lg text-[#666666] dark:text-[#a1a1aa] leading-relaxed max-w-2xl mx-auto">
            {faqPage.introParagraph}
          </p>
        </div>
      </AnimatedText>

      <div className="space-y-6">
        {faqs.map((faq: any, index: number) => (
          <AnimatedText key={index} effect="fade-up" delay={0.15 + (index * 0.05)}>
            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm [&_summary::-webkit-details-marker]:hidden open:shadow-md transition-all duration-300">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 md:p-8 font-bold text-[#1a1a1a] dark:text-white text-lg md:text-xl outline-none group-open:text-[#239ea0] transition-colors">
                {faq.question}
                <ChevronDown size={24} className="shrink-0 transition-transform duration-300 group-open:-rotate-180 text-[#239ea0]" />
              </summary>

              <div className="px-6 pb-6 md:px-8 md:pb-8">
                <p className="text-[#666666] dark:text-[#a1a1aa] leading-relaxed text-lg">
                  {faq.answer}
                </p>
              </div>
            </details>
          </AnimatedText>
        ))}
      </div>

      <AnimatedText effect="zoom-in" delay={0.5} className="mt-24">
        <div className="bg-[#f4f7f9] dark:bg-[#111111] border border-gray-100 dark:border-white/5 p-10 md:p-14 rounded-[32px] text-center transition-colors duration-300">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1a1a1a] dark:text-white">{faqPage.closingHeading}</h2>
          <p className="text-[#666666] dark:text-[#a1a1aa] mb-8 text-lg max-w-xl mx-auto">
            {faqPage.closingParagraph}
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-[#239ea0] text-white font-bold rounded-xl hover:bg-[#1c8486] transition-[background-color,transform] shadow-[0_10px_20px_rgba(35,158,160,0.3)] hover:-translate-y-1 active:translate-y-0">
            {faqPage.closingCtaLabel}
          </Link>
        </div>
      </AnimatedText>
    </div>
  );
}
