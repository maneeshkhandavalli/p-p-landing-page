'use client'
import React from 'react'
import { whyUs } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="why-us" ref={ref as React.RefObject<HTMLElement>} className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div style={anim(0)}><SectionLabel>Our Advantage</SectionLabel></div>
          <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight">
            Built for India&apos;s Most Demanding Industries
          </h2>
          <AnimatedUnderline visible={isVisible} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyUs.map((item, i) => (
            <div
              key={item.title}
              style={{
                ...anim(200 + i * 100),
                borderTop: '3px solid #1565C0',
              }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#E3EDF7' }}>
                <span className="material-symbols-outlined text-accent text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-heading font-bold text-navy text-xl mb-3">{item.title}</h3>
              <p className="text-body font-sans text-sm leading-relaxed mb-4">{item.body}</p>
              <ul className="space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-body font-sans text-sm">
                    <span className="material-symbols-outlined text-accent text-base mt-0.5 shrink-0">check_circle</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
