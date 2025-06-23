
import type { TypeNavigationSkeleton, TypePageSkeleton, TypeQuestionSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [question] = await Promise.all([
    content.getEntries<TypeQuestionSkeleton>({ content_type: 'question', include: 10, "fields.id": "contact", locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    question: question.items[0],
  }
}