import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import BreadcrumbSchema from "./BreadcrumbSchema";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ServiceStat   { value: string; label: string }
export interface ServiceFeature { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; desc: string; stat?: string }
export interface ServiceStep    { num: string; title: string; desc: string }
export interface ServiceRelated { href: string; label: string; badge: string; desc: string }
export interface ServiceExample {
  title: string
  /** Page portfolio */
  href: string
  /** Site en ligne */
  url?: string
  image: string
  desc: string
  points: string[]
}

export interface ServicePageData {
  badge: string
  headline: string
  intro: string
  path: string
  breadcrumbLabel: string
  stats: ServiceStat[]
  /** « C'est pour vous si… » — situations dans lesquelles le visiteur se reconnaît */
  forWho: string[]
  features: ServiceFeature[]
  example?: ServiceExample
  process: ServiceStep[]
  bodyBlocks: { heading?: string; paragraphs: string[] }[]
  pricingFrom: string
  pricingLabel: string
  pricingItems: string[]
  faqs: { q: string; a: string }[]
  related: ServiceRelated[]
  schema: Record<string, unknown>
}

// ── Sub-components ────────────────────────────────────────────────────────────

function BrowserFrame({ src, alt, url, priority = false }: { src: string; alt: string; url?: string; priority?: boolean }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
      <div className="h-8 bg-[#f1f3f5] flex items-center gap-1.5 px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        {url && (
          <span className="ml-3 flex-1 h-5 rounded-full bg-white text-[11px] leading-5 text-gray-500 px-3 truncate">{url}</span>
        )}
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const exampleHost = data.example?.url?.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema) }}
      />
      {data.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "https://www.facenordgraphisme.fr" },
          { name: "Prestations", url: "https://www.facenordgraphisme.fr/prestations" },
          { name: data.breadcrumbLabel, url: `https://www.facenordgraphisme.fr${data.path}` },
        ]}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] text-white pt-28 pb-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#239ea0]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#239ea0]/15 text-[#239ea0] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <MapPin className="size-3.5" />
              {data.badge} — Hautes-Alpes (05)
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-balance">
              {data.headline}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
              {data.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
              >
                Devis gratuit sous 48 h
                <ArrowRight className="size-5" />
              </Link>
              {data.example ? (
                <Link
                  href={data.example.href}
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/15 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
                >
                  Voir un exemple
                </Link>
              ) : (
                <a
                  href="#tarif"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/15 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
                >
                  Voir le tarif
                </a>
              )}
            </div>
          </div>

          <div className="hidden md:block relative">
            {data.example ? (
              <BrowserFrame src={data.example.image} alt={`Réalisation ${data.example.title} — ${data.breadcrumbLabel}`} url={exampleHost} priority />
            ) : (
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-6">Inclus chaque mois</div>
                <ul className="space-y-4">
                  {data.pricingItems.slice(0, 5).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/90">
                      <span className="mt-0.5 shrink-0 flex items-center justify-center size-6 rounded-full bg-[#239ea0] text-white">
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="absolute -bottom-5 left-6 bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
              <div className="text-[#239ea0] font-black text-xl">{data.pricingFrom}</div>
              <div className="text-white/60 text-xs mt-0.5">{data.pricingLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key facts ─────────────────────────────────────────────────────── */}
      <section className="bg-[#f4f7f9] dark:bg-[#111111] border-b border-gray-100 dark:border-white/10 transition-colors">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {data.stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-black text-[#239ea0]">{s.value}</div>
              <div className="text-xs md:text-sm text-gray-500 dark:text-[#a1a1aa] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── For who ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] dark:text-white mb-10">
            C&apos;est pour vous si…
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {data.forWho.map((item) => (
              <li key={item} className="flex items-start gap-3 p-5 rounded-2xl bg-[#f0fafa] dark:bg-[#239ea0]/10 border border-[#239ea0]/15 text-[#1a1a1a] dark:text-white">
                <CheckCircle2 className="size-5 text-[#239ea0] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] dark:text-white mb-12">
            Ce que vous obtenez
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex gap-5 p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-2xl hover:border-[#239ea0]/30 hover:shadow-md dark:hover:shadow-none transition-all group"
                >
                  <div className="shrink-0 h-fit bg-[#f0fafa] dark:bg-[#111111] border border-[#239ea0]/20 rounded-xl p-3 group-hover:border-[#239ea0]/40 transition-colors">
                    <Icon className="size-6 text-[#239ea0]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-bold text-[#1a1a1a] dark:text-white mb-1">{f.title}</div>
                    <p className="text-[#666] dark:text-[#a1a1aa] text-sm leading-relaxed">{f.desc}</p>
                    {f.stat && (
                      <div className="mt-2 text-xs font-bold text-[#239ea0] bg-[#e8f5f5] dark:bg-[#239ea0]/10 px-2 py-1 rounded-full inline-block">
                        {f.stat}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Example ───────────────────────────────────────────────────────── */}
      {data.example && (
        <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <BrowserFrame src={data.example.image} alt={`Aperçu du site ${data.example.title}`} url={exampleHost} />
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#239ea0] mb-3">Exemple concret</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] dark:text-white mb-4">{data.example.title}</h2>
              <p className="text-[#666] dark:text-[#a1a1aa] text-lg leading-relaxed mb-6">{data.example.desc}</p>
              <ul className="space-y-3 mb-8">
                {data.example.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[#444] dark:text-[#a1a1aa]">
                    <Check className="size-5 text-[#239ea0] shrink-0 mt-0.5" strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={data.example.href}
                  className="inline-flex items-center gap-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] font-bold px-6 py-3 rounded-xl hover:bg-[#239ea0] dark:hover:bg-[#239ea0] dark:hover:text-white transition-colors"
                >
                  Voir l&apos;étude de cas <ArrowRight className="size-4" />
                </Link>
                {data.example.url && (
                  <a
                    href={data.example.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 border-2 border-gray-200 dark:border-white/15 text-[#1a1a1a] dark:text-white font-semibold px-6 py-3 rounded-xl hover:border-[#239ea0] transition-colors"
                  >
                    Visiter le site <ExternalLink className="size-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Process ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] dark:text-white mb-12">
            Comment ça se passe ?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-[2.25rem] left-[12.5%] right-[12.5%] h-px bg-[#239ea0]/20" />
            {data.process.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="inline-flex items-center justify-center bg-white dark:bg-[#1a1a1a] border-2 border-[#239ea0] rounded-full text-[#239ea0] font-black text-lg mb-4 shadow-sm dark:shadow-none mx-auto w-[4.5rem] h-[4.5rem]">
                  {step.num}
                </div>
                <div className="font-bold text-[#1a1a1a] dark:text-white mb-2">{step.title}</div>
                <p className="text-[#666] dark:text-[#a1a1aa] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body content ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-3xl mx-auto">
          {data.bodyBlocks.map((block, i) => (
            <div key={i} className="mb-10">
              {block.heading && (
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-5">{block.heading}</h2>
              )}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="text-[#444] dark:text-[#a1a1aa] text-lg leading-[1.8] mb-5">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section id="tarif" className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors scroll-mt-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] dark:shadow-none overflow-hidden border border-gray-100 dark:border-white/10">
            <div className="bg-[#1a1a1a] dark:bg-[#0d0d0d] px-8 py-6 flex items-end justify-between">
              <div>
                <div className="text-white/60 text-xs uppercase tracking-widest mb-1">Tarif indicatif</div>
                <div className="text-white font-black text-4xl">{data.pricingFrom}</div>
              </div>
              <div className="text-right">
                <div className="text-[#239ea0] font-semibold text-sm">{data.pricingLabel}</div>
                <div className="text-white/40 text-xs mt-0.5">Devis gratuit sous 48 h</div>
              </div>
            </div>
            <div className="px-8 py-6">
              <ul className="space-y-3 mb-8">
                {data.pricingItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#444] dark:text-[#a1a1aa] text-sm">
                    <CheckCircle2 className="size-4 text-[#239ea0] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-[#239ea0] hover:bg-[#1d8486] text-white font-bold px-8 py-4 rounded-2xl transition-colors"
              >
                Obtenir mon devis personnalisé →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-8">Questions fréquentes</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-[#f9fafb] dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-white/10 [&_summary::-webkit-details-marker]:hidden open:shadow-md dark:open:shadow-none transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-2 p-5 font-bold text-[#1a1a1a] dark:text-white text-sm md:text-base outline-none group-open:text-[#239ea0] transition-colors">
                  {faq.q}
                  <svg className="size-5 shrink-0 transition duration-300 group-open:-rotate-180 text-[#239ea0]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 pb-5">
                  <p className="text-[#666] dark:text-[#a1a1aa] leading-relaxed text-sm md:text-base">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ───────────────────────────────────────────────────────── */}
      {data.related.length > 0 && (
        <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-8">Pour aller plus loin</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {data.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block bg-white dark:bg-[#1a1a1a] border-2 border-[#e8f5f5] dark:border-white/10 rounded-2xl p-6 hover:border-[#239ea0] hover:shadow-md dark:hover:shadow-none transition-all group"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#239ea0] mb-2">
                    {r.badge}
                  </div>
                  <div className="font-bold text-[#1a1a1a] dark:text-white text-sm group-hover:text-[#239ea0] transition-colors leading-snug mb-2">
                    {r.label}
                  </div>
                  <p className="text-[#888] dark:text-[#888] text-xs leading-relaxed">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] text-white py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Décrivez votre projet en quelques lignes. Devis gratuit, réponse sous 48 h, sans engagement.
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
              href="/prestations"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-sm"
            >
              Voir toutes les prestations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
