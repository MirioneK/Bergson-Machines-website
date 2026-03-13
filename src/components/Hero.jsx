import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import styles from './Hero.module.css'
import { useReveal } from '../hooks/useReveal'
import { useLangPath } from '../hooks/useLangPath'

export default function Hero() {
  const { t } = useTranslation()
  const langPath = useLangPath()

  const [badgeRef, badgeVisible] = useReveal()
  const [titleRef, titleVisible] = useReveal()
  const [leadRef, leadVisible] = useReveal()
  const [actionsRef, actionsVisible] = useReveal()
  const [mediaRef, mediaVisible] = useReveal()

  const stats = t('hero.stats', { returnObjects: true })

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
            {t('hero.badge')}
          </p>

          <h1
            ref={titleRef}
            id="hero-title"
            className={`${styles.title} ${styles.reveal} ${titleVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '80ms' }}
          >
            <span>{t('hero.titleLine1')}</span>
            <span className={styles.titleAccent}>{t('hero.titleLine2')}</span>
            <span className={styles.titlePrice}>{t('hero.titlePrice')}</span>
          </h1>

          <p
            ref={leadRef}
            className={`${styles.lead} ${styles.reveal} ${leadVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '160ms' }}
          >
            <Trans
              i18nKey="hero.lead"
              components={{ strong: <strong /> }}
            />
          </p>

          <div
            ref={actionsRef}
            className={`${styles.actions} ${styles.reveal} ${actionsVisible ? styles.visible : ''}`}
            style={{ transitionDelay: '240ms' }}
          >
            <a href={langPath('/', '#modele')} className="btn-primary">
              {t('hero.actions.models')}
            </a>
            <a href={langPath('/', '#kontakt')} className="btn-outline">
              {t('hero.actions.consultation')}
            </a>
          </div>

          <ul className={styles.stats} aria-label={t('hero.statsAriaLabel')}>
            {stats.map((item, index) => (
              <HeroStat key={`${item.value}-${index}`} item={item} delay={320 + index * 80} />
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
              alt={t('hero.imageAlt')}
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