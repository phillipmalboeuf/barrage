
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 3, "fields.id": getLocale() === 'fr' ? "accueil" : "home", locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    page: page.items[0],
  }
}