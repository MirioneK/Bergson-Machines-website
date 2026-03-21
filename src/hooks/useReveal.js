import { useEffect, useRef, useState } from 'react'

export function useReveal(options = {}) {
  const {
    threshold = 0.01,
    root = null,
    rootMargin = '0px 0px -8% 0px',
    once = true,
  } = options

  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const checkIfInViewport = () => {
      const rect = element.getBoundingClientRect()
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight

      const isInViewport =
        rect.top < viewportHeight * 0.98 && rect.bottom > 0

      if (isInViewport) {
        setVisible(true)
        return true
      }

      return false
    }

    if (checkIfInViewport() && once) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)

          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setVisible(false)
        }
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    const raf = window.requestAnimationFrame(() => {
      checkIfInViewport()
    })

    return () => {
      window.cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, once])

  return [ref, visible]
}