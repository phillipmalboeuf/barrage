import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { error, redirect } from '@sveltejs/kit'
import { getLocale } from '$lib/paraglide/runtime'
import { email } from '$lib/clients/postmark'

export const load = async ({ params }) => {
  const [pages] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 3, 
      "fields.id": params.id, 
      locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA'
    }),
  ])

  if (pages.items.length === 0) {
    const otherPages = await content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 3, 
      "fields.id": params.id, 
      locale: { 'fr': 'en-CA' }[getLocale()] || 'fr-CA'
    })

    if (otherPages.items.length === 0) {
      throw error(404, 'Page non trouvée')
    }

    const translatedPage = await content.getEntry<TypePageSkeleton>(otherPages.items[0].sys.id, {
      locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA'
    })

    return redirect(302, `${translatedPage.fields.id}`)
  }

  return {
    page: pages.items[0],
  }
}