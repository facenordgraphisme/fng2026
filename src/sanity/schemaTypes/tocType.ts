import { defineField, defineType } from 'sanity'

export const tocType = defineType({
  name: 'toc',
  title: 'Table of Contents',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Sommaire',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', type: 'string', title: 'Text' }),
            defineField({ name: 'anchor', type: 'string', title: 'Anchor (without #)' }),
          ],
        },
      ],
    }),
  ],
})
