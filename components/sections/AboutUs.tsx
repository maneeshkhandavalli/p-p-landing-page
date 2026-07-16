'use client'
import React from 'react'
import { company } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

const stats = [
  { value: 'Est 2009', label: 'Founded' },
  { value: 'ISO 9001:2015', label: 'Certified' },
  { value: 'Hyderabad', label: 'Location' },
]

const features = [
  'ISO 9001:2015 certified quality management system',
  'Advanced laser cutting and CNC bending machinery',
  'In-house powder coating for end-to-end manufacturing',
  "Serving India's leading EV and energy companies since 2009",
]

export default function AboutUs() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="bg-offwhite py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — heading, body, stat cards */}
        <div>
          <div style={anim(0)}><SectionLabel>About P&amp;P Engineering Works</SectionLabel></div>
          <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight mb-3">
            Innovative Engineering for a Sustainable Future
          </h2>
          <AnimatedUnderline visible={isVisible} center={false} />
          <p style={anim(200)} className="text-body font-sans text-lg leading-relaxed mb-8">
            Established in 2009 and ISO 9001:2015 certified, {company.name} is a trusted manufacturer of
            electrical enclosures, EV battery casings, solar structures and precision-engineered industrial
            products.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={anim(300 + i * 100)}
                className="bg-white border border-gray-200 rounded-xl p-2.5 sm:px-5 sm:py-4 text-center shadow-sm"
              >
                <div className="font-heading font-bold text-navy text-[11px] sm:text-base leading-tight">{s.value}</div>
                <div className="text-body font-sans text-[9px] sm:text-xs mt-0.5 sm:mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — feature checkpoints + button */}
        <div>
          <ul className="space-y-5 mb-8">
            {features.map((feat, i) => (
              <li key={feat} style={anim(100 + i * 100)} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-accent text-xl mt-0.5 shrink-0">check_circle</span>
                <span className="text-body font-sans text-base leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>
          <div style={anim(500)}>
            <Button href="#contact" variant="orange-filled">
              Learn More About Us
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
