'use client'
import { useState, FormEvent } from 'react'
import React from 'react'
import { company, productOptions } from '@/lib/content'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { AnimatedUnderline } from '@/components/ui/AnimatedUnderline'
import { Button } from '@/components/ui/Button'
import { useScrollAnimation } from '@/lib/useScrollAnimation'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const { ref, isVisible } = useScrollAnimation()

  const anim = (delay = 0): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputCls = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-sans text-navy focus:outline-none focus:border-accent transition-colors'

  return (
    <section id="contact" ref={ref as React.RefObject<HTMLElement>} style={{ backgroundColor: '#F4F7FC' }} className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div style={anim(0)} className="text-center mb-12">
          <SectionLabel>Get in Touch</SectionLabel>
          <h2 className="font-heading font-bold text-navy text-4xl md:text-[52px] leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Let&apos;s Work Together.
          </h2>
          <AnimatedUnderline visible={isVisible} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-green-500 text-5xl mb-4 block">check_circle</span>
                <h3 className="font-heading font-bold text-navy text-2xl mb-2">Request Sent!</h3>
                <p className="text-green-700 font-sans text-sm">Thank you! We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? ''} />
                <input type="hidden" name="subject" value="New Enquiry — P&P Engineering Works" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-700 font-sans text-sm">
                    Something went wrong. Please call us directly on <strong>+91 91009 97434</strong>.
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Name</label>
                    <input type="text" name="name" required placeholder="Your name" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Company</label>
                    <input type="text" name="company" placeholder="Company name" className={inputCls} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Phone</label>
                    <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-body font-sans text-sm font-medium mb-1.5">Email</label>
                    <input type="email" name="email" required placeholder="you@company.com" className={inputCls} />
                  </div>
                </div>

                <div>
                  <label className="block text-body font-sans text-sm font-medium mb-1.5">Product Required</label>
                  <select name="product" className={`${inputCls} bg-white`}>
                    <option value="">Select a product</option>
                    {productOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-body font-sans text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Describe your requirement, quantities, material, etc."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm text-white btn-orange-sweep disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : 'Submit Request'}
                </button>
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
