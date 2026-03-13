import React from 'react'
import { TRUST_ITEMS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './TrustBar.module.css'

export default function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Najważniejsze korzyści">
      <div className={`page-shell ${styles.inner}`}>
        {TRUST_ITEMS.map((item, index) => (
          <TrustItem
            key={item.text}
            icon={item.icon}
            text={item.text}
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