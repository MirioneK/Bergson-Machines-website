import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MODELS, formatPrice } from '../data'
import { useHashScroll } from '../hooks/useHashScroll'
import { useLangPath } from '../hooks/useLangPath'
import { useReveal } from '../hooks/useReveal'
import styles from './ModelComparatorSection.module.css'

const MODEL_LOOKUP = Object.fromEntries(
  MODELS.map((model) => [model.id, model])
)

const COMPARE_MODELS = [
  {
    id: 'bm12',
    name: MODEL_LOOKUP['bm12']?.name ?? 'BM10',
    priceNetto: MODEL_LOOKUP['bm12']?.priceNetto ?? 20244,
    bestseller: false,
    engine: 'KOOP 192 Diesel',
    enginePower: '10 KM',
    enginePowerNum: 10,
    cylinders: '1',
    mass: '1 200 kg / 1 100 kg',
    depth: '1 700 mm',
    depthNum: 1700,
    reach: '1 490 mm',
    reachNum: 1490,
    digForce: '6,5 kN',
    digForceNum: 6.5,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Daszek',
    heating: 'Nie',
    dimensions: '2870 × 930 × 2200 mm',
    tracks: 'Brak (stałe ~930 mm)',
  },
  {
    id: 'bm12c',
    name: MODEL_LOOKUP['bm12c']?.name ?? 'BM10C',
    priceNetto: MODEL_LOOKUP['bm12c']?.priceNetto ?? 23496,
    bestseller: false,
    engine: 'KOOP 192 Diesel',
    enginePower: '10 KM',
    enginePowerNum: 10,
    cylinders: '1',
    mass: '1 300 kg / 1 200 kg',
    depth: '1 700 mm',
    depthNum: 1700,
    reach: '1 490 mm',
    reachNum: 1490,
    digForce: '6,5 kN',
    digForceNum: 6.5,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Pełna kabina',
    heating: 'Nie',
    dimensions: '2870 × 930 × ~2400 mm',
    tracks: 'Brak (stałe ~930 mm)',
  },
  {
    id: 'bm13',
    name: MODEL_LOOKUP['bm13']?.name ?? 'BM11',
    priceNetto: MODEL_LOOKUP['bm13']?.priceNetto ?? 24309,
    bestseller: false,
    engine: 'KOOP 192F Diesel',
    enginePower: '10 KM',
    enginePowerNum: 10,
    cylinders: '1',
    mass: '1 200 kg / 1 100 kg',
    depth: '1 750 mm',
    depthNum: 1750,
    reach: '2 750 mm',
    reachNum: 2750,
    digForce: '14 kN',
    digForceNum: 14,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Daszek',
    heating: 'Nie',
    dimensions: '2870 × 1000 × ~2400 mm',
    tracks: '850-1050 mm',
  },
  {
    id: 'bm13-kubota',
    name: MODEL_LOOKUP['bm13-kubota']?.name ?? 'BM11 KUBOTA',
    priceNetto: MODEL_LOOKUP['bm13-kubota']?.priceNetto ?? 36585,
    bestseller: false,
    engine: 'Kubota D722 Diesel',
    enginePower: '14 KM',
    enginePowerNum: 14,
    cylinders: '3',
    mass: '1 200 kg / 1 100 kg',
    depth: '1 750 mm',
    depthNum: 1750,
    reach: '2 750 mm',
    reachNum: 2750,
    digForce: '14 kN',
    digForceNum: 14,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Daszek',
    heating: 'Nie',
    dimensions: '2870 × 1000 × ~2400 mm',
    tracks: '850-1050 mm',
  },
  {
    id: 'bm13c',
    name: MODEL_LOOKUP['bm13c']?.name ?? 'BM11C',
    priceNetto: MODEL_LOOKUP['bm13c']?.priceNetto ?? 27561,
    bestseller: false,
    engine: 'KOOP 192F Diesel',
    enginePower: '10 KM',
    enginePowerNum: 10,
    cylinders: '1',
    mass: '1 300 kg / 1 200 kg',
    depth: '1 750 mm',
    depthNum: 1750,
    reach: '2 750 mm',
    reachNum: 2750,
    digForce: '14 kN',
    digForceNum: 14,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Pełna kabina',
    heating: 'Tak',
    dimensions: '2870 × 1000 × 2200 mm',
    tracks: '850-1050 mm',
  },
  {
    id: 'bm13c-kubota',
    name: MODEL_LOOKUP['bm13c-kubota']?.name ?? 'BM11C KUBOTA',
    priceNetto: MODEL_LOOKUP['bm13c-kubota']?.priceNetto ?? 39756,
    bestseller: false,
    engine: 'Kubota D722 Diesel',
    enginePower: '14 KM',
    enginePowerNum: 14,
    cylinders: '3',
    mass: '1 300 kg / 1 200 kg',
    depth: '1 750 mm',
    depthNum: 1750,
    reach: '2 750 mm',
    reachNum: 2750,
    digForce: '14 kN',
    digForceNum: 14,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Pełna kabina',
    heating: 'Tak',
    dimensions: '2870 × 1000 × 2200 mm',
    tracks: '850-1050 mm',
  },
  {
    id: 'bm16',
    name: MODEL_LOOKUP['bm16']?.name ?? 'BM15 LAIDONG',
    priceNetto: MODEL_LOOKUP['bm16']?.priceNetto ?? 35691,
    bestseller: false,
    engine: 'Laidong 385 Diesel',
    enginePower: '25 KM',
    enginePowerNum: 25,
    cylinders: '3',
    mass: '1 600 kg / 1 500 kg',
    depth: '1 800 mm',
    depthNum: 1800,
    reach: '2 900 mm',
    reachNum: 2900,
    digForce: '15 kN',
    digForceNum: 15,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Daszek',
    heating: 'Nie',
    dimensions: '2870 × 1100 × 2200 mm',
    tracks: '1100-1300 mm',
  },
  {
    id: 'bm16-kubota',
    name: MODEL_LOOKUP['bm16-kubota']?.name ?? 'BM15 KUBOTA',
    priceNetto: MODEL_LOOKUP['bm16-kubota']?.priceNetto ?? 43821,
    bestseller: false,
    engine: 'Kubota D722 Diesel',
    enginePower: '20 KM',
    enginePowerNum: 20,
    cylinders: '3',
    mass: '1 600 kg / 1 500 kg',
    depth: '1 800 mm',
    depthNum: 1800,
    reach: '2 900 mm',
    reachNum: 2900,
    digForce: '15 kN',
    digForceNum: 15,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Daszek',
    heating: 'Nie',
    dimensions: '2870 × 1100 × 2200 mm',
    tracks: '1100-1300 mm',
  },
  {
    id: 'bm16c',
    name: MODEL_LOOKUP['bm16c']?.name ?? 'BM15C LAIDONG',
    priceNetto: MODEL_LOOKUP['bm16c']?.priceNetto ?? 38943,
    bestseller: true,
    engine: 'Laidong 385 Diesel',
    enginePower: '25 KM',
    enginePowerNum: 25,
    cylinders: '3',
    mass: '1 600 kg / 1 500 kg',
    depth: '1 800 mm',
    depthNum: 1800,
    reach: '2 900 mm',
    reachNum: 2900,
    digForce: '15 kN',
    digForceNum: 15,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Pełna kabina',
    heating: 'Tak',
    dimensions: '2870 × 1100 × 2200 mm',
    tracks: '1100-1300 mm',
  },
  {
    id: 'bm16c-kubota',
    name: MODEL_LOOKUP['bm16c-kubota']?.name ?? 'BM15C KUBOTA',
    priceNetto: MODEL_LOOKUP['bm16c-kubota']?.priceNetto ?? 47073,
    bestseller: false,
    engine: 'Kubota D722 Diesel',
    enginePower: '20 KM',
    enginePowerNum: 20,
    cylinders: '3',
    mass: '1 600 kg / 1 500 kg',
    depth: '1 800 mm',
    depthNum: 1800,
    reach: '2 900 mm',
    reachNum: 2900,
    digForce: '15 kN',
    digForceNum: 15,
    hydraulicPump: 'Dwusekcyjna',
    additionalEquipment: 'Ramię skrętne',
    oilCooler: 'Tak',
    cabin: 'Pełna kabina',
    heating: 'Tak',
    dimensions: '2870 × 1100 × 2200 mm',
    tracks: '1100-1300 mm',
  },
]

