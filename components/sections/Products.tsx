'use client'
import Image from 'next/image'
import React from 'react'
import { products } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

function ProductCard({ p, style }: { p: (typeof products)[number]; style: React.CSSProperties }) {
  return (
    <div
      style={style}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
    >
      <div className="relative h-[220px] w-full">
        <Image src={p.image} alt={p.name} fill className="object-cover" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-accent text-[11px] font-sans font-semibold uppercase tracking-wider bg-icon-bg px-3 py-1 rounded-full mb-3 self-start">
          {p.tag}
        </span>
        <h3 className="font-heading font-bold text-navy text-[20px] leading-snug mb-2">{p.name}</h3>
        <p className="text-body font-sans text-sm leading-relaxed mb-4">{p.description}</p>
        <ul className="space-y-1.5 mb-5">
          {p.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-body font-sans text-sm">
              <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <Button href="#contact" variant="orange-outline" className="w-full justify-center text-sm py-2">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  const row1 = products.slice(0, 3)
  const row2 = products.slice(3, 6)
  const row3 = products.slice(6)

  return (
    <section id="products" ref={ref as React.RefObject<HTMLElement>} className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div style={anim(0)}><SectionLabel>What We Manufacture</SectionLabel></div>
          <h2 style={anim(100)} className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight">
            Our Product Range
          </h2>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {row1.map((p, i) => (
            <ProductCard key={p.name} p={p} style={anim(200 + i * 100)} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {row2.map((p, i) => (
            <ProductCard key={p.name} p={p} style={anim(500 + i * 100)} />
          ))}
        </div>

        {/* Row 3 — last 2 centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {row3.map((p, i) => (
            <ProductCard key={p.name} p={p} style={anim(800 + i * 100)} />
          ))}
        </div>
      </div>
    </section>
  )
}
