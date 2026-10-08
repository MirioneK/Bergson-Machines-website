// Źródło: Kalkulator_kontenera_20GP_agregaty.xlsx, zakładka „Cennik Kivon”, kolumna „NASZA cena brutto [PLN]”.
// Modele do 10 kW celowo pominięte (nie są w ofercie).

const RAW = [
  // [marka, kW, model silnika, alternator, waga kg, cena brutto PLN]
  ['Ricardo', 12, '480D', 'PDL-164D', 680, 26900],
  ['Ricardo', 16, '490D', 'PDL-184E', 750, 27900],
  ['Ricardo', 20, '495D', 'PDL-184F', 780, 28900],
  ['Ricardo', 25, '4100D', 'PDL-184G', 800, 32900],
  ['Ricardo', 30, '4100ZD', 'PDL-184H', 850, 36900],
  ['Ricardo', 40, 'ZH4105ZD', 'PDL-224D', 980, 39900],
  ['Ricardo', 50, 'R4105ZD', 'PDL-224E', 1250, 45900],
  ['Ricardo', 60, 'R4105AZLD', 'PDL-224G', 1300, 47900],
  ['Ricardo', 80, '6105AZD', 'PDL-224H', 1550, 58900],
  ['Ricardo', 100, '6105AZLD', 'PDL-274D', 1600, 62900],
  ['Ricardo', 120, '6105IZLD', 'PDL-274E', 1600, 64900],
  ['Ricardo', 150, 'KXD185E215', 'PDL-274G', 2250, 79900],
  // Ricardo 200 kW: brak w arkuszu (brak ceny u dostawcy). Alternator i waga przyjęte
  // po wzorcu innych marek w tej mocy (PDL-274K / 2500 kg jest wspólny dla Weichai,
  // Cummins i Perkins przy 200 kW). Cena i model silnika to PLACEHOLDER — do potwierdzenia
  // przez biznes przed publikacją.
  ['Ricardo', 200, null, 'PDL-274K', 2500, 99900],
  ['Weichai', 20, 'WP2.3D25E200', 'PDL-184F', 780, 32900],
  ['Weichai', 25, 'WP2.3D33E200', 'PDL-184G1', 800, 34900],
  ['Weichai', 30, 'WP2.3D40E200', 'PDL-184H', 850, 38900],
  ['Weichai', 40, 'WP2.3D48E200', 'PDL-224C', 850, 42900],
  ['Weichai', 50, 'WP4.1D66E200', 'PDL-224E', 1250, 48900],
  ['Weichai', 60, 'WP4.1D80E200', 'PDL-224G', 1300, 57900],
  ['Weichai', 80, 'WP4.1D113E200', 'PDL-224H', 1550, 66900],
  ['Weichai', 100, 'WP6D132E200', 'PDL-274D', 1600, 82900],
  ['Weichai', 120, 'WP6D152E200', 'PDL-274E', 1600, 87900],
  ['Weichai', 150, 'WP6D167E200', 'PDL-274E', 1600, 92900],
  ['Weichai', 160, 'WP10D200E200', 'PDL-274G', 2250, 106900],
  ['Weichai', 200, 'WP10D238E200', 'PDL-274K', 2500, 115900],
  ['Cummins', 20, '4B3.9-G2', 'PDL-184F', 780, 46900],
  ['Cummins', 25, '4B3.9-G12', 'PDL-184G1', 800, 47900],
  ['Cummins', 30, '4BT3.9-G2', 'PDL-184J', 850, 48900],
  ['Cummins', 40, '4BTA3.9-G2', 'PDL-224D', 950, 54900],
  ['Cummins', 50, '4BTA3.9-G2', 'PDL-224E', 1250, 59900],
  ['Cummins', 60, '4BTA3.9-G11', 'PDL-224G', 1300, 61900],
  ['Cummins', 80, '6BT5.9-G2', 'PDL-224H', 1550, 68900],
  ['Cummins', 100, '6BTA5.9-G2', 'PDL-274D', 1600, 80900],
  ['Cummins', 120, '6BTAA5.9-G2', 'PDL-274E', 1600, 83900],
  ['Cummins', 150, '6CTA8.3-G2', 'PDL-274E', 1600, 101900],
  ['Cummins', 160, '6CTAA8.3-G2', 'PDL-274G', 2250, 122900],
  ['Cummins', 200, '6LTAA8.9-G2', 'PDL-274K', 2500, 136900],
  ['Perkins', 12, '403A-15G2', 'PDL-164D', 700, 42900],
  ['Perkins', 16, '404A-22G1', 'PDL-184E', 780, 44900],
  ['Perkins', 25, '1103A-33G', 'PDL-184G1', 800, 57900],
  ['Perkins', 40, '1103A-33TG1', 'PDL-224C', 850, 64900],
  ['Perkins', 50, '1104A-44TG1', 'PDL-224E', 1250, 69900],
  ['Perkins', 64, '1104A-44TG2', 'PDL-224G', 1300, 75900],
  ['Perkins', 80, '1104C-44TAG2', 'PDL-274C', 1550, 92900],
  ['Perkins', 108, '1106A-70TG1', 'PDL-274D', 1600, 107900],
  ['Perkins', 120, '1106A-70TAG2', 'PDL-274E', 1600, 117900],
  ['Perkins', 144, '1106A-70TAG3', 'PDL-274G', 1750, 125900],
  ['Perkins', 160, '1106A-70TAG4', 'PDL-274H', 2250, 142900],
  ['Perkins', 200, '1206A-E70TTAG3', 'PDL-274K', 2500, 181900],
  ['KDE', 12, 'KDE12STA', 'SHENZHOU', 235, 11900],
  ['KDE', 15, 'KDE15STA', 'SHENZHOU', 300, 15900],
]

