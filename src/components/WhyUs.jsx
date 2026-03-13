import React from 'react'
import { WHY_CARDS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './WhyUs.module.css'

export default function WhyUs() {
  const [leftRef, leftVisible] = useReveal()
  const [rightRef, rightVisible] = useReveal()

  return (
    <section className={styles.section} id="dlaczego" aria-labelledby="whyus-title">
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={`page-shell ${styles.inner}`}>
        <div
          ref={leftRef}
          className={`${styles.copy} reveal ${leftVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Dlaczego Bergson Machines</span>

          <h2 className={styles.title} id="whyus-title">
            Nie jesteśmy
            <br />
            „Januszem Biznesu”
          </h2>

          <p className={styles.sub}>
            Kupujesz od firmy z polskim adresem, KRS, NIP i magazynem części.
            Wystawiamy fakturę VAT bez dopłat, dowozimy maszynę pod wskazany adres
            i jesteśmy dostępni po sprzedaży — nie tylko przed nią.
          </p>

          <a href="#kontakt" className={styles.cta}>
            Porozmawiaj z nami
          </a>
        </div>

        <div
          ref={rightRef}
          className={`${styles.cards} reveal ${rightVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          {WHY_CARDS.map((card, index) => (
            <WhyCard
              key={card.id}
              {...card}
              delay={200 + index * 90}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyCard({ icon, title, desc, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.cardIcon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </article>
  )
}