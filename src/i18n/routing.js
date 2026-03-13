export const SUPPORTED_LANGS = ['pl', 'en', 'ua']
export const DEFAULT_LANG = 'pl'

const ROUTE_TRANSLATIONS = {
  '/modele': {
    pl: 'modele',
    en: 'models',
    ua: 'models',
  },
  '/gwarancja': {
    pl: 'gwarancja',
    en: 'warranty',
    ua: 'warranty',
  },
  '/zwroty-i-reklamacje': {
    pl: 'zwroty-i-reklamacje',
    en: 'returns-and-complaints',
    ua: 'returns-and-complaints',
  },
  '/dostawa': {
    pl: 'dostawa',
    en: 'delivery',
    ua: 'delivery',
  },
  '/regulamin': {
    pl: 'regulamin',
    en: 'terms',
    ua: 'terms',
  },
  '/formy-platnosci': {
    pl: 'formy-platnosci',
    en: 'payment-methods',
    ua: 'payment-methods',
  },
  '/polityka-prywatnosci': {
    pl: 'polityka-prywatnosci',
    en: 'privacy-policy',
    ua: 'privacy-policy',
  },
}

const HASH_TRANSLATIONS = {
  '#hero': {
    pl: 'hero',
    en: 'hero',
    ua: 'hero',
  },
  '#modele': {
    pl: 'modele',
    en: 'models',
    ua: 'models',
  },
  '#galeria': {
    pl: 'galeria',
    en: 'gallery',
    ua: 'gallery',
  },
  '#akcesoria': {
    pl: 'akcesoria',
    en: 'accessories',
    ua: 'accessories',
  },
  '#dlaczego': {
    pl: 'dlaczego',
    en: 'why-us',
    ua: 'why-us',
  },
  '#obiekcje': {
    pl: 'obiekcje',
    en: 'objections',
    ua: 'objections',
  },
  '#jak-kupic': {
    pl: 'jak-kupic',
    en: 'how-to-buy',
    ua: 'how-to-buy',
  },
  '#serwis': {
    pl: 'serwis',
    en: 'service',
    ua: 'service',
  },
  '#faq': {
    pl: 'faq',
    en: 'faq',
    ua: 'faq',
  },
  '#kontakt': {
    pl: 'kontakt',
    en: 'contact',
    ua: 'contact',
  },
}

export function isSupportedLang(lang) {
  return SUPPORTED_LANGS.includes(lang)
}

export function getLangFromPath(pathname = '') {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return isSupportedLang(firstSegment) ? firstSegment : DEFAULT_LANG
}

export function stripLangFromPath(pathname = '') {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length && isSupportedLang(segments[0])) {
    segments.shift()
  }

  return segments.length ? `/${segments.join('/')}` : '/'
}

function getLocalizedStaticPath(pathname = '/', lang = DEFAULT_LANG) {
  const safeLang = isSupportedLang(lang) ? lang : DEFAULT_LANG
  const strippedPath = stripLangFromPath(pathname)

  if (strippedPath === '/') return ''

  const routeKeys = Object.keys(ROUTE_TRANSLATIONS).sort((a, b) => b.length - a.length)

  for (const routeKey of routeKeys) {
    if (strippedPath === routeKey) {
      return `/${ROUTE_TRANSLATIONS[routeKey][safeLang]}`
    }

    if (strippedPath.startsWith(`${routeKey}/`)) {
      const rest = strippedPath.slice(routeKey.length)
      return `/${ROUTE_TRANSLATIONS[routeKey][safeLang]}${rest}`
    }
  }

  return strippedPath === '/' ? '' : strippedPath
}

function getLocalizedHash(hash = '', lang = DEFAULT_LANG) {
  if (!hash) return ''

  const safeLang = isSupportedLang(lang) ? lang : DEFAULT_LANG
  const translation = HASH_TRANSLATIONS[hash]

  if (!translation) return hash

  return `#${translation[safeLang]}`
}

export function buildLangPath(lang, pathname = '/', hash = '') {
  const safeLang = isSupportedLang(lang) ? lang : DEFAULT_LANG
  const localizedPath = getLocalizedStaticPath(pathname, safeLang)
  const localizedHash = getLocalizedHash(hash, safeLang)

  return `/${safeLang}${localizedPath}${localizedHash}`
}

export function getPreferredLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG

  const saved = localStorage.getItem('site-language')

  const savedMap = {
    PL: 'pl',
    ENG: 'en',
    UA: 'ua',
    pl: 'pl',
    en: 'en',
    ua: 'ua',
  }

  const savedLang = savedMap[saved]
  if (savedLang) return savedLang

  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase()

  if (browserLang.startsWith('pl')) return 'pl'
  if (browserLang.startsWith('en')) return 'en'
  if (browserLang.startsWith('uk')) return 'ua'
  if (browserLang.startsWith('ua')) return 'ua'

  return DEFAULT_LANG
}

export function getDomIdFromHash(hash = '', lang = DEFAULT_LANG) {
  if (!hash) return ''

  const raw = hash.replace('#', '')
  const safeLang = isSupportedLang(lang) ? lang : DEFAULT_LANG

  for (const [canonicalHash, translations] of Object.entries(HASH_TRANSLATIONS)) {
    if (translations[safeLang] === raw) {
      return canonicalHash.replace('#', '')
    }
  }

  return raw
}

export function getLocalizedRouteVariants(routeKey) {
  const config = ROUTE_TRANSLATIONS[routeKey]
  if (!config) return []

  return [...new Set(Object.values(config))]
}