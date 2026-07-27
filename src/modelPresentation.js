const localized = (pl, en = pl, ua = en) => ({ pl, en, ua })

const TWO_SECTION_PUMP = localized('Dwusekcyjna', 'Two-section', 'Двосекційна')
const YES = localized('Tak', 'Yes', 'Так')
const NO = localized('Nie', 'No', 'Ні')
const CANOPY = localized('Daszek', 'Canopy', 'Навіс')
const FULL_CAB = localized('Pełna kabina', 'Full cabin', 'Повна кабіна')
const CARD_ADDITIONAL_EQUIPMENT = localized(
  'Ramię skrętne, chłodnica oleju hydraulicznego',
  'Boom swing, hydraulic oil cooler',
  'Поворотна стріла, охолоджувач гідравлічної оливи'
)
const CONDITION_NEW = localized('Nowa', 'New', 'Нова')
const RUBBER = localized('Guma', 'Rubber', 'Гума')
const FIXED_TRACKS_930 = localized(
  'Brak (stałe ~930 mm)',
  'None (fixed ~930 mm)',
  'Немає (фіксовані ~930 мм)'
)

const ACCORDION_ORDER = [
  'specification',
  'engine',
  'workingRange',
  'undercarriage',
  'hydraulics',
  'operatorCab',
  'dimensionsAndWeight',
]

