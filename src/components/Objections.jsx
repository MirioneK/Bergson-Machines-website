import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import styles from './Objections.module.css'

export default function Objections() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const items = t('objections.items', { returnObjects: true })

  return (
    <section className={styles.section} id="obiekcje" aria-labelledby="objections-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('objections.label')}</span>
          <h2 className={styles.title} id="objections-title">
            {t('objections.title')}
          </h2>
        </header>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <ObjCard
              key={item.id}
              question={item.question}
              answerKey={`objections.items.${index}.answer`}
              delay={120 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ObjCard({ question, answerKey, delay }) {
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
      <div className={styles.answer}>
        <Trans i18nKey={answerKey} components={{ strong: <strong /> }} />
      </div>
    </article>
  )
}