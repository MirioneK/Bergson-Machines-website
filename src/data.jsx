// ─── MODELS ──────────────────────────────────────────────────────────────────
export const MODELS = [
  {
    id: 'bm10',
    name: 'BM10',
    image: '/images/BM10.jpeg',
    gallery: [
      '/images/BM10.jpeg',
      '/images/BM10.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    priceNetto: 26900,
  },
  {
    id: 'bm12',
    name: 'BM12',
    image: '/images/BM12.jpeg',
    gallery: [
      '/images/BM12.jpeg',
      '/images/BM12.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    priceNetto: 29900,
  },
  {
    id: 'bm12c',
    name: 'BM12C',
    image: '/images/BM12C.jpeg',
    gallery: [
      '/images/BM12C.jpeg',
      '/images/BM12C.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    priceNetto: 33900,
  },
  {
    id: 'bm12cc',
    name: 'BM12Cc',
    image: '/images/BM12C.jpeg',
    gallery: [
      '/images/BM12C.jpeg',
      '/images/BM12C.jpeg',
    ],
    techDrawing: '/images/bm12-technical.png',
    priceNetto: 33900,
  },
]

// ─── ACCESSORIES ─────────────────────────────────────────────────────────────
export const ACCESSORY_PREVIEW = [
  {
    id: 'bucket-200',
    image: '/images/accessories/bucket-200.png',
    priceNetto: 590,
  },
  {
    id: 'bucket-500',
    image: '/images/accessories/bucket-500.png',
    priceNetto: 715,
  },
  {
    id: 'bucket-800',
    image: '/images/accessories/bucket-800.png',
    priceNetto: 800,
  },
  {
    id: 'hydraulic-bucket-800',
    image: '/images/accessories/hydraulic-bucket-800.png',
    priceNetto: 2800,
  },
  {
    id: 'hydraulic-bucket-600',
    image: '/images/accessories/hydraulic-bucket-800.png',
    priceNetto: 2800,
  },
]

// ─── TRUST BAR ───────────────────────────────────────────────────────────────
export const TRUST_ITEMS = [
  { id: 'mobileService', icon: '🔧' },
  { id: 'stockParts', icon: '📦' },
  { id: 'delivery', icon: '🚚' },
  { id: 'vatInvoice', icon: '🧾' },
  { id: 'financing', icon: '📝' },
]

// ─── WHY US ──────────────────────────────────────────────────────────────────
export const WHY_CARDS = [
  {
    id: 'fv',
    icon: '📄',
  },
  {
    id: 'parts',
    icon: '🏭',
  },
  {
    id: 'service',
    icon: '🔧',
  },
  {
    id: 'leasing',
    icon: '💰',
  },
  {
    id: 'advisory',
    icon: '📞',
  },
  {
    id: 'delivery',
    icon: '🚚',
  },
]

// ─── SERVICE LIST ─────────────────────────────────────────────────────────────
export const SERVICE_ITEMS = [
  {
    id: 'warranty',
    icon: '🛡️'
  },
  {
    id: 'mobile',
    icon: '🚗'
  },
  {
    id: 'stock',
    icon: '📦'
  },
  {
    id: 'hotline',
    icon: '📞'
  },
  {
    id: 'docs',
    icon: '📚'
  }
]

// ─── CONTACT INFO ────────────────────────────────────────────────────────────
export const CONTACT_INFO = {
  phone: '+48 600 507 816',
  email: 'kontakt@bergsonmachines.pl',
  location: 'Pobórka Wielka 2',
  locationSub: '89-340 Pobórka Wielka',
  mapEmbedUrl:
    'https://www.google.com/maps/embed/v1/place?key=AIzaSyCuyZxv5_Key0VnVYqW-08bOmUF_nT0StE&q=Pobórka+Wielka+2,+89-340+Pobórka+Wielka',
  mapLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=Pobórka+Wielka+2,+89-340+Pobórka+Wielka',
}
// ─── HELPERS ─────────────────────────────────────────────────────────────────
const VAT = 1.23

const LANGUAGE_TO_LOCALE = {
  pl: 'pl-PL',
  en: 'en-US',
  ua: 'uk-UA',
  uk: 'uk-UA',
}

export const calcBrutto = (netto) => Math.round(netto * VAT)

export const formatPrice = (amount, language = 'pl') => {
  const locale = LANGUAGE_TO_LOCALE[language] || 'pl-PL'

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(amount)
}