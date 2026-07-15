import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import AboutUs from '@/components/sections/AboutUs'
import Products from '@/components/sections/Products'
import Infrastructure from '@/components/sections/Infrastructure'
import WhyUs from '@/components/sections/WhyUs'
import StarCNCDivision from '@/components/sections/StarCNCDivision'
import Testimonials from '@/components/sections/Testimonials'
import Clients from '@/components/sections/Clients'
import HowItWorks from '@/components/sections/HowItWorks'
import Contact from '@/components/sections/Contact'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Products />
        <Infrastructure />
        <WhyUs />
        <StarCNCDivision />
        <Testimonials />
        <Clients />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </>
  )
}