function buildCardSpecs({ operatingWeight, engine }) {
  return [
    { key: 'operatingWeight', value: operatingWeight },
    { key: 'engine', value: engine },
    { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
    { key: 'additionalEquipment', value: CARD_ADDITIONAL_EQUIPMENT },
  ]
}

const MODEL_CONTENT_FALLBACKS = {
  bm13c: 'bm13',
  'bm13c-kubota': 'bm13-kubota',
}

const MODEL_TEXT_OVERRIDES = {
  'bm17c-laidong': {
    subtitle: localized(
      'Minikoparka 1,7 t · Laidong · pełna kabina z ogrzewaniem i klimatyzacją',
      '1.7-ton mini excavator · Laidong · full cabin with heating and air conditioning',
      'Мініекскаватор 1,7 т · Laidong · повна кабіна з опаленням і кондиціонером'
    ),
    badge: localized('Nowość', 'New', 'Новинка'),
    description: localized(
      'BM17C to kompaktowa minikoparka o masie 1,7 t, zbudowana z myślą o pracy w ciasnych przestrzeniach i w każdych warunkach pogodowych. Pełna, zamknięta kabina z ogrzewaniem i klimatyzacją zapewnia operatorowi komfort niezależnie od pory roku. Idealna do prac przy zagospodarowaniu terenu, remontach, rozbiórkach wewnętrznych, w rolnictwie i mikroinżynierii komunalnej.',
      'BM17C is a compact 1.7-ton mini excavator built for work in tight spaces and all weather conditions. A full enclosed cabin with heating and air conditioning keeps the operator comfortable throughout the year. It is suited to landscaping, renovation work, indoor demolition, agriculture and municipal micro-engineering.',
      'BM17C — компактний мініекскаватор масою 1,7 т для роботи в тісних просторах і за будь-яких погодних умов. Повна закрита кабіна з опаленням і кондиціонером забезпечує комфорт оператора протягом року.'
    ),
  },
  bm13c: {
    subtitle: localized(
      'Minikoparka 1,2 tony z kabiną · KOOP 192F · komfort całoroczny',
      '1.2-ton mini excavator with cabin · KOOP 192F · year-round comfort',
      'Мініекскаватор 1,2 тонни з кабіною · KOOP 192F · комфорт протягом усього року'
    ),
    description: localized(
      'BM11C łączy kompaktową platformę 1,2 t z pełną kabiną operatora. To wariant dla użytkowników, którzy chcą zachować zwinność BM11 i jednocześnie pracować wygodniej w deszczu, chłodzie i podczas dłuższych zmian.',
      'BM11C combines the compact 1.2-ton platform with a full operator cabin. It is built for buyers who want the agility of the BM11 while working more comfortably in rain, cold weather and during longer shifts.',
      'BM11C поєднує компактну платформу 1,2 тонни з повною кабіною оператора. Це варіант для тих, хто хоче зберегти маневреність BM11 і водночас працювати комфортніше під дощем, у холоді та під час довших змін.'
    ),
  },
  'bm13c-kubota': {
    subtitle: localized(
      'Minikoparka 1,2 tony z kabiną · Kubota D722 · komfort całoroczny',
      '1.2-ton mini excavator with cabin · Kubota D722 · year-round comfort',
      'Мініекскаватор 1,2 тонни з кабіною · Kubota D722 · комфорт протягом усього року'
    ),
    description: localized(
      'BM11C Kubota to kabinowy wariant platformy 1,2 t z silnikiem Kubota D722. Model powstał dla klientów, którzy chcą połączyć markową jednostkę 3-cylindrową, kompaktowe gabaryty i pełną kabinę operatora w jednej konfiguracji.',
      'BM11C Kubota is the cab-equipped 1.2-ton platform version with a Kubota D722 engine. It is aimed at customers who want a branded 3-cylinder engine, compact dimensions and a full operator cabin in one configuration.',
      'BM11C Kubota — це кабінна версія платформи 1,2 тонни з двигуном Kubota D722. Модель створена для клієнтів, яким потрібні брендований 3-циліндровий двигун, компактні габарити та повна кабіна оператора в одній конфігурації.'
    ),
  },
}

const MODEL_OVERRIDES = {
  'bm17c-laidong': {
    totalWeight: localized('1 700 kg'),
    operatingWeight: localized('1 700 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 700 kg'),
      engine: localized('Laidong D722 / D902D · 25 KM', 'Laidong D722 / D902D · 25 HP'),
    }),
    accordionRows: {
      specification: [
        { key: 'operatingWeight', value: localized('1 700 kg') },
        { key: 'certificate', value: YES },
        { key: 'condition', value: CONDITION_NEW },
      ],
      engine: [
        { key: 'engineBrand', value: localized('Laidong') },
        { key: 'engineModel', value: localized('Laidong D722 / D902D') },
        { key: 'power', value: localized('25 KM (~18,4 kW)', '25 HP (~18.4 kW)') },
        { key: 'cylinders', value: localized('3 (potrójny)', '3') },
        { key: 'fuelType', value: localized('Diesel') },
      ],
      workingRange: [
        { key: 'maxDiggingDepth', value: localized('2 030 mm') },
        { key: 'maxDiggingRadius', value: localized('3 000 mm') },
        { key: 'maxDiggingHeight', value: localized('2 750 mm') },
        { key: 'maxDumpingHeight', value: localized('2 100 mm') },
        { key: 'diggingForce', value: localized('18 kN') },
        { key: 'bucketCapacity', value: localized('0,03 m³', '0.03 m³') },
        { key: 'bladeHeight', value: localized('350 mm') },
      ],
      undercarriage: [
        { key: 'trackWidth', value: localized('230 mm') },
        { key: 'trackGroundContactLength', value: localized('1 550 mm') },
        { key: 'trackMaterial', value: RUBBER },
        { key: 'travelSpeed', value: localized('0-3,5 km/h', '0-3.5 km/h') },
        { key: 'gradeability', value: localized('30°') },
      ],
      hydraulics: [
        { key: 'hydraulicPump', value: localized('Dwustrumieniowa', 'Dual-flow', 'Двопотокова') },
        { key: 'auxHydraulics', value: YES },
        { key: 'hydraulicHoseCover', value: YES },
      ],
      operatorCab: [
        { key: 'joystickControl', value: YES },
        { key: 'seatBelts', value: YES },
        { key: 'operatorStructure', value: FULL_CAB },
        { key: 'cabinHeating', value: YES },
        { key: 'airConditioning', value: YES },
        { key: 'workLights', value: localized('Tak (LED)', 'Yes (LED)', 'Так (LED)') },
      ],
      dimensionsAndWeight: [
        { key: 'overallDimensions', value: localized('2 950 x 1 150 x 2 300 mm') },
        { key: 'fitsTrailer', value: YES },
      ],
    },
  },
  bm12: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192 Diesel · 10 KM', 'KOOP 192 Diesel · 10 HP'),
    }),
    accordionRows: {
      specification: [
        { key: 'engine', value: localized('KOOP 192 Diesel · 10 KM', 'KOOP 192 Diesel · 10 HP') },
        { key: 'certificate', value: YES },
        { key: 'condition', value: CONDITION_NEW },
      ],
      engine: [
        { key: 'engineBrand', value: localized('KOOP') },
        { key: 'engineModel', value: localized('KOOP 192 Diesel') },
        { key: 'power', value: localized('10 KM (7,6 kW)', '10 HP (7.6 kW)') },
        { key: 'cylinders', value: localized('1 (pojedynczy)', '1 (single)') },
        { key: 'fuelType', value: localized('Diesel') },
      ],
      workingRange: [
        { key: 'maxDiggingDepth', value: localized('1 700 mm') },
        { key: 'maxDiggingRadius', value: localized('1 490 mm') },
        { key: 'maxDiggingHeight', value: localized('1 745 mm') },
        { key: 'maxDumpingHeight', value: localized('1 725 mm') },
        { key: 'diggingForce', value: localized('6,5 kN', '6.5 kN') },
        { key: 'bucketCapacity', value: localized('0,022 m³', '0.022 m³') },
      ],
      undercarriage: [
        { key: 'trackExpansion', value: FIXED_TRACKS_930 },
        { key: 'trackMaterial', value: RUBBER },
        { key: 'travelSpeed', value: localized('1,2 km/h', '1.2 km/h') },
        { key: 'gradeability', value: localized('30 stopni', '30 degrees') },
      ],
      hydraulics: [
        { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
        { key: 'oilCooler', value: YES },
      ],
      operatorCab: [
        { key: 'joystickControl', value: YES },
        { key: 'boomSwing', value: YES },
        { key: 'operatorStructure', value: CANOPY },
        { key: 'cabinHeating', value: NO },
        { key: 'workLights', value: YES },
      ],
      dimensionsAndWeight: [
        { key: 'overallDimensions', value: localized('2870 x 930 x 2200 mm') },
        { key: 'fitsTrailer', value: YES },
      ],
    },
  },
  bm12c: {
    totalWeight: localized('1 200 kg'),
    operatingWeight: localized('1 300 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 300 kg / 1 200 kg'),
      engine: localized('KOOP 192 Diesel · 10 KM', 'KOOP 192 Diesel · 10 HP'),
    }),
    accordionRows: {
      specification: [
        { key: 'engine', value: localized('KOOP 192 Diesel · 10 KM', 'KOOP 192 Diesel · 10 HP') },
        { key: 'certificate', value: YES },
        { key: 'condition', value: CONDITION_NEW },
      ],
      engine: [
        { key: 'engineBrand', value: localized('KOOP') },
        { key: 'engineModel', value: localized('KOOP 192 Diesel') },
        { key: 'power', value: localized('10 KM (7,6 kW)', '10 HP (7.6 kW)') },
        { key: 'cylinders', value: localized('1 (pojedynczy)', '1 (single)') },
        { key: 'fuelType', value: localized('Diesel') },
      ],
      workingRange: [
        { key: 'maxDiggingDepth', value: localized('1 700 mm') },
        { key: 'maxDiggingRadius', value: localized('1 490 mm') },
        { key: 'maxDiggingHeight', value: localized('1 745 mm') },
        { key: 'maxDumpingHeight', value: localized('1 725 mm') },
        { key: 'diggingForce', value: localized('6,5 kN', '6.5 kN') },
        { key: 'bucketCapacity', value: localized('0,022 m³', '0.022 m³') },
      ],
      undercarriage: [
        { key: 'trackExpansion', value: FIXED_TRACKS_930 },
        { key: 'trackMaterial', value: RUBBER },
        { key: 'travelSpeed', value: localized('1,2 km/h', '1.2 km/h') },
        { key: 'gradeability', value: localized('30 stopni', '30 degrees') },
      ],
      hydraulics: [
        { key: 'hydraulicPump', value: TWO_SECTION_PUMP },
        { key: 'oilCooler', value: YES },
      ],
      operatorCab: [
        { key: 'joystickControl', value: YES },
        { key: 'boomSwing', value: YES },
        { key: 'operatorStructure', value: FULL_CAB },
        { key: 'cabinHeating', value: NO },
        { key: 'workLights', value: YES },
      ],
      dimensionsAndWeight: [
        { key: 'overallDimensions', value: localized('2870 x 930 x ~2400 mm') },
        { key: 'fitsTrailer', value: YES },
      ],
    },
  },
  bm13: {
    totalWeight: localized('1 100 kg'),
    operatingWeight: localized('1 200 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 200 kg / 1 100 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
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
    }),
  },
  bm13c: {
    totalWeight: localized('1 200 kg'),
    operatingWeight: localized('1 300 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 300 kg / 1 200 kg'),
      engine: localized('KOOP 192F Diesel · 10 KM', 'KOOP 192F Diesel · 10 HP'),
    }),
    accordionRows: {
      dimensionsAndWeight: [
        { key: 'overallDimensions', value: localized('2870 x 1000 x ~2400 mm') },
      ],
    },
  },
  'bm13c-kubota': {
    totalWeight: localized('1 200 kg'),
    operatingWeight: localized('1 300 kg'),
    cabin: FULL_CAB,
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 300 kg / 1 200 kg'),
      engine: localized('Kubota D722 Diesel · 14 KM', 'Kubota D722 Diesel · 14 HP'),
    }),
    accordionRows: {
      dimensionsAndWeight: [
        { key: 'overallDimensions', value: localized('2870 x 1000 x ~2400 mm') },
      ],
    },
  },
  bm16: {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 600 kg / 1 500 kg'),
      engine: localized('Laidong 385 Diesel · 25 KM', 'Laidong 385 Diesel · 25 HP'),
    }),
  },
  'bm16-kubota': {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    power: localized('20 KM', '20 HP'),
    operatorStructure: CANOPY,
    cabinHeating: NO,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 600 kg / 1 500 kg'),
      engine: localized('Kubota D722 Diesel · 20 KM', 'Kubota D722 Diesel · 20 HP'),
    }),
  },
  bm16c: {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 600 kg / 1 500 kg'),
      engine: localized('Laidong 385 Diesel · 25 KM', 'Laidong 385 Diesel · 25 HP'),
    }),
  },
  'bm16c-kubota': {
    totalWeight: localized('1 500 kg'),
    operatingWeight: localized('1 600 kg'),
    power: localized('20 KM', '20 HP'),
    operatorStructure: FULL_CAB,
    cabinHeating: YES,
    cardSpecs: buildCardSpecs({
      operatingWeight: localized('1 600 kg / 1 500 kg'),
      engine: localized('Kubota D722 Diesel · 20 KM', 'Kubota D722 Diesel · 20 HP'),
    }),
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

function upsertAccordion(accordions, titleKey, rows) {
  const accordionIndex = accordions.findIndex((accordion) => accordion.titleKey === titleKey)

  if (accordionIndex >= 0) {
    let nextRows = Array.isArray(accordions[accordionIndex].rows)
      ? accordions[accordionIndex].rows.map((row) => ({ ...row }))
      : []

    rows.forEach((row, rowIndex) => {
      nextRows = upsertRow(nextRows, row.key, row.value, rowIndex)
    })

    const nextAccordions = [...accordions]
    nextAccordions[accordionIndex] = {
      ...nextAccordions[accordionIndex],
      rows: nextRows,
    }
    return nextAccordions
  }

  return [
    ...accordions,
    {
      titleKey,
      rows,
    },
  ]
}

function sortAccordions(accordions) {
  return [...accordions].sort((left, right) => {
    const leftIndex = ACCORDION_ORDER.indexOf(left.titleKey)
    const rightIndex = ACCORDION_ORDER.indexOf(right.titleKey)
    const safeLeftIndex = leftIndex >= 0 ? leftIndex : ACCORDION_ORDER.length
    const safeRightIndex = rightIndex >= 0 ? rightIndex : ACCORDION_ORDER.length

    return safeLeftIndex - safeRightIndex
  })
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

  let nextAccordions = fallbackAccordions.map((accordion) => {
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

  if (override.accordionRows) {
    Object.entries(override.accordionRows).forEach(([titleKey, rows]) => {
      const translatedRows = rows.map((row) => ({
        key: row.key,
        value: getValue(row.value, language),
      }))

      nextAccordions = upsertAccordion(nextAccordions, titleKey, translatedRows)
    })
  }

  return sortAccordions(nextAccordions)
}
