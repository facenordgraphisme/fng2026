/**
 * fix-audit-top5.mjs
 * Fixes the top-5 audit issues detected on facenordgraphisme.fr:
 *  1. Meta descriptions too long (Posts 1, 4, 5, 7 > 160 chars)
 *  2. Key takeaways (H3 + bullets) missing on Posts 5, 6, 7, 8
 *  3. Post 1 is an orphan — add inbound links from Posts 4, 7, 8
 *  4. Fix H1 block in Post 6 body (H1 duplication)
 *  5. Fix duplicate H2 title block in Post 8 body
 *
 * Run: node scripts/fix-audit-top5.mjs
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

// ── Helpers ────────────────────────────────────────────────────────────────

function block(text, style = 'normal') {
  return {
    _type: 'block', _key: uid(), style,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

function bullet(text) {
  return {
    _type: 'block', _key: uid(), style: 'normal',
    listItem: 'bullet', level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: uid(), marks: [], text }],
  };
}

/** Paragraph with an inline link at the end */
function linkParagraph(prefix, linkText, href, suffix = '') {
  const linkKey = uid();
  return {
    _type: 'block', _key: uid(), style: 'normal',
    markDefs: [{ _type: 'link', _key: linkKey, href }],
    children: [
      { _type: 'span', _key: uid(), marks: [], text: prefix },
      { _type: 'span', _key: uid(), marks: [linkKey], text: linkText },
      ...(suffix ? [{ _type: 'span', _key: uid(), marks: [], text: suffix }] : []),
    ],
  };
}

// ── Key takeaways content per post ─────────────────────────────────────────

const takeaways = {
  // Post 5 — Tourisme / réservations
  '647e4f3b-e52e-477f-a2f9-3a1f584a8db4': [
    block('Ce qu\'il faut retenir', 'h3'),
    bullet('3 réservations sur 4 en montagne se font depuis un smartphone — souvent le soir, hors de vos heures d\'ouverture'),
    bullet('Un système de réservation en ligne réduit les no-shows de 20 à 40 % grâce aux rappels automatiques'),
    bullet('Le bassin de Serre-Ponçon accueille plus de 500 000 visiteurs par an : votre page de réservation est votre première vitrine'),
    bullet('Google Business Profile peut rediriger directement les touristes vers votre module de réservation en ligne'),
  ],

  // Post 6 — Refonte site internet
  '29d6e806-20e8-4f86-91fa-f41498aa4d59': [
    block('Ce qu\'il faut retenir', 'h3'),
    bullet('53 % des utilisateurs quittent un site qui met plus de 3 secondes à charger (Source : Google)'),
    bullet('Google indexe les sites en mode Mobile-First depuis 2023 — un site non adapté recule dans les résultats'),
    bullet('Un site de plus de 3 ans peut perdre 10 à 30 % de son trafic organique par an faute de mises à jour'),
    bullet('Investir dans une refonte coûte moins cher que perdre des clients face à des concurrents mieux référencés'),
  ],

  // Post 7 — Visibilité en ligne
  '029aba02-674a-42e9-90a3-7710e43cbfbb': [
    block('Ce qu\'il faut retenir', 'h3'),
    bullet('92 % des consommateurs cherchent sur Google avant de visiter un commerce de proximité (BrightLocal, 2026)'),
    bullet('Un profil Google Business Profile complet et vérifié génère 7x plus de clics qu\'un profil incomplet'),
    bullet('Dans les Hautes-Alpes, la double saisonnalité (été/hiver) double l\'enjeu de visibilité : vous devez être trouvable toute l\'année'),
    bullet('La combinaison gagnante : GBP optimisé + site mobile-first + avis réguliers + contenu local ciblé'),
  ],

  // Post 8 — SEO vs IA
  '747729fc-0bdc-440d-a170-c790443d1df7': [
    block('Ce qu\'il faut retenir', 'h3'),
    bullet('Google conserve plus de 92 % des recherches en France en 2026 — le SEO classique reste le socle indispensable'),
    bullet('ChatGPT, Perplexity et Google Gemini génèrent un nouveau trafic de référence en pleine croissance'),
    bullet('Les IA citent préférentiellement les sources avec statistiques, titres clairs, FAQ et contenu structuré'),
    bullet('La stratégie gagnante en 2026 : SEO local solide + contenu structuré pour être cité dans les réponses IA'),
  ],
};

// ── Fixed meta descriptions (≤ 160 chars) ──────────────────────────────────

const metaFixes = {
  // Post 1 — 167 → 158 chars
  'post-seo-local-hautes-alpes-artisans-pme':
    'Maîtrisez le SEO local dans les Hautes-Alpes : fiche GBP, avis Google, balises SEO et citations locales. Le guide complet pour artisans et PME du 05.',

  // Post 4 — 196 → 157 chars
  'post-gbp-artisans-hautes-alpes':
    '87 % des consommateurs cherchent sur Google avant de se déplacer. Guide complet pour créer et optimiser votre fiche Google Business Profile dans les Hautes-Alpes.',

  // Post 5 — 163 → 155 chars
  '647e4f3b-e52e-477f-a2f9-3a1f584a8db4':
    'Automatisez vos réservations à Embrun et Serre-Ponçon, évitez les no-shows et gagnez du temps. Guide pratique pour prestataires touristiques du 05.',

  // Post 7 — 163 → 160 chars
  '029aba02-674a-42e9-90a3-7710e43cbfbb':
    'Boostez votre commerce à Embrun, Gap ou Briançon : SEO local, Google Maps, réseaux sociaux et stratégies digitales adaptées aux Hautes-Alpes.',
};

// ── Link blocks to add to Posts 4, 7, 8 pointing to Post 1 ─────────────────

