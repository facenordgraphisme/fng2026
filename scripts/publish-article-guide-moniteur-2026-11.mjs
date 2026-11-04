// Publie l'article « Site de guide ou moniteur » dans Sanity à partir de son brouillon Markdown.
// Usage : node --env-file=.env.local scripts/publish-article-guide-moniteur-2026-11.mjs <dossier-brouillon> [--apply]
import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const dir = process.argv[2]
const APPLY = process.argv.includes('--apply')
const SLUG = 'site-internet-guide-montagne-moniteur-outdoor'
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const key = () => randomBytes(6).toString('hex')
const spans = (text) => {
  const children = []
  const markDefs = []
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*\[([^\]]+)\]\(([^)]+)\)\*\*|\*\*([^*]+)\*\*/g
  let last = 0
  for (const m of text.matchAll(re)) {
    if (m.index > last) children.push({ _type: 'span', _key: key(), text: text.slice(last, m.index), marks: [] })
    if (m[5]) {
      children.push({ _type: 'span', _key: key(), text: m[5], marks: ['strong'] })
    } else {
      const k = key()
      const bold = Boolean(m[3])
      markDefs.push({ _type: 'link', _key: k, href: bold ? m[4] : m[2] })
      children.push({ _type: 'span', _key: key(), text: bold ? m[3] : m[1], marks: bold ? ['strong', k] : [k] })
    }
    last = m.index + m[0].length
  }
  if (last < text.length) children.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] })
  return { children, markDefs }
}
const block = (text, style = 'normal', extra = {}) => ({ _type: 'block', _key: key(), style, ...spans(text), ...extra })
const plain = (cell) => cell.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim()

const raw = readFileSync(join(dir, `${SLUG}.md`), 'utf8').replace(/\r\n/g, '\n')
const end = raw.indexOf('\n---\n', 4)
const front = raw.slice(4, end)
const field = (n) => front.match(new RegExp(`^${n}: "?(.+?)"?$`, 'm'))[1]
const lines = raw.slice(end + 5).split('\n')

const proto = await client.fetch(`*[_type=="post" && count(body[_type=="table"])>0][0].body[_type=="table"][0].rows[0]`)
const body = []
const faqItems = []
let inFaq = false
let question = null
const uploads = []

for (let i = 0; i < lines.length; i++) {
  const l = lines[i].trim()
  if (!l || l.startsWith('# ') || l.startsWith('*Par ')) continue
  if (l.startsWith('## ')) {
    inFaq = l.startsWith('## Questions fréquentes')
    if (inFaq) { body.push({ _type: 'faq', _key: key(), title: l.slice(3), items: faqItems }); continue }
    body.push(block(l.slice(3), 'h2'))
    continue
  }
  if (inFaq) {
    if (l.startsWith('### ')) question = l.slice(4)
    else faqItems.push({ _key: key(), question, answer: plain(l) })
    continue
  }
  if (l.startsWith('!')) {
    const m = l.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    uploads.push({ file: m[2], alt: m[1], index: body.length })
    body.push({ _type: 'image', _key: key(), alt: m[1] })
    continue
  }
  if (l.startsWith('|')) {
    const rows = []
    for (; i < lines.length && lines[i].trim().startsWith('|'); i++) {
      const row = lines[i].trim()
      if (/^\|[-| ]+\|$/.test(row)) continue
      rows.push({ ...proto, _key: key(), cells: row.slice(1, -1).split('|').map(plain) })
    }
    i--
    body.push({ _type: 'table', _key: key(), rows })
    // Le gabarit du site n'affiche pas de liens dans les cellules : ils sont repris sous le tableau.
    body.push(block('Études de cas : [La Montagne Guide](/portfolio/la-montagne-guide), [ÉvasionSki](/portfolio/evasionski), [Voyageurs des Alpes](/portfolio/voyageurs-des-alpes) et [Outplanners](/portfolio/outplanners).'))
    continue
  }
  if (l.startsWith('- ')) { body.push(block(l.slice(2), 'normal', { listItem: 'bullet', level: 1 })); continue }
  if (/^\d+\. /.test(l)) { body.push(block(l.replace(/^\d+\. /, ''), 'normal', { listItem: 'number', level: 1 })); continue }
  body.push(block(l.replace('et elle répond aux questions courantes avant le premier appel.', 'et le client y trouve le niveau et les conditions avant le premier appel.')))
}

const now = new Date().toISOString()
const doc = {
  _id: 'post-site-internet-guide-montagne-moniteur-outdoor',
  _type: 'post',
  title: field('title'),
  slug: { _type: 'slug', current: SLUG },
  seoTitle: field('title'),
  seoDescription: field('description'),
  publishedAt: now,
  lastUpdated: now,
  body,
}
console.log(`${doc.title}\n${doc.seoDescription.length} car. description, ${body.length} blocs, ${faqItems.length} FAQ, ${uploads.length} image(s) dans le corps`)

if (!APPLY) {
  console.log('Simulation : rien n’a été écrit. Ajouter --apply pour publier.')
  process.exit(0)
}

const upload = (file) => client.assets.upload('image', readFileSync(join(dir, file)), { filename: file })
for (const u of uploads) {
  const asset = await upload(u.file)
  body[u.index].asset = { _type: 'reference', _ref: asset._id }
}
const hero = await upload('hero.webp')
doc.mainImage = { _type: 'image', alt: field('og_image_alt'), asset: { _type: 'reference', _ref: hero._id } }
await client.createOrReplace(doc)

// Lien entrant depuis l'article sur la réservation directe.
const resa = await client.getDocument('post-reservation-directe-eviter-commissions-booking')
if (!resa.body.some((b) => b.linkUrl === `/blog/${SLUG}`)) {
  const at = resa.body.findIndex((b) => b._type === 'spokeCard')
  const card = {
    _type: 'spokeCard', _key: key(), badge: 'Guides et moniteurs',
    title: 'Site de guide ou moniteur : les choix faits sur 7 projets',
    description: 'Pages par activité, dates à jour, réservation ou simple contact : des exemples réels.',
    linkText: "Lire l'article", linkUrl: `/blog/${SLUG}`,
  }
  await client.patch(resa._id).ifRevisionId(resa._rev).set({ body: [...resa.body.slice(0, at), card, ...resa.body.slice(at)] }).commit()
}
console.log('Publié : /blog/' + SLUG)
