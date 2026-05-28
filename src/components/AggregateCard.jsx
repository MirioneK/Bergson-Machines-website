import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcBrutto, formatPrice } from '../data'
import { useLangPath } from '../hooks/useLangPath'
import ProductCard from './ProductCard'

const AGGREGATE_CARD_SPEC_PRIORITY = [
  'engineBrand',
  'ratedPower',
  'atsSystem',
  'avrRegulator',
  'outputVoltage',
]

function getCompactAggregateCardSpecs(cardSpecs) {
  const selected = []

  AGGREGATE_CARD_SPEC_PRIORITY.forEach((key) => {
    const match = cardSpecs.find((item) => item?.key === key)
    if (match) {
      selected.push(match)
    }
  })

  if (selected.length >= 3) {
    return selected.slice(0, 3)
  }

  cardSpecs.forEach((item) => {
    if (!selected.find((selectedItem) => selectedItem.key === item?.key)) {
      selected.push(item)
    }
  })

  return selected.slice(0, 3)
}

export default function AggregateCard({ aggregate }) {
  const { t, i18n } = useTranslation()
  const langPath = useLangPath()

  const { id, image, priceNetto, featured } = aggregate

  const name = t(`aggregates.${id}.name`, {
    ns: 'data',
    defaultValue: id,
  })

  const subtitle = t(`aggregates.${id}.subtitle`, {
    ns: 'data',
    defaultValue: '',
  })

  const badge = t(`aggregates.${id}.badge`, {
    ns: 'data',
    defaultValue: '',
  })

  const cardSpecsRaw = t(`aggregates.${id}.cardSpecs`, {
    ns: 'data',
    returnObjects: true,
    defaultValue: [],
  })

  const cardSpecs = Array.isArray(cardSpecsRaw)
    ? cardSpecsRaw.filter((item) => item?.key !== 'deliveryTime')
    : []
  const compactCardSpecs = getCompactAggregateCardSpecs(cardSpecs)
  const priceBrutto = calcBrutto(priceNetto)

  return (
    <ProductCard
      id={id}
      titleIdPrefix="aggregate"
      to={langPath(`/agregaty/${id}`)}
      featured={featured}
      ariaLabel={t('aggregateCard.ariaLabel', { name })}
      imageAlt={t('aggregateCard.imageAlt', { name })}
      image={image}
      badge={badge}
      title={name}
      subtitle={subtitle}
      specsAriaLabel={t('aggregateCard.specsAriaLabel', { name })}
      cardSpecs={compactCardSpecs}
      resolveSpecLabel={(key) =>
        t(`aggregateCard.specLabels.${key}`, {
          defaultValue: key,
        })
      }
      pricePrefix={t('aggregateCard.pricePrefix')}
      formattedPrice={formatPrice(priceBrutto, i18n.resolvedLanguage)}
      priceLabel={t('aggregateCard.priceGrossLabel', { defaultValue: 'BRUTTO' })}
      priceBrutto={t('aggregateCard.priceNetto', {
        price: formatPrice(priceNetto, i18n.resolvedLanguage),
        defaultValue: `${t('aggregateCard.pricePrefix')} ${formatPrice(priceNetto, i18n.resolvedLanguage)} ${t('aggregateCard.priceNettoLabel')}`,
      })}
      cta={t('aggregateCard.cta')}
    />
  )
}