const COMPARE_MODEL_LOOKUP = Object.fromEntries(
  COMPARE_MODELS.map((model) => [model.id, model])
)

const ROWS = [
  { section: 'W skrócie' },
  { label: 'Cena netto', key: 'priceNetto', best: 'min' },
  { label: 'Bestseller', key: 'bestseller', format: (value) => (value ? 'Tak' : '—') },
  { section: 'Silnik' },
  { label: 'Producent + model', key: 'engine' },
  { label: 'Moc', key: 'enginePower', cmpKey: 'enginePowerNum', best: 'max' },
  { label: 'Liczba cylindrów', key: 'cylinders' },
  { label: 'Pompa hydrauliczna', key: 'hydraulicPump' },
  { label: 'Dodatkowe wyposażenie', key: 'additionalEquipment' },
  { label: 'Chłodnica oleju hydraulicznego', key: 'oilCooler' },
  { section: 'Parametry robocze' },
  { label: 'Masa robocza / własna', key: 'mass' },
  {
    label: 'Maks. głębokość kopania',
    key: 'depth',
    cmpKey: 'depthNum',
    best: 'max',
  },
  {
    label: 'Maks. zasięg kopania',
    key: 'reach',
    cmpKey: 'reachNum',
    best: 'max',
  },
  {
    label: 'Siła kopania łyżki',
    key: 'digForce',
    cmpKey: 'digForceNum',
    best: 'max',
  },
  { section: 'Komfort' },
  { label: 'Konstrukcja nad operatorem', key: 'cabin' },
  { label: 'Ogrzewanie kabiny', key: 'heating' },
  { section: 'Wymiary' },
  { label: 'Wymiary (dł. × szer. × wys.)', key: 'dimensions' },
  { label: 'Rozszerzanie gąsienic', key: 'tracks' },
]

