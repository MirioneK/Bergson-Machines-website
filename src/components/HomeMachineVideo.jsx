import React from 'react'
import LazyYouTube from './LazyYouTube'
import { useReveal } from '../hooks/useReveal'
import styles from './HomeMachineVideo.module.css'

const HOME_VIDEO = {
  videoId: '44Uo_Z36iBg',
  title: 'Nasze koparki w akcji',
  poster: '/images/optimized/july-2026/home-full/25.webp',
}

export default function HomeMachineVideo() {
  const [headerRef, headerVisible] = useReveal()
  const [videoRef, videoVisible] = useReveal()

  return (
    <section className={styles.section} aria-labelledby="home-machine-video-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Film</span>
          <h2 className={styles.title} id="home-machine-video-title">
            Poznaj działanie naszych maszyn
          </h2>
        </header>

        <div
          ref={videoRef}
          className={`reveal ${videoVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          <LazyYouTube
            videoId={HOME_VIDEO.videoId}
            title={HOME_VIDEO.title}
            poster={HOME_VIDEO.poster}
            placeholderText="Film zostanie podpięty po publikacji na firmowym YouTube"
          />
        </div>
      </div>
    </section>
  )
}
