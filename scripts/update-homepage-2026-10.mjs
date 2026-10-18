/**
 * update-homepage-2026-10.mjs
 *
 * Nouvelle accroche de la page d'accueil (hero, section « ce que je fais »,
 * intro des prestations, SEO). Sauvegarde le document actuel dans
 * scripts/backups/ avant de le modifier.
 *
 * Run: node --env-file=.env.local scripts/update-homepage-2026-10.mjs
 */

import { createClient } from '@sanity/client';
import { mkdirSync, writeFileSync } from 'fs';
import crypto from 'crypto';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => crypto.randomBytes(6).toString('hex');

const current = await client.getDocument('homepage');
mkdirSync(new URL('./backups/', import.meta.url), { recursive: true });
const backup = new URL(`./backups/homepage-${Date.now()}.json`, import.meta.url);
writeFileSync(backup, JSON.stringify(current, null, 2));
console.log(`Backup → ${backup.pathname}`);

await client.patch('homepage').set({
  heroEyebrow: 'Développeur web freelance · Embrun (05)',
  heroHeadline: 'Création de sites internet *dans les Hautes-Alpes*',
  heroSubtext: "Je suis François-Xavier, développeur web à Embrun. Je crée des sites vitrines, des boutiques en ligne et des applications web pour les artisans, commerçants et pros du tourisme du 05 — rapides, faciles à gérer et visibles sur Google comme sur les IA.",
  heroPrimaryCtaLabel: 'Demander un devis gratuit',
  heroSecondaryCtaLabel: 'Voir mes réalisations',
  heroTrustItems: ['Basé à Embrun, interlocuteur unique', 'Noté 5/5 sur Google', 'Devis gratuit sous 48 h'],
  aboutHeading: 'Un site qui vous amène des clients, pas juste une vitrine',
  aboutParagraph1: "Artisan, commerçant, guide, hébergeur ou association dans les Hautes-Alpes ? Je m'occupe de votre site de A à Z : design, textes, référencement, mise en ligne et suivi.",
  aboutParagraph2: "Montagnard et passionné de web, je connais les réalités du territoire — saisonnalité, clientèle touristique, dépendance aux plateformes. Votre site est pensé pour ça.",
  aboutPoints: [
    { _key: key(), title: 'Un seul interlocuteur, ici dans le 05', desc: 'Vous parlez directement à la personne qui crée votre site. Rendez-vous possible à Embrun, Gap ou Briançon.' },
    { _key: key(), title: 'Trouvé sur Google… et par les IA', desc: 'Chaque site est optimisé pour le référencement local et structuré pour être cité par ChatGPT, Gemini ou Perplexity.' },
    { _key: key(), title: 'Rapide et parfait sur mobile', desc: "La majorité de vos visiteurs arrivent depuis un téléphone : tout est conçu d'abord pour eux." },
    { _key: key(), title: 'Vous restez autonome', desc: 'Vous modifiez vos textes, photos et produits vous-même — et je reste disponible si besoin.' },
  ],
  aboutCtaLabel: 'Qui suis-je ?',
  servicesHeading: 'Que puis-je faire pour vous ?',
  servicesParagraph: "Partez de votre situation : chaque prestation répond à un besoin concret. Pas sûr de ce qu'il vous faut ? Je vous conseille gratuitement.",
  seoTitle: 'Face Nord Graphisme | Création de site internet Hautes-Alpes',
  seoDescription: 'Développeur web à Embrun : sites vitrines, e-commerce, refonte, référencement Google & IA et applications web pour les entreprises des Hautes-Alpes. Devis gratuit sous 48 h.',
}).commit();

console.log('✓ homepage mise à jour');
