import { ReactNode } from 'react'

type Variant = 'orange-filled' | 'orange-outline' | 'white-outline' | 'navy-outline' | 'green-filled'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const styles: Record<Variant, string> = {
  'orange-filled':
    'btn-orange-sweep text-white',
  'orange-outline':
    'border-2 border-cta text-cta hover:bg-orange-50 hover:scale-[1.02] transition-all duration-200',
  'white-outline':
    'border-2 border-white text-white hover:bg-white/10 hover:scale-[1.02] transition-all duration-200',
  'navy-outline':
    'border-2 border-navy text-navy hover:bg-navy hover:text-white hover:scale-[1.02] transition-all duration-200',
  'green-filled':
    'bg-[#25D366] text-white hover:bg-green-600 hover:scale-105',
}

const base =
  'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-sans font-medium text-sm transition-all duration-200 cursor-pointer'

export function Button({
  children,
  variant = 'orange-filled',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const cls = `${base} ${styles[variant]} ${className}`
  if (href) return <a href={href} className={cls}>{children}</a>
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
