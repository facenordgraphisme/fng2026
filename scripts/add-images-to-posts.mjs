/**
 * add-images-to-posts.mjs
 *
 * Adds images and SVG infographics to Posts 6, 7, 8 and 9.
 *
 * For each post:
 *   • 1 Unsplash photo   — inserted before key-takeaways H3
 *   • 1 SVG infographic  — inserted before "Pour aller plus loin" / FAQ
 *
 * SVG diagrams (created inline, uploaded to Sanity CDN):
 *   SVG-A (Post 6) : "5 signaux d'alerte pour une refonte"
 *   SVG-B (Post 8) : "Canaux de recherche en France 2026"
 *   SVG-C (Post 9) : "Grille tarifaire Face Nord Graphisme"
 *
 * Run: node scripts/add-images-to-posts.mjs
 */

import { createClient } from '@sanity/client';
import crypto from 'crypto';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const uid = () => crypto.randomBytes(6).toString('hex');

// ── Helpers ───────────────────────────────────────────────────────────────────

function unsplashBlock(photoId, alt, caption) {
  return {
    _type: 'image',
    _key: uid(),
    externalUrl: `https://images.unsplash.com/${photoId}?fm=jpg&q=80&w=1200&h=630&fit=crop`,
    alt,
    caption,
  };
}

function sanityImageBlock(assetRef, alt, caption) {
  return {
    _type: 'image',
    _key: uid(),
    asset: { _type: 'reference', _ref: assetRef },
    alt,
    caption,
  };
}

// ── SVG content ───────────────────────────────────────────────────────────────

const SVG_A = /* Post 6 – 5 signaux d'alerte */ `
<svg width="560" height="306" viewBox="0 0 560 306" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,-apple-system,Segoe UI,sans-serif">
  <rect width="560" height="306" rx="16" fill="#1a1a1a"/>
  <text x="280" y="36" text-anchor="middle" font-size="14.5" font-weight="700" fill="#ffffff" letter-spacing="-0.3">5 signaux d'alerte pour une refonte de site</text>

  <rect x="20" y="52" width="520" height="40" rx="6" fill="#232323"/>
  <rect x="20" y="52" width="4" height="40" rx="2" fill="#239ea0"/>
  <text x="36" y="68" font-size="11" font-weight="700" fill="#239ea0">01</text>
  <text x="60" y="76" font-size="12" fill="#e0e0e0">Vitesse mobile &gt; 3 s — PageSpeed &lt; 50/100</text>

  <rect x="20" y="100" width="520" height="40" rx="6" fill="#232323"/>
  <rect x="20" y="100" width="4" height="40" rx="2" fill="#239ea0"/>
  <text x="36" y="116" font-size="11" font-weight="700" fill="#239ea0">02</text>
  <text x="60" y="124" font-size="12" fill="#e0e0e0">Affichage mobile inconfortable — pas vraiment responsive</text>

  <rect x="20" y="148" width="520" height="40" rx="6" fill="#232323"/>
  <rect x="20" y="148" width="4" height="40" rx="2" fill="#239ea0"/>
  <text x="36" y="164" font-size="11" font-weight="700" fill="#239ea0">03</text>
  <text x="60" y="172" font-size="12" fill="#e0e0e0">Identité visuelle dépassée — design d'avant 2020</text>

  <rect x="20" y="196" width="520" height="40" rx="6" fill="#232323"/>
  <rect x="20" y="196" width="4" height="40" rx="2" fill="#239ea0"/>
  <text x="36" y="212" font-size="11" font-weight="700" fill="#239ea0">04</text>
  <text x="60" y="220" font-size="12" fill="#e0e0e0">Signaux techniques : HTTP, plugins obsolètes, erreurs 404</text>

  <rect x="20" y="244" width="520" height="40" rx="6" fill="#232323"/>
  <rect x="20" y="244" width="4" height="40" rx="2" fill="#ef4444"/>
  <text x="36" y="260" font-size="11" font-weight="700" fill="#ef4444">05</text>
  <text x="60" y="268" font-size="12" fill="#e0e0e0">Taux de rebond &gt; 70 % — formulaires de contact silencieux</text>

  <text x="280" y="297" text-anchor="middle" font-size="10" fill="#555" letter-spacing="0.4">2 signaux ou + = refonte à planifier — facenordgraphisme.fr</text>
</svg>`.trim();

