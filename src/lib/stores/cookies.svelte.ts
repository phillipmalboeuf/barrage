/** Keep in sync with the consent bootstrap script in `src/app.html`. */
export const COOKIE_CONSENT_STORAGE_KEY = 'barrage_cookie_consent'

export type CookieConsent = 'pending' | 'allowed' | 'refused'

export const cookiesState = $state({
  visible: false,
  consent: 'pending' as CookieConsent,
})

export const openCookiesDialog = () => {
  cookiesState.visible = true
}

export const closeCookiesDialog = () => {
  cookiesState.visible = false
}

type GtagConsentArg = Record<string, string>

function gtagConsentUpdate(granted: boolean) {
  if (typeof window === 'undefined') return
  const w = window as Window & {
    gtag?: (command: string, action: string, params: GtagConsentArg) => void
  }
  if (typeof w.gtag !== 'function') return
  const v = granted ? 'granted' : 'denied'
  w.gtag('consent', 'update', {
    ad_storage: v,
    analytics_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    personalization_storage: v,
  })
}

export function initCookieConsent() {
  if (typeof localStorage === 'undefined') return

  const raw = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)

  if (raw === 'allowed') {
    cookiesState.consent = 'allowed'
    cookiesState.visible = false
    return
  }

  if (raw === 'refused') {
    cookiesState.consent = 'refused'
    cookiesState.visible = false
    return
  }

  cookiesState.consent = 'pending'
  openCookiesDialog()
}

export function allowCookies() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'allowed')
  }
  cookiesState.consent = 'allowed'
  gtagConsentUpdate(true)
  closeCookiesDialog()
}

export function refuseCookies() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, 'refused')
  }
  cookiesState.consent = 'refused'
  gtagConsentUpdate(false)
  closeCookiesDialog()
}

/** Set when the user dismisses the avertissement dialog; cleared for the next browser session. */
export const AVERTISSEMENT_SESSION_STORAGE_KEY = 'barrage_avertissement_dismissed'

export const avertissementState = $state({
  visible: false,
})

/** Call from the client when `page.url.search` changes: show by default with query string unless dismissed this session. */
export function syncAvertissementVisibility(hasSearchParams: boolean) {
  if (typeof sessionStorage === 'undefined') {
    avertissementState.visible = false
    return
  }
  if (!hasSearchParams) {
    avertissementState.visible = false
    return
  }
  if (sessionStorage.getItem(AVERTISSEMENT_SESSION_STORAGE_KEY) === '1') {
    avertissementState.visible = false
  } else {
    avertissementState.visible = true
  }
}

export const openAvertissementDialog = () => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.removeItem(AVERTISSEMENT_SESSION_STORAGE_KEY)
  }
  avertissementState.visible = true
}

export const closeAvertissementDialog = () => {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem(AVERTISSEMENT_SESSION_STORAGE_KEY, '1')
  }
  avertissementState.visible = false
}
