import React from 'react'
import styles from './Hero.module.css'
import { useReveal } from '../hooks/useReveal'

const STATS = [
  { value: '3', label: 'Modele w ofercie' },
  { value: '24h', label: 'Czas reakcji serwisu' },
  { value: '2 lata', label: 'Gwarancja' },
]

export default function Hero() {
  const [badgeRef, badgeVisible] = useReveal()
  const [titleRef, titleVisible] = useReveal()
  const [leadRef, leadVisible] = useReveal()
  const [actionsRef, actionsVisible] = useReveal()
  const [mediaRef, mediaVisible] = useReveal()

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.bgBase} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`page-shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p
            ref={badgeRef}
            className={`${styles.badge} ${styles.reveal} ${badgeVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '0ms' }}
          >
            Dostawa w Polsce · Gwarancja 2 lata · Serwis mobilny
          </p>

          <h1
            ref={titleRef}
            id="hero-title"
            className={`${styles.title} ${styles.reveal} ${titleVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '80ms' }}
          >
            <span>Profesjonalna</span>
            <span className={styles.titleAccent}>Minikoparka</span>
            <span className={styles.titlePrice}>Od 26 900 zł netto</span>
          </h1>

          <p
            ref={leadRef}
            className={`${styles.lead} ${styles.reveal} ${leadVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '160ms' }}
          >
            Przestań wynajmować. <strong>Kup maszynę, która zwróci się po pierwszym sezonie.</strong>{' '}
            Bergson Machines — pełna obsługa serwisowa, części zawsze na stanie,
            dostawa pod drzwi.
          </p>

          <div
            ref={actionsRef}
            className={`${styles.actions} ${styles.reveal} ${actionsVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '240ms' }}
          >
            <a href="#modele" className="btn-primary">Zobacz modele</a>
            <a href="#kontakt" className="btn-outline">Bezpłatna konsultacja</a>
          </div>

          <ul className={styles.stats} aria-label="Najważniejsze informacje">
            {STATS.map((item, index) => (
              <HeroStat key={item.label} item={item} delay={320 + index * 80} />
            ))}
          </ul>
        </div>

        <div
          ref={mediaRef}
          className={`${styles.media} ${styles.reveal} ${mediaVisible ? styles.visible : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          <div className={styles.mediaInner}>
            <img
              src="/images/hero.png"
              alt="Bergson Machines BM12"
              className={styles.image}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroStat({ item, delay }) {
  const [ref, visible] = useReveal()

  return (
    <li
      ref={ref}
      className={`${styles.statItem} ${styles.reveal} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.statValue}>{item.value}</span>
      <span className={styles.statLabel}>{item.label}</span>
    </li>
  )
}