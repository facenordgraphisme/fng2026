import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import type { ServiceCard as ServiceCardData } from "@/lib/services";

/**
 * Carte prestation : la situation du client → ce que je fais → ce qu'il obtient.
 * `showExample` affiche en tête la capture d'une vraie réalisation.
 */
export default function ServiceCard({
  service,
  showExample = false,
  headingLevel = "h3",
}: {
  service: ServiceCardData;
  showExample?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Icon = service.icon;
  const Heading = headingLevel;

  return (
    <Link
      href={service.href}
      className="group h-full flex flex-col bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)] hover:border-[#239ea0]/40 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 overflow-hidden"
    >
      {showExample && service.example && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-[#111111] border-b border-gray-100 dark:border-white/10">
          <Image
            src={service.example.image}
            alt={`Exemple de réalisation : ${service.example.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
          <span className="absolute bottom-3 left-3 text-[11px] font-bold text-white bg-black/65 backdrop-blur-sm px-3 py-1 rounded-full">
            Exemple : {service.example.title}
          </span>
        </div>
      )}
      {showExample && !service.example && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#1d8f91] to-[#0f3f41] border-b border-gray-100 dark:border-white/10 flex items-center justify-center">
          <Icon className="size-20 text-white/25 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.25} />
        </div>
      )}

      <div className="p-7 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3 mb-5">
          <div className="bg-[#f0fafa] dark:bg-[#239ea0]/10 border border-[#239ea0]/20 rounded-xl p-3 group-hover:scale-105 transition-transform">
            <Icon className="size-6 text-[#239ea0]" strokeWidth={1.75} />
          </div>
          {service.tech && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#239ea0] bg-[#e8f5f5] dark:bg-[#239ea0]/10 px-3 py-1 rounded-full text-right">
              {service.tech}
            </span>
          )}
        </div>

        <Heading className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-3 leading-snug group-hover:text-[#239ea0] transition-colors">
          {service.title}
        </Heading>
        <p className="text-[#1a1a1a] dark:text-white/90 text-[15px] font-semibold leading-snug mb-2">
          {service.problem}
        </p>
        <p className="text-[#666] dark:text-[#a1a1aa] text-sm leading-relaxed mb-5">{service.promise}</p>

        <ul className="space-y-2 mb-6">
          {service.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2 text-[#444] dark:text-[#a1a1aa] text-sm">
              <Check className="size-4 text-[#239ea0] shrink-0 mt-0.5" strokeWidth={2.5} />
              {o}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between gap-4">
          <span className="text-[#239ea0] font-black">{service.pricingFrom}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1a1a1a] dark:text-white group-hover:text-[#239ea0] transition-colors">
            Découvrir
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
