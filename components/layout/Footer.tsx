import { company, products, navLinks } from '@/lib/content'

export default function Footer() {
  return (
    <footer className="bg-navy">
      {/* Top accent line */}
      <div className="h-0.5 bg-accent" />

      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div className="lg:col-span-1">
          <h3 className="font-heading font-bold text-white text-xl mb-3">{company.name}</h3>
          <p className="text-gray-400 font-sans text-sm leading-relaxed mb-4">
            ISO 9001:2015 certified sheet metal manufacturer in Hyderabad. Parent company of Star CNC
            Engineering Works. Est. 2009.
          </p>
          <span className="inline-block border border-white/40 text-white/70 font-sans text-xs px-3 py-1 rounded-full">
            ISO 9001:2015 Certified
          </span>
        </div>

        {/* Col 2 — Products */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Products
          </h4>
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p.name}>
                <a
                  href="#products"
                  className="text-gray-400 font-sans text-sm hover:text-white transition-colors"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Company */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Company
          </h4>
          <ul className="space-y-2">
            {[
              { label: 'About Us', href: '#about' },
              { label: 'Infrastructure', href: '#infrastructure' },
              { label: 'Clients', href: '#clients' },
              { label: 'Gallery', href: '#gallery' },
              { label: 'Contact', href: '#contact' },
              { label: 'Star CNC Division', href: 'https://starcnc.in' },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-400 font-sans text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h4 className="font-sans font-semibold text-white text-sm uppercase tracking-wider mb-4">
            Get in Touch
          </h4>
          <ul className="space-y-3">
            {company.phone.map((p) => (
              <li key={p}>
                <a
                  href={`tel:${p.replace(/\s/g, '')}`}
                  className="text-gray-400 font-sans text-sm hover:text-white transition-colors"
                >
                  {p}
                </a>
              </li>
            ))}
            {company.email.map((e) => (
              <li key={e}>
                <a
                  href={`mailto:${e}`}
                  className="text-gray-400 font-sans text-sm hover:text-white transition-colors"
                >
                  {e}
                </a>
              </li>
            ))}
            <li>
              <p className="text-gray-400 font-sans text-sm leading-relaxed">
                Chinthal, Hyderabad 500054
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#111B5E] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-gray-500 font-sans text-xs text-center leading-relaxed">
            © 2025 P&amp;P Engineering Works · Parent Company of Star CNC Engineering Works · All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
