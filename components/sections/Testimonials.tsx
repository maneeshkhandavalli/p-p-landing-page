'use client'
import React from 'react'
import { testimonials } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="testimonials" ref={ref as React.RefObject<HTMLElement>} style={{ backgroundColor: '#F4F7FC' }} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div style={anim(0)}><SectionLabel>What Our Clients Say</SectionLabel></div>
          <h2 style={{ ...anim(100), letterSpacing: '-0.02em' }} className="font-heading font-bold text-navy text-4xl md:text-[52px] leading-tight">
            Trusted. Reliable. Precise.
          </h2>
          <AnimatedUnderline visible={isVisible} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={anim(200 + i * 100)}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <span className="text-accent font-heading font-bold text-5xl leading-none mb-3 select-none">
                &ldquo;
              </span>
              <p className="text-body font-sans text-sm leading-relaxed italic flex-1 mb-6">{t.quote}</p>
              <div>
                <div className="font-sans font-bold text-navy text-sm">{t.name}</div>
                <div className="text-body font-sans text-xs mt-0.5">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
