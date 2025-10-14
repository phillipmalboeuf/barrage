import { POSTMARK_KEY } from '$env/static/private'
import { ServerClient } from 'postmark'

export const email = new ServerClient(POSTMARK_KEY)