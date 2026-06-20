/**
 * Upload les images portfolio vers Sanity CDN et patch les documents
 * Usage: node scripts/upload-portfolio-images.mjs
 */
import { createClient } from '@sanity/client';
import { createReadStream, existsSync } from 'fs';
import { resolve, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '../public');

const client = createClient({
  projectId: 'k4x2bvj1',
  dataset: 'production',
  apiVersion: '2024-03-20',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Map projet → images locales
const PORTFOLIO = {
  'portfolio-gaudineto': {
    main: 'assets/portfolio/gaudineto-home.png',
    gallery: [
      'assets/portfolio/gaudineto-apropos-menu.png',
      'assets/portfolio/gaudineto-interieur.png',
      'assets/portfolio/gaudineto-reservation.png',
    ],
  },
  'portfolio-gaec-des-valentins': {
    main: 'assets/portfolio/gaecdesvalentins-home.png',
    gallery: [
      'assets/portfolio/gaecdesvalentins-home-2.png',
      'assets/portfolio/gaecdesvalentins-colis.png',
      'assets/portfolio/gaecdesvalentins-activites.png',
    ],
  },
  'portfolio-linstant-verdon': {
    main: 'assets/portfolio/linstantverdon-home.png',
    gallery: [
      'assets/portfolio/linstantverdon-activites.png',
      'assets/portfolio/linstantverdon-equipe.png',
      'assets/portfolio/linstantverdon-apropos.png',
    ],
  },
  'portfolio-reves-daventures': {
    main: 'assets/portfolio/revesdaventures-home.png',
    gallery: [
      'assets/portfolio/revesdaventures-calendrier.png',
      'assets/portfolio/revesdaventures-activites.png',
    ],
  },
  'portfolio-verdon-ebike': {
    main: 'assets/portfolio/verdonebike-home.png',
    gallery: [
      'assets/portfolio/verdonebike-locations.png',
      'assets/portfolio/verdonebike-velos.png',
      'assets/portfolio/verdonebike-equipe.png',
    ],
  },
  'portfolio-act-event-pro': {
    main: 'assets/portfolio/acteventpro-home.png',
    gallery: [
      'assets/portfolio/acteventpro-prestations.png',
      'assets/portfolio/acteventpro-apropos.png',
      'assets/portfolio/acteventpro-passion.png',
    ],
  },
};

async function upload(relativePath) {
  const fullPath = resolve(PUBLIC, relativePath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠️  Introuvable: ${relativePath}`);
    return null;
  }
  const filename = basename(fullPath);
  process.stdout.write(`  ⬆  ${filename} ... `);
  const asset = await client.assets.upload('image', createReadStream(fullPath), { filename });
  console.log(`✓ (${asset._id})`);
  return asset._id;
}

function imageRef(assetId, key) {
  return {
    _type: 'image',
    _key: key,
    asset: { _type: 'reference', _ref: assetId },
  };
}

async function run() {
  console.log('🚀  Upload images portfolio → Sanity CDN\n');

  for (const [docId, { main, gallery }] of Object.entries(PORTFOLIO)) {
    console.log(`\n📁  ${docId}`);

    const mainId = await upload(main);
    const galleryIds = [];
    for (const path of gallery) {
      const id = await upload(path);
      if (id) galleryIds.push(id);
    }

    if (!mainId) {
      console.warn(`  ⚠️  mainImage manquante, document ignoré`);
      continue;
    }

    const galleryRefs = galleryIds.map((id, i) => imageRef(id, `gallery-${i}`));

    await client
      .patch(docId)
      .set({
        mainImage: { _type: 'image', asset: { _type: 'reference', _ref: mainId } },
        gallery: galleryRefs,
      })
      .unset(['imageUrl', 'galleryUrls'])
      .commit();

    console.log(`  ✅  Document patché (mainImage + ${galleryRefs.length} gallery)`);
  }

  console.log('\n✨  Terminé — toutes les images sont sur Sanity CDN');
}

run().catch(err => {
  console.error('\n❌  Erreur:', err.message);
  process.exit(1);
});
