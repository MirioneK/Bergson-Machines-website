import React from 'react'
import { useTranslation } from 'react-i18next'
import { calcBrutto, formatPrice } from '../data'
import { useLangPath } from '../hooks/useLangPath'
import ProductCard from './ProductCard'

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
      cardSpecs={cardSpecs}
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
