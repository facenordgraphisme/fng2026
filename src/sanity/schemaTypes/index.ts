import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { serviceType } from './serviceType'
import { projectType } from './projectType'

import { legalType } from './legalType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, serviceType, projectType, legalType],
}
