import React from 'react'
import { STEPS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './Process.module.css'

export default function Process() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section className={styles.section} id="jak-kupic" aria-labelledby="process-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Prosty zakup</span>
          <h2 className={styles.heading} id="process-title">
            Od zapytania do dostawy
          </h2>
        </header>

        <div className={styles.timeline}>
          {STEPS.map((step, index) => (
            <Step
              key={step.num}
              {...step}
              delay={120 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Step({ num, title, desc, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.step} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.top}>
        <div className={styles.num}>{num}</div>
        <div className={styles.connector} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{desc}</p>
      </div>
    </article>
  )
}