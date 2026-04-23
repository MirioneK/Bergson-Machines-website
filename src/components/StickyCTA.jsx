import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './StickyCTA.module.css'

const PHONE_NUMBER_RAW = '537493696'
const PHONE_NUMBER_TEL = '+48537493696'

function getInitialMenuState() {
  if (typeof document === 'undefined') return false
  return document.body.classList.contains('nav-menu-open')
}

export default function StickyCTA() {
  const { t } = useTranslation()
  const { pathname, hash } = useLocation()

  const [hideForContact, setHideForContact] = useState(false)
  const [hideForFooter, setHideForFooter] = useState(false)
  const [hideForMenu, setHideForMenu] = useState(getInitialMenuState)

  useEffect(() => {
    let contactObserver = null
    let footerObserver = null
    let raf = null

    const setupObservers = () => {
      const contact = document.getElementById('kontakt')
      const footer = document.querySelector('footer')

      setHideForContact(false)
      setHideForFooter(false)

      if (contact) {
        contactObserver = new IntersectionObserver(
          ([entry]) => {
            setHideForContact(entry.isIntersecting)
          },
          {
            threshold: 0.15,
          }
        )

        contactObserver.observe(contact)
      }

      if (footer) {
        footerObserver = new IntersectionObserver(
          ([entry]) => {
            setHideForFooter(entry.isIntersecting)
          },
          {
            threshold: 0.05,
          }
        )

        footerObserver.observe(footer)
      }
    }

    raf = window.requestAnimationFrame(setupObservers)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      if (contactObserver) contactObserver.disconnect()
      if (footerObserver) footerObserver.disconnect()
    }
  }, [pathname, hash])

  useEffect(() => {
    const body = document.body

    const updateMenuState = () => {
      setHideForMenu(body.classList.contains('nav-menu-open'))
    }

    updateMenuState()

    const observer = new MutationObserver(updateMenuState)
    observer.observe(body, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const visible = !(hideForContact || hideForFooter || hideForMenu)

  return (
    <a
      href={`tel:${PHONE_NUMBER_TEL}`}
      className={`${styles.cta} ${visible ? styles.show : styles.hide}`}
      aria-label={t('stickyCta.ariaLabel', { phone: PHONE_NUMBER_RAW })}
    >
      📞 {t('stickyCta.label')}
    </a>
  )
}