const SVG_B = /* Post 8 – Canaux de recherche */ `
<svg width="560" height="262" viewBox="0 0 560 262" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,-apple-system,Segoe UI,sans-serif">
  <rect width="560" height="262" rx="16" fill="#f4f7f9"/>
  <text x="280" y="34" text-anchor="middle" font-size="14.5" font-weight="700" fill="#1a1a1a" letter-spacing="-0.3">Canaux de recherche en France — 2026</text>

  <text x="24" y="68" font-size="12" font-weight="600" fill="#1a1a1a">Google Search</text>
  <text x="536" y="68" text-anchor="end" font-size="13" font-weight="800" fill="#239ea0">92,5 %</text>
  <rect x="24" y="76" width="512" height="30" rx="6" fill="#d0eded"/>
  <rect x="24" y="76" width="473" height="30" rx="6" fill="#239ea0"/>
  <text x="36" y="96" font-size="11" font-weight="600" fill="white">Moteur dominant — canal SEO local #1</text>

  <text x="24" y="128" font-size="12" font-weight="600" fill="#1a1a1a">ChatGPT / Perplexity</text>
  <text x="536" y="128" text-anchor="end" font-size="13" font-weight="800" fill="#6366f1">+300 %/an</text>
  <rect x="24" y="136" width="512" height="30" rx="6" fill="#ede9fe"/>
  <rect x="24" y="136" width="154" height="30" rx="6" fill="#6366f1"/>
  <text x="36" y="156" font-size="11" font-weight="600" fill="white">~5 % — croissance exponentielle</text>

  <text x="24" y="188" font-size="12" font-weight="600" fill="#1a1a1a">Google AI Overviews</text>
  <text x="536" y="188" text-anchor="end" font-size="13" font-weight="800" fill="#f59e0b">40 % des requêtes</text>
  <rect x="24" y="196" width="512" height="30" rx="6" fill="#fef3c7"/>
  <rect x="24" y="196" width="205" height="30" rx="6" fill="#f59e0b"/>
  <text x="36" y="216" font-size="11" font-weight="600" fill="white">Requêtes complexes en France</text>

  <text x="280" y="252" text-anchor="middle" font-size="10" fill="#888" letter-spacing="0.4">Le SEO solide reste le socle — les IA l'utilisent pour construire leurs réponses</text>
</svg>`.trim();

