'use client'
import { useEffect, useState } from 'react'

export default function LoadingScreen() {
  const [visible,  setVisible]  = useState(true)
  const [fadeIn,   setFadeIn]   = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [slideOut, setSlideOut] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('loaded')) {
      setVisible(false)
      window.dispatchEvent(new Event('pp:loaded'))
      return
    }

    // Fade in logo + tagline immediately
    const t0 = setTimeout(() => setFadeIn(true), 20)
    // Orange line starts drawing at 200ms
    const t1 = setTimeout(() => setShowLine(true), 200)
    // Slide screen up at 1200ms (after line finishes at ~1200ms)
    const t2 = setTimeout(() => setSlideOut(true), 1200)
    // Remove from DOM and notify hero at 1870ms (1200 + 670ms slide)
    const t3 = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('loaded', 'true')
      window.dispatchEvent(new Event('pp:loaded'))
    }, 1870)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#1A237E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        transform: slideOut ? 'translateY(-100%)' : 'translateY(0)',
        transition: slideOut ? 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      {/* Logo — white via brightness-0 invert */}
      <img
        src="/images/logo-withoutbg.png"
        alt="P&P Engineering Works"
        style={{
          height: '48px',
          width: 'auto',
          filter: 'brightness(0) invert(1)',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Track bar */}
      <div
        style={{
          width: '192px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.1)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '1px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            backgroundColor: '#F07B20',
            width: showLine ? '100%' : '0%',
            transition: showLine ? 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontSize: '12px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          margin: 0,
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        Sheet Metal Fabrication
      </p>
    </div>
  )
}
