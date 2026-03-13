import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './LegalPage.module.css'

export default function LegalPage({ pageKey }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

    const pageExists = i18n.exists(`legal.pages.${pageKey}`)

    if (!pageExists) {
    return <Navigate to={langPath('/')} replace />
    }

    const page = t(`legal.pages.${pageKey}`, { returnObjects: true })

    usePageMeta(
    t('meta.legal.title', { title: page.title }),
    page.intro
    )

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`page-shell ${styles.heroInner}`}>
          <Link to={langPath('/')} className={styles.backLink}>
            {t('legal.backLink')}
          </Link>

          <span className={styles.label}>{t('legal.label')}</span>
          <h1 className={styles.title}>{page.title}</h1>
          <p className={styles.intro}>{page.intro}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`page-shell ${styles.contentInner}`}>
          {page.sections.map((section) => (
            <article key={section.heading} className={styles.card}>
              <h2 className={styles.cardTitle}>{section.heading}</h2>
              <p className={styles.cardText}>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}