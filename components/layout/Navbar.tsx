'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { company } from '@/lib/content'
import { Button } from '@/components/ui/Button'

const dropdownCategories = [
  'Electronic Enclosures',
  'EV Battery Enclosures',
  'Electrical Enclosures & Cabinets',
  'Sheet Metal Fabrications',
  'Doors & Enclosures',
]

const SECTION_IDS = ['home', 'about', 'products', 'infrastructure', 'clients', 'contact']

const fullNavLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products', dropdown: true },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact Us', href: '#contact' },
]

const NAV_OFFSET = -110

function scrollTo(href: string) {
  const lenis = (window as any).__lenis
  if (href === '#home') {
    lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  if (lenis) {
    lenis.scrollTo(href, { offset: NAV_OFFSET })
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const isActive = (href: string) => href === `#${activeSection}`

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      {/* Top row — white, collapses on scroll */}
      <div
        className="bg-white overflow-hidden transition-all duration-300"
        style={{ maxHeight: scrolled ? '0' : '56px', opacity: scrolled ? 0 : 1 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#home" className="shrink-0" onClick={(e) => { e.preventDefault(); scrollTo('#home') }}>
            <img src="/images/logo-withoutbg.png" alt="P&P Engineering Works" style={{ height: '44px', width: 'auto' }} />
          </a>

          {/* Contact info */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href={`tel:${company.phone[0].replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-sm font-sans text-navy hover:text-accent transition-colors"
            >
              <span className="material-symbols-outlined text-accent" style={{ fontSize: '16px' }}>phone</span>
              {company.phone[0]}
            </a>
            <a
              href={`mailto:${company.email[0]}`}
              className="flex items-center gap-1.5 text-sm font-sans text-navy hover:text-accent transition-colors"
            >
              <span className="material-symbols-outlined text-accent" style={{ fontSize: '16px' }}>mail</span>
              {company.email[0]}
            </a>
          </div>

          {/* Enquire Now */}
          <Button onClick={() => scrollTo('#contact')} variant="navy-outline" className="hidden md:inline-flex py-1.5 px-4 text-sm gap-1">
            Enquire Now
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
          </Button>
        </div>
      </div>

      {/* Bottom row — navy */}
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-12">
          {/* Nav links — centered */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {fullNavLinks.map((link) => {
              const active = isActive(link.href)
              if (link.dropdown) {
                return (
                  <div key={link.label} className="relative group">
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                      className={`inline-flex items-center gap-0.5 text-sm font-sans font-medium transition-colors ${
                        active ? 'text-accent' : 'text-white hover:text-accent'
                      }`}
                    >
                      {link.label}
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                    </a>
                    {/* Dropdown panel */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-white border border-[#E1E2E4] rounded-[8px] shadow-lg min-w-[220px] py-2 z-50">
                      {dropdownCategories.map(cat => (
                        <Link
                          key={cat}
                          href={`/products?category=${encodeURIComponent(cat)}`}
                          className="block px-4 py-2.5 font-sans font-medium text-[14px] text-navy hover:bg-[#F4F7FC] hover:text-accent transition-colors"
                        >
                          {cat}
                        </Link>
                      ))}
                      <div className="border-t border-gray-200 my-2" />
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
                  className={`nav-link-underline relative inline-flex items-center gap-0.5 text-sm font-sans font-medium transition-colors ${
                    active ? 'text-accent' : 'text-white hover:text-accent'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 ml-auto"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-[250ms] ease-in-out ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-[250ms] ease-in-out ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-[250ms] ease-in-out ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu — always rendered, animated via CSS */}
      <div
        className={`lg:hidden bg-navy border-t border-white/10 px-6 flex flex-col gap-4 overflow-hidden transition-all ease-in-out ${
          menuOpen
            ? 'opacity-100 translate-y-0 max-h-[600px] py-4 duration-300'
            : 'opacity-0 -translate-y-2 max-h-0 py-0 duration-200'
        }`}
      >
        {fullNavLinks.map((link) => (
          <div key={link.label} className="flex flex-col gap-2">
            <a
              href={link.href}
              className={`font-sans font-medium text-sm ${isActive(link.href) ? 'text-accent' : 'text-white'}`}
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
                    className="font-sans text-sm text-white/70 hover:text-accent transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
                <Link
                  href="/products"
                  className="font-sans font-medium text-sm text-cta"
                  onClick={() => setMenuOpen(false)}
                >
                  View All Products →
                </Link>
              </div>
            )}
          </div>
        ))}
        <Button onClick={() => { scrollTo('#contact'); setMenuOpen(false) }} variant="orange-filled" className="w-full justify-center mt-2">
          Enquire Now
        </Button>
      </div>
    </header>
  )
}
