import { defineField, defineType } from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'Page À Propos',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    // Hero
    defineField({ name: 'heroHeading', title: 'Hero — Titre (H1)', type: 'string' }),
    defineField({ name: 'heroParagraph1', title: 'Hero — Paragraphe 1', type: 'text', rows: 3 }),
    defineField({ name: 'heroParagraph2', title: 'Hero — Paragraphe 2', type: 'text', rows: 3 }),

    // Section 1 — Expertise locale
    defineField({ name: 'section1Heading', title: 'Section "Expertise locale" — Titre', type: 'string' }),
    defineField({ name: 'section1Body', title: 'Section "Expertise locale" — Texte', type: 'text', rows: 4 }),

    // Section 2 — Passion Webdesign
    defineField({ name: 'section2Heading', title: 'Section "Passion Webdesign" — Titre', type: 'string' }),
    defineField({ name: 'section2Body1', title: 'Section "Passion Webdesign" — Paragraphe 1', type: 'text', rows: 3 }),
    defineField({ name: 'section2Body2', title: 'Section "Passion Webdesign" — Paragraphe 2', type: 'text', rows: 3 }),

    // Section 3 — Compétences techniques
    defineField({ name: 'section3Heading', title: 'Section "Compétences techniques" — Titre', type: 'string' }),
    defineField({ name: 'section3Body', title: 'Section "Compétences techniques" — Texte', type: 'text', rows: 4 }),

    // Section 4 — Pourquoi me choisir
    defineField({ name: 'section4Heading', title: 'Section "Pourquoi me choisir" — Titre', type: 'string' }),
    defineField({ name: 'section4Intro', title: 'Section "Pourquoi me choisir" — Intro', type: 'text', rows: 2 }),
    defineField({
      name: 'section4Checklist',
      title: 'Section "Pourquoi me choisir" — Liste de bénéfices',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'section4CtaLabel', title: 'Section "Pourquoi me choisir" — Bouton (lien vers /contact)', type: 'string' }),

    // SEO
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo', rows: 2 }),
  ],
  preview: {
    select: { title: 'heroHeading' },
    prepare({ title }) {
      return { title: title || 'Page À Propos' }
    },
  },
})
