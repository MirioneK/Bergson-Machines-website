import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ModelCard.module.css'

export default function ProductCard({
  id,
  titleIdPrefix = 'product',
  to,
  featured = false,
  ariaLabel,
  imageAlt,
  image,
  badge,
  title,
  subtitle,
  specsAriaLabel,
  cardSpecs,
  resolveSpecLabel,
  pricePrefix,
  formattedPrice,
  priceLabel,
  priceBrutto,
  cta,
}) {
  return (
    <Link
      to={to}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      aria-labelledby={`${titleIdPrefix}-${id}-title`}
      aria-label={ariaLabel}
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
          alt={imageAlt}
          className={styles.image}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <h3 className={styles.name} id={`${titleIdPrefix}-${id}-title`}>
            {title}
          </h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </header>

        <ul className={styles.specs} aria-label={specsAriaLabel}>
          {cardSpecs.map(({ key, value }, index) => (
            <li key={`${key}-${index}`} className={styles.specRow}>
              <span className={styles.specKey}>{resolveSpecLabel(key)}</span>
              <span className={styles.specVal}>{value}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <div className={styles.priceLine}>
              <span className={styles.pricePrefix}>{pricePrefix}</span>
              <span className={styles.price}>{formattedPrice}</span>
              <span className={styles.priceLabel}>{priceLabel}</span>
            </div>

            <span className={styles.priceBrutto}>{priceBrutto}</span>
          </div>

          <span className={styles.cta}>{cta}</span>
        </div>
      </div>
    </Link>
  )
}
