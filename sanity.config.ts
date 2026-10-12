import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './src/sanity/schemaTypes'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

import { table } from '@sanity/table'

// Singleton pages: one fixed document per type, edited directly rather than
// listed/created like regular content.
const singletonPages = [
  { type: 'homepage', title: 'Page d\'accueil' },
  { type: 'aboutPage', title: 'Page À Propos' },
  { type: 'contactPage', title: 'Page Contact' },
  { type: 'faqPage', title: 'Page FAQ' },
]
const singletonTypes = new Set(singletonPages.map((s) => s.type))

const structure = (S: any) =>
  S.list()
    .title('Contenu')
    .items([
      ...singletonPages.map((s) =>
        S.listItem()
          .title(s.title)
          .id(s.type)
          .child(S.document().schemaType(s.type).documentId(s.type))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter((item: any) => !singletonTypes.has(item.getId())),
    ])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    table(),
  ],
  document: {
    actions: (prevActions: any[], context: any) =>
      singletonTypes.has(context.schemaType)
        ? prevActions.filter((action) => !['unpublish', 'delete', 'duplicate'].includes(action.action))
        : prevActions,
  },
})
