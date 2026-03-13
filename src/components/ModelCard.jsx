import React from 'react'
import { Link } from 'react-router-dom'
import { calcBrutto } from '../data'
import styles from './ModelCard.module.css'

const SPEC_LABEL_MAP = {
  'Masa robocza': 'Masa robocza',
  'Silnik': 'Silnik',
  'Głębokość kopania': 'Głęb. kopania',
  'Szerokość gąsienicy': 'Szer. gąsienicy',
  'Kabina': 'Kabina',
}

const CARD_SPEC_ORDER = [
  'Masa robocza',
  'Silnik',
  'Głębokość kopania',
  'Kabina',
  'Szerokość gąsienicy',
]

function getCardSpecs(specs) {
  const byLabel = new Map(specs.map((item) => [item.label, item.value]))

  return CARD_SPEC_ORDER
    .filter((label) => byLabel.has(label))
    .slice(0, 4)
    .map((label) => ({
      label: SPEC_LABEL_MAP[label] ?? label,
      value: byLabel.get(label),
    }))
}

function formatPriceCompact(amount) {
  return amount.toLocaleString('pl-PL') + ' zł'
}

export default function ModelCard({ model }) {
  const { id, name, subtitle, image, badge, priceNetto, specs } = model
  const priceBrutto = calcBrutto(priceNetto)
  const cardSpecs = getCardSpecs(specs)

  return (
    <Link
      to={`/modele/${id}`}
      className={styles.card}
      aria-labelledby={`model-${id}-title`}
      aria-label={`Poznaj model ${name}`}
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
          alt={`${name} minikoparka`}
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

        <ul className={styles.specs} aria-label={`Specyfikacja modelu ${name}`}>
          {cardSpecs.map(({ label, value }) => (
            <li key={label} className={styles.specRow}>
              <span className={styles.specKey}>{label}</span>
              <span className={styles.specVal}>{value}</span>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <div className={styles.priceLine}>
              <span className={styles.pricePrefix}>od</span>
              <span className={styles.price}>{formatPriceCompact(priceNetto)}</span>
              <span className={styles.priceLabel}>NETTO</span>
            </div>
            <span className={styles.priceBrutto}>
              od {formatPriceCompact(priceBrutto)} brutto
            </span>
          </div>

          <span className={styles.cta}>
            Poznaj model
          </span>
        </div>
      </div>
    </Link>
  )
}