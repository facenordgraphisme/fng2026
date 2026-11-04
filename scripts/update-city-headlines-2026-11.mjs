// Recentre les pages villes sur « création de site internet + ville ».
// Usage : node --env-file=.env.local scripts/update-city-headlines-2026-11.mjs
import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const UPDATES = {
  'city-page-gap': { headline: 'Création de site internet à Gap', seoTitle: 'Création de site internet à Gap (05) | Face Nord Graphisme' },
  'city-page-briancon': { headline: 'Création de site internet à Briançon', seoTitle: 'Création de site internet à Briançon (05) | Face Nord Graphisme' },
  'city-page-embrun': { headline: 'Création de site internet à Embrun et Serre-Ponçon', seoTitle: 'Création de site à Embrun et Serre-Ponçon | Face Nord Graphisme' },
}

const docs = await client.getDocuments(Object.keys(UPDATES))
writeFileSync(`scripts/backups/city-headlines-${Date.now()}.json`, JSON.stringify(docs.map(({ _id, headline, seoTitle }) => ({ _id, headline, seoTitle })), null, 2))
const tx = client.transaction()
for (const d of docs) tx.patch(d._id, (p) => p.ifRevisionId(d._rev).set(UPDATES[d._id]))
await tx.commit()
console.log('Pages villes mises à jour :', docs.length)
