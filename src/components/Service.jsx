import React from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICE_ITEMS } from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './Service.module.css'

export default function Service() {
  const { t } = useTranslation()

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
          <span className={styles.label}>{t('service.label')}</span>
          <h2 className={styles.title} id="service-title">
            {t('service.title')}
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
                id={item.id}
                icon={item.icon}
                delay={180 + index * 80}
              />
            ))}
          </ul>

          <aside
            ref={promiseRef}
            className={`${styles.promise} reveal ${promiseVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '220ms' }}
            aria-label={t('service.promise.ariaLabel')}
          >
            <h3 className={styles.promiseTitle}>
              {t('service.promise.title')}
            </h3>

            <p className={styles.promiseText}>
              {t('service.promise.text')}
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function ServiceItem({ id, icon, delay }) {
  const { t } = useTranslation()
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
        <h3 className={styles.itemTitle}>{t(`service.items.${id}.title`)}</h3>
        <p className={styles.itemDesc}>{t(`service.items.${id}.desc`)}</p>
      </div>
    </li>
  )
}