import React, { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import styles from './FAQ.module.css'

export default function FAQ() {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true })

  const mid = Math.ceil(items.length / 2)
  const left = items.slice(0, mid)
  const right = items.slice(mid)

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
          <span className={styles.label}>{t('faq.label')}</span>
          <h2 className={styles.title} id="faq-title">
            {t('faq.title')}
          </h2>
        </header>

        <div className={styles.grid}>
          <div
            ref={leftColRef}
            className={`${styles.column} reveal ${leftColVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '100ms' }}
          >
            {left.map((item, index) => (
              <FaqItem
                key={item.id}
                q={item.q}
                a={item.a}
                delay={180 + index * 70}
              />
            ))}
          </div>

          <div
            ref={rightColRef}
            className={`${styles.column} reveal ${rightColVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '180ms' }}
          >
            {right.map((item, index) => (
              <FaqItem
                key={item.id}
                q={item.q}
                a={item.a}
                delay={260 + index * 70}
              />
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