import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'
import {
  MODELS,
  ACCESSORY_PREVIEW,
  formatPrice,
  calcBrutto,
} from '../data'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import styles from './ModelPage.module.css'

const ACCESSORY_PLACEHOLDER = '/images/placeholders/product-placeholder.png'

function SafeImage({ src, alt, className, fallbackSrc = ACCESSORY_PLACEHOLDER }) {
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

export default function ModelPage() {
  const { id } = useParams()
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const model = MODELS.find((m) => m.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const [breadcrumbRef, breadcrumbVisible] = useReveal()
  const [heroMediaRef, heroMediaVisible] = useReveal()
  const [heroInfoRef, heroInfoVisible] = useReveal()
  const [overviewDescRef, overviewDescVisible] = useReveal()
  const [specsHeaderRef, specsHeaderVisible] = useReveal()
  const [drawingRef, drawingVisible] = useReveal()
  const [accessoriesHeaderRef, accessoriesHeaderVisible] = useReveal()
  const [otherInnerRef, otherInnerVisible] = useReveal()
  const [ctaBarRef, ctaBarVisible] = useReveal()

  if (!model) return <Navigate to={langPath('/')} replace />

  const others = MODELS.filter((m) => m.id !== id && m.id !== 'upcoming')
  const priceBrutto = calcBrutto(model.priceNetto)

  const modelSubtitle = t(`models.${id}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  })

  const modelBadge = t(`models.${id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const modelDescription = t(`models.${id}.description`, {
    ns: 'data',
    defaultValue: '',
  })

  const quickSpecsRaw = t(`models.${id}.cardSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const quickSpecs = Array.isArray(quickSpecsRaw) ? quickSpecsRaw.slice(0, 4) : []

  const accordionsRaw = t(`models.${id}.accordions`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const accordions = Array.isArray(accordionsRaw) ? accordionsRaw : []

  const sideImages =
    model.gallery && model.gallery.length >= 2
      ? model.gallery.slice(0, 2)
      : [model.image, model.image]

  const formattedNetto = formatPrice(model.priceNetto, i18n.resolvedLanguage)
  const formattedBrutto = formatPrice(priceBrutto, i18n.resolvedLanguage)

  usePageMeta({
    title: t('meta.model.title', { name: model.name }),
    description: modelDescription || t('meta.home.description'),
  })

  return (
    <main className={styles.page}>
      <section className={styles.breadcrumbSection}>
        <div
          ref={breadcrumbRef}
          className={`page-shell ${styles.breadcrumbBar} reveal ${breadcrumbVisible ? 'visible' : ''}`}
        >
          <Link to={langPath('/')} className={styles.breadcrumbLink}>
            {t('modelPage.breadcrumb.home')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to={langPath('/', '#modele')} className={styles.breadcrumbLink}>
            {t('modelPage.breadcrumb.models')}
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{model.name}</span>
        </div>
      </section>

      <section className={styles.heroSection}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`page-shell ${styles.heroInner}`}>
          <div
            ref={heroMediaRef}
            className={`${styles.heroMedia} reveal ${heroMediaVisible ? 'visible' : ''}`}
          >
            {modelBadge && (
              <span className={styles.heroBadge}>
                <span className={styles.badgeStar} aria-hidden="true">★</span>
                {modelBadge}
              </span>
            )}

            <div className={styles.heroImageWrap}>
              <img
                src={model.image}
                alt={t('modelPage.heroImageAlt', { name: model.name })}
                className={styles.heroImage}
              />
            </div>
          </div>

          <div
            ref={heroInfoRef}
            className={`${styles.heroInfo} reveal ${heroInfoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <span className={styles.label}>{t('modelPage.heroLabel')}</span>

            <h1 className={styles.heroName}>{model.name}</h1>
            <p className={styles.heroSubtitle}>{modelSubtitle}</p>

            <div className={styles.priceBlock}>
              <div className={styles.priceNetto}>
                <span className={styles.pricePrefix}>{t('modelPage.pricePrefix')}</span>
                {formattedNetto}
                <span className={styles.priceUnit}>{t('modelPage.priceNettoUnit')}</span>
              </div>
              <div className={styles.priceBrutto}>
                {t('modelPage.priceGross', { price: formattedBrutto })}
              </div>
            </div>

            <div className={styles.quickGrid}>
              {quickSpecs.map(({ key, value }, index) => (
                <QuickSpecCell
                  key={`${key}-${index}`}
                  label={t(`modelSpecs.${key}`, {
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
                {t('modelPage.actions.contact')}
              </Link>
              <Link to={langPath('/', '#modele')} className="btn-outline">
                {t('modelPage.actions.allModels')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div className={`page-shell ${styles.overviewInner}`}>
          <div
            ref={overviewDescRef}
            className={`${styles.descCard} reveal ${overviewDescVisible ? 'visible' : ''}`}
          >
            <h2 className={styles.descTitle}>{t('modelPage.overviewTitle', { name: model.name })}</h2>
            <p className={styles.descText}>{modelDescription}</p>
          </div>

          <div className={styles.sideGallery}>
            {sideImages.map((src, index) => (
              <SideGalleryCard
                key={`${src}-${index}`}
                src={src}
                modelName={model.name}
                index={index}
                delay={120 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className={`page-shell ${styles.specsInner}`}>
          <header
            ref={specsHeaderRef}
            className={`${styles.specsHeader} reveal ${specsHeaderVisible ? 'visible' : ''}`}
          >
            <span className={styles.label}>{t('modelPage.specsLabel')}</span>
            <h2 className={styles.specsTitle}>{t('modelPage.specsTitle', { name: model.name })}</h2>
          </header>

          <div className={styles.specAccordions}>
            {accordions.map((acc, index) => (
              <RevealAccordion
                key={`${acc.titleKey}-${index}`}
                title={t(`modelAccordionTitles.${acc.titleKey}`, {
                  ns: 'data',
                  defaultValue: acc.titleKey,
                })}
                rows={(acc.rows || []).map((row) => ({
                  key: row.key,
                  label: t(`modelSpecs.${row.key}`, {
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

          {model.techDrawing && (
            <div
              ref={drawingRef}
              className={`${styles.drawingBlock} reveal ${drawingVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '180ms' }}
            >
              <div className={styles.drawingHead}>
                <span className={styles.label}>{t('modelPage.drawingLabel')}</span>
                <h3 className={styles.drawingTitle}>{t('modelPage.drawingTitle')}</h3>
              </div>

              <div className={styles.drawingCard}>
                <img
                  src={model.techDrawing}
                  alt={t('modelPage.drawingImageAlt', { name: model.name })}
                  className={styles.drawingImage}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.accessoriesSection}>
        <div className={`page-shell ${styles.accessoriesInner}`}>
          <header
            ref={accessoriesHeaderRef}
            className={`${styles.accessoriesHeader} reveal ${accessoriesHeaderVisible ? 'visible' : ''}`}
          >
            <span className={styles.label}>{t('modelPage.accessoriesLabel')}</span>
            <h2 className={styles.accessoriesTitle}>{t('modelPage.accessoriesTitle')}</h2>
            <p className={styles.accessoriesSub}>
              {t('modelPage.accessoriesSubtitle', { name: model.name })}
            </p>
          </header>

          <div className={styles.accessoriesGrid}>
            {ACCESSORY_PREVIEW.map((item, index) => (
              <AccessoryPreviewCard
                key={item.id}
                item={item}
                delay={120 + index * 80}
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
          <span className={styles.otherLabel}>{t('modelPage.otherLabel')}</span>

          <div className={styles.otherGrid}>
            {others.map((other, index) => (
              <OtherModelCard
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
              {t('modelPage.ctaBarTitle', { name: model.name })}
            </div>
            <div className={styles.ctaBarSub}>
              {t('modelPage.ctaBarSub')}
            </div>
          </div>

          <Link to={langPath('/', '#kontakt')} className={styles.ctaBarBtn}>
            {t('modelPage.ctaBarButton')}
          </Link>
        </div>
      </section>
    </main>
  )
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

function SideGalleryCard({ src, modelName, index, delay }) {
  const { t } = useTranslation()
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.galleryCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        alt={t('modelPage.galleryImageAlt', { name: modelName, index: index + 1 })}
        className={styles.galleryImage}
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

function AccessoryPreviewCard({ item, delay }) {
  const { t, i18n } = useTranslation()
  const [ref, visible] = useReveal()

  const name = t(`accessories.${item.id}.name`, {
    ns: 'data',
    defaultValue: item.id,
  })

  return (
    <article
      ref={ref}
      className={`${styles.accessoryCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.accessoryMedia}>
        <SafeImage
          src={item.image}
          alt={t('modelPage.accessoryImageAlt', { name })}
          className={styles.accessoryImage}
        />
      </div>

      <div className={styles.accessoryBody}>
        <div className={styles.accessoryName}>{name}</div>
        <div className={styles.accessoryPrice}>
          {t('modelPage.accessoryPrice', {
            price: formatPrice(item.priceNetto, i18n.resolvedLanguage),
          })}
        </div>
      </div>
    </article>
  )
}

function OtherModelCard({ other, delay }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const [ref, visible] = useReveal()

  const badge = t(`models.${other.id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const subtitle = t(`models.${other.id}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  })

  return (
    <Link
      ref={ref}
      to={langPath(`/modele/${other.id}`)}
      className={`${styles.otherCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.otherImgWrap}>
        <img
          src={other.image}
          alt={t('modelPage.otherModelImageAlt', { name: other.name })}
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

        <div className={styles.otherName}>{other.name}</div>
        <div className={styles.otherSub}>{subtitle}</div>
        <div className={styles.otherPrice}>
          {t('modelPage.otherPrice', {
            price: formatPrice(other.priceNetto, i18n.resolvedLanguage),
          })}
        </div>
        <span className={styles.otherCta}>{t('modelPage.otherCta')}</span>
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