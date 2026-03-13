import { useEffect } from 'react'

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

export function usePageMeta(title, description) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    document.title = title || 'Bergson Machines'

    upsertMeta(
      'meta[name="description"]',
      { name: 'description' },
      description || ''
    )

    upsertMeta(
      'meta[property="og:title"]',
      { property: 'og:title' },
      title || 'Bergson Machines'
    )

    upsertMeta(
      'meta[property="og:description"]',
      { property: 'og:description' },
      description || ''
    )

    upsertMeta(
      'meta[name="twitter:title"]',
      { name: 'twitter:title' },
      title || 'Bergson Machines'
    )

    upsertMeta(
      'meta[name="twitter:description"]',
      { name: 'twitter:description' },
      description || ''
    )
  }, [title, description])
}