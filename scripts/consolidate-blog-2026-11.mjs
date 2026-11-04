// Consolide le blog : 13 articles → 7, retire les chiffres et affirmations non vérifiables,
// fusionne les sujets qui se recoupent et met à jour les liens internes.
// Usage : node --env-file=.env.local scripts/consolidate-blog-2026-11.mjs [--apply]
// Sans --apply : simulation. Avec --apply : sauvegarde dans scripts/backups puis écriture.
import { createClient } from '@sanity/client'
import { randomBytes } from 'node:crypto'
import { writeFileSync } from 'node:fs'

const APPLY = process.argv.includes('--apply')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const VISIBLE = '/blog/etre-visible-en-ligne-dans-les-hautes-alpes'
const GBP = '/blog/google-business-profile-artisans-hautes-alpes'
const IA = '/blog/4-signaux-citation-ia-artisans'
const RESA = '/blog/reservation-directe-eviter-commissions-booking-hautes-alpes'

const MERGED = {
  '/blog/seo-local-hautes-alpes-artisans-pme': VISIBLE,
  '/blog/balises-title-meta-description-pme-hautes-alpes': VISIBLE,
  '/blog/gerer-avis-google-artisans-pme-hautes-alpes': GBP,
  '/blog/geo-referencement-ia-artisans-pme-hautes-alpes': IA,
  '/blog/seo-vs-referencement-sur-l-ia-quelle-strategie-adopter-en-2026': IA,
  '/blog/digitaliser-reservations-tourisme-hautes-alpes': RESA,
}

const CARDS = {
  [VISIBLE]: { title: 'Être visible en ligne dans les Hautes-Alpes', description: 'Fiche Google, avis, site, balises : les leviers de la visibilité locale, dans le bon ordre.', linkText: 'Lire le guide' },
  [GBP]: { title: 'Google Business Profile et avis Google : le guide', description: 'Créer sa fiche, la tenir à jour selon les saisons, obtenir des avis et y répondre.', linkText: 'Lire le guide' },
  [IA]: { title: 'Les 4 signaux de citation IA', description: 'Ce que les études disent sur les citations dans ChatGPT et Google, et ce qu’elles ne prouvent pas.', linkText: "Lire l'article" },
  [RESA]: { title: 'Réservation directe : réduire les commissions', description: 'Hébergeurs et prestataires d’activités : garder la relation client et la marge.', linkText: "Lire l'article" },
}

const SRC = {
  dedge: 'https://www.d-edge.com/2025-hotel-direct-distribution-report/',
  siteminder: 'https://hoteltechreport.com/news/new-siteminder-report-reveals-hotel-revenue-up-to-60-higher-from-a-direct-booking-than-other-booking-sources',
  gap: 'https://www.terresdegap.fr/fileadmin/user_upload/Notes_conjoncture/Note_de_conjoncture_AOUT_2025.pdf',
  ahrefs: 'https://ahrefs.com/blog/ai-brand-visibility-correlations',
  airops: 'https://www.airops.com/blog/offsite-brand-mentions-compounding-ai-citations',
  local: 'https://support.google.com/business/answer/7091?hl=fr',
  qa: 'https://www.seroundtable.com/google-maps-qa-feature-ask-40594.html',
}

const key = () => randomBytes(6).toString('hex')

// Texte avec liens au format [libellé](url).
const parse = (text) => {
  const children = []
  const markDefs = []
  let last = 0
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    if (m.index > last) children.push({ _type: 'span', _key: key(), text: text.slice(last, m.index), marks: [] })
    const k = key()
    markDefs.push({ _type: 'link', _key: k, href: m[2] })
    children.push({ _type: 'span', _key: key(), text: m[1], marks: [k] })
    last = m.index + m[0].length
  }
  if (last < text.length) children.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] })
  return { children, markDefs }
}
const block = (text, style = 'normal', extra = {}) => ({ _type: 'block', _key: key(), style, ...parse(text), ...extra })
const h2 = (t) => block(t, 'h2')
const h3 = (t) => block(t, 'h3')
const p = (t) => block(t)
const li = (t) => block(t, 'normal', { listItem: 'bullet', level: 1 })

const textOf = (b) => (b.children || []).map((s) => s.text).join('')

class Editor {
  constructor(doc) { this.doc = doc; this.body = [...doc.body] }
  find(prefix) {
    const i = this.body.findIndex((b) => textOf(b).startsWith(prefix) || (b._type === 'image' && (b.alt || '').startsWith(prefix)))
    if (i < 0) throw new Error(`${this.doc.slug.current} : bloc introuvable « ${prefix} »`)
    return i
  }
  del(...prefixes) { for (const x of prefixes) this.body.splice(this.find(x), 1); return this }
  set(prefix, text) { const i = this.find(prefix); this.body[i] = { ...this.body[i], ...parse(text) }; return this }
  before(prefix, ...blocks) { this.body.splice(this.find(prefix), 0, ...blocks); return this }
  after(prefix, ...blocks) { this.body.splice(this.find(prefix) + 1, 0, ...blocks); return this }
  caption(prefix, caption) { this.body[this.find(prefix)].caption = caption; return this }
  table(firstCell, rows) {
    const i = this.body.findIndex((b) => b._type === 'table' && b.rows[0].cells[0] === firstCell)
    if (i < 0) throw new Error(`${this.doc.slug.current} : tableau introuvable « ${firstCell} »`)
    const proto = this.body[i].rows[0]
    this.body[i] = { ...this.body[i], rows: rows.map((cells) => ({ ...proto, _key: key(), cells })) }
    return this
  }
  dropTable(firstCell) {
    const i = this.body.findLastIndex((b) => b._type === 'table' && b.rows[0].cells[0] === firstCell)
    if (i < 0) throw new Error(`${this.doc.slug.current} : tableau introuvable « ${firstCell} »`)
    this.body.splice(i, 1)
    return this
  }
  faq(question, answer, newQuestion) {
    for (const b of this.body) {
      if (b._type !== 'faq') continue
      const it = b.items.find((x) => x.question.startsWith(question))
      if (!it) continue
      if (answer === null) { b.items = b.items.filter((x) => x !== it); return this }
      it.answer = answer
      if (newQuestion) it.question = newQuestion
      return this
    }
    throw new Error(`${this.doc.slug.current} : FAQ introuvable « ${question} »`)
  }
  replaceAll(pairs) {
    const walk = (v, k) => {
      if (typeof v === 'string' && !(k || '').startsWith('_') && k !== 'href' && k !== 'linkUrl' && k !== 'style') {
        return pairs.reduce((acc, [a, b]) => acc.split(a).join(b), v)
      }
      if (Array.isArray(v)) return v.map((x) => walk(x, k))
      if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([kk, x]) => [kk, walk(x, kk)]))
      return v
    }
    this.body = walk(this.body)
    return this
  }
}

