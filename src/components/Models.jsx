import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MODELS } from '../data'
import { useReveal } from '../hooks/useReveal'
import ModelCard from './ModelCard'
import styles from './Models.module.css'

const MODEL_FILTERS = [
  {
    id: 'all',
    label: 'Wszystkie',
    predicate: () => true,
  },
  {
    id: 'cabin',
    label: 'Z kabiną',
    predicate: (model) => /^bm\d+c/.test(model.id),
  },
  {
    id: 'kubota',
    label: 'Silnik Kubota',
    predicate: (model) => model.id.includes('kubota'),
  },
]

export default function Models() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredModels = useMemo(() => {
    const selectedFilter =
      MODEL_FILTERS.find((filter) => filter.id === activeFilter) ??
      MODEL_FILTERS[0]

    const visibleModels = MODELS.filter(
      (model) => !model.comingSoon && !model.hidden && selectedFilter.predicate(model)
    )

    if (activeFilter !== 'all') {
      return visibleModels
    }

    const upcomingModel = MODELS.find((model) => model.comingSoon)
    return upcomingModel ? [...visibleModels, upcomingModel] : visibleModels
  }, [activeFilter])

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
          <p className={styles.sub}>
            {t('models.sub', {
              defaultValue:
                'Dziesięć aktualnie dostępnych konfiguracji, od kompaktowego BM10 po wersje kabinowe z silnikiem Kubota i Laidong.',
            })}
          </p>
        </header>

        <div className={styles.filterRow} role="group" aria-label="Filtr modeli">
          {MODEL_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {t(`models.filters.${filter.id}`, {
                defaultValue: filter.label,
              })}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredModels.map((model, index) => (
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
