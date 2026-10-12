import { defineField, defineType } from 'sanity'

export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Page Contact',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name: 'eyebrow', title: 'Badge', type: 'string' }),
    defineField({ name: 'heading', title: 'Titre (H1)', type: 'string' }),
    defineField({ name: 'introParagraph', title: 'Paragraphe d\'intro', type: 'text', rows: 3 }),

    defineField({ name: 'phoneLabel', title: 'Téléphone — Libellé', type: 'string' }),
    defineField({ name: 'phoneNumber', title: 'Téléphone — Numéro affiché', type: 'string' }),
    defineField({ name: 'phoneHref', title: 'Téléphone — Lien tel: (ex: tel:0651113928)', type: 'string' }),

    defineField({ name: 'emailLabel', title: 'Email — Libellé', type: 'string' }),
    defineField({ name: 'emailAddress', title: 'Email — Adresse', type: 'string' }),

    defineField({ name: 'addressLabel', title: 'Adresse — Libellé', type: 'string' }),
    defineField({
      name: 'addressLines',
      title: 'Adresse — Lignes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'mapsUrl', title: 'Adresse — URL Google Maps', type: 'string' }),
    defineField({ name: 'mapsLinkLabel', title: 'Adresse — Libellé du lien Maps', type: 'string' }),

    defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', group: 'seo', rows: 2 }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Page Contact' }
    },
  },
})
