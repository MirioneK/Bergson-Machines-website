import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { calcBrutto, formatPrice } from '../data'
import { useLangPath } from '../hooks/useLangPath'
import styles from './ModelCard.module.css'

export default function ModelCard({ model }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const { id, name, image, priceNetto } = model
  const priceBrutto = calcBrutto(priceNetto)

  const subtitle = t(`models.${id}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  })

  const badge = t(`models.${id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const cardSpecsRaw = t(`models.${id}.cardSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const cardSpecs = Array.isArray(cardSpecsRaw) ? cardSpecsRaw : []

  return (
    <Link
      to={langPath(`/modele/${id}`)}
      className={styles.card}
      aria-labelledby={`model-${id}-title`}
      aria-label={t('modelCard.ariaLabel', { name })}
    >
      {badge && (
        <span className={styles.badge}>
          <span className={styles.badgeStar} aria-hidden="true">★</span>
          {badge}
        </span>
      )}

      <div className={styles.media}>
        <img
          src={image}
          alt={t('modelCard.imageAlt', { name })}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.name} id={`model-${id}-title`}>
            {name}
          </h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <ul className={styles.specs} aria-label={t('modelCard.specsAriaLabel', { name })}>
          {cardSpecs.map(({ key, value }, index) => (
            <li key={`${key}-${index}`} className={styles.specRow}>
              <span className={styles.specKey}>
                {t(`modelCard.specLabels.${key}`, {
                  defaultValue: key,
                })}
              </span>
              <span className={styles.specVal}>{value}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <div className={styles.priceLine}>
              <span className={styles.pricePrefix}>{t('modelCard.pricePrefix')}</span>
              <span className={styles.price}>{formatPrice(priceNetto, i18n.resolvedLanguage)}</span>
              <span className={styles.priceLabel}>{t('modelCard.priceNettoLabel')}</span>
            </div>
            <span className={styles.priceBrutto}>
              {t('modelCard.priceBrutto', {
                price: formatPrice(priceBrutto, i18n.resolvedLanguage),
              })}
            </span>
          </div>

          <span className={styles.cta}>
            {t('modelCard.cta')}
          </span>
        </div>
      </div>
    </Link>
  )
}