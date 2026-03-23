import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  buildLangPath,
  getLangFromPath,
  getCanonicalPathname,
} from '../i18n/routing'

const SITE_NAME = 'Bergson Machines'
const DEFAULT_TITLE = SITE_NAME
const DEFAULT_DESCRIPTION = 'Bergson Machines – minikoparki, osprzęt, części i serwis.'
const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://bergsonmachines.pl').replace(/\/$/, '')

const HREFLANG_MAP = {
  pl: 'pl',
  en: 'en',
  ua: 'uk',
}

function upsertMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })

    document.head.appendChild(element)
  }

  element.setAttribute('content', content || '')
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      element.removeAttribute(key)
      return
    }

    element.setAttribute(key, value)
  })
}

function removeTag(selector) {
  const element = document.head.querySelector(selector)
  if (element) {
    element.remove()
  }
}

export function usePageMeta({
  title,
  description,
  image,
  type = 'website',
  noindex = false,
  disableAlternates = false,
  alternates = null,
} = {}) {
  const location = useLocation()
  const alternatesKey = JSON.stringify(alternates || [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    const safeTitle = title || DEFAULT_TITLE
    const safeDescription = description || DEFAULT_DESCRIPTION

    const currentLang = getLangFromPath(location.pathname)
    const canonicalPath = getCanonicalPathname(location.pathname)
    const canonicalUrl = `${SITE_URL}${buildLangPath(currentLang, canonicalPath)}`

    const alternateEntries =
      Array.isArray(alternates) && alternates.length > 0
        ? alternates
        : SUPPORTED_LANGS.map((lang) => ({
            lang,
            href: `${SITE_URL}${buildLangPath(lang, canonicalPath)}`,
          }))

    document.title = safeTitle

    upsertMeta('meta[name="description"]', { name: 'description' }, safeDescription)
    upsertMeta(
      'meta[name="robots"]',
      { name: 'robots' },
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    )

    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, type)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME)
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, safeTitle)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, safeDescription)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl)

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image')
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, safeTitle)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, safeDescription)

    if (image) {
      const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
      upsertMeta('meta[property="og:image"]', { property: 'og:image' }, imageUrl)
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, imageUrl)
    } else {
      removeTag('meta[property="og:image"]')
      removeTag('meta[name="twitter:image"]')
    }

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    })

    SUPPORTED_LANGS.forEach((lang) => {
      removeTag(`link[rel="alternate"][hreflang="${lang}"]`)
      removeTag(`link[rel="alternate"][hreflang="${HREFLANG_MAP[lang] || lang}"]`)
    })
    removeTag('link[rel="alternate"][hreflang="x-default"]')

    if (!disableAlternates && !noindex) {
        alternateEntries.forEach(({ lang, href }) => {
        const hrefLang = HREFLANG_MAP[lang] || lang

        upsertLink(`link[rel="alternate"][hreflang="${hrefLang}"]`, {
          rel: 'alternate',
          hreflang: hrefLang,
          href,
        })
      })

      const defaultAlternate =
        alternateEntries.find((item) => item.lang === DEFAULT_LANG) || alternateEntries[0]

      if (defaultAlternate?.href) {
        upsertLink('link[rel="alternate"][hreflang="x-default"]', {
          rel: 'alternate',
          hreflang: 'x-default',
          href: defaultAlternate.href,
        })
      }
    }
  }, [
    title,
    description,
    image,
    type,
    noindex,
    disableAlternates,
    location.pathname,
    alternatesKey,
  ])
}