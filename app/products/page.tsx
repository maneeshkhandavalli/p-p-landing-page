'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { productsData, productCategories } from '@/lib/productsData'

const NAVBAR_H = 104 // h-14 (56px) top bar + h-12 (48px) links bar

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'az',      label: 'Name A–Z' },
  { value: 'za',      label: 'Name Z–A' },
] as const

type SortKey = (typeof SORT_OPTIONS)[number]['value']

const ALL = 'All'
const allCategories = [ALL, ...productCategories]

function ProductsContent() {
  const searchParams = useSearchParams()

  const [search,         setSearch]         = useState('')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? ALL)
  const [sort,           setSort]           = useState<SortKey>('default')

  useEffect(() => {
    setActiveCategory(searchParams.get('category') ?? ALL)
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    let list = productsData.filter(p => {
      const matchSearch   = p.name.toLowerCase().includes(q)
      const matchCategory = activeCategory === ALL || p.category === activeCategory
      return matchSearch && matchCategory
    })
    if (sort === 'az') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'za') list = [...list].sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [search, activeCategory, sort])

  const count = filtered.length

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">

        {/* ── Page header ────────────────────────────────────────── */}
        <div
          className="bg-white border-b border-gray-100 px-6 pb-8"
          style={{ paddingTop: NAVBAR_H + 28 }}
        >
          <div className="max-w-[1280px] mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-accent border border-accent text-sm font-sans font-medium px-4 py-2 rounded-lg transition-colors mb-6"
              style={{ '--hover-bg': '#E3EDF7' } as React.CSSProperties}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#E3EDF7')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              ← Back to Home
            </Link>
            <h1 className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight mb-2">
              Our Complete Product Range
            </h1>
            <p className="text-body font-sans text-base">
              18 products across 9 categories. Click any product to enquire on IndiaMART.
            </p>
          </div>
        </div>

        {/* ── Mobile: search + horizontal category pills ─────────── */}
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-body pointer-events-none"
              style={{ fontSize: '18px' }}
            >
              search
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white border border-navy rounded-[8px] font-sans text-navy text-sm placeholder:text-gray-400 focus:outline-none"
              style={{ padding: '10px 16px 10px 40px' }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {allCategories.map(cat => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 font-sans text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
                  style={{
                    backgroundColor: active ? '#1565C0' : 'white',
                    color:           active ? '#ffffff' : '#1A237E',
                    borderColor:     active ? '#1565C0' : '#E1E2E4',
                  }}
                >
                  {cat === ALL ? 'All Products' : cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Two-column layout ──────────────────────────────────── */}
        <div className="max-w-[1280px] mx-auto flex items-start">

          {/* ── Left sidebar (desktop only) ──────────────────────── */}
          <aside
            className="hidden md:flex flex-col shrink-0 bg-white"
            style={{
              width:        260,
              borderRight:  '1px solid #E1E2E4',
              position:     'sticky',
              top:          NAVBAR_H,
              height:       `calc(100vh - ${NAVBAR_H}px)`,
              overflowY:    'auto',
              padding:      24,
            }}
          >
            {/* Search */}
            <div className="relative mb-6">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-body pointer-events-none"
                style={{ fontSize: '16px' }}
              >
                search
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white border border-navy rounded-[8px] font-sans text-navy text-sm placeholder:text-gray-400 focus:outline-none"
                style={{ padding: '9px 12px 9px 36px' }}
              />
            </div>

            {/* Categories heading */}
            <p className="font-sans font-bold text-navy text-[13px] uppercase tracking-[0.08em] mb-2">
              Categories
            </p>

            {/* Category list */}
            <nav className="flex flex-col gap-0.5 mb-5">
              {allCategories.map(cat => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="text-left font-sans text-[14px] rounded-[8px] transition-colors focus:outline-none"
                    style={{
                      padding:         '10px 12px',
                      backgroundColor: active ? '#1565C0' : 'transparent',
                      color:           active ? '#ffffff' : '#1A237E',
                    }}
                    onMouseEnter={e => {
                      if (!active) e.currentTarget.style.backgroundColor = '#E3EDF7'
                    }}
                    onMouseLeave={e => {
                      if (!active) e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    {cat === ALL ? 'All Products' : cat}
                  </button>
                )
              })}
            </nav>

            {/* Match count */}
            <p className="font-sans text-[12px] text-body">
              {count} product{count !== 1 ? 's' : ''} in this filter
            </p>

            {/* Spacer pushes card to bottom */}
            <div className="flex-1" />

            {/* Custom card */}
            <div className="mt-6 bg-navy rounded-xl p-5">
              <p className="font-heading font-bold text-white text-[15px] leading-snug mb-1">
                Need something custom?
              </p>
              <p className="font-sans text-slate-300 text-[12px] leading-relaxed mb-4">
                Contact us for custom fabrication
              </p>
              <Link
                href="/#contact"
                className="block text-center bg-cta text-white text-xs font-sans font-semibold px-4 py-2.5 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </aside>

          {/* ── Right content ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0" style={{ background: '#F4F7FC', minHeight: `calc(100vh - ${NAVBAR_H}px)`, padding: 32 }}>

            {/* Top row: count + sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="font-sans text-sm text-body">
                Showing{' '}
                <span className="font-semibold text-navy">{count}</span>{' '}
                product{count !== 1 ? 's' : ''}
              </p>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="bg-white border border-gray-200 rounded-[8px] font-sans text-navy text-sm focus:outline-none cursor-pointer"
                style={{ padding: '8px 12px' }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Product grid */}
            {count === 0 ? (
              <p className="text-body font-sans text-sm py-20 text-center">
                No products match your search.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <div
                    key={`${p.category}-${p.name}`}
                    className="catalogue-card bg-white border border-gray-200 rounded-[8px] shadow-sm flex flex-col overflow-hidden"
                    onClick={() => window.open(p.indiamartUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <div className="relative w-full overflow-hidden" style={{ height: 180 }}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={400}
                        height={180}
                        className="card-img object-cover w-full h-full"
                      />
                      <div className="card-overlay">
                        <div className="card-overlay-pill">VIEW</div>
                      </div>
                    </div>
                    <div className="px-4 pt-3 pb-4 flex flex-col flex-1">
                      <span className="inline-block text-accent text-[10px] font-sans font-semibold uppercase tracking-wider bg-icon-bg px-2 py-0.5 rounded-full mb-2 self-start">
                        {p.category}
                      </span>
                      <p className="font-sans font-bold text-navy text-[14px] leading-snug mb-4 flex-1">
                        {p.name}
                      </p>
                      <a
                        href={p.indiamartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1.5 text-cta border border-cta text-xs font-sans font-medium px-3 py-2 rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        Enquire on IndiaMART
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  )
}
