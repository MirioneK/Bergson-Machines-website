import React from 'react'
import Hero        from '../components/Hero'
import TrustBar    from '../components/TrustBar'
import Models      from '../components/Models'
import Gallery     from '../components/Gallery'
import Accessories from '../components/Accessories'
import WhyUs       from '../components/WhyUs'
import Objections  from '../components/Objections'
import Process     from '../components/Process'
import Service     from '../components/Service'
import FAQ         from '../components/FAQ'
import Contact     from '../components/Contact'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Models />
      <Gallery />
      <Accessories />
      <WhyUs />
      <Objections />
      <Process />
      <Service />
      <FAQ />
      <Contact />
    </main>
  )
}
