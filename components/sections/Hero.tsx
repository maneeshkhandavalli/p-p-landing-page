'use client'
import Image from 'next/image'
import { heroStats, heroMarqueeClients } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'
import React from 'react'

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.05)

  const doubled = [
    ...heroMarqueeClients,
    ...heroMarqueeClients,
    ...heroMarqueeClients,
    ...heroMarqueeClients,
  ]

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="home" ref={ref as React.RefObject<HTMLElement>}>
      {/* White content area */}
      <div className="bg-white text-center px-6" style={{ paddingTop: '120px', paddingBottom: '48px' }}>
        {/* Pill */}
        <div style={anim(0)} className="inline-flex items-center gap-2 border border-accent text-accent text-[11px] font-sans font-semibold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-6 bg-accent/10">
          ISO 9001:2015 Certified · Est. 2009 · Hyderabad
        </div>

        {/* Heading */}
        <h1
          style={{ ...anim(100), lineHeight: '1.1' }}
          className="font-heading font-bold text-navy text-4xl sm:text-5xl md:text-[64px] max-w-4xl mx-auto mb-6"
        >
          India&apos;s Trusted Sheet Metal Manufacturer
        </h1>

        {/* Body */}
        <p style={anim(200)} className="text-body font-sans text-lg max-w-[600px] mx-auto mb-10 leading-relaxed">
          Precision fabricated EV enclosures, electrical panels, solar structures and more — delivered
          from our ISO certified Hyderabad facility since 2009.
        </p>

        {/* Buttons */}
        <div style={anim(300)} className="flex flex-wrap gap-4 justify-center mb-12">
          <Button href="#products" variant="orange-filled" className="px-8 py-3 text-base rounded-lg">
            Explore Products
          </Button>
          <Button href="#contact" variant="navy-outline" className="px-8 py-3 text-base rounded-lg">
            Contact Us
          </Button>
        </div>

        {/* Stats */}
        <div style={anim(400)} className="inline-flex flex-wrap justify-center">
          {heroStats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <div
                  className="self-stretch w-px"
                  style={{ backgroundColor: 'rgba(26,35,126,0.2)' }}
                />
              )}
              <div className="px-8 py-2 text-center">
                <div className="text-navy font-heading font-bold text-2xl sm:text-3xl">{stat.value}</div>
                <div className="text-body font-sans text-sm mt-0.5">{stat.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Full-width factory image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: '480px', borderRadius: '20px 20px 0 0' }}
      >
        <Image
          src="/images/sheet-metal-fabrication.png"
          alt="P&P Engineering Works manufacturing facility"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Client strip */}
      <div
        className="bg-white overflow-hidden"
        style={{ borderTop: '1px solid #E1E2E4', paddingTop: '16px', paddingBottom: '16px' }}
      >
        <div className="flex items-center gap-6 px-6">
          <span className="text-accent font-sans text-sm font-semibold shrink-0">Trusted by:</span>
          <div className="flex-1 overflow-hidden">
            <div className="flex whitespace-nowrap marquee-left gap-10">
              {doubled.map((client, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 text-navy font-sans text-sm font-medium shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shrink-0" />
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
