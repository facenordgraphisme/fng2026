// Retire les chiffres et affirmations non vérifiables des articles guide et refonte,
// corrige les métadonnées restantes et passe les pages villes à la première personne.
// Usage : node --env-file=.env.local scripts/rewrite-guide-refonte-villes-2026-11.mjs [--apply]
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

const key = () => randomBytes(6).toString('hex')
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
const textOf = (b) => (b.children || []).map((s) => s.text).join('')

class Editor {
  constructor(doc) { this.doc = doc; this.body = structuredClone(doc.body) }
  find(prefix) {
    const i = this.body.findIndex((b) => textOf(b).startsWith(prefix) || (b._type === 'image' && (b.alt || '').startsWith(prefix)))
    if (i < 0) throw new Error(`${this.doc._id} : bloc introuvable « ${prefix} »`)
    return i
  }
  del(...prefixes) { for (const x of prefixes) this.body.splice(this.find(x), 1); return this }
  set(prefix, text) { const i = this.find(prefix); this.body[i] = { ...this.body[i], ...parse(text) }; return this }
  caption(prefix, caption) { this.body[this.find(prefix)].caption = caption; return this }
  table(firstCell, rows) {
    const i = this.body.findIndex((b) => b._type === 'table' && b.rows[0].cells[0] === firstCell)
    if (i < 0) throw new Error(`${this.doc._id} : tableau introuvable « ${firstCell} »`)
    const proto = this.body[i].rows[0]
    this.body[i] = { ...this.body[i], rows: rows.map((cells) => ({ ...proto, _key: key(), cells })) }
    return this
  }
  faq(question, answer) {
    for (const b of this.body) {
      if (b._type !== 'faq') continue
      const it = b.items.find((x) => x.question.startsWith(question))
      if (it) { it.answer = answer; return this }
    }
    throw new Error(`${this.doc._id} : FAQ introuvable « ${question} »`)
  }
  card(linkUrl, fields) {
    const c = this.body.find((b) => b._type === 'spokeCard' && b.linkUrl === linkUrl)
    if (!c) throw new Error(`${this.doc._id} : carte introuvable ${linkUrl}`)
    Object.assign(c, fields)
    return this
  }
}

const CWV = 'https://developers.google.com/search/docs/appearance/core-web-vitals'
const MOBILE = 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing'

