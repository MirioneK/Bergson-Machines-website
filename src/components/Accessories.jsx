import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ACCESSORY_PREVIEW, calcBrutto, formatPrice } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './Accessories.module.css'

function useVisibleSlides() {
  const getVisibleSlides = () => {
    if (typeof window === 'undefined') return 4
    if (window.innerWidth <= 768) return 1
    if (window.innerWidth <= 1180) return 2
    return 4
  }

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides)

  useEffect(() => {
    const onResize = () => setVisibleSlides(getVisibleSlides())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return visibleSlides
}

export default function Accessories() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const [carouselRef, carouselVisible] = useReveal()

  const visibleSlides = useVisibleSlides()
  const items = ACCESSORY_PREVIEW
  const canSlide = items.length > visibleSlides
  const cloneCount = canSlide ? visibleSlides : 0

  const carouselItems = useMemo(() => {
    if (!canSlide) return items

    return [
      ...items.slice(-cloneCount),
      ...items,
      ...items.slice(0, cloneCount),
    ]
  }, [items, canSlide, cloneCount])

  const [currentIndex, setCurrentIndex] = useState(cloneCount)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [userInteracted, setUserInteracted] = useState(false)

  useEffect(() => {
    setTransitionEnabled(false)
    setCurrentIndex(cloneCount)

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    })

    return () => window.cancelAnimationFrame(id)
  }, [cloneCount])

  useEffect(() => {
    if (!canSlide || userInteracted) return

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [canSlide, userInteracted])

  const handlePrev = () => {
    if (!canSlide) return
    setUserInteracted(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const handleNext = () => {
    if (!canSlide) return
    setUserInteracted(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handleTrackTransitionEnd = () => {
    if (!canSlide) return

    if (currentIndex < cloneCount) {
      setTransitionEnabled(false)
      setCurrentIndex(currentIndex + items.length)

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })
    }

    if (currentIndex >= items.length + cloneCount) {
      setTransitionEnabled(false)
      setCurrentIndex(currentIndex - items.length)

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })
    }
  }

  return (
    <section className={styles.section} id="akcesoria" aria-labelledby="accessories-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('accessories.label')}</span>
          <h2 className={styles.title} id="accessories-title">
            {t('accessories.title')}
          </h2>
          <p className={styles.sub}>{t('accessories.sub')}</p>
        </header>

        <div
          ref={carouselRef}
          className={`${styles.carouselSection} reveal ${carouselVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '140ms' }}
        >
          <div className={styles.carouselShell}>
            {canSlide && (
              <button
                type="button"
                className={`${styles.controlBtn} ${styles.controlPrev}`}
                onClick={handlePrev}
                aria-label={t('accessories.controls.prevAriaLabel')}
              >
                <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
                  <path d="M14.5 5 8 12l6.5 7" />
                </svg>
              </button>
            )}

            <div className={styles.carouselViewport}>
              <div
                className={`${styles.carouselTrack} ${transitionEnabled ? styles.trackAnimated : styles.trackNoAnimation}`}
                style={{
                  '--visible-slides': visibleSlides,
                  '--current-index': currentIndex,
                }}
                onTransitionEnd={handleTrackTransitionEnd}
              >
                {carouselItems.map((item, index) => (
                  <div className={styles.slide} key={`${item.id}-${index}`}>
                    <PreviewCard item={item} />
                  </div>
                ))}
              </div>
            </div>

            {canSlide && (
              <button
                type="button"
                className={`${styles.controlBtn} ${styles.controlNext}`}
                onClick={handleNext}
                aria-label={t('accessories.controls.nextAriaLabel')}
              >
                <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
                  <path d="M9.5 5 16 12l-6.5 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewCard({ item }) {
  const { t, i18n } = useTranslation()
  const priceBrutto = calcBrutto(item.priceNetto)

  const name = t(`accessories.${item.id}.name`, {
    ns: 'data',
    defaultValue: item.id,
  })

  return (
    <article className={styles.previewCard}>
      <div className={styles.previewMedia}>
        <img
          src={item.image}
          alt={t('accessories.card.imageAlt', { name })}
          className={styles.previewImage}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className={styles.previewBody}>
        <div className={styles.previewName}>{name}</div>

        <div className={styles.priceBlock}>
          <div className={styles.priceLine}>
            <span className={styles.previewPrice}>
              {formatPrice(item.priceNetto, i18n.resolvedLanguage)}
            </span>
            <span className={styles.priceLabel}>{t('accessories.card.priceNettoLabel')}</span>
          </div>

          <div className={styles.previewPriceBrutto}>
            {t('accessories.card.priceBrutto', {
              price: formatPrice(priceBrutto, i18n.resolvedLanguage),
            })}
          </div>
        </div>
      </div>
    </article>
  )
}