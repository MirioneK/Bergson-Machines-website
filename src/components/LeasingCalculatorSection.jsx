import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AGGREGATES, MODELS, formatPrice } from '../data'
import { useHashScroll } from '../hooks/useHashScroll'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import styles from './LeasingCalculatorSection.module.css'

const DEFAULT_MULTIPLIERS = {
  24: 1.06,
  36: 1.1,
  48: 1.14,
  60: 1.18,
}

const DOWN_PAYMENT_OPTIONS = [0, 10, 15, 20, 25, 30]
const RESIDUAL_OPTIONS = [1, 10, 25]
const LEASING_MONTHS = [24, 36, 48, 60]
const VAT_RATE = 1.23

function getAggregateEngineBrand(cardSpecs) {
  return (
    cardSpecs.find((item) => item.key === 'engineBrand')?.value ??
    'Agregat'
  )
}

export default function LeasingCalculatorSection() {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()

  const [headerRef, headerVisible] = useReveal()
  const [widgetRef, widgetVisible] = useReveal()

  const [selectedId, setSelectedId] = useState('bm13')
  const [downIndex, setDownIndex] = useState(1)
  const [months, setMonths] = useState(60)
  const [residual, setResidual] = useState(1)

  const contactLink = langPath('/', '#kontakt')
  const downPayment = DOWN_PAYMENT_OPTIONS[downIndex]

  const productOptions = useMemo(() => {
    const modelOptions = MODELS.filter((model) => !model.comingSoon).map(
      (model) => ({
        id: model.id,
        type: 'model',
        label: model.name,
        priceNetto: model.priceNetto,
      })
    )

    const aggregateOptions = AGGREGATES.map((aggregate) => {
      const cardSpecsRaw = t(`aggregates.${aggregate.id}.cardSpecs`, {
        ns: 'data',
        returnObjects: true,
        defaultValue: [],
      })
      const cardSpecs = Array.isArray(cardSpecsRaw) ? cardSpecsRaw : []
      const engineBrand = getAggregateEngineBrand(cardSpecs)
      const name = t(`aggregates.${aggregate.id}.name`, {
        ns: 'data',
        defaultValue: aggregate.id,
      })

      return {
        id: aggregate.id,
        type: 'aggregate',
        label: `${name} ${engineBrand}`,
        priceNetto: aggregate.priceNetto,
      }
    })

    return [...modelOptions, ...aggregateOptions]
  }, [t])

  const selectedProduct = useMemo(
    () =>
      productOptions.find((product) => product.id === selectedId) ??
      productOptions[0],
    [productOptions, selectedId]
  )

  const calculation = useMemo(() => {
    if (!selectedProduct) return null

    const multiplier = DEFAULT_MULTIPLIERS[months] ?? DEFAULT_MULTIPLIERS[60]

    const financedBase =
      selectedProduct.priceNetto * (1 - downPayment / 100 - residual / 100)

    const monthlyNet = (financedBase * multiplier) / months
    const monthlyGross = monthlyNet * VAT_RATE

    const totalNet =
      monthlyNet * months +
      (selectedProduct.priceNetto * downPayment) / 100 +
      (selectedProduct.priceNetto * residual) / 100

    const totalGross = totalNet * VAT_RATE

    const dailyNet = monthlyNet / 30
    const dailyGross = dailyNet * VAT_RATE

    return {
      monthlyNet,
      monthlyGross,
      totalNet,
      totalGross,
      dailyNet,
      dailyGross,
    }
  }, [downPayment, months, residual, selectedProduct])

  const isAggregate = selectedProduct?.type === 'aggregate'

  return (
    <section
      className={styles.section}
      id="leasing"
      aria-labelledby="leasing-title"
    >
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>
            {t('leasing.label', { defaultValue: 'Finansowanie' })}
          </span>
          <h2 className={styles.title} id="leasing-title">
            {t('leasing.title', { defaultValue: 'Policz swoją ratę' })}
          </h2>
          <p className={styles.lead}>
            {t('leasing.lead', {
              defaultValue:
                'Zamiast myśleć o cenie katalogowej, zobacz miesięczny koszt maszyny. Kalkulator obejmuje aktualne minikoparki i agregaty z oferty PL.',
            })}
          </p>
        </header>

        <div
          ref={widgetRef}
          className={`${styles.widget} reveal ${widgetVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          <div className={styles.formPanel}>
            <div className={styles.field}>
              <label htmlFor="leasing-product" className={styles.fieldLabel}>
                {t('leasing.productLabel', { defaultValue: 'Model maszyny' })}
              </label>
              <select
                id="leasing-product"
                className={styles.select}
                value={selectedId}
                onChange={(event) => setSelectedId(event.target.value)}
              >
                {productOptions.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.label} · od{' '}
                    {formatPrice(
                      product.priceNetto * VAT_RATE,
                      i18n.resolvedLanguage
                    )}{' '}
                    brutto
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label
                htmlFor="leasing-down-payment"
                className={styles.rangeLabel}
              >
                <span>
                  {t('leasing.downPaymentLabel', {
                    defaultValue: 'Wkład własny',
                  })}
                </span>
                <strong>{downPayment}%</strong>
              </label>
              <input
                id="leasing-down-payment"
                type="range"
                className={styles.range}
                min="0"
                max={DOWN_PAYMENT_OPTIONS.length - 1}
                step="1"
                value={downIndex}
                onChange={(event) => setDownIndex(Number(event.target.value))}
              />
              <div className={styles.rangeTicks}>
                {DOWN_PAYMENT_OPTIONS.map((option) => (
                  <span key={option}>{option}%</span>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                {t('leasing.periodLabel', { defaultValue: 'Okres leasingu' })}
              </span>
              <div className={styles.choiceGrid}>
                {LEASING_MONTHS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.choiceButton} ${
                      months === option ? styles.choiceButtonActive : ''
                    }`}
                    onClick={() => setMonths(option)}
                  >
                    {option} mies.
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>
                {t('leasing.residualLabel', {
                  defaultValue: 'Wykup końcowy',
                })}
              </span>
              <div className={styles.choiceGrid}>
                {RESIDUAL_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.choiceButton} ${
                      residual === option ? styles.choiceButtonActive : ''
                    }`}
                    onClick={() => setResidual(option)}
                  >
                    {option}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.summaryPanel}>
            <div className={styles.summaryLabel}>
              {t('leasing.monthlyGrossLabel', {
                defaultValue: 'Twoja miesięczna rata brutto',
              })}
            </div>
            <div className={styles.monthlyValue}>
              {calculation
                ? formatPrice(calculation.monthlyGross, i18n.resolvedLanguage)
                : '—'}
            </div>

            <div className={styles.summaryGrid}>
              <div className={styles.summaryBox}>
                <span>Łącznie</span>
                <strong>
                  {calculation
                    ? formatPrice(calculation.totalGross, i18n.resolvedLanguage)
                    : '—'}
                </strong>
                <small>brutto</small>
              </div>

              <div className={styles.summaryBox}>
                <span>Dziennie</span>
                <strong>
                  {calculation
                    ? formatPrice(calculation.dailyGross, i18n.resolvedLanguage)
                    : '—'}
                </strong>
                <small>brutto</small>
              </div>
            </div>

            {!isAggregate && calculation ? (
              <div className={styles.compareNote}>
                <p>
                  Wynajem minikoparki z operatorem to około{' '}
                  <strong>
                    {formatPrice(150 * VAT_RATE, i18n.resolvedLanguage)} brutto
                    za godzinę
                  </strong>
                  .
                </p>
                <p>
                  Tutaj masz swoją maszynę od{' '}
                  <strong>
                    {formatPrice(
                      calculation.dailyGross,
                      i18n.resolvedLanguage
                    )}
                  </strong>{' '}
                  brutto dziennie.
                </p>
              </div>
            ) : null}

            <div className={styles.ctaStack}>
              <a
                href={contactLink}
                className={styles.primaryCta}
                onClick={(event) => handleHashScroll(event, contactLink)}
              >
                {t('leasing.ctaPrimary', {
                  defaultValue: 'Otrzymaj ofertę leasingu',
                })}
              </a>
              <a href="tel:+48537493696" className={styles.secondaryCta}>
                {t('leasing.ctaSecondary', {
                  defaultValue: 'Porozmawiaj z doradcą',
                })}
              </a>
            </div>

            <p className={styles.disclaimer}>
              {t('leasing.disclaimer', {
                defaultValue:
                  'Symulacja ma charakter poglądowy i nie stanowi oferty w rozumieniu art. 66 § 1 Kodeksu cywilnego. Ostateczne warunki zależą od firmy leasingowej i oceny zdolności finansowej.',
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}