const POSTS = {
  'post-guide-creation-site-internet-artisan-hautes-alpes': {
    meta: {
      seoTitle: 'Création de site internet artisan Hautes-Alpes : guide',
      seoDescription: "Créer un site internet d'artisan dans les Hautes-Alpes : quel format choisir, quel budget prévoir, quelles questions poser à un prestataire et quoi faire après la mise en ligne.",
    },
    edit: (e) => {
      e.set('En 2026, 65 % des TPE-PME', "Pour un artisan, un site vitrine de quelques pages suffit le plus souvent : qui vous êtes, ce que vous faites, où, vos réalisations et comment vous joindre. Ce guide aide à choisir le bon format, à situer un budget et à départager les prestataires. Je crée moi-même des sites : gardez-le en tête en lisant ces conseils.")
      e.set('Chaque semaine, un artisan', "Quand un client cherche « plombier Embrun », il compare en quelques instants ce qu'il trouve. Un site clair, lisible sur téléphone et avec un numéro cliquable lui évite d'aller voir ailleurs.")
      e.del('Selon le Baromètre France Num 2025')
      e.set('François-Xavier Pin accompagne', "Ce guide rassemble ce que je conseille aux artisans et aux PME du 05, avec les contraintes d'un territoire rural de montagne : grandes distances, saisons marquées et connexions parfois limitées.")
      e.set("Pourquoi un artisan des Hautes-Alpes ne peut plus", 'Pourquoi un site reste utile à un artisan')
      e.caption('Smartphone affichant', 'Votre site doit d’abord être lisible sur un téléphone.')
      e.del('En février 2026, Médiamétrie')
      e.set('La fiche Google Maps ne suffit pas', "La fiche Google Maps indique que vous existez et où vous joindre. Votre site montre vos réalisations, vos prestations et votre zone d'intervention. Les deux se complètent : commencez par la fiche si vous devez choisir.")
      e.set('Dernier argument, spécifique à 2026', "Un site clair donne aussi aux moteurs de recherche et aux assistants IA des informations fiables sur votre activité. Cela ne garantit aucune citation, mais sans site, ces informations dépendent entièrement de ce que d'autres écrivent sur vous.")
      e.del('Selon le Baromètre France Num 2025 (DGE, septembre 2025')
      e.set('La première erreur des artisans', "La première erreur est souvent de surestimer ses besoins. Un plombier de Gap n'a pas besoin d'une boutique en ligne, ni un moniteur de ski à Vars d'un blog de 50 articles. Choisir le bon format évite de payer pour des fonctions inutiles.")
      e.table('Type de site', [
        ['Type de site', 'Pour qui', 'Face Nord Graphisme', 'Délai indicatif'],
        ['Site one-page', 'Artisan avec un service principal, premier site', 'Dès 500 €', '5 à 10 jours ouvrés'],
        ['Site vitrine (5 à 10 pages)', 'Plusieurs services, PME locale', '1 200 à 2 500 €', '2 à 4 semaines'],
        ['Boutique ou réservation', 'Vente ou réservation en ligne', 'Dès 800 €', '4 à 8 semaines'],
      ])
      e.set('Pour 80 % des artisans', "Pour beaucoup d'artisans, un site vitrine de quelques pages convient bien : l'accueil, une page par service principal, les réalisations, les avis et le contact.")
      e.set('La landing page est souvent', "Le site d'une seule page est souvent sous-estimé. Pour un artisan avec un service phare, une page bien construite et rapide peut suffire pour démarrer. Le critère n'est pas le nombre de pages, mais leur utilité.")
      e.set('Combien coûte vraiment', 'Combien coûte un site pour un artisan ?')
      e.caption('Double écran', 'Le budget dépend surtout du périmètre : nombre de pages, fonctionnalités et production des contenus.')
      e.set('Selon le Baromètre Sedigitaliser', "Les prix varient beaucoup d'un prestataire à l'autre, et un même mot peut recouvrir des prestations très différentes. Comparez ce qui est inclus plutôt que le prix seul : design, rédaction, référencement de base, formation et suivi. Mes tarifs et ce qui les fait varier sont détaillés dans [l'article sur les prix](/blog/prix-site-internet-artisan-pme-hautes-alpes).")
      e.table('Prestataire', [
        ['Option', 'Avantages', 'Limites'],
        ['Wix, Webador…', 'Rapide, abonnement léger', 'Votre temps, personnalisation et référencement à votre charge'],
        ['Freelance', 'Interlocuteur unique, souvent plus souple', 'Disponibilité limitée, qualité à vérifier'],
        ['Agence web', 'Équipe, plusieurs métiers', 'Budget souvent plus élevé'],
        ['Abonnement tout compris', 'Peu ou pas de coût initial', 'Dépendance, propriété du site à vérifier'],
      ])
      e.set('Le coût DIY est trompeur', "Faire son site soi-même peut suffire pour démarrer, à condition d'y consacrer du temps. Comptez ce temps comme un vrai coût, et vérifiez ce que l'outil permet : vitesse, adaptation au mobile et réglages de référencement.")
      e.set('Des aides à la numérisation', "Des aides à la numérisation peuvent exister selon les périodes. Renseignez-vous auprès de la CMA, de la CCI ou de la Région avant de signer un devis : leurs conditions changent régulièrement.")
      e.del("D'après le Baromètre Sedigitaliser 2026 (mars")
      e.set('Les 3 critères techniques', 'Les 3 critères techniques à vérifier')
      e.caption('MacBook ouvert', 'Mobile, vitesse et données structurées : trois points à vérifier sur un site d’artisan.')
      e.set('En 2025, 80 % du temps', `[Google utilise la version mobile de votre site](${MOBILE}) pour l'indexation et le classement. Votre site doit donc être parfait sur un écran de téléphone : lisible sans zoom, avec des boutons faciles à toucher, un numéro de téléphone cliquable et un formulaire court.`)
      e.set('2. Core Web Vitals', '2. Core Web Vitals : une page rapide et stable')
      e.set('Les Core Web Vitals sont', `[Google recommande de bons Core Web Vitals](${CWV}) : affichage du contenu principal en moins de 2,5 secondes (LCP), réactivité sous 200 ms (INP) et mise en page stable (CLS sous 0,1). Cela ne garantit pas une bonne position, mais une page rapide est aussi plus agréable, surtout avec une connexion limitée en montagne.`)
      e.set('3. Schema.org', '3. Schema.org LocalBusiness : décrire clairement votre activité')
      e.set('Le schema.org LocalBusiness est', "Le balisage schema.org LocalBusiness, invisible pour vos visiteurs, décrit votre activité aux moteurs : nom, adresse, téléphone et horaires. C'est simple à ajouter et utile pour la cohérence de vos informations, mais ce n'est ni un facteur magique ni une condition pour être cité par une IA.")
      e.set('Faire soi-même ou faire appel', 'Faire soi-même ou faire appel à un prestataire local ?')
      e.set('La tentation du DIY', "Wix, Webador ou Jimdo permettent de créer un site sans coder. C'est une option sensée si vous avez du temps et un peu d'appétence pour le numérique. Sinon, comparez le temps que vous y passerez avec le coût d'un prestataire.")
      e.set('Le prestataire local présente', "Un prestataire local connaît les saisons et les lieux, et peut venir voir vos réalisations. C'est un plus, pas une garantie : jugez-le d'abord sur ses projets.")
      e.set('Un devis de site internet peut', "Deux devis peuvent être très différents pour des prestations qui semblent identiques. Ces 5 questions aident à les comparer.")
      e.set('« Le site sera-t-il optimisé', "« Le site sera-t-il conçu d'abord pour le mobile, et pouvez-vous me montrer les résultats PageSpeed de sites déjà livrés ? » Testez-les vous-même sur pagespeed.web.dev.")
      e.set('« Intégrez-vous le schema.org', "« Quel référencement de base est inclus : titres, descriptions, données structurées, fiche Google ? » Demandez une liste précise, et méfiez-vous de toute promesse de première place sur Google ou de citation par ChatGPT.")
      e.set('« Pouvez-vous me montrer 3 sites', "« Pouvez-vous me montrer 3 sites récents pour des activités proches de la mienne ? » Allez les voir sur votre téléphone, et si possible parlez à l'un de ces clients.")
      e.set('La mise en ligne n\'est pas', "La mise en ligne n'est pas la fin du projet. Voici 4 actions utiles dans les 30 jours qui suivent.")
      e.set('Synchroniser votre fiche', "Ajoutez l'adresse du nouveau site à votre fiche Google, et vérifiez que le nom de votre entreprise est identique sur les deux.")
      e.set('Soumettre le sitemap', "Soumettez le sitemap dans Google Search Console et demandez l'indexation de vos pages principales avec l'outil d'inspection d'URL.")
      e.set('Compléter votre fiche PagesJaunes', "Complétez votre fiche PagesJaunes avec l'adresse de votre site et une description utile.")
      e.set('Publier un premier article', "Publiez une première réalisation avec des photos du chantier, une description et le nom de la commune.")
      e.faq('Quel budget prévoir', "Chez Face Nord Graphisme, un site one-page démarre à 500 € et un site vitrine complet se situe entre 1 200 et 2 500 €. Les tarifs varient selon les prestataires et ce qui est inclus : comparez plusieurs devis détaillés.")
      e.faq('Combien de temps faut-il', "Comptez 2 à 4 semaines pour un site vitrine de 5 à 10 pages, à partir du moment où vous avez fourni vos contenus. Le délai dépend beaucoup de la rapidité des validations : préparez vos textes et vos photos à l'avance.")
      e.faq('Est-ce qu\'une fiche Google Maps', "Pour démarrer, elle peut suffire un temps, surtout si le bouche-à-oreille vous apporte déjà du travail. Un site permet ensuite de présenter vos réalisations et vos services en détail, et de moins dépendre d'une seule plateforme.")
      e.faq('Peut-on créer son site soi-même', "Oui. Ces outils conviennent pour démarrer si vous avez du temps à y consacrer. Vérifiez la vitesse sur mobile et les réglages de référencement, et comptez le temps passé comme un vrai coût.")
      e.faq('Pourquoi choisir un prestataire web local', "Il connaît les saisons, les lieux et peut se déplacer pour voir vos réalisations ou vous former. Ce n'est pas une garantie de qualité : jugez d'abord sur ses projets, quelle que soit sa localisation.")
      e.set('Créer un site internet professionnel en 2026', "Un site clair, adapté au mobile et tenu à jour reste un bon investissement pour un artisan, à condition de choisir un format à la mesure de votre activité.")
      e.set("L'investissement de départ", "Commencez simple, et complétez ensuite selon ce que vos clients vous demandent. Pour aller plus loin :")
    },
  },
  '29d6e806-20e8-4f86-91fa-f41498aa4d59': {
    meta: {
      seoDescription: "Site lent, mal affiché sur mobile, daté ou qui n'amène plus de contacts : 5 signes qu'une refonte se justifie, les étapes pour conserver son référencement et le budget à prévoir.",
    },
    edit: (e) => {
      e.set('Votre site internet a été créé', "Votre site a quelques années et il ne vous ressemble plus ? Faut-il retoucher quelques pages ou le refaire ? Ce guide présente 5 signes à vérifier, et la marche à suivre si plusieurs s'appliquent. Je réalise moi-même des refontes : c'est mon point de vue, à confronter à vos propres chiffres.")
      e.set('En 2026, un site internet est', "Dans les Hautes-Alpes, les saisons concentrent une grande partie de l'activité. Mieux vaut donc planifier une refonte hors saison, pour qu'elle soit prête avant vos périodes les plus chargées.")
      e.set('53 % des utilisateurs', 'Testez la vitesse et le mobile avec des outils gratuits avant de décider')
      e.set('Google indexe désormais', "Google utilise la version mobile de votre site pour l'indexation et le classement")
      e.set('Un site de plus de 3 ans', "L'âge d'un site ne suffit pas à justifier une refonte : regardez ce qui bloque vraiment")
      e.set('La refonte moyenne', 'Calculez la rentabilité avec vos propres chiffres : valeur d’un client et contacts manquants')
      e.set('5 signaux cumulés', "Plusieurs signes réunis justifient une refonte ; un ou deux peuvent se régler par des corrections ciblées")
      e.set('La vitesse est devenue', `[Google recommande de bons Core Web Vitals](${CWV}) : affichage du contenu principal en moins de 2,5 secondes (LCP), réactivité sous 200 ms (INP) et stabilité visuelle (CLS sous 0,1). Ce n'est pas une garantie de classement, mais une page lente fait aussi partir vos visiteurs.`)
      e.set('Comment mesurer ?', "Pour mesurer : entrez l'adresse de votre site dans [PageSpeed Insights](https://pagespeed.web.dev) et regardez les résultats sur mobile. Plus le score est bas, plus il y a de pistes d'amélioration, mais ces scores varient d'un test à l'autre : faites-en plusieurs.")
      e.set('Hébergement mutualisé bas de gamme', 'Hébergement trop lent à répondre')
      e.set('Dans les Hautes-Alpes, ce point', "Dans les Hautes-Alpes, ce point compte d'autant plus : un touriste qui cherche un guide ou un hébergement depuis son téléphone a parfois une connexion limitée.")
      e.set('« Responsive » ne veut pas dire', "« Responsive » ne veut pas dire agréable. Beaucoup de sites anciens s'affichent correctement sur mobile, mais restent pénibles : boutons trop petits, texte illisible sans zoom ou formulaires difficiles à remplir.")
      e.set('Depuis mars 2023, Google', `[Google utilise la version mobile de votre site](${MOBILE}) pour l'indexation et le classement. Si elle contient moins de contenu que la version ordinateur, c'est cette version réduite qui compte.`)
      e.set("Si l'une de ces actions", 'Si l’une de ces actions est inconfortable, vos clients le ressentent aussi.')
      e.set('Un site internet vieillit', "Un site peut paraître daté en quelques années, et cette première impression compte, surtout si vos visiteurs comparent plusieurs prestataires.")
      e.set('Ce signal est particulièrement', "C'est particulièrement vrai quand la confiance compte : artisans du bâtiment, professions de santé, hébergeurs. Vos clients comparent votre site à celui de vos concurrents.")
      e.set('Google pénalise activement', "Si l'adresse de votre site commence encore par http:// sans le « s », les navigateurs peuvent afficher un avertissement de sécurité. C'est à corriger en priorité.")
      e.set('Pour les artisans et commerçants', "Pour un commerce des Hautes-Alpes, un site piraté ou hors ligne en pleine saison coûte cher en contacts manqués. La maintenance préventive revient généralement moins cher que la réparation.")
      e.set('Signe 5 — Votre site ne convertit', 'Signe 5 : votre site ne vous apporte plus de contacts')
      e.set('Le taux de rebond mesure', "Regardez ce que font vos visiteurs : appellent-ils, envoient-ils un message ? S'ils partent sans rien faire, le message n'est peut-être pas clair, ou le bouton de contact pas assez visible.")
      e.set('Autre indicateur souvent', "Vérifiez aussi vos formulaires : un bug peut empêcher les messages d'arriver sans que vous le sachiez. Envoyez-vous un message de test régulièrement.")
      e.set('Dans les Hautes-Alpes, la saisonnalité', "Dans les Hautes-Alpes, vérifiez tout cela avant vos périodes de forte demande, en juillet-août ou en décembre selon votre activité.")
      e.set('Le budget d\'une refonte dépend', "Le budget dépend de la complexité du site, du volume de contenu et des fonctionnalités. Voici mes tarifs indicatifs. Une refonte de site one-page démarre à 400 € :")
      e.set('Landing page ou site vitrine simple', 'Site one-page : à partir de 500 € pour une création')
      e.set('Le retour sur investissement', "Le calcul est simple : combien vous rapporte un client en moyenne, et combien de contacts supplémentaires faudrait-il pour couvrir la refonte ? Faites-le avec vos propres chiffres. Personne ne peut vous garantir un délai de retour à l'avance.")
      e.table('Critère', [
        ['Critère', 'À vérifier sur un ancien site', 'À viser sur le nouveau'],
        ['Vitesse', 'Lenteur dans PageSpeed Insights', 'LCP sous 2,5 s, INP sous 200 ms'],
        ['Mobile', 'Zoom nécessaire, boutons petits', 'Lisible et utilisable au doigt'],
        ['Sécurité', 'Absence de HTTPS, outils non mis à jour', 'HTTPS et mises à jour régulières'],
        ['Référencement', 'Balises manquantes ou dupliquées', 'Balises uniques, données structurées'],
        ['Mises à jour', 'Il faut appeler le développeur', 'Vous modifiez vos contenus vous-même'],
      ])
      e.set('Google Search Console → Rapport', 'Google Search Console : consultez le rapport Core Web Vitals s’il dispose d’assez de données')
      e.set('Test mobile Google', 'Votre téléphone : essayez d’appeler, de remplir le formulaire et de lire une page')
      e.card('/blog/google-business-profile-artisans-hautes-alpes', { description: 'Complémentaire à votre site : créer sa fiche, la tenir à jour et obtenir des avis.' })
      e.caption('5 signaux', '5 signes à vérifier avant de décider d’une refonte.')
      e.faq('Quelle est la différence', "Une mise à jour corrige des éléments ponctuels (extension, texte, photo) sans toucher à la structure. Une refonte reconstruit tout ou partie du site : pages, design, code et contenus.")
      e.faq('Est-ce que je vais perdre', "C'est un vrai risque si la migration est mal préparée. Une redirection 301 pour chaque adresse qui change, et un relevé des pages qui reçoivent déjà des visites, permettent de le limiter. Personne ne peut garantir un classement identique, surtout juste après la mise en ligne.")
      e.faq('Faut-il garder WordPress', "WordPress reste un bon choix s'il est bien entretenu, avec peu d'extensions. Next.js avec Sanity, que j'utilise souvent, convient bien aux sites sur mesure. Le meilleur outil est celui que vous saurez mettre à jour vous-même et dont l'entretien vous convient.")
      e.faq('Comment éviter les arnaques', "Demandez un accès administrateur à votre hébergement et à votre outil de gestion dès le départ, des exemples récents à tester vous-même, une clause de propriété dans le contrat et un engagement sur le délai. Méfiez-vous de toute garantie de première place sur Google.")
      e.set('Une refonte bien faite améliore', 'Une refonte peut améliorer la vitesse, la lisibilité et la clarté de vos contenus. À partir de 400 € pour un site one-page.')
    },
  },
}

