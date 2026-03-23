import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet,
  useParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Nav from './components/Nav'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

import HomePage from './pages/HomePage'
import ModelPage from './pages/ModelPage'
import LegalPage from './pages/LegalPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AccessoriesPage from './pages/AccessoriesPage'
import NotFoundPage from './pages/NotFoundPage'

import {
  DEFAULT_LANG,
  getPreferredLang,
  isSupportedLang,
  getDomIdFromHash,
  getLocalizedRouteVariants,
} from './i18n/routing'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  const { lang } = useParams()

  useEffect(() => {
    if (hash) {
      const id = getDomIdFromHash(hash, lang)

      const scrollToHash = () => {
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
      }

      const raf = window.requestAnimationFrame(scrollToHash)
      return () => window.cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash, lang])

  return null
}

function LangLayout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!isSupportedLang(lang)) return

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }

    document.documentElement.lang = lang === 'ua' ? 'uk' : lang
  }, [lang, i18n])

  if (!isSupportedLang(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />
  }

  return (
    <div className="app-shell">
      <ScrollManager />
      <Nav />
      <div className="app-main">
        <Outlet />
      </div>
      <Footer />
      <StickyCTA />
    </div>
  )
}

function RootRedirect() {
  const preferredLang = getPreferredLang()
  return <Navigate to={`/${preferredLang}`} replace />
}

const modelRouteVariants = getLocalizedRouteVariants('/modele')
const warrantyRouteVariants = getLocalizedRouteVariants('/gwarancja')
const returnsRouteVariants = getLocalizedRouteVariants('/zwroty-i-reklamacje')
const deliveryRouteVariants = getLocalizedRouteVariants('/dostawa')
const termsRouteVariants = getLocalizedRouteVariants('/regulamin')
const paymentRouteVariants = getLocalizedRouteVariants('/formy-platnosci')
const privacyRouteVariants = getLocalizedRouteVariants('/polityka-prywatnosci')
const blogRouteVariants = getLocalizedRouteVariants('/blog')
const accessoriesRouteVariants = getLocalizedRouteVariants('/osprzet')

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />

      <Route path="/:lang" element={<LangLayout />}>
        <Route index element={<HomePage />} />

        {blogRouteVariants.map((slug) => (
          <Route
            key={`blog-${slug}`}
            path={slug}
            element={<BlogPage />}
          />
        ))}

        {blogRouteVariants.map((slug) => (
          <Route
            key={`blog-post-${slug}`}
            path={`${slug}/:slug`}
            element={<BlogPostPage />}
          />
        ))}

        {modelRouteVariants.map((slug) => (
          <Route
            key={`models-${slug}`}
            path={`${slug}/:id`}
            element={<ModelPage />}
          />
        ))}

        {warrantyRouteVariants.map((slug) => (
          <Route
            key={`warranty-${slug}`}
            path={slug}
            element={<LegalPage pageKey="gwarancja" />}
          />
        ))}

        {returnsRouteVariants.map((slug) => (
          <Route
            key={`returns-${slug}`}
            path={slug}
            element={<LegalPage pageKey="zwroty-i-reklamacje" />}
          />
        ))}

        {deliveryRouteVariants.map((slug) => (
          <Route
            key={`delivery-${slug}`}
            path={slug}
            element={<LegalPage pageKey="dostawa" />}
          />
        ))}

        {termsRouteVariants.map((slug) => (
          <Route
            key={`terms-${slug}`}
            path={slug}
            element={<LegalPage pageKey="regulamin" />}
          />
        ))}

        {paymentRouteVariants.map((slug) => (
          <Route
            key={`payment-${slug}`}
            path={slug}
            element={<LegalPage pageKey="formy-platnosci" />}
          />
        ))}

        {privacyRouteVariants.map((slug) => (
          <Route
            key={`privacy-${slug}`}
            path={slug}
            element={<LegalPage pageKey="polityka-prywatnosci" />}
          />
        ))}

        {accessoriesRouteVariants.map((slug) => (
          <Route
            key={`accessories-${slug}`}
            path={slug}
            element={<AccessoriesPage />}
          />
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="*" element={<Navigate to={`/${DEFAULT_LANG}`} replace />} />
    </Routes>
  )
}