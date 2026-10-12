import AnimatedText from "@/components/AnimatedText";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { Metadata } from "next";
import { getContactPage } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  const rawTitle = contact.seoTitle || "Contactez une agence web dans les Hautes-Alpes | Embrun";
  const title = rawTitle.includes("Face Nord Graphisme") ? { absolute: rawTitle } : rawTitle;
  const description = contact.seoDescription || "Un projet de site web dans le 05 ? Contactez Face Nord Graphisme, basé à Embrun. Devis gratuit pour Gap, Briançon, Guillestre et alentours.";

  return {
    title,
    description,
    alternates: { canonical: "https://www.facenordgraphisme.fr/contact" },
  };
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <div className="pt-24 pb-20 px-6 max-w-5xl mx-auto min-h-screen transition-colors duration-300">
      <AnimatedText>
        <span className="text-[#239ea0] font-bold tracking-widest uppercase text-sm mb-4 block text-center">{contact.eyebrow}</span>
        <h1 className="text-5xl md:text-6xl font-black mb-8 text-center tracking-tight text-[#1a1a1a] dark:text-white">
          {contact.heading}
        </h1>
        <p className="text-center text-[#666666] dark:text-[#a1a1aa] text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
          {contact.introParagraph}
        </p>
      </AnimatedText>

      <div className="grid lg:grid-cols-2 gap-12">
        <AnimatedText className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:shadow-none p-10 rounded-3xl h-fit transition-colors duration-300">
          <ContactForm />
        </AnimatedText>

        <AnimatedText className="flex flex-col justify-center space-y-10">
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <Phone className="text-[#239ea0]" size={24} /> {contact.phoneLabel}
            </h3>
            <a href={contact.phoneHref} className="text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] text-lg transition-colors inline-block ml-9">{contact.phoneNumber}</a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <Mail className="text-[#239ea0]" size={24} /> {contact.emailLabel}
            </h3>
            <a href={`mailto:${contact.emailAddress}`} className="text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] text-lg transition-colors inline-block ml-9">{contact.emailAddress}</a>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-2 flex items-center gap-3">
              <MapPin className="text-[#239ea0]" size={24} /> {contact.addressLabel}
            </h3>
            <div className="text-[#666666] dark:text-[#a1a1aa] text-lg ml-9 leading-relaxed">
              {(contact.addressLines || []).map((line: string, i: number) => (
                <span key={i}>{line}<br/></span>
              ))}
            </div>
            <div className="ml-9 mt-4">
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#239ea0] font-bold text-sm hover:underline">
                &rarr; {contact.mapsLinkLabel}
              </a>
            </div>
          </div>
        </AnimatedText>
      </div>
    </div>
  )
}
