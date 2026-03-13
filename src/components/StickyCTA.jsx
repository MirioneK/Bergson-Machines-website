import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './StickyCTA.module.css'

export default function StickyCTA() {
  const { pathname, hash } = useLocation()

  const [hideForContact, setHideForContact] = useState(false)
  const [hideForFooter, setHideForFooter] = useState(false)
  const [hideForMenu, setHideForMenu] = useState(
    document.body.classList.contains('nav-menu-open')
  )

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
    <Link
      to="/#kontakt"
      className={`${styles.cta} ${visible ? styles.show : styles.hide}`}
      aria-label="Przejdź do formularza kontaktowego"
    >
      📞 Zadzwoń
    </Link>
  )
}