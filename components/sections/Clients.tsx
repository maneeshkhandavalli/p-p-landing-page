'use client'
import React from 'react'
import { clients } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

function ClientLogo({ logo, alt }: { logo: string; alt: string }) {
  return (
    <div className="flex items-center justify-center shrink-0 mx-10">
      <img
        src={logo}
        alt={alt}
        className="max-h-8 w-auto object-contain"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
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
        <h2 style={{ ...anim(100), letterSpacing: '-0.02em' }} className="font-heading font-bold text-navy text-4xl md:text-[52px] leading-tight mb-4">
          Trusted by India&apos;s Industry Leaders
        </h2>
        <AnimatedUnderline visible={isVisible} />
        <p style={anim(200)} className="text-body font-sans text-base max-w-xl mx-auto">
          Serving Tier-1 companies across EV, energy, solar and industrial sectors since 2009.
        </p>
      </div>

      <div className="bg-navy py-10 overflow-hidden">
        <div className="marquee-group space-y-6">
          <div className="relative overflow-hidden">
            <div className="flex marquee-left items-center">
              {doubled.map((client, i) => (
                <ClientLogo key={i} logo={client.logo} alt={client.alt} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />
          </div>

          <div className="relative overflow-hidden">
            <div className="flex marquee-right items-center">
              {doubled.map((client, i) => (
                <ClientLogo key={i} logo={client.logo} alt={client.alt} />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