const VOICE = [
  ['Contactez-nous via', 'Contactez-moi via'], ['nous vous répondons', 'je vous réponds'],
  ['que nous puissions vous répondre', 'que je puisse vous répondre'],
  ['Délai flexible : plus vous nous laissez de temps, plus nous pouvons optimiser', 'Délai flexible : plus vous me laissez de temps, plus je peux optimiser'],
  ["déléguée à l'agence", 'déléguée'], ['Nous proposons', 'Je propose'],
  ['nous travaillons avec', 'je travaille avec'], ['Nous connaissons', 'Je connais'],
  ['Notre offre', 'Mon offre'], ['nos tarifs', 'mes tarifs'], ['Notre position', 'Ma position'],
  ['nous permet de vous', 'me permet de vous'],
  ['Découvrez nos prestations', 'Découvrez mes prestations'],
  ['Hautes-Alpes (05) et au-delà', 'Hautes-Alpes (05) et au-delà'],
]

const EDITS = {
  'prix-site-internet-artisan-pme-hautes-alpes': (e) => {
    e.replaceAll(VOICE)
    e.set('« Combien ça coûte', "Mes tarifs démarrent à 500 € HT pour un site vitrine one-page, 800 € HT pour une boutique en ligne ou un site avec réservation, 400 € HT pour une refonte et 20 € HT par mois pour la maintenance. Ce sont des points de départ : voici ce qui les fait varier et à quoi ressemble chaque format, avec des projets réels.")
    e.del("En 2026, l'accélération des outils")
    e.set('Les tarifs Face Nord Graphisme débutent', 'Site vitrine dès 500 € HT, boutique ou réservation dès 800 € HT, refonte dès 400 € HT, maintenance dès 20 € HT/mois')
    e.set("L'IA accélère le développement web", "Les outils d'IA accélèrent une partie du développement : j'en répercute le gain sur les tarifs de départ")
    e.set('Un site non optimisé (trop lent', 'Un devis détaille toujours ce qui est inclus et ce qui ne l’est pas')
    e.set('Emails automatiques de confirmation', 'Emails automatiques de confirmation et de rappel')
    e.set("Oui — et il vaut mieux en parler franchement", "En partie, et autant le dire clairement. Les outils de développement assistés par l'IA accélèrent la production de code depuis quelques années. Je les utilise, et j'en répercute le gain sur mes tarifs de départ plutôt que de le garder comme marge.")
    e.set("C'est une vraie question", 'Chaque option a ses avantages selon votre situation. Voici un comparatif, à lire en sachant que Face Nord Graphisme est l’une des options :')
    e.table('Critère', [
      ['Critère', 'Wix, Squarespace…', 'Agence', 'Freelance local (Face Nord)'],
      ['Coût de départ', 'Abonnement mensuel', 'Variable, souvent plus élevé', 'Dès 500 € HT'],
      ['Votre temps', 'Élevé : vous faites tout', 'Faible', 'Faible'],
      ['Interlocuteur', 'Support de la plateforme', 'Chef de projet et équipe', 'La personne qui crée le site'],
      ['Référencement', 'À votre charge', 'Selon l’offre', 'Bases du SEO local incluses'],
      ['Capacité', 'Limitée par la plateforme', 'Plusieurs métiers en interne', 'Une seule personne, plus de partenaires si besoin'],
      ['Propriété', 'Liée à la plateforme', 'Selon le contrat', 'Le site vous appartient'],
    ])
    e.set('Le DIY sur Wix ou Squarespace', "Wix ou Squarespace peuvent suffire pour démarrer avec un petit budget, si vous avez du temps à y consacrer. Une agence se justifie sur les gros projets qui demandent plusieurs métiers. Un freelance local convient bien quand vous voulez un interlocuteur unique et un budget maîtrisé.")
    e.before('Ce qui fait monter (ou baisser)',
      h2('Trois formats, trois projets réels'),
      p('Ces exemples montrent ce que recouvre chaque format. Ils ne donnent pas le prix de ces projets, qui dépend du périmètre de chacun.'),
      li("[La Montagne Guide](/portfolio/la-montagne-guide) (site vitrine) : le site d'un guide de haute montagne, avec une page par activité, ses niveaux et ses exemples de courses."),
      li("[GAEC des Valentins](/portfolio/gaec-des-valentins) (boutique en ligne) : vente de colis d'agneau avec WooCommerce, paiement Stripe, gestion des stocks et emails de confirmation."),
      li("[Rêves d'Aventures](/portfolio/reves-daventures) (réservation) : un catalogue d'activités filtrable et un calendrier de disponibilités."),
      li('[Voyageurs des Alpes](/portfolio/voyageurs-des-alpes) (refonte) : un nouveau design centré sur les prochains départs, avec un catalogue de séjours filtrable.'),
    )
    e.set('Score PageSpeed Mobile', 'Performance mobile contrôlée avec PageSpeed Insights avant la livraison')
    e.caption('Grille tarifaire', 'Tarifs indicatifs HT, devis gratuit sous 48 h.')
    e.faq('Combien coûte un site internet professionnel', "Chez Face Nord Graphisme, un site one-page démarre à 500 € HT, un site vitrine complet se situe entre 1 200 et 2 500 € HT, une boutique en ligne ou un site avec réservation démarre à 800 € HT et une refonte à 400 € HT. Le tarif final dépend du nombre de pages, des fonctionnalités et de la production des textes et des photos.")
    e.faq('Est-ce qu\'un site à 500', "Oui, si son périmètre est clair : une page bien construite, conçue pour votre activité et rapide sur mobile. Mon offre à 500 € HT comprend un design personnalisé, l'adaptation au mobile et les bases du SEO. Si vous avez besoin de nombreuses pages ou de fonctionnalités, le budget sera plus élevé : le devis le précise avant de commencer.")
    e.faq("Qu'est-ce que l'IA change", "Les outils d'IA font gagner du temps sur les tâches répétitives de développement. Je les utilise et j'en répercute le gain sur mes tarifs de départ. La stratégie, la connaissance de votre activité et le suivi restent un travail humain.")
  },

  'reservation-directe-eviter-commissions-booking-hautes-alpes': (e) => {
    e.set('Booking.com prélève', "Une réservation directe coûte en général moins cher qu'une réservation via une plateforme. D-EDGE, un éditeur de solutions hôtelières, annonce un coût moyen de 3,5 % en direct chez ses clients, contre 12 à 28 % pour les plateformes. L'objectif n'est pas de quitter les plateformes, mais de garder en direct les clients qui reviennent. Le principe vaut pour les hébergeurs comme pour les prestataires d'activités.")
    e.set('Vous louez votre gîte', 'Vous louez votre gîte 100 € la nuit. Avec une commission de 15 %, vous touchez 85 €. Sur une saison, la différence compte, surtout pour un client qui serait revenu de toute façon.')
    e.del("Selon l'Union des Métiers")
    e.set('Les Hautes-Alpes ont enregistré', `L'ADET Hautes-Alpes compte [2,5 millions de visiteurs dans le département à l'été 2025](${SRC.gap}). La demande existe : la question est de savoir quelle part de la valeur reste chez vous.`)
    e.caption('Personne tapant', 'Le coût de la distribution dépend du canal : à comparer avec vos propres chiffres.')
    e.set('Selon le rapport D-EDGE', `Selon le [rapport 2025 de D-EDGE](${SRC.dedge}), le coût moyen de la distribution directe de ses clients est de 3,5 %, contre 12 à 28 % pour les plateformes en ligne. C'est le chiffre d'un éditeur qui vend ces solutions, et il ne compte pas forcément tout : site, photos, temps passé. Faites le calcul avec vos propres commissions et le coût de votre site.`)
    e.table('Canal de réservation', [
      ['Canal de réservation', 'Coût annoncé', 'Sur 100 € de nuitée'],
      ['Réservation directe (clients D-EDGE)', '≈ 3,5 %', '96,50 € net'],
      ['Plateformes (Booking.com, Expedia…)', '12 % à 28 %', '72 € à 88 € net'],
    ])
    e.set('Ce différentiel n\'est pas négligeable', 'Sur 100 nuitées à 100 €, passer 30 nuitées en direct avec une commission évitée de 15 % représente 450 € par saison, avant les coûts du site et du moteur de réservation. Ce calcul simple permet de décider du budget raisonnable.')
    e.del("D'après le rapport D-EDGE 2025")
    e.set('Pourquoi une réservation directe rapporte', 'Une réservation directe rapporte-t-elle vraiment plus ?')
    e.set('Selon SiteMinder', `SiteMinder, autre éditeur du secteur, indique que les sites d'hôtels ont généré [jusqu'à 60 % de revenu de plus par réservation](${SRC.siteminder}) que les autres canaux en 2024, sur 125 millions de réservations dans le monde. Attention : cela concerne des hôtels, et l'écart reflète en partie des séjours plus longs ou des clients différents. Il ne dit pas ce que gagnerait un gîte du 05.`)
    e.dropTable('Canal de réservation')
    e.set('Cette différence s\'explique', "Le gain le plus concret reste souvent ailleurs : en direct, vous connaissez votre client et vous pouvez le recontacter.")
    e.del('Selon le rapport SiteMinder Hotel Booking Trends 2026')
    e.set('Les Hautes-Alpes : un territoire', 'Dans les Hautes-Alpes, la double saison est un atout')
    e.caption('Couple de touristes', 'Hiver et été : deux occasions de faire revenir un client en direct.')
    e.del("D'après le bilan tourisme été 2025")
    e.set('Cette double saisonnalité', "L'hiver et l'été amènent des clientèles et des envies différentes. Un client venu skier à Vars en février peut revenir pour le lac l'été suivant : un email personnalisé suffit, sans commission. C'est là que la relation directe a le plus de valeur.")
    e.del('Sur le plan numérique')
    e.set('Sur une plateforme, votre gîte', 'Sur une plateforme, votre gîte est une fiche parmi beaucoup d\'autres. Sur votre propre site, vous racontez ce que le client va vivre : la vue au réveil, le sentier à 5 minutes, le marché du mardi matin. Montrez cette expérience, pas seulement la chambre.')
    e.set('Un calendrier de disponibilités', "Un calendrier de disponibilités et un paiement sécurisé suffisent pour commencer. Des outils comme Lodgify, Smily ou Hbook s'intègrent à un site existant. L'essentiel : un parcours court, un prix final visible tout de suite et une confirmation immédiate.")
    e.set('Attention : les contrats', "Vérifiez d'abord votre contrat. En France, la loi Macron de 2015 laisse les hôteliers libres de fixer leurs prix face aux plateformes, mais votre situation peut varier selon le type d'hébergement et de contrat. Si une remise n'est pas adaptée, offrez une valeur ajoutée : petit-déjeuner, départ tardif ou réduction chez un partenaire local.")
    e.set('Selon une synthèse sectorielle', 'Voici 5 leviers simples pour faire revenir vos clients en direct.')
    e.before('Vous gérez un gîte',
      h2("Prestataires d'activités : ce qui change"),
      p("Pour un guide, un moniteur ou un loueur, l'enjeu dépasse la commission. Pendant que vous êtes sur le terrain, le téléphone sonne et le planning se gère le soir. La réservation en ligne permet de vendre quand les vacanciers organisent leur journée, souvent le soir, sans décrocher."),
      li('Un acompte à la réservation et un rappel automatique la veille limitent les absences.'),
      li('Des disponibilités à jour en temps réel évitent les doubles réservations.'),
      li("Un formulaire court (nom, email, date, nombre de participants, paiement) suffit : le reste peut attendre l'email de confirmation."),
      li('Le lien de réservation peut aussi figurer sur votre fiche Google, pour ceux qui vous cherchent depuis Maps.'),
      h3('Quels outils ?'),
      p("FareHarbor, Regiondo et Bokun sont des solutions répandues pour les activités : comparez leurs tarifs et commissions au moment de choisir, ils évoluent. Je développe aussi [Outplanners](/portfolio/outplanners), une application de réservation et de planning pour les pros du plein air : c'est mon propre produit, à prendre en compte dans ce conseil."),
      h3('Deux exemples'),
      li("[Rêves d'Aventures](/portfolio/reves-daventures) : un catalogue d'activités autour de Serre-Ponçon, filtrable, avec un calendrier de disponibilités."),
      li('[Outplanners](/portfolio/outplanners) : un widget de réservation à intégrer à son site, avec paiement Stripe et planning par guide.'),
    )
    e.faq('Quelle commission prélève', "Elle dépend du contrat, du pays et des programmes choisis. D-EDGE cite une fourchette de 12 à 28 % pour les plateformes. Le chiffre qui compte est le vôtre : divisez ce que vous avez payé sur l'année par le chiffre d'affaires réalisé via la plateforme.", 'Quelle commission prélèvent les plateformes ?')
    e.faq('Combien coûte la mise en place', "Chez Face Nord Graphisme, un site avec réservation démarre à 800 € HT, auquel peut s'ajouter l'abonnement du moteur de réservation choisi. Le budget final dépend du nombre d'hébergements ou d'activités et des fonctionnalités.")
    e.faq('Puis-je proposer un prix plus bas', "En France, la loi Macron de 2015 laisse les hôteliers libres de leurs prix face aux plateformes. Vérifiez tout de même votre contrat et votre situation. Vous pouvez aussi offrir une valeur ajoutée plutôt qu'une remise : petit-déjeuner, départ tardif ou réduction chez un partenaire local.")
    e.faq('La réservation directe fonctionne-t-elle', "Oui, à condition de rester réaliste : un petit gîte n'a pas besoin d'un gros dispositif. Un site clair, un calendrier fiable et un email aux anciens clients couvrent l'essentiel. Le gain dépend de la part de clients qui reviennent ou vous recommandent.")
    e.set('Dans les Hautes-Alpes, où la fréquentation', "Commencez par calculer ce que vos commissions vous ont coûté l'an dernier : ce chiffre dira quel budget se justifie. Pour aller plus loin :")
  },

  '4-signaux-citation-ia-artisans': (e) => {
    e.set('ChatGPT et Perplexity ne citent pas', "Quatre éléments reviennent dans les études sur les citations par les IA : une réponse directe en tête de section, un nom d'entreprise identique partout, des mentions sur d'autres sites et des contenus tenus à jour. Ces études portent surtout sur de grandes marques et décrivent des corrélations : ce sont de bonnes pratiques, pas une garantie d'être cité.")
    e.set('Votre concurrent vient d', "Quand quelqu'un demande à ChatGPT un plombier à Gap, l'IA cite quelques noms. Personne ne connaît la recette exacte, et ces réponses changent d'une fois à l'autre. On peut toutefois travailler sur ce qui revient dans les études, et la plupart de ces actions aident aussi sur Google.")
    e.del('Les moteurs IA n\'utilisent pas', 'Ces 4 signaux ont été identifiés')
    e.set('Signal 1 — La première phrase', 'Signal 1 : répondre dès la première phrase')
    e.caption('Mains sur un clavier', 'Une réponse claire en début de section est plus facile à reprendre, pour un lecteur comme pour une IA.')
    e.set('En février 2026, Kevin Indig', "Une analyse de Kevin Indig (Growth Memo, 2026) situe environ 44 % des citations ChatGPT dans le premier tiers des pages. Je n'ai pu vérifier ce chiffre que par des sources secondaires, mais l'idée reste de bon sens : ce qui compte doit arriver tôt.")
    e.set("L'erreur que font presque", "Beaucoup de sites commencent leurs sections par un préambule : « Notre entreprise propose depuis 20 ans… ». Cette phrase ne répond à rien. Commencez par la réponse, sans préambule.")
    e.del('Selon l\'étude Growth Memo')
    e.set('Signal 2 — Le nom', 'Signal 2 : le même nom partout')
    e.set('ChatGPT et Perplexity ne citent pas des URLs', "Pour reconnaître une entreprise, les moteurs croisent plusieurs sources. Si les noms diffèrent d'une plateforme à l'autre, c'est plus difficile pour eux, et aussi pour vos clients.")
    e.set('Voici l\'incohérence la plus fréquente', "Exemple type : « Carrelage Martin SARL » sur le KBIS, « Martin Carrelage » sur Google Maps et « Carrelage & Pose Martin » sur PagesJaunes. Pour un humain, c'est la même entreprise. Pour une machine qui recoupe ses sources, c'est moins évident.")
    e.set('La correction prend 20 minutes', "La correction est rapide. Choisissez un nom commercial et utilisez-le partout : sur votre site, votre fiche Google, PagesJaunes et LinkedIn. Faites de même pour l'adresse et le téléphone.")
    e.del('Les moteurs IA citent des entités')
    e.set('Signal 3 — 85 %', 'Signal 3 : exister ailleurs que sur votre site')
    e.set('En octobre 2025, AirOps', `[AirOps indique](${SRC.airops}) que 85 % des 21 311 mentions de marques étudiées sur ChatGPT, Claude et Perplexity venaient d'autres sites que celui de la marque. AirOps vend des services dans ce domaine et l'étude ne porte pas sur des artisans locaux, mais la tendance est utile : votre site seul ne suffit pas.`)
    e.set('Parmi toutes les sources tierces', `[Ahrefs a mesuré](${SRC.ahrefs}), sur 75 000 marques, une corrélation d'environ 0,74 entre les mentions sur YouTube et la visibilité dans les IA. Ahrefs rappelle lui-même qu'une corrélation n'est pas une cause : les grandes marques ont à la fois plus de vidéos et plus de citations. YouTube peut valoir le coup si la vidéo a aussi une utilité pour vos clients.`)
    e.caption('Écran d\'ordinateur', 'Les annuaires, la presse locale et les partenaires peuvent mentionner votre entreprise.')
    e.set('Pour un artisan des Hautes-Alpes, trois', "Pour un artisan du 05, commencez simple : une fiche PagesJaunes complète, votre profil à la chambre de métiers, un partenaire ou un client qui vous cite, un article dans la presse locale. Ces mentions servent aussi à vos clients, quoi que fassent les IA.")
    e.del("L'étude AirOps (octobre 2025")
    e.set('Signal 4 — La date', 'Signal 4 : tenir vos contenus à jour')
    e.set('Selon l\'analyse Ahrefs portant', "Pour les sujets qui évoluent, une page à jour est plus utile, pour un lecteur comme pour un moteur. Vérifiez aussi que la date de modification est bien présente dans le code de la page (propriété dateModified) : certains sites ne la changent pas.")
    e.set('Comment vérifier votre situation', "Pour le vérifier : testez votre page dans l'outil de test des résultats enrichis de Google, puis cherchez « dateModified ». Modifiez cette date seulement quand le contenu change vraiment : la changer sans raison n'apporte rien.")
    e.del("D'après l'analyse Ahrefs")
    e.set('Comment auditer vos 4 signaux', 'Vérifier ces 4 points en 30 minutes')
    e.set('Avant de lancer des travaux', "Ce contrôle rapide vous dira par où commencer.")
    e.set('Signal 1 — Copiez', "Signal 1 : relisez la première phrase de chaque section de votre page d'accueil. Répond-elle à une question d'un client ?")
    e.set('Signal 2 — Tapez', 'Signal 2 : comparez votre nom sur Google Maps, PagesJaunes, votre site et LinkedIn.')
    e.set('Signal 3 — Demandez', "Signal 3 : cherchez votre nom entre guillemets sur Google. Qui parle de vous, en dehors de vos propres pages ?")
    e.set('Signal 4 — Google Rich', 'Signal 4 : contrôlez la date de modification de vos pages principales.')
    e.set('Vous voulez un diagnostic', 'Vous préférez un regard extérieur ? [Parlons de votre site](/contact), et consultez aussi mon offre de [référencement IA](/referencement-ia).')
    e.before('Les 4 signaux de citation IA — réponse',
      h2("SEO ou IA : que faire d'abord ?"),
      p("Pour une entreprise locale, je conseille de commencer par le SEO classique et la fiche Google. C'est là que la plupart de vos clients vous cherchent aujourd'hui, et le travail sert aussi pour les IA : contenus clairs, informations cohérentes, mentions sur d'autres sites. Consacrez ensuite un peu de temps à contrôler comment les IA parlent de vous, sans en attendre de miracle : les réponses varient et aucun outil ne garantit une citation. Pour la partie locale, voir [le guide de la visibilité dans les Hautes-Alpes](" + VISIBLE + ')'),
    )
    e.faq('Pourquoi ChatGPT cite mon concurrent', "Personne ne peut le dire avec certitude pour une réponse donnée. Votre concurrent a peut-être plus de mentions sur d'autres sites ou des informations plus claires. Les réponses varient aussi d'une question à l'autre : testez plusieurs formulations avant de conclure.")
    e.faq('Est-ce que bien se classer', "Non. Un bon classement aide, mais il ne garantit pas d'être cité. Les IA s'appuient sur plusieurs sources et chaque moteur a son propre fonctionnement.")
    e.faq('Combien de temps faut-il', "Les signaux 1 et 2 demandent quelques heures de travail. Les mentions sur d'autres sites prennent des semaines ou des mois. Le contrôle de la date de modification est rapide si votre outil le permet. Personne ne peut garantir de délai pour une citation.")
    e.faq('Le signal YouTube est-il', `Ahrefs mesure [une corrélation d'environ 0,74](${SRC.ahrefs}) entre mentions YouTube et visibilité dans les IA, sur 75 000 marques. Cela ne prouve pas qu'une vidéo vous fera citer. Pour un artisan local, faites une vidéo si elle aide aussi vos clients.`, 'YouTube est-il vraiment si important ?')
    e.faq('Ces signaux fonctionnent-ils', "Ce sont de bonnes pratiques générales, et chaque moteur fonctionne à sa façon. Elles restent utiles quoi qu'il arrive : des informations claires et cohérentes servent d'abord à vos clients.")
    e.set('Les 4 signaux de citation IA — réponse', "Réponse directe, nom cohérent, mentions sur d'autres sites et contenus à jour : ces actions ne demandent ni budget publicitaire ni développeur à temps plein, et elles servent aussi vos clients.")
    e.del('En 2026, la fenêtre est ouverte')
  },

  'etre-visible-en-ligne-dans-les-hautes-alpes': (e) => {
    e.set('92 % des consommateurs', "Vos clients comparent en ligne avant d'appeler ou de se déplacer")
    e.set('Un profil Google Business Profile complet', 'Une fiche Google complète et à jour est le premier levier, et elle est gratuite')
    e.set('Les IA (ChatGPT', 'Les IA (ChatGPT, Perplexity, AI Overviews) sont un canal à surveiller, sans en attendre de miracle')
    e.set('En 2026, 93 % des recherches', "Sur une recherche locale, Google affiche souvent une carte avec quelques entreprises, au-dessus des résultats classiques. Pour y apparaître, la fiche Google Business Profile est votre outil numéro un, et elle est gratuite.")
    e.set('Pour les commerces des Hautes-Alpes, GBP', "Dans les Hautes-Alpes, la fiche doit suivre la double saison : vos horaires et votre clientèle changent entre l'été et l'hiver. Un horaire faux coûte des avis négatifs et des déplacements pour rien.")
    e.set('Les éléments qui font réellement', "Soignez des photos récentes et variées (façade, équipe, réalisations), une description naturelle et une catégorie principale exacte : « Électricien » plutôt qu'« Entrepreneur ».")
    e.set('Selon l\'étude annuelle de Whitespark', `[Google indique](${SRC.local}) que le classement local dépend de trois critères : la pertinence par rapport à la recherche, la distance et la notoriété (avis, liens, articles, annuaires). Vous agissez surtout sur le premier et le troisième.`)
    e.set('Une spécificité à connaître', "Le SEO local prend généralement plusieurs mois pour produire des effets. Les résultats ne sont pas immédiats et personne ne peut garantir une position, mais une visibilité construite ne s'arrête pas dès qu'on coupe un budget publicitaire.")
    e.set('97 % des consommateurs', "Les touristes qui ne vous connaissent pas se fient beaucoup aux avis pour choisir entre deux restaurants ou deux loueurs. C'est particulièrement vrai dans un département touristique comme les Hautes-Alpes.")
    e.del('Chaque avis Google génère')
    e.set('La stratégie de collecte', "Le plus simple : envoyez un message avec le lien de votre fiche juste après la prestation, quand le client est encore content. Répondez à tous les avis, positifs comme négatifs : vos futurs clients lisent aussi vos réponses.")
    e.set('En 2026, un site performant', "Un site utile à un commerce des Hautes-Alpes doit se charger vite, même avec une connexion limitée en montagne. Il doit être irréprochable sur mobile et afficher un numéro de téléphone cliquable sans avoir à faire défiler la page.")
    e.del('53 % des utilisateurs')
    e.set('5 signes que votre site', "Quelques signes qu'une refonte se pose : un chargement lent, un affichage mal adapté au mobile, un design daté, pas de formulaire simple ou aucune page par service.")
    e.set('Pour chaque page de votre site', "Pour chaque page, Google affiche souvent un titre et une description dans ses résultats. C'est la première chose que voit votre futur client. Google peut les réécrire, surtout s'ils sont absents, génériques ou trop longs.")
    e.set('La méta description ne pèse pas', "La méta description ne pèse pas directement sur le classement, mais elle aide à décider si l'on clique. Dites ce que vous faites, où, et ce qui vous distingue.")
    e.set('ChatGPT, Perplexity, Google AI Overviews...', "ChatGPT, Perplexity, Google AI Overviews : certains internautes posent désormais leur question à une IA. Ce n'est pas le canal dominant pour une entreprise locale, mais il mérite d'être suivi.")
    e.set('La bonne nouvelle : les optimisations', `Ces bonnes pratiques recoupent largement le SEO classique : un site clair, des informations cohérentes et des mentions sur d'autres sites. J'en parle dans [les 4 signaux de citation IA](${IA}).`)
    e.set('Testez votre visibilité IA', "Pour tester : tapez votre métier et votre ville dans Perplexity ou ChatGPT, plusieurs fois et avec plusieurs formulations. Les réponses varient, donc n'en tirez pas de conclusion à partir d'un seul essai.")
    e.set("L'erreur la plus courante : publier", "L'erreur la plus courante : publier beaucoup pendant 2 mois, puis abandonner. Mieux vaut un rythme que vous pouvez tenir. Dans les Hautes-Alpes, calez vos publications sur les temps forts : ouverture de la saison de ski, fêtes du lac, marchés de Noël, inter-saison.")
    e.set('Vérifiez que votre site est mobile-friendly', 'Testez votre site avec PageSpeed Insights et sur votre propre téléphone : le texte est-il lisible, le numéro cliquable ?')
    e.set('Envoyez un SMS à vos 5 meilleurs', "Envoyez un message à vos 5 derniers clients satisfaits avec un lien vers votre fiche pour laisser un avis. Ne demandez pas à vos amis ou à votre famille : c'est contraire aux règles de Google.")
    e.set('Auditez vos balises', "Vérifiez les titres et descriptions de vos pages principales. Corrigez ceux qui sont vides, dupliqués ou trop longs.")
    e.set('Créez votre profil sur les 5 annuaires', 'Créez votre profil sur les annuaires utiles : Pages Jaunes, Mappy, Apple Business Connect et Bing Places. Gardez exactement le même nom, la même adresse et le même téléphone partout.')
    e.set('Testez votre visibilité sur Perplexity', 'Testez comment Perplexity ou ChatGPT répondent sur votre métier et votre ville, et notez qui ressort.')
    e.set('Mettez en place une routine', "Mettez en place une habitude : un message type à envoyer en fin de prestation, avec le lien de votre fiche. Mieux vaut des avis réguliers qu'un pic ponctuel.")
    e.caption('Commerce de proximité', "Votre fiche Google et votre site restent les deux bases d'une présence locale.")
    e.set('Vous n\'avez pas besoin de maîtriser', "Vous n'avez pas besoin de maîtriser tous ces leviers dès le départ. C'est leur combinaison, et leur cohérence dans le temps, qui construit une visibilité durable.")
    e.faq('Combien de temps faut-il pour être visible', "Une fiche Google peut commencer à apparaître peu après sa vérification. Pour le site, comptez plusieurs mois sur des requêtes locales. Le délai dépend de la concurrence, de vos avis et de l'ancienneté de votre présence, et personne ne peut garantir une position.")
    e.faq('Quelle est la priorité', "Créer et vérifier votre fiche Google Business Profile. C'est gratuit, rapide, et c'est ce qui permet d'apparaître sur la carte de Google.")
    e.faq('Combien coûte une stratégie', "Les bases sont gratuites : fiche Google, avis clients, corrections de votre site existant. L'accompagnement dépend du périmètre et se fait sur devis. Chez Face Nord Graphisme, la création d'un site démarre à 500 € HT.")
    e.faq('Mon concurrent est mieux', "Comparez vos avis, votre fiche Google, vos titres de pages et votre présence dans les annuaires. Chaque écart est une piste de travail. La distance joue aussi, et vous n'avez pas la main dessus : un concurrent plus proche du client peut rester devant.")
  },

  'google-business-profile-artisans-hautes-alpes': (e) => {
    e.set('En 2026, 87 % des consommateurs', "Quand on cherche un plombier à Embrun ou un loueur à Serre-Ponçon, Google affiche souvent une carte avec quelques entreprises. Pour y apparaître, il faut une fiche Google Business Profile : gratuite, et accessible sans compétence technique.")
    e.set('C\'est particulièrement vrai', "Beaucoup d'artisans du 05 travaillent bien, mais leur fiche est absente, incomplète ou pas à jour. C'est souvent le premier point à corriger.")
    e.set('Ce guide vous montre', 'Ce guide couvre la création de la fiche, son entretien selon les saisons, et les avis Google : comment les obtenir et y répondre.')
    e.set('87 % des consommateurs cherchent', 'La fiche est gratuite : création, vérification et mises à jour')
    e.set('56 % des fiches', 'Google classe les fiches selon la pertinence, la distance et la notoriété')
    e.set('Les profils avec plus de 100', 'Des photos récentes de votre travail et des horaires justes aident vos clients à décider')
    e.set('Créer et optimiser sa fiche', 'Des avis réguliers, avec des réponses, renforcent la confiance')
    e.set('Dans les Hautes-Alpes, 5 à 10', "Dans les Hautes-Alpes, adaptez la fiche à la double saison")
    e.set('En 2026, 93 % des recherches', "Sur une recherche locale, la carte Google apparaît souvent avant les résultats classiques. Si vous n'y êtes pas, vos concurrents captent les clients qui cherchaient votre activité dans votre ville.")
    e.del('46 % des recherches Google', '76 % des personnes')
    e.del('Entonnoir : du clic', 'En 2026, 93 % des recherches locales sur Google affichent')
    e.set('Créer une fiche Google Business Profile est gratuit', 'Créer une fiche Google Business Profile est gratuit. Seule la publicité Google Ads est payante. Voici les 5 étapes pour démarrer.')
    e.set('Validez la vérification', "Validez la vérification. Selon votre activité, Google peut proposer une vidéo, un appel, un SMS ou un courrier. Le délai varie selon la méthode.")
    e.caption('Smartphone affichant Google Maps', 'Sur mobile, la carte est souvent le premier contact avec votre entreprise.')
    e.set('Créer une fiche Google Business Profile est entièrement', "Si vous vous déplacez chez vos clients, vous pouvez indiquer une zone de chalandise sans afficher votre adresse personnelle.")
    e.set('En 2026, Google classe', `[Google indique trois critères](${SRC.local}) : la pertinence (votre fiche correspond-elle à la recherche ?), la distance (êtes-vous près du lieu recherché ?) et la notoriété (avis, liens, articles, annuaires). Google précise aussi qu'on ne peut ni demander ni payer un meilleur classement local.`)
    e.del('56 % des entreprises locales')
    e.set('La cohérence NAP', 'Vérifiez la cohérence de vos informations. Votre nom, votre adresse et votre téléphone doivent être identiques sur votre fiche, votre site, PagesJaunes et les autres annuaires.')
    e.del('Donut chart', '56 % des entreprises locales n')
    e.set('En 2026, les fiches Google Business Profile avec', "Les photos sont faciles à négliger, et c'est dommage : elles montrent à quoi ressemble votre travail avant même le premier appel.")
    e.set('Le minimum recommandé', "Commencez par une dizaine de photos, puis ajoutez-en régulièrement, quand vous avez un nouveau chantier ou une nouvelle saison à montrer. Préférez vos vraies photos aux images de stock.")
    e.del('Horizontal bar chart', 'Les fiches Google Business Profile avec plus de 100')
    e.caption('Main tenant un iPhone', 'Photos, catégories et description complètes aident les clients à se décider.')
    e.set('Les avis Google : moteur', 'Obtenir des avis Google et y répondre')
    e.set('En 2026, chaque nouvel avis', `Les avis jouent deux rôles : ils rassurent vos futurs clients, et Google indique que leur nombre et leur note comptent [dans la notoriété](${SRC.local}).`)
    e.set('Stratégie de collecte, modèles', "Pour en obtenir, demandez-les au bon moment : juste après la prestation, par SMS ou email, avec le lien direct vers votre fiche. Demandez-les à tous vos clients, pas seulement à ceux qui ont l'air satisfaits, et n'offrez rien en échange : c'est contraire aux règles de Google.")
    e.after('Pour en obtenir, demandez-les',
      h3('Répondre aux avis'),
      p("Répondez à tous vos avis, en citant un détail de la prestation quand c'est possible. Votre réponse s'adresse autant aux futurs clients qu'à l'auteur de l'avis."),
      h3('Gérer un avis négatif'),
      li("Attendez d'être calme avant de répondre, et restez factuel."),
      li('Reconnaissez le problème sans vous justifier longuement, puis proposez de poursuivre par téléphone.'),
      li("Signalez l'avis à Google uniquement s'il enfreint ses règles (faux client, propos injurieux), pas parce qu'il vous déplaît."),
      li("N'achetez jamais d'avis : vous risquez des sanctions sur votre fiche."),
    )
    e.set('Google Posts et Q&R', 'Google Posts et questions de vos clients')
    e.set('En 2026, 84 % des vues', "Les Google Posts permettent de publier des actualités, des offres et des événements sur votre fiche. Ils sont visibles par ceux qui vous découvrent en cherchant un service.")
    e.set('La fréquence idéale', "Inutile de viser une cadence intenable : un post peut être une simple photo de chantier terminé avec deux lignes. Publiez quand vous avez quelque chose à montrer.")
    e.set('La section Questions & Réponses', `L'ancienne section Questions et réponses est en cours de disparition : [Google a annoncé fin 2025 son remplacement](${SRC.qa}) par une fonction d'IA dans Maps, et le déploiement varie selon les pays. Google s'appuie sur votre fiche, vos avis et votre site : répondez donc aux questions fréquentes dans votre description et sur votre site (« Devis gratuit ? », « Intervenez-vous à Briançon ? »).`)
    e.set('Ces contenus structurés', `Ces informations claires peuvent aussi servir aux moteurs d'IA. Voir [les 4 signaux de citation IA](${IA}).`)
    e.del('84 % des vues d')
    e.set('Les artisans et commerçants des Hautes-Alpes font face', "Dans les Hautes-Alpes, l'activité suit les saisons de ski et d'été, avec des horaires très différents d'une période à l'autre. La fiche doit suivre.")
    e.set('Retour d\'expérience terrain', "Conseil : une fiche à jour évite les appels du type « Vous êtes ouverts ? » et rassure les clients qui vérifient avant de se déplacer.")
    e.set('La fonctionnalité « Horaires spéciaux »', "La fonction « Horaires spéciaux » permet de programmer à l'avance les fêtes et les fermetures exceptionnelles. Prenez 30 minutes au début de chaque saison. Un horaire faux génère des avis négatifs (« fermé alors que Google indiquait ouvert »).")
    e.set('Si votre commerce ferme entre', "Si vous fermez entre les saisons (avril-mai ou octobre-novembre), n'effacez pas vos informations : indiquez plutôt « Temporairement fermé » dans votre fiche, puis rouvrez-la au retour.")
    e.set('Changez votre photo de couverture', "Ajoutez des photos de saison : neige en décembre, lac et randonnées en juillet. Vos clients voient ainsi que la fiche est tenue à jour.")
    e.set('Les Google Posts événementiels', "Les Google Posts servent bien aux annonces locales et datées : réouverture, événements, activités de la saison.")
    e.del('Conseil clé pour l\'inter-saison', 'Les commerçants des Hautes-Alpes opèrent')
    e.set('Pour aller plus loin sur ce sujet', `Si vous proposez des activités ou un hébergement, voir aussi [la réservation directe](${RESA}).`)
    e.set('Pour maîtriser le référencement', `Pour la visibilité locale dans son ensemble, voir [le guide pour les Hautes-Alpes](${VISIBLE}).`)
    e.faq('Google Business Profile est-il vraiment gratuit', "Oui. Google ne facture ni la création, ni la vérification, ni les mises à jour d'une fiche. Seule la publicité Google Ads est payante.")
    e.faq('Combien de temps faut-il pour vérifier', "Cela dépend de la méthode proposée par Google (vidéo, appel, SMS ou courrier) : de quelques minutes à plusieurs jours. La fiche apparaît ensuite progressivement.")
    e.faq('Comment faire remonter', `Google cite [la pertinence, la distance et la notoriété](${SRC.local}). Complétez votre fiche, gardez-la à jour et obtenez des avis réguliers auxquels vous répondez. La distance ne dépend pas de vous, et personne ne peut garantir la première place.`)
    e.set('Google Business Profile est l\'un des rares', "Google Business Profile offre une visibilité locale gratuite : c'est souvent la première action à mener.")
    e.set('Créez ou revendiquez votre fiche', 'Créez ou revendiquez votre fiche sur [business.google.com](https://business.google.com). Si elle existe déjà, Google l\'a peut-être créée automatiquement : prenez-en le contrôle.')
    e.set('Ajoutez au minimum 10', "Ajoutez une dizaine de photos réelles : façade, atelier, réalisations, équipe.")
    e.set('Demandez un avis à vos 5', "Demandez un avis à vos 5 prochains clients, par SMS ou email, avec le lien direct vers votre fiche.")
  },
}

