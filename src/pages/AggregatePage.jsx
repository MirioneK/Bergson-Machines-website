import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AGGREGATES, calcBrutto, formatPrice } from '../data'
import { getProductGalleryImages } from '../galleryUtils'
import { useLangPath } from '../hooks/useLangPath'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReveal } from '../hooks/useReveal'
import styles from './ModelPage.module.css'

export default function AggregatePage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const aggregate = AGGREGATES.find((item) => item.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const [breadcrumbRef, breadcrumbVisible] = useReveal()
  const [heroMediaRef, heroMediaVisible] = useReveal()
  const [heroInfoRef, heroInfoVisible] = useReveal()
  const [overviewDescRef, overviewDescVisible] = useReveal()
  const [galleryRef, galleryVisible] = useReveal()
  const [specsHeaderRef, specsHeaderVisible] = useReveal()
  const [otherInnerRef, otherInnerVisible] = useReveal()
  const [ctaBarRef, ctaBarVisible] = useReveal()

  if (!aggregate) return <Navigate to={langPath('/')} replace />

  const name = t(`aggregates.${id}.name`, {
    ns: 'data',
    defaultValue: id,
  })

  const heroSubtitleRaw = t(`aggregates.${id}.heroSubtitle`, {
    ns: 'data',
    defaultValue: t(`aggregates.${id}.subtitle`, {
      ns: 'data',
      defaultValue: '',
    }),
  })
  const heroSubtitle = cleanAggregateHeroSubtitle(heroSubtitleRaw)

  const badge = t(`aggregates.${id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const descriptionRaw = t(`aggregates.${id}.description`, {
    ns: 'data',
    defaultValue: '',
  })
  const description = cleanAggregateDescription(descriptionRaw)

  const quickSpecsRaw = t(`aggregates.${id}.quickSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const featuresRaw = t(`aggregates.${id}.features`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const accordionsRaw = t(`aggregates.${id}.accordions`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const quickSpecs = Array.isArray(quickSpecsRaw)
    ? quickSpecsRaw.filter((item) => item?.key !== 'deliveryTime').slice(0, 4)
    : []
  const features = Array.isArray(featuresRaw) ? featuresRaw : []
  const accordions = Array.isArray(accordionsRaw) ? accordionsRaw : []
  const others = AGGREGATES.filter((item) => item.id !== id)
  const sideImages = getProductGalleryImages(aggregate.image, aggregate.gallery)
  const hasSideGallery = sideImages.length > 0
  const priceBrutto = calcBrutto(aggregate.priceNetto)
  const formattedNetto = formatPrice(aggregate.priceNetto, i18n.resolvedLanguage)
  const formattedBrutto = formatPrice(priceBrutto, i18n.resolvedLanguage)

  usePageMeta({
    title: t('meta.aggregate.title', { name }),
    description: description || t('meta.home.description'),
  })

  return (
    <main className={styles.page}>
      <section className={styles.breadcrumbSection}>
        <div
          ref={breadcrumbRef}
          className={`page-shell ${styles.breadcrumbBar} reveal ${breadcrumbVisible ? 'visible' : ''}`}
        >
          <Link to={langPath('/')} className={styles.breadcrumbLink}>
            {t('aggregatePage.breadcrumb.home')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to={langPath('/', '#agregaty')} className={styles.breadcrumbLink}>
            {t('aggregatePage.breadcrumb.aggregates')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{name}</span>
        </div>
      </section>

      <section className={styles.heroSection}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`page-shell ${styles.heroInner}`}>
          <div
            ref={heroMediaRef}
            className={`${styles.heroMedia} reveal ${heroMediaVisible ? 'visible' : ''}`}
          >
            {badge && (
              <span className={styles.heroBadge}>
                <span className={styles.badgeStar} aria-hidden="true">★</span>
                {badge}
              </span>
            )}

            <div className={styles.heroImageWrap}>
              <img
                src={aggregate.image}
                alt={t('aggregatePage.heroImageAlt', { name })}
                className={styles.heroImage}
              />
            </div>
          </div>

          <div
            ref={heroInfoRef}
            className={`${styles.heroInfo} reveal ${heroInfoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <span className={styles.label}>{t('aggregatePage.heroLabel')}</span>

            <h1 className={styles.heroName}>{name}</h1>
            <p className={styles.heroSubtitle}>{heroSubtitle}</p>

            <div className={styles.priceBlock}>
              <div className={styles.priceNetto}>
                <span className={styles.pricePrefix}>{t('aggregatePage.pricePrefix')}</span>
                {formattedNetto}
                <span className={styles.priceUnit}>{t('aggregatePage.priceNettoUnit')}</span>
              </div>
              <div className={styles.priceBrutto}>
                {t('aggregatePage.priceGross', { price: formattedBrutto })}
              </div>
            </div>

            <div className={styles.quickGrid}>
              {quickSpecs.map(({ key, value }, index) => (
                <QuickSpecCell
                  key={`${key}-${index}`}
                  label={t(`aggregateSpecLabels.${key}`, {
                    ns: 'data',
                    defaultValue: key,
                  })}
                  value={value}
                  delay={180 + index * 80}
                />
              ))}
            </div>

            <div className={styles.heroCtas}>
              <Link to={langPath('/', '#kontakt')} className="btn-primary">
                {t('aggregatePage.actions.contact')}
              </Link>
              <Link to={langPath('/', '#agregaty')} className="btn-outline">
                {t('aggregatePage.actions.allAggregates')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div
          className={`page-shell ${styles.overviewInner} ${!hasSideGallery ? styles.overviewInnerSingle : ''}`}
        >
          <div
            ref={overviewDescRef}
            className={`${styles.descCard} reveal ${overviewDescVisible ? 'visible' : ''}`}
          >
            <h2 className={styles.descTitle}>{t('aggregatePage.overviewTitle', { name })}</h2>
            <p className={styles.descText}>{description}</p>
            {!!features.length && (
              <div className={styles.quickGrid} style={{ marginTop: '24px', marginBottom: 0 }}>
                {features.map((feature, index) => (
                  <QuickSpecCell
                    key={`${feature}-${index}`}
                    label={t('aggregatePage.featureLabel')}
                    value={feature}
                    delay={220 + index * 80}
                  />
                ))}
              </div>
            )}
          </div>

          {hasSideGallery ? (
            <div
              ref={galleryRef}
              className={`${styles.sideGallery} reveal ${galleryVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '120ms' }}
            >
              {sideImages.map((src, index) => (
                <SideGalleryCard
                  key={`${src}-${index}`}
                  src={src}
                  name={name}
                  index={index}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className={`page-shell ${styles.specsInner}`}>
          <header
            ref={specsHeaderRef}
            className={`${styles.specsHeader} reveal ${specsHeaderVisible ? 'visible' : ''}`}
          >
            <span className={styles.label}>{t('aggregatePage.specsLabel')}</span>
            <h2 className={styles.specsTitle}>{t('aggregatePage.specsTitle', { name })}</h2>
          </header>

          <div className={styles.specAccordions}>
            {accordions.map((acc, index) => (
              <RevealAccordion
                key={`${acc.titleKey}-${index}`}
                title={t(`aggregateAccordionTitles.${acc.titleKey}`, {
                  ns: 'data',
                  defaultValue: acc.titleKey,
                })}
                rows={(acc.rows || [])
                  .filter((row) => row?.key !== 'deliveryTime')
                  .map((row) => ({
                    key: row.key,
                    label: t(`aggregateSpecLabels.${row.key}`, {
                      ns: 'data',
                      defaultValue: row.key,
                    }),
                    value: row.value,
                  }))}
                defaultOpen={index === 0}
                delay={120 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.otherSection}>
        <div
          ref={otherInnerRef}
          className={`page-shell ${styles.otherInner} reveal ${otherInnerVisible ? 'visible' : ''}`}
        >
          <span className={styles.otherLabel}>{t('aggregatePage.otherLabel')}</span>

          <div className={styles.otherGrid}>
            {others.map((other, index) => (
              <OtherAggregateCard
                key={other.id}
                other={other}
                delay={120 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBar}>
        <div
          ref={ctaBarRef}
          className={`page-shell ${styles.ctaBarInner} reveal ${ctaBarVisible ? 'visible' : ''}`}
        >
          <div>
            <div className={styles.ctaBarTitle}>
              {t('aggregatePage.ctaBarTitle', { name })}
            </div>
            <div className={styles.ctaBarSub}>
              {t('aggregatePage.ctaBarSub')}
            </div>
          </div>

          <Link to={langPath('/', '#kontakt')} className={styles.ctaBarBtn}>
            {t('aggregatePage.ctaBarButton')}
          </Link>
        </div>
      </section>
    </main>
  )
}

function cleanAggregateHeroSubtitle(text) {
  if (!text) return ''

  return text
    .split('·')
    .map((part) => part.trim())
    .filter((part) => !/dostaw|delivery|достав/i.test(part))
    .join(' · ')
}

function cleanAggregateDescription(text) {
  if (!text) return ''

  return text
    .replace(/([^.?!]*\b(?:dostaw\w*|delivery|достав\w*)\b[^.?!]*[.?!]?)/giu, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;!?])/g, '$1')
    .trim()
}

function QuickSpecCell({ label, value, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.qsCell} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.qsVal}>{value}</div>
      <div className={styles.qsKey}>{label}</div>
    </div>
  )
}

function SideGalleryCard({ src, name, index }) {
  const { t } = useTranslation()
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <div className={styles.galleryCard}>
      <img
        src={imgSrc}
        alt={t('aggregatePage.galleryImageAlt', { name, index: index + 1 })}
        className={styles.galleryImage}
        loading="lazy"
        decoding="async"
        onError={() => {
          if (imgSrc !== src) return
          setImgSrc('/images/optimized/aggregates/aggregate-silent.webp')
        }}
      />
    </div>
  )
}

function RevealAccordion({ title, rows, defaultOpen = false, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Accordion title={title} rows={rows} defaultOpen={defaultOpen} />
    </div>
  )
}

function OtherAggregateCard({ other, delay }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const [ref, visible] = useReveal()

  const name = t(`aggregates.${other.id}.name`, {
    ns: 'data',
    defaultValue: other.id,
  })

  const badge = t(`aggregates.${other.id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const subtitle = t(`aggregates.${other.id}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  })

  return (
    <Link
      ref={ref}
      to={langPath(`/agregaty/${other.id}`)}
      className={`${styles.otherCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.otherImgWrap}>
        <img
          src={other.image}
          alt={t('aggregatePage.otherAggregateImageAlt', { name })}
          className={styles.otherImg}
        />
      </div>

      <div className={styles.otherBody}>
        {badge && (
          <span className={styles.otherBadge}>
            <span className={styles.badgeStar} aria-hidden="true">★</span>
            {badge}
          </span>
        )}

        <div className={styles.otherName}>{name}</div>
        <div className={styles.otherSub}>{subtitle}</div>
        <div className={styles.otherPrice}>
          {t('aggregatePage.otherPrice', {
            price: formatPrice(other.priceNetto, i18n.resolvedLanguage),
          })}
        </div>
        <span className={styles.otherCta}>{t('aggregatePage.otherCta')}</span>
      </div>
    </Link>
  )
}

function Accordion({ title, rows, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`${styles.acc} ${open ? styles.accOpen : ''}`}>
      <button
        type="button"
        className={styles.accHead}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.accIcon}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className={styles.accBody}>
          <div className={styles.specRows}>
            {rows.map(({ key, label, value }, index) => (
              <div key={`${key}-${index}`} className={styles.specRow}>
                <div className={styles.specKey}>{label}</div>
                <div className={styles.specVal}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
