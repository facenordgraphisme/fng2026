import { defineField, defineType } from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Page d\'accueil',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    // Hero
    defineField({ name: 'heroEyebrow', title: 'Hero — Badge', type: 'string' }),
    defineField({ name: 'heroHeadline', title: 'Hero — Titre (H1)', type: 'string', description: "Entourez un passage d'astérisques pour le mettre en couleur, ex : Création de sites internet *dans les Hautes-Alpes*" }),
    defineField({ name: 'heroSubtext', title: 'Hero — Sous-texte', type: 'text', rows: 3 }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Hero — Bouton principal (lien vers /contact)', type: 'string' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Hero — Bouton secondaire (lien vers /portfolio)', type: 'string' }),
    defineField({ name: 'heroTrustItems', title: 'Hero — Arguments de réassurance (sous les boutons)', type: 'array', of: [{ type: 'string' }] }),

    // About snippet
    defineField({ name: 'aboutHeading', title: 'Section À propos — Titre', type: 'string' }),
    defineField({ name: 'aboutParagraph1', title: 'Section À propos — Paragraphe 1', type: 'text', rows: 3 }),
    defineField({ name: 'aboutParagraph2', title: 'Section À propos — Paragraphe 2', type: 'text', rows: 3 }),
    defineField({
      name: 'aboutPoints',
      title: 'Section À propos — Points forts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Titre', type: 'string', validation: Rule => Rule.required() },
            { name: 'desc', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
    }),
    defineField({ name: 'aboutCtaLabel', title: 'Section À propos — Bouton (lien vers /a-propos)', type: 'string' }),

    // Services intro (cards come from src/lib/services.ts)
    defineField({ name: 'servicesHeading', title: 'Section Services — Titre', type: 'string' }),
    defineField({ name: 'servicesParagraph', title: 'Section Services — Paragraphe', type: 'text', rows: 2 }),
    defineField({ name: 'servicesCtaLabel', title: 'Section Services — Bouton (lien vers /prestations)', type: 'string' }),

    // City strip
    defineField({ name: 'cityStripEyebrow', title: 'Bandeau villes — Badge', type: 'string' }),
    defineField({ name: 'cityStripHeading', title: 'Bandeau villes — Titre', type: 'string' }),
    defineField({
      name: 'cities',
      title: 'Bandeau villes — Cartes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Nom affiché', type: 'string', validation: Rule => Rule.required() },
            { name: 'href', title: 'Lien (doit correspondre à une page /villes/... existante)', type: 'string', validation: Rule => Rule.required() },
            { name: 'desc', title: 'Description courte', type: 'string' },
          ],
          preview: { select: { title: 'name', subtitle: 'desc' } },
        },
      ],
    }),

    // Portfolio intro (cards stay sourced from getProjects())
    defineField({ name: 'portfolioHeading', title: 'Section Réalisations — Titre', type: 'string' }),
    defineField({ name: 'portfolioCtaLabel', title: 'Section Réalisations — Bouton (lien vers /portfolio)', type: 'string' }),

    // Final CTA
    defineField({ name: 'finalCtaHeading', title: 'CTA final — Titre', type: 'string' }),
    defineField({ name: 'finalCtaParagraph', title: 'CTA final — Paragraphe', type: 'text', rows: 3 }),
    defineField({ name: 'finalCtaLabel', title: 'CTA final — Bouton (lien vers /contact)', type: 'string' }),

    // SEO
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo', rows: 2 }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare({ title }) {
      return { title: title || 'Page d\'accueil' }
    },
  },
})