// Modele, których cena i/lub model silnika są orientacyjne (brak danych w arkuszu dostawcy).
const PRICE_TBC_IDS = ['ricardo-200kw']

export const POWER_BANDS = [
  { id: 'p1', label: '12–20 kW', min: 11, max: 20 },
  { id: 'p2', label: '25–40 kW', min: 21, max: 40 },
  { id: 'p3', label: '50–80 kW', min: 41, max: 80 },
  { id: 'p4', label: '100–200 kW', min: 81, max: Infinity },
]

export const ENGINE_BRANDS = ['Ricardo', 'Weichai', 'Cummins', 'Perkins', 'KDE']
export const COOLING_TYPES = [
  { id: 'liquid', label: 'Cieczą' },
  { id: 'air', label: 'Powietrzem' },
]

const kva = (kw) => (kw * 1.25).toLocaleString('pl-PL', { maximumFractionDigits: 2 })

export const AGGREGATES_CATALOG = RAW.map(([engine, kw, engineModel, alternator, weight, priceGross]) => {
  const air = engine === 'KDE'
  const id = `${engine.toLowerCase()}-${kw}kw`

  return {
    id,
    // Numer modelu bez słowa „Agregat”/„Generator” — to słowo jest tłumaczone
    // w UI przez klucz i18n `aggregates.unitName` (PL/EN).
    name: air ? `${kw} kW` : `BM${kw}`,
    engine,
    engineModel,
    alternator,
    kw,
    kva: `${kva(kw)} kVA`,
    weight,
    cooling: air ? 'air' : 'liquid',
    ats: !air,
    priceGross,
    priceTbc: PRICE_TBC_IDS.includes(id),
    band: POWER_BANDS.find((b) => kw >= b.min && kw <= b.max).id,
    image: `/images/optimized/aggregates/${id}.webp`,
  }
})

// Rata orientacyjna: 10% wpłaty własnej + 1% opłaty, 60 mies., mnożnik 1.18 — jak w LeasingCalculatorSection.
export const VAT = 1.23
export function monthlyLeaseNet(priceGross) {
  return ((priceGross / VAT) * 0.89 * 1.18) / 60
}