const SEO = {
  'prix-site-internet-artisan-pme-hautes-alpes': {},
  'reservation-directe-eviter-commissions-booking-hautes-alpes': {
    title: 'Réservation directe : réduire les commissions des plateformes, pour les hébergeurs et les prestataires d’activités',
    seoTitle: 'Réservation directe : réduire les commissions',
    seoDescription: 'Hébergeurs et prestataires d’activités des Hautes-Alpes : calculer ce que coûtent les plateformes, mettre en place la réservation en ligne et fidéliser en direct.',
  },
  '4-signaux-citation-ia-artisans': {
    seoDescription: 'Être cité par ChatGPT ou Google : 4 points que relèvent les études, ce qu’elles ne prouvent pas, et par où commencer pour un artisan ou une PME locale.',
  },
  'etre-visible-en-ligne-dans-les-hautes-alpes': {
    seoDescription: 'Être visible en ligne dans les Hautes-Alpes : fiche Google, SEO local, avis, site, balises et IA. Les leviers et un plan d’action pour Embrun, Gap ou Briançon.',
  },
  'google-business-profile-artisans-hautes-alpes': {
    title: 'Google Business Profile et avis Google : le guide pour les artisans et commerçants des Hautes-Alpes',
    seoTitle: 'Google Business Profile et avis : guide 05',
    seoDescription: 'Créer et optimiser votre fiche Google Business Profile dans les Hautes-Alpes, l’adapter aux saisons, obtenir des avis et y répondre. Guide pratique.',
  },
}

