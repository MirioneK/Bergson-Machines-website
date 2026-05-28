import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcBrutto, formatPrice } from '../data'
import { useLangPath } from '../hooks/useLangPath'
import {
  getModelCardSpecs,
  getModelContentId,
  getModelText,
} from '../modelPresentation'
import ProductCard from './ProductCard'
import styles from './ModelCard.module.css'

export default function ModelCard({ model }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const { id, name, image, priceNetto, comingSoon } = model
  const contentId = getModelContentId(id)

  const subtitle = getModelText(id, i18n.resolvedLanguage, 'subtitle', t(`models.${contentId}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  }))

  const badge = getModelText(id, i18n.resolvedLanguage, 'badge', t(`models.${contentId}.badge`, {
    ns: 'data',
    defaultValue: '',
  }))

  const description = getModelText(id, i18n.resolvedLanguage, 'description', t(`models.${contentId}.description`, {
    ns: 'data',
    defaultValue: '',
  }))

  const cardSpecsRaw = t(`models.${contentId}.cardSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const cardSpecs = getModelCardSpecs(
    id,
    i18n.resolvedLanguage,
    Array.isArray(cardSpecsRaw) ? cardSpecsRaw : []
  )

  if (comingSoon) {
    const comingSoonBadge = t(`models.${id}.comingSoonBadge`, {
      ns: 'data',
      defaultValue: t('modelCard.comingSoon.badge'),
    })

    const comingSoonListRaw = t(`models.${id}.comingSoonList`, {
      ns: 'data',
      returnObjects: true,
      defaultValue: t('modelCard.comingSoon.list', { returnObjects: true }),
    })

    const comingSoonList = Array.isArray(comingSoonListRaw) ? comingSoonListRaw : []

    const comingSoonCta = t(`models.${id}.comingSoonCta`, {
      ns: 'data',
      defaultValue: t('modelCard.comingSoon.cta'),
    })

    return (
      <article
        className={`${styles.card} ${styles.comingSoonCard}`}
        aria-labelledby={`model-${id}-title`}
      >
        <div className={`${styles.media} ${styles.comingSoonMedia}`} aria-hidden="true">
          {image ? (
            <img
              src={image}
              alt=""
              className={`${styles.image} ${styles.comingSoonImage}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.comingSoonPlaceholder}>
              <div className={styles.comingSoonGlow} />
              <div className={styles.comingSoonMark}>+</div>
            </div>
          )}

          <span className={styles.comingSoonBadge}>{comingSoonBadge}</span>
        </div>

        <div className={styles.body}>
          <header className={styles.header}>
            <h3 className={styles.name} id={`model-${id}-title`}>
              {name}
            </h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>

          {description && <p className={styles.comingSoonDesc}>{description}</p>}

          {comingSoonList.length > 0 && (
            <ul className={styles.comingSoonList}>
              {comingSoonList.map((item, index) => (
                <li key={`${id}-coming-soon-${index}`}>{item}</li>
              ))}
            </ul>
          )}

          <div className={styles.footer}>
            <span className={`${styles.cta} ${styles.ctaGhost}`}>
              {comingSoonCta}
            </span>
          </div>
        </div>
      </article>
    )
  }

  const priceBrutto = calcBrutto(priceNetto)

  return (
    <ProductCard
      id={id}
      titleIdPrefix="model"
      to={langPath(`/modele/${id}`)}
      ariaLabel={t('modelCard.ariaLabel', { name })}
      imageAlt={t('modelCard.imageAlt', { name })}
      image={image}
      badge={badge}
      title={name}
      subtitle={subtitle}
      specsAriaLabel={t('modelCard.specsAriaLabel', { name })}
      cardSpecs={cardSpecs}
      resolveSpecLabel={(key) =>
        t(`modelCard.specLabels.${key}`, {
          defaultValue: key,
        })
      }
      pricePrefix={t('modelCard.pricePrefix')}
      formattedPrice={formatPrice(priceNetto, i18n.resolvedLanguage)}
      priceLabel={t('modelCard.priceNettoLabel')}
      priceBrutto={t('modelCard.priceBrutto', {
        price: formatPrice(priceBrutto, i18n.resolvedLanguage),
      })}
      cta={t('modelCard.cta')}
    />
  )
}
