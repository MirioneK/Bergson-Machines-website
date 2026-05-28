import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'
import { useLangPath } from '../hooks/useLangPath'
import { useHashScroll } from '../hooks/useHashScroll'

const SLIDE_ROTATION_MS = 5600
const SLIDE_EXIT_MS = 260
const SLIDE_ENTER_MS = 520

export default function Hero() {
  const { t } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const [transition, setTransition] = useState(null)

  const fallbackStats = t('hero.stats', { returnObjects: true })
  const fallbackSlide = {
    id: 'default',
    label: t('nav.models'),
    titleLine1: t('hero.titleLine1'),
    titleLine2: t('hero.titleLine2'),
    titlePrice: t('hero.titlePrice'),
    lead: t('hero.lead'),
    image: '/images/optimized/hero.png',
    imageAlt: t('hero.imageAlt'),
    primaryLabel: t('hero.actions.models'),
    primaryHash: '#modele',
    secondaryLabel: t('hero.actions.consultation'),
    secondaryHash: '#kontakt',
    stats: Array.isArray(fallbackStats) ? fallbackStats : [],
  }

  const localizedSlides = t('hero.slides', { returnObjects: true, defaultValue: [] })
  const slides = Array.isArray(localizedSlides) && localizedSlides.length > 0
    ? localizedSlides
    : [fallbackSlide]

  useEffect(() => {
    if (activeIndex < slides.length) return
    setActiveIndex(0)
  }, [activeIndex, slides.length])

  useEffect(() => {
    if (!transition || transition.phase !== 'exiting') return undefined

    const timeoutId = window.setTimeout(() => {
      setActiveIndex(transition.to)
      setTransition({ to: transition.to, phase: 'entering' })
    }, SLIDE_EXIT_MS)

    return () => window.clearTimeout(timeoutId)
  }, [transition])

  useEffect(() => {
    if (!transition || transition.phase !== 'entering') return undefined

    const timeoutId = window.setTimeout(() => {
      setTransition(null)
    }, SLIDE_ENTER_MS)

    return () => window.clearTimeout(timeoutId)
  }, [transition])

  useEffect(() => {
    if (slides.length < 2 || transition) return undefined

    const timeoutId = window.setTimeout(() => {
      setTransition({
        to: (activeIndex + 1) % slides.length,
        phase: 'exiting',
      })
    }, SLIDE_ROTATION_MS)

    return () => window.clearTimeout(timeoutId)
  }, [activeIndex, slides.length, transition])

  const changeSlide = (nextIndex) => {
    if (slides.length < 2) return
    if (transition || nextIndex === activeIndex) return

    setTransition({
      to: nextIndex,
      phase: 'exiting',
    })
  }

  const selectedIndex = transition ? transition.to : activeIndex
  const activeSlide = slides[activeIndex] ?? fallbackSlide
  const primaryLink = langPath('/', activeSlide.primaryHash || '#modele')
  const secondaryLink = langPath('/', activeSlide.secondaryHash || '#kontakt')
  const slideStats = Array.isArray(activeSlide.stats) ? activeSlide.stats : []
  const imageVariantClass = activeSlide.imageVariant === 'aggregate' ? styles.imageAggregate : ''

  let copyStateClass = styles.slideCopyActive
  let mediaStateClass = styles.mediaStageActive

  if (transition?.phase === 'exiting') {
    copyStateClass = styles.slideCopyExiting
    mediaStateClass = styles.mediaStageExiting
  } else if (transition?.phase === 'entering') {
    copyStateClass = styles.slideCopyEntering
    mediaStateClass = styles.mediaStageEntering
  }

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.bgBase} aria-hidden="true" />
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`page-shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.badge}>{t('hero.badge')}</p>

          {slides.length > 1 ? (
            <div className={styles.switcher} role="group" aria-label={t('hero.sliderAriaLabel')}>
              {slides.map((slide, index) => (
                <button
                  key={slide.id ?? index}
                  type="button"
                  aria-pressed={selectedIndex === index}
                  className={`${styles.switcherButton} ${selectedIndex === index ? styles.switcherButtonActive : ''}`}
                  onClick={() => changeSlide(index)}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          ) : null}

          <div className={styles.copyViewport}>
            <div className={`${styles.slideCopy} ${copyStateClass}`}>
              <h1 id="hero-title" className={styles.title}>
                <span>{activeSlide.titleLine1}</span>
                <span className={styles.titleAccent}>{activeSlide.titleLine2}</span>
                <span className={styles.titlePrice}>{activeSlide.titlePrice}</span>
              </h1>

              <p
                className={styles.lead}
                dangerouslySetInnerHTML={{ __html: activeSlide.lead }}
              />

              <div className={styles.actions}>
                <a
                  href={primaryLink}
                  className="btn-primary"
                  onClick={(event) => handleHashScroll(event, primaryLink)}
                >
                  {activeSlide.primaryLabel}
                </a>

                <a
                  href={secondaryLink}
                  className="btn-outline"
                  onClick={(event) => handleHashScroll(event, secondaryLink)}
                >
                  {activeSlide.secondaryLabel}
                </a>
              </div>

              <ul className={styles.stats} aria-label={t('hero.statsAriaLabel')}>
                {slideStats.map((item, index) => (
                  <li key={`${activeSlide.id ?? 'slide'}-${item.value}-${index}`} className={styles.statItem}>
                    <span className={styles.statValue}>{item.value}</span>
                    <span className={styles.statLabel}>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.media}>
          <div className={styles.mediaViewport}>
            <div className={`${styles.mediaStage} ${mediaStateClass}`}>
              <div className={styles.mediaInner}>
                <img
                  src={activeSlide.image}
                  alt={activeSlide.imageAlt}
                  className={`${styles.image} ${imageVariantClass}`}
                  loading={activeIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
