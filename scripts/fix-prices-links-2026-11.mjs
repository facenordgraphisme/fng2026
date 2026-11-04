// Aligne les tarifs (500 / 800 / 400 / 20 € HT) et corrige les liens morts dans Sanity.
// Usage : node --env-file=.env.local scripts/fix-prices-links-2026-11.mjs [--apply]
// Sans --apply : simulation. Avec --apply : sauvegarde dans scripts/backups puis écriture.
import { createClient } from '@sanity/client'
import { writeFileSync, readFileSync } from 'node:fs'

const APPLY = process.argv.includes('--apply')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const LINKS = [
  ['/blog/gbp-artisans-hautes-alpes', '/blog/google-business-profile-artisans-hautes-alpes'],
  ['/blog/visibilite-en-ligne-artisans-commerces-hautes-alpes', '/blog/etre-visible-en-ligne-dans-les-hautes-alpes'],
  ['/blog/le-guide-complet-de-la-visibilite-en-ligne-pour-les-commercants-des-hautes-alpes', '/blog/etre-visible-en-ligne-dans-les-hautes-alpes'],
]

// L'ordre compte : le plancher vitrine passe à 500 € avant que la boutique ne passe à 800 €.
const CITY = [
  ['à partir de 800 € HT', 'à partir de 500 € HT'],
  ['2 500 à 5 000 € HT', 'à partir de 800 € HT'],
  ['à partir de 2 500 € HT', 'à partir de 800 € HT'],
  ['à partir de 30 € HT/mois', 'à partir de 20 € HT/mois'],
]

const RULES = {
  'city-page-briancon': CITY,
  'city-page-embrun': CITY,
  'city-page-gap': CITY,
  '29d6e806-20e8-4f86-91fa-f41498aa4d59': [
    ['À partir de 800 € HT pour une refonte landing page', 'À partir de 400 € HT pour une refonte landing page'],
    ['à partir de 800 € HT', 'à partir de 500 € HT'],
    ['2 500 à 5 000 € HT', 'à partir de 800 € HT'],
  ],
  'post-seo-local-hautes-alpes-artisans-pme': [['dès 800 € HT', 'dès 500 € HT']],
  faqPage: [[
    "Un site vitrine de base peut démarrer autour de 1000€, tandis qu'une boutique en ligne complète nécessitera un budget plus important.",
    'Un site vitrine démarre à partir de 500 € HT, une boutique en ligne à partir de 800 € HT, une refonte à partir de 400 € HT et la maintenance à partir de 20 € HT/mois.',
  ]],
  'post-prix-site-internet-hautes-alpes': [
    ['et de 2 500 à 5 000 € HT pour un site', 'et à partir de 800 € HT pour un site'],
    ['landing page dès 800€, site vitrine 1200-2500€, e-commerce 2500-5000€', 'landing page dès 500€, site vitrine 1200-2500€, e-commerce dès 800€'],
    ['à partir de 800 € HT', 'à partir de 500 € HT'],
    ['débutent à 800 € HT', 'débutent à 500 € HT'],
    ['peuvent démarrer à 800 €', 'peuvent démarrer à 500 €'],
    ['Notre offre à 800 €', 'Notre offre à 500 €'],
    ['un site à 800 €', 'un site à 500 €'],
    ['livré à 800 €', 'livré à 500 €'],
    ['dès 800 € HT', 'dès 500 € HT'],
    ['800 à 3 000 €', '500 à 3 000 €'],
    ['2 500 à 5 000 € HT', 'à partir de 800 € HT'],
    ['dès 2 500 € HT', 'dès 800 € HT'],
    ['dès 50 € HT/mois', 'dès 20 € HT/mois'],
    ['disponible sur devis, généralement entre 30 et 80 € HT/mois selon les besoins', 'disponible à partir de 20 € HT/mois selon les besoins'],
  ],
}

const SET = {
  'post-prix-site-internet-hautes-alpes': {
    seoTitle: 'Prix site web Hautes-Alpes : dès 500 €',
    seoDescription: 'Combien coûte un site internet dans les Hautes-Alpes ? Landing page, site vitrine, e-commerce : tarifs transparents dès 500 € HT pour artisans et PME du 05.',
    lastUpdated: new Date().toISOString(),
  },
}

const transform = (value, rules, log, path = '') => {
  if (typeof value === 'string') {
    let out = value
    for (const [from, to] of rules) out = out.split(from).join(to)
    if (out !== value) log.push({ path, before: value, after: out })
    return out
  }
  if (Array.isArray(value)) return value.map((v, i) => transform(v, rules, log, `${path}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [
      k,
      k.startsWith('_') ? v : transform(v, rules, log, path ? `${path}.${k}` : k),
    ]))
  }
  return value
}

const docs = await client.fetch(`*[!(_type match "sanity.*") && !(_id in path("drafts.**"))]`)
const tx = client.transaction()
let changed = 0
const backup = []

for (const doc of docs) {
  const log = []
  const rules = [...(RULES[doc._id] ?? []), ...LINKS]
  const next = transform(doc, rules, log)
  const set = SET[doc._id] ?? {}
  if (!log.length && !Object.keys(set).length) continue
  changed++
  backup.push(doc)
  console.log(`\n## ${doc._type} ${doc.slug?.current ?? doc._id} (${log.length} champs)`)
  for (const l of log) {
    const first = [...l.before].findIndex((c, i) => c !== [...l.after][i])
    console.log(`- ${l.path}\n    ${l.after.slice(Math.max(0, first - 40), first + 80)}`)
  }
  const fields = Object.fromEntries(Object.keys(next).filter((k) => !k.startsWith('_') && JSON.stringify(next[k]) !== JSON.stringify(doc[k])).map((k) => [k, next[k]]))
  tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set({ ...fields, ...set }))
}

console.log(`\n${changed} documents à modifier.`)
if (APPLY) {
  const file = `scripts/backups/fix-prices-links-${Date.now()}.json`
  writeFileSync(file, JSON.stringify(backup, null, 2))
  console.log('Sauvegarde :', file)
  const svgPath = process.env.GRILLE_SVG
  if (svgPath) {
    const asset = await client.assets.upload('image', readFileSync(svgPath), { filename: 'grille-tarifaire-2026-11.svg', contentType: 'image/svg+xml' })
    const prix = docs.find((d) => d._id === 'post-prix-site-internet-hautes-alpes')
    const block = prix.body.find((b) => b._key === '5b0b2d0547ef')
    tx.patch(prix._id, (p) => p.set({ [`body[_key=="${block._key}"].asset`]: { _type: 'reference', _ref: asset._id } }))
    console.log('Nouvelle grille :', asset._id)
  }
  await tx.commit()
  console.log('Écrit dans Sanity.')
} else {
  console.log('Simulation : rien n’a été écrit. Ajouter --apply pour appliquer.')
}
