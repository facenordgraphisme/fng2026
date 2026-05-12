import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'role',
      title: 'Titre / Rôle',
      type: 'string',
      description: 'Ex : Développeur web & graphiste — Hautes-Alpes (05)',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie courte',
      type: 'text',
      rows: 3,
      description: 'Apparaît sous chaque article de blog. Idéalement 60-80 mots.',
    }),
    defineField({
      name: 'linkedin',
      title: 'URL LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'website',
      title: 'URL du site',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
