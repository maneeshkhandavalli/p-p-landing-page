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
    'bg-cta text-white hover:bg-orange-600 hover:scale-105 hover:shadow-[0_0_24px_rgba(240,123,32,0.45)]',
  'orange-outline':
    'border-2 border-cta text-cta hover:border-accent hover:text-accent',
  'white-outline':
    'border-2 border-white text-white hover:border-accent hover:text-accent',
  'navy-outline':
    'border-2 border-navy text-navy hover:border-accent hover:text-accent',
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
