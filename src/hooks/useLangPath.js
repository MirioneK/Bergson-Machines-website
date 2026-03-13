import { useLocation } from 'react-router-dom'
import { buildLangPath, getLangFromPath } from '../i18n/routing'

export function useLangPath() {
  const location = useLocation()
  const lang = getLangFromPath(location.pathname)

  return (pathname = '/', hash = '') => buildLangPath(lang, pathname, hash)
}