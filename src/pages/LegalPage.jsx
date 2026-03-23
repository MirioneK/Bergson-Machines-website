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

  const page = t(`legal.pages.${pageKey}`, {
    returnObjects: true,
  })

  usePageMeta({
    title: t('meta.legal.title', { title: page.title }),
    description: page.intro,
  })

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

          {(page.documentMeta || page.effectiveDate || page.version) && (
            <div className={styles.metaBar}>
              {page.documentMeta && (
                <span className={styles.metaItem}>{page.documentMeta}</span>
              )}
              {page.version && (
                <span className={styles.metaItem}>{page.version}</span>
              )}
              {page.effectiveDate && (
                <span className={styles.metaItem}>{page.effectiveDate}</span>
              )}
            </div>
          )}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`page-shell ${styles.contentInner}`}>
          {page.sections.map((section, index) => (
            <article key={section.heading} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.sectionNumber}>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
                <h2 className={styles.cardTitle}>{section.heading}</h2>
              </div>

              <div className={styles.cardBody}>
                {(section.blocks || []).map((block, blockIndex) => {
                  if (block.type === 'paragraph') {
                    return (
                      <p key={blockIndex} className={styles.cardText}>
                        {block.text}
                      </p>
                    )
                  }

                  if (block.type === 'list') {
                    return (
                      <ul key={blockIndex} className={styles.list}>
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex} className={styles.listItem}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  }

                  return null
                })}
              </div>
            </article>
          ))}

          {page.companyNote && (
            <div className={styles.companyCard}>
              <div className={styles.companyTitle}>
                {page.companyTitle || t('legal.companyTitle')}
              </div>
              <p className={styles.companyText}>{page.companyNote}</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}