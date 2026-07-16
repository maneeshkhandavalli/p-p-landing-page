'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => {
        const lenis = (window as any).__lenis
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 50,
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: '#1A237E',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        boxShadow: '0 4px 12px rgba(26,35,126,0.3)',
      }}
    >
      <span className="material-symbols-outlined" style={{ color: '#ffffff', fontSize: 24 }}>
        keyboard_arrow_up
      </span>
    </button>
  )
}