const now = new Date().toISOString()
const docs = await client.fetch(`*[!(_type match "sanity.*") && !(_id in path("drafts.**"))]`)
const posts = docs.filter((d) => d._type === 'post')
const mergedSlugs = Object.keys(MERGED).map((u) => u.replace('/blog/', ''))
const toDelete = posts.filter((d) => mergedSlugs.includes(d.slug.current))
if (toDelete.length !== 6) throw new Error(`6 articles attendus, ${toDelete.length} trouvés`)

const tx = client.transaction()
const report = []

for (const doc of docs) {
  if (toDelete.includes(doc)) continue
  if (!doc.body && !doc.items) continue
  const slug = doc.slug?.current
  const self = slug ? `/blog/${slug}` : null
  let body = doc.body

  const edit = slug && doc._type === 'post' ? EDITS[slug] : null
  if (edit) {
    const e = new Editor(doc)
    edit(e)
    body = e.body
  }
  if (!Array.isArray(body)) continue

  // Liens vers les articles fusionnés.
  const before = JSON.stringify(body)
  const out = []
  const seenCards = new Set()
  for (const b of body) {
    if (b._type === 'spokeCard') {
      const target = MERGED[b.linkUrl] ?? b.linkUrl
      if (target === self || seenCards.has(target)) continue
      seenCards.add(target)
      out.push(MERGED[b.linkUrl] ? { ...b, linkUrl: target, ...CARDS[target] } : (b.badge === 'À venir' ? { ...b, badge: 'Guide' } : b))
      continue
    }
    if (b._type === 'block' && b.markDefs?.some((m) => MERGED[m.href])) {
      if (textOf(b).length < 130) continue // ligne « Lire aussi » : devenue redondante
      const defs = b.markDefs.map((m) => (MERGED[m.href] ? { ...m, href: MERGED[m.href] } : m))
      const selfKeys = defs.filter((m) => m.href === self).map((m) => m._key)
      out.push({
        ...b,
        markDefs: defs.filter((m) => !selfKeys.includes(m._key)),
        children: b.children.map((c) => ({ ...c, marks: (c.marks || []).filter((k) => !selfKeys.includes(k)) })),
      })
      continue
    }
    if (b.linkUrl && MERGED[b.linkUrl]) { out.push({ ...b, linkUrl: MERGED[b.linkUrl] }); continue }
    out.push(b)
  }
  const changed = edit || JSON.stringify(out) !== before
  if (!changed) continue
  const set = { body: out }
  if (edit) Object.assign(set, SEO[slug] ?? {}, { lastUpdated: now })
  tx.patch(doc._id, (x) => x.ifRevisionId(doc._rev).set(set))
  report.push(`${doc._type} ${slug ?? doc._id} : ${doc.body.length} → ${out.length} blocs${edit ? ' (réécrit)' : ''}`)
}

// Vérifie qu'aucun lien ne pointe encore vers un article supprimé.
console.log(report.join('\n'))
console.log('\nArticles fusionnés puis supprimés :')
toDelete.forEach((d) => console.log(`- ${d.slug.current} → ${MERGED[`/blog/${d.slug.current}`]}`))

if (APPLY) {
  const file = `scripts/backups/consolidate-blog-${Date.now()}.json`
  writeFileSync(file, JSON.stringify(docs, null, 2))
  console.log('\nSauvegarde :', file)
  toDelete.forEach((d) => tx.delete(d._id))
  await tx.commit()
  console.log('Écrit dans Sanity.')
} else {
  console.log('\nSimulation : rien n’a été écrit. Ajouter --apply pour appliquer.')
}
