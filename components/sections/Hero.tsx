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

const capabilities = [
  { icon: 'precision_manufacturing', label: 'CNC Bending' },
  { icon: 'content_cut',             label: 'Laser Cutting' },
  { icon: 'format_paint',            label: 'Powder Coating' },
  { icon: 'bolt',                    label: 'TIG Welding' },
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
    <section id="home" className="bg-white">

      {/* ── Video area — smaller container, not full screen ── */}
      <div className="relative w-full mx-4 rounded-2xl overflow-hidden" style={{ height: '72vh', width: 'calc(100% - 2rem)' }}>
        {/* Video — edge to edge */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/HerosectionVideo/Generate_all_clips_one_by_on(1).mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* ── Top-left text content ── */}
        <div className="absolute top-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl z-10 flex flex-col justify-center h-full">
          <p
            className="hero-anim text-xs tracking-[0.2em] uppercase text-white/50 mb-5"
            style={{ animationDelay: '0.2s' }}
          >
            ISO 9001:2015 Certified
          </p>

          <h1
            className="hero-anim font-sans font-bold text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-5"
            style={{ animationDelay: '0.4s' }}
          >
            Built in <span className="text-[#93c5fd]">Steel</span>.
            <br />
            Trusted by <span className="text-[#93c5fd]">Industry</span>.
          </h1>

          <p
            className="hero-anim text-base md:text-lg text-white/65 max-w-md leading-relaxed"
            style={{ animationDelay: '0.6s' }}
          >
            Sheet metal fabrication from Hyderabad — EV, Solar, Electrical &amp; more.
          </p>
        </div>

        {/* ── Bottom-right white CTA container (wider, more content) ── */}
        <div
          className="hero-anim absolute bottom-0 right-0 m-6 md:m-10 lg:m-14 z-10 hidden md:block"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="bg-white rounded-2xl p-6 md:p-8 w-[420px] shadow-2xl">
            <p className="text-sm font-semibold text-[#1A237E] uppercase tracking-wider mb-1">
              Get in touch
            </p>
            <p className="text-xs text-gray-400 mb-5">
              Talk to our team about your requirements
            </p>

            {/* Capability icons row */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {capabilities.map((cap) => (
                <div key={cap.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1A237E]/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#1A237E]" style={{ fontSize: '20px' }}>{cap.icon}</span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-500 text-center leading-tight">{cap.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#products"
              className="block w-full bg-[#F07B20] text-white font-semibold py-3 rounded-xl mb-3 hover:bg-[#d96a15] transition-colors text-sm text-center"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Explore Products
            </a>
            <a
              href="#contact"
              className="block w-full border border-[#1A237E] text-[#1A237E] font-semibold py-3 rounded-xl hover:bg-[#1A237E] hover:text-white transition-colors text-sm text-center"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Contact Us
            </a>

            <p className="text-[11px] text-gray-400 text-center mt-4">
              ISO 9001:2015 Certified · Est. 2009 · Hyderabad
            </p>
          </div>
        </div>

        {/* ── Mobile CTA (visible below md) ── */}
        <div
          className="hero-anim absolute bottom-0 left-0 right-0 p-6 z-10 md:hidden flex flex-col gap-3"
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href="#products"
            className="block w-full bg-[#F07B20] text-white font-semibold py-3 rounded-xl text-sm text-center hover:bg-[#d96a15] transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Explore Products
          </a>
          <a
            href="#contact"
            className="block w-full border border-white/30 text-white font-semibold py-3 rounded-xl text-sm text-center hover:bg-white/10 transition-colors"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* ── Stats bar — inside the hero section, below video ────────────────── */}
      <div className="bg-white border-t border-gray-100 pt-8 pb-4 px-6 md:px-12">
        <div className="grid grid-cols-4 max-w-6xl mx-auto">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center flex flex-col items-center justify-center ${i < heroStats.length - 1 ? 'border-r border-gray-100' : ''}`}
            >
              <div className="font-sans font-bold text-[#1A237E] text-3xl md:text-4xl leading-none whitespace-nowrap">
                {stat.value}
              </div>
              <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mt-2 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Client marquee — below stats, seamless loop ─── */}
      <div className="bg-gray-50 border-t border-gray-100 py-3 overflow-hidden">
        {/* width:max-content + translateX(-50%) on a 2x list = perfect loop */}
        <div style={{ animation: 'marquee 30s linear infinite', display: 'flex', width: 'max-content' }}>
          <ClientStrip />
          <ClientStrip />
        </div>
      </div>

    </section>
  )
}
