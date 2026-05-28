import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AGGREGATES } from '../data'
import { useReveal } from '../hooks/useReveal'
import AggregateCard from './AggregateCard'
import styles from './Models.module.css'

const AGGREGATE_FILTERS = [
  {
    id: 'all',
    label: 'Wszystkie',
    predicate: () => true,
  },
  {
    id: 'cummins',
    label: 'Cummins',
    predicate: (aggregate) => aggregate.id.includes('cummins'),
  },
  {
    id: 'ricardo',
    label: 'Ricardo',
    predicate: (aggregate) => aggregate.id.includes('ricardo'),
  },
  {
    id: 'weichai',
    label: 'Weichai',
    predicate: (aggregate) => aggregate.id.includes('weichai'),
  },
]

export default function Aggregates() {
  const { t } = useTranslation()
  const [headerRef, headerVisible] = useReveal()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredAggregates = useMemo(() => {
    const selectedFilter =
      AGGREGATE_FILTERS.find((filter) => filter.id === activeFilter) ??
      AGGREGATE_FILTERS[0]

    return AGGREGATES.filter((aggregate) => selectedFilter.predicate(aggregate))
  }, [activeFilter])

  return (
    <section className={styles.section} id="agregaty" aria-labelledby="aggregates-title">
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>{t('aggregates.label')}</span>
          <h2 className={styles.title} id="aggregates-title">
            {t('aggregates.title')}
          </h2>
          <p className={styles.sub}>
            {t('aggregates.sub', {
              defaultValue:
                'Wersje 25-40 kW z silnikami Cummins, Ricardo i Weichai, gotowe do pracy jako agregaty wyciszone z ATS w standardzie.',
            })}
          </p>
        </header>

        <div className={styles.filterRow} role="group" aria-label="Filtr agregatów">
          {AGGREGATE_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`${styles.filterButton} ${activeFilter === filter.id ? styles.filterButtonActive : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {t(`aggregates.filters.${filter.id}`, {
                defaultValue: filter.label,
              })}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredAggregates.map((aggregate, index) => (
            <AggregateCardReveal
              key={aggregate.id}
              aggregate={aggregate}
              delay={120 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function AggregateCardReveal({ aggregate, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <AggregateCard aggregate={aggregate} />
    </div>
  )
}
