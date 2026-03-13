import React from 'react'
import { OBJECTIONS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './Objections.module.css'

export default function Objections() {
  const [headerRef, headerVisible] = useReveal()

  return (
    <section className={styles.section} id="obiekcje" aria-labelledby="objections-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Masz wątpliwości?</span>
          <h2 className={styles.title} id="objections-title">
            Odpowiadamy na wprost
          </h2>
        </header>

        <div className={styles.grid}>
          {OBJECTIONS.map((item, index) => (
            <ObjCard
              key={item.id}
              question={item.question}
              answer={item.answer}
              delay={120 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ObjCard({ question, answer, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.card} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.decor} aria-hidden="true">?</div>
      <h3 className={styles.question}>{question}</h3>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <div className={styles.answer}>{answer}</div>
    </article>
  )
}