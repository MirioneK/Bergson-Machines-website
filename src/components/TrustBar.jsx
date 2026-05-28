import React from 'react'
import { useTranslation } from 'react-i18next'
import { TRUST_ITEMS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './TrustBar.module.css'

const TRUST_ICONS = {
  mobileService: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        d="M14 6.5h2a2.5 2.5 0 0 1 2.5 2.5v5A2.5 2.5 0 0 1 16 16.5h-2m-4 0H8A2.5 2.5 0 0 1 5.5 14v-5A2.5 2.5 0 0 1 8 6.5h2m-1.5 5h7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 4v4m0 8v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  stockParts: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 4v16M4.5 8.5 12 13l7.5-4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        d="M3.5 7.5h10v7h-10zm10 2h3l2 2v3h-5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="17.5" r="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ),
  vatInvoice: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
      <path
        d="M7 3.5h7l4 4v13H7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 3.5v4h4M9.5 11h5m-5 3h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  financing: (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.iconSvg}>
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
}

export default function TrustBar() {
  const { t } = useTranslation()

  return (
    <section className={styles.bar} aria-label={t('trustBar.ariaLabel')}>
      <div className={`page-shell ${styles.inner}`}>
        {TRUST_ITEMS.map((item, index) => (
          <TrustItem
            key={item.id}
            icon={TRUST_ICONS[item.id]}
            text={t(`trustBar.items.${item.id}`)}
            delay={index * 80}
          />
        ))}
      </div>
    </section>
  )
}

function TrustItem({ icon, text, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.item} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.text}>{text}</span>
    </div>
  )
}
