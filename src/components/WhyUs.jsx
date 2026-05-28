import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHashScroll } from '../hooks/useHashScroll'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import styles from './WhyUs.module.css'

const PROMISES = [
  {
    id: 'invoice',
    title: 'Faktura VAT, bez gwiazdek',
    desc:
      'Każda sprzedaż jest dokumentowana fakturą VAT bez ukrytych dopłat. Kupujesz na firmę albo prywatnie i od razu wiesz, jaki jest pełny koszt.',
  },
  {
    id: 'warranty',
    title: 'Roczna gwarancja, bez wyjątków',
    desc:
      '12 miesięcy na mechanikę i hydraulikę bez drobnego druku. To nie jest obietnica marketingowa, tylko element standardu sprzedaży.',
  },
  {
    id: 'service',
    title: 'Mobilny serwis w 48 godzinach',
    desc:
      'Technik dojeżdża do Ciebie na budowę, posesję albo do gospodarstwa. Nie tracisz czasu na organizowanie transportu maszyny.',
  },
  {
    id: 'warehouse',
    title: 'Magazyn części w Polsce',
    desc:
      'Najczęściej potrzebne podzespoły trzymamy lokalnie: filtry, uszczelniacze, hydraulikę i elementy robocze. To skraca przestoje do minimum.',
  },
  {
    id: 'financing',
    title: 'Leasing i raty od pierwszego dnia',
    desc:
      'Zamiast blokować cały budżet na start, możesz rozłożyć zakup w czasie. Dzięki temu maszyna zaczyna pracować, zanim spłacisz pierwsze miesiące.',
  },
  {
    id: 'hotline',
    title: 'Linia techniczna po polsku',
    desc:
      'Zanim wyślemy serwis, możesz zadzwonić i opisać problem. Dostajesz kontakt oraz dokumentację w języku polskim, bez improwizacji.',
  },
]

const ICONS = {
  invoice: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 11h5m-5 3h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warranty: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M12 3.5 5.5 6v5.2c0 4.1 2.6 7.8 6.5 9.3 3.9-1.5 6.5-5.2 6.5-9.3V6zM9.3 12.2l1.8 1.8 3.6-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M14 6.5h2a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 16 16.5h-2m-4 0H8A2.5 2.5 0 0 1 5.5 14v-5A2.5 2.5 0 0 1 8 6.5h2m-1.5 5h7M12 4v4m0 8v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warehouse: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5zM12 4v16M4.5 8.5 12 13l7.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  financing: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M12 5.5v13m3-10.5h-4a2 2 0 0 0 0 4h2a2 2 0 1 1 0 4H9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  hotline: (
    <svg viewBox="0 0 24 24" className={styles.iconSvg} aria-hidden="true">
      <path
        d="M4.5 6.5a2 2 0 0 1 2-2h2.7a1 1 0 0 1 .95.68l1.22 3.66a1 1 0 0 1-.5 1.2l-1.73.86a10.1 10.1 0 0 0 4.93 4.93l.86-1.73a1 1 0 0 1 1.2-.5l3.66 1.22a1 1 0 0 1 .68.95v2.7a2 2 0 0 1-2 2h-.7A13.24 13.24 0 0 1 4.5 7.2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function WhyUs() {
  const { t } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()

  const [headerRef, headerVisible] = useReveal()
  const [footerRef, footerVisible] = useReveal()

  const contactLink = langPath('/', '#kontakt')
  const faqLink = langPath('/', '#faq')

  return (
    <section className={styles.section} id="dlaczego" aria-labelledby="whyus-title">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('whyUs.label')}</span>
          <h2 className={styles.title} id="whyus-title">
            Tutaj nie ma niespodzianek.
            <br />
            <span className={styles.titleAccent}>Tylko maszyna, faktura i wsparcie.</span>
          </h2>
          <p className={styles.sub}>
            Kupujesz od firmy z polskim adresem, NIP-em i magazynem części. Dowozimy maszyny pod wskazany adres i jesteśmy dostępni również po sprzedaży, nie tylko przed nią.
          </p>
        </header>

        <div className={styles.cards}>
          {PROMISES.map((card, index) => (
            <WhyCard key={card.id} card={card} delay={140 + index * 90} />
          ))}
        </div>

        <div
          ref={footerRef}
          className={`${styles.footer} reveal ${footerVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '180ms' }}
        >
          <p className={styles.footerText}>
            Każda maszyna przechodzi u nas przegląd przedsprzedażowy: sprawdzamy układy mechaniczne, hydraulikę i przygotowanie do pracy. Po dostawie możesz od razu wejść w robotę.
          </p>

          <div className={styles.actions}>
            <a
              href={contactLink}
              className={styles.primaryCta}
              onClick={(event) => handleHashScroll(event, contactLink)}
            >
              {t('whyUs.ctaPrimary', {
                defaultValue: 'Porozmawiaj z doradcą',
              })}
            </a>
            <a
              href={faqLink}
              className={styles.secondaryCta}
              onClick={(event) => handleHashScroll(event, faqLink)}
            >
              {t('whyUs.ctaSecondary', {
                defaultValue: 'Sprawdź najczęstsze pytania',
              })}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function WhyCard({ card, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.cardIcon}>{ICONS[card.id]}</div>
      <h3 className={styles.cardTitle}>{card.title}</h3>
      <p className={styles.cardDesc}>{card.desc}</p>
    </article>
  )
}
