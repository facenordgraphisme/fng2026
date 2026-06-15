import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import type { ComponentType } from "react";
import BreadcrumbSchema from "./BreadcrumbSchema";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ServiceStat   { value: string; label: string }
export interface ServiceFeature { icon: ComponentType<{ className?: string; strokeWidth?: number }>; title: string; desc: string; stat?: string }
export interface ServiceStep    { num: string; title: string; desc: string }
export interface ServiceRelated { href: string; label: string; badge: string; desc: string }

export interface ServicePageData {
  badge: string
  headline: string
  intro: string
  path: string
  breadcrumbLabel: string
  heroPhotoId: string
  heroPhotoAlt: string
  stats: ServiceStat[]
  features: ServiceFeature[]
  process: ServiceStep[]
  bodyBlocks: { heading?: string; paragraphs: string[] }[]
  pricingFrom: string
  pricingLabel: string
  pricingItems: string[]
  faqs: { q: string; a: string }[]
  related: ServiceRelated[]
  schema: Record<string, unknown>
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ServicePageLayout({ data }: { data: ServicePageData }) {
  const heroUrl = `https://images.unsplash.com/${data.heroPhotoId}?fm=jpg&q=80&w=900&h=600&fit=crop`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data.schema) }}
      />
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
            <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6">
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
              <Link
                href="/blog/prix-site-internet-artisan-pme-hautes-alpes"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/15 hover:border-white/40 text-white/80 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all text-sm"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
              <Image
                src={heroUrl}
                alt={data.heroPhotoAlt}
                fill
                sizes="(max-width: 1200px) 50vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
                <div className="text-[#239ea0] font-black text-xl">{data.pricingFrom}</div>
                <div className="text-white/60 text-xs mt-0.5">{data.pricingLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────────── */}
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

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a1a] dark:text-white mb-12">
            Ce qui est inclus
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="flex gap-5 p-6 bg-[#f9fafb] dark:bg-[#111111] border border-gray-100 dark:border-white/10 rounded-2xl hover:border-[#239ea0]/30 hover:shadow-md dark:hover:shadow-none transition-all group"
                >
                  <div className="shrink-0 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/10 rounded-xl p-3 shadow-sm dark:shadow-none group-hover:border-[#239ea0]/30 transition-colors">
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
      <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
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

      {/* ── Related articles ──────────────────────────────────────────────── */}
      {data.related.length > 0 && (
        <section className="py-20 px-6 bg-white dark:bg-[#1a1a1a] transition-colors">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-8">Pour aller plus loin</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {data.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block border-2 border-[#e8f5f5] dark:border-white/10 rounded-2xl p-6 hover:border-[#239ea0] hover:shadow-md dark:hover:shadow-none transition-all group"
                >
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#239ea0] mb-2">
                    {r.badge}
                  </div>
                  <div className="font-bold text-[#1a1a1a] dark:text-white text-sm group-hover:text-[#239ea0] transition-colors leading-snug mb-2">
                    {r.label}
                  </div>
                  <p className="text-[#888] dark:text-[#666] text-xs leading-relaxed">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f4f7f9] dark:bg-[#111111] transition-colors">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-white mb-8">Questions fréquentes</h2>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none [&_summary::-webkit-details-marker]:hidden open:shadow-md dark:open:shadow-none transition-all"
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
