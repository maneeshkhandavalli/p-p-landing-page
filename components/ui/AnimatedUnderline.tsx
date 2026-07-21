'use client'

interface Props {
  visible: boolean
  center?: boolean
}

export function AnimatedUnderline({ visible, center = true }: Props) {
  return (
    <div
      style={{
        height: '3px',
        width: visible ? '60px' : '0',
        background: '#1565C0',
        borderRadius: '2px',
        transition: 'width 0.6s ease 0.4s',
        margin: center ? '12px auto 0' : '12px 0 0',
      }}
    />
  )
}
