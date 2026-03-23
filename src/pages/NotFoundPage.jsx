import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const { t } = useTranslation()
  const langPath = useLangPath()

  usePageMeta({
    title: t('meta.notFound.title'),
    description: t('meta.notFound.description'),
    noindex: true,
    disableAlternates: true,
  })

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`page-shell ${styles.inner}`}>
          <span className={styles.label}>{t('notFound.label')}</span>
          <h1 className={styles.title}>{t('notFound.title')}</h1>
          <p className={styles.text}>{t('notFound.text')}</p>

          <div className={styles.actions}>
            <Link to={langPath('/')} className="btn-primary">
              {t('notFound.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}