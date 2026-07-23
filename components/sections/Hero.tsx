'use client'
import { heroStats } from '@/lib/content'
import React from 'react'

// Logo path = null means render as styled text
const clients = [
  { name: 'Amara Raja',          logo: '/images/clients/amara-raja.svg' },
  { name: 'HBL Power Systems',   logo: '/images/clients/hbl.png' },
  { name: 'Cygni Energy',        logo: '/images/clients/cygni.png' },
  { name: 'Race Energy',         logo: '/images/clients/race-energy.png' },
  { name: 'Siemens',             logo: null },
  { name: 'GR Power Switchgear', logo: null },
  { name: 'Toshiba',             logo: '/images/clients/toshiba.gif' },
  { name: 'NED Energy',          logo: '/images/clients/ned-energy.png' },
  { name: 'Brisk',               logo: null },
  { name: 'Quantum EV',          logo: '/images/clients/quantum-energy.webp' },
]

// One full list rendered twice; animation moves -50% = exactly one list width
function ClientStrip() {
  return (
    <div className="flex items-center">
      {clients.map((client, i) => (
        <React.Fragment key={i}>
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.name}
              style={{
                height: '26px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'none',
              }}
            />
          ) : (
            <span className="font-sans text-sm font-semibold uppercase tracking-widest text-gray-500">
              {client.name}
            </span>
          )}
          {/* Dot after every item — trailing dot makes the junction seamless */}
          <span className="text-[#F07B20] mx-4">·</span>
        </React.Fragment>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="home" className="bg-[#f5f5f0]">

      {/* ── Video card ── */}
      <div
        className="relative m-4 rounded-2xl overflow-hidden"
        style={{ height: '75vh' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src="/HerosectionVideo/Generate_all_clips_one_by_on(1).mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent"
          style={{ zIndex: 1 }}
        />

        {/* Text — absolute center of the card */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
          style={{ zIndex: 2 }}
        >
          <p
            className="hero-anim font-sans text-xs tracking-widest uppercase text-white/50 mb-6"
            style={{ animationDelay: '0.2s' }}
          >
            ISO 9001:2015 · Est. 2009 · Hyderabad
          </p>

          <h1 className="font-sans font-bold text-white leading-tight text-4xl md:text-6xl">
            <span className="hero-anim block" style={{ animationDelay: '0.4s' }}>
              Built in <span className="font-semibold text-white/90">Steel</span>.
            </span>
            <span className="hero-anim block" style={{ animationDelay: '0.6s' }}>
              Trusted by <span className="font-semibold text-white/90">Industry</span>.
            </span>
          </h1>

          <p
            className="hero-anim font-sans text-base md:text-lg text-white/70 max-w-xl mt-4 leading-relaxed"
            style={{ animationDelay: '0.8s' }}
          >
            Sheet metal fabrication from Hyderabad — EV, Solar, Electrical &amp; more.
          </p>

          <div
            className="hero-anim flex justify-center flex-wrap gap-4 mt-8"
            style={{ animationDelay: '1.0s' }}
          >
            <a
              href="#products"
              className="inline-flex items-center px-8 py-3 rounded-full bg-[#F07B20] text-white font-sans font-semibold text-sm hover:bg-[#d96a15] transition-all duration-200"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Products
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-3 rounded-full border border-white/30 text-white font-sans font-semibold text-sm hover:bg-white/10 transition-all duration-200"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Stats bar — white, light dividers ────────────────── */}
      <div className="bg-white border-t border-gray-100 py-10 px-12">
        <div className="grid grid-cols-4 max-w-5xl mx-auto">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${i < heroStats.length - 1 ? 'border-r border-gray-100' : ''}`}
            >
              <div className="font-sans font-bold text-[#1A237E] text-4xl leading-none">
                {stat.value}
              </div>
              <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Client marquee — off-white strip, seamless loop ─── */}
      <div className="bg-gray-50 border-t border-gray-100 py-5 overflow-hidden">
        {/* width:max-content + translateX(-50%) on a 2x list = perfect loop */}
        <div style={{ animation: 'marquee 30s linear infinite', display: 'flex', width: 'max-content' }}>
          <ClientStrip />
          <ClientStrip />
        </div>
      </div>

    </section>
  )
}
