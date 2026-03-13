import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import plCommon from './locales/pl/common.json'
import plData from './locales/pl/data.json'

import enCommon from './locales/en/common.json'
import enData from './locales/en/data.json'

import uaCommon from './locales/ua/common.json'
import uaData from './locales/ua/data.json'

import { getPreferredLang } from './routing'

i18n.use(initReactI18next).init({
  resources: {
    pl: {
      common: plCommon,
      data: plData,
    },
    en: {
      common: enCommon,
      data: enData,
    },
    ua: {
      common: uaCommon,
      data: uaData,
    },
  },
  lng: getPreferredLang(),
  fallbackLng: 'pl',
  supportedLngs: ['pl', 'en', 'ua'],
  ns: ['common', 'data'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
  react: {
    useSuspense: false,
  },
})

export default i18n