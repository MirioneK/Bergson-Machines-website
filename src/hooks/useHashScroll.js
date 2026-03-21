import { useLocation } from 'react-router-dom'
import { getDomIdFromHash, getLangFromPath } from '../i18n/routing'

export function useHashScroll() {
  const location = useLocation()

  return (event, to) => {
    if (typeof window === 'undefined') return
    if (!to || typeof to !== 'string') return

    const targetUrl = new URL(to, window.location.origin)

    const samePath = targetUrl.pathname === location.pathname
    const sameHash = Boolean(targetUrl.hash) && targetUrl.hash === location.hash

    if (!samePath || !sameHash) return

    event.preventDefault()

    const lang = getLangFromPath(targetUrl.pathname)
    const id = getDomIdFromHash(targetUrl.hash, lang)
    const element = document.getElementById(id)

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}