import React, { useEffect, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '../data'
import { AGGREGATES_CATALOG, monthlyLeaseNet } from '../data/aggregatesCatalog'
import { useLangPath } from '../hooks/useLangPath'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReveal } from '../hooks/useReveal'
import styles from './AggregateDetailPage.module.css'

export default function AggregateDetailPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const item = AGGREGATES_CATALOG.find((i) => i.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const [breadcrumbRef, breadcrumbVisible] = useReveal()
  const [heroMediaRef, heroMediaVisible] = useReveal()
  const [heroInfoRef, heroInfoVisible] = useReveal()
  const [specsRef, specsVisible] = useReveal()
  const [otherInnerRef, otherInnerVisible] = useReveal()
  const [ctaBarRef, ctaBarVisible] = useReveal()

  const others = useMemo(() => {
    if (!item) return []

    const sameBand = AGGREGATES_CATALOG.filter((i) => i.id !== item.id && i.band === item.band)
    if (sameBand.length >= 4) return sameBand.slice(0, 4)

    const sameEngine = AGGREGATES_CATALOG.filter(
      (i) => i.id !== item.id && i.engine === item.engine && !sameBand.includes(i)
    )

    return [...sameBand, ...sameEngine].slice(0, 4)
  }, [item])

  if (!item) return <Navigate to={langPath('/agregaty')} replace />

  const fmt = (v) => formatPrice(v, i18n.resolvedLanguage)
  const name = `${t('aggregates.unitName')} ${item.name} ${item.engine}`
  const priceLease = fmt(monthlyLeaseNet(item.priceGross))

  usePageMeta({
    title: t('meta.aggregateDetail.title', { name }),
    description: t('meta.aggregateDetail.description', {
      name,
      engine: item.engine,
      kw: item.kw,
      price: fmt(item.priceGross),
    }),
  })

  const specRows = [
    { key: 'specPower', value: `${item.kw} kW / ${item.kva}` },
    { key: 'specEngine', value: `${item.engine}${item.engineModel ? ` ${item.engineModel}` : ''}` },
    { key: 'specAlternator', value: item.alternator },
    { key: 'specWeight', value: `${item.weight} kg` },
    {
      key: 'specCooling',
      value: item.cooling === 'air' ? t('aggregateDetailPage.coolingAir') : t('aggregateDetailPage.coolingLiquid'),
    },
    { key: 'specAts', value: item.ats ? t('aggregateDetailPage.atsYes') : t('aggregateDetailPage.atsNo') },
  ]

  return (
    <main className={styles.page}>
      <section className={styles.breadcrumbSection}>
        <div
          ref={breadcrumbRef}
          className={`page-shell ${styles.breadcrumbBar} reveal ${breadcrumbVisible ? 'visible' : ''}`}
        >
          <Link to={langPath('/')} className={styles.breadcrumbLink}>
            {t('aggregateDetailPage.breadcrumbHome')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to={langPath('/agregaty')} className={styles.breadcrumbLink}>
            {t('aggregateDetailPage.breadcrumbCatalog')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{name}</span>
        </div>
      </section>

      <section className={styles.heroSection}>
        <div className={`page-shell ${styles.heroInner}`}>
          <div
            ref={heroMediaRef}
            className={`${styles.heroMedia} reveal ${heroMediaVisible ? 'visible' : ''}`}
          >
            <span className={styles.heroBadge}>
              {item.ats ? t('aggregatesCatalog.badgeAts') : t('aggregatesCatalog.badgeAirCooled')}
            </span>

            <div className={styles.heroImageWrap}>
              <img src={item.image} alt={name} className={styles.heroImage} />
            </div>
          </div>

          <div
            ref={heroInfoRef}
            className={`${styles.heroInfo} reveal ${heroInfoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <span className={styles.label}>{t('aggregateDetailPage.heroLabel')}</span>
            <h1 className={styles.heroName}>{name}</h1>

            <div className={styles.priceBlock}>
              <div className={styles.priceGross}>{fmt(item.priceGross)}</div>
              <div className={styles.priceSub}>
                {t('aggregateDetailPage.priceGrossSuffix')} ·{' '}
                {t('aggregateDetailPage.leaseFrom', { price: priceLease })}
              </div>
              {item.priceTbc && <div className={styles.priceTbc}>{t('aggregateDetailPage.priceTbcNote')}</div>}
            </div>

            <div className={styles.quickGrid}>
              {specRows.slice(0, 4).map((row) => (
                <div key={row.key} className={styles.qsCell}>
                  <div className={styles.qsVal}>{row.value}</div>
                  <div className={styles.qsKey}>{t(`aggregateDetailPage.${row.key}`)}</div>
                </div>
              ))}
            </div>

            <div className={styles.heroCtas}>
              <Link to={langPath('/', '#kontakt')} state={{ machine: item.id }} className="btn-primary">
                {t('aggregateDetailPage.ctaOffer')}
              </Link>
              <Link to={langPath('/', '#leasing')} state={{ calcModel: item.id }} className="btn-outline">
                {t('aggregateDetailPage.ctaInstallment')}
              </Link>
            </div>

            <Link to={langPath('/agregaty')} className={styles.backLink}>
              ← {t('aggregateDetailPage.backToCatalog')}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.specsSection}>
        <div
          ref={specsRef}
          className={`page-shell ${styles.specsInner} reveal ${specsVisible ? 'visible' : ''}`}
        >
          <h2 className={styles.specsTitle}>{t('aggregateDetailPage.specsTitle')}</h2>
          <div className={styles.specRows}>
            {specRows.map((row) => (
              <div key={row.key} className={styles.specRow}>
                <div className={styles.specKey}>{t(`aggregateDetailPage.${row.key}`)}</div>
                <div className={styles.specVal}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className={styles.otherSection}>
          <div
            ref={otherInnerRef}
            className={`page-shell ${styles.otherInner} reveal ${otherInnerVisible ? 'visible' : ''}`}
          >
            <span className={styles.otherLabel}>{t('aggregateDetailPage.otherLabel')}</span>

            <div className={styles.otherGrid}>
              {others.map((other) => (
                <OtherAggregateCard key={other.id} other={other} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.ctaBar}>
        <div
          ref={ctaBarRef}
          className={`page-shell ${styles.ctaBarInner} reveal ${ctaBarVisible ? 'visible' : ''}`}
        >
          <div>
            <div className={styles.ctaBarTitle}>{t('aggregateDetailPage.ctaBarTitle', { name })}</div>
            <div className={styles.ctaBarSub}>{t('aggregateDetailPage.ctaBarSub')}</div>
          </div>

          <Link to={langPath('/', '#kontakt')} state={{ machine: item.id }} className={styles.ctaBarBtn}>
            {t('aggregateDetailPage.ctaBarButton')}
          </Link>
        </div>
      </section>
    </main>
  )
}

function OtherAggregateCard({ other }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const name = `${t('aggregates.unitName')} ${other.name} ${other.engine}`

  return (
    <Link to={langPath(`/agregaty/${other.id}`)} className={styles.otherCard}>
      <div className={styles.otherImgWrap}>
        <img src={other.image} alt={name} className={styles.otherImg} />
      </div>

      <div className={styles.otherBody}>
        <div className={styles.otherName}>{name}</div>
        <div className={styles.otherSub}>{other.kw} kW / {other.kva}</div>
        <div className={styles.otherPrice}>{formatPrice(other.priceGross, i18n.resolvedLanguage)}</div>
        <span className={styles.otherCta}>{t('aggregateDetailPage.ctaOffer')}</span>
      </div>
    </Link>
  )
}
