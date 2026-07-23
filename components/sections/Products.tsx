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
    image:       '/images/electrical-enclosure.png',
    href:        'https://www.indiamart.com/proddetail/electrical-metal-cabinets-23019950591.html',
  },
  {
    category:    'EV AUTOMOTIVE',
    name:        'EV Battery Enclosures & Child Parts',
    description: 'Lightweight high-strength housings for electric vehicle battery systems.',
    image:       '/images/ev-battery.png',
    href:        'https://www.indiamart.com/proddetail/ev-battery-enclosure-23089070733.html',
  },
  {
    category:    'SOLAR',
    name:        'Solar Structures & Street Light Poles',
    description: 'Mounting structures for commercial and industrial solar installations.',
    image:       '/images/solar-structure.png',
    href:        'https://www.indiamart.com/proddetail/solar-streetlight-poles-structures-22031890530.html',
  },
  {
    category:    'SHEET METAL',
    name:        'General Sheet Metal Products',
    description: 'Cabinets, racks, lockers, trolleys and custom fabricated metal products.',
    image:       '/images/sheet-metal.png',
    href:        'https://www.indiamart.com/proddetail/sheet-metal-fabrications-4390046791.html',
  },
  {
    category:    'FINISHING',
    name:        'In-House Powder Coating',
    description: 'Full powder coating facility with complete RAL colour range in-house.',
    image:       '/images/powder-coating.png',
    href:        '/products',
  },
]

export default function Products() {
  const sectionRef                      = useRef<HTMLDivElement>(null)
  const cardRef                         = useRef<HTMLDivElement>(null)
  const isAnimRef                       = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedIdx, setDisplayedIdx] = useState(0)

  // Scroll driver — only currentIndex goes into state
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect     = el.getBoundingClientRect()
      const scrolled = -rect.top
      const total    = el.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / total))
      const idx      = Math.min(Math.floor(progress * products.length), products.length - 1)
      setCurrentIndex(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Card swap animation — driven by ref, not CSS transitions on state
  useEffect(() => {
    const card = cardRef.current
    if (!card || currentIndex === displayedIdx || isAnimRef.current) return

    isAnimRef.current = true

    // Slide out
    card.style.transition = 'transform 250ms ease'
    card.style.transform  = 'translateY(-100%)'

    const t = setTimeout(() => {
      // Swap content
      setDisplayedIdx(currentIndex)
      card.style.transition = 'none'
      card.style.transform  = 'translateY(100%)'
      void card.offsetHeight                      // force reflow
      card.style.transition = 'transform 350ms ease'
      card.style.transform  = 'translateY(0)'
      setTimeout(() => { isAnimRef.current = false }, 350)
    }, 250)

    return () => clearTimeout(t)
  }, [currentIndex, displayedIdx])

  const product = products[displayedIdx]

  return (
    <section id="products">
      <div
        ref={sectionRef}
        style={{ height: '600vh' }}
        className="relative"
      >
        {/* Sticky viewport — holds everything while user scrolls the 600vh budget */}
        <div className="sticky top-0 h-screen overflow-hidden bg-white flex flex-col items-center justify-center gap-6">

          {/* Section label + heading */}
          <div className="text-center">
            <SectionLabel>What We Manufacture</SectionLabel>
            <h2
              className="font-heading font-bold text-navy text-3xl md:text-4xl leading-tight mt-2"
              style={{ letterSpacing: '-0.02em' }}
            >
              Our Product Range
            </h2>
          </div>

          {/* Card — outer div clips the slide animation */}
          <div
            className="rounded-[20px] overflow-hidden"
            style={{ width: 340, height: 320 }}
          >
            <div
              ref={cardRef}
              className="relative rounded-[20px] overflow-hidden"
              style={{ width: 340, height: 320 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a28]/90 via-[#050a28]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] tracking-[2.5px] uppercase text-white/45 mb-2">
                  {product.category}
                </p>
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed mb-4">
                  {product.description}
                </p>
                <Link
                  href={product.href}
                  target={product.href.startsWith('http') ? '_blank' : undefined}
                  rel={product.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-block bg-[#F07B20] text-white text-xs font-semibold px-5 py-2 rounded-full hover:bg-[#d96a15] transition-colors"
                >
                  Enquire on IndiaMART →
                </Link>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-[2px] bg-gray-100 rounded" style={{ width: 340 }}>
            <div
              className="bg-[#F07B20] h-full rounded transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / products.length) * 100}%` }}
            />
          </div>

          {/* Counter */}
          <p className="text-xs text-gray-400 tracking-wider tabular-nums select-none">
            {String(currentIndex + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </p>

        </div>
      </div>
    </section>
  )
}
