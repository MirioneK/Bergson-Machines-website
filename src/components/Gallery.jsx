import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import styles from './Gallery.module.css'

const PHOTO_TILES = [
  {
    id: 'bm12cPhoto',
    src: '/images/BM12C.jpeg',
    featured: true,
  },
  {
    id: 'bm10Photo',
    src: '/images/BM10.jpeg',
  },
  {
    id: 'bm12Photo',
    src: '/images/BM12.jpeg',
    imgStyle: { objectPosition: 'center 20%' },
  },
]

const INFO_TILES = [
  {
    id: 'warranty',
    theme: 'grad',
    variant: 'warranty',
  },
  {
    id: 'trackWidth',
    theme: 'dark',
    variant: 'trackWidth',
    icon: '📐',
  },
]

export default function Gallery() {
  const { t } = useTranslation()
  const [activePhoto, setActivePhoto] = useState(null)
  const [headerRef, headerVisible] = useReveal()

  useEffect(() => {
    if (!activePhoto) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActivePhoto(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activePhoto])

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
          <div className={styles.photoGrid}>
            {PHOTO_TILES.map((tile, index) => (
              <PhotoTile
                key={tile.id}
                tile={tile}
                delay={120 + index * 100}
                onOpen={() => setActivePhoto(tile)}
              />
            ))}
          </div>

          <div className={styles.infoGrid}>
            {INFO_TILES.map((tile, index) => (
              <InfoTile
                key={tile.id}
                tile={tile}
                delay={220 + index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {activePhoto && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t(`gallery.photos.${activePhoto.id}.label`)}
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActivePhoto(null)}
            aria-label={t('gallery.closePreviewAriaLabel')}
          >
            ×
          </button>

          <figure
            className={styles.lightboxFigure}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={t(`gallery.photos.${activePhoto.id}.alt`)}
              className={styles.lightboxImage}
            />
            <figcaption className={styles.lightboxCaption}>
              <span className={styles.lightboxTag}>
                {t(`gallery.photos.${activePhoto.id}.tag`)}
              </span>
              <span>{t(`gallery.photos.${activePhoto.id}.label`)}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}

function PhotoTile({ tile, delay, onOpen }) {
  const { t } = useTranslation()
  const [ref, visible] = useReveal()

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.photoTile} ${tile.featured ? styles.featuredPhoto : ''} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onOpen}
      aria-label={t('gallery.openPhotoAriaLabel', {
        label: t(`gallery.photos.${tile.id}.label`),
      })}
    >
      <img
        src={tile.src}
        alt={t(`gallery.photos.${tile.id}.alt`)}
        className={styles.image}
        style={tile.imgStyle}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.tag}>{t(`gallery.photos.${tile.id}.tag`)}</span>
      <div className={styles.labelOverlay}>{t(`gallery.photos.${tile.id}.label`)}</div>
    </button>
  )
}

function InfoTile({ tile, delay }) {
  const { t } = useTranslation()
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.infoTile} ${styles[tile.theme]} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.infoContent}>
        {tile.variant === 'warranty' && (
          <>
            <div className={styles.infoNum}>{t(`gallery.infoTiles.${tile.id}.number`)}</div>
            <div className={styles.infoSub}>{t(`gallery.infoTiles.${tile.id}.sub`)}</div>
            <div className={styles.infoLine} />
            <div className={styles.infoDesc}>{t(`gallery.infoTiles.${tile.id}.desc`)}</div>
          </>
        )}

        {tile.variant === 'trackWidth' && (
          <>
            <span className={styles.infoIcon} aria-hidden="true">{tile.icon}</span>
            <div className={`${styles.infoSub} ${styles.orange}`}>
              {t(`gallery.infoTiles.${tile.id}.sub`)}
            </div>
            <div className={styles.infoNumSmall}>{t(`gallery.infoTiles.${tile.id}.number`)}</div>
            <div className={styles.infoDesc}>{t(`gallery.infoTiles.${tile.id}.desc`)}</div>
          </>
        )}
      </div>
    </div>
  )
}