const BY_SECTOR = {
  'city-page-embrun': [
    ["Nous ne sommes pas une agence parisienne qui prétend « accompagner les artisans locaux ». Face Nord Graphisme est basée à Puy-Sanières, à 5 minutes d'Embrun, sur les rives du lac de Serre-Ponçon. Depuis plus de 10 ans, nous accompagnons", "Je ne suis pas une agence parisienne qui prétend « accompagner les artisans locaux ». Face Nord Graphisme est basée à Puy-Sanières, tout près d'Embrun et du lac de Serre-Ponçon. Depuis plus de 10 ans, j'accompagne"],
    ["Face Nord Graphisme est basée à Puy-Sanières, à 5 minutes d'Embrun. Nous créons", "Face Nord Graphisme est basée à Puy-Sanières, tout près d'Embrun. Je crée"],
    ['Étant basés à Puy-Sanières (5 min d\'Embrun), nous proposons', "Étant basé à Puy-Sanières, tout près d'Embrun, je propose"],
  ],
  'city-page-gap': [
    ["Face Nord Graphisme est basée à Puy-Sanières (15 min d'Embrun, 45 min de Gap) et travaille régulièrement avec des entreprises gapençaises.", "Face Nord Graphisme est basée à Puy-Sanières, près d'Embrun, et travaille dans tout le département, Gap compris."],
    ['Nous sommes basés à Puy-Sanières (entre Embrun et Gap) et travaillons régulièrement avec des entreprises gapençaises.', "Je suis basé à Puy-Sanières, près d'Embrun, et je travaille dans tout le département, Gap compris."],
  ],
}

