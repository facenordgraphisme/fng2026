import { defineField, defineType } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project (Portfolio)',
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
      options: { source: 'title' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'imageUrl',
      title: 'Image URL (override)',
      type: 'string',
      description: 'URL directe de l\'image principale (remplace mainImage si renseigné).',
    }),
    defineField({
      name: 'galleryUrls',
      title: 'Gallery URLs (override)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'URLs directes des images de la galerie (remplace gallery si renseigné).',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Étiquettes du projet (ex: E-Commerce, Tourisme outdoor, Restaurant…)',
    }),
    defineField({
      name: 'sector',
      title: 'Secteur d\'activité',
      type: 'string',
      description: 'Secteur du client (ex: Restauration gastronomique, Sports outdoor…)',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
    }),
    defineField({
      name: 'relatedSlugs',
      title: 'Projets similaires (slugs)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slugs des projets à afficher dans "Autres réalisations".',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      description: 'Titre de la page pour les moteurs de recherche (laisse vide pour utiliser le titre du projet). Idéalement entre 50 et 60 caractères.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      description: 'Description pour les moteurs de recherche (laisse vide pour utiliser la description courte). Idéalement entre 150 et 160 caractères.',
    }),
  ],
})
