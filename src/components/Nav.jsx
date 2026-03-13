import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'

const NAV_LINKS = [
  { to: '/#modele', label: 'Modele' },
  { to: '/#serwis', label: 'Serwis' },
  { to: '/#faq', label: 'FAQ' },
]

const LANGUAGES = [
  { code: 'PL', htmlLang: 'pl' },
  { code: 'ENG', htmlLang: 'en' },
  { code: 'UA', htmlLang: 'uk' },
]

const WHATSAPP_URL = 'https://wa.me/48600507816'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('site-language') || 'PL'
  })

  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    localStorage.setItem('site-language', language)

    const selected = LANGUAGES.find((item) => item.code === language)
    if (selected) {
      document.documentElement.lang = selected.htmlLang
    }

    window.dispatchEvent(
      new CustomEvent('languagechange', {
        detail: { language },
      })
    )
  }, [language])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = previousOverflow
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
  setMenuOpen(false)
}, [location.pathname, location.hash])

useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : ''

  return () => {
    document.body.style.overflow = ''
  }
}, [menuOpen])

useEffect(() => {
  document.body.classList.toggle('nav-menu-open', menuOpen)

  return () => {
    document.body.classList.remove('nav-menu-open')
  }
}, [menuOpen])

useEffect(() => {
  const media = window.matchMedia('(min-width: 1025px)')

  const closeMenuForDesktop = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const handleChange = (event) => {
    if (event.matches) {
      closeMenuForDesktop()
    }
  }

  if (media.matches) {
    closeMenuForDesktop()
  }

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }

  media.addListener(handleChange)
  return () => media.removeListener(handleChange)
}, [])

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Nawigacja główna"
      >
        <div className={`page-shell ${styles.inner}`}>
          <Link to="/" className={styles.logo} aria-label="Bergson Machines">
            <img
              src="/logo.svg"
              alt="Bergson Machines"
              className={styles.logoImage}
            />
          </Link>

          <ul className={styles.links}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className={`${styles.actions} ${menuOpen ? styles.actionsHidden : ''}`}>
            <div
              className={styles.langSwitch}
              role="group"
              aria-label="Wybór języka"
            >
              {LANGUAGES.map(({ code }) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.langBtn} ${
                    language === code ? styles.langBtnActive : ''
                  }`}
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                >
                  {code}
                </button>
              ))}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCta}
              aria-label="Napisz na WhatsApp"
            >
              <WhatsAppIcon className={styles.whatsappIcon} />
              <span>Napisz na WhatsApp</span>
            </a>

            <Link to="/#kontakt" className={styles.cta}>
              Skontaktuj się
            </Link>

            <button
              type="button"
              className={styles.burger}
              aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
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
              aria-label="Wybór języka"
            >
              {LANGUAGES.map(({ code }) => (
                <button
                  key={code}
                  type="button"
                  className={`${styles.langBtn} ${
                    language === code ? styles.langBtnActive : ''
                  }`}
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <ul className={styles.mobileLinks}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.mobileLink}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileWhatsappCta}
            aria-label="Napisz na WhatsApp"
          >
            <WhatsAppIcon className={styles.whatsappIcon} />
            <span>Napisz na WhatsApp</span>
          </a>

          <Link to="/#kontakt" className={styles.mobileCta}>
            Skontaktuj się
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