export default function ModelComparatorSection() {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()
  const handleHashScroll = useHashScroll()

  const [headerRef, headerVisible] = useReveal()
  const [tableRef, tableVisible] = useReveal()
  const [selectedIds, setSelectedIds] = useState(['bm12', 'bm13c', 'bm16c-kubota'])

  const contactLink = langPath('/', '#kontakt')

  const selectedModels = useMemo(
    () => selectedIds.map((id) => COMPARE_MODEL_LOOKUP[id]).filter(Boolean),
    [selectedIds]
  )

  const updateColumn = (columnIndex, nextId) => {
    setSelectedIds((current) => {
      const next = [...current]
      next[columnIndex] = nextId
      return next
    })
  }

  const formatCellValue = (row, value) => {
    if (row.key === 'priceNetto') {
      return formatPrice(value, i18n.resolvedLanguage)
    }

    return row.format ? row.format(value) : value
  }

  return (
    <section
      className={styles.section}
      id="porownaj"
      aria-labelledby="compare-title"
    >
      <div className={`page-shell ${styles.inner}`}>
        <header
          ref={headerRef}
          className={`${styles.header} reveal ${headerVisible ? 'visible' : ''}`}
        >
          <span className={styles.label}>
            {t('compare.label', { defaultValue: 'Porównanie modeli' })}
          </span>
          <h2 className={styles.title} id="compare-title">
            {t('compare.title', {
              defaultValue: 'Porównaj modele przed rozmową z doradcą',
            })}
          </h2>
          <p className={styles.lead}>
            {t('compare.lead', {
              defaultValue:
                'Zobacz różnice w silniku, gabarytach i komforcie pracy. Tabela opiera się na tej samej ofercie, która jest aktualnie widoczna na stronie.',
            })}
          </p>
        </header>

        <div
          ref={tableRef}
          className={`${styles.card} reveal ${tableVisible ? 'visible' : ''}`}
          style={{ transitionDelay: '120ms' }}
        >
          <div className={styles.pickerGrid}>
            {selectedIds.map((modelId, index) => (
              <label key={`${modelId}-${index}`} className={styles.picker}>
                <span className={styles.pickerLabel}>
                  {t('compare.columnLabel', {
                    defaultValue: `Model ${index + 1}`,
                  })}
                </span>
                <select
                  value={modelId}
                  onChange={(event) => updateColumn(index, event.target.value)}
                  className={styles.select}
                  aria-label={`Model w kolumnie ${index + 1}`}
                >
                  {COMPARE_MODELS.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.paramHeader}>Parametr</th>
                  {selectedModels.map((model) => (
                    <th key={model.id} className={styles.modelHeader}>
                      <span>{model.name}</span>
                      <strong>
                        {formatPrice(model.priceNetto, i18n.resolvedLanguage)}
                      </strong>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, index) => {
                  if (row.section) {
                    return (
                      <tr key={`section-${index}`} className={styles.sectionRow}>
                        <td colSpan={selectedModels.length + 1}>{row.section}</td>
                      </tr>
                    )
                  }

                  const values = selectedModels.map((model) => model[row.key])
                  const compareValues = row.cmpKey
                    ? selectedModels.map((model) => model[row.cmpKey])
                    : values
                  const allSame = values.every((value) => value === values[0])

                  let bestValue = null

                  if (row.best && !allSame) {
                    const numericValues = compareValues.filter(
                      (value) => typeof value === 'number'
                    )

                    if (numericValues.length > 0) {
                      bestValue =
                        row.best === 'min'
                          ? Math.min(...numericValues)
                          : Math.max(...numericValues)
                    }
                  }

                  return (
                    <tr key={`row-${index}`} className={styles.dataRow}>
                      <td className={styles.paramCell}>{row.label}</td>
                      {values.map((value, columnIndex) => {
                        const compareValue = compareValues[columnIndex]
                        const isBest =
                          bestValue !== null && compareValue === bestValue
                        const displayValue = formatCellValue(row, value)

                        return (
                          <td
                            key={`${row.key}-${columnIndex}`}
                            className={`${styles.valueCell} ${isBest ? styles.valueCellBest : ''}`}
                          >
                            {displayValue}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              {t('compare.footer', {
                defaultValue:
                  'Jeśli chcesz zawęzić wybór do konkretnej działki, budowy albo rodzaju prac, dobierzemy model razem z Tobą.',
              })}
            </p>

            <a
              href={contactLink}
              className={styles.cta}
              onClick={(event) => handleHashScroll(event, contactLink)}
            >
              {t('compare.cta', { defaultValue: 'Dobierz model z doradcą' })}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
