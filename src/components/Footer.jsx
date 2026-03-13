import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={`page-shell ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logoLink} aria-label="Bergson Machines">
              <img
                src="/logo.svg"
                alt="Bergson Machines"
                className={styles.logoImage}
              />
            </Link>

            <p className={styles.note}>
              Minikoparki dla profesjonalistów. Sprzedaż, osprzęt, serwis i wsparcie techniczne.
            </p>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Obsługa klienta</h3>
              <Link to="/gwarancja" className={styles.footerLink}>
                Gwarancja
              </Link>
              <Link to="/zwroty-i-reklamacje" className={styles.footerLink}>
                Zwroty i reklamacje
              </Link>
              <Link to="/dostawa" className={styles.footerLink}>
                Dostawa
              </Link>
            </div>

            <div className={styles.linkColumn}>
              <h3 className={styles.columnTitle}>Informacje prawne</h3>
              <Link to="/regulamin" className={styles.footerLink}>
                Regulamin
              </Link>
              <Link to="/formy-platnosci" className={styles.footerLink}>
                Formy płatności
              </Link>
              <Link to="/polityka-prywatnosci" className={styles.footerLink}>
                Polityka prywatności
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copy}>
            © 2026 Better Solutions Sp. z o.o. Wszelkie prawa zastrzeżone.
          </div>
          <div className={styles.tax}>
            NIP: 725-229-86-52
          </div>
        </div>
      </div>
    </footer>
  )
}