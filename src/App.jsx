import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Nav from './components/Nav'
import Footer from './components/Footer'
import StickyCTA from './components/StickyCTA'

import HomePage from './pages/HomePage'
import ModelPage from './pages/ModelPage'
import LegalPage from './pages/LegalPage'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')

      const scrollToHash = () => {
        const element = document.getElementById(id)

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
        }
      }

      const raf = window.requestAnimationFrame(scrollToHash)
      return () => window.cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modele/:id" element={<ModelPage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/gwarancja" element={<LegalPage pageKey="gwarancja" />} />
        <Route
          path="/zwroty-i-reklamacje"
          element={<LegalPage pageKey="zwroty-i-reklamacje" />}
        />
        <Route path="/dostawa" element={<LegalPage pageKey="dostawa" />} />
        <Route path="/regulamin" element={<LegalPage pageKey="regulamin" />} />
        <Route
          path="/formy-platnosci"
          element={<LegalPage pageKey="formy-platnosci" />}
        />
        <Route
          path="/polityka-prywatnosci"
          element={<LegalPage pageKey="polityka-prywatnosci" />}
        />
      </Routes>
      <Footer />
      <StickyCTA />
    </>
  )
}