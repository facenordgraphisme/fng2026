/**
 * fix-slugs-and-reviews.mjs
 *
 * Task B — Slug cleanup:
 *   Post 5: ...digitaliser-vos-reservations-dans-les-hautes-alpes → digitaliser-reservations-tourisme-hautes-alpes
 *   Post 6: ...5-signes-qu-il-est-temps-de-changer-face-nord-graphisme → refonte-site-internet-5-signes
 *   Also updates internal markDef links in all posts that reference the old slugs.
 *
 * Task C — Post 4 reviews deduplication:
 *   Removes the 8-block "Gérer ses avis" section (h2_5 → cc5) that duplicates Post 2.
 *   Replaces with a 3-block encart (H2 summary + paragraph + link to Post 2).
 *
 * Run: node scripts/fix-slugs-and-reviews.mjs
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

// ── Slug mapping ───────────────────────────────────────────────────────────

const SLUG_MAP = {
  '647e4f3b-e52e-477f-a2f9-3a1f584a8db4': {
    old: 'prestataires-de-tourisme-comment-digitaliser-vos-reservations-dans-les-hautes-alpes',
    new: 'digitaliser-reservations-tourisme-hautes-alpes',
  },
  '29d6e806-20e8-4f86-91fa-f41498aa4d59': {
    old: 'refonte-de-site-internet-5-signes-qu-il-est-temps-de-changer-face-nord-graphisme',
    new: 'refonte-site-internet-5-signes',
  },
};

// ── Post 4 reviews section blocks to remove ────────────────────────────────
// Keys from body map: index 46–53
const REVIEWS_KEYS_TO_REMOVE = [
  'h2_5', 'h2_5p1', 'h2_5p2', 'h2_5p3', 'h2_5p4', 'exp1', 'img3', 'cc5',
];

// Replacement encart (3 blocks inserted before h2_6 — Google Posts section)
function reviewsEncart() {
  const linkKey = uid();
  return [
    {
      _type: 'block', _key: uid(), style: 'h2',
      markDefs: [],
      children: [{ _type: 'span', _key: uid(), marks: [], text: 'Les avis Google : moteur de confiance et de classement' }],
    },
    {
      _type: 'block', _key: uid(), style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: uid(), marks: [], text: 'En 2026, chaque nouvel avis Google génère en moyenne 600 impressions, 80 visites de site et 16 appels directs. Les avis influencent à la fois votre classement dans le Local Pack et la décision des clients de vous contacter.' }],
    },
    {
      _type: 'block', _key: uid(), style: 'normal',
      markDefs: [{ _type: 'link', _key: linkKey, href: '/blog/gerer-avis-google-artisans-pme-hautes-alpes' }],
      children: [
        { _type: 'span', _key: uid(), marks: [], text: 'Stratégie de collecte, modèles de réponse, gestion des avis négatifs et erreurs à éviter : tout est dans notre ' },
        { _type: 'span', _key: uid(), marks: [linkKey], text: 'guide complet de la gestion des avis Google pour artisans et PME des Hautes-Alpes' },
        { _type: 'span', _key: uid(), marks: [], text: '.' },
      ],
    },
  ];
}

// ── Main ───────────────────────────────────────────────────────────────────

async function run() {
  const tx = client.transaction();

  // ── B1. Update slugs ─────────────────────────────────────────────────────
  console.log('\n[B1] Updating slugs in Sanity...');
  for (const [id, { old: oldSlug, new: newSlug }] of Object.entries(SLUG_MAP)) {
    console.log(`  ${oldSlug.slice(0, 55)}…`);
    console.log(`  → ${newSlug}`);
    tx.patch(id, p => p.set({ 'slug.current': newSlug }));
  }

  // ── B2. Update internal links in all posts that use old slugs ─────────────
  console.log('\n[B2] Scanning all posts for internal links to old slugs...');
  const allPosts = await client.fetch(
    `*[_type == "post"] { _id, "blocks": body[]{ _key, markDefs[]{ _key, _type, href } } }`
  );

  for (const post of allPosts) {
    for (const block of (post.blocks || [])) {
      for (const md of (block.markDefs || [])) {
        if (md._type !== 'link' || !md.href) continue;

        for (const { old: oldSlug, new: newSlug } of Object.values(SLUG_MAP)) {
          const oldPath = `/blog/${oldSlug}`;
          const newPath = `/blog/${newSlug}`;
          if (md.href === oldPath) {
            console.log(`  Post ${post._id.slice(0, 30)} — updating link ${oldPath} → ${newPath}`);
            tx.patch(post._id, p =>
              p.set({ [`body[_key=="${block._key}"].markDefs[_key=="${md._key}"].href`]: newPath })
            );
          }
        }
      }
    }
  }

  // ── C. Replace Post 4 reviews section ────────────────────────────────────
  console.log('\n[C] Replacing reviews section in Post 4 (GBP)...');

  // Remove the 8 old blocks
  console.log(`  Removing ${REVIEWS_KEYS_TO_REMOVE.length} blocks: ${REVIEWS_KEYS_TO_REMOVE.join(', ')}`);
  tx.patch('post-gbp-artisans-hautes-alpes', p =>
    p.unset(REVIEWS_KEYS_TO_REMOVE.map(k => `body[_key=="${k}"]`))
  );

  // Insert 3 replacement blocks before h2_6 (Google Posts section)
  const encart = reviewsEncart();
  console.log(`  Inserting ${encart.length}-block encart before h2_6 (Google Posts section)`);
  tx.patch('post-gbp-artisans-hautes-alpes', p =>
    p.insert('before', 'body[_key=="h2_6"]', encart)
  );

  // ── Commit ─────────────────────────────────────────────────────────────
  console.log('\n⏳ Committing...');
  const result = await tx.commit();
  console.log(`✅ Done — ${result.results?.length ?? '?'} documents updated.`);
}

run().catch(err => {
  console.error('\n❌', err.message);
  process.exit(1);
});
