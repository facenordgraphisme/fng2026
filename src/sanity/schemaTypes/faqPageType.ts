import { defineField, defineType } from 'sanity'

export const faqPageType = defineType({
  name: 'faqPage',
  title: 'Page FAQ',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name: 'eyebrow', title: 'Badge', type: 'string' }),
    defineField({ name: 'heading', title: 'Titre (H1)', type: 'string' }),
    defineField({ name: 'introParagraph', title: 'Paragraphe d\'intro', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Questions & Réponses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            { name: 'answer', type: 'text', title: 'Réponse', rows: 4, validation: Rule => Rule.required() },
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
          },
        },
      ],
    }),
    defineField({ name: 'closingHeading', title: 'Bloc de clôture — Titre', type: 'string' }),
    defineField({ name: 'closingParagraph', title: 'Bloc de clôture — Paragraphe', type: 'text', rows: 2 }),
    defineField({ name: 'closingCtaLabel', title: 'Bloc de clôture — Bouton (lien vers /contact)', type: 'string' }),

    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo', rows: 2 }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare({ title, items }) {
      return {
        title: title || 'Page FAQ',
        subtitle: items ? `${items.length} question(s)` : undefined,
      }
    },
  },
})
