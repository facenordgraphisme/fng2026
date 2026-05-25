import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
        defineField({ name: 'caption', type: 'string', title: 'Légende' }),
        defineField({ name: 'externalUrl', type: 'url', title: 'URL externe (si non uploadée dans Sanity)' }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'Capsule', value: 'capsule' },
            { title: 'Citation', value: 'citation' },
          ],
        },
        {
          type: 'image',
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Texte alternatif' }),
            defineField({ name: 'caption', type: 'string', title: 'Légende' }),
            defineField({ name: 'externalUrl', type: 'url', title: 'URL externe (si non uploadée dans Sanity)' }),
          ],
        },
        { type: 'table' },
        { type: 'faq' },
        { type: 'toc' },
        { type: 'spokeCard' },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Titre de la page pour les moteurs de recherche (laisse vide pour utiliser le titre de l\'article). Idéalement entre 50 et 60 caractères.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Description pour les moteurs de recherche (laisse vide pour utiliser l\'extrait de l\'article). Idéalement entre 150 et 160 caractères.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
