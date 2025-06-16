// import { PREVIEW } from '$env/static/private'
import { dev } from '$app/environment'
import { createClient } from 'contentful'

const preview = !!dev
export const content = createClient({
  space: 'rlj5jvoms97w',
  host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  accessToken: preview ? 'bQE3L0ZD-bZxp1qKXG65zOAhf-jMM-nRPLe4y96S-WQ' : 'h6g3LAKFmaBoY2Ojh5luA1sRZXK3iM33PF1vRK1c6RE',
}).withoutUnresolvableLinks