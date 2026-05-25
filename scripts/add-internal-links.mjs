/**
 * add-internal-links.mjs
 *
 * Appends a "Pour aller plus loin" CTA block to 5 key blog posts,
 * linking each post to the most relevant service page(s).
 *
 * Run: node scripts/add-internal-links.mjs
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import { createClient } from '@sanity/client';
import crypto from 'crypto';

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const uid = () => crypto.randomBytes(6).toString('hex');

// ── Block helpers ─────────────────────────────────────────────────────────────

function block(text, style = 'normal') {
  return {
    _type: 'block', _key: uid(), style,
    children: [{ _type: 'span', _key: uid(), text }],
    markDefs: [],
  };
}

function linkBlock(label, href, desc) {
  const linkKey = uid();
  return {
    _type: 'block', _key: uid(), style: 'normal',
    markDefs: [{ _type: 'link', _key: linkKey, href }],
    children: [
      {
        _type: 'span', _key: uid(),
        text: `→ ${label}`,
        marks: [linkKey],
      },
      { _type: 'span', _key: uid(), text: ` — ${desc}`, marks: [] },
    ],
  };
}

// Heading block used as a visual separator before CTA links
function ctaHeading(text) {
  return block(text, 'h2');
}

// ── Mapping: post slug → blocks to append ────────────────────────────────────

const postLinks = [
  {
    slug: 'seo-local-hautes-alpes-artisans-pme',
    label: 'SEO local Hautes-Alpes',
    blocks: [
      ctaHeading('Besoin d\'un accompagnement SEO dans les Hautes-Alpes ?'),
      block('Face Nord Graphisme propose un audit SEO complet, une optimisation Google Business Profile et une stratégie de contenu adaptée à la saisonnalité du 05.'),
      linkBlock(
        'Référencement SEO Hautes-Alpes',
        'https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes',
        'Audit SEO, GBP, stratégie de contenu locale — devis gratuit sous 48 h'
      ),
      linkBlock(
        'Référencement IA — GEO',
        'https://www.facenordgraphisme.fr/referencement-ia',
        'Être cité par ChatGPT, Perplexity et les AI Overviews de Google'
      ),
    ],
  },
  {
    slug: 'google-business-profile-artisans-hautes-alpes',
    label: 'GBP artisans',
    blocks: [
      ctaHeading('Optimiser votre GBP avec un expert local'),
      block('L\'optimisation Google Business Profile fait partie de notre prestation SEO local. Audit de votre fiche, stratégie d\'avis, cohérence NAP et suivi mensuel des positions.'),
      linkBlock(
        'Référencement SEO Hautes-Alpes',
        'https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes',
        'Prestation SEO complète incluant GBP, audit technique et stratégie de contenu'
      ),
    ],
  },
  {
    slug: 'refonte-site-internet-5-signes',
    label: 'Refonte 5 signes',
    blocks: [
      ctaHeading('Refaire votre site avec une approche AI-Friendly'),
      block('Une refonte bien faite améliore simultanément vos performances Google et votre présence dans les moteurs IA (ChatGPT, Perplexity). À partir de 800 € HT pour une refonte landing page.'),
      linkBlock(
        'Refonte site internet AI-Friendly',
        'https://www.facenordgraphisme.fr/refonte-ai-friendly',
        'Refonte technique + contenu, Core Web Vitals, schema.org IA-Ready — devis gratuit'
      ),
      linkBlock(
        'Création de site internet Hautes-Alpes',
        'https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes',
        'Nouveau site vitrine sur-mesure à partir de 800 € HT'
      ),
    ],
  },
  {
    slug: 'seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026',
    label: 'SEO vs IA',
    blocks: [
      ctaHeading('Mettre en place une stratégie SEO + IA pour votre activité'),
      block('Face Nord Graphisme propose les deux leviers en parallèle : référencement SEO local (audit, GBP, contenu) et optimisation GEO pour être cité par les moteurs IA.'),
      linkBlock(
        'Référencement IA — GEO',
        'https://www.facenordgraphisme.fr/referencement-ia',
        'Audit GEO, contenu structuré citable, schema.org FAQPage — devis gratuit'
      ),
      linkBlock(
        'Référencement SEO Hautes-Alpes',
        'https://www.facenordgraphisme.fr/referencement-seo-hautes-alpes',
        'SEO local, Google Business Profile, stratégie de contenu pour le 05'
      ),
    ],
  },
  {
    slug: 'prix-site-internet-artisan-pme-hautes-alpes',
    label: 'Prix site internet',
    blocks: [
      ctaHeading('Obtenir un devis pour votre projet web'),
      block('Découvrez nos prestations détaillées avec les tarifs indicatifs, les fonctionnalités incluses et les délais de livraison.'),
      linkBlock(
        'Création de site internet — dès 800 € HT',
        'https://www.facenordgraphisme.fr/creation-site-internet-hautes-alpes',
        'Site vitrine professionnel, mobile-first, SEO intégré'
      ),
      linkBlock(
        'Boutique e-commerce — dès 2 500 € HT',
        'https://www.facenordgraphisme.fr/boutique-e-commerce-hautes-alpes',
        'WooCommerce, paiement Stripe, réservation en ligne'
      ),
      linkBlock(
        'Maintenance site internet — dès 50 € HT/mois',
        'https://www.facenordgraphisme.fr/maintenance-site-internet-hautes-alpes',
        'Mises à jour, sauvegardes, monitoring 24/7'
      ),
    ],
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔗 Adding internal links to blog posts\n');

  for (const { slug, label, blocks } of postLinks) {
    console.log(`\n── ${label} (${slug})`);

    // Fetch the post to get its _id
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id, title }`,
      { slug }
    );

    if (!post) {
      console.log(`  ⚠ Post not found: ${slug} — skipping`);
      continue;
    }

    console.log(`  ✓ Found: "${post.title}" (${post._id})`);

    // Append the CTA blocks to the end of the post body
    await client
      .patch(post._id)
      .insert('after', 'body[-1]', blocks)
      .commit();

    console.log(`  ✓ Appended ${blocks.length} blocks`);
  }

  console.log('\n✅ Internal links added to all posts!\n');
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
