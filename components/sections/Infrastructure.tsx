'use client'
import React from 'react'
import { company } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const cards = [
  {
    icon: 'precision_manufacturing',
    title: 'HSG Fiber Laser',
    tag: 'Laser Cutting',
    bullets: ['High-speed fiber laser cutting', 'Bed size 3000×1500mm', 'Cuts MS, AL and SS'],
  },
  {
    icon: 'architecture',
    title: 'CNC Press Brake',
    tag: 'CNC Bending',
    bullets: ['High-tonnage press brake', 'Multi-axis precision bending', 'Repeatable accuracy for bulk orders'],
  },
  {
    icon: 'format_paint',
    title: 'Powder Coating Unit',
    tag: 'Finishing',
    bullets: ['Complete RAL colour range', 'In-house processing', 'No third-party delays'],
  },
]

export default function Infrastructure() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section
      id="infrastructure"
      ref={ref as React.RefObject<HTMLElement>}
      style={{ backgroundColor: '#F4F7FC' }}
      className="py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div style={anim(0)}><SectionLabel>Our Infrastructure</SectionLabel></div>
          <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight mb-4">
            Advanced Equipment &amp; Facility
          </h2>
          <p style={anim(200)} className="text-body font-sans text-base max-w-xl mx-auto">
            State-of-the-art machinery for precision sheet metal fabrication across all material types.
          </p>
        </div>

        {/* 3 cards — single row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cards.map((card, i) => (
            <div
              key={card.title}
              style={anim(300 + i * 100)}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-8 flex flex-col">
                {/* Icon circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5 shrink-0"
                  style={{ backgroundColor: '#E3F2FD' }}
                >
                  <span className="material-symbols-outlined text-accent" style={{ fontSize: 32 }}>
                    {card.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-navy mb-3" style={{ fontSize: 20 }}>
                  {card.title}
                </h3>

                {/* Tag pill */}
                <span
                  className="inline-block text-accent font-sans font-semibold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full mb-4 self-start"
                  style={{ backgroundColor: '#E3F2FD' }}
                >
                  {card.tag}
                </span>

                {/* Bullets */}
                <ul className="space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-body font-sans text-sm">
                      <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Address banner */}
        <div
          style={{ ...anim(600), backgroundColor: '#E3F2FD' }}
          className="w-full rounded-xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-accent text-2xl mt-0.5 shrink-0">location_on</span>
            <p className="text-body font-sans text-sm leading-relaxed">{company.address}</p>
          </div>
          <Button
            href={`https://maps.google.com/?q=${encodeURIComponent(company.address)}`}
            variant="orange-filled"
            className="shrink-0"
          >
            Get Directions
          </Button>
        </div>

      </div>
    </section>
  )
}
