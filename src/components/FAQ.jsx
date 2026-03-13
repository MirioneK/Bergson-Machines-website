import React, { useId, useState } from 'react'
import { FAQ as FAQ_DATA } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './FAQ.module.css'

export default function FAQ() {
  const mid = Math.ceil(FAQ_DATA.length / 2)
  const left = FAQ_DATA.slice(0, mid)
  const right = FAQ_DATA.slice(mid)

  const [headerRef, headerVisible] = useReveal()
  const [leftColRef, leftColVisible] = useReveal()
  const [rightColRef, rightColVisible] = useReveal()

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Najczęstsze pytania</span>
          <h2 className={styles.title} id="faq-title">
            FAQ
          </h2>
        </header>

        <div className={styles.grid}>
          <div
            ref={leftColRef}
            className={`${styles.column} reveal ${leftColVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            {left.map((item, index) => (
              <FaqItem key={item.id} {...item} delay={180 + index * 70} />
            ))}
          </div>

          <div
            ref={rightColRef}
            className={`${styles.column} reveal ${rightColVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '180ms' }}
          >
            {right.map((item, index) => (
              <FaqItem key={item.id} {...item} delay={260 + index * 70} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FaqItem({ q, a, delay }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.item} ${open ? styles.itemOpen : ''} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        type="button"
        className={styles.question}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className={styles.questionText}>{q}</span>
        <span className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`} aria-hidden="true">
          +
        </span>
      </button>

      <div
        id={panelId}
        className={`${styles.answerWrap} ${open ? styles.answerWrapOpen : ''}`}
      >
        <div className={styles.answer}>
          {a}
        </div>
      </div>
    </article>
  )
}