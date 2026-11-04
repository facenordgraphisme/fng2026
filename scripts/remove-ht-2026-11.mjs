// Micro-entreprise en franchise de TVA : les prix ne sont plus affichés « HT ».
// Usage : node --env-file=.env.local scripts/remove-ht-2026-11.mjs
import { createClient } from '@sanity/client'
import { writeFileSync } from 'node:fs'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const clean = (s) => s.replaceAll('€ HT', '€').replaceAll('Tarifs indicatifs HT', 'Tarifs indicatifs')
const walk = (v, k = '') => {
  if (typeof v === 'string') return k.startsWith('_') ? v : clean(v)
  if (Array.isArray(v)) return v.map((x) => walk(x, k))
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([kk, x]) => [kk, walk(x, kk)]))
  return v
}

const docs = await client.fetch(`*[!(_type match "sanity.*") && !(_type match "system.*") && !(_id in path("drafts.**"))]`)
const tx = client.transaction()
const backup = []
for (const d of docs) {
  const next = walk(d)
  const fields = Object.fromEntries(Object.keys(next).filter((k) => !k.startsWith('_') && JSON.stringify(next[k]) !== JSON.stringify(d[k])).map((k) => [k, next[k]]))
  if (!Object.keys(fields).length) continue
  backup.push(d)
  tx.patch(d._id, (p) => p.ifRevisionId(d._rev).set(fields))
}
writeFileSync(`scripts/backups/remove-ht-${Date.now()}.json`, JSON.stringify(backup, null, 2))
await tx.commit()
console.log('Documents mis à jour :', backup.length)
