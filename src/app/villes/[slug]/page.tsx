import { getCityPageBySlug, getAllCityPageSlugs } from "@/sanity/lib/queries";
import Link from "next/link";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getAllCityPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCityPageBySlug(slug);
  if (!page) return { title: "Page non trouvée" };
  const title = page.seoTitle || page.headline;
  const description = page.seoDescription || page.intro || "";
  const url = `https://www.facenordgraphisme.fr/villes/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// ── Inline block renderer (reused from blog, trimmed to needed styles) ────────

const renderInline = (block: any) => {
  if (!block.children?.length) return null;
  return block.children.map((child: any, i: number) => {
    const marks: string[] = child.marks || [];
    if (!marks.length) return <Fragment key={i}>{child.text}</Fragment>;
    const linkDef = block.markDefs?.find(
      (d: any) => marks.includes(d._key) && d._type === "link"
    );
    if (linkDef) {
      const isExternal = /^https?:\/\//.test(linkDef.href || "");
      return isExternal ? (
        <a
          key={i}
          href={linkDef.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#239ea0] hover:underline font-medium"
        >
          {child.text}
        </a>
      ) : (
        <Link
          key={i}
          href={linkDef.href}
          className="text-[#239ea0] hover:underline font-medium"
        >
          {child.text}
        </Link>
      );
    }
    let el: React.ReactNode = child.text;
    if (marks.includes("strong")) el = <strong key={i}>{el}</strong>;
    if (marks.includes("em")) el = <em key={i}>{el}</em>;
    return <Fragment key={i}>{el}</Fragment>;
  });
};

const renderBlock = (block: any, index: number) => {
  if (block._type === "spokeCard") {
    return (
      <div
        key={index}
        className="border-2 border-[#e8f5f5] rounded-2xl p-6 md:p-8 my-8 bg-white shadow-sm hover:shadow-md transition-shadow"
      >
        {block.badge && (
          <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#239ea0] mb-2">
            {block.badge}
          </div>
        )}
        {block.title && (
          <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{block.title}</h3>
        )}
        {block.description && (
          <p className="text-[#666] text-sm mb-5 leading-relaxed">{block.description}</p>
        )}
        {block.linkUrl && (
          <Link
            href={block.linkUrl}
            className="text-[#239ea0] font-bold text-sm hover:underline inline-flex items-center gap-1"
          >
            {block.linkText || "En savoir plus"} →
          </Link>
        )}
      </div>
    );
  }

  if (block._type === "faq") {
    const { title, items } = block;
    if (!items?.length) return null;
    return (
      <div key={index} className="mb-10">
        {title && (
          <h2 className="text-2xl font-bold mb-6 text-[#1a1a1a]">{title}</h2>
        )}
        <div className="space-y-4">
          {items.map((item: any, i: number) => (
            <details
              key={item._key || i}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm [&_summary::-webkit-details-marker]:hidden open:shadow-md transition-all"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-2 p-5 font-bold text-[#1a1a1a] text-base outline-none group-open:text-[#239ea0] transition-colors">
                {item.question}
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180 text-[#239ea0]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5">
                <p className="text-[#666] leading-relaxed text-base">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (block._type !== "block") return null;
  const plainText = block.children?.map((c: any) => c.text).join("") || "";

  if (block.listItem === "bullet") {
    return (
      <li key={index} className="flex items-start gap-3 text-[#444] text-base leading-relaxed">
        <CheckCircle2 className="size-5 text-[#239ea0] shrink-0 mt-0.5" />
        <span>{renderInline(block)}</span>
      </li>
    );
  }
  if (block.listItem === "number") {
    return (
      <li key={index} className="text-[#444] text-base leading-relaxed pl-2">
        {renderInline(block)}
      </li>
    );
  }

  switch (block.style) {
    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-bold mt-14 mb-6 text-[#1a1a1a] leading-tight"
        >
          {renderInline(block)}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="text-xl font-bold mt-10 mb-4 text-[#1a1a1a]">
          {renderInline(block)}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-[#239ea0] pl-6 my-8 bg-[#f4f7f9] py-6 rounded-r-2xl italic text-[#333] text-lg leading-relaxed"
        >
          {renderInline(block)}
        </blockquote>
      );
    case "capsule":
      return (
        <div
          key={index}
          className="bg-[#f9fafb] border border-[#e5e7eb] rounded-2xl p-6 my-8 italic text-[#555] text-base leading-relaxed"
        >
          {renderInline(block)}
        </div>
      );
    case "normal":
    default:
      if (!plainText.trim()) return <br key={index} />;
      return (
        <p key={index} className="text-[#444] text-lg leading-[1.8] mb-6">
          {renderInline(block)}
        </p>
      );
  }
};

// ── Wrap consecutive bullet/number items in a list element ────────────────────

function renderBlocks(blocks: any[]) {
  const output: React.ReactNode[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];
    if (b._type === "block" && b.listItem) {
      const listType = b.listItem;
      const Tag = listType === "bullet" ? "ul" : "ol";
      const listItems: React.ReactNode[] = [];
      while (i < blocks.length && blocks[i]._type === "block" && blocks[i].listItem === listType) {
        listItems.push(renderBlock(blocks[i], i));
        i++;
      }
      output.push(
        <Tag key={`list-${i}`} className={`mb-8 space-y-2 ${listType === "number" ? "list-decimal ml-6" : ""}`}>
          {listItems}
        </Tag>
      );
    } else {
      output.push(renderBlock(b, i));
      i++;
    }
  }
  return output;
}

// ── Page ──────────────────────────────────────────────────────────────────────

const SERVICES = [
  { icon: "💻", label: "Site vitrine", desc: "Dès 800 € HT" },
  { icon: "🛒", label: "E-commerce", desc: "Boutique & réservation" },
  { icon: "🔍", label: "SEO local", desc: "Visibilité Google Maps" },
  { icon: "🔧", label: "Refonte", desc: "Modernisation & performance" },
];

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getCityPageBySlug(slug);
  if (!page) notFound();

  const faqItems =
    page.body
      ?.filter((b: any) => b._type === "faq")
      .flatMap((b: any) => b.items || []) || [];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Face Nord Graphisme",
    description: page.seoDescription || page.intro,
    url: `https://www.facenordgraphisme.fr/villes/${slug}`,
    telephone: "+33612345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 impasse du Serre",
      addressLocality: "Puy-Sanières",
      postalCode: "05200",
      addressCountry: "FR",
    },
    areaServed: page.city,
    priceRange: "€€",
    serviceType: "Création de site internet",
  };

  const faqSchema =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item: any) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-white text-[#1a1a1a]">

        {/* ── Hero ── */}
        <section className="bg-[#1a1a1a] text-white pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-[#239ea0]/20 text-[#239ea0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin className="size-3.5" />
              {page.city} — Hautes-Alpes (05)
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
              {page.headline}
            </h1>
            {page.intro && (
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
                {page.intro}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors text-base"
              >
                Demander un devis gratuit
                <ArrowRight className="size-5" />
              </Link>
              <a
                href="mailto:contact@facenordgraphisme.fr"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base"
              >
                <Mail className="size-5" />
                contact@facenordgraphisme.fr
              </a>
            </div>
          </div>
        </section>

        {/* ── Stats strip ── */}
        <section className="bg-[#f4f7f9] border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#239ea0]">10+</div>
              <div className="text-sm text-gray-500 mt-1">Années d'expérience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#239ea0]">48 h</div>
              <div className="text-sm text-gray-500 mt-1">Délai de réponse</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#239ea0]">dès 800€</div>
              <div className="text-sm text-gray-500 mt-1">Tarif site vitrine</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#239ea0]">100%</div>
              <div className="text-sm text-gray-500 mt-1">Propriété du code</div>
            </div>
          </div>
        </section>

        {/* ── Services strip ── */}
        <section className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-8 text-center">
            Nos prestations à {page.city}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.label}
                className="bg-[#f9fafb] border border-gray-100 rounded-2xl p-5 text-center hover:border-[#239ea0] hover:shadow-sm transition-all"
              >
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-bold text-[#1a1a1a] text-sm mb-1">{s.label}</div>
                <div className="text-[#239ea0] text-xs font-semibold">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Body content ── */}
        <article className="max-w-3xl mx-auto px-6 pb-16">
          {renderBlocks(page.body || [])}
        </article>

        {/* ── CTA block ── */}
        <section className="bg-[#1a1a1a] text-white py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Votre projet à {page.city} — devis gratuit sous 48 h
            </h2>
            <p className="text-gray-300 text-lg mb-10">
              Décrivez votre projet en quelques lignes : type de site, nombre de pages, délai souhaité.
              Nous vous répondons avec une estimation claire, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
              >
                Démarrer mon projet
                <ArrowRight className="size-5" />
              </Link>
              <Link
                href="/blog/prix-site-internet-artisan-pme-hautes-alpes"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-sm"
              >
                Voir les tarifs détaillés
              </Link>
            </div>
          </div>
        </section>

        {/* ── Back nav ── */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="text-[#239ea0] text-sm font-semibold hover:underline inline-flex items-center gap-1"
          >
            ← Retour à l'accueil
          </Link>
        </div>

      </div>
    </>
  );
}
