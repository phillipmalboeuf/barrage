import type { TypeFormSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime.js'
import { redirect } from '@sveltejs/kit'
import type { Entry, Tag } from 'contentful'

export const load = async ({ request, cookies, url }) => {

  const [navigations, tags, newsletterForm] = await Promise.all([
    content.getEntries<TypeNavigationSkeleton>({ content_type: 'navigation', include: 3, locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
    content.getTags(),
    content.getEntries<TypeFormSkeleton>({ content_type: 'form', "fields.id": "newsletter", include: 2, locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    navigations: {
      ...navigations.items.reduce((navs, nav) => {
        return {
          ...navs,
          [nav.fields.id]: nav
        }
      }, {} as {[id: string]: Entry<TypeNavigationSkeleton, 'WITHOUT_UNRESOLVABLE_LINKS'>}),
    },
    tags: tags.items.reduce((ts, tag) => {
      return {
        ...ts,
        [tag.sys.id]: tag
      }
    }, {} as {[id: string]: Tag}),
    newsletterForm: newsletterForm.items[0]
  }
}