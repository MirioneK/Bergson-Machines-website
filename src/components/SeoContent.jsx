import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'
import { useHashScroll } from '../hooks/useHashScroll'
import styles from './SeoContent.module.css'

export default function SeoContent() {
  const { t } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()

  const blocksRaw = t('seoContent.blocks', { returnObjects: true })
  const blocks = Array.isArray(blocksRaw) ? blocksRaw : []
  const [open, setOpen] = useState(false)

  const modelsLink = langPath('/', '#modele')
  const accessoriesLink = langPath('/osprzet')

  return (
    <section
      className={styles.section}
      id="seo-content"
      aria-labelledby="seo-content-title"
    >
      <div className={`page-shell ${styles.inner}`}>
        <div className={styles.card}>
          <div className={styles.head}>
            <span className={styles.label}>{t('seoContent.label')}</span>

            <h2 className={styles.title} id="seo-content-title">
              {t('seoContent.title')}
            </h2>

            <p className={styles.lead}>{t('seoContent.lead')}</p>

            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
            >
              {open
                ? t('seoContent.toggleLess', { defaultValue: 'Zwiń treść' })
                : t('seoContent.toggleMore', {
                    defaultValue: 'Czytaj więcej o minikoparkach',
                  })}
            </button>
          </div>

          <div className={`${styles.body} ${open ? styles.bodyOpen : ''}`}>
            <div className={styles.bodyInner}>
              <div className={styles.grid}>
                {blocks.map((block, index) => (
                  <article key={`${block.title}-${index}`} className={styles.block}>
                    <h3 className={styles.blockTitle}>{block.title}</h3>
                    <p className={styles.blockText}>{block.text}</p>
                  </article>
                ))}
              </div>

              <div className={styles.footer}>
                <p className={styles.footerText}>{t('seoContent.footerText')}</p>

                <div className={styles.actions}>
                  <Link
                    to={modelsLink}
                    className={styles.ctaPrimary}
                    onClick={(event) => handleHashScroll(event, modelsLink)}
                  >
                    {t('seoContent.actions.models')}
                  </Link>

                  <Link to={accessoriesLink} className={styles.ctaSecondary}>
                    {t('seoContent.actions.accessories')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
