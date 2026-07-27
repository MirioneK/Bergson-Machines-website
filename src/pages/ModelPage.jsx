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
import { getProductGalleryImages } from '../galleryUtils'
import LazyYouTube from '../components/LazyYouTube'
import PhotoLightbox from '../components/PhotoLightbox'
import LeasingCalculatorSection from '../components/LeasingCalculatorSection'
import Contact from '../components/Contact'
import {
  getModelAccordions,
  getModelCardSpecs,
  getModelContentId,
  getModelText,
} from '../modelPresentation'
import styles from './ModelPage.module.css'

const ACCESSORY_PLACEHOLDER = '/images/optimized/placeholders/product-placeholder.webp'

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
  const [productGalleryRef, productGalleryVisible] = useReveal()
  const [productMediaRef, productMediaVisible] = useReveal()
  const [specsHeaderRef, specsHeaderVisible] = useReveal()
  const [drawingRef, drawingVisible] = useReveal()
  const [accessoriesHeaderRef, accessoriesHeaderVisible] = useReveal()
  const [ctaBarRef, ctaBarVisible] = useReveal()
  const [productLightboxIndex, setProductLightboxIndex] = useState(null)

  if (!model) return <Navigate to={langPath('/')} replace />

  const priceBrutto = calcBrutto(model.priceNetto)
  const contentId = getModelContentId(id)

  const modelSubtitle = getModelText(id, i18n.resolvedLanguage, 'subtitle', t(`models.${contentId}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  }))

  const modelBadge = getModelText(id, i18n.resolvedLanguage, 'badge', t(`models.${contentId}.badge`, {
    ns: 'data',
    defaultValue: '',
  }))

  const modelDescription = getModelText(id, i18n.resolvedLanguage, 'description', t(`models.${contentId}.description`, {
    ns: 'data',
    defaultValue: '',
  }))

  const quickSpecsRaw = t(`models.${contentId}.cardSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const quickSpecs = getModelCardSpecs(
    id,
    i18n.resolvedLanguage,
    Array.isArray(quickSpecsRaw) ? quickSpecsRaw : []
  ).slice(0, 4)

  const accordionsRaw = t(`models.${contentId}.accordions`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const accordions = getModelAccordions(
    id,
    i18n.resolvedLanguage,
    Array.isArray(accordionsRaw) ? accordionsRaw : []
  )

  const sideImages = getProductGalleryImages(model.image, model.gallery, 24)
  const hasSideGallery = sideImages.length > 0
  const shouldShowProductVideo = Boolean(model.videos && model.videos.length > 0)
  const shouldShowFeatureImage = Boolean(model.featureImage)
  const hasEnhancedMedia = shouldShowProductVideo || shouldShowFeatureImage
  const productPreviewPhotos = [
    ...(shouldShowFeatureImage
      ? [{
          src: model.featureImage,
          alt: t('modelPage.galleryImageAlt', { name: model.name, index: 1 }),
        }]
      : []),
    ...sideImages
      .filter((src) => src !== model.featureImage)
      .map((src, index) => ({
        src,
        alt: t('modelPage.galleryImageAlt', {
          name: model.name,
          index: shouldShowFeatureImage ? index + 2 : index + 1,
        }),
      })),
  ]
  const openProductLightbox = (src) => {
    const nextIndex = productPreviewPhotos.findIndex((photo) => photo.src === src)
    if (nextIndex >= 0) {
      setProductLightboxIndex(nextIndex)
    }
  }

  const formattedNetto = formatPrice(model.priceNetto, i18n.resolvedLanguage)
  const formattedBrutto = formatPrice(priceBrutto, i18n.resolvedLanguage)
  const preferredCommonLabels = new Set([
    'operatingWeight',
    'totalWeight',
    'hydraulicPump',
    'additionalEquipment',
    'oilCooler',
    'diggingDepth',
    'trackExpansion',
  ])
  const resolveModelSpecLabel = (key) =>
    preferredCommonLabels.has(key)
      ? t(`modelCard.specLabels.${key}`, {
          defaultValue: t(`modelSpecs.${key}`, {
            ns: 'data',
            defaultValue: key,
          }),
        })
      : t(`modelSpecs.${key}`, {
          ns: 'data',
          defaultValue: t(`modelCard.specLabels.${key}`, {
            defaultValue: key,
          }),
        })

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
              <div className={styles.priceMain}>
                <span className={styles.pricePrefix}>{t('modelPage.pricePrefix')}</span>
                {formattedBrutto}
                <span className={styles.priceUnit}>{t('modelCard.priceGrossLabel')}</span>
              </div>
              <div className={styles.priceSub}>
                {t('modelCard.priceNetto', { price: formattedNetto })}
              </div>
            </div>

            <div className={styles.quickGrid}>
              {quickSpecs.map(({ key, value }, index) => (
                <QuickSpecCell
                  key={`${key}-${index}`}
                  label={resolveModelSpecLabel(key)}
                  value={value}
                  delay={180 + index * 80}
                />
              ))}
            </div>

            <div className={styles.heroCtas}>
              <a href="#kontakt" className="btn-primary">
                {t('modelPage.actions.contact')}
              </a>
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
        </div>
      </section>

      {hasSideGallery && (
        <section className={styles.productGallerySection}>
          <div
            ref={productGalleryRef}
            className={`page-shell ${styles.productGalleryInner} reveal ${productGalleryVisible ? 'visible' : ''}`}
          >
            <div className={styles.sideGallery}>
              {sideImages.map((src, index) => (
                <SideGalleryCard
                  key={`${src}-${index}`}
                  src={src}
                  modelName={model.name}
                  imageNumber={shouldShowFeatureImage ? index + 2 : index + 1}
                  delay={120 + index * 100}
                  onOpen={() => openProductLightbox(src)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {hasEnhancedMedia && (
        <section className={styles.productMediaSection}>
          <div
            ref={productMediaRef}
            className={`page-shell ${styles.productMediaInner} reveal ${productMediaVisible ? 'visible' : ''}`}
          >
            {shouldShowProductVideo && (
              <div className={styles.videoStack}>
                {(model.videos || []).map((video, index) => (
                  <LazyYouTube
                    key={video.videoId || index}
                    videoId={video.videoId}
                    title={video.title || `${model.name} - film`}
                    poster={sideImages[0] || model.image}
                    placeholderText="Film produktowy zostanie podpięty po publikacji na YouTube"
                  />
                ))}
              </div>
            )}

            {shouldShowFeatureImage && (
              <button
                type="button"
                className={styles.featureImageButton}
                onClick={() => openProductLightbox(model.featureImage)}
                aria-label={t('gallery.openPhotoAriaLabel', {
                  defaultValue: 'Powiększ zdjęcie',
                })}
              >
                <img
                  src={model.featureImage}
                  alt={t('modelPage.galleryImageAlt', { name: model.name, index: 1 })}
                  className={styles.featureImage}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            )}
          </div>
        </section>
      )}

      {productLightboxIndex !== null && (
        <PhotoLightbox
          photos={productPreviewPhotos}
          initialIndex={productLightboxIndex}
          onClose={() => setProductLightboxIndex(null)}
        />
      )}

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
              <RevealSpecGroup
                key={`${acc.titleKey}-${index}`}
                title={t(`modelAccordionTitles.${acc.titleKey}`, {
                  ns: 'data',
                  defaultValue: acc.titleKey,
                })}
                rows={(acc.rows || []).map((row) => ({
                  key: row.key,
                  label: resolveModelSpecLabel(row.key),
                  value: row.value,
                }))}
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

      <LeasingCalculatorSection defaultProductId={model.id} />

      <Contact defaultModelId={model.id} />

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

          <a href="#kontakt" className={styles.ctaBarBtn}>
            {t('modelPage.ctaBarButton')}
          </a>
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

function SideGalleryCard({ src, modelName, imageNumber, delay, onOpen }) {
  const { t } = useTranslation()
  const [ref, visible] = useReveal()

  return (
    <button
      type="button"
      ref={ref}
      className={`${styles.galleryCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onOpen}
      aria-label={t('gallery.openPhotoAriaLabel', {
        defaultValue: 'Powiększ zdjęcie',
      })}
    >
      <img
        src={src}
        alt={t('modelPage.galleryImageAlt', { name: modelName, index: imageNumber })}
        className={styles.galleryImage}
        loading="lazy"
        decoding="async"
      />
    </button>
  )
}

function RevealSpecGroup({ title, rows }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
    >
      <SpecGroup title={title} rows={rows} />
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

function SpecGroup({ title, rows }) {
  return (
    <section className={`${styles.acc} ${styles.accOpen}`}>
      <div className={styles.accHead}>
        <span>{title}</span>
      </div>

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
    </section>
  )
}
