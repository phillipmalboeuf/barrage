import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'
import { error, redirect } from '@sveltejs/kit'

export const GET = async ({ params }) => {
  const { id } = params

  console.log(id.replace(/-/g, ' '))

  const doc = await content.getAssets({
    'fields.title[match]': id.replace(/-/g, ' '),
    locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA'
  })

  console.log(doc)

  if (doc.items.length === 0) {
    throw error(404, 'Document non trouvé')
  }

  return redirect(302, encodeURI(doc.items[0].fields.file.url))
}