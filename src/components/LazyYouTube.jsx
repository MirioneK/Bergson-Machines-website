import React, { useRef, useState } from 'react'
import styles from './LazyYouTube.module.css'

export default function LazyYouTube({ videoId, title, poster, placeholderText }) {
  const [active, setActive] = useState(false)
  const iframeRef = useRef(null)
  const hasVideo = Boolean(videoId)
  const posterSrc = poster || '/images/optimized/hero.webp'

  const handleActivate = () => {
    if (!hasVideo) return
    // Setting src synchronously inside the click handler (instead of via a
    // React re-render) keeps the browser's user-activation signal attached
    // to this iframe, so YouTube autoplays with sound instead of muted.
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
    }
    setActive(true)
  }

  return (
    <div className={styles.wrap}>
      <iframe
        ref={iframeRef}
        className={styles.iframe}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />

      {!active && (
        <button
          type="button"
          className={`${styles.posterButton} ${!hasVideo ? styles.placeholder : ''}`}
          onClick={handleActivate}
          aria-label={title}
        >
          <img
            src={posterSrc}
            alt=""
            className={styles.posterImage}
            loading="lazy"
            decoding="async"
          />
          <span className={styles.scrim} aria-hidden="true" />
          <span className={styles.play} aria-hidden="true">
            <span className={styles.triangle} />
          </span>
          {!hasVideo && (
            <span className={styles.placeholderText}>
              {placeholderText || 'Film zostanie osadzony po publikacji na YouTube'}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
