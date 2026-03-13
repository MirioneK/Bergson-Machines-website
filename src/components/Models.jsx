import React from 'react'
import { useTranslation } from 'react-i18next'
import { MODELS } from '../data'
import { useReveal } from '../hooks/useReveal'
import ModelCard from './ModelCard'
import styles from './Models.module.css'

export default function Models() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()

  return (
    <section className={styles.section} id="modele" aria-labelledby="models-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('models.label')}</span>
          <h2 className={styles.title} id="models-title">
            {t('models.title')}
          </h2>
        </header>

        <div className={styles.grid}>
          {MODELS.map((model, index) => (
            <ModelCardReveal
              key={model.id}
              model={model}
              delay={120 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ModelCardReveal({ model, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <ModelCard model={model} />
    </div>
  )
}