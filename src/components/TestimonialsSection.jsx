import React from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import styles from './TestimonialsSection.module.css'

const TESTIMONIALS = [
  {
    initials: 'W',
    name: 'Wojciech',
    line1: 'Działka rekreacyjna, budowlana',
    line2: 'klient prywatny · woj. łódzkie',
    text:
      'Wszystko ok. Koparkę 1t mam już ponad pół roku i bez problemu daje radę przy pracach ogrodowych oraz mniejszych budowlanych jak kopanie fundamentów.',
  },
  {
    initials: 'Ł',
    name: 'Łukasz',
    line1: 'Gospodarstwo rolne',
    line2: 'woj. małopolskie',
    text:
      'Fajna koparka w bardzo dobrej cenie. Działa bez zarzutu, jakość wykonania pozytywnie zaskoczyła. Polecam!',
  },
  {
    initials: 'J',
    name: 'Jakub',
    line1: 'Ośrodek wypoczynkowy',
    line2: 'woj. kujawsko-pomorskie',
    text:
      'Korzystam z koparki zarówno przy pracach ziemnych w naszym ośrodku wypoczynkowym oraz w stadninie koni, koparka sprawdza się w 100%, polecam!',
  },
]

const STATS = [
  { value: '48 h', label: 'Średni czas reakcji serwisu' },
  { value: '2 oddziały', label: 'Antoniew i Pobórka Wielka' },
  { value: '5 / 5', label: 'Ocena w Google' },
]

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const [statsRef, statsVisible] = useReveal()

  return (
    <section
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>
            {t('testimonials.label', { defaultValue: 'Opinie klientów' })}
          </span>
          <h2 className={styles.title} id="testimonials-title">
            {t('testimonials.title', {
              defaultValue: 'Zobacz, kto już kupuje u nas',
            })}
          </h2>
          <p className={styles.lead}>
            {t('testimonials.lead', {
              defaultValue: 'Realne osoby, realne maszyny, realne wyniki.',
            })}
          </p>
        </header>

        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.initials}
              testimonial={testimonial}
              delay={120 + index * 100}
            />
          ))}
        </div>

        <div
          ref={statsRef}
          className={`${styles.statsGrid} reveal ${statsVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '180ms' }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.stars} aria-label="Ocena 5 na 5">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>

      <blockquote className={styles.quote}>
        „{testimonial.text}”
      </blockquote>

      <div className={styles.author}>
        <div className={styles.avatar} aria-hidden="true">
          {testimonial.initials}
        </div>
        <div>
          <div className={styles.name}>{testimonial.name}</div>
          <div className={styles.meta}>{testimonial.line1}</div>
          <div className={styles.meta}>{testimonial.line2}</div>
        </div>
      </div>
    </article>
  )
}
