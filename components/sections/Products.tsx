'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const CARD_W   = 420
const CARD_GAP = 24
const EDGE_PAD = 48

const showcaseCards = [
  {
    image:       '/images/electrical-enclosure.png',
    badge:       { label: 'MOST POPULAR', color: '#F07B20' },
    category:    'ELECTRICAL',
    name:        'Electronic & Electrical Enclosures',
    description: 'Custom IP-rated enclosures for industrial control panels and distribution boards',
    bullets:     ['Custom IP ratings available', 'Control panels and distribution boards', 'Fabricated to exact specifications'],
  },
  {
    image:       '/images/ev-battery.png',
    badge:       { label: 'EV SECTOR', color: '#16A34A' },
    category:    'EV AUTOMOTIVE',
    name:        'EV Battery Enclosures & Child Parts',
    description: 'Lightweight high-strength housings for electric vehicle battery systems',
    bullets:     ['High-strength lightweight build', 'Mounting brackets and child parts', 'Trusted by Amara Raja and Cygni Energy'],
  },
  {
    image:       '/images/solar-structure.png',
    badge:       { label: 'HIGH DEMAND', color: '#1565C0' },
    category:    'SOLAR',
    name:        'Solar Structures & Street Light Poles',
    description: 'Mounting structures for commercial and industrial solar installations',
    bullets:     ['Hot-rolled mild steel construction', 'Commercial and industrial scale', 'Galvanised for weather resistance'],
  },
  {
    image:       '/images/sheet-metal.png',
    badge:       { label: 'CUSTOM MADE', color: '#4A5568' },
    category:    'SHEET METAL',
    name:        'General Sheet Metal Products',
    description: 'Cabinets, racks, lockers, trolleys and custom fabricated metal products',
    bullets:     ['Cabinets, racks and lockers', 'Custom dimensions available', 'Industrial and institutional clients'],
  },
  {
    image:       '/images/powder-coating.png',
    badge:       { label: 'IN-HOUSE', color: '#1A237E' },
    category:    'FINISHING',
    name:        'In-House Powder Coating',
    description: 'Full powder coating facility with complete RAL colour range in-house',
    bullets:     ['Complete RAL colour range', 'No third-party delays', 'Faster turnaround and tighter QC'],
  },
]

const TOTAL_CARDS = showcaseCards.length + 1 // +1 for Explore More

