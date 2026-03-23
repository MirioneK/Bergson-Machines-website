import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLangPath } from '../hooks/useLangPath'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  const langPath = useLangPath()

  return (
    <footer className={styles.footer} id="footer">
      <div className={`page-shell ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link
              to={langPath('/')}
              className={styles.logoLink}
              aria-label={t('footer.logoAriaLabel')}
            >
              <img
                src="/logo.svg"
                alt={t('footer.logoAlt')}
                className={styles.logoImage}
              />
            </Link>

            <p className={styles.note}>
              {t('footer.note')}
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>{t('footer.customerService.title')}</h3>

              <Link to={langPath('/gwarancja')} className={styles.footerLink}>
                {t('footer.customerService.links.warranty')}
              </Link>

              <Link to={langPath('/zwroty-i-reklamacje')} className={styles.footerLink}>
                {t('footer.customerService.links.returns')}
              </Link>

              <Link to={langPath('/dostawa')} className={styles.footerLink}>
                {t('footer.customerService.links.delivery')}
              </Link>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>{t('footer.legal.title')}</h3>

              <a
                href="/pdfs/regulamin_bergson_machines.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                {t('footer.legal.links.terms')}
              </a>

              <a
                href="/pdfs/karta_gwarancyjna_bergson.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                {t('footer.legal.links.paymentMethods')}
              </a>

              <a
                href="/pdfs/polityka_prywatnosci_bergson.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footerLink}
              >
                {t('footer.legal.links.privacyPolicy')}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            {t('footer.copy')}
          </div>
          <div className={styles.tax}>
            {t('footer.tax')}
          </div>
        </div>
      </div>
    </footer>
  )
}