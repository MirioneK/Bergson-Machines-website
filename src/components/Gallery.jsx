import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { GALLERY_PHOTOS } from '../data'
import { useReveal } from '../hooks/useReveal'
import PhotoLightbox from './PhotoLightbox'
import styles from './Gallery.module.css'

export default function Gallery() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const [sliderRef, sliderVisible] = useReveal()

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [userInteracted, setUserInteracted] = useState(false)

  const [isImageFading, setIsImageFading] = useState(false)
  const [isSliding, setIsSliding] = useState(false)

  const preloadedImagesRef = useRef(new Set())

  const preloadImage = useCallback((src) => {
    return new Promise((resolve) => {
      if (!src) {
        resolve()
        return
      }

      if (preloadedImagesRef.current.has(src)) {
        resolve()
        return
      }

      const img = new window.Image()
      img.src = src

      const done = () => {
        preloadedImagesRef.current.add(src)
        resolve()
      }

      if (img.complete) {
        done()
        return
      }

      img.onload = done
      img.onerror = done
    })
  }, [])

  const totalPhotos = GALLERY_PHOTOS.length
  const canSlide = totalPhotos > 1
  const activePhoto = GALLERY_PHOTOS[activeIndex]

  const goPrev = () => {
    const nextIndex = activeIndex === 0 ? totalPhotos - 1 : activeIndex - 1
    goToSlide(nextIndex, true)
  }

  const goNext = () => {
    const nextIndex = activeIndex === totalPhotos - 1 ? 0 : activeIndex + 1
    goToSlide(nextIndex, true)
  }

  const goToSlide = useCallback(
    async (nextIndex, markUserInteracted = true) => {
      if (!canSlide) return
      if (nextIndex === activeIndex) return
      if (isSliding) return

      if (markUserInteracted) {
        setUserInteracted(true)
      }

      setIsSliding(true)

      await preloadImage(GALLERY_PHOTOS[nextIndex]?.src)

      setIsImageFading(true)

      window.setTimeout(() => {
        setActiveIndex(nextIndex)

        window.requestAnimationFrame(() => {
          setIsImageFading(false)

          window.setTimeout(() => {
            setIsSliding(false)
          }, 220)
        })
      }, 180)
    },
    [activeIndex, canSlide, isSliding, preloadImage]
  )

  const openLightbox = (index = activeIndex) => {
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
  }

  useEffect(() => {
    if (!canSlide || userInteracted || lightboxIndex !== null || isSliding) return

    const interval = window.setInterval(() => {
      const nextIndex = activeIndex === totalPhotos - 1 ? 0 : activeIndex + 1
      goToSlide(nextIndex, false)
    }, 3500)

    return () => window.clearInterval(interval)
  }, [
    canSlide,
    userInteracted,
    lightboxIndex,
    isSliding,
    activeIndex,
    totalPhotos,
    goToSlide,
  ])

  useEffect(() => {
    if (!totalPhotos) return

    const nextIndex = activeIndex === totalPhotos - 1 ? 0 : activeIndex + 1
    const prevIndex = activeIndex === 0 ? totalPhotos - 1 : activeIndex - 1

    preloadImage(GALLERY_PHOTOS[activeIndex]?.src)
    preloadImage(GALLERY_PHOTOS[nextIndex]?.src)
    preloadImage(GALLERY_PHOTOS[prevIndex]?.src)
  }, [activeIndex, totalPhotos, preloadImage])

  if (!activePhoto) return null

  return (
    <section className={styles.section} id="galeria" aria-labelledby="gallery-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('gallery.label')}</span>
          <h2 className={styles.title} id="gallery-title">
            {t('gallery.title')}
          </h2>
        </header>

        <div className={styles.content}>
          <div
            ref={sliderRef}
            className={`${styles.sliderBlock} reveal ${sliderVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <div className={styles.sliderMain}>
              {canSlide && (
                <button
                  type="button"
                  className={`${styles.controlBtn} ${styles.controlPrev}`}
                  onClick={goPrev}
                  aria-label={t('gallery.prevPhotoAriaLabel', {
                    defaultValue: 'Poprzednie zdjęcie',
                  })}
                >
                  <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
                    <path d="M14.5 5 8 12l6.5 7" />
                  </svg>
                </button>
              )}

              <button
                type="button"
                className={styles.mainImageButton}
                onClick={() => openLightbox(activeIndex)}
                aria-label={t('gallery.openPhotoAriaLabel', {
                  defaultValue: 'Powiększ zdjęcie',
                })}
              >
                <img
                  src={activePhoto.src}
                  alt={
                    t(`gallery.photos.${activePhoto.id}.alt`, {
                      defaultValue: activePhoto.alt || `Zdjęcie ${activeIndex + 1}`,
                    })
                  }
                  className={`${styles.mainImage} ${isImageFading ? styles.mainImageFading : ''}`}
                  loading="lazy"
                  decoding="async"
                />
              </button>

              {canSlide && (
                <button
                  type="button"
                  className={`${styles.controlBtn} ${styles.controlNext}`}
                  onClick={goNext}
                  aria-label={t('gallery.nextPhotoAriaLabel', {
                    defaultValue: 'Następne zdjęcie',
                  })}
                >
                  <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
                    <path d="M9.5 5 16 12l-6.5 7" />
                  </svg>
                </button>
              )}

              {canSlide && (
                <div className={styles.counter}>
                  {activeIndex + 1} / {totalPhotos}
                </div>
              )}
            </div>

            <div className={styles.thumbRow}>
              {GALLERY_PHOTOS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.thumbBtn} ${index === activeIndex ? styles.thumbBtnActive : ''}`}
                  onClick={() => {
                    goToSlide(index, true)
                  }}
                  aria-label={t('gallery.openPhotoAriaLabel', {
                    defaultValue: 'Otwórz zdjęcie',
                  })}
                >
                  <img
                    src={item.src}
                    alt={
                      t(`gallery.photos.${item.id}.alt`, {
                        defaultValue: item.alt || `Miniatura ${index + 1}`,
                      })
                    }
                    className={styles.thumbImage}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={GALLERY_PHOTOS}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
          getAlt={(photo, index) =>
            t(`gallery.photos.${photo.id}.alt`, {
              defaultValue: photo.alt || `Zdjęcie ${index + 1}`,
            })
          }
        />
      )}
    </section>
  )
}
