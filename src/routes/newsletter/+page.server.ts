
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

export const actions = {
	register: async (event) => {
    const data = Object.fromEntries(await event.request.formData())

    console.log(data)

    // Mailchimp subscription endpoint
    const mailchimpUrl = 'https://barragecapital.us6.list-manage.com/subscribe/post'
    
    // You'll need to replace these with your actual Mailchimp u and id values
    // These can be found in your Mailchimp signup form HTML
    const u = 'c8017893c2e7addc08670d498' // Replace with actual user ID
    const id = 'b6f6ca8b74' // Replace with actual list ID
    
    // Prepare form data for Mailchimp
    const mailchimpData = new URLSearchParams({
      u: u,
      id: id,
      MERGE0: data.email as string,
      MERGE1: data['first-name'] as string || '',
      MERGE2: data['last-name'] as string || '',
      MERGE3: data['phone'] as string || '',
      [`group[17545][${getLocale() === 'fr' ? '2' : '1'}]`]: '1',
    })

    try {
      const response = await fetch(mailchimpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: mailchimpData
      })

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed to newsletter!'
        }
      } else {
        console.error('Mailchimp subscription failed:', response.status, response.statusText)
        return {
          success: false,
          message: 'Failed to subscribe to newsletter. Please try again.'
        }
      }
    } catch (error) {
      console.error('Error subscribing to Mailchimp:', error)
      return {
        success: false,
        message: 'An error occurred while subscribing. Please try again.'
      }
    }
	},
}