export default function Products() {
  const { ref, isVisible } = useScrollAnimation()
  const trackRef           = useRef<HTMLDivElement>(null)
  const touchStartX        = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  const anim = (delay = 0): React.CSSProperties => ({
    opacity:    isVisible ? 1 : 0,
    transform:  isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  const scrollTrack = (dir: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const step = window.innerWidth < 768 ? track.offsetWidth : CARD_W + CARD_GAP
    track.scrollBy({ left: dir === 'right' ? step : -step, behavior: 'smooth' })
    setActiveIdx(prev => {
      const next = dir === 'right' ? prev + 1 : prev - 1
      return Math.max(0, Math.min(next, TOTAL_CARDS - 1))
    })
  }

  const scrollToCard = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const pos = window.innerWidth < 768 ? idx * track.offsetWidth : idx * (CARD_W + CARD_GAP)
    track.scrollTo({ left: pos, behavior: 'smooth' })
    setActiveIdx(idx)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -50) scrollTrack('right')
    else if (delta > 50) scrollTrack('left')
  }

  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      className="bg-white py-20"
    >
      {/* ── Section heading ──────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-8">
        <div style={anim(0)}>
          <SectionLabel>What We Manufacture</SectionLabel>
        </div>
        <h2
          style={{ ...anim(100), letterSpacing: '-0.02em' }}
          className="font-heading font-bold text-navy text-4xl md:text-[52px] leading-tight"
        >
          Our Product Range
        </h2>
        <AnimatedUnderline visible={isVisible} />
        <p style={anim(200)} className="text-body font-sans text-lg max-w-2xl mx-auto mt-4">
          Five specialised product lines serving India&apos;s most demanding industrial sectors
        </p>
      </div>

      {/* ── Arrow controls ───────────────────────────────────────────────── */}
      <div
        style={anim(250)}
        className="max-w-7xl mx-auto px-6 flex justify-end gap-3 mb-5"
      >
        <button
          onClick={() => scrollTrack('left')}
          aria-label="Scroll left"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-navy flex items-center justify-center transition-opacity hover:opacity-80"
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>
            arrow_back
          </span>
        </button>
        <button
          onClick={() => scrollTrack('right')}
          aria-label="Scroll right"
          className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-navy flex items-center justify-center transition-opacity hover:opacity-80"
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>
            arrow_forward
          </span>
        </button>
      </div>

      {/* ── Horizontal scroll track ──────────────────────────────────────── */}
      <div
        ref={trackRef}
        className="showcase-track flex overflow-x-auto pl-4 md:pl-[48px]"
        style={{ gap: CARD_GAP, scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Product cards */}
        {showcaseCards.map(card => (
          <article
            key={card.name}
            className="showcase-card bg-white rounded-2xl shadow-md flex flex-col flex-shrink-0 overflow-hidden w-[calc(100vw-32px)] md:w-[420px] snap-start"
          >
            {/* Image — top 360px */}
            <div className="relative flex-shrink-0 overflow-hidden h-48 md:h-[360px]">
              <Image
                src={card.image}
                alt={card.name}
                fill
                className="showcase-card-img object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}
              />
              <span
                style={{
                  position:        'absolute',
                  top:             12,
                  left:            12,
                  backgroundColor: card.badge.color,
                  color:           '#ffffff',
                  fontSize:        10,
                  fontFamily:      'var(--font-inter), sans-serif',
                  fontWeight:      700,
                  textTransform:   'uppercase',
                  letterSpacing:   '1px',
                  padding:         '4px 10px',
                  borderRadius:    100,
                }}
              >
                {card.badge.label}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 px-5 pt-4 pb-5">
              <span className="inline-block text-accent text-[10px] font-sans font-semibold uppercase tracking-wider bg-icon-bg px-3 py-1 rounded-full mb-3 self-start">
                {card.category}
              </span>
              <h3 className="font-heading font-bold text-navy text-xl leading-snug mb-2">
                {card.name}
              </h3>
              <p className="text-body font-sans text-sm leading-relaxed mb-3 line-clamp-2">
                {card.description}
              </p>
              <ul className="space-y-1 mb-4 flex-1">
                {card.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-body font-sans text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href="#contact"
                className="block text-center border border-cta text-cta text-sm font-sans font-medium px-4 py-2.5 rounded-full hover:bg-orange-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </article>
        ))}

        {/* Explore More card */}
        <article
          className="showcase-card rounded-2xl flex-shrink-0 flex flex-col items-center justify-center px-10 py-12 w-[calc(100vw-32px)] md:w-[420px] snap-start"
          style={{ height: 560, backgroundColor: '#1A237E' }}
        >
          <h3 className="font-heading font-bold text-white text-3xl text-center leading-snug mb-3">
            Explore Our Full Range
          </h3>
          <p className="text-slate-300 font-sans text-sm text-center mb-10 leading-relaxed">
            Browse 18+ products across 9 categories
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-cta text-white text-sm font-sans font-semibold px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
          >
            View All Products →
          </Link>
        </article>

        {/* Trailing spacer */}
        <div style={{ flexShrink: 0, width: EDGE_PAD - CARD_GAP }} />
      </div>

      {/* ── Dot indicators ───────────────────────────────────────────────── */}
      <div className="flex justify-center items-center gap-2 mt-4 md:mt-8">
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to card ${i + 1}`}
            className="rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width:           i === activeIdx ? 10 : 8,
              height:          i === activeIdx ? 10 : 8,
              backgroundColor: i === activeIdx ? '#1A237E' : '#D1D5DB',
            }}
          />
        ))}
      </div>
    </section>
  )
}