const CITY_VOICE = [
  ['Les entreprises que nous accompagnons', "Les entreprises que j'accompagne"],
  ["Les types d'entreprises que nous accompagnons", "Les types d'entreprises que j'accompagne"],
  ['Nous proposons', 'Je propose'], ['nous proposons', 'je propose'],
  ['Nous intégrons', "J'intègre"], ['Nous vous formons', 'Je vous forme'],
  ['Nous configurons', 'Je configure'], ['Nous connaissons', 'Je connais'],
  ['Nous pouvons rencontrer nos clients', 'Je peux rencontrer mes clients'],
  ['Nos réalisations', 'Mes réalisations'], ['que nous réalisons', 'que je réalise'],
  ['nous ayez décrit', "m'ayez décrit"], ['dans nos projets', 'dans mes projets'],
  ['Nos tarifs', 'Mes tarifs'], ['notre guide', 'mon guide'],
  ['Nous vous répondons', 'Je vous réponds'], ['nous planifions', 'je planifie'], ['Nous planifions', 'Je planifie'],
  ['dès que nous avons commencé', "dès que j'ai commencé"], ['si vous nous la déléguez', 'si vous me la déléguez'],
  ['Tous nos sites', 'Tous mes sites'], ['Nous faisons', 'Je fais'], ['Nous nous', 'Je me'],
  ['notre offre', 'mon offre'], ['Nous contacter', 'Me contacter'], ['Contactez-nous', 'Contactez-moi'],
  ['Nous travaillons', 'Je travaille'], ['nous travaillons', 'je travaille'],
  ['Nous assurons', "J'assure"], ['Nous adaptons', "J'adapte"], ['Nous créons', 'Je crée'], ['nous créons', 'je crée'],
  ['Nous livrons', 'Je livre'], ['nous pouvons', 'je peux'], ['Nous pouvons', 'Je peux'], ['Notre ', 'Mon '], ['notre ', 'mon '],
]

