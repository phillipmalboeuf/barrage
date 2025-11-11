import type { Handle } from '@sveltejs/kit';
import { sequence } from "@sveltejs/kit/hooks"
import { paraglideMiddleware } from '$lib/paraglide/server';

export const cache: Handle = async ({ event, resolve }) => {

	const response = await resolve(event);

  response.headers.set('Vercel-CDN-Cache-Control', 'max-age=3600000');
  response.headers.set('Cache-Control', 'max-age=3600000');
  response.headers.set('Etag', `"${process.env.VERCEL_URL || 'dev'}"`);

	return response;
};

const handleParaglide: Handle = ({ event, resolve }) => paraglideMiddleware(event.request, ({ request, locale }) => {
	event.request = request;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
	});
});

export const handle: Handle = sequence(handleParaglide, cache);
