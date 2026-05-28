const localized = (pl, en = pl, ua = en) => ({ pl, en, ua })

const TWO_SECTION_PUMP = localized('Dwusekcyjna', 'Two-section', 'Двосекційна')
const BOOM_SWING = localized('Ramię skrętne', 'Boom swing', 'Поворотна стріла')
const YES = localized('Tak', 'Yes', 'Так')
const NO = localized('Nie', 'No', 'Ні')
const CANOPY = localized('Daszek', 'Canopy', 'Навіс')
const FULL_CAB = localized('Pełna kabina', 'Full cabin', 'Повна кабіна')

function buildCardSpecs({
  operatingWeight,
  engine,
  diggingDepth,
  trackExpansion,
  width,
}) {
  const specs = [
    { key: 'operatingWeight', value: operatingWeight },
    { key: 'engine', value: engine },
    { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
    { key: 'additionalEquipment', value: BOOM_SWING },
    { key: 'oilCooler', value: YES },
  ]

  if (diggingDepth) {
    specs.push({ key: 'diggingDepth', value: diggingDepth })
  }

  if (trackExpansion) {
    specs.push({ key: 'trackExpansion', value: trackExpansion })
  } else if (width) {
    specs.push({ key: 'width', value: width })
  }

  return specs
}

const MODEL_CONTENT_FALLBACKS = {
  bm13c: 'bm13',
  'bm13c-kubota': 'bm13-kubota',
}

const MODEL_TEXT_OVERRIDES = {
  bm13c: {
    subtitle: localized(
      'Minikoparka 1,2 tony z kabiną · KOOP 192F · komfort całoroczny',
      '1.2-ton mini excavator with cabin · KOOP 192F · year-round comfort',
      'Мініекскаватор 1,2 тонни з кабіною · KOOP 192F · комфорт протягом усього року'
    ),
    description: localized(
      'BM13C łączy kompaktową platformę 1,2 t z pełną kabiną operatora. To wariant dla użytkowników, którzy chcą zachować zwinność BM13 i jednocześnie pracować wygodniej w deszczu, chłodzie i podczas dłuższych zmian.',
      'BM13C combines the compact 1.2-ton platform with a full operator cabin. It is built for buyers who want the agility of the BM13 while working more comfortably in rain, cold weather and during longer shifts.',
      'BM13C поєднує компактну платформу 1,2 тонни з повною кабіною оператора. Це варіант для тих, хто хоче зберегти маневреність BM13 і водночас працювати комфортніше під дощем, у холоді та під час довших змін.'
    ),
  },
  'bm13c-kubota': {
    subtitle: localized(
      'Minikoparka 1,2 tony z kabiną · Kubota D722 · komfort całoroczny',
      '1.2-ton mini excavator with cabin · Kubota D722 · year-round comfort',
      'Мініекскаватор 1,2 тонни з кабіною · Kubota D722 · комфорт протягом усього року'
    ),
    description: localized(
      'BM13C Kubota to kabinowy wariant platformy 1,2 t z silnikiem Kubota D722. Model powstał dla klientów, którzy chcą połączyć markową jednostkę 3-cylindrową, kompaktowe gabaryty i pełną kabinę operatora w jednej konfiguracji.',
      'BM13C Kubota is the cab-equipped 1.2-ton platform version with a Kubota D722 engine. It is aimed at customers who want a branded 3-cylinder engine, compact dimensions and a full operator cabin in one configuration.',
      'BM13C Kubota — це кабінна версія платформи 1,2 тонни з двигуном Kubota D722. Модель створена для клієнтів, яким потрібні брендовий 3-циліндровий двигун, компактні габарити та повна кабіна оператора в одній конфігурації.'
    ),
  },
}

const MODEL_OVERRIDES = {
  bm12: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
      diggingDepth: localized('1 649 mm'),
      width: localized('933 mm'),
    }),
  },
  bm12c: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
      diggingDepth: localized('1 649 mm'),
      width: localized('933 mm'),
    }),
  },
  bm13: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
      diggingDepth: localized('1 750 mm'),
      trackExpansion: localized('850 - 1050 mm'),
    }),
  },
  'bm13-kubota': {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('Kubota D722 Diesel · 14 KM', 'Kubota D722 Diesel · 14 HP'),
      diggingDepth: localized('1 750 mm'),
      trackExpansion: localized('850 - 1050 mm'),
    }),
  },
  bm13c: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
      diggingDepth: localized('1 750 mm'),
      trackExpansion: localized('850 - 1050 mm'),
    }),
  },
  'bm13c-kubota': {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('Kubota D722 Diesel · 14 KM', 'Kubota D722 Diesel · 14 HP'),
      diggingDepth: localized('1 750 mm'),
      trackExpansion: localized('850 - 1050 mm'),
    }),
  },
  bm16: {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: [
      { key: 'operatingWeight', value: localized('1 600 kg / 1 500 kg') },
      { key: 'engine', value: localized('Laidong 385 Diesel · 25 KM', 'Laidong 385 Diesel · 25 HP') },
      { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
      { key: 'additionalEquipment', value: BOOM_SWING },
      { key: 'oilCooler', value: YES },
      { key: 'diggingDepth', value: localized('1 800 mm') },
      { key: 'trackExpansion', value: localized('1 100 - 1 300 mm') },
    ],
  },
  'bm16-kubota': {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    power: localized('20 KM', '20 HP'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: [
      { key: 'operatingWeight', value: localized('1 600 kg / 1 500 kg') },
      { key: 'engine', value: localized('Kubota D722 Diesel · 20 KM', 'Kubota D722 Diesel · 20 HP') },
      { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
      { key: 'additionalEquipment', value: BOOM_SWING },
      { key: 'oilCooler', value: YES },
      { key: 'diggingDepth', value: localized('1 800 mm') },
      { key: 'trackExpansion', value: localized('1 100 - 1 300 mm') },
    ],
  },
  bm16c: {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: [
      { key: 'operatingWeight', value: localized('1 600 kg / 1 500 kg') },
      { key: 'engine', value: localized('Laidong 385 Diesel · 25 KM', 'Laidong 385 Diesel · 25 HP') },
      { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
      { key: 'additionalEquipment', value: BOOM_SWING },
      { key: 'oilCooler', value: YES },
      { key: 'diggingDepth', value: localized('1 800 mm') },
      { key: 'trackExpansion', value: localized('1 100 - 1 300 mm') },
    ],
  },
  'bm16c-kubota': {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    power: localized('20 KM', '20 HP'),
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: [
      { key: 'operatingWeight', value: localized('1 600 kg / 1 500 kg') },
      { key: 'engine', value: localized('Kubota D722 Diesel · 20 KM', 'Kubota D722 Diesel · 20 HP') },
      { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
      { key: 'additionalEquipment', value: BOOM_SWING },
      { key: 'oilCooler', value: YES },
      { key: 'diggingDepth', value: localized('1 800 mm') },
      { key: 'trackExpansion', value: localized('1 100 - 1 300 mm') },
    ],
  },
}

function resolveLanguage(language) {
  if (language === 'pl') return 'pl'
  if (language === 'ua' || language === 'uk') return 'ua'
  return 'en'
}

function getValue(value, language) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value

  const key = resolveLanguage(language)
  return value[key] ?? value.pl ?? value.en ?? value.ua ?? ''
}

function upsertRow(rows, key, value, index = rows.length) {
  const existingIndex = rows.findIndex((row) => row.key === key)
  const nextRow = { key, value }

  if (existingIndex >= 0) {
    const nextRows = [...rows]
    nextRows[existingIndex] = { ...nextRows[existingIndex], value }
    return nextRows
  }

  return [
    ...rows.slice(0, index),
    nextRow,
    ...rows.slice(index),
  ]
}

export function getModelContentId(modelId) {
  return MODEL_CONTENT_FALLBACKS[modelId] ?? modelId
}

export function getModelText(modelId, language, field, fallbackValue = '') {
  const override = MODEL_TEXT_OVERRIDES[modelId]
  if (!override?.[field]) return fallbackValue
  return getValue(override[field], language)
}

export function getModelCardSpecs(modelId, language, fallbackSpecs) {
  const override = MODEL_OVERRIDES[modelId]
  if (!override) return fallbackSpecs

  return override.cardSpecs.map((item) => ({
    key: item.key,
    value: getValue(item.value, language),
  }))
}

export function getModelAccordions(modelId, language, fallbackAccordions) {
  const override = MODEL_OVERRIDES[modelId]
  if (!override) return fallbackAccordions

  return fallbackAccordions.map((accordion) => {
    const rows = Array.isArray(accordion.rows) ? accordion.rows.map((row) => ({ ...row })) : []

    if (accordion.titleKey === 'specification') {
      let nextRows = rows.filter((row) => row.key !== 'totalWeight')
      nextRows = upsertRow(nextRows, 'operatingWeight', getValue(override.operatingWeight, language))
      nextRows = upsertRow(nextRows, 'totalWeight', getValue(override.totalWeight, language), 0)

      if (override.cabin) {
        nextRows = upsertRow(nextRows, 'cabin', getValue(override.cabin, language), 2)
      }

      return { ...accordion, rows: nextRows }
    }

    if (accordion.titleKey === 'engine' && override.power) {
      return {
        ...accordion,
        rows: upsertRow(rows, 'power', getValue(override.power, language), 2),
      }
    }

    if (accordion.titleKey === 'hydraulics') {
      return {
        ...accordion,
        rows: upsertRow(rows, 'hydraulicPump', getValue(TWO_SECTION_PUMP, language), 0),
      }
    }

    if (accordion.titleKey === 'operatorCab') {
      let nextRows = rows

      if (override.operatorStructure) {
        nextRows = upsertRow(
          nextRows,
          'operatorStructure',
          getValue(override.operatorStructure, language),
          2
        )
      }

      if (override.cabinHeating) {
        nextRows = upsertRow(
          nextRows,
          'cabinHeating',
          getValue(override.cabinHeating, language),
          3
        )
      }

      return { ...accordion, rows: nextRows }
    }

    return accordion
  })
}
