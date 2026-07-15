'use client'
import { useState, FormEvent } from 'react'
import React from 'react'
import { company, productOptions } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} style={{ backgroundColor: '#F4F7FC' }} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={anim(0)} className="text-center mb-12">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight">
            Request a Quote or Visit Our Facility
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-accent text-5xl mb-4 block">check_circle</span>
                <h3 className="font-heading font-bold text-navy text-2xl mb-2">Request Sent!</h3>
                <p className="text-body font-sans text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Company</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body font-sans text-sm font-medium mb-1.5">
                    Product Required
                  </label>
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors bg-white">
                    <option value="">Select a product</option>
                    {productOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body font-sans text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your requirement, quantities, material, etc."
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="orange-filled" className="w-full justify-center py-3 text-base">
                  Submit Request
                </Button>
              </form>
            )}
          </div>

          {/* Right — contact details */}
          <div className="space-y-6">
            {/* Contact info items */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-icon-bg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-xl">location_on</span>
              </div>
              <div>
                <div className="font-sans font-semibold text-navy text-sm mb-1">Our Facility</div>
                <p className="text-body font-sans text-sm leading-relaxed">{company.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-icon-bg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-xl">call</span>
              </div>
              <div>
                <div className="font-sans font-semibold text-navy text-sm mb-1">Phone</div>
                {company.phone.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-body font-sans text-sm hover:text-accent transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-icon-bg flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-accent text-xl">mail</span>
              </div>
              <div>
                <div className="font-sans font-semibold text-navy text-sm mb-1">Email</div>
                {company.email.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="block text-body font-sans text-sm hover:text-accent transition-colors">
                    {e}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp box */}
            <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-xl p-5">
              <p className="font-sans font-semibold text-green-800 text-sm mb-3">
                Send your drawings on WhatsApp for a fast quote
              </p>
              <Button href={company.whatsapp} variant="green-filled" className="w-full justify-center">
                <span className="material-symbols-outlined text-base">chat</span>
                Chat on WhatsApp
              </Button>
            </div>

            {/* Star CNC link */}
            <p className="text-body font-sans text-sm text-center">
              Also visit our laser cutting division:{' '}
              <a href="https://starcnc.in" className="text-accent font-medium hover:underline">
                starcnc.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