const SVG_C = /* Post 9 – Grille tarifaire */ `
<svg width="560" height="222" viewBox="0 0 560 222" xmlns="http://www.w3.org/2000/svg" font-family="system-ui,-apple-system,Segoe UI,sans-serif">
  <rect width="560" height="222" rx="16" fill="#1a1a1a"/>
  <text x="280" y="32" text-anchor="middle" font-size="14.5" font-weight="700" fill="#ffffff" letter-spacing="-0.3">Grille tarifaire — Face Nord Graphisme 2026</text>

  <rect x="20" y="46" width="520" height="50" rx="8" fill="#232323"/>
  <text x="36" y="66" font-size="12" font-weight="700" fill="#239ea0">Landing page / One-page</text>
  <text x="36" y="84" font-size="10.5" fill="#999">Design sur-mesure · SEO de base · Responsive · Livraison 5-10 j</text>
  <rect x="410" y="52" width="116" height="34" rx="7" fill="#239ea0"/>
  <text x="468" y="73" text-anchor="middle" font-size="14" font-weight="800" fill="white">dès 800 €</text>

  <rect x="20" y="104" width="520" height="50" rx="8" fill="#232323"/>
  <text x="36" y="124" font-size="12" font-weight="700" fill="#239ea0">Site vitrine complet + blog</text>
  <text x="36" y="142" font-size="10.5" fill="#999">5-10 pages · CMS autonome · SEO avancé · Schema.org</text>
  <rect x="398" y="110" width="128" height="34" rx="7" fill="#1b7a7c"/>
  <text x="462" y="131" text-anchor="middle" font-size="13" font-weight="800" fill="white">1 200-2 500 €</text>

  <rect x="20" y="162" width="520" height="50" rx="8" fill="#232323"/>
  <text x="36" y="182" font-size="12" font-weight="700" fill="#239ea0">Réservation en ligne / E-commerce</text>
  <text x="36" y="200" font-size="10.5" fill="#999">Paiement · Rappels auto · Sécurité RGPD · 4-8 semaines</text>
  <rect x="398" y="168" width="128" height="34" rx="7" fill="#145d5f"/>
  <text x="462" y="189" text-anchor="middle" font-size="13" font-weight="800" fill="white">2 500-5 000 €</text>
</svg>`.trim();

// ── Upload SVGs ───────────────────────────────────────────────────────────────

