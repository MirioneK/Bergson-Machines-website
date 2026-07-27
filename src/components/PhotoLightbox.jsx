import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './PhotoLightbox.module.css'

export default function PhotoLightbox({
  photos,
  initialIndex = 0,
  onClose,
  getAlt,
}) {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const totalPhotos = photos.length
  const canSlide = totalPhotos > 1
  const currentPhoto = photos[currentIndex]

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (!currentPhoto) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const goPrev = () => {
      if (!canSlide) return
      setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1))
    }

    const goNext = () => {
      if (!canSlide) return
      setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1))
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') goPrev()
      if (event.key === 'ArrowRight') goNext()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [canSlide, currentPhoto, onClose, totalPhotos])

  if (!currentPhoto) return null

  const goPrev = () => {
    if (!canSlide) return
    setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1))
  }

  const goNext = () => {
    if (!canSlide) return
    setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1))
  }

  const currentAlt = getAlt
    ? getAlt(currentPhoto, currentIndex)
    : currentPhoto.alt || `Zdjęcie ${currentIndex + 1}`

  return (
    <div
      className={styles.lightbox}
      role="dialog"
      aria-modal="true"
      aria-label={t('gallery.previewAriaLabel', {
        defaultValue: 'Podgląd zdjęcia',
      })}
      onClick={onClose}
    >
      <button
        type="button"
        className={styles.lightboxClose}
        onClick={onClose}
        aria-label={t('gallery.closePreviewAriaLabel', {
          defaultValue: 'Zamknij podgląd zdjęcia',
        })}
      >
        ×
      </button>

      {canSlide && (
        <button
          type="button"
          className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
          onClick={(event) => {
            event.stopPropagation()
            goPrev()
          }}
          aria-label={t('gallery.prevPhotoAriaLabel', {
            defaultValue: 'Poprzednie zdjęcie',
          })}
        >
          <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
            <path d="M14.5 5 8 12l6.5 7" />
          </svg>
        </button>
      )}

      <div
        className={styles.lightboxFigure}
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={currentPhoto.src}
          alt={currentAlt}
          className={styles.lightboxImage}
        />
      </div>

      {canSlide && (
        <button
          type="button"
          className={`${styles.lightboxNav} ${styles.lightboxNext}`}
          onClick={(event) => {
            event.stopPropagation()
            goNext()
          }}
          aria-label={t('gallery.nextPhotoAriaLabel', {
            defaultValue: 'Następne zdjęcie',
          })}
        >
          <svg viewBox="0 0 24 24" className={styles.controlSvg} aria-hidden="true">
            <path d="M9.5 5 16 12l-6.5 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
