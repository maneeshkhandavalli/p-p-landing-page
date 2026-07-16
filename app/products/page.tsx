'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { productsData, productCategories } from '@/lib/productsData'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'All'

  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  // Sync category when URL param changes (e.g. Navbar dropdown navigation)
  useEffect(() => {
    const cat = searchParams.get('category')
    setActiveCategory(cat ?? 'All')
  }, [searchParams])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return productsData.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(q)
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* White top section */}
        <div className="bg-white border-b border-gray-100 px-6 pt-[112px] pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-accent border border-accent text-sm font-sans font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors mb-8"
            >
              ← Back to Home
            </Link>

            {/* Heading */}
            <h1 className="font-heading font-bold text-navy text-4xl md:text-5xl leading-tight mb-3">
              Our Complete Product Range
            </h1>
            <p className="text-body font-sans text-base mb-8">
              30+ products across multiple categories. Click any product to enquire on IndiaMART.
            </p>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative sm:w-72">
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

              {/* Category dropdown */}
              <select
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
                className="bg-white border border-navy rounded-[8px] font-sans text-navy text-sm focus:outline-none cursor-pointer"
                style={{ padding: '10px 16px' }}
              >
                <option value="All">All Categories</option>
                {productCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="bg-offwhite px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <p className="text-body font-sans text-sm py-16 text-center">No products match your search.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filtered.map(p => (
                  <div
                    key={`${p.category}-${p.name}`}
                    className="catalogue-card bg-white border border-gray-200 rounded-[8px] shadow-sm flex flex-col overflow-hidden"
                    onClick={() => window.open(p.indiamartUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <div className="relative w-full h-[200px] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={300}
                        height={200}
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
