// Source de vérité locale pour les images du portfolio.
// Ces chemins pointent vers public/assets/portfolio/*.(png|webp)
// Utilisé en fallback si Sanity n'a pas encore d'image uploadée.

export const PORTFOLIO_IMAGES: Record<string, { main: string; gallery: string[] }> = {
  'la-montagne-guide': {
    main: '/assets/portfolio/lamontagneguide-home.webp',
    gallery: [
      '/assets/portfolio/lamontagneguide-alpinisme.webp',
      '/assets/portfolio/lamontagneguide-sorties.webp',
      '/assets/portfolio/lamontagneguide-guide.webp',
    ],
  },
  'evasionski': {
    main: '/assets/portfolio/evasionski-home.webp',
    gallery: [
      '/assets/portfolio/evasionski-stages-raids.webp',
      '/assets/portfolio/evasionski-niveau.webp',
    ],
  },
  'voyageurs-des-alpes': {
    main: '/assets/portfolio/voyageursdesalpes-home.webp',
    gallery: [
      '/assets/portfolio/voyageursdesalpes-sejours.webp',
      '/assets/portfolio/voyageursdesalpes-sejour.webp',
      '/assets/portfolio/voyageursdesalpes-apropos.webp',
    ],
  },
  'outplanners': {
    main: '/assets/portfolio/outplanners-home.webp',
    gallery: [
      '/assets/portfolio/outplanners-fonctionnalites.webp',
      '/assets/portfolio/outplanners-metiers.webp',
      '/assets/portfolio/outplanners-tarifs.webp',
    ],
  },
  'gaudineto': {
    main: '/assets/portfolio/gaudineto-home.png',
    gallery: [
      '/assets/portfolio/gaudineto-apropos-menu.png',
      '/assets/portfolio/gaudineto-interieur.png',
      '/assets/portfolio/gaudineto-reservation.png',
    ],
  },
  'gaec-des-valentins': {
    main: '/assets/portfolio/gaecdesvalentins-home.png',
    gallery: [
      '/assets/portfolio/gaecdesvalentins-home-2.png',
      '/assets/portfolio/gaecdesvalentins-colis.png',
      '/assets/portfolio/gaecdesvalentins-activites.png',
    ],
  },
  'linstant-verdon': {
    main: '/assets/portfolio/linstantverdon-home.png',
    gallery: [
      '/assets/portfolio/linstantverdon-activites.png',
      '/assets/portfolio/linstantverdon-equipe.png',
      '/assets/portfolio/linstantverdon-apropos.png',
    ],
  },
  'reves-daventures': {
    main: '/assets/portfolio/revesdaventures-home.png',
    gallery: [
      '/assets/portfolio/revesdaventures-calendrier.png',
      '/assets/portfolio/revesdaventures-activites.png',
    ],
  },
  'verdon-ebike': {
    main: '/assets/portfolio/verdonebike-home.png',
    gallery: [
      '/assets/portfolio/verdonebike-locations.png',
      '/assets/portfolio/verdonebike-velos.png',
      '/assets/portfolio/verdonebike-equipe.png',
    ],
  },
  'act-event-pro': {
    main: '/assets/portfolio/acteventpro-home.png',
    gallery: [
      '/assets/portfolio/acteventpro-prestations.png',
      '/assets/portfolio/acteventpro-apropos.png',
      '/assets/portfolio/acteventpro-passion.png',
    ],
  },
};

/** Normalise un projet brut Sanity en ajoutant mainImage et gallery résolus */
export function normalizeProject(raw: any): any {
  const slug = raw?.slug?.current as string | undefined;
  const local = slug ? PORTFOLIO_IMAGES[slug] : undefined;

  const mainImageUrl: string | undefined =
    raw.mainImageSanity ||   // asset Sanity uploadé
    raw.imageUrl ||          // URL string stockée dans Sanity
    local?.main;             // fallback image locale (public/)

  const galleryFromSanity: { url: string }[] = (raw.gallerySanity || []).filter((g: any) => g?.url);
  const galleryFromUrls: { url: string }[] = (raw.galleryUrls || []).map((u: string) => ({ url: u }));
  const galleryFromLocal: { url: string }[] = (local?.gallery || []).map((u) => ({ url: u }));

  const gallery =
    galleryFromSanity.length > 0 ? galleryFromSanity :
    galleryFromUrls.length > 0  ? galleryFromUrls :
    galleryFromLocal;

  return {
    ...raw,
    mainImage: { url: mainImageUrl },
    gallery,
  };
}
