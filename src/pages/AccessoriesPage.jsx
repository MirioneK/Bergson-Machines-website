import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ACCESSORY_PREVIEW,
  PARTS_PREVIEW,
  calcBrutto,
  formatPrice,
} from '../data'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './AccessoriesPage.module.css'

const PRODUCT_PLACEHOLDER = '/images/placeholders/product-placeholder.png'

function SafeImage({ src, alt, className, fallbackSrc = PRODUCT_PLACEHOLDER }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  useEffect(() => {
    setImgSrc(src || fallbackSrc)
  }, [src, fallbackSrc])

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc)
        }
      }}
    />
  )
}

export default function AccessoriesPage() {
  const { t, i18n } = useTranslation()

  usePageMeta({
    title: t('meta.accessories.title'),
    description: t('meta.accessories.description'),
  })

  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')

  const [heroRef, heroVisible] = useReveal()
  const [filtersRef, filtersVisible] = useReveal()
  const [accessoriesHeaderRef, accessoriesHeaderVisible] = useReveal()
  const [partsHeaderRef, partsHeaderVisible] = useReveal()

  const normalizedSearch = search.trim().toLowerCase()

  const filteredAccessories = useMemo(() => {
    return ACCESSORY_PREVIEW.filter((item) => {
      const name = t(`accessories.${item.id}.name`, {
        ns: 'data',
        defaultValue: item.id,
      })

      return !normalizedSearch || name.toLowerCase().includes(normalizedSearch)
    })
  }, [normalizedSearch, t])

  const filteredParts = useMemo(() => {
    return PARTS_PREVIEW.filter((item) => {
      const name = t(`parts.${item.id}.name`, {
        ns: 'data',
        defaultValue: item.id,
      })

      return !normalizedSearch || name.toLowerCase().includes(normalizedSearch)
    })
  }, [normalizedSearch, t])

  const showAccessories = typeFilter === 'all' || typeFilter === 'accessories'
  const showParts = typeFilter === 'all' || typeFilter === 'parts'

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.bgBase} aria-hidden="true" />
        <div className={styles.bgGrid} aria-hidden="true" />
        <div className={styles.bgGlow} aria-hidden="true" />

        <div
          ref={heroRef}
          className={`page-shell ${styles.heroInner} reveal ${heroVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('accessoriesPage.label')}</span>
          <h1 className={styles.title}>{t('accessoriesPage.title')}</h1>
          <p className={styles.lead}>{t('accessoriesPage.sub')}</p>
        </div>
      </section>

      <section
        ref={filtersRef}
        className={`${styles.filtersSection} reveal ${filtersVisible ? 'visible' : ''}`}
      >
        <div className={`page-shell ${styles.filtersInner}`}>
          <div className={styles.filterGroup}>
            <button
              type="button"
              className={`${styles.filterBtn} ${typeFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setTypeFilter('all')}
            >
              {t('accessoriesPage.filters.all')}
            </button>

            <button
              type="button"
              className={`${styles.filterBtn} ${typeFilter === 'accessories' ? styles.filterBtnActive : ''}`}
              onClick={() => setTypeFilter('accessories')}
            >
              {t('accessoriesPage.filters.accessories')}
            </button>

            <button
              type="button"
              className={`${styles.filterBtn} ${typeFilter === 'parts' ? styles.filterBtnActive : ''}`}
              onClick={() => setTypeFilter('parts')}
            >
              {t('accessoriesPage.filters.parts')}
            </button>
          </div>

          <div className={styles.searchWrap}>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className={styles.searchInput}
              placeholder={t('accessoriesPage.filters.searchPlaceholder')}
            />
          </div>
        </div>
      </section>

      {showAccessories && (
        <section className={styles.productsSection}>
          <div className={`page-shell ${styles.productsInner}`}>
            <header
              ref={accessoriesHeaderRef}
              className={`${styles.productsHeader} reveal ${accessoriesHeaderVisible ? 'visible' : ''}`}
            >
              <span className={styles.label}>{t('accessoriesPage.sections.accessoriesLabel')}</span>
              <h2 className={styles.productsTitle}>
                {t('accessoriesPage.sections.accessoriesTitle')}
              </h2>
              <p className={styles.productsSub}>
                {t('accessoriesPage.sections.accessoriesSub')}
              </p>
            </header>

            {filteredAccessories.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredAccessories.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    nameKey={`accessories.${item.id}.name`}
                    delay={120 + index * 70}
                  />
                ))}
              </div>
            ) : (
              <EmptyState text={t('accessoriesPage.empty')} />
            )}
          </div>
        </section>
      )}

      {showParts && (
        <section className={styles.partsSection}>
          <div className={`page-shell ${styles.productsInner}`}>
            <header
              ref={partsHeaderRef}
              className={`${styles.productsHeader} reveal ${partsHeaderVisible ? 'visible' : ''}`}
            >
              <span className={styles.label}>{t('accessoriesPage.sections.partsLabel')}</span>
              <h2 className={styles.productsTitle}>
                {t('accessoriesPage.sections.partsTitle')}
              </h2>
              <p className={styles.productsSub}>
                {t('accessoriesPage.sections.partsSub')}
              </p>
            </header>

            {filteredParts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredParts.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    nameKey={`parts.${item.id}.name`}
                    delay={120 + index * 70}
                  />
                ))}
              </div>
            ) : (
              <EmptyState text={t('accessoriesPage.partsEmpty')} />
            )}
          </div>
        </section>
      )}
    </main>
  )
}

function ProductCard({ item, nameKey, delay }) {
  const { t, i18n } = useTranslation()
  const [ref, visible] = useReveal()

  const name = t(nameKey, {
    ns: 'data',
    defaultValue: item.id,
  })

  const priceBrutto = calcBrutto(item.priceNetto)

  return (
    <article
      ref={ref}
      className={`${styles.productCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.productMedia}>
        <SafeImage
          src={item.image}
          alt={name}
          className={styles.productImage}
        />
      </div>

      <div className={styles.productBody}>
        <div className={styles.productName}>{name}</div>

        <div className={styles.priceBlock}>
          <div className={styles.priceLine}>
            <span className={styles.productPrice}>
              {formatPrice(item.priceNetto, i18n.resolvedLanguage)}
            </span>
            <span className={styles.priceLabel}>
              {t('accessories.card.priceNettoLabel')}
            </span>
          </div>

          <div className={styles.productPriceBrutto}>
            {t('accessories.card.priceBrutto', {
              price: formatPrice(priceBrutto, i18n.resolvedLanguage),
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

function EmptyState({ text }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateText}>{text}</div>
    </div>
  )
}