import { defineField, defineType } from 'sanity'

export const cityPageType = defineType({
  name: 'cityPage',
  title: 'Page Ville',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name: 'city', title: 'Nom de la ville', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: { source: 'city', maxLength: 96 },
    }),
    defineField({ name: 'headline', title: 'H1 (titre principal)', type: 'string' }),
    defineField({ name: 'intro', title: 'Phrase d\'accroche (sous le H1)', type: 'text', rows: 2 }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Citation', value: 'blockquote' },
            { title: 'Capsule', value: 'capsule' },
          ],
        },
        { type: 'faq' },
        { type: 'spokeCard' },
      ],
    }),
    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo' }),
  ],
  preview: {
    select: { title: 'city', subtitle: 'headline' },
  },
})
