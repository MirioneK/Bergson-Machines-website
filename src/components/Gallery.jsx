import React, { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import styles from './Gallery.module.css'

const PHOTO_TILES = [
  {
    id: 'bm12c-photo',
    src: '/images/BM12C.jpeg',
    alt: 'Minikoparka BM12C z kabiną',
    tag: 'BM12C · Z kabiną',
    label: 'BM12C — praca w każdą pogodę',
    featured: true,
  },
  {
    id: 'bm10-photo',
    src: '/images/BM10.jpeg',
    alt: 'Minikoparka BM10',
    tag: 'BM10 · 1 tona',
    label: 'BM10 — wąskie wjazdy, ogrody',
  },
  {
    id: 'bm12-photo',
    src: '/images/BM12.jpeg',
    alt: 'Minikoparka BM12',
    tag: 'BM12 · Bestseller',
    label: 'BM12 — najlepszy wybór',
    imgStyle: { objectPosition: 'center 20%' },
  },
]

const INFO_TILES = [
  {
    id: 'warranty-info',
    theme: 'grad',
    content: (
      <>
        <div className={styles.infoNum}>2 lata</div>
        <div className={styles.infoSub}>Gwarancja</div>
        <div className={styles.infoLine} />
        <div className={styles.infoDesc}>Pełna ochrona mechaniki i hydrauliki</div>
      </>
    ),
  },
  {
    id: 'track-width-info',
    theme: 'dark',
    content: (
      <>
        <span className={styles.infoIcon} aria-hidden="true">📐</span>
        <div className={`${styles.infoSub} ${styles.orange}`}>Szerokość gąsienicy</div>
        <div className={styles.infoNumSmall}>od 760 mm</div>
        <div className={styles.infoDesc}>
          Mieści się przez standardową bramę garażową
        </div>
      </>
    ),
  },
]

export default function Gallery() {
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
          <span className={styles.label}>Galeria</span>
          <h2 className={styles.title} id="gallery-title">
            Nasze maszyny z bliska
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
          aria-label={activePhoto.label}
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActivePhoto(null)}
            aria-label="Zamknij podgląd zdjęcia"
          >
            ×
          </button>

          <figure
            className={styles.lightboxFigure}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className={styles.lightboxImage}
            />
            <figcaption className={styles.lightboxCaption}>
              <span className={styles.lightboxTag}>{activePhoto.tag}</span>
              <span>{activePhoto.label}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}

function PhotoTile({ tile, delay, onOpen }) {
  const [ref, visible] = useReveal()

  return (
    <button
      ref={ref}
      type="button"
      className={`${styles.photoTile} ${tile.featured ? styles.featuredPhoto : ''} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onOpen}
      aria-label={`Powiększ zdjęcie: ${tile.label}`}
    >
      <img
        src={tile.src}
        alt={tile.alt}
        className={styles.image}
        style={tile.imgStyle}
        loading="lazy"
        decoding="async"
      />
      <span className={styles.tag}>{tile.tag}</span>
      <div className={styles.labelOverlay}>{tile.label}</div>
    </button>
  )
}

function InfoTile({ tile, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.infoTile} ${styles[tile.theme]} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.infoContent}>{tile.content}</div>
    </div>
  )
}