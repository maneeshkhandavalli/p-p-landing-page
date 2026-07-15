'use client'
import { useState, useEffect } from 'react'
import { company } from '@/lib/content'
import { Button } from '@/components/ui/Button'

const SECTION_IDS = ['home', 'about', 'products', 'infrastructure', 'clients', 'contact']

const fullNavLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products', dropdown: true },
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact Us', href: '#contact' },
]

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
          <a href="#home" className="shrink-0">
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
          <Button href="#contact" variant="navy-outline" className="hidden md:inline-flex py-1.5 px-4 text-sm gap-1">
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
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`inline-flex items-center gap-0.5 text-sm font-sans font-medium transition-colors ${
                    active ? 'text-accent' : 'text-white hover:text-accent'
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>expand_more</span>
                  )}
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
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {fullNavLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`font-sans font-medium text-sm ${isActive(link.href) ? 'text-accent' : 'text-white'}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" variant="orange-filled" className="w-full justify-center mt-2">
            Enquire Now
          </Button>
        </div>
      )}
    </header>
  )
}
