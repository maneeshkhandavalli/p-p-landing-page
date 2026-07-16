'use client'
import React from 'react'
import { clients } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

function ClientPill({ name }: { name: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-[#E1E2E4] rounded-full px-4 py-2 shrink-0 mx-3">
      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
      <span className="text-navy font-sans font-medium text-sm whitespace-nowrap">{name}</span>
    </div>
  )
}

export default function Clients() {
  const { ref, isVisible } = useScrollAnimation()
  const doubled = [...clients, ...clients]

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="clients" ref={ref as React.RefObject<HTMLElement>} className="bg-white py-20 px-0">
      <div className="text-center px-6 mb-12">
        <div style={anim(0)}><SectionLabel>Our Clients</SectionLabel></div>
        <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight mb-4">
          Trusted by India&apos;s Industry Leaders
        </h2>
        <AnimatedUnderline visible={isVisible} />
        <p style={anim(200)} className="text-body font-sans text-base max-w-xl mx-auto">
          Serving Tier-1 companies across EV, energy, solar and industrial sectors since 2009.
        </p>
      </div>

      {/* Marquee rows — pause on hover via .marquee-group CSS class */}
      <div className="marquee-group space-y-4 overflow-hidden">
        <div className="relative">
          <div className="flex marquee-left">
            {doubled.map((client, i) => <ClientPill key={i} name={client} />)}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        <div className="relative">
          <div className="flex marquee-right">
            {doubled.map((client, i) => <ClientPill key={i} name={client} />)}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
