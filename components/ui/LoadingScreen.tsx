'use client'
import { useState, useEffect } from 'react'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    document.body.classList.add('js-loading')

    const fadeTimer = setTimeout(() => {
      setFading(true)
      document.body.classList.remove('js-loading')
      document.body.classList.add('js-loaded')
    }, 1800)

    const unmountTimer = setTimeout(() => setVisible(false), 2200)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
      document.body.classList.remove('js-loading', 'js-loaded')
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes logo-reveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        @keyframes laser-scan {
          from { left: 0; opacity: 1; }
          to   { left: 100%; opacity: 0; }
        }
        @keyframes name-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bar-draw {
          from { width: 0; }
          to   { width: 200px; }
        }
      `}</style>

      <div
        data-loader
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: fading ? 'none' : 'auto',
        }}
      >
        {/* Logo with clip-path reveal */}
        <div style={{ position: 'relative', width: 180, height: 'auto', marginBottom: 20 }}>
          {/* Base logo (dimmed) */}
          <img
            src="/images/logo-withoutbg.png"
            alt=""
            aria-hidden
            style={{ width: 180, height: 'auto', opacity: 0.12, display: 'block' }}
          />
          {/* Revealed logo */}
          <img
            src="/images/logo-withoutbg.png"
            alt="P&P Engineering Works"
            style={{
              position: 'absolute',
              inset: 0,
              width: 180,
              height: 'auto',
              display: 'block',
              animation: 'logo-reveal 1.5s ease-in-out forwards',
            }}
          />
          {/* Laser line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 3,
              background: 'linear-gradient(to bottom, transparent, #2979FF, #2979FF, transparent)',
              boxShadow: '0 0 8px 3px rgba(41,121,255,0.7)',
              animation: 'laser-scan 1.5s ease-in-out forwards',
            }}
          />
        </div>

        {/* Company name */}
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 500,
            fontSize: 13,
            color: '#4A5568',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
            opacity: 0,
            animation: 'name-fade 0.5s ease forwards 0.8s',
          }}
        >
          P&amp;P Engineering Works
        </p>

        {/* Blue progress line */}
        <div style={{ width: 200, height: 2, backgroundColor: '#E3F2FD', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: 0,
              backgroundColor: '#2979FF',
              borderRadius: 2,
              animation: 'bar-draw 0.5s ease forwards 1.2s',
            }}
          />
        </div>
      </div>
    </>
  )
}
