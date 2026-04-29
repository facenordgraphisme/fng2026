import { defineField, defineType } from 'sanity'

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ Accordion',
  type: 'object',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre (Optionnel)',
      type: 'string',
      description: 'Titre de la section FAQ (ex: Foire Aux Questions)',
    }),
    defineField({
      name: 'items',
      title: 'Questions & Réponses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: Rule => Rule.required() },
            { name: 'answer', type: 'text', title: 'Réponse', validation: Rule => Rule.required() },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'answer',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      return {
        title: title || 'Bloc FAQ',
        subtitle: items ? `${items.length} question(s)` : 'Aucune question',
      }
    },
  },
})
