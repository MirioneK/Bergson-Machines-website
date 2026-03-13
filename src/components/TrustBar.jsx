import React from 'react'
import { useTranslation } from 'react-i18next'
import { TRUST_ITEMS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './TrustBar.module.css'

export default function TrustBar() {
  const { t } = useTranslation()

  return (
    <section className={styles.bar} aria-label={t('trustBar.ariaLabel')}>
      <div className={`page-shell ${styles.inner}`}>
        {TRUST_ITEMS.map((item, index) => (
          <TrustItem
            key={item.id}
            icon={item.icon}
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
        <span>{icon}</span>
      </span>
      <span className={styles.text}>{text}</span>
    </div>
  )
}