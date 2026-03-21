import React from 'react'
import { useTranslation } from 'react-i18next'
import { WHY_CARDS } from '../data'
import { useLangPath } from '../hooks/useLangPath'
import { useHashScroll } from '../hooks/useHashScroll'
import { useReveal } from '../hooks/useReveal'
import styles from './WhyUs.module.css'

export default function WhyUs() {
  const { t } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()

  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  const contactLink = langPath('/', '#kontakt')

  return (
    <section className={styles.section} id="dlaczego" aria-labelledby="whyus-title">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`page-shell ${styles.inner}`}>
        <div
          ref={leftRef}
          className={`${styles.copy} reveal ${leftVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('whyUs.label')}</span>

          <h2 className={styles.title} id="whyus-title">
            {t('whyUs.titleLine1')}
            <br />
            {t('whyUs.titleLine2')}
          </h2>

          <p className={styles.sub}>{t('whyUs.sub')}</p>

          <a
            href={contactLink}
            className={styles.cta}
            onClick={(event) => handleHashScroll(event, contactLink)}
          >
            {t('whyUs.cta')}
          </a>
        </div>

        <div
          ref={rightRef}
          className={`${styles.cards} reveal ${rightVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          {WHY_CARDS.map((card, index) => (
            <WhyCard
              key={card.id}
              id={card.id}
              icon={card.icon}
              delay={200 + index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyCard({ id, icon, delay }) {
  const { t } = useTranslation()
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.cardIcon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.cardTitle}>{t(`whyUs.cards.${id}.title`)}</h3>
      <p className={styles.cardDesc}>{t(`whyUs.cards.${id}.desc`)}</p>
    </article>
  )
}