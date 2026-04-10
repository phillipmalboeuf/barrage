import type { TypeNavigationSkeleton, TypePageSkeleton, TypeTextSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [text] = await Promise.all([
    content.getEntries<TypeTextSkeleton>({ content_type: 'text', include: 10, "fields.id": "avertissement", locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    text: text.items[0],
  }
}

export const actions = {
	// new: async (event) => {
  //   const data = Object.fromEntries(await event.request.formData())

  //   return await sendEmail("new", data as { message: string, name: string, email: string, phone: string })
	// },
}