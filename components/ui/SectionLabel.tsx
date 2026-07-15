export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-accent text-xs font-sans font-semibold uppercase tracking-[0.15em] mb-4">
      {children}
    </p>
  )
}
