import React from 'react'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Models from '../components/Models'
import Gallery from '../components/Gallery'
import Accessories from '../components/Accessories'
import WhyUs from '../components/WhyUs'
import Service from '../components/Service'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import SeoContent from '../components/SeoContent'
import { useTranslation } from 'react-i18next'
import { usePageMeta } from '../hooks/usePageMeta'

export default function HomePage() {
  const { t } = useTranslation()

  usePageMeta({
    title: t('meta.home.title'),
    description: t('meta.home.description'),
  })

  return (
    <main>
      <Hero />
      <TrustBar />
      <Models />
      <Gallery />
      <Accessories />
      <WhyUs />
      <Service />
      <FAQ />
      <Contact />
      <SeoContent />
    </main>
  )
}