const linkToPost1 = (context) => linkParagraph(
  `${context} → `,
  'Guide SEO local Hautes-Alpes : le guide complet pour artisans et PME du 05',
  '/blog/seo-local-hautes-alpes-artisans-pme',
);

// ── Main ───────────────────────────────────────────────────────────────────

async function run() {
  const transaction = client.transaction();

  // ── 1. Fix meta descriptions ──────────────────────────────────────────
  console.log('\n[1/4] Fixing meta descriptions...');
  for (const [id, desc] of Object.entries(metaFixes)) {
    console.log(`  Patching ${id.slice(0, 40)} (${desc.length} chars)`);
    transaction.patch(id, p => p.set({ seoDescription: desc }));
  }

  // ── 2. Add key takeaways to Posts 5, 6, 7, 8 ─────────────────────────
  console.log('\n[2/4] Adding key takeaways blocks...');
  for (const [id, blocks] of Object.entries(takeaways)) {
    // Fetch the body to find position of first H2 (insert before it)
    const post = await client.fetch(
      `*[_id == $id][0]{ "body": body[]{ _key, _type, style } }`,
      { id }
    );

    if (!post?.body) { console.log(`  Skipping ${id} (no body)`); continue; }

    // Find index of the first H2 or H3 that is NOT at position 0
    let insertBeforeKey = null;
    for (let i = 1; i < post.body.length; i++) {
      if (post.body[i]._type === 'block' && (post.body[i].style === 'h2' || post.body[i].style === 'h3')) {
        insertBeforeKey = post.body[i]._key;
        break;
      }
    }

    if (insertBeforeKey) {
      console.log(`  Inserting takeaways before key ${insertBeforeKey} in ${id}`);
      transaction.patch(id, p => p.insert('before', `body[_key=="${insertBeforeKey}"]`, blocks));
    } else {
      // Fallback: append at end if no H2/H3 found
      console.log(`  Appending takeaways at end of ${id}`);
      transaction.patch(id, p => p.insert('after', 'body[-1]', blocks));
    }
  }

  // ── 3. Add link to Post 1 from Posts 4, 7, 8 (orphan fix) ────────────
  console.log('\n[3/4] Adding inbound links to Post 1 (SEO local)...');

  const linkTargets = [
    {
      id: 'post-gbp-artisans-hautes-alpes',
      context: 'Pour maîtriser le référencement local dans son ensemble',
    },
    {
      id: '029aba02-674a-42e9-90a3-7710e43cbfbb',
      context: 'Pour approfondir votre stratégie SEO locale',
    },
    {
      id: '747729fc-0bdc-440d-a170-c790443d1df7',
      context: 'Pour appliquer le SEO local concrètement dans les Hautes-Alpes',
    },
  ];

  for (const { id, context } of linkTargets) {
    const post = await client.fetch(
      `*[_id == $id][0]{ "body": body[]{ _key, _type, style } }`,
      { id }
    );
    if (!post?.body) { console.log(`  Skipping ${id}`); continue; }

    // Insert just before the FAQ block (last faq type), or before last block
    const faqIndex = post.body.findLastIndex(b => b._type === 'faq');
    const targetKey = faqIndex >= 0 ? post.body[faqIndex]._key : post.body[post.body.length - 1]._key;
    const insertMode = faqIndex >= 0 ? 'before' : 'after';

    console.log(`  Adding link in ${id} (${insertMode} key ${targetKey})`);
    transaction.patch(id, p => p.insert(insertMode, `body[_key=="${targetKey}"]`, [linkToPost1(context)]));
  }

  // ── 4. Fix structural heading issues ──────────────────────────────────
  console.log('\n[4/4] Fixing heading issues...');

  // Post 6: change H1 block in body to H2 (body should never have H1)
  const post6 = await client.fetch(
    `*[_id == "29d6e806-20e8-4f86-91fa-f41498aa4d59"][0]{ "body": body[]{ _key, _type, style } }`,
    {}
  );
  if (post6?.body) {
    const h1Block = post6.body.find(b => b._type === 'block' && b.style === 'h1');
    if (h1Block) {
      console.log(`  Post 6: changing H1 (key ${h1Block._key}) → H2`);
      transaction.patch('29d6e806-20e8-4f86-91fa-f41498aa4d59', p =>
        p.set({ [`body[_key=="${h1Block._key}"].style`]: 'h2' })
      );
    } else {
      console.log('  Post 6: no H1 found in body (already clean)');
    }
  }

  // Post 8: remove the first H2 that duplicates the page title
  const post8 = await client.fetch(
    `*[_id == "747729fc-0bdc-440d-a170-c790443d1df7"][0]{ "body": body[]{ _key, _type, style, "text": children[0].text } }`,
    {}
  );
  if (post8?.body) {
    const dupH2 = post8.body.find(b =>
      b._type === 'block' && b.style === 'h2' &&
      b.text?.toLowerCase().includes('seo vs')
    );
    if (dupH2) {
      console.log(`  Post 8: removing duplicate H2 title (key ${dupH2._key})`);
      transaction.patch('747729fc-0bdc-440d-a170-c790443d1df7', p =>
        p.unset([`body[_key=="${dupH2._key}"]`])
      );
    } else {
      console.log('  Post 8: duplicate H2 not found (already clean)');
    }
  }

  // ── Commit ─────────────────────────────────────────────────────────────
  console.log('\n⏳ Committing transaction to Sanity...');
  const result = await transaction.commit();
  console.log(`\n✅ Done! ${result.results?.length ?? '?'} mutations applied.`);
  console.log('\nNext: redeploy or wait for ISR cache invalidation (~ 60s).');
}

run().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
