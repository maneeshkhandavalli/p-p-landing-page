import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'
import LoadingScreen from '@/components/ui/LoadingScreen'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'P&P Engineering Works — ISO 9001:2015 Sheet Metal Manufacturer, Hyderabad',
  description:
    'P&P Engineering Works is an ISO 9001:2015 certified manufacturer of electrical enclosures, EV battery casings, solar structures and precision sheet metal products in Hyderabad.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LoadingScreen />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
