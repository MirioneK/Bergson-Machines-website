import React from 'react'
import { SERVICE_ITEMS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './Service.module.css'

export default function Service() {
  const [headerRef, headerVisible] = useReveal()
  const [innerRef, innerVisible] = useReveal()
  const [promiseRef, promiseVisible] = useReveal()

  return (
    <section className={styles.section} id="serwis" aria-labelledby="service-title">
      <div className={`page-shell ${styles.outer}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>Gwarancja i serwis</span>
          <h2 className={styles.title} id="service-title">
            Kupujesz spokój ducha
          </h2>
        </header>

        <div
          ref={innerRef}
          className={`${styles.inner} reveal ${innerVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '100ms' }}
        >
          <ul className={styles.list}>
            {SERVICE_ITEMS.map((item, index) => (
              <ServiceItem
                key={item.id}
                {...item}
                delay={180 + index * 80}
              />
            ))}
          </ul>

          <aside
            ref={promiseRef}
            className={`${styles.promise} reveal ${promiseVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '220ms' }}
            aria-label="Obietnica serwisowa"
          >
            <div className={styles.metric}>
              <div className={styles.promiseBig}>48h</div>
              <div className={styles.promiseLabel}>
                Maksymalny czas reakcji serwisu
              </div>
            </div>

            <div className={styles.metric}>
              <div className={styles.promiseBig}>2 lata</div>
              <div className={styles.promiseLabel}>
                Pełna gwarancja bez wyjątków
              </div>
            </div>

            <a href="#kontakt" className={styles.promiseCta}>
              Zgłoś usterkę
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}

function ServiceItem({ icon, title, desc, delay }) {
  const [ref, visible] = useReveal()

  return (
    <li
      ref={ref}
      className={`${styles.item} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={styles.itemIcon} aria-hidden="true">
        {icon}
      </span>

      <div className={styles.itemContent}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <p className={styles.itemDesc}>{desc}</p>
      </div>
    </li>
  )
}