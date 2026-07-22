import React from 'react'

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-[10px] mb-4">
      <div style={{ width: 1, height: 16, backgroundColor: '#1565C0', flexShrink: 0 }} />
      <p className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.15em]">
        {children}
      </p>
    </div>
  )
}
