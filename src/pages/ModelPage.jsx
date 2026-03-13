import React, { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  MODELS,
  ACCESSORY_PREVIEW,
  formatPrice,
  calcBrutto,
} from '../data'
import { useReveal } from '../hooks/useReveal'
import styles from './ModelPage.module.css'

export default function ModelPage() {
  const { id } = useParams()
  const model = MODELS.find((m) => m.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const [breadcrumbRef, breadcrumbVisible] = useReveal()
  const [heroMediaRef, heroMediaVisible] = useReveal()
  const [heroInfoRef, heroInfoVisible] = useReveal()
  const [overviewDescRef, overviewDescVisible] = useReveal()
  const [specsHeaderRef, specsHeaderVisible] = useReveal()
  const [drawingRef, drawingVisible] = useReveal()
  const [accessoriesHeaderRef, accessoriesHeaderVisible] = useReveal()
  const [otherInnerRef, otherInnerVisible] = useReveal()
  const [ctaBarRef, ctaBarVisible] = useReveal()

  if (!model) return <Navigate to="/" replace />

  const others = MODELS.filter((m) => m.id !== id)
  const priceBrutto = calcBrutto(model.priceNetto)
  const quickSpecs = model.specs.slice(0, 4)
  const sideImages =
    model.gallery && model.gallery.length >= 2
      ? model.gallery.slice(0, 2)
      : [model.image, model.image]

  return (
    <main className={styles.page}>
      <section className={styles.breadcrumbSection}>
        <div
          ref={breadcrumbRef}
          className={`page-shell ${styles.breadcrumbBar} reveal ${breadcrumbVisible ? 'visible' : ''}`}
        >
          <Link to="/" className={styles.breadcrumbLink}>
            Strona główna
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <Link to="/#modele" className={styles.breadcrumbLink}>
            Minikoparki
          </Link>
          <span className={styles.breadcrumbSep}>›</span>
          <span className={styles.breadcrumbCurrent}>{model.name}</span>
        </div>
      </section>

      <section className={styles.heroSection}>
        <div className={styles.heroBg} aria-hidden="true" />
        <div className={`page-shell ${styles.heroInner}`}>
          <div
            ref={heroMediaRef}
            className={`${styles.heroMedia} reveal ${heroMediaVisible ? 'visible' : ''}`}
          >
            {model.badge && (
              <span className={styles.heroBadge}>
                <span className={styles.badgeStar} aria-hidden="true">★</span>
                {model.badge}
              </span>
            )}

            <div className={styles.heroImageWrap}>
              <img
                src={model.image}
                alt={`${model.name} minikoparka`}
                className={styles.heroImage}
              />
            </div>
          </div>

          <div
            ref={heroInfoRef}
            className={`${styles.heroInfo} reveal ${heroInfoVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '120ms' }}
          >
            <span className={styles.label}>Minikoparki Bergson Machines</span>

            <h1 className={styles.heroName}>{model.name}</h1>
            <p className={styles.heroSubtitle}>{model.subtitle}</p>

            <div className={styles.priceBlock}>
              <div className={styles.priceNetto}>
                <span className={styles.pricePrefix}>od</span>
                {formatPrice(model.priceNetto)}
                <span className={styles.priceUnit}>netto</span>
              </div>
              <div className={styles.priceBrutto}>
                od {formatPrice(priceBrutto)} brutto
              </div>
            </div>

            <div className={styles.quickGrid}>
              {quickSpecs.map(({ label, value }, index) => (
                <QuickSpecCell
                  key={label}
                  label={label}
                  value={value}
                  delay={180 + index * 80}
                />
              ))}
            </div>

            <div className={styles.heroCtas}>
              <Link to="/#kontakt" className="btn-primary">
                Skontaktuj się
              </Link>
              <Link to="/#modele" className="btn-outline">
                ← Wszystkie modele
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection}>
        <div className={`page-shell ${styles.overviewInner}`}>
          <div
            ref={overviewDescRef}
            className={`${styles.descCard} reveal ${overviewDescVisible ? 'visible' : ''}`}
          >
            <h2 className={styles.descTitle}>Minikoparka {model.name}</h2>
            <p className={styles.descText}>{model.detail.description}</p>
          </div>

          <div className={styles.sideGallery}>
            {sideImages.map((src, index) => (
              <SideGalleryCard
                key={`${src}-${index}`}
                src={src}
                modelName={model.name}
                index={index}
                delay={120 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className={`page-shell ${styles.specsInner}`}>
          <header
            ref={specsHeaderRef}
            className={`${styles.specsHeader} reveal ${specsHeaderVisible ? 'visible' : ''}`}
          >
            <span className={styles.label}>Dane techniczne</span>
            <h2 className={styles.specsTitle}>Specyfikacja modelu {model.name}</h2>
          </header>

          <div className={styles.specAccordions}>
            {model.detail.accordions.map((acc, index) => (
              <RevealAccordion
                key={acc.title}
                title={acc.title}
                rows={acc.rows}
                defaultOpen={index === 0}
                delay={120 + index * 100}
              />
            ))}
          </div>

          {model.techDrawing && (
            <div
              ref={drawingRef}
              className={`${styles.drawingBlock} reveal ${drawingVisible ? 'visible' : ''}`}
              style={{ transitionDelay: '180ms' }}
            >
              <div className={styles.drawingHead}>
                <span className={styles.label}>Rysunek techniczny</span>
                <h3 className={styles.drawingTitle}>Wymiary i geometria pracy</h3>
              </div>

              <div className={styles.drawingCard}>
                <img
                  src={model.techDrawing}
                  alt={`Rysunek techniczny ${model.name}`}
                  className={styles.drawingImage}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className={styles.accessoriesSection}>
        <div className={`page-shell ${styles.accessoriesInner}`}>
          <header
            ref={accessoriesHeaderRef}
            className={`${styles.accessoriesHeader} reveal ${accessoriesHeaderVisible ? 'visible' : ''}`}
          >
            <span className={styles.label}>Osprzęt dodatkowy</span>
            <h2 className={styles.accessoriesTitle}>Dodatkowy osprzęt</h2>
            <p className={styles.accessoriesSub}>
              Przykładowe akcesoria kompatybilne z modelem {model.name}.
            </p>
          </header>

          <div className={styles.accessoriesGrid}>
            {ACCESSORY_PREVIEW.map((item, index) => (
              <AccessoryPreviewCard
                key={item.id}
                item={item}
                delay={120 + index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.otherSection}>
        <div
          ref={otherInnerRef}
          className={`page-shell ${styles.otherInner} reveal ${otherInnerVisible ? 'visible' : ''}`}
        >
          <span className={styles.otherLabel}>Odkryj pozostałe modele</span>

          <div className={styles.otherGrid}>
            {others.map((other, index) => (
              <OtherModelCard
                key={other.id}
                other={other}
                delay={120 + index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaBar}>
        <div
          ref={ctaBarRef}
          className={`page-shell ${styles.ctaBarInner} reveal ${ctaBarVisible ? 'visible' : ''}`}
        >
          <div>
            <div className={styles.ctaBarTitle}>
              Masz pytania dotyczące {model.name}?
            </div>
            <div className={styles.ctaBarSub}>
              Odpowiemy w ciągu 2 godzin w dni robocze
            </div>
          </div>

          <Link to="/#kontakt" className={styles.ctaBarBtn}>
            Przejdź do formularza
          </Link>
        </div>
      </section>
    </main>
  )
}

function QuickSpecCell({ label, value, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.qsCell} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.qsVal}>{value}</div>
      <div className={styles.qsKey}>{label}</div>
    </div>
  )
}

function SideGalleryCard({ src, modelName, index, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`${styles.galleryCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={src}
        alt={`${modelName} zdjęcie ${index + 1}`}
        className={styles.galleryImage}
      />
    </div>
  )
}

function RevealAccordion({ title, rows, defaultOpen = false, delay }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Accordion title={title} rows={rows} defaultOpen={defaultOpen} />
    </div>
  )
}

function AccessoryPreviewCard({ item, delay }) {
  const [ref, visible] = useReveal()

  return (
    <article
      ref={ref}
      className={`${styles.accessoryCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.accessoryMedia}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.accessoryImage}
        />
      </div>

      <div className={styles.accessoryBody}>
        <div className={styles.accessoryName}>{item.name}</div>
        <div className={styles.accessoryPrice}>{item.priceNetto}</div>
      </div>
    </article>
  )
}

function OtherModelCard({ other, delay }) {
  const [ref, visible] = useReveal()

  return (
    <Link
      ref={ref}
      to={`/modele/${other.id}`}
      className={`${styles.otherCard} reveal ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.otherImgWrap}>
        <img src={other.image} alt={other.name} className={styles.otherImg} />
      </div>

      <div className={styles.otherBody}>
        {other.badge && (
          <span className={styles.otherBadge}>
            <span className={styles.badgeStar} aria-hidden="true">★</span>
            {other.badge}
          </span>
        )}

        <div className={styles.otherName}>{other.name}</div>
        <div className={styles.otherSub}>{other.subtitle}</div>
        <div className={styles.otherPrice}>
          od {formatPrice(other.priceNetto)} netto
        </div>
        <span className={styles.otherCta}>Poznaj model →</span>
      </div>
    </Link>
  )
}

function Accordion({ title, rows, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`${styles.acc} ${open ? styles.accOpen : ''}`}>
      <button
        type="button"
        className={styles.accHead}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className={styles.accIcon}>{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className={styles.accBody}>
          <div className={styles.specRows}>
            {rows.map(({ label, value }) => (
              <div key={label} className={styles.specRow}>
                <div className={styles.specKey}>{label}</div>
                <div className={styles.specVal}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}