const walkStrings = (v, fn, k = '') => {
  if (typeof v === 'string') return k.startsWith('_') || k === 'href' || k === 'linkUrl' || k === 'style' ? v : fn(v)
  if (Array.isArray(v)) return v.map((x) => walkStrings(x, fn, k))
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([kk, x]) => [kk, walkStrings(x, fn, kk)]))
  return v
}
const applyPairs = (pairs) => (s) => pairs.reduce((acc, [a, b]) => acc.split(a).join(b), s)

const docs = await client.getDocuments([...Object.keys(POSTS), 'city-page-gap', 'city-page-briancon', 'city-page-embrun'])
const tx = client.transaction()
const now = new Date().toISOString()
for (const doc of docs) {
  if (POSTS[doc._id]) {
    const e = new Editor(doc)
    POSTS[doc._id].edit(e)
    tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set({ body: e.body, ...POSTS[doc._id].meta, lastUpdated: now }))
    console.log(`${doc.slug.current} : ${doc.body.length} → ${e.body.length} blocs`)
    continue
  }
  const fn = applyPairs([...(BY_SECTOR[doc._id] ?? []), ...CITY_VOICE])
  const body = walkStrings(doc.body, fn)
  const intro = fn(doc.intro)
  tx.patch(doc._id, (p) => p.ifRevisionId(doc._rev).set({ body, intro }))
  const left = JSON.stringify({ body, intro }).match(/.{40}\b(?:[Nn]ous|[Nn]os|[Nn]otre)\b.{30}/g) ?? []
  console.log(`${doc._id} : reste ${left.length} « nous »`)
  left.forEach((x) => console.log('   ', x))
}

if (APPLY) {
  const file = `scripts/backups/rewrite-guide-refonte-villes-${Date.now()}.json`
  writeFileSync(file, JSON.stringify(docs, null, 2))
  await tx.commit()
  console.log('Sauvegarde :', file, '\nÉcrit dans Sanity.')
} else {
  console.log('Simulation : rien n’a été écrit. Ajouter --apply pour appliquer.')
}
