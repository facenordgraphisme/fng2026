import { type SchemaTypeDefinition } from 'sanity'
import { postType } from './postType'
import { serviceType } from './serviceType'
import { projectType } from './projectType'
import { legalType } from './legalType'
import { faqType } from './faqType'
import { authorType } from './authorType'
import { tocType } from './tocType'
import { spokeCardType } from './spokeCardType'
import { cityPageType } from './cityPageType'
import { homepageType } from './homepageType'
import { aboutPageType } from './aboutPageType'
import { contactPageType } from './contactPageType'
import { faqPageType } from './faqPageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType, serviceType, projectType, legalType, faqType, authorType, tocType, spokeCardType, cityPageType,
    homepageType, aboutPageType, contactPageType, faqPageType,
  ],
}