async function uploadSvg(svgString, filename) {
  const buf = Buffer.from(svgString, 'utf-8');
  console.log(`  Uploading ${filename} (${buf.length} bytes)…`);
  const asset = await client.assets.upload('image', buf, {
    filename,
    contentType: 'image/svg+xml',
  });
  console.log(`  ✓ ${asset._id}  →  ${asset.url}`);
  return asset;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function run() {

  // ── 1. Upload SVGs ──────────────────────────────────────────────────────
  console.log('\n[1/2] Uploading SVG infographics to Sanity…');
  const [svgA, svgB, svgC] = await Promise.all([
    uploadSvg(SVG_A, 'infographic-5-signaux-refonte.svg'),
    uploadSvg(SVG_B, 'infographic-canaux-recherche-2026.svg'),
    uploadSvg(SVG_C, 'infographic-tarifs-face-nord-2026.svg'),
  ]);

  // ── 2. Build image blocks ───────────────────────────────────────────────
  console.log('\n[2/2] Patching posts with image blocks…');

  const tx = client.transaction();

  // POST 6 — Refonte site internet
  // · before h3 key c6575c92fddb : Unsplash photo (web design workspace)
  // · before pal key 1ce76f569f88 : SVG-A (5 signaux)
  tx.patch('29d6e806-20e8-4f86-91fa-f41498aa4d59', p => p.insert('before', 'body[_key=="c6575c92fddb"]', [
    unsplashBlock(
      'photo-1467232004584-a241de8bcf5d',
      'Personne esquissant l\'architecture d\'un site web sur un tableau blanc lors d\'un atelier de conception',
      'La conception d\'un site web commence par un audit de l\'existant avant de (re)définir l\'architecture et les parcours utilisateurs.'
    ),
  ]));
  tx.patch('29d6e806-20e8-4f86-91fa-f41498aa4d59', p => p.insert('before', 'body[_key=="1ce76f569f88"]', [
    sanityImageBlock(svgA._id, '5 signaux d\'alerte pour une refonte de site internet : vitesse, mobile, identité visuelle, technique, conversion', '5 signaux à surveiller — 2 cumulés = refonte à planifier. Face Nord Graphisme, Hautes-Alpes.'),
  ]));

  // POST 7 — Visibilité en ligne
  // · before h3 key b559bd2c17db : Unsplash photo (analytics)
  // · before faq key 6bfbd8f3e7a1 : Unsplash photo (small business)
  tx.patch('029aba02-674a-42e9-90a3-7710e43cbfbb', p => p.insert('before', 'body[_key=="b559bd2c17db"]', [
    unsplashBlock(
      'photo-1460925895917-afdab827c52f',
      'Écran d\'ordinateur portable affichant un tableau de bord d\'analytics avec courbes de trafic et statistiques de visibilité en ligne',
      'Google Search Console et Google Business Profile : les deux outils gratuits indispensables pour mesurer votre visibilité locale dans les Hautes-Alpes.'
    ),
  ]));
  tx.patch('029aba02-674a-42e9-90a3-7710e43cbfbb', p => p.insert('before', 'body[_key=="6bfbd8f3e7a1"]', [
    unsplashBlock(
      'photo-1556742049-0cfed4f6a45d',
      'Commerce de proximité avec enseigne lumineuse, illustrant l\'importance d\'une présence en ligne pour les artisans et commerçants locaux',
      'En 2026, 93 % des recherches locales sur Google aboutissent sur la fiche GBP ou le site web du commerce — pas sur les réseaux sociaux.'
    ),
  ]));

  // POST 8 — SEO vs IA
  // · before h3 key c23b653deaab : Unsplash photo (AI concept)
  // · before pal key cc4b17bf0c5c : SVG-B (canaux de recherche)
  tx.patch('747729fc-0bdc-440d-a170-c790443d1df7', p => p.insert('before', 'body[_key=="c23b653deaab"]', [
    unsplashBlock(
      'photo-1677442135703-1787eea5ce01',
      'Visualisation conceptuelle d\'un réseau de neurones artificiel représentant l\'intelligence artificielle générative',
      'Les IA génératives (ChatGPT, Gemini, Perplexity) créent une nouvelle surface de recherche qui complète Google sans le remplacer.'
    ),
  ]));
  tx.patch('747729fc-0bdc-440d-a170-c790443d1df7', p => p.insert('before', 'body[_key=="cc4b17bf0c5c"]', [
    sanityImageBlock(svgB._id, 'Graphique des canaux de recherche en France 2026 : Google 92,5%, ChatGPT/Perplexity 5%, Google AI Overviews 40% des requêtes', 'Répartition des surfaces de recherche en France en 2026. Source : StatCounter, Perplexity Analytics, Google.'),
  ]));

  // POST 9 — Prix site internet
  // · before h3 key 16d419bbb22e : Unsplash photo (developer workspace)
  // · before pal key 3e70fb2d9398 : SVG-C (tarifs)
  tx.patch('post-prix-site-internet-hautes-alpes', p => p.insert('before', 'body[_key=="16d419bbb22e"]', [
    unsplashBlock(
      'photo-1498050108023-c5249f4df085',
      'Développeur web travaillant sur un ordinateur portable avec du code à l\'écran et un carnet de notes pour la planification du projet',
      'Chaque projet web chez Face Nord Graphisme commence par un cadrage précis : périmètre, délai et budget définis ensemble avant de démarrer.'
    ),
  ]));
  tx.patch('post-prix-site-internet-hautes-alpes', p => p.insert('before', 'body[_key=="3e70fb2d9398"]', [
    sanityImageBlock(svgC._id, 'Grille tarifaire Face Nord Graphisme 2026 : landing page dès 800€, site vitrine 1200-2500€, e-commerce 2500-5000€', 'Tarifs indicatifs HT — devis gratuit sous 48 h. Tous les sites incluent design sur-mesure, SEO on-page et score PageSpeed > 85/100.'),
  ]));

  // ── Commit ────────────────────────────────────────────────────────────────
  console.log('\n⏳ Committing…');
  const result = await tx.commit();
  console.log(`✅ Done — ${result.results?.length ?? '?'} documents patched`);
  console.log('\nVerify images on:');
  console.log('  /blog/refonte-site-internet-5-signes');
  console.log('  /blog/visibilite-en-ligne-artisans-commerces-hautes-alpes');
  console.log('  /blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026');
  console.log('  /blog/prix-site-internet-artisan-pme-hautes-alpes');
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
