'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState, useEffect } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const products = [
  {
    category:    'ELECTRICAL',
    name:        'Electronic & Electrical Enclosures',
    description: 'Custom IP-rated enclosures for industrial control panels and distribution boards.',
    bullets:     ['Custom IP ratings available', 'Control panels and distribution boards', 'Fabricated to exact specifications'],
    image:       '/images/electrical-enclosure.png',
    href:        'https://www.indiamart.com/proddetail/electrical-metal-cabinets-23019950591.html',
  },
  {
    category:    'EV AUTOMOTIVE',
    name:        'EV Battery Enclosures & Child Parts',
    description: 'Lightweight high-strength housings for electric vehicle battery systems.',
    bullets:     ['High-strength lightweight build', 'Mounting brackets and child parts', 'Trusted by Amara Raja and Cygni Energy'],
    image:       '/images/ev-battery.png',
    href:        'https://www.indiamart.com/proddetail/ev-battery-enclosure-23089070733.html',
  },
  {
    category:    'SOLAR',
    name:        'Solar Structures & Street Light Poles',
    description: 'Mounting structures for commercial and industrial solar installations.',
    bullets:     ['Hot-rolled mild steel construction', 'Commercial and industrial scale', 'Galvanised for weather resistance'],
    image:       '/images/solar-structure.png',
    href:        'https://www.indiamart.com/proddetail/solar-streetlight-poles-structures-22031890530.html',
  },
  {
    category:    'SHEET METAL',
    name:        'General Sheet Metal Products',
    description: 'Cabinets, racks, lockers, trolleys and custom fabricated metal products.',
    bullets:     ['Cabinets, racks and lockers', 'Custom dimensions available', 'Industrial and institutional clients'],
    image:       '/images/sheet-metal.png',
    href:        'https://www.indiamart.com/proddetail/sheet-metal-fabrications-4390046791.html',
  },
  {
    category:    'FINISHING',
    name:        'In-House Powder Coating',
    description: 'Full powder coating facility with complete RAL colour range in-house.',
    bullets:     ['Complete RAL colour range', 'No third-party delays', 'Faster turnaround and tighter QC'],
    image:       '/images/powder-coating.png',
    href:        '/products',
  },
]

const TOTAL = products.length

export default function Products() {
  const outerRef                        = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress,     setProgress]     = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current
      if (!el) return
      const sectionTop    = el.getBoundingClientRect().top + window.scrollY
      const sectionHeight = el.offsetHeight
      const raw           = (window.scrollY - sectionTop) / (sectionHeight - window.innerHeight)
      const clamped       = Math.max(0, Math.min(1, raw))
      setProgress(clamped)
      setCurrentIndex(Math.min(Math.floor(clamped * TOTAL), TOTAL - 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cardStyle = (i: number): React.CSSProperties => {
    const offset = i - currentIndex
    if (offset < 0) {
      return {
        transform:     'translateY(-110%) rotate(-3deg)',
        opacity:       0,
        zIndex:        5,
        pointerEvents: 'none',
      }
    }
    if (offset === 0) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity:   1,
        zIndex:    20,
      }
    }
    const peekY   = ([48, 80, 104, 120] as const)[Math.min(offset - 1, 3)]
    const scale   = ([0.97, 0.94, 0.91, 0.88] as const)[Math.min(offset - 1, 3)]
    const opacity = ([0.6, 0.35, 0.2, 0.1] as const)[Math.min(offset - 1, 3)]
    return {
      transform:     `translateY(${peekY}px) scale(${scale})`,
      opacity,
      zIndex:        20 - offset,
      pointerEvents: 'none',
    }
  }

  return (
    <section id="products">

      {/* ── Section header — scrolls normally above the sticky card area ── */}
      <div className="bg-white py-16 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <SectionLabel>What We Manufacture</SectionLabel>
          <h2
            className="font-heading font-bold text-navy text-4xl md:text-[52px] leading-tight mt-2"
            style={{ letterSpacing: '-0.02em' }}
          >
            Our Product Range
          </h2>
          <p className="font-sans text-body text-lg max-w-2xl mt-4">
            Five specialised product lines serving India&apos;s most demanding industrial sectors
          </p>
        </div>
      </div>

      {/* ── Scroll budget — 5 × 100vh ── */}
      <div
        ref={outerRef}
        className="relative bg-[#0d1544]"
        style={{ height: `calc(100vh * ${TOTAL})` }}
      >
        {/* Sticky viewport — pins while user scrolls through the budget */}
        <div className="sticky top-0 h-screen flex items-center justify-center">

          {/* Card stack */}
          <div
            className="relative w-full max-w-5xl mx-auto px-6"
            style={{ height: '75vh', willChange: 'transform' }}
          >
            {products.map((product, i) => (
              <div
                key={product.name}
                className="absolute inset-x-6 rounded-2xl overflow-hidden flex"
                style={{
                  height:          '75vh',
                  top:             0,
                  backgroundColor: '#1A237E',
                  transition:      'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  ...cardStyle(i),
                }}
              >
                {/* Left — text content */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-between min-w-0">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-white/50 mb-2">
                      {product.category}
                    </p>
                    <h3 className="font-sans font-bold text-white text-3xl md:text-4xl leading-tight mt-2">
                      {product.name}
                    </h3>
                    <p className="text-base text-white/60 max-w-sm mt-4 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {product.bullets.map(b => (
                        <li key={b} className="flex items-center gap-2 text-sm text-white/50">
                          <span className="text-[#F07B20] text-base leading-none">·</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Link
                      href={product.href}
                      target={product.href.startsWith('http') ? '_blank' : undefined}
                      rel={product.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center bg-[#F07B20] text-white rounded-full px-6 py-3 text-sm font-semibold hover:bg-[#d96a15] transition-colors"
                    >
                      Enquire on IndiaMART →
                    </Link>
                  </div>
                </div>

                {/* Right — product image */}
                <div className="w-64 md:w-72 relative overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 288px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Scroll progress indicator — right edge, full height */}
          <div className="absolute right-8 top-0 bottom-0 w-[2px] bg-white/10">
            <div
              className="w-full bg-[#F07B20] absolute top-0 left-0"
              style={{ height: `${progress * 100}%`, transition: 'height 0.1s linear' }}
            />
          </div>

          {/* Card counter — bottom right */}
          <div className="absolute bottom-8 right-12 font-sans text-sm text-white/40 tabular-nums select-none">
            {String(currentIndex + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </div>

        </div>
      </div>
    </section>
  )
}
