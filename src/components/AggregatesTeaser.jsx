import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import { AGGREGATES_CATALOG } from '../data/aggregatesCatalog'
import { formatPrice } from '../data'
import styles from './AggregatesTeaser.module.css'

export default function AggregatesTeaser() {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const [cardRef, cardVisible] = useReveal()

  const minPrice = Math.min(...AGGREGATES_CATALOG.map((item) => item.priceGross))

  return (
    <section className={styles.section} id="agregaty" aria-labelledby="aggregates-title">
      <div className={`page-shell ${styles.inner}`}>
        <article
          ref={cardRef}
          className={`${styles.card} reveal ${cardVisible ? 'visible' : ''}`}
        >
          <div className={styles.media}>
            <img
              src="/images/optimized/aggregates/aggregate-silent.webp"
              alt={t('aggregates.title')}
              className={styles.image}
              loading="lazy"
            />
          </div>

          <div className={styles.body}>
            <span className={styles.label}>{t('aggregates.label')}</span>
            <h2 className={styles.title} id="aggregates-title">
              {t('aggregates.title')}
            </h2>
            <p className={styles.sub}>{t('aggregates.sub')}</p>
            <p className={styles.priceFrom}>
              {t('aggregates.priceFrom', { price: formatPrice(minPrice, i18n.resolvedLanguage) })}
            </p>

            <Link to={langPath('/agregaty')} className={styles.cta}>
              {t('aggregates.cta')}
            </Link>
          </div>
        </article>
      </div>
    </section>
  )
}
