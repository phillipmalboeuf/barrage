
import type { TypeFormSkeleton, TypeNavigationSkeleton, TypePageSkeleton, TypeQuestionSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [forms] = await Promise.all([
    content.getEntries<TypeFormSkeleton>({ content_type: 'form', include: 10, "fields.id": "newsletter", locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    form: forms.items[0],
  }
}