'use client'
import Image from 'next/image'
import React from 'react'
import { company, cncMaterials } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function StarCNCDivision() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  return (
    <section id="star-cnc" ref={ref as React.RefObject<HTMLElement>} className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div
          style={{ ...anim(0), borderLeft: '4px solid #1565C0' }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="grid lg:grid-cols-[2fr_3fr]">
            {/* Left — image */}
            <div className="relative h-64 lg:h-auto min-h-[320px]">
              <Image
                src="/images/cnc-image.webp"
                alt="Star CNC Engineering Works — CNC laser cutting"
                fill
                className="object-cover"
              />
            </div>

            {/* Right — content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div style={anim(100)}><SectionLabel>Our Laser Cutting and Bending Division</SectionLabel></div>
              <h2 style={anim(200)} className="font-heading font-bold text-navy text-3xl md:text-4xl leading-tight mb-4">
                {company.starCNC}
              </h2>
              <p style={anim(300)} className="text-body font-sans text-base leading-relaxed mb-6">
                Our specialized laser cutting and CNC bending division, operating from the same Hyderabad
                facility — precision jobwork on Mild Steel, Aluminium and Stainless Steel.
              </p>
              <div style={anim(400)} className="flex flex-wrap gap-3 mb-8">
                {cncMaterials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-2 bg-gray-100 text-body font-sans text-sm px-4 py-1.5 rounded-full border border-gray-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    {mat}
                  </span>
                ))}
              </div>
              <div style={anim(500)}>
                <Button href="https://starcnc.vercel.app" variant="navy-outline" className="self-start">
                  Visit starcnc.vercel.app
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
