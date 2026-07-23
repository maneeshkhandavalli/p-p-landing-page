'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    ;(window as any).__lenis = lenis

    const active = { current: true }
    const raf = (time: number) => {
      if (!active.current) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      active.current = false
      lenis.destroy()
      delete (window as any).__lenis
    }
  }, [])

  return <>{children}</>
}
