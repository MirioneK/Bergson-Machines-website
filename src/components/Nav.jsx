import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { buildLangPath, getLangFromPath } from '../i18n/routing'
import { useLangPath } from '../hooks/useLangPath'
import styles from './Nav.module.css'
import { useHashScroll } from '../hooks/useHashScroll'
import { getPostAlternates } from '../lib/blog'

const NAV_LINKS = [
  { key: 'nav.models', type: 'section', path: '/', hash: '#modele' },
  { key: 'nav.service', type: 'section', path: '/', hash: '#serwis' },
  { key: 'nav.faq', type: 'section', path: '/', hash: '#faq' },
  { key: 'nav.accessories', type: 'page', path: '/osprzet' },
  { key: 'nav.blog', type: 'page', path: '/blog' },
]

const LANGUAGES = [
  { code: 'pl', label: 'PL', htmlLang: 'pl' },
  { code: 'en', label: 'ENG', htmlLang: 'en' },
  // { code: 'ua', label: 'UA', htmlLang: 'uk' },
]

const WHATSAPP_URL = 'https://wa.me/48600507816'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()
  const blogPostMatch = useMatch('/:lang/blog/:slug')

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const currentLang = useMemo(() => {
    return getLangFromPath(location.pathname)
  }, [location.pathname])

  const sectionLinks = useMemo(
    () => NAV_LINKS.filter((item) => item.type === 'section'),
    []
  )

  const pageLinks = useMemo(
    () => NAV_LINKS.filter((item) => item.type === 'page'),
    []
  )

  const mobileLinks = useMemo(
    () => [...sectionLinks, ...pageLinks],
    [sectionLinks, pageLinks]
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang)
    }

    const selected = LANGUAGES.find((item) => item.code === currentLang)
    document.documentElement.lang = selected?.htmlLang || 'pl'

    const storageMap = {
      pl: 'PL',
      en: 'ENG',
      ua: 'UA',
    }

    localStorage.setItem('site-language', storageMap[currentLang] || 'PL')
  }, [currentLang, i18n])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    document.body.classList.toggle('nav-menu-open', menuOpen)

    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('nav-menu-open')
    }
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1025px)')

    const handleChange = (event) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    if (media.matches) {
      setMenuOpen(false)
    }

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }

    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  const goToLanguage = (nextLang) => {
    if (nextLang === currentLang) return

    const currentBlogSlug = blogPostMatch?.params?.slug

    if (currentBlogSlug) {
      const alternates = getPostAlternates(currentLang, currentBlogSlug)
      const targetPost = alternates.find((item) => item.lang === nextLang)

      if (targetPost) {
        navigate(buildLangPath(nextLang, `/blog/${targetPost.slug}`))
        return
      }
    }

    const target = buildLangPath(nextLang, location.pathname, location.hash)
    navigate(target)
  }

  const homeLink = langPath('/')
  const contactLink = langPath('/', '#kontakt')

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label={t('nav.ariaLabel')}
      >
        <div className={`page-shell ${styles.inner}`}>
          <Link
            to={homeLink}
            className={styles.logo}
            aria-label={t('nav.logoAriaLabel')}
          >
            <img
              src="/logo.svg"
              alt="Bergson Machines"
              className={styles.logoImage}
            />
          </Link>

          <div className={styles.navGroups}>
            <ul className={`${styles.links} ${styles.sectionLinks}`}>
              {sectionLinks.map(({ key, path, hash }) => {
                const to = langPath(path, hash)

                return (
                  <li key={key}>
                    <Link
                      to={to}
                      className={`${styles.link} ${styles.sectionLink}`}
                      onClick={(event) => handleHashScroll(event, to)}
                    >
                      {t(key)}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <ul className={`${styles.links} ${styles.pageLinks}`}>
              {pageLinks.map(({ key, path, hash }) => (
                <li key={key}>
                  <Link
                    to={langPath(path, hash)}
                    className={`${styles.link} ${styles.pageLink}`}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${styles.actions} ${menuOpen ? styles.actionsHidden : ''}`}>
            <div
              className={styles.langSwitch}
              role="group"
              aria-label={t('nav.language')}
            >
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.langBtn} ${
                    currentLang === code ? styles.langBtnActive : ''
                  }`}
                  onClick={() => goToLanguage(code)}
                  aria-pressed={currentLang === code}
                >
                  {label}
                </button>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCta}
              aria-label={t('nav.whatsapp')}
            >
              <WhatsAppIcon className={styles.whatsappIcon} />
              <span>{t('nav.whatsapp')}</span>
            </a>

            <Link
              to={contactLink}
              className={styles.cta}
              onClick={(event) => handleHashScroll(event, contactLink)}
            >
              {t('nav.contact')}
            </Link>

            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineTopOpen : ''}`} />
              <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineMiddleOpen : ''}`} />
              <span className={`${styles.burgerLine} ${menuOpen ? styles.burgerLineBottomOpen : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileTop}>
            <div
              className={styles.mobileLangSwitch}
              role="group"
              aria-label={t('nav.language')}
            >
              {LANGUAGES.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.langBtn} ${
                    currentLang === code ? styles.langBtnActive : ''
                  }`}
                  onClick={() => goToLanguage(code)}
                  aria-pressed={currentLang === code}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <ul className={styles.mobileLinks}>
            {mobileLinks.map(({ key, path, hash, type }) => {
              const to = langPath(path, hash)

              return (
                <li key={key}>
                  <Link
                    to={to}
                    className={styles.mobileLink}
                    onClick={type === 'section' ? (event) => handleHashScroll(event, to) : undefined}
                  >
                    {t(key)}
                  </Link>
                </li>
              )
            })}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileWhatsappCta}
            aria-label={t('nav.whatsapp')}
          >
            <WhatsAppIcon className={styles.whatsappIcon} />
            <span>{t('nav.whatsapp')}</span>
          </a>

          <Link
            to={contactLink}
            className={styles.mobileCta}
            onClick={(event) => handleHashScroll(event, contactLink)}
          >
            {t('nav.contact')}
          </Link>
        </div>
      </div>
    </>
  )
}

function WhatsAppIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M16.04 3C8.86 3 3.03 8.74 3.03 15.82c0 2.27.61 4.48 1.77 6.42L3 29l6.98-1.81a13.2 13.2 0 0 0 6.06 1.46h.01c7.18 0 13.01-5.74 13.01-12.82C29.06 8.74 23.23 3 16.04 3Zm0 23.53h-.01a10.9 10.9 0 0 1-5.56-1.52l-.4-.24-4.14 1.07 1.11-4.01-.26-.41a10.64 10.64 0 0 1-1.66-5.6c0-5.9 4.88-10.7 10.9-10.7 2.91 0 5.65 1.11 7.71 3.13a10.54 10.54 0 0 1 3.2 7.57c0 5.9-4.89 10.71-10.89 10.71Zm5.98-7.98c-.33-.16-1.94-.95-2.24-1.06-.3-.11-.52-.16-.73.16-.22.31-.84 1.05-1.03 1.26-.19.21-.37.24-.7.08-.33-.16-1.38-.5-2.64-1.58-.97-.83-1.62-1.85-1.81-2.16-.19-.31-.02-.48.14-.64.15-.14.33-.37.49-.55.16-.18.22-.31.33-.52.11-.21.05-.39-.03-.55-.08-.16-.73-1.74-1-2.38-.26-.62-.53-.53-.73-.54h-.62c-.21 0-.55.08-.84.39-.3.31-1.13 1.1-1.13 2.69 0 1.59 1.16 3.13 1.32 3.34.16.21 2.27 3.58 5.5 5.02.77.33 1.37.53 1.84.68.77.24 1.47.21 2.02.13.62-.09 1.94-.79 2.21-1.56.27-.77.27-1.43.19-1.56-.08-.13-.3-.21-.63-.37Z" />
    </svg>
  )
}