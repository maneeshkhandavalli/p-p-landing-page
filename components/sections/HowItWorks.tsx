'use client'
import React from 'react'
import { howItWorks } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function HowItWorks() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="how-it-works" ref={ref as React.RefObject<HTMLElement>} style={{ backgroundColor: '#F4F7FC' }} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div style={anim(0)}><SectionLabel>Our Process</SectionLabel></div>
          <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight">
            Simple. Transparent. Reliable.
          </h2>
        </div>

        <div className="relative flex flex-col md:flex-row gap-6 md:gap-0 items-stretch">
          {/* Dashed connector */}
          <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0 border-t-2 border-dashed border-accent z-0 pointer-events-none" />

          {howItWorks.map((step, i) => (
            <div key={step.step} className="flex-1 flex flex-col md:flex-row items-stretch gap-0">
              <div
                style={anim(200 + i * 100)}
                className="relative z-10 flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mx-0 md:mx-3"
              >
                <span className="absolute top-4 right-5 font-heading font-bold text-5xl text-navy/10 select-none leading-none">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#E3F2FD' }}>
                  <span className="material-symbols-outlined text-accent text-2xl">{step.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-2">{step.title}</h3>
                <p className="text-body font-sans text-sm leading-relaxed">{step.description}</p>
              </div>

              {i < howItWorks.length - 1 && (
                <div className="flex md:hidden justify-center items-center py-1">
                  <span className="material-symbols-outlined text-accent text-2xl">arrow_downward</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
