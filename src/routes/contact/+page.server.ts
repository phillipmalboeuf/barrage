
import type { TypeNavigationSkeleton, TypePageSkeleton, TypeQuestionSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { email } from '$lib/clients/postmark'
import { getLocale } from '$lib/paraglide/runtime'


export const load = async ({ request }) => {

  const [question] = await Promise.all([
    content.getEntries<TypeQuestionSkeleton>({ content_type: 'question', include: 10, "fields.id": "contact", locale: { 'fr': 'fr-CA' }[getLocale()] || 'en-CA' }),
  ])

  return {
    question: question.items[0],
  }
}


async function sendEmail(id: string, data: { message: string, name: string, email: string, phone: string }) {
  return await email.sendEmailWithTemplate({
      From: 'info@barragecapital.com',
      To: id === 'already' ? 'client@barragecapital.com' : 'info@barragecapital.com',
      // To: 'phil@phils.computer',
      MessageStream: 'broadcast',
      ReplyTo: data.email as string,
      TemplateAlias: 'base',
      TemplateModel: {
        subject: `${getLocale() === 'fr' ?
         {
          'new': 'Nouveau client',
          'already': 'Déjà client',
          'other': 'Autre'
         }[id] : {
          'new': 'New client',
          'already': 'Already a client',
          'other': 'Other'
         }[id]}`,
        body: `${data.message}<br><br>${data.name} – ${data.email} – ${data.phone || ''}`,
        product_url: "https://barragecapital.com",
        product_name: "https://barragecapital.com",
        company_name: "Barrage Capital",
        company_address: "Barrage Capital"
      }
    })
}

export const actions = {
	new: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await sendEmail("new", data as { message: string, name: string, email: string, phone: string })
	},
  already: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await sendEmail("already", data as { message: string, name: string, email: string, phone: string })
	},
  other: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    return await sendEmail("other", data as { message: string, name: string, email: string, phone: string })
	}
}