'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { company } from '@/lib/content'

const dropdownCategories = [
  'Electronic Enclosures',
  'EV Battery Enclosures',
  'Electrical Enclosures & Cabinets',
  'Sheet Metal Fabrications',
  'Doors & Enclosures',
]

const SECTION_IDS = ['home', 'products', 'infrastructure', 'clients', 'contact']

const navLinks = [
  { label: 'Home',           href: '#home' },
  { label: 'Products',       href: '#products', dropdown: true },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Clients',        href: '#clients' },
  { label: 'Contact Us',     href: '#contact' },
]

const NAV_OFFSET = -80

function scrollTo(href: string) {
  const lenis = (window as any).__lenis
  if (href === '#home') {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  lenis ? lenis.scrollTo(href, { offset: NAV_OFFSET }) : document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <>
      {/* ── Top announcement strip (Greenboard-style) ── */}
      <div className="w-full bg-[#1A237E] text-white text-xs text-center py-2 px-4 font-sans tracking-wide z-[60] relative">
        <span className="material-symbols-outlined align-middle mr-1.5" style={{ fontSize: '14px' }}>verified</span>
        ISO 9001:2015 Certified &nbsp;·&nbsp; Precision Sheet Metal Fabrication from Hyderabad &nbsp;·&nbsp; Est. 2009
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-3 flex items-center">

          {/* Logo + phone pill */}
          <div className="flex items-center shrink-0">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollTo('#home') }}
            >
              <img
                src="/images/logo-withoutbg.png"
                alt="P&P Engineering Works"
                style={{ height: '36px', width: 'auto' }}
              />
            </a>

            <a
              href={`tel:${company.phone[0].replace(/\s/g, '')}`}
              className="hidden md:inline-flex items-center gap-1.5 bg-[#1A237E]/5 border border-[#1A237E]/15 rounded-full px-3 py-1 text-[#1A237E] text-sm font-sans hover:bg-[#1A237E]/10 transition-colors ml-4"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>phone</span>
              {company.phone[0]}
            </a>
          </div>

          {/* Nav links — centred, flex-1 handles spacing */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
            {navLinks.map((link) => {
              const active = link.href === `#${activeSection}`
              // Reserve border space always so height stays constant
              const cls = `text-sm font-sans font-medium transition-colors border-b-2 pb-0.5 ${
                active
                  ? 'text-[#1A237E] font-semibold border-[#F07B20]'
                  : 'text-[#1A237E]/70 hover:text-[#1A237E] border-transparent'
              }`

              if (link.dropdown) {
                return (
                  <div key={link.label} className="relative group">
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                      className={`inline-flex items-center gap-0.5 ${cls}`}
                    >
                      {link.label}
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                    </a>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white border border-gray-100 rounded-2xl shadow-xl min-w-[220px] py-2 z-50">
                      {dropdownCategories.map(cat => (
                        <Link
                          key={cat}
                          href={`/products?category=${encodeURIComponent(cat)}`}
                          className="block px-4 py-2.5 font-sans font-medium text-[14px] text-navy hover:bg-[#F4F7FC] hover:text-accent transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 my-2" />
                      <Link
                        href="/products"
                        className="block px-4 py-2.5 font-sans font-medium text-[14px] text-cta hover:bg-[#F4F7FC] transition-colors"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                  className={cls}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Enquire Now (orange CTA) + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scrollTo('#contact')}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-md bg-[#F07B20] text-white text-sm font-sans font-semibold hover:bg-[#d96a15] transition-colors"
            >
              Enquire Now
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-[#1A237E] transition-all duration-[250ms] ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#1A237E] transition-all duration-[250ms] ease-in-out ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-[#1A237E] transition-all duration-[250ms] ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden bg-[#1A237E] border-t border-white/10 px-6 flex flex-col gap-4 overflow-hidden transition-all ease-in-out ${
            menuOpen
              ? 'opacity-100 translate-y-0 max-h-[600px] py-4 duration-300'
              : 'opacity-0 -translate-y-2 max-h-0 py-0 duration-200'
          }`}
        >
          {navLinks.map((link) => (
            <div key={link.label} className="flex flex-col gap-2">
              <a
                href={link.href}
                className="font-sans font-medium text-sm text-white/80"
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); setMenuOpen(false) }}
              >
                {link.label}
              </a>
              {link.dropdown && (
                <div className="flex flex-col gap-1.5 pl-4 border-l border-white/20">
                  {dropdownCategories.map(cat => (
                    <Link
                      key={cat}
                      href={`/products?category=${encodeURIComponent(cat)}`}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {cat}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    className="font-sans font-medium text-sm text-[#F07B20]"
                    onClick={() => setMenuOpen(false)}
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>
          ))}
          <a
            href={`tel:${company.phone[0].replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5 text-white/80 text-sm font-sans w-fit"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>phone</span>
            {company.phone[0]}
          </a>
          <button
            onClick={() => { scrollTo('#contact'); setMenuOpen(false) }}
            className="w-full bg-[#F07B20] text-white rounded-md py-3 font-sans font-semibold text-sm hover:bg-[#d96a15] transition-colors mt-1"
          >
            Enquire Now
          </button>
        </div>
      </header>
    </>
  )
}
